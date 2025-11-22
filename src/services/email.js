const BASE_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:4000';
const API_URL = `${BASE_URL}/api`;

const getHeaders = () => {
    const token = localStorage.getItem('token');
    return {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    };
};

export const sendEmail = async (targetUserId, subject, message) => {
    const response = await fetch(`${API_URL}/email/send`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify({ targetUserId, subject, message })
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Error al enviar correo');
    }
    return await response.json();
};