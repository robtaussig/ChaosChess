import React, { FC } from 'react';
import useStyles from './style';
import { useSelector } from 'react-redux';
import { connectionSelector } from '../../../../redux/Connection';

interface PrivateRoomProps {
  isHost: boolean;
}

export const PrivateRoom: FC<PrivateRoomProps> = ({
  isHost,
}) => {
  const classes = useStyles({});
  const connection = useSelector(connectionSelector);

  return (
    <div className={classes.root}>
      {isHost ? 'Joined as host!' : 'Joined as guest!'}
    </div>
  );
};

export default PrivateRoom;
