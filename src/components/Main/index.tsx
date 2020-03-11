import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import Board from '../Board';
import Settings from '../Settings';
import GameModes from '../GameModes';
import FriendFinder from '../FriendFinder';
import { settingsSelector } from '../../redux/Settings';
import { gameSelector, GameStages } from '../../redux/Game';

export const Main: FC = () => {
  const game = useSelector(gameSelector);
  const settings = useSelector(settingsSelector);

  if (settings.isOpen) return <Settings/>;
  if (game.stage === GameStages.SettingUpAI) return <GameModes/>;
  if (game.stage === GameStages.SettingUpHuman) return <FriendFinder/>;

  return <Board/>;  
};

export default Main;
