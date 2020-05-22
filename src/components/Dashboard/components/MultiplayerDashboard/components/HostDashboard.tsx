import React, { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { returnHome } from '../../../../../redux/App';
import { useSocket } from '../../../../../hooks/useSocket';
import { opponentSelector, OpponentType } from '../../../../../redux/Opponent';
import { gameStarted } from '../../../../../redux/Game';
import { connectionSelector } from '../../../../../redux/Connection';
import DashboardButton from '../../DashboardButton';
import { syncGuestWithGameStarted } from '../../../../../messaging';
import classNames from 'classnames';
import { useHistory } from 'react-router-dom';

interface HostDashboardProps {
  classes: any;
}

export const HostDashboard: FC<HostDashboardProps> = ({
  classes,
}) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const sendMessage = useSocket();
  const { isReady } = useSelector(opponentSelector);
  const { roomId } = useSelector(connectionSelector);

  const handleStartGame = () => {
    const isWhite = true;
    dispatch(gameStarted({ opponent: OpponentType.Human, isWhite }));
    syncGuestWithGameStarted(sendMessage, !isWhite);
    history.push(`/game/${roomId}`);
  };

  return (
    <div className={classNames(classes.userDashboard, 'host')}>
      <DashboardButton
        classes={classes}
        className={'home'}
        label={'Home'}
        icon={'home'}
        onClick={() => dispatch(returnHome())}
      />
      <DashboardButton
        classes={classes}
        className={'select-game'}
        label={'Select Game'}
        disabled={!isReady}
        icon={'check'}
        onClick={handleStartGame}
      />
    </div>
  );
};

export default HostDashboard;
