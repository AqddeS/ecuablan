import React from 'react';

interface GlitchHeaderProps {
  text: string;
  subtext?: string;
}

const GlitchHeader: React.FC<GlitchHeaderProps> = ({ text, subtext }) => {
  return (
    <div className="relative group cursor-default">
      <h1 className="text-4xl md:text-6xl font-bold font-mono tracking-tighter text-green-500 uppercase glow-text relative z-10">
        {text}
        <span className="absolute top-0 left-0 -ml-1 text-red-500 opacity-0 group-hover:opacity-70 animate-pulse" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 30%, 0 30%)', transform: 'translate(-2px, 1px)' }}>
          {text}
        </span>
        <span className="absolute top-0 left-0 ml-1 text-blue-500 opacity-0 group-hover:opacity-70 animate-pulse" style={{ clipPath: 'polygon(0 60%, 100% 60%, 100% 100%, 0 100%)', transform: 'translate(2px, -1px)' }}>
          {text}
        </span>
      </h1>
      {subtext && (
        <p className="text-green-400/70 text-sm md:text-lg font-mono mt-2 tracking-widest uppercase border-l-2 border-green-500 pl-3">
          {subtext}
        </p>
      )}
    </div>
  );
};

export default GlitchHeader;