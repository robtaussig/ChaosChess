import React, { FC, useEffect } from 'react';
import useStyles from './styles';
import { useDispatch } from 'react-redux';
import { useSocket } from '../../hooks/useSocket';
import { getTables } from '../../redux/Connection/actions';

export const FriendFinder: FC = () => {
  const classes = useStyles({});
  const sendMessage = useSocket();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTables(sendMessage));
  }, [dispatch, sendMessage]);

  return (
    <div id={'friend-finder'} className={classes.root}>
      Coming soon...
    </div>
  );
};

export default FriendFinder;
