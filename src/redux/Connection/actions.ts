import { AppThunk } from '../types';
import {
  tableHosted,
  joinRequested,
  joinToRequestAccepted,
  requestToJoinCancelled,
  tablesCleared,
  joinWaiting,
  MessageTypes,
  InRoomMessage,
} from './';
import { SendMessage } from '../../hooks/useSocket';
import {
  hostTable as hostTableMessage,
  getTables as getTablesMessage,
  dropTable as dropTableMessage,
  requestJoin as requestJoinMessage,
} from '../../messaging';
import { gameStarted } from '../Game';

export const hostTable = (sendMessage: SendMessage): AppThunk<void> =>
  async (dispatch, getState) => {
    const { connection } = getState();
    hostTableMessage(
      sendMessage,
    );
    dispatch(tableHosted(connection.uuid));
  };

export const dropTable = (sendMessage: SendMessage): AppThunk<void> =>
  async (dispatch, getState) => {
    dropTableMessage(
      sendMessage,
    );
    dispatch(tableHosted(null));
  };

export const getTables = (sendMessage: SendMessage): AppThunk<void> =>
  async (dispatch, getState) => {
    dispatch(tablesCleared());
    getTablesMessage(sendMessage);
  };

export const requestJoin = (
  sendMessage: SendMessage,
  uuidToJoin: string,
  timeoutMs?: number,
  onError?: (e: Error) => void,
): AppThunk<void> =>
  async (dispatch, getState) => {
    dispatch(joinRequested(uuidToJoin));
    try {
      const response = await requestJoinMessage(sendMessage, uuidToJoin, timeoutMs);
      if (response.message === MessageTypes.RequestToJoinAccepted) {
        return dispatch(joinToRequestAccepted(uuidToJoin));
      }
    } catch (e) {
      //Handle timeout
      console.error(e);
      dispatch(requestToJoinCancelled());
      if (onError) onError(e);
    }
  };

export const waitingRoomJoined = (gameId: string): AppThunk<void> =>
  (dispatch, getState) => {
    dispatch(joinWaiting(gameId));
  };

export const startGameFromJoin = (gameId: string): AppThunk<void> =>
  (dispatch, getState) => {
    const { connection } = getState();
    const joinRoomMessage = connection.messageHistory[gameId].find(({ type }) => type === MessageTypes.InRoom) as InRoomMessage;
    dispatch(gameStarted({
      opponent: joinRoomMessage.data.name,
      isWhite: false,
    }))
  };
