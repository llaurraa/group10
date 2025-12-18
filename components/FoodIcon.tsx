import React from 'react';

export const FoodIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* --- Bottom Can (Red) --- */}
    <g transform="translate(10, 35)">
      {/* Cylinder Body */}
      <path 
        d="M 5 20 L 5 45 Q 40 60 75 45 L 75 20" 
        fill="#ef4444" 
        stroke="black" 
        strokeWidth="5" 
        strokeLinejoin="round"
      />
      <path 
        d="M 5 45 Q 40 60 75 45" 
        fill="none" 
        stroke="black" 
        strokeWidth="5" 
        strokeLinecap="round"
      />
      
      {/* Top Rim (Visible part below top can) */}
      <ellipse cx="40" cy="20" rx="35" ry="10" fill="#ef4444" stroke="black" strokeWidth="5" />
      
      {/* Fish Icon on Red Can */}
      <g transform="translate(40, 38) scale(0.6)">
        <path 
          d="M -20 0 Q -10 -10 10 0 L 20 -10 L 20 10 L 10 0 Q -10 10 -20 0 Z" 
          fill="white" 
          stroke="black" 
          strokeWidth="4" 
          strokeLinejoin="round"
        />
      </g>
    </g>

    {/* --- Top Can (Blue) --- */}
    <g transform="translate(5, 5)">
      {/* Cylinder Body */}
      <path 
        d="M 5 20 L 5 45 Q 40 60 75 45 L 75 20" 
        fill="#3b82f6" 
        stroke="black" 
        strokeWidth="5" 
        strokeLinejoin="round" 
      />
      <path 
        d="M 5 45 Q 40 60 75 45" 
        fill="none" 
        stroke="black" 
        strokeWidth="5" 
        strokeLinecap="round"
      />

      {/* Top Lid */}
      <ellipse cx="40" cy="20" rx="35" ry="10" fill="#e2e8f0" stroke="black" strokeWidth="5" />
      
      {/* Inner Rim Detail */}
      <path d="M 15 20 Q 40 33 65 20" stroke="black" strokeWidth="3" fill="none" strokeLinecap="round" opacity="0.5" />

      {/* Pull Tab */}
      <circle cx="55" cy="18" r="4" fill="none" stroke="black" strokeWidth="3" />
      <path d="M 55 18 L 45 22" stroke="black" strokeWidth="3" strokeLinecap="round" />

      {/* Fish Icon on Blue Can */}
      <g transform="translate(40, 38) scale(0.6)">
        <path 
          d="M -20 0 Q -10 -10 10 0 L 20 -10 L 20 10 L 10 0 Q -10 10 -20 0 Z" 
          fill="white" 
          stroke="black" 
          strokeWidth="4" 
          strokeLinejoin="round"
        />
      </g>
    </g>
  </svg>
);
