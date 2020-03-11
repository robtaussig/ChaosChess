import { SendMessage } from '../hooks/useSocket';
import {
  Message,
  MessageTypes,
  JoinMessage,
  RenameMessage,
} from '../redux/Connection';
import { Avatar } from '../redux/User';

export const setName = (
  uuid: string,
  name: string,
  avatar: Avatar,
  sendMessage: SendMessage,
): void => {
  sendMessage(`/name ${name}-${avatar}-${uuid}`);
  sendMessage(`${MessageTypes.ChangedName}||${uuid}||${name}||${avatar}`);
};

export const joinRoom = (
  uuid: string,
  roomId: string,
  sendMessage: SendMessage,
): void => {
  sendMessage(`/join ${roomId}`);
  sendMessage(`${MessageTypes.JoinedRoom}||${uuid}||${roomId}`);
};

export const inRoom = (
  sendMessage: SendMessage,
): void => {
  sendMessage(`${MessageTypes.InRoom}||`);
};

const getJoinMessageData = (message: string): JoinMessage['data'] => {
  const [,uuid, room] = message.split('||');
  return { uuid, room };
};

const getNameMessageData = (message: string): RenameMessage['data'] => {
  const [, uuid, name, avatar] = message.split('||');

  return {
    uuid,
    name,
    avatar: avatar as Avatar,
  };
};

const getUuidAndNameFromMessage =
  (message: string): { name: string, avatar: Avatar, uuid: string } => {
    const [nameWithAvatarAndUuid,] = message.split(':');
    const [name, avatar, ...uuid] = nameWithAvatarAndUuid.split('-');

    return {
      name,
      avatar: avatar as Avatar,
      uuid: uuid.join('-'),
    };
  };

const isMessageType = (message: string, type: MessageTypes): boolean => {
  if (!message) return;

  return message.indexOf(`${type}||`) > -1;
};

export const receiveMessage = (
  message: string,
  respond: SendMessage,
): Message => {
  if (isMessageType(message, MessageTypes.JoinedRoom)) {
    inRoom(respond);
    return {
      type: MessageTypes.JoinedRoom,
      data: getJoinMessageData(message),
    };
  } else if (isMessageType(message, MessageTypes.ChangedName)) {
    return {
      type: MessageTypes.ChangedName,
      data: getNameMessageData(message),
    };
  } else if (isMessageType(message, MessageTypes.InRoom)) {
    return {
      type: MessageTypes.InRoom,
      data: getUuidAndNameFromMessage(message),
    };
  }
};
