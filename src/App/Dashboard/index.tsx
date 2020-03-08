import React, { FC } from 'react';
import { useStyles } from './styles';

interface DashboardProps {
  
}

export const Dashboard: FC<DashboardProps> = () => {
  const classes = useStyles({});

  return (
    <div id={'dashboard'} className={classes.root}>

    </div>
  );
};

export default Dashboard;
