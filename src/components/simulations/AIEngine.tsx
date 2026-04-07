"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GlassCard, SectionSection, InsightBox, TheoryBoard } from "../ui/AcademicUI";
import { FULL_LEXICON, naiveBayesTrace, ClassificationStep } from "@/lib/probability-utils";

const getRiskProfile = (prob: number) => {
  if (prob > 0.85) return { label: "HIGH RISK", sub: "Spam", color: "#9B2F00", bg: "bg-red-50", ring: "ring-[#9B2F00]/20", text: "text-primary" };
  if (prob > 0.60) return { label: "SUSPICIOUS", sub: "Likely Spam", color: "#C2410C", bg: "bg-orange-50", ring: "ring-[#C2410C]/20", text: "text-[#C2410C]" };
  if (prob > 0.40) return { label: "UNCERTAIN", sub: "Borderline", color: "#755B00", bg: "bg-yellow-50", ring: "ring-[#755B00]/20", text: "text-secondary" };
  if (prob > 0.20) return { label: "LOW RISK", sub: "Likely Ham", color: "#059669", bg: "bg-emerald-50", ring: "ring-[#059669]/20", text: "text-emerald-700" };
  return { label: "SAFE", sub: "Ham", color: "#059669", bg: "bg-green-50", ring: "ring-[#059669]/20", text: "text-emerald-600" };
};

export const AIEngine = () => {
  const [message, setMessage] = useState("Urgent! Click here to win a free prize, congratulations winner!");
  
  const steps = useMemo<ClassificationStep[]>(() => naiveBayesTrace(message, FULL_LEXICON), [message]);
  const finalProb = steps.length > 0 ? steps[steps.length - 1].posterior : 0.5;
  const risk = getRiskProfile(finalProb);
  const knownSteps = steps.filter(s => s.known);
  
  const segments = message.split(/(\s+)/);

  const theoryItems = [
    { l: "Bayes' Theorem", v: "Updating belief with new evidence. $P(S|W) \\propto P(S)P(W|S)$" },
    { l: "Independence", v: "The 'Naive' part assumes words don't interact. 'Free' and 'Money' are multiplied as if separate events." },
    { l: "Log-Space Math", v: "Multiplying small probabilities quickly causes underflow (0.0000000001). We add their logarithms instead!" },
    { l: "Evidence Balance", v: "A word pushes towards Spam if $P(W|S) > P(W|H)$. The Log-Likelihood Ratio (LLR) quantifies this \"pull\"." },
  ];

  return (
    <SectionSection
      id="speaker5"
      speaker="5"
      label="Artificial Intelligence & NLP"
      title="Bayesian X-Ray Scanner"
      formula={`\\log P(S|w) \\propto \\log P(S) + \\sum \\log P(w_i|S)`}
    >
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_350px] gap-12 mb-16">
        <div className="space-y-8">

          {/* Dynamic Input & Token Visualizer */}
          <GlassCard className="p-8 relative bg-white/40 overflow-hidden shadow-academic-md">
             {/* Background decorative grid */}
             <div className="absolute inset-0 bg-[linear-gradient(rgba(155,47,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(155,47,0,0.03)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none" />
             
             <div className="relative z-10">
                <div className="flex items-center justify-between mb-6 border-b border-academic-border pb-4">
                  <h3 className="text-sm font-bold uppercase tracking-widest text-academic-muted flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full animate-pulse bg-primary"></span>
                    Live Document Interface
                  </h3>
                  <span className="text-[10px] font-mono tracking-wider opacity-50 block">STATUS: {knownSteps.length} FEATURES DETECTED</span>
                </div>

                <textarea
                  className="w-full h-24 p-5 bg-white/80 border border-academic-border rounded-xl focus:ring-2 focus:ring-primary/40 focus:border-transparent outline-none font-sans text-lg leading-relaxed shadow-inner transition-all resize-none z-20 relative"
                  placeholder="Type any message to classify..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  spellCheck={false}
                />
                
                <div className="mt-8 border-t border-academic-border/50 pt-8 relative">
                    <h4 className="absolute -top-3 left-4 bg-white/80 px-2 text-[10px] font-bold uppercase tracking-widest text-academic-text flex items-center gap-2 shadow-sm rounded border border-academic-border">
                        <span className="w-1.5 h-1.5 bg-secondary rounded-full"></span> X-Ray Token View
                    </h4>
                    
                    <div className="w-full min-h-[100px] p-6 bg-current/[0.015] border border-academic-border/70 rounded-xl font-serif text-2xl leading-[2.5] break-words whitespace-pre-wrap text-academic-text/80 shadow-inner">
                        {segments.map((seg, i) => {
                            if (/^\s+$/.test(seg)) {
                                return <span key={i}>{seg}</span>;
                            }
                            const clean = seg.toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()"']/g, "");
                            const evidence = FULL_LEXICON[clean];
                            
                            if (evidence && clean.length > 1) {
                                const pS = evidence.pSpam;
                                const pH = evidence.pHam;
                                const llr = Math.log(pS/pH);
                                const isSpam = llr > 0;
                                
                                return (
                                  <span key={i} className="relative group inline-block whitespace-nowrap cursor-help">
                                      <span className={`px-1 rounded transition-all duration-300 font-bold border-b-2
                                         ${isSpam ? "bg-primary/10 text-primary border-primary/30" : "bg-emerald-500/10 text-emerald-700 border-emerald-500/30"}`}>
                                         {seg}
                                      </span>
                                      
                                      {/* Lexicon Inspector Tooltip */}
                                      <span className="absolute opacity-0 group-hover:opacity-100 transition-opacity duration-200 bottom-full left-1/2 -translate-x-1/2 mb-2 w-52 bg-white/95 backdrop-blur shadow-academic-lg border border-academic-border rounded-lg p-4 z-50 text-left pointer-events-none">
                                          <div className="text-[10px] uppercase font-bold text-academic-muted mb-2 tracking-widest border-b border-academic-border pb-2 flex justify-between">
                                              Neuron Trigger 
                                              <span className={isSpam ? "text-primary" : "text-emerald-600"}>{isSpam ? "SPAM" : "HAM"}</span>
                                          </div>
                                          <div className="font-mono text-xs space-y-1 mt-2 text-academic-text">
                                              <div className="flex justify-between">
                                                  <span>P(w|S)</span> 
                                                  <span className="font-bold text-primary">{(pS * 100).toFixed(1)}%</span>
                                              </div>
                                              <div className="flex justify-between">
                                                  <span>P(w|H)</span> 
                                                  <span className="font-bold text-emerald-600">{(pH * 100).toFixed(1)}%</span>
                                              </div>
                                              <div className="pt-2 mt-2 border-t border-academic-border/60 flex justify-between">
                                                  <span>Weight (LLR)</span> 
                                                  <span className="font-bold font-sans">{llr > 0 ? "+" : ""}{llr.toFixed(2)}</span>
                                              </div>
                                          </div>
                                          <div className="absolute top-full left-1/2 -translate-x-1/2 border-solid border-4 border-transparent border-t-white/95"></div>
                                      </span>
                                  </span>
                                )
                            }
                            return <span key={i} className="text-academic-text/90">{seg}</span>;
                        })}
                        {message.length === 0 && <span className="opacity-30 italic font-sans text-lg">Begin typing sample text...</span>}
                    </div>
                </div>

             </div>
          </GlassCard>

          {/* Mathematical Tug-of-War (Log Space) */}
          <GlassCard className="p-8 bg-white/40 shadow-academic-sm">
              <h4 className="text-xs font-bold uppercase tracking-widest text-academic-muted mb-8 text-center">Evidence Tug-Of-War (Log-Space Scale)</h4>
              
              <div className="relative h-16 flex items-center mb-4">
                  {/* The Scale Line */}
                  <div className="absolute w-full h-[2px] bg-academic-border inset-y-1/2" />
                  
                  {/* Center zero line */}
                  <div className="absolute h-10 w-[2px] bg-academic-text/30 left-1/2 -translate-y-1/2 -translate-x-1/2 z-10" />
                  
                  {/* The shifting balance pointer */}
                  <motion.div 
                     className="absolute w-8 h-8 border-4 border-white rounded-full z-20 shadow-md flex items-center justify-center -translate-x-1/2 scale-110"
                     style={{ backgroundColor: risk.color }}
                     animate={{ left: `${Math.max(0, Math.min(100, 50 + (knownSteps.reduce((acc,s)=>acc+s.logLikelihoodRatio, 0) * 5)))}%` }}
                     transition={{ type: "spring", stiffness: 120, damping: 20 }}
                  >
                     <div className="w-2 h-2 rounded-full bg-white" />
                  </motion.div>

                  {/* Individual Pull Vectors */}
                  {knownSteps.map((step, i) => {
                      const offset = step.logLikelihoodRatio > 0 ? 50 : 50 + (step.logLikelihoodRatio * 5);
                      const width = Math.abs(step.logLikelihoodRatio * 5);
                      return (
                         <div 
                           key={i}
                           className="absolute h-[5px] rounded-full z-0 opacity-50 mix-blend-multiply transition-all duration-500 origin-center"
                           style={{
                              left: `${Math.max(0, offset)}%`,
                              width: `${Math.min(50, width)}%`,
                              backgroundColor: step.logLikelihoodRatio > 0 ? "#9B2F00" : "#059669",
                              top: "50%",
                              transform: `translateY(-50%) translateY(${i % 2 === 0 ? '-10px' : '10px'})`
                           }}
                         />
                      );
                  })}
              </div>
              <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest text-academic-muted">
                  <span>← Safe Evidence (Ham)</span>
                  <span>Uncertain</span>
                  <span>Risk Evidence (Spam) →</span>
              </div>
          </GlassCard>

          {/* The Bayesian Math Unroller */}
          <GlassCard className="p-8 bg-white/40 overflow-hidden relative shadow-academic-sm">
              <h4 className="text-xs font-bold uppercase tracking-widest text-academic-muted mb-6">Formula Unroller (Multiplication Chain)</h4>
              
              <div className="overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-academic-border scrollbar-track-transparent">
                  <div className="min-w-max flex items-center gap-3 font-mono text-sm whitespace-nowrap p-2">
                      
                      {/* Prior */}
                      <div className="flex flex-col items-center bg-white border border-academic-border rounded-lg p-4 shadow-sm shrink-0">
                          <span className="text-[10px] text-academic-muted font-sans font-bold uppercase mb-1">Prior</span>
                          <span className="text-lg">0.50</span>
                      </div>
                      
                      {knownSteps.length > 0 && <span className="text-secondary/60 font-bold px-1 text-xl">×</span>}

                      {/* Evidence Loop */}
                      <AnimatePresence>
                          {knownSteps.map((step, i) => (
                              <motion.div 
                                key={`${step.word}-${i}`}
                                initial={{ opacity: 0, scale: 0.8, x: -20 }}
                                animate={{ opacity: 1, scale: 1, x: 0 }}
                                className="flex items-center gap-3 shrink-0"
                              >
                                  <div className={`flex flex-col items-center bg-white border-2 rounded-lg p-4 shadow-sm transition-colors duration-300
                                      ${step.logLikelihoodRatio > 0 ? "border-primary/20 bg-primary/[0.02]" : "border-emerald-500/20 bg-emerald-500/[0.02]"}`}>
                                      <span className="text-[10px] text-academic-muted font-sans font-bold uppercase mb-1">P("{step.word}"|S)</span>
                                      <span className={`text-lg ${step.logLikelihoodRatio > 0 ? "text-primary font-bold" : "text-emerald-700"}`}>
                                          {(step.evidence!.pSpam).toFixed(2)}
                                      </span>
                                  </div>
                                  {i < knownSteps.length - 1 && <span className="text-secondary/60 font-bold px-1 text-xl">×</span>}
                              </motion.div>
                          ))}
                      </AnimatePresence>
                      
                      {knownSteps.length === 0 && <span className="text-academic-muted italic font-sans text-sm ml-2">Awaiting known tokens...</span>}
                      
                      {/* Normalization & Final Result */}
                      {knownSteps.length > 0 && (
                          <motion.div 
                              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                              className="flex items-center gap-3 shrink-0 ml-4"
                          >
                             <span className="text-secondary opacity-60 font-bold px-2 text-3xl font-serif">=</span>
                             <div className="flex flex-col items-center justify-center bg-white p-5 border border-academic-border rounded-xl shadow-md">
                                <span className="text-[10px] text-academic-muted font-sans font-bold uppercase mb-1">Normalization</span>
                                <span className={`text-3xl font-bold font-serif ${risk.text}`}>{(finalProb * 100).toFixed(1)}%</span>
                             </div>
                          </motion.div>
                      )}
                  </div>
              </div>
          </GlassCard>

          {/* Final Decision Panel */}
          <GlassCard className={`p-8 bg-white/85 ring-2 ${risk.ring} transition-all duration-700 shadow-academic-lg`}>
            <div className="flex items-center justify-between">
              <div className="space-y-3">
                <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-academic-muted">Machine Verdict</p>
                <h3 className={`text-5xl font-serif tracking-tight ${risk.text}`}>{risk.label}</h3>
                <p className="text-sm font-bold text-academic-muted uppercase tracking-widest">{risk.sub}</p>
              </div>
              
              <div className="relative w-36 h-36">
                <svg className="w-full h-full -rotate-90 filter drop-shadow-sm" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="42" fill="transparent" stroke="#E5E7EB" strokeWidth="8" />
                  <motion.circle
                    cx="50" cy="50" r="42"
                    fill="transparent"
                    stroke={risk.color}
                    strokeWidth="8"
                    strokeDasharray={264}
                    initial={{ strokeDashoffset: 264 }}
                    animate={{ strokeDashoffset: 264 * (1 - finalProb) }}
                    transition={{ duration: 1.2, type: "spring", bounce: 0.2 }}
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <motion.span
                    key={finalProb}
                    animate={{ scale: [1.1, 1] }}
                    transition={{ duration: 0.3 }}
                    className={`text-3xl font-serif font-bold ${risk.text}`}
                  >
                    {(finalProb * 100).toFixed(0)}%
                  </motion.span>
                </div>
              </div>
            </div>
          </GlassCard>

          <InsightBox
            text="From Coins to AI: every flip, every roll, every draw was training us for this — the machine mathematically balances probabilities in Log-Space to uncover patterns hidden in plain sight."
          />
        </div>

        {/* Sidebar Theory Component */}
        <TheoryBoard title="The Math" items={theoryItems} />
      </div>
    </SectionSection>
  );
};
