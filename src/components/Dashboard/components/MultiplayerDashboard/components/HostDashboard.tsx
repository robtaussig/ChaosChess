import React, { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { returnHome } from '../../../../../redux/App';
import { useSocket } from '../../../../../hooks/useSocket';
import { opponentSelector, OpponentType } from '../../../../../redux/Opponent';
import { gameStarted } from '../../../../../redux/Game';
import DashboardButton from '../../DashboardButton';
import { syncGuestWithGameStarted } from '../../../../../messaging';
import classNames from 'classnames';

interface HostDashboardProps {
  classes: any;
}

export const HostDashboard: FC<HostDashboardProps> = ({
  classes,
}) => {
  const dispatch = useDispatch();
  const sendMessage = useSocket();
  const { isReady } = useSelector(opponentSelector);

  const handleStartGame = () => {
    const isWhite = true;
    dispatch(gameStarted({ opponent: OpponentType.Human, isWhite }));
    syncGuestWithGameStarted(sendMessage, !isWhite);
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
