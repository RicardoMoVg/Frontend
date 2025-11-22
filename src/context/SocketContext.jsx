import React, { createContext, useContext, useEffect, useState } from 'react';
import io from 'socket.io-client';
import { getCurrentUser } from '../services/auth';

const SocketContext = createContext();

export const useSocket = () => useContext(SocketContext);

export const SocketProvider = ({ children }) => {
    const [socket, setSocket] = useState(null);

    useEffect(() => {
        const user = getCurrentUser();
        // Conectar solo si hay usuario autenticado, o permitir conexión anónima si tu backend lo soporta
        // En este caso, conectamos al iniciar la app, pero podríamos pasar el token si fuera necesario
        // ✅ CORRECTO:
        const newSocket = io(import.meta.env.VITE_BACKEND_URL || 'http://localhost:4000', {
            // auth: { token: user?.token } // Si tu backend requiere auth en handshake
        });

        setSocket(newSocket);

        return () => newSocket.close();
    }, []);

    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    );
};
