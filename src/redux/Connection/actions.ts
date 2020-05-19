import { AppThunk } from '../types';
import {
  tableHosted,
  joinRequested,
  joinToRequestAccepted,
  requestToJoinCancelled,
  tablesCleared,
  MessageTypes } from './';
import { SendMessage } from '../../hooks/useSocket';
import {
  hostTable as hostTableMessage,
  getTables as getTablesMessage,
  dropTable as dropTableMessage,
  requestJoin as requestJoinMessage,
} from '../../messaging';

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
        dispatch(joinToRequestAccepted(uuidToJoin));
      }
    } catch (e) {
      //Handle timeout
      console.error(e);
      dispatch(requestToJoinCancelled());
      if (onError) onError(e);
    }
  };
