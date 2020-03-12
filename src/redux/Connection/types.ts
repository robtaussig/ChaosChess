import { ReadyState } from 'react-use-websocket';
import { Avatar } from '../User';

export enum MessageTypes {
  JoinedRoom = 'JoinedRoom',
  ChangedName = 'ChangedName',
  Disconnected = 'Disconnected',
  InRoom = 'InRoom',
  HostTable = 'HostTable',
  DropTable = 'DropTable',
  GetTables = 'GetTables',
  HasTable = 'HasTable',
  None = 'None',
}

interface BaseMessage {
  type: MessageTypes;
  data: any & {
    uuid: string;
  };
}

export interface JoinMessage extends BaseMessage {
  type: MessageTypes.JoinedRoom;
  data: {
    uuid: string;
    room: string;
  };
}

export interface RenameMessage extends BaseMessage {
  type: MessageTypes.ChangedName;
  data: {
    uuid: string;
    name: string;
    avatar: Avatar;
  };
}

export interface InRoomMessage extends BaseMessage {
  type: MessageTypes.InRoom;
  data: {
    uuid: string;
    name: string;
    avatar: Avatar;
  };
}

export interface DisconnectedMessage extends BaseMessage {
  type: MessageTypes.Disconnected;
  data: {
    uuid: string;
    name: string;
  };
}

export interface HostTableMessage extends BaseMessage {
  type: MessageTypes.HostTable;
  data: {
    uuid: string;
    name: string;
    avatar: Avatar;
  };
}

export interface DropTableMessage extends BaseMessage {
  type: MessageTypes.DropTable;
  data: {
    uuid: string;
    name: string;
    avatar: Avatar;
  };
}

export type Message =
  JoinMessage |
  RenameMessage |
  InRoomMessage |
  DisconnectedMessage |
  HostTableMessage |
  DropTableMessage;

export interface ConnectionState {
  status: ReadyState;
  uuid: string;
  messageHistory: {
    [uuid: string]: Message[];
  };
  notifications: string[];
  roomId: string;
  hostedTable: string;
}

export { ReadyState }
