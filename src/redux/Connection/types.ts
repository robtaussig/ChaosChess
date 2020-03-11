import { ReadyState } from 'react-use-websocket';

export enum MessageTypes {
  JoinedRoom = 'JoinedRoom',
  ChangedName = 'ChangedName',
  None = 'None',
}

interface BaseMessage {
  type: MessageTypes;
  data: any & {
    uuid: string;
  };
}

export interface JoinMessage extends BaseMessage {
  type: MessageTypes.JoinedRoom,
  data: {
    name: string,
    uuid: string,
    room: string,
  },
}

export interface RenameMessage extends BaseMessage {
  type: MessageTypes.ChangedName,
  data: {
    uuid: string,
    name: string,
  };
}

export type Message = JoinMessage | RenameMessage;

export interface ConnectionState {
  status: ReadyState;
  uuid: string;
  messageHistory: Message[];
  roomId: string;
}

export { ReadyState }
