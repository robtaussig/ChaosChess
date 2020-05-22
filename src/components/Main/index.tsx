import React, { FC } from 'react';
import Board from '../Board';
import Settings from '../Settings';
import GameModes from '../GameModes';
import FriendFinder from '../FriendFinder';
import { Switch, Route } from 'react-router-dom';

export const Main: FC = () => {
  return (
    <Switch>
      <Route path={'/settings'}>
        <Settings/>
      </Route>
      <Route path={'/vs-ai'}>
        <GameModes/>
      </Route>
      <Route path={'/vs-human'}>
        <FriendFinder/>
      </Route>
      <Route path={'/room/:roomId'}>
        <FriendFinder/>
      </Route>
      <Route path={'/game/:roomId'}>
        <Board/>
      </Route>
      <Route path={'*'}>
        <Board/>
      </Route>
    </Switch>
  );
};

export default Main;
