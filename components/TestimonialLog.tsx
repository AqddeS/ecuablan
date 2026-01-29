import React, { useState, useEffect } from 'react';
import { MessageSquare, Star, CheckCircle, User } from 'lucide-react';

interface Review {
    id: number;
    user: string;
    text: string;
    amount: string;
    time: string;
}

const REVIEWS_POOL = [
    { user: 'Anon_77', text: 'Tarjeta recibida y probada en cajero. Todo ok.', amount: '$760' },
    { user: 'Javier_M', text: 'El soporte en Telegram es top. Me guiaron paso a paso.', amount: '$1,300' },
    { user: 'Cypher_X', text: 'Confirmado, el saldo es real. Compra en línea exitosa.', amount: '$1,840' },
    { user: 'Ghost_Ec', text: 'Llegó la física por Servientrega hoy. Excelente servicio.', amount: '$6,000' },
    { user: 'K3vin', text: 'Primera vez que compro y no es estafa. Recomendado.', amount: '$760' },
    { user: 'Marco_P', text: 'Ya he retirado la mitad del saldo. Funciona perfecto.', amount: '$2,630' },
    { user: 'LuciaB', text: 'Rápido y discreto. Volveré a comprar el plan Ultra.', amount: '$6,000' },
    { user: 'T0ny_S', text: 'Pagué anoche y hoy ya tengo los datos. Eficiencia total.', amount: '$1,580' },
    { user: 'DarkWebUser', text: 'Limpiando el historial... Gracias por el servicio.', amount: '$2,630' },
    { user: 'Ecu_Pro', text: 'Todo verde. Tarjeta activa y funcionando.', amount: '$1,300' }
];

const TestimonialLog: React.FC = () => {
    const [reviews, setReviews] = useState<Review[]>([]);

    useEffect(() => {
        // Initial population
        const initial = REVIEWS_POOL.slice(0, 3).map((r, i) => ({ ...r, id: i, time: 'Ahora' }));
        setReviews(initial);

        const interval = setInterval(() => {
            const randomReview = REVIEWS_POOL[Math.floor(Math.random() * REVIEWS_POOL.length)];

            setReviews(prev => {
                const newReview = {
                    ...randomReview,
                    id: Date.now(),
                    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                };
                const updated = [newReview, ...prev];
                return updated.slice(0, 5); // Keep only last 5
            });
        }, 3000); // Add new review every 3 seconds

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="h-full bg-black/60 border border-green-500/30 rounded-sm p-6 overflow-hidden relative">
            <div className="flex items-center justify-between mb-4 border-b border-green-900/50 pb-2">
                <h3 className="text-green-400 font-mono font-bold flex items-center">
                    <MessageSquare className="w-5 h-5 mr-2" />
                    LIVE_CLIENT_FEEDBACK
                </h3>
                <div className="flex items-center space-x-1">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-xs text-green-500 font-mono">ONLINE</span>
                </div>
            </div>

            <div className="space-y-4">
                {reviews.map((review, idx) => (
                    <div
                        key={review.id}
                        className={`flex flex-col space-y-1 p-3 rounded bg-green-900/10 border-l-2 border-green-500 animate-in slide-in-from-right duration-500 fade-in`}
                        style={{ opacity: 1 - (idx * 0.15) }} // Fade out older items
                    >
                        <div className="flex justify-between items-center text-xs font-mono text-green-300/70">
                            <span className="flex items-center">
                                <User className="w-3 h-3 mr-1" /> {review.user}
                            </span>
                            <span>{review.time}</span>
                        </div>
                        <p className="text-gray-300 text-sm font-mono leading-relaxed">"{review.text}"</p>
                        <div className="flex justify-between items-center mt-1">
                            <div className="flex text-yellow-500">
                                <Star className="w-3 h-3 fill-current" />
                                <Star className="w-3 h-3 fill-current" />
                                <Star className="w-3 h-3 fill-current" />
                                <Star className="w-3 h-3 fill-current" />
                                <Star className="w-3 h-3 fill-current" />
                            </div>
                            <span className="text-xs font-bold text-white bg-green-900/50 px-2 py-0.5 rounded">
                                Plan: {review.amount}
                            </span>
                        </div>
                    </div>
                ))}
            </div>

            {/* Scanline effect */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-10 pointer-events-none bg-[length:100%_2px,3px_100%]"></div>
        </div>
    );
};

export default TestimonialLog;
