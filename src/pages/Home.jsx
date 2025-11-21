import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getCurrentUser } from '../services/auth';

const Home = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        setUser(getCurrentUser());
    }, []);

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            <div className="bg-fifa-blue text-white py-20">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-4xl md:text-6xl font-bold mb-4 animate-float">
                        Mundial 2026
                    </h1>
                    <p className="text-xl md:text-2xl mb-8 text-blue-100">
                        La experiencia definitiva de gestión y simulación de fútbol.
                    </p>
                    {!user && (
                        <div className="space-x-4">
                            <Link to="/register" className="bg-fifa-yellow text-fifa-blue px-8 py-3 rounded-full font-bold text-lg hover:bg-yellow-400 transition shadow-lg">
                                ¡Únete Ahora!
                            </Link>
                            <Link to="/login" className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-full font-bold text-lg hover:bg-white hover:text-fifa-blue transition">
                                Iniciar Sesión
                            </Link>
                        </div>
                    )}
                </div>
            </div>

            {/* Features Grid */}
            <div className="container mx-auto px-4 py-12">
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
                    Explora el Torneo
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {/* Chat Card */}
                    <FeatureCard
                        to="/chat"
                        icon="fa-comments"
                        title="Chat Global y Privado"
                        description="Conecta con otros fans, crea grupos y debate sobre los partidos en tiempo real."
                        color="bg-blue-500"
                    />

                    {/* Matches Card */}
                    <FeatureCard
                        to="/matches"
                        icon="fa-futbol"
                        title="Partidos en Vivo"
                        description="Sigue la simulación de partidos minuto a minuto con comentarios en vivo."
                        color="bg-green-600"
                    />

                    {/* Tournaments Card */}
                    <FeatureCard
                        to="/tournaments"
                        icon="fa-trophy"
                        title="Torneos"
                        description="Participa en torneos, gestiona tu equipo y alcanza la gloria."
                        color="bg-yellow-500"
                    />

                    {/* Profile Card */}
                    <FeatureCard
                        to="/profile"
                        icon="fa-user-circle"
                        title="Tu Perfil"
                        description="Personaliza tu avatar, gestiona tus recompensas y ve tus estadísticas."
                        color="bg-purple-600"
                    />

                    {/* Rewards Card */}
                    <FeatureCard
                        to="/rewards"
                        icon="fa-gift"
                        title="Recompensas"
                        description="Completa tareas diarias y gana monedas para desbloquear contenido."
                        color="bg-red-500"
                    />

                    {/* Admin Card (Optional/Hidden usually) */}
                    <FeatureCard
                        to="/admin"
                        icon="fa-cogs"
                        title="Panel de Control"
                        description="Herramientas de administración para gestionar el mundial."
                        color="bg-gray-700"
                    />
                </div>
            </div>
        </div>
    );
};

const FeatureCard = ({ to, icon, title, description, color }) => (
    <Link to={to} className="block group">
        <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition duration-300 overflow-hidden h-full border border-gray-100">
            <div className={`${color} h-2 group-hover:h-3 transition-all duration-300`}></div>
            <div className="p-6">
                <div className={`w-12 h-12 ${color} bg-opacity-10 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition duration-300`}>
                    <i className={`fas ${icon} text-2xl ${color.replace('bg-', 'text-')}`}></i>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-fifa-blue transition">{title}</h3>
                <p className="text-gray-600">{description}</p>
            </div>
        </div>
    </Link>
);

export default Home;
