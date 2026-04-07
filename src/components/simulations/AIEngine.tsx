"use client";

import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { GlassCard, SectionSection, InsightBox, TheoryBoard, MathText } from "../ui/AcademicUI";
import { calculateAIDecision } from "@/lib/probability-utils";

export const AIEngine = () => {
  // --- Stage 1: Addition Law (Sensor Fusion) ---
  const [sensorA, setSensorA] = useState(0.75);
  const [sensorB, setSensorB] = useState(0.65);
  const [overlap, setOverlap] = useState(30);

  // --- Stage 2: Multiplication Law (Process Chain) ---
  const [processStep1, setProcessStep1] = useState(0.85);
  const [processStep2, setProcessStep2] = useState(0.90);

  // --- Stage 3: Bayes' Law (Inference) ---
  const [prior, setPrior] = useState(0.50);
  const [truePositive, setTruePositive] = useState(0.95);
  const [falsePositive, setFalsePositive] = useState(0.15);

  const results = useMemo(() => {
    return calculateAIDecision(
      sensorA, sensorB, overlap,
      processStep1, processStep2,
      prior, truePositive, falsePositive
    );
  }, [sensorA, sensorB, overlap, processStep1, processStep2, prior, truePositive, falsePositive]);

  const theoryItems = [
    { l: "Law 1: Addition", v: "Combining independent features: $P(A \\cup B) = P(A) + P(B) - P(A \\cap B)$. This models feature fusion in deep learning." },
    { l: "Law 2: Multiplication", v: "The probability of a process chain: $P(E_1 \\cap E_2) = P(E_1)P(E_2|E_1)$. Essential for sequential decision trees." },
    { l: "Law 3: Bayes' Law", v: "Updating belief with evidence: $P(H|E) = \\frac{P(E|H)P(H)}{P(E)}$. The core of all modern machine learning optimization." },
    { l: "The AI Matrix", v: "Intelligence is the recursive application of these three laws to reduce uncertainty in noise." }
  ];

  return (
    <SectionSection
      id="speaker5"
      speaker="5"
      label="Artificial Intelligence"
      title="Probability Logic Matrix"
      formula={`\\text{Decision} = P(H|E) \\cdot (P(A \\cup B) \\cap P(S_1 \\cap S_2))`}
    >
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_350px] gap-12 mb-16">
        <div className="space-y-12">
          
          {/* Layer 1: Sensor Fusion (Addition) */}
          <GlassCard className="p-8 border-l-4 border-primary">
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="flex-1 space-y-6">
                <h3 className="text-sm font-bold uppercase tracking-widest text-primary flex items-center gap-2">
                   <span className="w-2 h-2 rounded-full bg-primary" />
                   Layer I: Feature Aggregation (Addition)
                </h3>
                <p className="text-academic-muted text-sm italic font-serif">"Combining disparate data sources into a single unified awareness."</p>
                
                <div className="space-y-4">
                  <div className="flex justify-between text-xs font-bold font-mono"><span>Sensor A Weight</span><span>{sensorA.toFixed(2)}</span></div>
                  <input type="range" min="0" max="1" step="0.01" value={sensorA} onChange={(e) => setSensorA(parseFloat(e.target.value))} className="w-full h-1.5 accent-primary" />
                  
                  <div className="flex justify-between text-xs font-bold font-mono"><span>Sensor B Weight</span><span>{sensorB.toFixed(2)}</span></div>
                  <input type="range" min="0" max="1" step="0.01" value={sensorB} onChange={(e) => setSensorB(parseFloat(e.target.value))} className="w-full h-1.5 accent-primary" />
                </div>
              </div>

              <div className="w-48 h-48 bg-primary/5 rounded-full border border-primary/20 flex flex-col items-center justify-center relative overflow-hidden shadow-inner">
                 <motion.div 
                    animate={{ scale: [1, 1.05, 1] }} 
                    transition={{ repeat: Infinity, duration: 3 }}
                    className="text-4xl font-serif font-bold text-primary"
                 >
                    {(results.pFusion * 100).toFixed(0)}%
                 </motion.div>
                 <span className="text-[10px] font-bold uppercase tracking-widest text-primary/60 mt-2">Combined Reach</span>
                 <div className="absolute bottom-0 w-full h-1 bg-primary/20" />
                 <motion.div 
                    className="absolute bottom-0 w-full bg-primary/40"
                    animate={{ height: `${results.pFusion * 100}%` }}
                 />
              </div>
            </div>
          </GlassCard>

          {/* Layer 2: Process Integrity (Multiplication) */}
          <GlassCard className="p-8 border-l-4 border-secondary">
             <div className="flex flex-col md:flex-row gap-8 items-center">
               <div className="flex-1 space-y-6">
                 <h3 className="text-sm font-bold uppercase tracking-widest text-secondary flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-secondary" />
                    Layer II: Logic Chain Integrity (Multiplication)
                 </h3>
                 <p className="text-academic-muted text-sm italic font-serif">"The probability that a sequence of logical steps remains valid."</p>
                 
                 <div className="space-y-4">
                   <div className="flex justify-between text-xs font-bold font-mono"><span>Step 1 Reliability</span><span>{processStep1.toFixed(2)}</span></div>
                   <input type="range" min="0" max="1" step="0.01" value={processStep1} onChange={(e) => setProcessStep1(parseFloat(e.target.value))} className="w-full h-1.5 accent-secondary" />
                   
                   <div className="flex justify-between text-xs font-bold font-mono"><span>Step 2 Reliability</span><span>{processStep2.toFixed(2)}</span></div>
                   <input type="range" min="0" max="1" step="0.01" value={processStep2} onChange={(e) => setProcessStep2(parseFloat(e.target.value))} className="w-full h-1.5 accent-secondary" />
                 </div>
               </div>

               <div className="w-48 h-48 bg-secondary/5 rounded-full border border-secondary/20 flex flex-col items-center justify-center relative overflow-hidden shadow-inner">
                  <motion.div 
                     animate={{ rotate: 360 }}
                     transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
                     className="absolute inset-0 border border-dashed border-secondary/20 rounded-full"
                  />
                  <div className="text-4xl font-serif font-bold text-secondary">
                     {(results.pChain * 100).toFixed(0)}%
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-secondary/60 mt-2">Chain Stability</span>
               </div>
             </div>
          </GlassCard>

          {/* Layer 3: Inference Engine (Bayes) */}
          <GlassCard className="p-8 border-l-4 border-secondary-gold bg-[#FCFBF8]/40">
             <div className="flex flex-col md:flex-row gap-8 items-center">
               <div className="flex-1 space-y-6">
                 <h3 className="text-sm font-bold uppercase tracking-widest text-secondary-gold flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-secondary-gold" />
                    Layer III: Inference Engine (Bayes' updating)
                 </h3>
                 <p className="text-academic-muted text-sm italic font-serif">"Updating belief in a hypothesis given the incoming evidence."</p>
                 
                 <div className="space-y-4">
                   <div className="flex justify-between text-xs font-bold font-mono"><span>Prior Probability P(H)</span><span>{prior.toFixed(2)}</span></div>
                   <input type="range" min="0" max="1" step="0.01" value={prior} onChange={(e) => setPrior(parseFloat(e.target.value))} className="w-full h-1.5 accent-secondary-gold" />
                   
                   <div className="flex justify-between text-xs font-bold font-mono"><span>True Positive Rate</span><span>{truePositive.toFixed(2)}</span></div>
                   <input type="range" min="0" max="1" step="0.01" value={truePositive} onChange={(e) => setTruePositive(parseFloat(e.target.value))} className="w-full h-1.5 accent-secondary-gold" />
                 </div>
               </div>

               <div className="w-48 h-48 bg-white rounded-full border-4 border-secondary-gold/20 flex flex-col items-center justify-center relative overflow-hidden shadow-academic-lg">
                  <div className={`text-5xl font-serif font-bold text-secondary-gold`}>
                     {(results.pFinal * 100).toFixed(0)}%
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-academic-muted mt-2">Final Posterior</span>
                  <div className="absolute inset-0 bg-secondary-gold/5 pointer-events-none" />
               </div>
             </div>
          </GlassCard>

          {/* AI Probability Example Card */}
          <GlassCard className="p-8 bg-white/60 border border-academic-border">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-2xl">🧠</span>
              <h3 className="text-sm font-bold uppercase tracking-widest text-academic-text">
                Everything Starts With Probabilities
              </h3>
            </div>
            <p className="text-academic-muted text-sm leading-relaxed mb-6 font-serif">
              At the core, AI models estimate: <span className="italic">"Given this input, what is the probability of each possible output?"</span>
            </p>

            <div className="bg-[#1C1B17] rounded-xl p-6 font-mono text-sm">
              <p className="text-white/40 text-xs uppercase tracking-widest mb-3">Example · Text Prediction AI</p>
              <div className="space-y-2 mb-5">
                <p className="text-white/60 text-xs">Input:</p>
                <p className="text-secondary-gold font-bold text-base">"The sky is ___"</p>
              </div>
              <p className="text-white/40 text-xs uppercase tracking-widest mb-3">Model Calculates:</p>
              <div className="space-y-3">
                {[
                  { word: "blue",  prob: 0.85, top: true },
                  { word: "green", prob: 0.05, top: false },
                  { word: "red",   prob: 0.02, top: false },
                ].map(({ word, prob, top }) => (
                  <div key={word} className="flex items-center gap-3">
                    <span className={`w-14 text-right text-xs font-bold ${top ? "text-secondary-gold" : "text-white/50"}`}>
                      P({word})
                    </span>
                    <span className="text-white/30 text-xs">=</span>
                    <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-700 ${top ? "bg-secondary-gold" : "bg-white/20"}`}
                        style={{ width: `${prob * 100}%` }}
                      />
                    </div>
                    <span className={`text-xs font-bold w-10 ${top ? "text-secondary-gold" : "text-white/40"}`}>
                      {(prob * 100).toFixed(0)}%
                    </span>
                    {top && <span className="text-[10px] text-secondary-gold font-bold uppercase tracking-widest">← Picks This</span>}
                  </div>
                ))}
              </div>
              <p className="text-white/30 text-xs mt-5 pt-4 border-t border-white/10">
                👉 It picks "blue" because it has the highest probability — <span className="text-secondary-gold">argmax P(output | input)</span>
              </p>
            </div>
          </GlassCard>

          <InsightBox
            className="mt-4"
            text="In the machine's mind, reality is not a binary switch, but a multi-layered matrix of these three laws. Intelligence is merely the ability to multiply chains, add sources, and update beliefs faster than the noise can distort them."
          />
        </div>

        {/* Sidebar Theory */}
        <div className="space-y-8 self-start">
           <TheoryBoard title="Logic Matrix" items={theoryItems} />
           
           <GlassCard className="p-6 bg-white/80">
              <h4 className="text-[10px] font-bold uppercase tracking-widest text-academic-muted mb-4">The Universal Decision P</h4>
              <div className="text-2xl font-serif font-bold text-academic-text">
                 {((results.pFusion * results.pChain * results.pFinal) * 100).toFixed(2)}%
              </div>
              <p className="text-[10px] text-academic-muted mt-2 italic">Composite Intelligence Score</p>
           </GlassCard>
        </div>
      </div>
    </SectionSection>
  );
};
