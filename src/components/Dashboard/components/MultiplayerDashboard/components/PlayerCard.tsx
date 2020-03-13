import React, { FC } from 'react';
import { Avatar } from '../../../../../redux/User';
import classNames from 'classnames';
import DashboardButton from '../../DashboardButton';

interface PlayerCardProps {
  classes: any;
  avatar: Avatar;
  name: string;
  uuid: string;
  rootClassName: string;
}

export const PlayerCard: FC<PlayerCardProps> = ({
  classes,
  avatar,
  name,
  uuid,
  rootClassName,
}) => {

  return (
    <DashboardButton
      classes={classes}
      className={classNames(classes.playerCard,rootClassName)}
      label={name}
      icon={avatar}
      onClick={console.log}
    />
  );
};

export default PlayerCard;
