import React from 'react';

const Rules = () => {
    return (
        <div className="container mx-auto px-4 py-8 max-w-3xl">
            <h1 className="text-3xl font-bold text-fifa-blue mb-6">Reglas del Torneo</h1>
            <div className="bg-white rounded-lg shadow-md p-8 space-y-6 text-gray-700">
                <section>
                    <h2 className="text-xl font-bold text-gray-800 mb-2">1. Formato de Competencia</h2>
                    <p>El torneo se jugará en fase de grupos seguida de eliminación directa. Los dos mejores de cada grupo avanzan.</p>
                </section>
                <section>
                    <h2 className="text-xl font-bold text-gray-800 mb-2">2. Fair Play</h2>
                    <p>Se espera comportamiento deportivo. Insultos en el chat pueden resultar en descalificación.</p>
                </section>
                <section>
                    <h2 className="text-xl font-bold text-gray-800 mb-2">3. Desconexiones</h2>
                    <p>Si un jugador se desconecta durante un partido, se pausará por 5 minutos. Si no regresa, pierde por default.</p>
                </section>
            </div>
        </div>
    );
};

export default Rules;
