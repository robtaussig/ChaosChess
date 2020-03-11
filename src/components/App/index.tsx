import React, { FC, useEffect, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import useWebsocket from 'react-use-websocket';
import useStyles from './styles';
import Header from '../Header/';
import Main from '../Main/';
import Dashboard from '../Dashboard/';
import { statusChanged, messageReceived } from '../../redux/Connection';
import { SocketProvider } from '../../hooks/useSocket';

interface AppProps {
  children?: any,
}

export const App: FC<AppProps> = () => {
  const classes = useStyles({});
  const dispatch = useDispatch();

  const STATIC_OPTIONS = useMemo(() => ({
    retryOnError: true,
    shouldReconnect: () => true,
    reconnectAttempts: 100,
    reconnectInterval: 5000,
  }),[]);

  const [
    sendMessage,
    lastMessage,
    readyState,
  ] = useWebsocket('ws://localhost:8080/ws/', STATIC_OPTIONS);

  useEffect(() => {
    dispatch(messageReceived(lastMessage?.data));
  }, [lastMessage]);

  useEffect(() => {
    dispatch(statusChanged(readyState));
  }, [readyState]);

  return (
    <div id={'app'} className={classes.root}>
      <SocketProvider value={sendMessage}>
        <Header/>
        <Main/>
        <Dashboard/>
      </SocketProvider>
    </div>
  );
};

export default App;
