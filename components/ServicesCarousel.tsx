import React, { useState, useEffect, useRef } from 'react';
import { SecurityModule } from '../types';
import DefenseCard from './DefenseCard';

interface ServicesCarouselProps {
    services: SecurityModule[];
}

const ServicesCarousel: React.FC<ServicesCarouselProps> = ({ services }) => {
    const [currIndex, setCurrIndex] = useState(0);
    const [radius, setRadius] = useState(300);
    const [cardSize, setCardSize] = useState({ w: 300, h: 400 });

    const totalItems = services.length;

    // Calculate rotation based on index to ensure "snap" to center
    const rotation = -(currIndex * (360 / totalItems));

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 768) {
                setRadius(160);
                setCardSize({ w: 260, h: 360 });
            } else {
                setRadius(300);
                setCardSize({ w: 300, h: 400 });
            }
        };

        handleResize();
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        }
    }, []);

    const handleNext = () => {
        setCurrIndex(prev => prev + 1);
    };

    const handlePrev = () => {
        setCurrIndex(prev => prev - 1);
    };

    return (
        <div className="relative w-full h-[500px] flex items-center justify-center overflow-hidden perspective-1000 select-none">
            {/* Navigation Buttons */}
            <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between px-4 z-50 pointer-events-none">
                <button
                    onClick={handlePrev}
                    className="w-12 h-12 flex items-center justify-center bg-black/50 border border-green-500/30 text-green-500 rounded-full backdrop-blur-md pointer-events-auto hover:bg-green-500 hover:text-black transition-all active:scale-95 shadow-[0_0_15px_rgba(0,255,65,0.2)]"
                >
                    <span className="text-2xl font-bold">&lt;</span>
                </button>
                <button
                    onClick={handleNext}
                    className="w-12 h-12 flex items-center justify-center bg-black/50 border border-green-500/30 text-green-500 rounded-full backdrop-blur-md pointer-events-auto hover:bg-green-500 hover:text-black transition-all active:scale-95 shadow-[0_0_15px_rgba(0,255,65,0.2)]"
                >
                    <span className="text-2xl font-bold">&gt;</span>
                </button>
            </div>

            <div
                className="relative preserve-3d transition-transform duration-500 ease-out"
                style={{
                    transform: `rotateY(${rotation}deg)`,
                    width: `${cardSize.w}px`,
                    height: `${cardSize.h}px`
                }}
            >
                {services.map((service, index) => {
                    const angle = (index / totalItems) * 360;
                    return (
                        <div
                            key={service.id}
                            className="absolute inset-0 backface-visible"
                            style={{
                                transform: `rotateY(${angle}deg) translateZ(${radius}px)`,
                            }}
                        >
                            <div className="w-full h-full bg-black/80 border border-green-500/50 rounded-lg p-6 backdrop-blur-md shadow-[0_0_30px_rgba(0,255,65,0.2)] hover:shadow-[0_0_50px_rgba(0,255,65,0.6)] transition-shadow">
                                <DefenseCard module={service} />
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Floor reflection effect */}
            <div className="absolute bottom-0 w-[600px] h-[600px] bg-green-500/5 rounded-full blur-3xl transform rotate-x-90 translate-y-1/2 pointer-events-none" />
        </div>
    );
};

export default ServicesCarousel;
