"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionSection, TheoryBoard, InsightBox, MathText, GlassCard } from "../ui/AcademicUI";

// ── Speaker 1 Speech ─────────────────────────────────────────────────────────
export const SPEAKER_1_SPEECH = {
  name: "Speaker 1",
  topic: "The Logic of Sets",
  teaser: "Before we can calculate the probability of a car crash or a stock market collapse, we must understand the geography of logic itself: the Venn diagram.",
  points: [
    "THE UNIVERSE OF EVENTS: Every probability problem starts with a Sample Space — the collection of all possible outcomes. A Venn diagram is a map of that space, where each circle represent a set of outcomes that share a property.",
    "THE ADDITION RULE: The most common mistake in probability is double-counting. If event A has a 70% chance and event B has a 60% chance, the chance of 'A or B' isn't 130%. We must subtract the overlap (A ∩ B) to find the truth.",
    "INCLUSION-EXCLUSION: For three sets, the math gets beautiful and complex. We add the individuals, subtract the pairs, and add back the triple-intersection that we subtracted one too many times. This is the bedrock of combinatorial logic.",
    "Probability is just a measure assigned to these geometric regions. If the circle of 'Rain' covers 30% of our universe, and 'Wind' covers 40%, the logic of their overlap dictates how we prepare for the storm.",
  ],
  formula: "P(A \\cup B) = P(A) + P(B) - P(A \\cap B)",
};

type Operation = "None" | "Union" | "Intersection" | "A_Only" | "B_Only" | "C_Only" | "AB_Only" | "BC_Only" | "AC_Only";

export const VennEngine = () => {
  const [pA, setPA] = useState(0.70);
  const [pB, setPB] = useState(0.65);
  const [pC, setPC] = useState(0.60);
  const [op, setOp] = useState<Operation>("Union");
  const [speechOpen, setSpeechOpen] = useState(false);

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

  // Computed probability stats (using a fixed 30% mutual overlap assumption)
  const overlapFactor = 0.30;
  const pAB = useMemo(() => overlapFactor * Math.min(pA, pB), [pA, pB]);
  const pBC = useMemo(() => overlapFactor * Math.min(pB, pC), [pB, pC]);
  const pAC = useMemo(() => overlapFactor * Math.min(pA, pC), [pA, pC]);
  const pABC = useMemo(() => overlapFactor * 0.5 * Math.min(pA, pB, pC), [pA, pB, pC]);
  const pUnion = useMemo(() => {
    return Math.min(1, pA + pB + pC - pAB - pBC - pAC + pABC);
  }, [pA, pB, pC, pAB, pBC, pAC, pABC]);

  const activeStatValue = useMemo(() => {
    if (op === "Union")        return { label: "P(A ∪ B ∪ C)", value: pUnion };
    if (op === "Intersection") return { label: "P(A ∩ B ∩ C)", value: pABC };
    if (op === "A_Only")       return { label: "P(A only)",    value: Math.max(0, pA - pAB - pAC + pABC) };
    if (op === "AB_Only")      return { label: "P(A ∩ B only)", value: Math.max(0, pAB - pABC) };
    return { label: "—", value: 0 };
  }, [op, pA, pB, pC, pAB, pBC, pAC, pABC, pUnion]);

  return (
    <SectionSection
      id="speaker1"
      speaker="1"
      label={SPEAKER_1_SPEECH.topic}
      title="Triple Venn Dynamics"
      formula={SPEAKER_1_SPEECH.formula}
    >
      {/* Speech Panel */}
      <div className="mb-12">
        <button
          onClick={() => setSpeechOpen(!speechOpen)}
          className="flex items-center gap-3 text-sm font-bold uppercase tracking-widest text-secondary hover:text-primary transition-colors mb-4"
        >
          <span className={`transition-transform duration-300 ${speechOpen ? "rotate-90" : ""}`}>▶</span>
          {SPEAKER_1_SPEECH.name} — "{SPEAKER_1_SPEECH.teaser.slice(0, 60)}…"
        </button>
        <AnimatePresence>
          {speechOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden"
            >
              <GlassCard className="p-8 border-l-4 border-secondary mb-6">
                <p className="text-academic-muted text-sm italic font-serif leading-relaxed mb-6">
                  "{SPEAKER_1_SPEECH.teaser}"
                </p>
                <div className="space-y-4">
                  {SPEAKER_1_SPEECH.points.map((pt, i) => (
                    <div key={i} className="flex gap-4">
                      <span className="text-secondary font-bold font-mono text-xs mt-1 shrink-0">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <p className="text-sm leading-relaxed text-academic-muted">{pt}</p>
                    </div>
                  ))}
                </div>
              </GlassCard>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
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

                   {/* Upper-left Total Badge: P(A∪B∪C) */}
                   <rect x="8" y="8" width="112" height="44" rx="8" fill="#1A1914" opacity="0.92" />
                   <text x="18" y="22" fontSize="8" fontFamily="monospace" fontWeight="bold" fill="rgba(255,255,255,0.35)" letterSpacing="1">P(A∪B∪C) TOTAL</text>
                   <text x="18" y="43" fontSize="21" fontFamily="monospace" fontWeight="bold" fill="#D4A017">{(pUnion * 100).toFixed(0)}%</text>

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

                    {/* Letter Labels — pushed to outer edge of each circle */}
                    <text x={centers.A.x} y={centers.A.y - pA * 90} fontSize="14" fontFamily="serif" fontWeight="bold" fill="rgba(255,255,255,0.7)" textAnchor="middle">A</text>
                    <text x={centers.B.x - pB * 80} y={centers.B.y + pB * 70} fontSize="14" fontFamily="serif" fontWeight="bold" fill="rgba(255,255,255,0.7)" textAnchor="middle">B</text>
                    <text x={centers.C.x + pC * 80} y={centers.C.y + pC * 70} fontSize="14" fontFamily="serif" fontWeight="bold" fill="rgba(255,255,255,0.7)" textAnchor="middle">C</text>

                    {/* P(X) Percentage Labels — inside each circle */}
                    <text x={centers.A.x} y={centers.A.y - pA * 35} fontSize="11" fontFamily="monospace" fontWeight="bold" fill="#D4A017" textAnchor="middle" opacity="0.9">
                      {(pA * 100).toFixed(0)}%
                    </text>
                    <text x={centers.B.x - pB * 30} y={centers.B.y + pB * 55} fontSize="11" fontFamily="monospace" fontWeight="bold" fill="#60a5fa" textAnchor="middle" opacity="0.9">
                      {(pB * 100).toFixed(0)}%
                    </text>
                    <text x={centers.C.x + pC * 30} y={centers.C.y + pC * 55} fontSize="11" fontFamily="monospace" fontWeight="bold" fill="#34d399" textAnchor="middle" opacity="0.9">
                      {(pC * 100).toFixed(0)}%
                    </text>
                </svg>

                {/* Live Stats Row */}
                <div className="absolute bottom-0 left-0 right-0 bg-[#1A1914]/90 backdrop-blur px-4 py-3 flex justify-around text-[10px] font-mono border-t border-white/5">
                  {[
                    { label: "P(A∩B)",     value: pAB },
                    { label: "P(B∩C)",     value: pBC },
                    { label: "P(A∩C)",     value: pAC },
                    { label: "P(A∩B∩C)",   value: pABC },
                    { label: "P(A∪B∪C)",   value: pUnion },
                  ].map(({ label, value }) => (
                    <div key={label} className="flex flex-col items-center gap-1">
                      <span className="text-white/30 text-[9px] uppercase">{label}</span>
                      <span className="text-secondary-gold font-bold text-xs">{(value * 100).toFixed(0)}%</span>
                    </div>
                  ))}
                </div>
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
