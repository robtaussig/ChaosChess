import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ReadyState, ConnectionState, Message, MessageTypes } from './types';
import { v4 as uuidv4 } from 'uuid';

const INITIAL_STATE: ConnectionState = {
  status: ReadyState.CLOSED,
  uuid: uuidv4(),
  messageHistory: {},
  notifications: [],
  roomId: 'Main',
  hostedTable: null,
};

export default createSlice({
  name: 'connection',
  initialState: INITIAL_STATE,
  reducers: {
    statusChanged: (state, action: PayloadAction<ReadyState>) => {
      state.status = action.payload;
    },
    messageReceived: (state, action: PayloadAction<Message>) => {
      if (
        action.payload &&
        action.payload.data.uuid &&
        action.payload.data.uuid !== state.uuid
      ) {
        if (action.payload.type === MessageTypes.Disconnected) {
          state.notifications.push(`${action.payload.data.name} disconnected`);
          delete state.messageHistory[action.payload.data.uuid];
        } else if (action.payload.type === MessageTypes.DropTable) {
          state.messageHistory[action.payload.data.uuid] =
            state.messageHistory[action.payload.data.uuid] || [];

          state.messageHistory[action.payload.data.uuid] =
            state.messageHistory[action.payload.data.uuid]
              .filter(({ type }) => {
                return type !== MessageTypes.HostTable;
              });
        } else {
          state.messageHistory[action.payload.data.uuid] =
            state.messageHistory[action.payload.data.uuid] || [];
  
          state.messageHistory[action.payload.data.uuid] =
            state.messageHistory[action.payload.data.uuid]
              .filter(({ type }) => {
                return type !== action.payload.type;
              })
              .concat(action.payload);
        }
      }
    },
    tableHosted: (state, action: PayloadAction<string>) => {
      state.hostedTable = action.payload;
    },
  },
  extraReducers: {

  },
});
