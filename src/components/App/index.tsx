import React, { FC, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useWebsocket, { ReadyState } from 'react-use-websocket';
import useStyles from './styles';
import Header from '../Header/';
import Main from '../Main/';
import Dashboard from '../Dashboard/';
import {
  statusChanged,
  messageReceived,
  connectionSelector,
} from '../../redux/Connection';
import { userSelector } from '../../redux/User';
import { SocketProvider } from '../../hooks/useSocket';
import { setName, joinRoom, receiveMessage } from '../../messaging';

interface AppProps {
  children?: any,
}

export const App: FC<AppProps> = () => {
  const classes = useStyles({});
  const dispatch = useDispatch();
  const { roomId, uuid } = useSelector(connectionSelector);
  const { name, avatar } = useSelector(userSelector);

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
  ] = useWebsocket('wss://robtaussig.com/ws/', STATIC_OPTIONS);

  useEffect(() => {
    if (lastMessage?.data) {
      dispatch(
        receiveMessage(lastMessage?.data, sendMessage)
      );
    }
  }, [lastMessage]);

  useEffect(() => {
    dispatch(statusChanged(readyState));    
  }, [readyState]);

  useEffect(() => {
    if (readyState === ReadyState.OPEN) {
      setName(uuid, name, avatar, sendMessage);
    }
  }, [readyState, sendMessage, name, avatar, uuid]);

  useEffect(() => {
    if (readyState === ReadyState.OPEN) {
      joinRoom(uuid, roomId, sendMessage);
    }
  }, [readyState, sendMessage, roomId, uuid]);

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
