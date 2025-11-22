// src/services/auth.js

// --- CORRECCIÓN CRÍTICA: URL DINÁMICA ---
// Esto detecta si estás en Vercel (usa la variable) o en tu PC (usa localhost)
const BASE_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:4000';
const API_URL = `${BASE_URL}/api`;

const handleResponse = async (response) => {
    const text = await response.text();
    let data;
    try {
        data = text ? JSON.parse(text) : {};
    } catch (e) {
        console.error("Error parsing JSON:", text);
        throw new Error("Respuesta inválida del servidor");
    }

    if (!response.ok) {
        throw new Error(data.message || `Error ${response.status}: ${response.statusText}`);
    }
    return data;
};

export const login = async (email, password) => {
    // Ahora la petición viaja correctamente a https://tu-backend-render.com/api/login
    const response = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
    });

    const data = await handleResponse(response);

    if (data.token) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
    }
    return data;
};

export const register = async (username, email, password) => {
    const response = await fetch(`${API_URL}/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }),
    });

    return await handleResponse(response);
};

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
};

export const getCurrentUser = () => {
    const userStr = localStorage.getItem('user');
    if (userStr) return JSON.parse(userStr);
    return null;
};