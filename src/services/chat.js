import { getCurrentUser } from './auth';

const API_URL = '/api';

const getHeaders = () => {
    const token = localStorage.getItem('token');
    return {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    };
};

export const getUsers = async () => {
    const response = await fetch(`${API_URL}/users`, {
        headers: getHeaders()
    });
    if (!response.ok) throw new Error('Error al obtener usuarios');
    return await response.json();
};

export const getMessageHistory = async (room) => {
    const response = await fetch(`${API_URL}/messages/${room}`, {
        headers: getHeaders()
    });
    if (!response.ok) throw new Error('Error al obtener historial');
    return await response.json();
};

export const initiatePrivateChat = async (targetUserId) => {
    const response = await fetch(`${API_URL}/chat/private/initiate`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify({ targetUserId: parseInt(targetUserId) })
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error al iniciar chat privado');
    }

    return await response.json(); // Returns { groupId: ... }
};
