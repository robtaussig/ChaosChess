import { SendMessage } from '../hooks/useSocket';
import { MessageTypes, roomCreated } from '../redux/Connection';
import { AppThunk } from '../redux/types';
import { v4 as uuidv4 } from 'uuid';
export interface Response {
  messageId: string;
  originalMessage: string;
  message: string;
}

import { isMessageType } from './util';

const responsePromises: {
  [messageId: string]: (response: string) => void;
} = {};

export const expectResponse = (
  sendMessage: SendMessage,
  message: string,
  targetUuid: string,
  timeoutMS: number = 10000 //Timeout after 10 seconds
) => {
  const messageId = uuidv4();

  return new Promise<Response>((resolve, reject) => {
    const timeout = setTimeout(() => {
      delete responsePromises[messageId];
      reject(`Request timed out after ${timeoutMS}ms`);
    }, timeoutMS);

    responsePromises[messageId] = (response: string) => {
      clearTimeout(timeout);

      resolve({
        messageId,
        originalMessage: message,
        message: response,
      });
    };

    sendMessage(`${MessageTypes.ResponseExpected}||${targetUuid}||${messageId}||${message}`);
  });
};

const acceptRequestToJoin = (
  sendMessage: SendMessage,
  senderUuid: string,
  messageId: string,
): AppThunk<void> => (dispatch, getState) => {
  //Handle case where already joined with someone else
  //TODO: actually create room
  const { connection } = getState();
  dispatch(roomCreated({
    roomId: connection.uuid,
    opponent: senderUuid,
  }));
  sendMessage(`${MessageTypes.Response}||${senderUuid}||${messageId}||${MessageTypes.RequestToJoinAccepted}`);
}

const sendBoardState = (
  sendMessage: SendMessage,
  senderUuid: string,
  messageId: string,
  board: string,
): void => {
  sendMessage(`${MessageTypes.Response}||${senderUuid}||${messageId}||${board}`);
};

const sendResponse = (
  respond: SendMessage,
  senderUuid: string,
  messageId: string,
  originalMessage: string,
): AppThunk<void> => (dispatch, getState) => {
  if (isMessageType(originalMessage, MessageTypes.RequestJoin)) {
    dispatch(acceptRequestToJoin(respond, senderUuid, messageId));
  } else if (originalMessage === MessageTypes.GetBoard) {
    const { chess } = getState();
    sendBoardState(respond, senderUuid, messageId, chess.board);
  }
};

export const respondToMessage = (
  message: string,
  respond: SendMessage,
): AppThunk<void> => (dispatch, getState) => {
  const { connection } = getState();
  const [sender, messageData] = message.split(':');
  const [,, ...senderUuid] = sender.split('-');
  const [,uuid, messageId,...originalMessage] = messageData.split('||');
  if (uuid === connection.uuid) {
    dispatch(sendResponse(
      respond,
      senderUuid.join('-'),
      messageId,
      originalMessage.join('||')
    ));
  }
};

export const handleMessageResponse = (
  message: string,
): AppThunk<void> => (dispatch, getState) => {  
  const [, messageData] = message.split(':');
  const [,, messageId,...originalMessage] = messageData.split('||');
  if (responsePromises[messageId]) {
    const promise = responsePromises[messageId];
    delete responsePromises[messageId];
    return promise(originalMessage.join('||'));
  }
};
