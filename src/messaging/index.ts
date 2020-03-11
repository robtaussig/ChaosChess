import { SendMessage } from '../hooks/useSocket';
import {
  Message,
  MessageTypes,
  JoinMessage,
  RenameMessage,
} from '../redux/Connection';

export const setName = (
  uuid: string,
  name: string,
  sendMessage: SendMessage,
): void => {
  sendMessage(`/name ${name}-${uuid}`);
};

export const joinRoom = (
  uuid: string,
  roomId: string,
  sendMessage: SendMessage,
): void => {
  sendMessage(`/join ${roomId}`);
};

const getNameAndUuidFromBoth = (both: string): { name: string, uuid: string } => {
  const [name, ...uuid] = both.split('-');

  return {
    name,
    uuid: uuid.join('-'),
  };
};

const getJoinMessageData = (message: string): JoinMessage['data'] => {
  const [user, room] = message.split(' joined ');
  return { ...getNameAndUuidFromBoth(user), room };
};

const getNameMessageData = (message: string): RenameMessage['data'] => {
  const [nameWithUUID, ..._rest] = message.split(' ').reverse();

  return getNameAndUuidFromBoth(nameWithUUID);
};

export const receiveMessage = (message: string): Message => {
  if (/^[^\s]* joined/.test(message)) return {
    type: MessageTypes.JoinedRoom,
    data: getJoinMessageData(message),
  };

  if (/^name changed/.test(message)) return {
    type: MessageTypes.ChangedName,
    data: getNameMessageData(message),
  };
};
