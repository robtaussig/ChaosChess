import { ReadyState } from 'react-use-websocket';

export type Message = any;

export interface ConnectionState {
  status: ReadyState;
  uuid: string;
  messageHistory: Message[];
  roomId: string;
}

export { ReadyState }
