import React, { FC } from 'react';
import { useMainScreenDashboardStyles } from './style';

export const MainScreenDashboard: FC = () => {
  const classes = useMainScreenDashboardStyles({});

  return (
    <div className={classes.root}>

    </div>
  );
};

export default MainScreenDashboard;
