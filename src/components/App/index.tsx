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
  JoinPhase,
} from '../../redux/Connection';
import {
  hostTable,
} from '../../redux/Connection/actions';
import { userSelector } from '../../redux/User';
import { SocketProvider } from '../../hooks/useSocket';
import { setName, joinRoom, receiveMessage } from '../../messaging';
import { waitingRoomJoined, requestJoin, startGameFromJoin } from '../../redux/Connection/actions';
import { gameStarted } from '~redux/Game';

interface AppProps {
  children?: any,
}

//TODO: Use match.params.roomId to start game immediately

const WS_ADDR = 'wss://robtaussig.com/ws/';

export const App: FC<AppProps> = () => {
  const classes = useStyles({});
  const dispatch = useDispatch();
  const joinPhase = useRef<JoinPhase>(null);
  const connection = useSelector(connectionSelector);
  const { name, avatar } = useSelector(userSelector);
  const roomMatch: { params: { roomId: string } } = useRouteMatch('/room/:roomId');
  const roomIdFromParams = roomMatch?.params?.roomId;
  const gameMatch: { params: { gameId: string } } = useRouteMatch('/game/:gameId');
  const gameIdFromParams = gameMatch?.params?.gameId;

  joinPhase.current = connection.joinPhase;
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
    if (readyState === ReadyState.OPEN && !gameIdFromParams) {
      joinRoom(connection.uuid, connection.roomId, sendMessage);
    }
  }, [readyState, sendMessage, connection.roomId, connection.uuid, gameIdFromParams]);

  useEffect(() => {
    if (roomIdFromParams && joinPhase.current !== JoinPhase.Requested) {
      if (readyState === ReadyState.OPEN) {
        dispatch(requestJoin(sendMessage, roomIdFromParams, 2000, () => {
          dispatch(privateRoomJoined(roomIdFromParams));
          dispatch(hostTable(sendMessage));
        }));
      }
    }
  }, [sendMessage, readyState, roomIdFromParams]);

  useEffect(() => {
    if (gameIdFromParams && gameIdFromParams !== connection.roomId) {
      if (readyState === ReadyState.OPEN && gameIdFromParams !== 'vs-ai') {
        dispatch(waitingRoomJoined(gameIdFromParams));
        joinRoom(gameIdFromParams, gameIdFromParams, sendMessage);
      }
    }
  }, [sendMessage, readyState, gameIdFromParams, connection.roomId]);

  useEffect(() => {
    if (connection.joinPhase === JoinPhase.Waiting && lastMessage?.data === 'joined') {
      const join = async () => {
        const joined = await dispatch(requestJoin(sendMessage, connection.roomId, 2000, () => {
          dispatch(privateRoomJoined(connection.roomId));
          dispatch(hostTable(sendMessage));
          dispatch(gameStarted({
            opponent: '',
            isWhite: true,
          }));
        }));
        if (joined) {
          dispatch(startGameFromJoin(connection.roomId));
        }
      };

      join();
    }
  }, [lastMessage, connection.joinPhase, connection.roomId]);

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
