import { SendMessage } from '../hooks/useSocket';
import {
  Message,
  MessageTypes,
  JoinMessage,
  RenameMessage,
  DisconnectedMessage,
  messageReceived,
} from '../redux/Connection';
import { Avatar } from '../redux/User';
import { AppThunk } from '../redux/types';

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

export const hostTable = (
  sendMessage: SendMessage,
): void => {
  sendMessage(`${MessageTypes.HostTable}||`);
};

export const getTables = (
  sendMessage: SendMessage,
): void => {
  sendMessage(`${MessageTypes.GetTables}||`);
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

const getNameMessageDataFromDisconnect =
  (message: string): DisconnectedMessage['data'] => {
    const [, uuidWithName] = message.split('||');
    const [name,, ...uuid] = uuidWithName.split('-');

    return {
      name,
      uuid: uuid.join('-'),
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
): AppThunk<void> => (dispatch, getState) => {
  if (isMessageType(message, MessageTypes.JoinedRoom)) {
    inRoom(respond);
    dispatch(messageReceived({
      type: MessageTypes.JoinedRoom,
      data: getJoinMessageData(message),
    }));
  } else if (isMessageType(message, MessageTypes.ChangedName)) {
    dispatch(messageReceived({
      type: MessageTypes.ChangedName,
      data: getNameMessageData(message),
    }));
  } else if (isMessageType(message, MessageTypes.InRoom)) {
    dispatch(messageReceived({
      type: MessageTypes.InRoom,
      data: getUuidAndNameFromMessage(message),
    }));
  } else if (isMessageType(message, MessageTypes.Disconnected)) {
    dispatch(messageReceived({
      type: MessageTypes.Disconnected,
      data: getNameMessageDataFromDisconnect(message),
    }));
  } else if (isMessageType(message, MessageTypes.HostTable)) {
    dispatch(messageReceived({
      type: MessageTypes.HostTable,
      data: getUuidAndNameFromMessage(message),
    }));
  } else if (isMessageType(message, MessageTypes.GetTables)) {
    const { connection } = getState();
    if (connection.hostedTable) {
      hostTable(respond);
    }
  }
};
