import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { gameSelector, GameTypes } from '../../redux/Game';
import RegularGameMode from './components/RegularGameMode';
import ChaosGameMode from './components/ChaosGameMode';

export const GameModes: FC = () => {
  const { type } = useSelector(gameSelector);

  return (
    <>
      {type === GameTypes.Regular && (
        <RegularGameMode/>
      )}
      {type === GameTypes.Chaos && (
        <ChaosGameMode/>
      )}
    </>
  );
};

export default GameModes;
