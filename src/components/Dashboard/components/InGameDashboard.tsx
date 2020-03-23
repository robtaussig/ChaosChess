import React, { FC } from 'react';
import { useInGameDashboard } from './style';
import { useSelector, useDispatch } from 'react-redux';
import { gameStarted } from '../../../redux/Game';
import { syncGuestWithGameStarted } from '../../../messaging';
import { useSocket } from '../../../hooks/useSocket';
import 'css.gg/icons/redo.css';
import 'css.gg/icons/home.css';
import DashboardButton from './DashboardButton';
import { returnHome } from '../../../redux/App';
import { opponentSelector, OpponentType } from '../../../redux/Opponent';
import { connectionSelector } from '../../../redux/Connection';
import { userSelector } from '../../../redux/User';
import LastCapturedPiece from './LastCapturedPiece';
import InGameText from './InGameText';
import { Color } from '../../../engine/types';

export const InGameDashboard: FC = () => {
  const classes = useInGameDashboard({});
  const dispatch = useDispatch();
  const sendMessage = useSocket();
  const { type: opponentType } = useSelector(opponentSelector);
  const { color } = useSelector(userSelector);
  const { hostedTable } = useSelector(connectionSelector);

  const handleClickStartOver = () => {
    dispatch(gameStarted({ opponent: opponentType, isWhite: true }));
    if (opponentType === OpponentType.Human) {
      syncGuestWithGameStarted(
        sendMessage,
        color !== Color.White,
      );
    }
  };
  
  return (
    <div className={classes.root}>
      <LastCapturedPiece classes={classes}/>
      <InGameText classes={classes}/>
      <DashboardButton
        classes={classes}
        className={'main-menu'}
        label={'Home'}
        hideLabel={true}
        icon={'home'}
        onClick={() => dispatch(returnHome())}
      />
      <DashboardButton
        classes={classes}
        className={'start-over'}
        label={'Start over'}
        icon={'redo'}
        disabled={opponentType === OpponentType.Human && !hostedTable}
        onClick={handleClickStartOver}
      />
    </div>
  );
};

export default InGameDashboard;
