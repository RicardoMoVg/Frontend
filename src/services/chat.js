import { getCurrentUser } from './auth';

// --- CONFIGURACIÓN DE URL DINÁMICA ---
// Detecta automáticamente si estás en Vercel (Nube) o en Localhost
const BASE_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:4000';
const API_URL = `${BASE_URL}/api`;

// Helper para obtener los headers con el token de seguridad
const getHeaders = () => {
    const token = localStorage.getItem('token');
    return {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    };
};

// Obtener lista de usuarios para el sidebar
export const getUsers = async () => {
    const response = await fetch(`${API_URL}/users`, {
        headers: getHeaders()
    });

    if (!response.ok) {
        throw new Error('Error al obtener usuarios');
    }

    return await response.json();
};

// Obtener historial de mensajes de una sala
export const getMessageHistory = async (room) => {
    const response = await fetch(`${API_URL}/messages/${room}`, {
        headers: getHeaders()
    });

    if (!response.ok) {
        throw new Error('Error al obtener historial');
    }

    return await response.json();
};

// Iniciar o recuperar un chat privado seguro
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

    // Retorna el objeto con el ID del grupo: { groupId: 15 }
    return await response.json();
};