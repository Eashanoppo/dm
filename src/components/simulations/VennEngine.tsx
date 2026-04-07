"use client";

import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { SectionSection, TheoryBoard, InsightBox, MathText } from "../ui/AcademicUI";

type Operation = "None" | "Union" | "Intersection" | "A_Only" | "B_Only" | "C_Only" | "AB_Only" | "BC_Only" | "AC_Only";

export const VennEngine = () => {
  const [pA, setPA] = useState(0.70);
  const [pB, setPB] = useState(0.65);
  const [pC, setPC] = useState(0.60);
  const [op, setOp] = useState<Operation>("Union");

  const theoryItems = [
    { l: "Addition Rule (3 Sets)", v: "$P(A \\cup B \\cup C) = P(A) + P(B) + P(C) - (P(A \\cap B) + P(B \\cap C) + P(A \\cap C)) + P(A \\cap B \\cap C)$" },
    { l: "Inclusion-Exclusion", v: "The formal name for the method of adjusting for overlaps to find the total union." },
    { l: "Exclusive Regions", v: "Regions like '$A$ only' are found by subtracting the other two sets from $A$." },
    { l: "Perfect Symmetry", v: "In a 3-set system, there are 7 distinct intersection regions + the outer space." }
  ];

  // Circle positions (Equilateral triangle centers)
  const centers = {
    A: { x: 200, y: 130 },
    B: { x: 160, y: 210 },
    C: { x: 240, y: 210 }
  };

  const getActiveFill = (id: Operation) => op === id ? "fill-secondary-gold/60" : "fill-transparent";

  return (
    <SectionSection
      id="speaker1"
      speaker="1"
      label="Fundamentals"
      title="Triple Venn Dynamics"
      formula={`P(A \\cup B \\cup C) = \\sum P(A_i) - \\sum P(A_i \\cap A_j) + P(A \\cap B \\cap C)`}
    >
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_350px] gap-12 mb-16">
        
        {/* Dark UI Simulation Container */}
        <div className="bg-[#1C1B17] rounded-[24px] p-8 md:p-10 border border-white/5 shadow-2xl flex flex-col md:flex-row gap-8 overflow-hidden relative group">
           
           {/* Left Control Panel */}
           <div className="flex-1 space-y-8">
              <div className="space-y-4">
                 <h3 className="text-white text-2xl font-serif font-bold italic leading-tight">
                    Set Operations & <br />
                    <span className="text-secondary-gold">Three-Set Logic</span>
                 </h3>
              </div>

              <div className="space-y-6">
                 {/* P(A) Slider */}
                 <div className="space-y-2">
                    <div className="flex justify-between items-center text-white/50 text-[10px] font-bold uppercase tracking-widest">
                       <span>P(A) Weight</span>
                       <span className="text-white/80 font-serif text-sm">{pA.toFixed(2)}</span>
                    </div>
                    <input 
                       type="range" min="0.2" max="0.9" step="0.01" value={pA}
                       onChange={(e) => setPA(parseFloat(e.target.value))}
                       className="w-full h-1.5 bg-white/10 rounded-full appearance-none accent-secondary-gold"
                    />
                 </div>

                 {/* P(B) Slider */}
                 <div className="space-y-2">
                    <div className="flex justify-between items-center text-white/50 text-[10px] font-bold uppercase tracking-widest">
                       <span>P(B) Weight</span>
                       <span className="text-white/80 font-serif text-sm">{pB.toFixed(2)}</span>
                    </div>
                    <input 
                       type="range" min="0.2" max="0.9" step="0.01" value={pB}
                       onChange={(e) => setPB(parseFloat(e.target.value))}
                       className="w-full h-1.5 bg-white/10 rounded-full appearance-none accent-secondary-gold"
                    />
                 </div>

                 {/* P(C) Slider */}
                 <div className="space-y-2">
                    <div className="flex justify-between items-center text-white/50 text-[10px] font-bold uppercase tracking-widest">
                       <span>P(C) Weight</span>
                       <span className="text-white/80 font-serif text-sm">{pC.toFixed(2)}</span>
                    </div>
                    <input 
                       type="range" min="0.2" max="0.9" step="0.01" value={pC}
                       onChange={(e) => setPC(parseFloat(e.target.value))}
                       className="w-full h-1.5 bg-white/10 rounded-full appearance-none accent-secondary-gold"
                    />
                 </div>
              </div>

              {/* Operation Buttons */}
              <div className="pt-6 border-t border-white/5">
                 <p className="text-white/30 text-[10px] uppercase font-bold tracking-widest mb-4">Highlight Region</p>
                 <div className="grid grid-cols-2 gap-2">
                    {[
                        { id: "Union", label: "A ∪ B ∪ C" },
                        { id: "Intersection", label: "A ∩ B ∩ C" },
                        { id: "A_Only", label: "A only" },
                        { id: "AB_Only", label: "A ∩ B only" }
                    ].map((btn) => (
                        <button 
                            key={btn.id}
                            onClick={() => setOp(btn.id as Operation)}
                            className={`px-3 py-2 rounded-lg text-[10px] font-bold uppercase tracking-tighter transition-all border ${
                                op === btn.id 
                                ? "bg-secondary-gold text-black border-secondary-gold shadow-lg" 
                                : "bg-white/5 text-white/60 border-white/10 hover:bg-white/10"
                            }`}
                        >
                            {btn.label}
                        </button>
                    ))}
                 </div>
              </div>

              <div className="pt-6 border-t border-white/5">
                 <p className="text-white/40 text-xs font-serif italic">
                    Focus: <span className="text-secondary-gold font-bold">{op.replace("_", " ")}</span>
                 </p>
              </div>
           </div>

           {/* Right Visual Engine */}
           <div className="flex-1 flex items-center justify-center min-h-[400px] bg-[#24231E] rounded-2xl border border-white/5 relative shadow-inner overflow-hidden">
               <svg viewBox="0 0 400 350" className="w-full h-full max-w-[400px]">
                   <defs>
                       <clipPath id="circleA"><circle cx={centers.A.x} cy={centers.A.y} r={pA * 100} /></clipPath>
                       <clipPath id="circleB"><circle cx={centers.B.x} cy={centers.B.y} r={pB * 100} /></clipPath>
                       <clipPath id="circleC"><circle cx={centers.C.x} cy={centers.C.y} r={pC * 100} /></clipPath>
                   </defs>

                   {/* Base Circles */}
                   <circle cx={centers.A.x} cy={centers.A.y} r={pA * 100} className="fill-white/5 stroke-white/20" strokeWidth={1} />
                   <circle cx={centers.B.x} cy={centers.B.y} r={pB * 100} className="fill-white/5 stroke-white/20" strokeWidth={1} />
                   <circle cx={centers.C.x} cy={centers.C.y} r={pC * 100} className="fill-white/5 stroke-white/20" strokeWidth={1} />

                   {/* Interaction Highlights */}
                   
                   {/* 1. Intersection A ∩ B ∩ C — triple-nested clipPath for true center-only highlight */}
                   {op === "Intersection" && (
                       <g clipPath="url(#circleA)">
                           <g clipPath="url(#circleB)">
                               <g clipPath="url(#circleC)">
                                   <rect x="0" y="0" width="400" height="400" fill="#D4A017" opacity="0.85" />
                               </g>
                           </g>
                       </g>
                   )}

                   {/* 2. Union A & B & C */}
                   {op === "Union" && (
                       <g className="opacity-40">
                           <circle cx={centers.A.x} cy={centers.A.y} r={pA * 100} className="fill-secondary-gold" />
                           <circle cx={centers.B.x} cy={centers.B.y} r={pB * 100} className="fill-secondary-gold" />
                           <circle cx={centers.C.x} cy={centers.C.y} r={pC * 100} className="fill-secondary-gold" />
                       </g>
                   )}

                   {/* 3. A ONLY */}
                   {op === "A_Only" && (
                       <g clipPath="url(#circleA)">
                           <rect x="0" y="0" width="400" height="400" className="fill-secondary-gold" />
                           <circle cx={centers.B.x} cy={centers.B.y} r={pB * 100} className="fill-[#24231E]" />
                           <circle cx={centers.C.x} cy={centers.C.y} r={pC * 100} className="fill-[#24231E]" />
                       </g>
                   )}

                   {/* 4. AB ONLY (Intersection but not C) */}
                   {op === "AB_Only" && (
                       <g clipPath="url(#circleA)">
                           <g clipPath="url(#circleB)">
                               <rect x="0" y="0" width="400" height="400" className="fill-secondary-gold" />
                               <circle cx={centers.C.x} cy={centers.C.y} r={pC * 100} className="fill-[#24231E]" />
                           </g>
                       </g>
                   )}

                   {/* Outlines */}
                   <circle cx={centers.A.x} cy={centers.A.y} r={pA * 100} className="fill-transparent stroke-secondary-gold/30" strokeWidth={2} />
                   <circle cx={centers.B.x} cy={centers.B.y} r={pB * 100} className="fill-transparent stroke-blue-500/30" strokeWidth={2} />
                   <circle cx={centers.C.x} cy={centers.C.y} r={pC * 100} className="fill-transparent stroke-emerald-500/30" strokeWidth={2} />

                   {/* Labels */}
                   <text x={centers.A.x} y={centers.A.y - pA * 50} className="text-3xl font-serif font-bold fill-white/80 text-center" textAnchor="middle">A</text>
                   <text x={centers.B.x - pB * 50} y={centers.B.y + pB * 30} className="text-3xl font-serif font-bold fill-white/80 text-center" textAnchor="middle">B</text>
                   <text x={centers.C.x + pC * 50} y={centers.C.y + pC * 30} className="text-3xl font-serif font-bold fill-white/80 text-center" textAnchor="middle">C</text>
               </svg>
           </div>
        </div>

        {/* Sidebar Theory Component */}
        <TheoryBoard 
           title="Theory Board" 
           items={theoryItems} 
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          { icon: "3H", title: "Triple Intersection", desc: "Modeling scenarios where all three conditions must be met for a valid outcome." },
          { icon: "EX", label: "A only", desc: "Filtering noise by removing intersections with other variables to isolate a pure state." },
          { icon: "UN", label: "Total Reach", desc: "Calculating the total coverage of three independent marketing or research channels." }
        ].map((item, i) => (
          <div key={i} className="glass-card p-8 text-center group hover:bg-paper-gold/30 transition-all">
            <div className="w-12 h-12 bg-paper-gold flex items-center justify-center rounded-lg mx-auto mb-6 font-bold text-secondary text-sm tracking-widest border border-secondary/10 group-hover:bg-secondary group-hover:text-white transition-all duration-300">
               {item.icon}
            </div>
            <h4 className="text-xl font-bold mb-4">{item.title || item.label}</h4>
            <p className="text-academic-muted text-sm leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </div>
    </SectionSection>
  );
};
