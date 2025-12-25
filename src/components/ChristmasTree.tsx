import React, { useMemo } from 'react';
import { LightMode } from '../types';

interface ChristmasTreeProps {
  lightMode: LightMode;
  brightness: number;
  speed: number;
  customColor: string;
}

const ChristmasTree: React.FC<ChristmasTreeProps> = ({ lightMode, brightness, speed, customColor }) => {
  // Helper to determine light class based on mode
  const getLightClass = (delay: number, colorIndex: number) => {
    // Base colors for rainbow mode
    const colors = [
      'bg-red-500 shadow-[0_0_10px_#ef4444]',
      'bg-yellow-400 shadow-[0_0_10px_#eab308]',
      'bg-blue-500 shadow-[0_0_10px_#3b82f6]',
      'bg-green-400 shadow-[0_0_10px_#4ade80]',
      'bg-purple-500 shadow-[0_0_10px_#a855f7]',
      'bg-pink-500 shadow-[0_0_10px_#ec4899]',
    ];

    if (lightMode === LightMode.STATIC) {
      // Just basic transition, color handled by inline style
      return 'duration-500';
    }

    if (lightMode === LightMode.RAINBOW) {
      const color = colors[colorIndex % colors.length];
      return `${color} animate-rainbow`;
    }

    if (lightMode === LightMode.BREATHING) {
      return 'animate-twinkle';
    }

    return 'bg-white';
  };

  // Generate lights positions along a spiral path
  // This memoizes the random positions so they don't jump around on re-renders
  const lights = useMemo(() => {
    const coords = [];
    // Spiral logic: x = r * cos(t), y = t... simplified for a cone
    // Tree approximate dimensions: Width 200, Height 300. Center 100.
    // Cone shape: Radius decreases as Y decreases (goes up)

    const twists = 4.5; // How many times it wraps
    const pointsPerTwist = 8;
    const startY = 240; // Bottom of foliage
    const endY = 50;    // Top of foliage
    const height = startY - endY;

    for (let i = 0; i <= twists * pointsPerTwist; i++) {
      const progress = i / (twists * pointsPerTwist);
      const y = startY - (progress * height);

      // Radius at this height (Cone shape: wider at bottom)
      // Max radius approx 80 at bottom, 10 at top
      const currentRadius = 80 * (1 - progress * 0.9);

      // Angle
      const angle = progress * Math.PI * 2 * twists;

      // Oval correction (perspective)
      const x = 100 + Math.cos(angle) * currentRadius;
      // Adjust z-index simulation? Lights on the "back" should be dimmer or hidden?
      // Let's just show front lights for simplicity or slightly dim back ones if we wanted logic.
      // For "Wire", we want a continuous line.

      // Only add if it's kinda "in front" to look realistic (sin(angle) > -0.2)
      const isFront = Math.sin(angle) > -0.5;

      // Slight randomization
      const randX = (Math.random() - 0.5) * 5;
      const randY = (Math.random() - 0.5) * 5;

      if (isFront) {
        coords.push({
          x: x + randX,
          y: y + randY,
          delay: Math.random() * 2,
          colorIdx: Math.floor(Math.random() * 6)
        });
      }
    }
    return coords;
  }, []);

  return (
    <div className="relative w-80 h-96 flex justify-center items-end select-none drop-shadow-2xl">
      {/* Container for the realistic tree */}
      <svg viewBox="0 0 200 330" className="w-full h-full z-10 overflow-visible">
        <defs>
          <linearGradient id="trunkGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#3E2723" />
            <stop offset="50%" stopColor="#5D4037" />
            <stop offset="100%" stopColor="#3E2723" />
          </linearGradient>

          <radialGradient id="needleGrad" cx="50%" cy="50%" r="50%" fx="25%" fy="25%">
            <stop offset="0%" stopColor="#2E7D32" />
            <stop offset="100%" stopColor="#1B5E20" />
          </radialGradient>

          <filter id="fuzzy" x="-20%" y="-20%" width="140%" height="140%">
            <feTurbulence type="fractalNoise" baseFrequency="0.5" numOctaves="3" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="2" />
          </filter>

          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2.5" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Shadow Base - Moved down */}
        <ellipse cx="100" cy="305" rx="60" ry="10" fill="black" opacity="0.3" filter="url(#glow)" />

        {/* Trunk - Longer */}
        <rect x="90" y="240" width="20" height="70" fill="url(#trunkGrad)" rx="2" />

        {/* Tree Layers - Using lots of paths for texture */}
        {/* Layer 5 (Bottom) */}
        <path d="M20 250 Q100 270 180 250 L100 130 Z" fill="url(#needleGrad)" filter="url(#fuzzy)" />
        <path d="M20 250 Q100 270 180 250 L100 130 Z" fill="none" stroke="#1B5E20" strokeWidth="1" opacity="0.5" />

        {/* Layer 4 */}
        <path d="M30 215 Q100 235 170 215 L100 100 Z" fill="url(#needleGrad)" filter="url(#fuzzy)" />

        {/* Layer 3 */}
        <path d="M40 180 Q100 200 160 180 L100 70 Z" fill="url(#needleGrad)" filter="url(#fuzzy)" />

        {/* Layer 2 */}
        <path d="M50 145 Q100 165 150 145 L100 45 Z" fill="url(#needleGrad)" filter="url(#fuzzy)" />

        {/* Layer 1 (Top) */}
        <path d="M65 110 Q100 125 135 110 L100 20 Z" fill="url(#needleGrad)" filter="url(#fuzzy)" />


        {/* The Wire (Simulation) */}
        {/* A dark semi-transparent line tracing the path of lights roughly */}
        <path
          d="M100 40
              Q 120 50, 110 70
              T 80 100
              T 130 140
              T 70 190
              T 150 240"
          fill="none"
          stroke="#000"
          strokeWidth="1.5"
          opacity="0.4"
          strokeLinecap="round"
        />

        {/* Star */}
        <g transform="translate(100, 20)" className="animate-[pulse_4s_infinite]">
          <path d="M0 -15 L4 -4 L15 -4 L6 4 L9 15 L0 8 L-9 15 L-6 4 L-15 -4 L-4 -4 Z" fill="#FFD700" filter="url(#glow)" />
        </g>
      </svg>

      {/* HTML Overlay for LED Lights (Better for glow effects than SVG) */}
      <div className="absolute inset-0 w-full h-full pointer-events-none z-20">
        <svg viewBox="0 0 200 330" className="w-full h-full overflow-visible">
          {lights.map((pos, i) => {
            const isStaticOrBreathing = lightMode === LightMode.STATIC || lightMode === LightMode.BREATHING;

            // For static mode, we want a "glass" look if brightness is low, or glowing color if high
            // Actually, user wants "default transparent" look for LEDs (like clear bulbs) that light up.

            return (
              <g key={i} transform={`translate(${pos.x}, ${pos.y})`}>
                {/* Bulb Holder */}
                <rect x="-1" y="-3" width="2" height="3" fill="#222" />

                {/* The Light Bulb */}
                <circle
                  r="4" // Slightly bigger bulb
                  className={`transition-all duration-300 ${getLightClass(pos.delay, pos.colorIdx)}`}
                  style={{
                    animationDelay: `${pos.delay}s`,
                    animationDuration: `${speed}s`,

                    // Logic: 
                    // If Static/Breathing: Use customColor but add opacity handling.
                    // If Rainbow: It uses classes.

                    backgroundColor: isStaticOrBreathing
                      ? customColor
                      : undefined,

                    // Make it look like a light source
                    boxShadow: isStaticOrBreathing
                      ? `0 0 ${10 * brightness}px ${2 * brightness}px ${customColor}`
                      : undefined,

                    opacity: (lightMode === LightMode.STATIC) ? Math.max(0.3, brightness) : undefined,

                    // Add a "shine" or "glass" feel via standard stroke or just brightness
                    filter: `brightness(${brightness * 1.5}) drop-shadow(0 0 ${5 * brightness}px ${isStaticOrBreathing ? customColor : 'currentColor'})`
                  }}
                  // Add a tiny white center for "hot" look
                  stroke="rgba(255,255,255,0.4)"
                  strokeWidth="1"
                />
              </g>
            )
          })}
        </svg>
      </div>

    </div>
  );
};

export default ChristmasTree;