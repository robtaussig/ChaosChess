import React, { FC } from 'react';
import useStyles from './styles';

export const Settings: FC = () => {
  const classes = useStyles({});

  return (
    <div id={'settings'} className={classes.root}>

    </div>
  );
};

export default Settings;
