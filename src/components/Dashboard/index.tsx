import React, { FC } from 'react';
import SettingsDashboard from './components/SettingsDashboard';
import AIDashboard from './components/AIDashboard';
import FriendFinderDashboard from './components/FriendFinderDashboard';
import MultiplayerDashboard from './components/MultiplayerDashboard';
import InGameDashboard from './components/InGameDashboard';
import MainScreenDashboard from './components/MainScreenDashboard';
import GoDashboard from './components/GoDashboard';
import { Switch, Route } from 'react-router-dom';

export const Dashboard: FC = () => {
  return (
    <Switch>
      <Route path={'/settings'}>
        <SettingsDashboard/>
      </Route>
      <Route path={'/vs-ai'}>
        <AIDashboard/>
      </Route>
      <Route path={'/vs-human'}>
        <FriendFinderDashboard/>
      </Route>
      <Route path={'/go'}>
        <GoDashboard/>
      </Route>
      <Route path={'/room/:roomId'}>
        <MultiplayerDashboard/>
      </Route>
      <Route path={'/game/:roomId'}>
        <InGameDashboard/>
      </Route>
      <Route path={'/'}>
        <MainScreenDashboard/>
      </Route>
    </Switch>
  );
};

export default Dashboard;
