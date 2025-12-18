
import React from 'react';

export const WardrobeIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Feet */}
    <path d="M 25 90 L 25 96 Q 25 99 22 99 L 20 99" stroke="black" strokeWidth="4" strokeLinecap="round" />
    <path d="M 75 90 L 75 96 Q 75 99 78 99 L 80 99" stroke="black" strokeWidth="4" strokeLinecap="round" />

    {/* Main Body Background */}
    <rect x="20" y="10" width="60" height="82" fill="#a05a2c" stroke="black" strokeWidth="4" />

    {/* Top Cornice */}
    <rect x="15" y="4" width="70" height="8" rx="1" fill="#78350f" stroke="black" strokeWidth="4" />

    {/* Door Divider (Vertical) */}
    <line x1="50" y1="13" x2="50" y2="72" stroke="black" strokeWidth="3" />
    
    {/* Drawer Divider (Horizontal) */}
    <line x1="20" y1="72" x2="80" y2="72" stroke="black" strokeWidth="3" />

    {/* Left Door Panel */}
    <rect x="26" y="18" width="18" height="48" rx="3" fill="#c27e4e" stroke="black" strokeWidth="2" />
    
    {/* Right Door Panel */}
    <rect x="56" y="18" width="18" height="48" rx="3" fill="#c27e4e" stroke="black" strokeWidth="2" />
    
    {/* Drawer Face */}
    <rect x="25" y="78" width="50" height="10" rx="2" fill="#c27e4e" stroke="black" strokeWidth="2" />

    {/* Door Knobs */}
    <circle cx="44" cy="45" r="2" fill="#fbbf24" stroke="black" strokeWidth="1" />
    <circle cx="56" cy="45" r="2" fill="#fbbf24" stroke="black" strokeWidth="1" />

    {/* Drawer Knobs */}
    <circle cx="35" cy="83" r="2" fill="#fbbf24" stroke="black" strokeWidth="1" />
    <circle cx="65" cy="83" r="2" fill="#fbbf24" stroke="black" strokeWidth="1" />
  </svg>
);
