import React from 'react';

export const YarnIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Shadow */}
    <circle cx="50" cy="50" r="42" fill="#000" fillOpacity="0.1" transform="translate(2, 4)" />
    
    {/* Main Body Background */}
    <circle cx="50" cy="50" r="42" fill="#2dd4bf" stroke="#000000" strokeWidth="5" />
    
    {/* Yarn Bands/Segments - Trying to replicate the woven ball look */}
    
    {/* Band 1: Diagonal Top-Left to Bottom-Right */}
    <path d="M 20 25 Q 50 50 80 75" stroke="#000000" strokeWidth="4.5" strokeLinecap="round" />
    <path d="M 12 40 Q 42 65 72 90" stroke="#000000" strokeWidth="4.5" strokeLinecap="round" />
    
    {/* Band 2: Diagonal Top-Right to Bottom-Left (Crossing) */}
    <path d="M 80 25 Q 50 50 20 75" stroke="#000000" strokeWidth="4.5" strokeLinecap="round" />
    <path d="M 88 40 Q 58 65 28 90" stroke="#000000" strokeWidth="4.5" strokeLinecap="round" />
    <path d="M 70 15 Q 40 40 15 60" stroke="#000000" strokeWidth="4.5" strokeLinecap="round" />

    {/* Band 3: Horizontal Curves */}
    <path d="M 10 50 Q 50 65 90 50" stroke="#000000" strokeWidth="4.5" strokeLinecap="round" />
    <path d="M 25 18 Q 50 28 75 18" stroke="#000000" strokeWidth="4.5" strokeLinecap="round" />

    {/* Loose Thread Tail */}
    <path d="M 85 82 Q 95 85 95 95" stroke="#000000" strokeWidth="5" strokeLinecap="round" fill="none" />
  </svg>
);
