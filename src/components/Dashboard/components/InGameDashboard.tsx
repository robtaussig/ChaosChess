import React, { FC } from 'react';
import { useInGameDashboard } from './style';
import { useSelector, useDispatch } from 'react-redux';
import { gameStarted } from '../../../redux/Game';
import 'css.gg/icons/redo.css';
import DashboardButton from './DashboardButton';
import { opponentSelector } from '../../../redux/Opponent';
import LastCapturedPiece from './LastCapturedPiece';
import InGameText from './InGameText';

export const InGameDashboard: FC = () => {
  const classes = useInGameDashboard({});
  const dispatch = useDispatch();
  const { type: opponentType } = useSelector(opponentSelector);  
  
  return (
    <div className={classes.root}>
      <LastCapturedPiece classes={classes}/>
      <InGameText classes={classes}/>
      <DashboardButton
        classes={classes}
        className={'start-over'}
        label={'Start over'}
        icon={'redo'}
        onClick={() => dispatch(gameStarted({ opponent: opponentType }))}
      />
    </div>
  );
};

export default InGameDashboard;
