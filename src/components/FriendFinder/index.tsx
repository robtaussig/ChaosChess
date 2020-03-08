import React, { FC } from 'react';
import useStyles from './styles';

export const FriendFinder: FC = () => {
  const classes = useStyles({});

  return (
    <div id={'friend-finder'} className={classes.root}>
      Coming soon...
    </div>
  );
};

export default FriendFinder;
