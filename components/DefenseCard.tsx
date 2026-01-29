import React, { useRef, useState } from 'react';
import { SecurityModule } from '../types';
import { Shield, Lock, Activity, Terminal } from 'lucide-react';

interface DefenseCardProps {
  module: SecurityModule;
}

const DefenseCard: React.FC<DefenseCardProps> = ({ module }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -10; // Max 10 deg
    const rotateY = ((x - centerX) / centerX) * 10;

    setRotation({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setRotation({ x: 0, y: 0 });
  };

  const getIcon = () => {
    switch (module.category) {
      case 'Defense': return <Shield className="w-8 h-8 text-green-400" />;
      case 'Encryption': return <Lock className="w-8 h-8 text-blue-400" />;
      case 'Analysis': return <Activity className="w-8 h-8 text-purple-400" />;
      default: return <Terminal className="w-8 h-8 text-white" />;
    }
  };

  return (
    <div
      className="perspective-1000 h-[340px] w-full"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div
        ref={cardRef}
        className="w-full h-full relative preserve-3d transition-transform duration-100 ease-linear border border-green-900/50 bg-black/80 backdrop-blur-sm p-6 rounded-sm shadow-[0_0_15px_rgba(0,255,65,0.1)] hover:shadow-[0_0_25px_rgba(0,255,65,0.3)] hover:border-green-500/50 group"
        style={{
          transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
        }}
      >
        <div className="absolute top-0 right-0 p-4 opacity-50 group-hover:opacity-100 transition-opacity">
          {getIcon()}
        </div>

        <div className="mt-2 mb-4">
          <span className={`text-xs font-mono uppercase px-2 py-1 rounded-sm ${module.difficulty === 'Advanced' ? 'bg-red-900/30 text-red-400 border border-red-500/30' :
            module.difficulty === 'Intermediate' ? 'bg-yellow-900/30 text-yellow-400 border border-yellow-500/30' :
              'bg-green-900/30 text-green-400 border border-green-500/30'
            }`}>
            {module.difficulty}
          </span>
        </div>

        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-green-400 transition-colors">
          {module.title}
        </h3>

        <p className="text-gray-400 text-sm leading-relaxed mb-6">
          {module.description}
        </p>

        <a
          href="https://t.me/system_ec"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-green-900/20 border border-green-500/50 text-green-400 text-xs font-mono font-bold px-6 py-2 rounded-sm hover:bg-green-500 hover:text-black transition-all duration-300 relative z-20 hover:shadow-[0_0_10px_rgba(0,255,65,0.5)]"
        >
          CONTACTO
        </a>

        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-green-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

        <img
          src={`${import.meta.env.BASE_URL}white-card.png`}
          alt="Secure Card"
          className="absolute bottom-4 right-4 w-16 opacity-70 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300 drop-shadow-[0_0_5px_rgba(255,255,255,0.3)]"
        />
      </div>
    </div>
  );
};

export default DefenseCard;