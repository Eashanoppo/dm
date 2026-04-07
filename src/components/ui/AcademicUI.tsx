"use client";

import React from "react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import "katex/dist/katex.min.css";
import katex from "katex";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// GlassCard: Translucent white cards with backdrop blur
export const GlassCard = ({ 
  children, 
  className,
  variant = "default" 
}: { 
  children: React.ReactNode; 
  className?: string;
  variant?: "default" | "elevation";
}) => {
  return (
    <div className={cn(
      "bg-white/60 backdrop-blur-xl border border-academic-border rounded-lg shadow-academic-sm transition-all duration-300",
      variant === "elevation" && "bg-white/85 shadow-academic-md",
      "hover:translate-y-[-4px] hover:shadow-academic-md",
      className
    )}>
      {children}
    </div>
  );
};

// MathPill: Gold-tinted KaTeX math container
export const MathPill = ({ formula, className }: { formula: string; className?: string }) => {
  const containerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (containerRef.current) {
      katex.render(formula, containerRef.current, {
        throwOnError: false,
      });
    }
  }, [formula]);

  return (
    <div className={cn(
      "inline-flex items-center gap-2 px-6 py-3 bg-paper-gold border border-secondary-gold/30 rounded-full font-serif text-lg text-academic-text",
      className
    )}>
      <div ref={containerRef} />
    </div>
  );
};

// InsightBox: Gold-accented academic blockquote
export const InsightBox = ({ text, className }: { text: string; className?: string }) => {
  return (
    <div className={cn(
      "border-l-4 border-secondary bg-secondary-gold/5 px-10 py-8 rounded-r-md font-serif text-xl leading-relaxed glass-card",
      className
    )}>
      <blockquote className="text-academic-text not-italic">
        {text}
      </blockquote>
    </div>
  );
};

// MathText: Inline KaTeX parser
export const MathText = ({ text }: { text: string }) => {
  const renderMath = (content: string) => {
    const parts = content.split(/(\$.*?\$)/g);
    return parts.map((part, i) => {
      if (part.startsWith("$") && part.endsWith("$")) {
        const formula = part.slice(1, -1);
        try {
          const html = katex.renderToString(formula, { throwOnError: false });
          return <span key={i} dangerouslySetInnerHTML={{ __html: html }} />;
        } catch {
          return <span key={i}>{formula}</span>;
        }
      }
      return <span key={i}>{part}</span>;
    });
  };
  return <>{renderMath(text)}</>;
};

// TheoryBoard: Sidebar for mathematical context
export const TheoryBoard = ({ title, items, className }: { title: string; items: { l: string; v: string }[]; className?: string }) => {
  return (
    <div className={cn("bg-[#1D1C17] text-white/90 p-8 rounded-xl border border-white/10 shadow-2xl h-full", className)}>
      <h3 className="text-secondary-gold font-serif text-2xl font-bold mb-8 border-b border-white/10 pb-4 not-italic">{title}</h3>
      <div className="space-y-6">
        {items.map((item, i) => (
          <div key={i} className="flex flex-col gap-2">
            <span className="text-xs uppercase tracking-widest font-bold text-white/40">{item.l}</span>
            <div className="text-sm leading-relaxed font-sans not-italic text-white/80">
               <MathText text={item.v} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// DiceFace: CSS-based die visual (2D)
export const DiceFace = ({ value, className, size = "md", color = "white" }: { value: number; className?: string; size?: "sm" | "md" | "lg"; color?: "white" | "orange" | "blue" }) => {
  const dots: Record<number, number[]> = {
    1: [4],
    2: [0, 8],
    3: [0, 4, 8],
    4: [0, 2, 6, 8],
    5: [0, 2, 4, 6, 8],
    6: [0, 2, 3, 5, 6, 8],
  };

  const sizes = {
    sm: "w-8 h-8 p-1.5 gap-0.5",
    md: "w-16 h-16 p-3 gap-1",
    lg: "w-24 h-24 p-5 gap-2",
  };

  const colors = {
    white: "bg-white border-academic-border",
    orange: "bg-[#FFDAB9] border-[#E8A068]", // Peach/Orange from slide
    blue: "bg-[#ADD8E6] border-[#7CB0CA]", // Blue from slide
  };

  const dotColors = {
    white: "bg-academic-text",
    orange: "bg-[#8A3A00]",
    blue: "bg-[#003B5C]",
  };

  return (
    <div className={cn(
      "border-2 rounded-xl grid grid-cols-3 transition-all duration-300",
      sizes[size],
      colors[color],
      className
    )}>
      {[...Array(9)].map((_, i) => (
        <div key={i} className="flex items-center justify-center">
          {dots[value]?.includes(i) && (
            <div className={cn(
               "rounded-full",
               dotColors[color],
               size === "sm" ? "w-1 h-1" : size === "md" ? "w-2 h-2" : "w-3 h-3"
            )} />
          )}
        </div>
      ))}
    </div>
  );
};

// True 3D Cube Dice
export const DiceFace3D = ({ value, className, size = "md", color = "white", ...props }: { value: number; size?: "sm" | "md" | "lg"; color?: "white" | "orange" | "blue" } & React.HTMLAttributes<HTMLDivElement>) => {
  const sizeMap = { sm: 32, md: 64, lg: 96 };
  const s = sizeMap[size];
  const halfS = s / 2;

  // Real dice mapping: 1 opp 6, 2 opp 5, 3 opp 4.
  // Default rotations to show specific faces to the camera
  const rotations: Record<number, string> = {
    1: "rotateX(0deg) rotateY(0deg)", // Front
    2: "rotateY(-90deg)",            // Right
    3: "rotateX(-90deg)",            // Top
    4: "rotateX(90deg)",             // Bottom
    5: "rotateY(90deg)",             // Left
    6: "rotateY(180deg)",            // Back
  };

  return (
    <div {...props} className={cn("relative preserve-3d transition-transform duration-500", className)} style={{ width: s, height: s, transform: rotations[value], ...props.style }}>
       <div className="absolute inset-0" style={{ transform: `translateZ(${halfS}px)` }}><DiceFace value={1} size={size} color={color} className="w-full h-full m-0" /></div>
       <div className="absolute inset-0" style={{ transform: `rotateY(180deg) translateZ(${halfS}px)` }}><DiceFace value={6} size={size} color={color} className="w-full h-full m-0" /></div>
       <div className="absolute inset-0" style={{ transform: `rotateY(90deg) translateZ(${halfS}px)` }}><DiceFace value={2} size={size} color={color} className="w-full h-full m-0" /></div>
       <div className="absolute inset-0" style={{ transform: `rotateY(-90deg) translateZ(${halfS}px)` }}><DiceFace value={5} size={size} color={color} className="w-full h-full m-0" /></div>
       <div className="absolute inset-0" style={{ transform: `rotateX(90deg) translateZ(${halfS}px)` }}><DiceFace value={3} size={size} color={color} className="w-full h-full m-0" /></div>
       <div className="absolute inset-0" style={{ transform: `rotateX(-90deg) translateZ(${halfS}px)` }}><DiceFace value={4} size={size} color={color} className="w-full h-full m-0" /></div>
    </div>
  );
};

// Coin Face 3D — Premium metallic coin with real 3D flip
export const CoinFace3D = ({ face, className, size = "md", ...props }: { face: "H" | "T"; size?: "sm" | "md" | "lg" } & React.HTMLAttributes<HTMLDivElement>) => {
  const sizeMap = { sm: 44, md: 88, lg: 128 };
  const s = sizeMap[size];
  const isHeads = face === "H";

  return (
    <div
      style={{ width: s, height: s, perspective: `${s * 5}px` }}
      className={cn("relative rounded-full", className)}
      {...props}
    >
      <div
        className="w-full h-full preserve-3d transition-transform duration-700 rounded-full"
        style={{ transform: isHeads ? "rotateY(0deg)" : "rotateY(180deg)" }}
      >
        {/* Heads Face — Gold coin */}
        <div
          className="absolute inset-0 backface-hidden rounded-full flex items-center justify-center overflow-hidden"
          style={{
            background: "radial-gradient(ellipse at 35% 35%, #FFF176 0%, #FFD700 35%, #B8860B 75%, #7A5500 100%)",
            boxShadow: `inset 0 ${s*0.04}px ${s*0.08}px rgba(255,255,255,0.5), inset 0 -${s*0.04}px ${s*0.08}px rgba(0,0,0,0.3), 0 0 ${s*0.15}px rgba(218,165,32,0.6)`,
            border: `${Math.max(2, s * 0.04)}px solid #DAA520`,
          }}
        >
          {/* Inner ring engraving */}
          <div
            className="absolute rounded-full flex items-center justify-center"
            style={{
              inset: s * 0.08,
              border: `${Math.max(1, s * 0.02)}px solid rgba(255,220,100,0.5)`,
            }}
          >
            <div
              className="flex flex-col items-center justify-center"
              style={{ gap: s * 0.02 }}
            >
              <span
                className="font-bold text-[#5A3A00] tracking-tight leading-none select-none"
                style={{ fontSize: s * 0.38, textShadow: `0 1px 2px rgba(255,220,80,0.8)` }}
              >H</span>
              <div
                className="bg-[#DAA520]/60 rounded-full"
                style={{ width: s * 0.35, height: s * 0.02 }}
              />
            </div>
          </div>
        </div>

        {/* Tails Face — Silver coin */}
        <div
          className="absolute inset-0 backface-hidden rounded-full flex items-center justify-center overflow-hidden"
          style={{
            transform: "rotateY(180deg)",
            background: "radial-gradient(ellipse at 35% 35%, #FFFFFF 0%, #D8D8D8 30%, #A0A0A0 70%, #606060 100%)",
            boxShadow: `inset 0 ${s*0.04}px ${s*0.08}px rgba(255,255,255,0.7), inset 0 -${s*0.04}px ${s*0.08}px rgba(0,0,0,0.4), 0 0 ${s*0.1}px rgba(160,160,180,0.5)`,
            border: `${Math.max(2, s * 0.04)}px solid #BDBDBD`,
          }}
        >
          {/* Inner ring engraving */}
          <div
            className="absolute rounded-full flex items-center justify-center"
            style={{
              inset: s * 0.08,
              border: `${Math.max(1, s * 0.02)}px dashed rgba(200,200,200,0.6)`,
            }}
          >
            <span
              className="font-bold text-[#404040] tracking-tight leading-none select-none"
              style={{ fontSize: s * 0.38, textShadow: `0 1px 2px rgba(255,255,255,0.6)` }}
            >T</span>
          </div>
        </div>
      </div>
    </div>
  );
};


// PlayingCard: CSS-based playing card visual
export const PlayingCard = ({ suit, rank, color, className }: { suit: string; rank: string; color: string; className?: string }) => {
  const suitIcon = suit === "Hearts" ? "♥" : suit === "Diamonds" ? "♦" : suit === "Clubs" ? "♣" : "♠";
  const isFace = ["J", "Q", "K"].includes(rank);
  const faceSymbol = rank === "K" ? "♚" : rank === "Q" ? "♛" : "♝";

  return (
    <div className={cn(
      "w-32 h-44 bg-white border-2 border-academic-border rounded-xl shadow-academic-md hover:scale-105 transition-all overflow-hidden relative select-none",
      color === "red" ? "text-primary border-primary/20" : "text-academic-text border-academic-border",
      className
    )}>
      {/* Top Left Indice */}
      <div className="absolute top-2 left-2 flex flex-col items-center leading-none">
        <span className="text-[22px] font-bold font-serif leading-none">{rank}</span>
        <span className="text-[16px] leading-none mt-1">{suitIcon}</span>
      </div>
      
      {/* Center content */}
      <div className="absolute inset-0 px-[32px] py-[28px] pointer-events-none flex items-center justify-center">
        {rank === "K" ? (
           <div className="w-full h-full border-[1.5px] border-current/60 rounded-[4px] relative flex flex-col bg-current/[0.04] overflow-hidden shadow-inner">
               <img src="/king-face.png" alt="King" className="w-full h-1/2 object-cover object-top mix-blend-multiply opacity-90" />
               <img src="/king-face.png" alt="King" className="w-full h-1/2 object-cover object-top rotate-180 mix-blend-multiply opacity-90" />
               <div className="absolute w-full h-px bg-current/20 top-1/2 -translate-y-1/2" />
               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-full p-[2px] border border-current/20 shadow-sm flex items-center justify-center">
                   <span className="text-[18px] leading-none block w-5 h-5 text-center flex items-center justify-center">{suitIcon}</span>
               </div>
           </div>
        ) : isFace ? (
           <div className="w-full h-full border-2 border-current/40 rounded-[4px] relative flex flex-col items-center justify-center bg-current/[0.04] overflow-hidden shadow-inner">
               <div className="absolute w-full h-px bg-current/20 top-1/2 -translate-y-1/2" />
               
               <div className="absolute top-1 flex flex-col items-center">
                  <span className="text-[34px] leading-none opacity-80">{faceSymbol}</span>
               </div>
               
               <div className="absolute bottom-1 flex flex-col items-center rotate-180">
                  <span className="text-[34px] leading-none opacity-80">{faceSymbol}</span>
               </div>
               
               <div className="z-10 bg-white rounded-full p-[2px] border border-current/20 shadow-sm flex items-center justify-center">
                   <span className="text-[18px] leading-none block w-5 h-5 text-center flex items-center justify-center">{suitIcon}</span>
               </div>
           </div>
        ) : (
           <span className="text-[64px]">{suitIcon}</span>
        )}
      </div>

      {/* Bottom Right Indice */}
      <div className="absolute bottom-2 right-2 flex flex-col items-center leading-none rotate-180">
        <span className="text-[22px] font-bold font-serif leading-none">{rank}</span>
        <span className="text-[16px] leading-none mt-1">{suitIcon}</span>
      </div>
    </div>
  );
};

// SectionSection: Layout wrapper for Speaker sections
export const SectionSection = ({ 
  id, 
  title, 
  speaker, 
  label, 
  formula, 
  children,
  className 
}: { 
  id: string;
  title: string;
  speaker: string;
  label: string;
  formula: string;
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <section id={id} className={cn("py-24 border-t border-academic-border scroll-mt-[70px]", className)}>
      <div className="max-w-[1200px] mx-auto px-8">
        <div className="text-center mb-16">
          <span className="block text-secondary font-semibold uppercase tracking-[0.1em] text-xs mb-2">
            Speaker {speaker}: {label}
          </span>
          <h2 className="text-5xl font-bold mb-8 text-academic-text">{title}</h2>
          <MathPill formula={formula} />
        </div>
        {children}
      </div>
    </section>
  );
};
