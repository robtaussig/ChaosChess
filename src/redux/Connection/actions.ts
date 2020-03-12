import { AppThunk } from '../types';
import { tableHosted } from './';
import { SendMessage } from '../../hooks/useSocket';
import {
  hostTable as hostTableMessage,
  getTables as getTablesMessage,
} from '../../messaging';

export const hostTable = (sendMessage: SendMessage): AppThunk<void> =>
  async (dispatch, getState) => {
    const { connection } = getState();
    hostTableMessage(
      sendMessage,
    );
    dispatch(tableHosted(connection.uuid));
  };

export const getTables = (sendMessage: SendMessage): AppThunk<void> =>
  async (dispatch, getState) => {
    getTablesMessage(sendMessage);
  };
