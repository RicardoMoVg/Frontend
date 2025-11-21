import React, { useState } from 'react';

const AdminDashboard = () => {
    const [activeSection, setActiveSection] = useState('overview');

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-gray-800">Panel de Administración</h1>
                <div className="text-sm text-gray-500">
                    Última actualización: Hoy, 14:30
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                {/* Sidebar Navigation */}
                <div className="bg-white rounded-lg shadow-md p-4 h-fit">
                    <nav className="space-y-2">
                        {[
                            { id: 'overview', label: 'Resumen General', icon: 'fa-chart-line' },
                            { id: 'users', label: 'Usuarios', icon: 'fa-users' },
                            { id: 'matches', label: 'Partidos', icon: 'fa-futbol' },
                            { id: 'settings', label: 'Configuración', icon: 'fa-cog' },
                        ].map((item) => (
                            <button
                                key={item.id}
                                onClick={() => setActiveSection(item.id)}
                                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition ${activeSection === item.id
                                        ? 'bg-fifa-blue text-white'
                                        : 'text-gray-600 hover:bg-gray-50'
                                    }`}
                            >
                                <i className={`fas ${item.icon} w-6`}></i>
                                <span className="font-medium">{item.label}</span>
                            </button>
                        ))}
                    </nav>
                </div>

                {/* Main Content Area */}
                <div className="md:col-span-3 space-y-8">
                    {/* Stats Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <StatCard title="Usuarios Totales" value="1,234" change="+12%" color="blue" icon="fa-users" />
                        <StatCard title="Partidos Jugados" value="56" change="+5%" color="green" icon="fa-futbol" />
                        <StatCard title="Mensajes Hoy" value="8,902" change="+24%" color="purple" icon="fa-comment-dots" />
                    </div>

                    {/* Recent Activity Table */}
                    <div className="bg-white rounded-lg shadow-md overflow-hidden">
                        <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
                            <h3 className="font-bold text-gray-800">Usuarios Recientes</h3>
                            <button className="text-fifa-blue text-sm hover:underline">Ver todos</button>
                        </div>
                        <table className="w-full text-sm text-left">
                            <thead className="bg-gray-50 text-gray-500">
                                <tr>
                                    <th className="px-6 py-3">Usuario</th>
                                    <th className="px-6 py-3">Estado</th>
                                    <th className="px-6 py-3">Fecha Registro</th>
                                    <th className="px-6 py-3">Acciones</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {[1, 2, 3, 4, 5].map((i) => (
                                    <tr key={i} className="hover:bg-gray-50">
                                        <td className="px-6 py-3 font-medium">Usuario_{i}</td>
                                        <td className="px-6 py-3">
                                            <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-bold">
                                                Activo
                                            </span>
                                        </td>
                                        <td className="px-6 py-3 text-gray-500">20 Nov 2025</td>
                                        <td className="px-6 py-3">
                                            <button className="text-gray-400 hover:text-fifa-blue mx-1"><i className="fas fa-edit"></i></button>
                                            <button className="text-gray-400 hover:text-red-500 mx-1"><i className="fas fa-trash"></i></button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

const StatCard = ({ title, value, change, color, icon }) => {
    const colorClasses = {
        blue: 'bg-blue-50 text-blue-600',
        green: 'bg-green-50 text-green-600',
        purple: 'bg-purple-50 text-purple-600',
    };

    return (
        <div className="bg-white rounded-lg shadow-md p-6 flex items-center justify-between">
            <div>
                <p className="text-sm text-gray-500 mb-1">{title}</p>
                <h3 className="text-2xl font-bold text-gray-800">{value}</h3>
                <span className="text-xs font-bold text-green-500 flex items-center mt-1">
                    <i className="fas fa-arrow-up mr-1"></i> {change}
                </span>
            </div>
            <div className={`w-12 h-12 rounded-full flex items-center justify-center ${colorClasses[color]}`}>
                <i className={`fas ${icon} text-xl`}></i>
            </div>
        </div>
    );
};

export default AdminDashboard;
