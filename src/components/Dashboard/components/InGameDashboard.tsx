import React, { FC } from 'react';
import { useInGameDashboard } from './style';


export const InGameDashboard: FC = () => {
  const classes = useInGameDashboard({});

  return (
    <div className={classes.root}>

    </div>
  );
};

export default InGameDashboard;
