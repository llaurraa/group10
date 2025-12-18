
import React, { useState, useEffect } from 'react';

interface CatLoafProps {
  skinId: string;
  mood: 'happy' | 'neutral' | 'sad' | 'angry' | 'excited';
  accessoryId?: string | null;
  onPartClick?: (part: 'head' | 'belly' | 'tail', e: React.MouseEvent) => void;
  className?: string;
}

export const CatLoaf: React.FC<CatLoafProps> = ({ skinId, mood, accessoryId, onPartClick, className = "w-64 h-64" }) => {
  const [isSquished, setIsSquished] = useState(false);
  const [breathing, setBreathing] = useState(0);
  const [blink, setBlink] = useState(false);
  const [wiggle, setWiggle] = useState(0);

  // Breathing/Wiggle animation loop
  useEffect(() => {
    const breathInterval = setInterval(() => {
      setBreathing(prev => (prev === 0 ? 1 : 0));
    }, 2000);
    return () => clearInterval(breathInterval);
  }, []);

  // Blinking logic
  useEffect(() => {
    const blinkInterval = setInterval(() => {
      if (Math.random() > 0.4) {
        setBlink(true);
        setTimeout(() => setBlink(false), 150);
      }
    }, 4000);
    return () => clearInterval(blinkInterval);
  }, []);

  const handlePointerDown = () => {
    setIsSquished(true);
    setWiggle(prev => prev + 1);
  };
  const handlePointerUp = () => setIsSquished(false);

  // --- Doodle Style Colors ---
  // Outlines are always black. Fills are simple.
  const getFillColor = (id: string) => {
    switch (id) {
      case 'cat_orange_tabby': return '#ffedd5'; // Light Orange
      case 'cat_calico': return '#ffffff'; 
      case 'cat_void_black': return '#262626'; // Dark Grey (not full black to see lines)
      case 'cat_grey': return '#e5e7eb';
      case 'cat_siamese': return '#f3f4f6';
      case 'cat_golden': return '#fef08a';
      case 'cat_default_white': return '#ffffff';
      case 'cat_cyber_blue': default: return '#ffffff';
    }
  };

  const fill = getFillColor(skinId);
  const stroke = '#000000'; // Always black stroke for doodle style
  const strokeWidth = "7"; // Thick lines

  // --- Render Doodle Parts ---

  const renderEyes = () => {
    // Blink overrides everything
    if (blink) {
      // Simple dash - -
      return (
        <g stroke={stroke} strokeWidth={strokeWidth} strokeLinecap="round">
          <path d="M 130 185 L 160 185" />
          <path d="M 240 185 L 270 185" />
        </g>
      );
    }

    if (mood === 'happy' || mood === 'excited') {
      // Cute Arcs ^ ^ (Inverted U shape)
      return (
        <g stroke={stroke} strokeWidth={strokeWidth} strokeLinecap="round" fill="none">
          <path d="M 130 195 Q 145 170 160 195" />
          <path d="M 240 195 Q 255 170 270 195" />
        </g>
      );
    }

    if (mood === 'angry') {
      // Angled \ /
      return (
         <g stroke={stroke} strokeWidth={strokeWidth} strokeLinecap="round">
           <path d="M 130 175 L 160 195" />
           <path d="M 270 175 L 240 195" />
         </g>
      );
    }

    if (mood === 'sad') {
       // Droopy / \
       return (
        <g stroke={stroke} strokeWidth={strokeWidth} strokeLinecap="round">
          <path d="M 130 190 L 160 200" />
          <path d="M 270 190 L 240 200" />
          {/* Small tear drops */}
          <path d="M 125 200 L 125 210" strokeWidth="4" opacity="0.5" />
          <path d="M 275 200 L 275 210" strokeWidth="4" opacity="0.5" />
        </g>
       );
    }

    // Default Neutral: Vertical Lines | | (Simple and cute)
    return (
      <g stroke={stroke} strokeWidth={strokeWidth} strokeLinecap="round">
        <path d="M 145 175 L 145 200" />
        <path d="M 255 175 L 255 200" />
      </g>
    );
  };

  const renderMouth = () => {
     if (mood === 'excited') {
        // Open mouth :D
        return <path d="M 185 220 Q 200 245 215 220 Z" fill="black" />;
     }
     // 'w' mouth
     return (
       <path d="M 185 220 Q 195 230 200 220 Q 205 230 215 220" fill="none" stroke={stroke} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
     );
  };

  // Doodle markings
  const renderPatterns = () => {
     if (skinId === 'cat_orange_tabby') {
        return (
           <g stroke={stroke} strokeWidth={strokeWidth} strokeLinecap="round" opacity="0.3">
              <path d="M 180 80 L 190 100 L 200 80" fill="none" />
              <path d="M 90 200 L 70 200" />
              <path d="M 310 200 L 330 200" />
           </g>
        );
     }
     if (skinId === 'cat_calico') {
        return (
           <g fill="#2d2d2d">
              <circle cx="110" cy="120" r="25" opacity="0.1" />
              <circle cx="290" cy="260" r="30" opacity="0.1" fill="#ea580c"/>
           </g>
        );
     }
     if (skinId === 'cat_siamese') {
       return (
         <g>
            <ellipse cx="200" cy="210" rx="30" ry="20" fill="#000" opacity="0.1" />
         </g>
       )
     }
     return null;
  };

  const renderAccessory = () => {
    if (!accessoryId) return null;

    if (accessoryId === 'acc_bowtie') {
      return (
        <g transform="translate(200, 240)">
           {/* Bowtie: Two Triangles + Center */}
           <path d="M -25 -10 L -25 10 L 0 0 Z" fill="#ef4444" stroke="black" strokeWidth="4" strokeLinejoin="round" />
           <path d="M 25 -10 L 25 10 L 0 0 Z" fill="#ef4444" stroke="black" strokeWidth="4" strokeLinejoin="round" />
           <circle cx="0" cy="0" r="5" fill="#ef4444" stroke="black" strokeWidth="4" />
        </g>
      );
    }

    if (accessoryId === 'acc_bell') {
      return (
        <g transform="translate(200, 235)">
           {/* Collar String */}
           <path d="M -50 -10 Q 0 10 50 -10" stroke="#ef4444" strokeWidth="5" fill="none" strokeLinecap="round" />
           {/* Bell */}
           <circle cx="0" cy="10" r="12" fill="#facc15" stroke="black" strokeWidth="4" />
           <path d="M -8 10 L 8 10" stroke="black" strokeWidth="3" />
           <circle cx="0" cy="18" r="2" fill="black" />
        </g>
      );
    }

    if (accessoryId === 'acc_hat') {
      return (
        <g transform="translate(220, 70) rotate(15)">
           {/* Party Hat */}
           <path d="M -20 40 L 0 -20 L 20 40 Z" fill="#3b82f6" stroke="black" strokeWidth="4" strokeLinejoin="round" />
           {/* Stripes */}
           <path d="M -12 20 L 12 20" stroke="#facc15" strokeWidth="4" />
           <path d="M -6 5 L 6 5" stroke="#ef4444" strokeWidth="4" />
           {/* Pom pom */}
           <circle cx="0" cy="-20" r="6" fill="#facc15" stroke="black" strokeWidth="4" />
        </g>
      );
    }

    return null;
  };

  return (
    <div 
      className={`${className} relative select-none`}
      style={{ 
        transform: `rotate(${isSquished ? wiggle % 2 === 0 ? 2 : -2 : 0}deg) scale(${isSquished ? 0.95 : 1})`,
        transition: 'transform 0.1s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
      }}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
    >
      <svg viewBox="0 0 400 400" className="w-full h-full drop-shadow-sm overflow-visible">
        
        {/* --- TAIL --- */}
        <g transform={`rotate(${mood === 'happy' ? Math.sin(Date.now() / 200) * 10 : 0} 320 280)`}>
           <path 
             d="M 300 280 Q 380 280 360 200" 
             fill="none" 
             stroke={stroke} 
             strokeWidth="18" 
             strokeLinecap="round"
             className="cursor-pointer"
             onClick={(e) => onPartClick && onPartClick('tail', e)}
           />
           {/* Inner white for tail to look solid */}
           <path 
             d="M 300 280 Q 380 280 360 200" 
             fill="none" 
             stroke={fill} 
             strokeWidth="10" 
             strokeLinecap="round"
             className="pointer-events-none"
           />
        </g>

        {/* --- MAIN BODY & HEAD (One Blob) --- */}
        <g onClick={(e) => onPartClick && onPartClick('belly', e)} className="cursor-pointer">
           {/* 
              Doodle Shape:
              Starts from left ear, goes around head, down to left side, 
              curves for bottom, up to right side, right ear, top of head.
           */}
           <path 
             d="
                M 120 100 
                Q 80 120 70 200 
                Q 60 320 200 320 
                Q 340 320 330 200 
                Q 320 120 280 100
                L 290 50 
                Q 250 80 240 90
                L 160 90
                Q 150 80 110 50
                Z
             "
             fill={fill}
             stroke={stroke}
             strokeWidth={strokeWidth}
             strokeLinejoin="round"
             strokeLinecap="round"
           />

           {renderPatterns()}
        </g>

        {/* --- FACE --- */}
        <g onClick={(e) => onPartClick && onPartClick('head', e)} className="cursor-pointer">
           {renderEyes()}
           {renderMouth()}

           {/* Whiskers - Floating lines */}
           <g stroke={stroke} strokeWidth="5" strokeLinecap="round">
             <path d="M 60 190 L 40 185" />
             <path d="M 60 210 L 40 215" />
             
             <path d="M 340 190 L 360 185" />
             <path d="M 340 210 L 360 215" />
           </g>
        </g>

        {/* --- ACCESSORIES --- */}
        {renderAccessory()}

        {/* --- PAWS --- */}
        {/* Left Paw (Standing/Support) */}
        <path 
          d="M 150 310 L 150 280 Q 150 260 130 260 Q 110 260 110 280 L 110 300"
          fill={fill}
          stroke={stroke}
          strokeWidth={strokeWidth}
          strokeLinejoin="round"
          strokeLinecap="round"
        />
        
        {/* Right Paw (Raised slightly like reference) */}
        <path 
           d="M 250 240 Q 250 210 270 210 Q 290 210 290 240"
           fill={fill}
           stroke={stroke}
           strokeWidth={strokeWidth}
           strokeLinejoin="round"
           strokeLinecap="round"
        />

        {/* --- EMOTES --- */}
        {mood === 'happy' && (
           <g transform="translate(320, 100)">
              <path d="M 0 10 L 10 0 M 0 0 L 10 10" stroke={stroke} strokeWidth="5" strokeLinecap="round" />
              <path d="M 20 20 L 30 10 M 20 10 L 30 20" stroke={stroke} strokeWidth="5" strokeLinecap="round" />
           </g>
        )}

      </svg>
    </div>
  );
};
