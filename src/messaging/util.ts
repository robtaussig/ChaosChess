import {
  MessageTypes,
} from '../redux/Connection';

export const isMessageType = (message: string, type: MessageTypes): boolean => {
  if (!message) return;

  return message.indexOf(`${type}||`) > -1;
};
