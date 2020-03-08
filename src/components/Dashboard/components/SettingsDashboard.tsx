import React, { FC } from 'react';
import { useSettingsDashboard } from './style';


export const SettingsDashboard: FC = () => {
  const classes = useSettingsDashboard({});

  return (
    <div className={classes.root}>

    </div>
  );
};

export default SettingsDashboard;
