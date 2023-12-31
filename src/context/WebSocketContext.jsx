import { createContext, useContext, useEffect, useState } from 'react';
import io from 'socket.io-client';

const WebSocketContext = createContext(null);

export const useWebSocket = () => useContext(WebSocketContext);

export const WebSocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = io(
                                  // 'http://localhost:3000'
                                   'https://consultame-api.onrender.com'
                                );
    setSocket(newSocket);

    return () => newSocket.close();
  }, []);

  return (
    <WebSocketContext.Provider value={socket}>
      {children}
    </WebSocketContext.Provider>
  );
};
