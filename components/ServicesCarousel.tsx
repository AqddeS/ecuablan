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
    const [isMobile, setIsMobile] = useState(false);

    const totalItems = services.length;
    const angleStep = 360 / totalItems;

    // Calculate rotation based on index
    const rotation = -(currIndex * angleStep);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 768) {
                setRadius(220); // Wider radius for less overlap on mobile
                setCardSize({ w: 260, h: 380 });
                setIsMobile(true);
            } else {
                setRadius(300);
                setCardSize({ w: 300, h: 400 });
                setIsMobile(false);
            }
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handleNext = () => setCurrIndex(prev => prev + 1);
    const handlePrev = () => setCurrIndex(prev => prev - 1);

    // Normalize index to 0..totalItems-1 for highlighting
    const getNormalizedIndex = (idx: number) => {
        let remainder = idx % totalItems;
        if (remainder < 0) remainder += totalItems;
        return remainder;
    };

    const activeIndex = getNormalizedIndex(currIndex);

    return (
        <div className="relative w-full h-[500px] flex items-center justify-center overflow-hidden perspective-1000 select-none">
            {/* Navigation Buttons - Explicit Z-Index */}
            <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between px-2 md:px-4 z-[100] pointer-events-none">
                <button
                    onClick={handlePrev}
                    className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center bg-black/80 border border-green-500/50 text-green-500 rounded-full backdrop-blur-md pointer-events-auto hover:bg-green-500 hover:text-black transition-all active:scale-95 shadow-[0_0_20px_rgba(0,255,65,0.4)]"
                    aria-label="Previous Service"
                >
                    <span className="text-xl md:text-2xl font-bold">&lt;</span>
                </button>
                <button
                    onClick={handleNext}
                    className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center bg-black/80 border border-green-500/50 text-green-500 rounded-full backdrop-blur-md pointer-events-auto hover:bg-green-500 hover:text-black transition-all active:scale-95 shadow-[0_0_20px_rgba(0,255,65,0.4)]"
                    aria-label="Next Service"
                >
                    <span className="text-xl md:text-2xl font-bold">&gt;</span>
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
                    const angle = index * angleStep;
                    const isActive = index === activeIndex;

                    return (
                        <div
                            key={service.id}
                            className="absolute inset-0 backface-visible"
                            style={{
                                transform: `rotateY(${angle}deg) translateZ(${radius}px)`,
                                transition: 'opacity 0.3s, filter 0.3s'
                            }}
                            onClick={() => {
                                // Smart navigation on click: find shortest path
                                const diff = index - activeIndex;
                                // Adjust for wrap-around
                                let move = diff;
                                if (move > totalItems / 2) move -= totalItems;
                                if (move < -totalItems / 2) move += totalItems;
                                setCurrIndex(curr => curr + move);
                            }}
                        >
                            <div
                                className={`w-full h-full bg-black/90 border rounded-lg p-6 backdrop-blur-md transition-all duration-300
                                    ${isActive
                                        ? 'border-green-500 shadow-[0_0_30px_rgba(0,255,65,0.3)] opacity-100 scale-105'
                                        : 'border-green-500/20 shadow-none opacity-30 grayscale blur-[1px] scale-95'
                                    }`}
                            >
                                <DefenseCard module={service} />
                                {/* Overlay for inactive cards to hijacking clicks */}
                                {!isActive && <div className="absolute inset-0 z-10" />}
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
