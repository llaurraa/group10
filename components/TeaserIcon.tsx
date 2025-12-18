import React from 'react';

export const TeaserIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Handle Stick (Tan/Peach) */}
    <line x1="25" y1="85" x2="65" y2="25" stroke="#ffcc99" strokeWidth="9" strokeLinecap="round" />
    
    {/* Handle Tip (Dark Brown Cap at Bottom) */}
    <line x1="23" y1="88" x2="28" y2="80" stroke="#8B4513" strokeWidth="9" strokeLinecap="round" />
    
    {/* Handle Top (Dark Brown Cap at Top) */}
    <line x1="62" y1="29" x2="67" y2="21" stroke="#8B4513" strokeWidth="9" strokeLinecap="round" />
    
    {/* Handle Outline */}
    <line x1="25" y1="85" x2="65" y2="25" stroke="black" strokeWidth="5" strokeLinecap="round" />

    {/* String (Black, Looped) */}
    <path d="M 65 25 C 85 25, 95 45, 70 55 S 40 70, 75 75" stroke="black" strokeWidth="4" fill="none" strokeLinecap="round" />

    {/* Feathers Group at end of string (75, 75) */}
    <g transform="translate(75, 75)">
        {/* Yellow Feather */}
        <path d="M 0 0 Q -12 18 -5 28 Q 8 22 0 0" fill="#fef08a" stroke="black" strokeWidth="3.5" transform="rotate(-20)" />
        {/* Pink Feather */}
        <path d="M 0 0 Q 12 18 5 28 Q -8 22 0 0" fill="#fbcfe8" stroke="black" strokeWidth="3.5" transform="rotate(20)" />
        {/* Orange Bead */}
        <circle cx="0" cy="0" r="4.5" fill="#fb923c" stroke="black" strokeWidth="3.5" />
    </g>
  </svg>
);
