import React, { FC } from 'react';
import { useStyles } from './styles';

interface DashboardProps {
  
}

export const Dashboard: FC<DashboardProps> = () => {
  const classes = useStyles({});

  return (
    <nav id={'dashboard'} className={classes.root}>

    </nav>
  );
};

export default Dashboard;
