import React, { useState } from 'react';

const Tournament = () => {
    const [activePhase, setActivePhase] = useState('groups');

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-fifa-blue">Copa Mundial 2026</h1>
                <div className="bg-green-100 text-green-800 px-4 py-2 rounded-full font-bold text-sm">
                    <i className="fas fa-circle text-xs mr-2"></i> En Curso
                </div>
            </div>

            {/* Phase Navigation */}
            <div className="flex overflow-x-auto space-x-2 mb-8 pb-2">
                {['Fase de Grupos', 'Octavos', 'Cuartos', 'Semifinal', 'Final'].map((phase, index) => {
                    const phaseId = phase.toLowerCase().replace(/ /g, '-');
                    return (
                        <button
                            key={phaseId}
                            onClick={() => setActivePhase(phaseId)}
                            className={`px-6 py-2 rounded-full whitespace-nowrap font-medium transition ${activePhase === phaseId
                                    ? 'bg-fifa-blue text-white shadow-md'
                                    : 'bg-white text-gray-600 hover:bg-gray-100'
                                }`}
                        >
                            {phase}
                        </button>
                    );
                })}
            </div>

            {/* Content */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Matches Column */}
                <div className="lg:col-span-2 space-y-6">
                    <h2 className="text-xl font-bold text-gray-800 mb-4">Partidos Programados</h2>

                    {/* Match Card */}
                    {[1, 2, 3].map((match) => (
                        <div key={match} className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 hover:shadow-md transition">
                            <div className="flex justify-between items-center text-sm text-gray-500 mb-3">
                                <span>Grupo A • Jornada 3</span>
                                <span>21 Nov, 14:00</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <div className="flex items-center space-x-4 w-1/3">
                                    <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center font-bold">MX</div>
                                    <span className="font-bold text-lg">México</span>
                                </div>
                                <div className="bg-gray-100 px-4 py-2 rounded-lg font-mono font-bold text-xl">
                                    2 - 1
                                </div>
                                <div className="flex items-center space-x-4 w-1/3 justify-end">
                                    <span className="font-bold text-lg">Polonia</span>
                                    <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center font-bold">PL</div>
                                </div>
                            </div>
                            <div className="mt-4 pt-3 border-t border-gray-50 flex justify-center">
                                <button className="text-fifa-blue text-sm font-medium hover:underline">
                                    Ver Estadísticas <i className="fas fa-chart-bar ml-1"></i>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Standings Column */}
                <div className="space-y-6">
                    <h2 className="text-xl font-bold text-gray-800 mb-4">Tabla de Posiciones</h2>
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                        <table className="w-full text-sm">
                            <thead className="bg-gray-50 text-gray-500">
                                <tr>
                                    <th className="px-4 py-3 text-left">Equipo</th>
                                    <th className="px-2 py-3 text-center">PJ</th>
                                    <th className="px-2 py-3 text-center">DG</th>
                                    <th className="px-4 py-3 text-center">Pts</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {[
                                    { name: 'México', pts: 7, dg: 3 },
                                    { name: 'Argentina', pts: 6, dg: 2 },
                                    { name: 'Polonia', pts: 4, dg: 0 },
                                    { name: 'Arabia S.', pts: 0, dg: -5 },
                                ].map((team, i) => (
                                    <tr key={team.name} className="hover:bg-gray-50">
                                        <td className="px-4 py-3 font-medium flex items-center space-x-2">
                                            <span className="text-gray-400 w-4">{i + 1}</span>
                                            <span>{team.name}</span>
                                        </td>
                                        <td className="px-2 py-3 text-center text-gray-500">3</td>
                                        <td className="px-2 py-3 text-center text-gray-500">{team.dg > 0 ? `+${team.dg}` : team.dg}</td>
                                        <td className="px-4 py-3 text-center font-bold">{team.pts}</td>
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

export default Tournament;
