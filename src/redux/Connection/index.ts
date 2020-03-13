import connectionReducer from './reducer';
import { RootState } from '../types';

export const {
  statusChanged,
  messageReceived,
  tableHosted,
  joinRequested,
  roomCreated,
  joinToRequestAccepted,
} = connectionReducer.actions;

export const reducer = connectionReducer.reducer;

export const connectionSelector = (state: RootState) => state.connection;

export {
  ConnectionState,
  ReadyState,
  Message,
  MessageTypes,
  JoinMessage,
  RenameMessage,
  DisconnectedMessage,
  JoinPhase,
  HostPhase,
  RoomCreatedPayload,
} from './types';
