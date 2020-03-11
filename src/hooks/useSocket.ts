import React, { createContext, useContext } from 'react';
import { Message } from '../redux/Connection';

export type SendMessage = (message: Message) => void;

const socketContext = createContext<SendMessage>(null);

export const SocketProvider = socketContext.Provider;

export const useSocket = () => {
  const sendMessage = useContext(socketContext);

  return sendMessage;
};
