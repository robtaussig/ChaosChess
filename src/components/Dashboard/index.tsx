import React, { FC } from 'react';
import useStyles from './styles';
import { useSelector } from 'react-redux';
import {
  dashboardSelector,
  DashboardTypes,
} from '../../redux/Dashboard';
import InGameDashboard from './components/InGameDashboard';
import MainScreenDashboard from './components/MainScreenDashboard';
import SettingsDashboard from './components/SettingsDashboard';

export const Dashboard: FC = () => {
  const classes = useStyles({});
  const { type } = useSelector(dashboardSelector);

  return (
    <nav id={'dashboard'} className={classes.root}>
      {type === DashboardTypes.MainScreen && (
        <MainScreenDashboard/>
      )}
      {type === DashboardTypes.InGame && (
        <InGameDashboard/>
      )}
      {type === DashboardTypes.Settings && (
        <SettingsDashboard/>
      )}
    </nav>
  );
};

export default Dashboard;
