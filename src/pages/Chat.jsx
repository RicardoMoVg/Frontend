import React, { useState, useEffect, useRef } from 'react';
import { useSocket } from '../context/SocketContext';
import { getCurrentUser } from '../services/auth';
import { getUsers, getMessageHistory, initiatePrivateChat } from '../services/chat';

const Chat = () => {
    const socket = useSocket();
    const currentUser = getCurrentUser();

    const [groups, setGroups] = useState([]);
    const [users, setUsers] = useState([]);
    const [currentRoom, setCurrentRoom] = useState(null);
    const [roomName, setRoomName] = useState('Selecciona un chat');
    const [messages, setMessages] = useState([]);
    const [messageInput, setMessageInput] = useState('');
    const [isPrivate, setIsPrivate] = useState(false);
    const [targetUserId, setTargetUserId] = useState(null);

    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    useEffect(() => {
        if (!socket) return;

        socket.emit('registerUser', currentUser.id);

        // Cargar usuarios
        getUsers().then(setUsers).catch(console.error);

        // Listeners
        socket.on('initialGroupList', (groupList) => {
            setGroups(groupList);
        });

        return () => {
            socket.off('initialGroupList');
        };
    }, [socket]);

    const handleJoinRoom = async (roomId, name, privateChat = false, targetId = null) => {
        setCurrentRoom(roomId);
        setRoomName(name);
        setIsPrivate(privateChat);
        setTargetUserId(targetId);
        setMessages([]);

        socket.emit('joinRoom', roomId);

        try {
            const history = await getMessageHistory(roomId);
            setMessages(history);
        } catch (error) {
            console.error("Error loading history:", error);
        }
    };

    const handleUserClick = async (user) => {
        try {
            const data = await initiatePrivateChat(user.id);
            await handleJoinRoom(data.groupId.toString(), user.username, true, user.id);
        } catch (error) {
            alert(error.message);
        }
    };

    const sendMessage = () => {
        if (!messageInput.trim() || !currentRoom) return;

        const messageData = {
            room: currentRoom,
            userId: currentUser.id,
            user: currentUser.username,
            text: messageInput,
            time: new Date().toISOString()
        };

        socket.emit('sendMessage', messageData);
        setMessages(prev => [...prev, messageData]);
        setMessageInput('');
    };

    return (
        <div className="container mx-auto px-4 py-6 h-screen flex flex-col">
            <div className="flex flex-col md:flex-row gap-6 flex-1 overflow-hidden">
                {/* Sidebar */}
                <div className="w-full md:w-1/4 bg-white rounded-lg shadow-lg flex flex-col">
                    <div className="p-4 border-b">
                        <h2 className="text-xl font-bold text-fifa-blue flex items-center">
                            <i className="fas fa-users mr-2"></i> Grupos y Usuarios
                        </h2>
                        {/* TODO: Link to Create Group */}
                        <button className="block w-full text-center py-2 mt-4 bg-fifa-blue text-white rounded-lg hover:bg-blue-700 transition">
                            <i className="fas fa-plus-circle mr-2"></i> Crear Nuevo Grupo
                        </button>
                    </div>

                    <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
                        <h3 className="font-medium text-gray-700 mb-2">Mis grupos</h3>
                        <div className="space-y-2 mb-6">
                            {groups.map(group => (
                                <div
                                    key={group.id}
                                    onClick={() => handleJoinRoom(group.id, group.name)}
                                    className={`p-3 rounded-lg cursor-pointer hover:bg-blue-100 transition ${currentRoom === group.id ? 'bg-blue-100' : 'bg-gray-50'}`}
                                >
                                    <h4 className="font-semibold">{group.name}</h4>
                                    <p className="text-sm text-gray-500 truncate">{group.description}</p>
                                </div>
                            ))}
                        </div>

                        <h3 className="font-medium text-gray-700 mb-2">Usuarios conectados</h3>
                        <div className="space-y-2">
                            {users.filter(u => u.id !== currentUser.id).map(user => (
                                <div
                                    key={user.id}
                                    onClick={() => handleUserClick(user)}
                                    className="p-2 bg-white rounded-lg cursor-pointer hover:bg-blue-100 transition flex items-center"
                                >
                                    <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center mr-3">
                                        <span className="font-bold text-gray-600">{user.username.charAt(0).toUpperCase()}</span>
                                    </div>
                                    <span className="font-medium">{user.username}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Chat Area */}
                <div className="w-full md:w-3/4 bg-white rounded-lg shadow-lg flex flex-col">
                    {/* Header */}
                    <div className="bg-fifa-blue text-white px-6 py-4 flex justify-between items-center rounded-t-lg">
                        <div>
                            <h2 className="text-xl font-bold">{roomName}</h2>
                            <p className="text-fifa-yellow text-sm">{isPrivate ? "Chat privado" : "Chat grupal"}</p>
                        </div>
                        {isPrivate && (
                            <button className="w-10 h-10 bg-green-500 rounded-full hover:bg-green-600 transition flex items-center justify-center">
                                <i className="fas fa-video"></i>
                            </button>
                        )}
                    </div>

                    {/* Messages */}
                    <div className="flex-1 p-4 overflow-y-auto custom-scrollbar bg-gray-50">
                        {messages.map((msg, idx) => {
                            const isOwn = msg.userId === currentUser.id;
                            return (
                                <div key={idx} className={`flex mb-4 ${isOwn ? 'justify-end' : ''}`}>
                                    {!isOwn && (
                                        <div className="flex-shrink-0 mr-3">
                                            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                                                <span className="text-blue-800 font-medium">{msg.user ? msg.user.charAt(0).toUpperCase() : '?'}</span>
                                            </div>
                                        </div>
                                    )}
                                    <div className={`flex-1 max-w-xs ${isOwn ? 'text-right' : ''}`}>
                                        <div className={`flex items-baseline ${isOwn ? 'justify-end' : ''}`}>
                                            {!isOwn && <h4 className="font-medium mr-2">{msg.user}</h4>}
                                            <span className="text-xs text-gray-500">{new Date(msg.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                                            {isOwn && <h4 className="font-medium ml-2">Tú</h4>}
                                        </div>
                                        <div className={`p-3 mt-1 rounded-lg ${isOwn ? 'bg-fifa-blue text-white rounded-tr-none' : 'bg-white shadow-sm rounded-tl-none'}`}>
                                            <p>{msg.text}</p>
                                        </div>
                                    </div>
                                    {isOwn && (
                                        <div className="flex-shrink-0 ml-3">
                                            <div className="w-10 h-10 rounded-full bg-fifa-yellow flex items-center justify-center">
                                                <span className="text-fifa-blue font-medium">{currentUser.username.charAt(0).toUpperCase()}</span>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input */}
                    <div className="p-4 border-t">
                        <div className="flex items-center gap-3">
                            <input
                                type="text"
                                placeholder="Escribe un mensaje..."
                                className="flex-1 py-3 px-4 bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-fifa-blue"
                                value={messageInput}
                                onChange={(e) => setMessageInput(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                                disabled={!currentRoom}
                            />
                            <button
                                onClick={sendMessage}
                                disabled={!currentRoom}
                                className="w-12 h-12 rounded-full bg-fifa-blue hover:bg-blue-700 flex items-center justify-center transition text-white disabled:opacity-50"
                            >
                                <i className="fas fa-paper-plane"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Chat;
