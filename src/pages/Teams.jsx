import React from 'react';

const Teams = () => {
    const teams = [
        { id: 1, name: 'México', code: 'MX', group: 'A', rating: 85 },
        { id: 2, name: 'Argentina', code: 'AR', group: 'C', rating: 90 },
        { id: 3, name: 'Brasil', code: 'BR', group: 'G', rating: 92 },
        { id: 4, name: 'Francia', code: 'FR', group: 'D', rating: 89 },
        { id: 5, name: 'España', code: 'ES', group: 'E', rating: 87 },
        { id: 6, name: 'Alemania', code: 'DE', group: 'E', rating: 86 },
        { id: 7, name: 'Estados Unidos', code: 'US', group: 'B', rating: 80 },
        { id: 8, name: 'Japón', code: 'JP', group: 'E', rating: 78 },
    ];

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-fifa-blue mb-8">Equipos Participantes</h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {teams.map((team) => (
                    <div key={team.id} className="bg-white rounded-xl shadow-md hover:shadow-lg transition overflow-hidden group cursor-pointer">
                        <div className="h-32 bg-gray-100 flex items-center justify-center relative">
                            <span className="text-6xl font-bold text-gray-300 select-none">{team.code}</span>
                            <div className="absolute top-2 right-2 bg-fifa-blue text-white text-xs font-bold px-2 py-1 rounded">
                                GRUPO {team.group}
                            </div>
                        </div>
                        <div className="p-4">
                            <h3 className="text-xl font-bold text-gray-800 mb-1 group-hover:text-fifa-blue transition">
                                {team.name}
                            </h3>
                            <div className="flex items-center justify-between mt-3">
                                <span className="text-sm text-gray-500">Rating General</span>
                                <span className={`font-bold ${getRatingColor(team.rating)}`}>{team.rating}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

const getRatingColor = (rating) => {
    if (rating >= 90) return 'text-green-600';
    if (rating >= 80) return 'text-blue-600';
    return 'text-yellow-600';
};

export default Teams;
