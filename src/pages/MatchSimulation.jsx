import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSocket } from '../context/SocketContext';

const MatchSimulation = () => {
    const { id } = useParams();
    const socket = useSocket();
    const [matchData, setMatchData] = useState({
        score_local: 0,
        score_visitor: 0,
        time: 0,
        events: [],
        local_moral: 100,
        visitor_moral: 100
    });

    useEffect(() => {
        if (!socket) return;

        // Join match room
        socket.emit('join-match-chat', id);

        // Listen for updates
        socket.on('match-update', (data) => {
            setMatchData(prev => ({
                ...prev,
                score_local: data.score_local,
                score_visitor: data.score_visitor,
                time: data.last_event.minute,
                local_moral: data.local_moral,
                visitor_moral: data.visitor_moral,
                events: [data.last_event, ...prev.events]
            }));
        });

        socket.on('match-finished', (data) => {
            alert(data.message);
        });

        return () => {
            socket.emit('leave-match-chat', id);
            socket.off('match-update');
            socket.off('match-finished');
        };
    }, [socket, id]);

    return (
        <div className="container mx-auto px-4 py-8">
            {/* Scoreboard */}
            <div className="bg-gray-900 text-white rounded-xl p-8 mb-8 shadow-2xl">
                <div className="flex justify-between items-center text-center">
                    <div className="w-1/3">
                        <h2 className="text-3xl font-bold mb-2">Local</h2>
                        <div className="text-sm text-gray-400">Moral: {matchData.local_moral}%</div>
                    </div>
                    <div className="w-1/3">
                        <div className="text-6xl font-mono font-bold tracking-widest mb-2">
                            {matchData.score_local} - {matchData.score_visitor}
                        </div>
                        <div className="text-green-400 font-bold animate-pulse">
                            {matchData.time}'
                        </div>
                    </div>
                    <div className="w-1/3">
                        <h2 className="text-3xl font-bold mb-2">Visitante</h2>
                        <div className="text-sm text-gray-400">Moral: {matchData.visitor_moral}%</div>
                    </div>
                </div>
            </div>

            {/* Live Feed */}
            <div className="bg-white rounded-xl shadow-md p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2">
                    <i className="fas fa-broadcast-tower mr-2 text-red-500"></i>
                    Narración en Vivo
                </h3>
                <div className="space-y-4 max-h-96 overflow-y-auto">
                    {matchData.events.length === 0 ? (
                        <p className="text-gray-500 text-center py-4">Esperando inicio del partido...</p>
                    ) : (
                        matchData.events.map((event, index) => (
                            <div key={index} className="flex space-x-4 animate-fade-in">
                                <div className="font-bold text-fifa-blue w-12 text-right">{event.minute}'</div>
                                <div className="text-gray-700 flex-1">{event.text}</div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default MatchSimulation;
