import React, { FC } from 'react';
import useStyles from './style';
import { useSelector } from 'react-redux';
import PlayerCard from './components/PlayerCard';
import { Avatar } from '../../../../redux/User';
import { connectionSelector } from '../../../../redux/Connection';
import { opponentSelector } from '../../../../redux/Opponent';
import GuestDashboard from './components/GuestDashboard';
import HostDashboard from './components/HostDashboard';
import classNames from 'classnames';

interface MultiplayerDashboardProps {
  
}

//TODO hook up player information
export const MultiplayerDashboard: FC<MultiplayerDashboardProps> = () => {
  const classes = useStyles({});
  const { hostedTable } = useSelector(connectionSelector);
  const { isReady } = useSelector(opponentSelector);

  return (
    <div className={classes.root}>
      <PlayerCard
        classes={classes}
        avatar={Avatar.Bot}
        name={'Host'}
        uuid={'ewrewrew'}
        rootClassName={'player'}
      />
      <span className={classes.vsText}>VS</span>
      <PlayerCard
        classes={classes}
        avatar={Avatar.Girl}
        name={'Guest'}
        uuid={'ewrewrew'}
        rootClassName={classNames('opponent', {
          isReady
        })}
      />
      {hostedTable ? (
        <HostDashboard classes={classes}/>
      ) : (
        <GuestDashboard classes={classes}/>
      )}
    </div>
  );
};

export default MultiplayerDashboard;
