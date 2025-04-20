import { createContext, useContext, useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { AuthContext } from './authContext.jsx';

export const SocketContext = createContext();

// eslint-disable-next-line react/prop-types
export const SocketContextProvider = ({ children }) => {
    const { currentUser } = useContext(AuthContext);
    const [socket, setSocket] = useState(null);

    useEffect(() => {
        setSocket(io('http://localhost:4000'));
    }, []);

    useEffect(() => {
        currentUser && socket?.emit('newUser', currentUser.id);
    }, [currentUser, socket]);

    return <SocketContext.Provider value={{ socket }}>{children}</SocketContext.Provider>;
};
