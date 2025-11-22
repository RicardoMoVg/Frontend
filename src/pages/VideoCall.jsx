import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSocket } from '../context/SocketContext';

const VideoCall = () => {
    const { roomId } = useParams(); // Leemos el ID de la sala de la URL
    const socket = useSocket();

    const localVideo = useRef();
    const remoteVideo = useRef();
    const peerConnection = useRef();

    const [status, setStatus] = useState("Conectando cámara...");

    // Configuración de servidores STUN (Públicos de Google) para atravesar firewalls
    const rtcConfig = {
        iceServers: [{ urls: 'stun:stun.l.google.com:19302' }]
    };

    useEffect(() => {
        if (!socket) return;

        const startCall = async () => {
            try {
                // 1. Obtener acceso a cámara y micrófono
                const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
                localVideo.current.srcObject = stream;
                setStatus("Esperando al otro usuario...");

                // 2. Unirse a la sala de video
                socket.emit('join-video-room', roomId);

                // 3. Configurar eventos del Socket
                socket.on('user-joined', async (userId) => {
                    setStatus("Usuario conectado. Iniciando transmisión...");
                    createOffer(stream);
                });

                socket.on('offer', async (offer) => {
                    if (!peerConnection.current) createPeerConnection(stream);
                    await peerConnection.current.setRemoteDescription(new RTCSessionDescription(offer));
                    const answer = await peerConnection.current.createAnswer();
                    await peerConnection.current.setLocalDescription(answer);
                    socket.emit('answer', { target: roomId, sdp: answer });
                });

                socket.on('answer', async (answer) => {
                    await peerConnection.current.setRemoteDescription(new RTCSessionDescription(answer));
                });

                socket.on('ice-candidate', async (candidate) => {
                    if (peerConnection.current) {
                        await peerConnection.current.addIceCandidate(new RTCIceCandidate(candidate));
                    }
                });

                // Si soy el segundo en entrar, inicio la conexión pasiva
                createPeerConnection(stream);

            } catch (err) {
                console.error("Error accediendo a media:", err);
                setStatus("Error: No se pudo acceder a la cámara/micrófono");
            }
        };

        startCall();

        return () => {
            // Limpieza al cerrar
            if (peerConnection.current) peerConnection.current.close();
            socket.off('offer');
            socket.off('answer');
            socket.off('ice-candidate');
            socket.off('user-joined');
        };
    }, [socket, roomId]);

    const createPeerConnection = (stream) => {
        if (peerConnection.current) return;

        const pc = new RTCPeerConnection(rtcConfig);
        peerConnection.current = pc;

        // Añadir mis pistas (video/audio) a la conexión
        stream.getTracks().forEach(track => pc.addTrack(track, stream));

        // Cuando recibamos pista del otro, ponerla en pantalla
        pc.ontrack = (event) => {
            remoteVideo.current.srcObject = event.streams[0];
            setStatus("¡Conectado!");
        };

        // Enviar candidatos ICE (rutas de red) al otro usuario
        pc.onicecandidate = (event) => {
            if (event.candidate) {
                socket.emit('ice-candidate', { target: roomId, candidate: event.candidate });
            }
        };
    };

    const createOffer = async (stream) => {
        createPeerConnection(stream);
        const offer = await peerConnection.current.createOffer();
        await peerConnection.current.setLocalDescription(offer);
        socket.emit('offer', { target: roomId, sdp: offer });
    };

    return (
        <div className="h-screen bg-gray-900 flex flex-col items-center justify-center p-4">
            <div className="absolute top-4 left-4 text-white bg-black/50 px-4 py-2 rounded-lg z-10">
                <p className="font-bold">{status}</p>
                <p className="text-xs text-gray-300">Sala: {roomId}</p>
            </div>

            <div className="flex flex-col md:flex-row gap-4 w-full max-w-6xl h-full justify-center items-center">
                {/* Video Remoto (Grande) */}
                <div className="relative w-full md:w-2/3 h-3/4 bg-black rounded-2xl overflow-hidden shadow-2xl border border-gray-700">
                    <video ref={remoteVideo} autoPlay playsInline className="w-full h-full object-cover" />
                    <div className="absolute bottom-4 left-4 text-white font-bold text-shadow">Remoto</div>
                </div>

                {/* Video Local (Pequeño) */}
                <div className="relative w-full md:w-1/3 h-1/3 md:h-1/4 bg-gray-800 rounded-2xl overflow-hidden shadow-xl border border-gray-600">
                    <video ref={localVideo} autoPlay playsInline muted className="w-full h-full object-cover transform -scale-x-100" />
                    <div className="absolute bottom-2 left-2 text-white text-sm font-bold text-shadow">Tú</div>
                </div>
            </div>

            <div className="mt-6 flex gap-4">
                <button
                    onClick={() => window.close()}
                    className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-full font-bold shadow-lg transition transform hover:scale-105 flex items-center gap-2"
                >
                    <i className="fas fa-phone-slash"></i> Colgar
                </button>
            </div>
        </div>
    );
};

export default VideoCall;