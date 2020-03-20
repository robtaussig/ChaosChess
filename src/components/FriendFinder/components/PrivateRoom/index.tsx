import React, { FC, useEffect } from 'react';
import useStyles from './style';
import { useSelector } from 'react-redux';
import { connectionSelector } from '../../../../redux/Connection';
import { syncGameMode } from '../../../../messaging';
import { gameSelector } from '../../../../redux/Game';
import { useSocket } from '../../../../hooks/useSocket';
import ChaosGameMode from '../../../GameModes/components/ChaosGameMode';

interface PrivateRoomProps {
  isHost: boolean;
}

export const PrivateRoom: FC<PrivateRoomProps> = ({
  isHost,
}) => {
  const classes = useStyles({});
  const connection = useSelector(connectionSelector);
  const sendMessage = useSocket();
  const { type, subType } = useSelector(gameSelector);

  useEffect(() => {
    if (isHost) {
      syncGameMode(sendMessage, type, subType);
    }
  }, [isHost, type, subType]);

  return (
    <ChaosGameMode includeRegular={true} canSelect={isHost}/>
  );
};

export default PrivateRoom;
