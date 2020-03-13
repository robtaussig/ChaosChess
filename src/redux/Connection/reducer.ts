import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  ReadyState,
  ConnectionState,
  Message,
  MessageTypes,
  JoinPhase,
  HostPhase,
  RoomCreatedPayload,
} from './types';
import { returnHome } from '../App';
import { v4 as uuidv4 } from 'uuid';

const INITIAL_STATE: ConnectionState = {
  status: ReadyState.CLOSED,
  uuid: uuidv4(),
  messageHistory: {},
  notifications: [],
  roomId: 'Main',
  hostedTable: null,
  hostPhase: HostPhase.None,
  joinedTable: null,
  joinPhase: JoinPhase.None,
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
      if (action.payload) {
        state.hostPhase = HostPhase.Waiting;
      } else {
        state.hostPhase = HostPhase.None;
      }
    },
    joinRequested: (state, action: PayloadAction<string>) => {
      state.joinPhase = JoinPhase.Requested;
      state.joinedTable = action.payload;
    },
    roomCreated: (state, action: PayloadAction<RoomCreatedPayload>) => {
      state.roomId = action.payload.roomId;
      state.hostPhase = HostPhase.Joined;
    },
    joinToRequestAccepted: (state, action: PayloadAction<string>) => {
      state.joinPhase = JoinPhase.Joined;
    },
    requestToJoinCancelled: (state, action: PayloadAction<string>) => {
      state.joinPhase = JoinPhase.None;
      state.joinedTable = null;
    },
  },
  extraReducers: {
    [returnHome.type]: (state) => {
      return {
        ...state,
        hostedTable: null,
        hostPhase: HostPhase.None,
        joinedTable: null,
        joinPhase: JoinPhase.None,
      };
    },
  },
});
