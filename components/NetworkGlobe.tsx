import React from 'react';
import { Globe, Server, ShieldCheck } from 'lucide-react';

const NetworkGlobe: React.FC = () => {
  return (
    <div className="relative w-full h-96 flex items-center justify-center overflow-hidden bg-black/40 border border-green-900/30 rounded-sm">
        {/* Animated grid background */}
        <div className="absolute inset-0 z-0 opacity-20" 
             style={{ 
                 backgroundImage: 'linear-gradient(#00ff41 1px, transparent 1px), linear-gradient(90deg, #00ff41 1px, transparent 1px)',
                 backgroundSize: '40px 40px',
                 transform: 'perspective(500px) rotateX(60deg)',
                 transformOrigin: '50% 100%'
             }}
        />

        {/* Central Hub */}
        <div className="relative z-10 flex flex-col items-center animate-pulse">
            <ShieldCheck className="w-24 h-24 text-green-500 drop-shadow-[0_0_15px_rgba(0,255,65,0.8)]" />
            <div className="mt-4 text-green-400 font-mono text-xs tracking-widest bg-black/80 px-2 py-1 border border-green-500/50">
                SECURE CORE
            </div>
        </div>

        {/* Orbiting Satellites/Nodes */}
        <div className="absolute w-[300px] h-[300px] border border-dashed border-green-800 rounded-full animate-[spin_10s_linear_infinite]" />
        <div className="absolute w-[450px] h-[450px] border border-dotted border-green-900/50 rounded-full animate-[spin_15s_linear_infinite_reverse]" />
        
        {/* Nodes */}
        <div className="absolute top-1/4 left-1/4 animate-bounce duration-1000">
             <Server className="w-8 h-8 text-blue-500 opacity-70" />
        </div>
        <div className="absolute bottom-1/4 right-1/4 animate-bounce duration-[1500ms]">
             <Globe className="w-8 h-8 text-purple-500 opacity-70" />
        </div>
        <div className="absolute top-1/3 right-1/3 animate-pulse">
             <div className="w-2 h-2 bg-red-500 rounded-full shadow-[0_0_10px_red]" />
        </div>
        
        {/* Connection Lines (CSS) */}
        <div className="absolute inset-0 pointer-events-none">
            <svg className="w-full h-full opacity-30">
                <line x1="50%" y1="50%" x2="25%" y2="25%" stroke="#00ff41" strokeWidth="1" />
                <line x1="50%" y1="50%" x2="75%" y2="75%" stroke="#00ff41" strokeWidth="1" />
            </svg>
        </div>
    </div>
  );
};

export default NetworkGlobe;