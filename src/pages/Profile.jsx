import React, { useState, useEffect } from 'react';
import { getCurrentUser } from '../services/auth';

const Profile = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const currentUser = getCurrentUser();
        setUser(currentUser);
    }, []);

    if (!user) return <div className="text-center py-10">Cargando perfil...</div>;

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
                {/* Header / Cover */}
                <div className="h-48 bg-gradient-to-r from-fifa-blue to-blue-800 relative">
                    <div className="absolute -bottom-16 left-8">
                        <div className="w-32 h-32 bg-white rounded-full p-1 shadow-lg">
                            <div className="w-full h-full bg-gray-200 rounded-full flex items-center justify-center text-4xl text-gray-500">
                                <i className="fas fa-user"></i>
                            </div>
                        </div>
                    </div>
                </div>

                {/* User Info */}
                <div className="pt-20 px-8 pb-8">
                    <div className="flex justify-between items-start">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-800">{user.username}</h1>
                            <p className="text-gray-500">Miembro desde Noviembre 2025</p>
                        </div>
                        <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition font-medium">
                            <i className="fas fa-edit mr-2"></i> Editar Perfil
                        </button>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                        <StatBox icon="fa-coins" label="Monedas" value="1,500" color="text-yellow-500" bg="bg-yellow-50" />
                        <StatBox icon="fa-trophy" label="Torneos Ganados" value="3" color="text-fifa-blue" bg="bg-blue-50" />
                        <StatBox icon="fa-futbol" label="Partidos Jugados" value="42" color="text-green-600" bg="bg-green-50" />
                    </div>

                    {/* Recent Activity or Bio */}
                    <div className="mt-8">
                        <h2 className="text-xl font-bold text-gray-800 mb-4">Sobre Mí</h2>
                        <p className="text-gray-600 leading-relaxed">
                            Fanático del fútbol y estratega en potencia. Buscando ganar la Copa Mundial 2026 con mi equipo favorito.
                            ¡Siempre listo para un partido amistoso!
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

const StatBox = ({ icon, label, value, color, bg }) => (
    <div className={`${bg} p-6 rounded-xl flex items-center space-x-4`}>
        <div className={`w-12 h-12 ${bg} brightness-90 rounded-full flex items-center justify-center ${color} text-xl`}>
            <i className={`fas ${icon}`}></i>
        </div>
        <div>
            <p className="text-sm text-gray-500 font-medium">{label}</p>
            <p className={`text-2xl font-bold ${color}`}>{value}</p>
        </div>
    </div>
);

export default Profile;
