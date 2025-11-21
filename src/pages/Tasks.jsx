import React, { useState } from 'react';

const Tasks = () => {
    const [selectedDate, setSelectedDate] = useState(new Date());

    // Mock data for tasks
    const tasks = [
        { id: 1, title: 'Entrenamiento Matutino', time: '08:00 AM', type: 'training', completed: true },
        { id: 2, title: 'Revisión de Estrategia', time: '10:30 AM', type: 'meeting', completed: false },
        { id: 3, title: 'Partido Amistoso vs Brasil', time: '04:00 PM', type: 'match', completed: false },
    ];

    const days = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-fifa-blue mb-8">Calendario y Tareas</h1>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Calendar Section */}
                <div className="lg:col-span-2 bg-white rounded-lg shadow-md p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-bold text-gray-800">Noviembre 2025</h2>
                        <div className="flex space-x-2">
                            <button className="p-2 hover:bg-gray-100 rounded-full"><i className="fas fa-chevron-left"></i></button>
                            <button className="p-2 hover:bg-gray-100 rounded-full"><i className="fas fa-chevron-right"></i></button>
                        </div>
                    </div>

                    {/* Days Header */}
                    <div className="grid grid-cols-7 gap-2 mb-2 text-center font-medium text-gray-500">
                        {days.map(day => <div key={day}>{day}</div>)}
                    </div>

                    {/* Calendar Grid (Simplified Mock) */}
                    <div className="grid grid-cols-7 gap-2">
                        {Array.from({ length: 30 }, (_, i) => (
                            <button
                                key={i}
                                onClick={() => setSelectedDate(new Date(2025, 10, i + 1))}
                                className={`aspect-square rounded-lg flex flex-col items-center justify-center hover:bg-blue-50 transition ${i + 1 === selectedDate.getDate() ? 'bg-fifa-blue text-white hover:bg-blue-700' : 'text-gray-700'
                                    }`}
                            >
                                <span className="text-sm font-medium">{i + 1}</span>
                                {/* Dot for events */}
                                {(i + 1) % 3 === 0 && (
                                    <div className={`w-1.5 h-1.5 rounded-full mt-1 ${i + 1 === selectedDate.getDate() ? 'bg-white' : 'bg-fifa-red'}`}></div>
                                )}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Daily Tasks Section */}
                <div className="bg-white rounded-lg shadow-md p-6">
                    <h2 className="text-xl font-bold text-gray-800 mb-4">
                        Agenda del {selectedDate.getDate()} de Noviembre
                    </h2>

                    <div className="space-y-4">
                        {tasks.map(task => (
                            <div key={task.id} className="flex items-start space-x-4 p-3 rounded-lg hover:bg-gray-50 transition border-l-4 border-fifa-blue">
                                <div className="flex-shrink-0 mt-1">
                                    {task.completed ? (
                                        <i className="fas fa-check-circle text-green-500 text-xl"></i>
                                    ) : (
                                        <i className="far fa-circle text-gray-400 text-xl"></i>
                                    )}
                                </div>
                                <div>
                                    <h3 className={`font-bold ${task.completed ? 'text-gray-500 line-through' : 'text-gray-800'}`}>
                                        {task.title}
                                    </h3>
                                    <div className="flex items-center text-sm text-gray-500 mt-1">
                                        <i className="far fa-clock mr-1"></i>
                                        <span>{task.time}</span>
                                        <span className="mx-2">•</span>
                                        <span className="capitalize">{task.type}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <button className="w-full mt-6 bg-gray-100 text-gray-600 py-2 rounded-lg font-medium hover:bg-gray-200 transition">
                        <i className="fas fa-plus mr-2"></i> Añadir Tarea
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Tasks;
