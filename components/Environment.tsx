
import React from 'react';
import { NEST_LEVELS } from '../constants';

interface EnvironmentProps {
  nestLevel: number;
  bowlFull: boolean;
  className?: string;
}

export const Environment: React.FC<EnvironmentProps> = ({ nestLevel, bowlFull, className = "" }) => {
  const currentNest = NEST_LEVELS.find(n => n.id === nestLevel) || NEST_LEVELS[0];
  const strokeWidth = "6"; // Consistent thick doodle lines

  const renderNest = () => {
    if (currentNest.id === 0) {
      // Doodle Cardboard Box
      return (
        <svg viewBox="0 0 200 200" className="w-80 h-80 absolute bottom-4 left-1/2 -translate-x-1/2 z-0">
          {/* Shadow */}
          <ellipse cx="100" cy="170" rx="70" ry="10" fill="black" opacity="0.1" />

          <g stroke="black" strokeWidth={strokeWidth} strokeLinejoin="round" strokeLinecap="round">
            {/* Back Flap */}
            <path d="M 60 80 L 140 80 L 160 50 L 40 50 Z" fill="#d4a373" />
            
            {/* Inside Back */}
            <rect x="60" y="80" width="80" height="70" fill="#a17a5b" stroke="none" />
            
            {/* Inside Sides */}
            <path d="M 40 100 L 60 80 L 60 150 L 40 160 Z" fill="#8d6e63" stroke="none" />
            <path d="M 160 100 L 140 80 L 140 150 L 160 160 Z" fill="#8d6e63" stroke="none" />

            {/* Left Flap */}
            <path d="M 40 100 L 60 80 L 30 60 L 10 90 Z" fill="#d4a373" />
            
            {/* Right Flap */}
            <path d="M 160 100 L 140 80 L 170 60 L 190 90 Z" fill="#d4a373" />

            {/* Front Box Face */}
            <path d="M 40 100 L 160 100 L 160 160 L 40 160 Z" fill="#d4a373" />

            {/* Front Flap (Flopped down) */}
            <path d="M 40 100 L 160 100 L 170 140 L 30 140 Z" fill="#eaddcf" />
            
            {/* Doodle Details on Box */}
            <path d="M 80 120 L 80 110 L 120 110 L 120 120" fill="none" strokeWidth="4" />
            <path d="M 90 115 L 110 115" fill="none" strokeWidth="4" />
            <path d="M 95 130 L 105 130" stroke="black" strokeWidth="4" opacity="0.3" />
          </g>
        </svg>
      );
    }
    if (currentNest.id === 1) {
      // Doodle Cushion
      return (
        <svg viewBox="0 0 200 100" className="w-80 h-40 absolute bottom-12 left-1/2 -translate-x-1/2">
           <ellipse cx="100" cy="80" rx="90" ry="15" fill="black" opacity="0.1" />
           <g stroke="black" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
             {/* Bottom Layer */}
             <path d="M 20 60 Q 100 90 180 60 Q 190 50 180 40 Q 100 10 20 40 Q 10 50 20 60" fill="#fbcfe8" />
             {/* Ruffles/Buttons */}
             <circle cx="100" cy="50" r="5" fill="#f472b6" />
             <path d="M 40 50 Q 50 45 60 55" fill="none" stroke="#f472b6" strokeWidth="3" opacity="0.5" />
             <path d="M 140 50 Q 150 45 160 55" fill="none" stroke="#f472b6" strokeWidth="3" opacity="0.5" />
           </g>
        </svg>
      );
    }
    if (currentNest.id === 2) {
      // Doodle Royal Bed
      return (
        <svg viewBox="0 0 200 140" className="w-80 h-56 absolute bottom-6 left-1/2 -translate-x-1/2">
           <ellipse cx="100" cy="120" rx="90" ry="10" fill="black" opacity="0.1" />
           <g stroke="black" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
             {/* Backrest */}
             <path d="M 40 80 L 40 40 Q 100 10 160 40 L 160 80" fill="#c084fc" />
             {/* Base */}
             <rect x="30" y="80" width="140" height="40" rx="5" fill="#a855f7" />
             {/* Cushion */}
             <path d="M 35 80 Q 100 60 165 80 L 165 95 Q 100 110 35 95 Z" fill="#f3e8ff" />
             {/* Gems */}
             <circle cx="40" cy="35" r="8" fill="#facc15" />
             <circle cx="160" cy="35" r="8" fill="#facc15" />
             <circle cx="100" cy="30" r="12" fill="#facc15" />
             
             {/* Legs */}
             <path d="M 40 120 L 40 130" strokeWidth="8" />
             <path d="M 160 120 L 160 130" strokeWidth="8" />
           </g>
        </svg>
      );
    }
    return null;
  };

  const renderBowl = () => {
    return (
      <svg viewBox="0 0 120 100" className="w-32 h-24 absolute bottom-8 right-8 drop-shadow-md z-20">
        {/* Shadow */}
        <ellipse cx="60" cy="85" rx="50" ry="10" fill="black" opacity="0.15" />

        <g stroke="black" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
           {/* Bowl Shape */}
           <path d="M 10 40 L 25 80 Q 60 95 95 80 L 110 40" fill="#5eead4" />
           
           {/* Bowl Back Rim */}
           <path d="M 10 40 Q 60 20 110 40" fill="#2dd4bf" />

           {/* Food (if full) */}
           {bowlFull && (
             <g>
               <path d="M 20 40 Q 60 10 100 40" fill="#78350f" />
               <circle cx="40" cy="35" r="4" fill="#553018" stroke="none" />
               <circle cx="60" cy="30" r="5" fill="#553018" stroke="none" />
               <circle cx="80" cy="38" r="4" fill="#553018" stroke="none" />
             </g>
           )}

           {/* Bowl Front Rim */}
           <path d="M 10 40 Q 60 60 110 40" fill="#5eead4" />

           {/* Fish Bone Decoration */}
           <g transform="translate(60, 65) scale(0.8)">
             <path d="M -15 0 L 15 0" stroke="#0f766e" strokeWidth="4" />
             <path d="M -15 0 L -20 -5 M -15 0 L -20 5" stroke="#0f766e" strokeWidth="4" />
             <path d="M 15 0 L 20 -5 M 15 0 L 20 5" stroke="#0f766e" strokeWidth="4" />
             <line x1="-5" y1="-5" x2="-5" y2="5" stroke="#0f766e" strokeWidth="4" />
             <line x1="5" y1="-5" x2="5" y2="5" stroke="#0f766e" strokeWidth="4" />
           </g>
        </g>
      </svg>
    );
  };

  return (
    <div className={`pointer-events-none ${className}`}>
      {renderNest()}
      {renderBowl()}
    </div>
  );
};
