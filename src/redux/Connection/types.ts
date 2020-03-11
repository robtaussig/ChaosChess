import { ReadyState } from 'react-use-websocket';
import { Avatar } from '../User';

export enum MessageTypes {
  JoinedRoom = 'JoinedRoom',
  ChangedName = 'ChangedName',
  InRoom = 'InRoom',
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

export type Message =
  JoinMessage |
  RenameMessage |
  InRoomMessage;

export interface ConnectionState {
  status: ReadyState;
  uuid: string;
  messageHistory: Message[];
  roomId: string;
}

export { ReadyState }
