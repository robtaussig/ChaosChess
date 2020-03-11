import React, { FC } from 'react';
import { useChaosGameModeStyles } from './style';
import { useSelector } from 'react-redux';
import { gameSelector, ChaosGameTypes } from '../../../redux/Game';

interface ChaosGameModeProps {
  
}

export const ChaosGameMode: FC<ChaosGameModeProps> = () => {
  const classes = useChaosGameModeStyles({});
  const { subType } = useSelector(gameSelector);
  
  return (
    <div id={'chaos-game-mode-types'} className={classes.root}>
      
    </div>
  );
};

export default ChaosGameMode;
