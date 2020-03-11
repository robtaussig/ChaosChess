import React, { createContext, useContext } from 'react';

export type SendMessage = (message: string) => void;

const socketContext = createContext<SendMessage>(null);

export const SocketProvider = socketContext.Provider;

export const useSocket = () => {
  const sendMessage = useContext(socketContext);

  return sendMessage;
};
