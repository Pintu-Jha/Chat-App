import React, {createContext, useContext, useEffect, useState} from 'react';
import socketio from 'socket.io-client';
import {getToken, TOKEN_KEY} from '../utills/CustomAsyncStorage';
import {baseUrl} from '@env';

const getSocket = async () => {
  const token = await getToken(TOKEN_KEY);

  const socket = socketio(baseUrl, {
    withCredentials: true,
    auth: {token},
  });
  return socket;
};

const SocketContext = createContext<{
  socket: ReturnType<typeof socketio> | null;
}>({
  socket: null,
});

const useSocket = () => useContext(SocketContext);

const SocketProvider: React.FC<{children: React.ReactNode}> = ({children}) => {
  const [socket, setSocket] = useState<ReturnType<typeof socketio> | null>(
    null,
  );

  const socketSetUp = async () => {
    setSocket(await getSocket());
  };
  useEffect(() => {
    socketSetUp();
  }, []);

  return (
    <SocketContext.Provider value={{socket}}>{children}</SocketContext.Provider>
  );
};

export {SocketProvider, useSocket};
