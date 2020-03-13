import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import {
  dashboardSelector,
  DashboardTypes,
} from '../../redux/Dashboard';
import InGameDashboard from './components/InGameDashboard';
import MainScreenDashboard from './components/MainScreenDashboard';
import SettingsDashboard from './components/SettingsDashboard';
import OpponentDashboard from './components/OpponentDashboard';
import GuestDashboard from './components/GuestDashboard';
import HostDashboard from './components/HostDashboard';

export const Dashboard: FC = () => {
  const { type } = useSelector(dashboardSelector);

  switch (type) {
    case DashboardTypes.MainScreen:
      return <MainScreenDashboard/>;
    case DashboardTypes.InGame:
      return <InGameDashboard/>;
    case DashboardTypes.Settings:
      return <SettingsDashboard/>;
    case DashboardTypes.SetUpOpponent:
      return <OpponentDashboard/>;
    case DashboardTypes.GuestDashboard:
      return <GuestDashboard/>
    case DashboardTypes.HostDashboard:
      return <HostDashboard/>
    default:
      return null;
  }
};

export default Dashboard;
