import { AppThunk } from '../types';
import {
  tableHosted,
  joinRequested,
  joinToRequestAccepted,
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
    getTablesMessage(sendMessage);
  };

export const requestJoin = (
  sendMessage: SendMessage,
  uuidToJoin: string,
): AppThunk<void> =>
  async (dispatch, getState) => {
    dispatch(joinRequested(uuidToJoin));
    const response = await requestJoinMessage(sendMessage, uuidToJoin);
    if (response.message === MessageTypes.RequestToJoinAccepted) {
      //TODO: Actually join room
      dispatch(joinToRequestAccepted(uuidToJoin));
    } else {
      //TODO: Handle fail to join
    }
  };
