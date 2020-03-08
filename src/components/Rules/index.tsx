import React, { FC } from 'react';
import useStyles from './styles';

export const Rules: FC = () => {
  const classes = useStyles({});

  return (
    <div id={'rules'} className={classes.root}>
      Coming soon...
    </div>
  );
};

export default Rules;
