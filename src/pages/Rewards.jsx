import React, { useState } from 'react';

const Rewards = () => {
    const [activeTab, setActiveTab] = useState('insignias');

    const tabs = [
        { id: 'insignias', label: 'Insignias', icon: 'fa-medal' },
        { id: 'premios', label: 'Premios', icon: 'fa-gift' },
        { id: 'desafios', label: 'Desafíos', icon: 'fa-tasks' },
    ];

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-fifa-blue mb-8">Recompensas y Logros</h1>

            {/* Tabs Navigation */}
            <div className="flex space-x-4 mb-8 border-b border-gray-200">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`flex items-center space-x-2 px-6 py-3 font-medium transition-colors duration-200 ${activeTab === tab.id
                                ? 'text-fifa-blue border-b-2 border-fifa-blue'
                                : 'text-gray-500 hover:text-fifa-blue'
                            }`}
                    >
                        <i className={`fas ${tab.icon}`}></i>
                        <span>{tab.label}</span>
                    </button>
                ))}
            </div>

            {/* Content Area */}
            <div className="bg-white rounded-lg shadow-md p-6">
                {activeTab === 'insignias' && <InsigniasTab />}
                {activeTab === 'premios' && <PremiosTab />}
                {activeTab === 'desafios' && <DesafiosTab />}
            </div>
        </div>
    );
};

const InsigniasTab = () => (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {/* Mock Data for Insignias */}
        {[1, 2, 3, 4].map((item) => (
            <div key={item} className="flex flex-col items-center text-center p-4 border rounded-lg hover:shadow-lg transition">
                <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mb-3 text-yellow-600">
                    <i className="fas fa-trophy text-2xl"></i>
                </div>
                <h3 className="font-bold text-gray-800">Campeón Regional</h3>
                <p className="text-sm text-gray-500">Ganaste tu primer torneo regional.</p>
            </div>
        ))}
    </div>
);

const PremiosTab = () => (
    <div className="space-y-4">
        {[1, 2, 3].map((item) => (
            <div key={item} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center text-green-600">
                        <i className="fas fa-money-bill-wave"></i>
                    </div>
                    <div>
                        <h3 className="font-bold text-gray-800">Bono de Bienvenida</h3>
                        <p className="text-sm text-gray-500">Reclamado el 20/11/2025</p>
                    </div>
                </div>
                <span className="font-bold text-green-600">+500 Monedas</span>
            </div>
        ))}
    </div>
);

const DesafiosTab = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[1, 2].map((item) => (
            <div key={item} className="border rounded-lg p-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 bg-fifa-red text-white text-xs font-bold px-2 py-1 rounded-bl-lg">
                    Diario
                </div>
                <h3 className="font-bold text-lg mb-2">Gana 3 Partidos</h3>
                <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
                    <div className="bg-fifa-blue h-2.5 rounded-full" style={{ width: '66%' }}></div>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">Progreso: 2/3</span>
                    <button className="text-fifa-blue font-medium hover:underline">Ver detalles</button>
                </div>
            </div>
        ))}
    </div>
);

export default Rewards;
