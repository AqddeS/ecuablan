import React, { useState, useEffect, useRef } from 'react';
import { SecurityModule } from '../types';
import DefenseCard from './DefenseCard';

interface ServicesCarouselProps {
    services: SecurityModule[];
}

const ServicesCarousel: React.FC<ServicesCarouselProps> = ({ services }) => {
    // Removed JS rotation state for smoother CSS animation
    const [radius, setRadius] = useState(300);
    const [cardSize, setCardSize] = useState({ w: 300, h: 400 });

    const containerRef = useRef<HTMLDivElement>(null);
    const totalItems = services.length;

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

        // Initial check
        handleResize();

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        }
    }, []);

    return (
        <div className="relative w-full h-[500px] flex items-center justify-center overflow-hidden perspective-1000">
            <div
                className="relative preserve-3d animate-spin-slow"
                style={{
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
