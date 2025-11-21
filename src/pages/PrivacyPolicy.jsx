import React from 'react';

const PrivacyPolicy = () => {
    return (
        <div className="container mx-auto px-4 py-8 max-w-3xl">
            <h1 className="text-3xl font-bold text-fifa-blue mb-6">Política de Privacidad</h1>
            <div className="bg-white rounded-lg shadow-md p-8 space-y-6 text-gray-700">
                <p>En Mundial 2026, nos tomamos tu privacidad en serio.</p>
                <ul className="list-disc pl-5 space-y-2">
                    <li>Solo recolectamos tu email y nombre de usuario para el funcionamiento del juego.</li>
                    <li>No compartimos tus datos con terceros.</li>
                    <li>Usamos cookies solo para mantener tu sesión iniciada.</li>
                </ul>
            </div>
        </div>
    );
};

export default PrivacyPolicy;
