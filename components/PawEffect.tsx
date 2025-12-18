import React, { useEffect, useState } from 'react';

// Paw skin configurations matching the user's image
const PAW_SKINS = [
  // 1. White with black spots (Cow/Dalmatian style)
  { type: 'spotted', bg: '#ffffff', spot: '#2d2d2d', pad: '#ffb6c1' },
  // 2. Grey with white socks (Mittens)
  { type: 'socks', bg: '#4b5563', sock: '#ffffff', pad: '#ffb6c1' },
  // 3. Solid Tan/Beige
  { type: 'solid', bg: '#e6c2a3', pad: '#d4a373' },
  // 4. Grey Tabby
  { type: 'tabby', bg: '#9ca3af', stripe: '#6b7280', pad: '#374151' },
  // 5. Orange Tabby
  { type: 'tabby', bg: '#fdba74', stripe: '#ea580c', pad: '#ffb6c1' },
  // 6. Calico
  { type: 'calico', bg: '#ffffff', patch1: '#2d2d2d', patch2: '#ea580c', pad: '#ffb6c1' },
];

interface PawEffectProps {
  x: number;
  y: number;
  onComplete: () => void;
}

export const PawEffect: React.FC<PawEffectProps> = ({ x, y, onComplete }) => {
  const [skin] = useState(() => PAW_SKINS[Math.floor(Math.random() * PAW_SKINS.length)]);
  // Random rotation between 0 and 360 to simulate paws coming from different directions
  // But biased towards bottom/sides usually looks better for UI buttons.
  // Let's allow full random rotation to match the "circle of paws" vibe.
  const [angle] = useState(() => Math.floor(Math.random() * 360));

  useEffect(() => {
    const timer = setTimeout(onComplete, 500); // Animation duration
    return () => clearTimeout(timer);
  }, [onComplete]);

  // SVG Paths
  const renderPatterns = () => {
    switch (skin.type) {
      case 'spotted':
        return (
           <g>
             <circle cx="30" cy="60" r="8" fill={skin.spot} opacity="0.8" />
             <circle cx="70" cy="80" r="12" fill={skin.spot} opacity="0.8" />
             <ellipse cx="20" cy="90" rx="10" ry="15" fill={skin.spot} opacity="0.8" />
           </g>
        );
      case 'socks':
        return (
           <path d="M 15 60 Q 50 50 85 60 L 85 10 L 15 10 Z" fill={skin.sock} />
        );
      case 'tabby':
        return (
           <g stroke={skin.stripe} strokeWidth="4" strokeLinecap="round" fill="none">
              <path d="M 20 80 Q 50 70 80 80" />
              <path d="M 20 60 Q 50 50 80 60" />
              <path d="M 25 40 Q 50 30 75 40" />
           </g>
        );
      case 'calico':
        return (
           <g>
              <path d="M 15 120 L 15 70 Q 30 60 50 80 Q 40 100 20 120" fill={skin.patch1} />
              <path d="M 85 120 L 85 60 Q 60 50 50 80 Q 70 100 85 120" fill={skin.patch2} />
           </g>
        );
      default:
        return null;
    }
  };

  return (
    <div 
      className="fixed z-[100] pointer-events-none"
      style={{ left: x, top: y }}
    >
      <div 
        className="relative"
        style={{ 
          transform: `rotate(${angle}deg)`,
          transformOrigin: '0 0' // We pivot around the click point
        }}
      >
        <div className="animate-paw-tap absolute" style={{ top: 0, left: '-50px' }}>
           <svg width="100" height="150" viewBox="0 0 100 150" className="overflow-visible">
              {/* Arm/Paw Group - Shifted so the "fingertips" touch y=0 */}
              <g transform="translate(0, 10)">
                 {/* Arm Base */}
                 <path d="M 20 150 L 20 50 Q 20 20 50 20 Q 80 20 80 50 L 80 150 Z" fill={skin.bg} stroke="black" strokeWidth="2" />
                 
                 {/* Patterns (clipped to arm ideally, but simple overlay works for cartoon style) */}
                 <mask id={`mask-${x}-${y}`}>
                    <path d="M 20 150 L 20 50 Q 20 20 50 20 Q 80 20 80 50 L 80 150 Z" fill="white" />
                 </mask>
                 <g mask={`url(#mask-${x}-${y})`}>
                    {renderPatterns()}
                 </g>

                 {/* Re-stroke arm to cover pattern edges */}
                 <path d="M 20 150 L 20 50 Q 20 20 50 20 Q 80 20 80 50 L 80 150 Z" fill="none" stroke="black" strokeWidth="3" />

                 {/* Main Pad */}
                 <ellipse cx="50" cy="65" rx="18" ry="14" fill={skin.pad} />

                 {/* Toe Beans */}
                 <ellipse cx="28" cy="35" rx="8" ry="10" fill={skin.pad} transform="rotate(-20 28 35)" />
                 <ellipse cx="44" cy="25" rx="8" ry="10" fill={skin.pad} transform="rotate(-5 44 25)" />
                 <ellipse cx="60" cy="25" rx="8" ry="10" fill={skin.pad} transform="rotate(5 60 25)" />
                 <ellipse cx="76" cy="35" rx="8" ry="10" fill={skin.pad} transform="rotate(20 76 35)" />
              </g>
           </svg>
        </div>
      </div>
    </div>
  );
};
