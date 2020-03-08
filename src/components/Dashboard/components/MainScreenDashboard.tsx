import React, { FC } from 'react';
import { useMainScreenDashboardStyles } from './style';
import 'css.gg/icons/add-r.css';

export const MainScreenDashboard: FC = () => {
  const classes = useMainScreenDashboardStyles({});

  return (
    <div className={classes.root}>
      <i className="gg-add-r"/>
    </div>
  );
};

export default MainScreenDashboard;
