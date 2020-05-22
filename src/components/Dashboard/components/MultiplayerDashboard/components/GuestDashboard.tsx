import React, { FC, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { returnHome } from '../../../../../redux/App';
import { useSocket } from '../../../../../hooks/useSocket';
import { setIsReady, opponentSelector } from '../../../../../redux/Opponent';
import { gameSelector, GameStages } from '../../../../../redux/Game';
import DashboardButton from '../../DashboardButton';
import { syncHostWithReadyStatus } from '../../../../../messaging';
import { useHistory } from 'react-router-dom';
import classNames from 'classnames';

interface GuestDashboardProps {
  classes: any;
}

export const GuestDashboard: FC<GuestDashboardProps> = ({
  classes,
}) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const sendMessage = useSocket();
  const { isReady, uuid } = useSelector(opponentSelector);
  const { stage } = useSelector(gameSelector);

  useEffect(() => {
    syncHostWithReadyStatus(sendMessage, isReady);
  }, [sendMessage, isReady]);

  useEffect(() => {
    if (stage === GameStages.Started) {
      history.push(`/game/${uuid}`);
    }
  }, [stage, history, uuid]);

  return (
    <div className={classNames(classes.userDashboard, 'guest')}>
      <DashboardButton
        classes={classes}
        className={'home'}
        label={'Home'}
        icon={'home'}
        onClick={() => dispatch(returnHome())}
      />
      <DashboardButton
        classes={classes}
        className={'ready-up'}
        label={isReady ? 'Ready' : 'Ready up'}
        icon={isReady && 'check'}
        onClick={() => dispatch(setIsReady(!isReady))}
      />
    </div>
  );
};

export default GuestDashboard;
