import './responsive.scss';
import React, { FC, useEffect, useMemo, useCallback, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useWebsocket, { ReadyState } from 'react-use-websocket';
import { useRouteMatch } from "react-router-dom";
import useStyles from './styles';
import Header from '../Header/';
import Main from '../Main/';
import Dashboard from '../Dashboard/';
import {
  statusChanged,
  connectionSelector,
  privateRoomJoined,
} from '../../redux/Connection';
import {
  hostTable,
} from '../../redux/Connection/actions';
import { userSelector } from '../../redux/User';
import { SocketProvider } from '../../hooks/useSocket';
import { setName, joinRoom, receiveMessage } from '../../messaging';
import { getTables, requestJoin } from '../../redux/Connection/actions';

interface AppProps {
  children?: any,
}

//TODO: Use match.params.roomId to start game immediately

const WS_ADDR = 'wss://robtaussig.com/ws/';

export const App: FC<AppProps> = () => {
  const classes = useStyles({});
  const dispatch = useDispatch();
  const connection = useSelector(connectionSelector);
  const { name, avatar } = useSelector(userSelector);
  const match: { params: { roomId: string } } = useRouteMatch('/:roomId');
  const roomIdFromParams = match?.params?.roomId;

  const {
    sendMessage,
    lastMessage,
    readyState,
  } = useWebsocket(WS_ADDR, {
    retryOnError: true,
    shouldReconnect: () => true,
    reconnectAttempts: 100,
    reconnectInterval: 5000,
  });

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
      setName(connection.uuid, name, avatar, sendMessage);
    }
  }, [readyState, sendMessage, name, avatar, connection.uuid]);

  useEffect(() => {
    if (readyState === ReadyState.OPEN) {
      joinRoom(connection.uuid, connection.roomId, sendMessage);
    }
  }, [readyState, sendMessage, connection.roomId, connection.uuid]);

  useEffect(() => {
    if (roomIdFromParams) {
      if (readyState === ReadyState.OPEN) {
        dispatch(requestJoin(sendMessage, roomIdFromParams, 1000, () => {
          dispatch(privateRoomJoined(roomIdFromParams));
          dispatch(hostTable(sendMessage));
        }));
      }
    }
  }, [readyState, roomIdFromParams]);
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
