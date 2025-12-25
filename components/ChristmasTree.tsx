import React from 'react';
import { LightMode } from '../types';

interface ChristmasTreeProps {
  lightMode: LightMode;
}

const ChristmasTree: React.FC<ChristmasTreeProps> = ({ lightMode }) => {
  // Helper to determine light class based on mode
  const getLightClass = (baseColor: string, delay: string) => {
    if (lightMode === LightMode.STATIC) return baseColor;
    if (lightMode === LightMode.RAINBOW) return `animate-rainbow ${delay}`;
    if (lightMode === LightMode.BREATHING) return `${baseColor} animate-twinkle ${delay}`;
    return baseColor;
  };

  return (
    <div className="relative w-64 h-80 md:w-80 md:h-96 flex justify-center items-end select-none">
      {/* Shadow */}
      <div className="absolute bottom-0 w-32 h-8 bg-black/40 blur-xl rounded-full translate-y-2"></div>
      
      <svg viewBox="0 0 200 300" className="w-full h-full drop-shadow-2xl z-10">
        {/* Trunk */}
        <rect x="90" y="250" width="20" height="40" fill="#5D4037" />
        
        {/* Leaves Layers */}
        {/* Bottom Layer */}
        <path d="M20 250 L180 250 L100 150 Z" fill="#1b4d2e" />
        {/* Middle Layer */}
        <path d="M40 180 L160 180 L100 80 Z" fill="#2d6a4f" />
        {/* Top Layer */}
        <path d="M60 110 L140 110 L100 20 Z" fill="#40916c" />
        
        {/* Star */}
        <polygon 
          points="100,10 90,40 120,20 80,20 110,40" 
          fill="#ffd700" 
          className="animate-[pulse_3s_infinite]"
        />

        {/* Lights (Ornaments) */}
        {/* Positions approximate to fit on the tree layers */}
        <circle cx="70" cy="220" r="6" className={getLightClass('fill-red-500', 'delay-0')} />
        <circle cx="130" cy="230" r="6" className={getLightClass('fill-blue-400', 'delay-75')} />
        <circle cx="100" cy="200" r="6" className={getLightClass('fill-yellow-400', 'delay-150')} />
        
        <circle cx="80" cy="150" r="5" className={getLightClass('fill-purple-400', 'delay-100')} />
        <circle cx="120" cy="160" r="5" className={getLightClass('fill-red-500', 'delay-300')} />
        <circle cx="100" cy="130" r="5" className={getLightClass('fill-cyan-400', 'delay-500')} />
        
        <circle cx="90" cy="80" r="4" className={getLightClass('fill-yellow-300', 'delay-200')} />
        <circle cx="110" cy="90" r="4" className={getLightClass('fill-pink-400', 'delay-600')} />
        <circle cx="100" cy="60" r="4" className={getLightClass('fill-green-300', 'delay-700')} />
      </svg>
    </div>
  );
};

export default ChristmasTree;