import React, { FC, useEffect, useMemo, useCallback, useRef, useState } from 'react';
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

const WS_ADDR = 'wss://robtaussig.com/ws/';

export const App: FC<AppProps> = () => {
  const classes = useStyles({});
  const dispatch = useDispatch();
  const connectionAttempt = useRef<number>(0);
  const [wsAddress, setWsAddress] = useState<string>(`${WS_ADDR}?conn=${connectionAttempt.current}`);
  const messageQueue = useRef<string[]>([]);
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
    getWebSocket,
  ] = useWebsocket(wsAddress, STATIC_OPTIONS);

  const sendMessageWithReconnect = useCallback((message: string) => {
    const currentReadyState = getWebSocket().readyState;
    if (currentReadyState === ReadyState.OPEN) {
      sendMessage(message);
    } else {
      messageQueue.current.push(message);
      
      if (currentReadyState !== ReadyState.CONNECTING) {
        setWsAddress(`${WS_ADDR}?conn=${++connectionAttempt.current}`);
      }
    }
  }, [sendMessage]);

  useEffect(() => {
    if (lastMessage?.data) {
      dispatch(
        receiveMessage(lastMessage?.data, sendMessageWithReconnect)
      );
    }
  }, [lastMessage]);

  useEffect(() => {
    dispatch(statusChanged(readyState));
  }, [readyState]);

  useEffect(() => {
    if (readyState === ReadyState.OPEN) {
      setName(uuid, name, avatar, sendMessageWithReconnect);
    }
  }, [readyState, sendMessageWithReconnect, name, avatar, uuid]);

  useEffect(() => {
    if (readyState === ReadyState.OPEN) {
      joinRoom(uuid, roomId, sendMessageWithReconnect);

      //Give chance to join room before sending message
      setTimeout(() => {
        messageQueue.current.splice(0).forEach(message => {
          sendMessageWithReconnect(message);
        });
      }, 2000);
    }
  }, [readyState, sendMessageWithReconnect, roomId, uuid]);

  return (
    <div id={'app'} className={classes.root}>
      <SocketProvider value={sendMessageWithReconnect}>
        <Header/>
        <Main/>
        <Dashboard/>
      </SocketProvider>
    </div>
  );
};

export default App;
