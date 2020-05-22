import React, { FC } from 'react';
import { useOpponentDashboardStyles } from './style';
import 'css.gg/icons/home.css';
import 'css.gg/icons/smile.css';
import 'css.gg/icons/check.css';
import 'css.gg/icons/add.css';
import 'css.gg/icons/remove.css';
import 'css.gg/icons/smile-neutral.css';
import { useDispatch, useSelector } from 'react-redux';
import DashboardButton from './DashboardButton';
import {
  gameStarted,
} from '../../../redux/Game';
import { returnHome } from '../../../redux/App';
import { hostTable, dropTable } from '../../../redux/Connection/actions';
import { connectionSelector } from '../../../redux/Connection';
import { opponentSelector } from '../../../redux/Opponent';
import { useSocket } from '../../../hooks/useSocket';
import { useHistory } from 'react-router-dom';

export const FriendFinderDashboard: FC = () => {
  const classes = useOpponentDashboardStyles({});
  const dispatch = useDispatch();
  const history = useHistory();
  const sendMessage = useSocket();
  const { type: opponentType, isReady } = useSelector(opponentSelector);
  const { hostedTable, uuid } = useSelector(connectionSelector);

  return (
    <div className={classes.root}>
      <DashboardButton
        classes={classes}
        className={'drop-table'}
        label={'Drop Table'}
        disabled={!Boolean(hostedTable)}
        icon={'remove'}
        onClick={() => dispatch(dropTable(sendMessage))}
      />
      <DashboardButton
        classes={classes}
        className={'create-table'}
        label={'Create Table'}
        disabled={Boolean(hostedTable)}
        icon={'add'}
        onClick={() => {
          dispatch(hostTable(sendMessage));
          history.push(`/room/${uuid}`);
        }}
      />
      <DashboardButton
        classes={classes}
        className={'home'}
        label={'Home'}
        icon={'home'}
        onClick={() => dispatch(returnHome())}
      />
      <DashboardButton
        classes={classes}
        className={'ready'}
        label={'Ready'}
        icon={'check'}
        disabled={!isReady}
        onClick={() => dispatch(gameStarted({ opponent: opponentType, isWhite: true }))}
      />
    </div>
  );
};

export default FriendFinderDashboard;
