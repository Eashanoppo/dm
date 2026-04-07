"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GlassCard, SectionSection, InsightBox, TheoryBoard, CoinFace3D } from "../ui/AcademicUI";
import { calculateBernoulli } from "@/lib/probability-utils";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
} from "chart.js";
import { Bar } from "react-chartjs-2";

if (typeof window !== "undefined") {
  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip
  );
}

export const CoinEngine = () => {
  const [numCoins, setNumCoins] = useState(3);
  const [coins, setCoins] = useState<number[]>([]);
  const [isFlipping, setIsFlipping] = useState(false);

  useEffect(() => {
    setCoins(new Array(numCoins).fill(0));
  }, [numCoins]);

  const flipAll = () => {
    setIsFlipping(true);
    setTimeout(() => {
      const newCoins = new Array(numCoins).fill(0).map(() => (Math.random() > 0.5 ? 1 : 0));
      setCoins(newCoins);
      setIsFlipping(false);
    }, 800);
  };

  const getBinaryState = () => coins.map(c => c === 1 ? "H" : "T").join("");
  const headsCount = coins.reduce((acc, c) => acc + c, 0);

  // Generate all possible outcomes for the sample space table
  const totalOutcomes = Math.pow(2, numCoins);
  const generateSpace = () => {
    const space = [];
    for (let i = 0; i < totalOutcomes; i++) {
        // Pad with leading zeros
        const binary = i.toString(2).padStart(numCoins, '0');
        const result = binary.split('').map(b => b === '1' ? 'H' : 'T').join("");
        space.push({ binary: result, value: i });
    }
    return space;
  };

  const sampleSpace = generateSpace();
  // Ensure the bit order here (MSB is index 0) matches generateSpace's padStart behavior
  const currentOutcomeIdx = coins.length > 0 ? parseInt(coins.map(c => c === 1 ? '1' : '0').join(""), 2) : 0;

  // Chart data
  const pmfLabels = Array.from({ length: numCoins + 1 }, (_, i) => i);
  const pmfData = pmfLabels.map(k => calculateBernoulli(numCoins, 0.5, k));
  
  const chartData = {
    labels: pmfLabels.map(k => `k=${k}`),
    datasets: [
      {
        label: "P(X=k)",
        data: pmfData,
        backgroundColor: pmfLabels.map(k => k === headsCount ? "rgba(155, 47, 0, 0.8)" : "rgba(224, 184, 74, 0.4)"), // high frequency color for current
        borderColor: "rgba(255, 255, 255, 0.2)",
        borderWidth: 1,
        borderRadius: 4,
      }
    ]
  };

  const theoryItems = [
    { l: "Sample Space", v: `For $n$ coins, $|S| = 2^n$ outcomes. Currently $|S| = 2^{${numCoins}} = ${totalOutcomes}$.` },
    { l: "Tree Diagrams", v: "Each branch point doubles the number of distinct possible futures." },
    { l: "Independence", v: "Each coin flip is independent — past results don't affect future ones." },
    { l: "Bernoulli PMF", v: `$P(X=k) = \\binom{n}{k} p^k (1-p)^{n-k}$` }
  ];

  return (
    <SectionSection
      id="speaker2"
      speaker="2"
      label="Binary Foundations"
      title="The Multi-Coin Engine"
      formula={`|S| = 2^n`}
    >
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_350px] gap-12 mb-16">
        
        {/* Visual Engine */}
        <div className="space-y-8">
          <GlassCard className="p-8 md:p-12 min-h-[450px] flex flex-col items-center justify-center relative overflow-hidden bg-white/40">
            
            {/* Top UI Controls */}
            <div className="absolute top-8 left-8 right-8 flex justify-between items-center z-10">
               <div className="flex items-center gap-4 bg-white/60 px-4 py-2 rounded-full border border-academic-border shadow-sm">
                  <span className="text-secondary font-bold text-sm tracking-widest uppercase">Coins (n)</span>
                  <input 
                    type="range" min="1" max="6" step="1" 
                    value={numCoins} 
                    onChange={(e) => setNumCoins(parseInt(e.target.value))}
                    className="w-24 accent-secondary"
                  />
                  <span className="text-academic-text font-serif font-bold w-6 text-center">{numCoins}</span>
               </div>
               <div className="text-right">
                  <p className="text-sm uppercase tracking-widest text-academic-muted font-bold">Sample Space</p>
                  <p className="text-2xl font-serif font-bold text-academic-text">{totalOutcomes}</p>
               </div>
            </div>

            {/* 3D Coins Area with Perspective Wrapper */}
            <div className="flex flex-wrap items-center justify-center gap-8 mb-12 mt-20 perspective-1000">
               {coins.map((coin, i) => (
                  <motion.div
                    key={i}
                    className="rounded-full"
                    animate={isFlipping ? {
                      y: [0, -100, 0],
                      rotateX: [0, 720],
                      scale: [1, 1.2, 1]
                    } : { y: 0, rotateX: 0, scale: 1 }}
                    transition={{ duration: 0.6, ease: "easeOut", delay: i * 0.05 }}
                  >
                    <CoinFace3D 
                       face={coin === 1 ? "H" : "T"} 
                       size={numCoins > 4 ? "sm" : "md"} 
                       className="shadow-2xl" 
                    />
                  </motion.div>
               ))}
            </div>

            <div className="flex flex-col items-center gap-8 z-10">
              <button 
                onClick={flipAll}
                disabled={isFlipping}
                className="btn-primary px-12 py-4 text-lg"
              >
                {isFlipping ? "Computing Universe..." : "Flip Coins"}
              </button>
              
              <div className="text-center">
                <span className="text-xs uppercase tracking-[0.2em] font-bold text-academic-muted block mb-2">Current Sequence</span>
                <span className="text-4xl font-mono font-bold tracking-widest text-primary drop-shadow-sm">
                  {getBinaryState()}
                </span>
              </div>
            </div>

            {/* Abstract Background Elements */}
            <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-secondary-gold/10 rounded-full blur-3xl opacity-50" />
            <div className="absolute -top-10 -right-10 w-48 h-48 bg-primary/5 rounded-full blur-2xl opacity-50" />
          </GlassCard>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
             
             {/* Sample Space Table */}
             <GlassCard className="p-6 h-[320px] flex flex-col">
                <h4 className="text-sm uppercase tracking-widest text-secondary font-bold mb-4 border-b border-academic-border pb-2">Sample Space Tree</h4>
                <div className="flex-1 overflow-y-auto pr-2 space-y-1 custom-scrollbar scroll-smooth">
                   {sampleSpace.map((res, i) => (
                      <div 
                         key={i} 
                         className={`flex justify-between items-center px-4 py-2 rounded font-mono text-sm transition-all duration-300 ${
                            i === currentOutcomeIdx && !isFlipping
                            ? "bg-primary text-white font-bold translate-x-2 shadow-lg" 
                            : "text-academic-muted hover:bg-white/50"
                         }`}
                      >
                         <span className={i === currentOutcomeIdx && !isFlipping ? "text-white/80" : "text-[10px]"}>OUTCOME {i + 1}</span>
                         <span>{res.binary}</span>
                      </div>
                   ))}
                </div>
             </GlassCard>

             {/* Bernoulli Distribution Chart */}
             <GlassCard className="p-6 h-[320px] flex flex-col">
                <h4 className="text-sm uppercase tracking-widest text-primary font-bold mb-4 border-b border-academic-border pb-2">Probability Mass Function</h4>
                <div className="flex-1 relative">
                   <Bar 
                     data={chartData} 
                     options={{ 
                        responsive: true, 
                        maintainAspectRatio: false,
                        animation: { duration: 800 },
                        scales: {
                           y: { beginAtZero: true, max: 1, ticks: { maxTicksLimit: 5 }, grid: { color: "rgba(0,0,0,0.05)" } },
                           x: { grid: { display: false } }
                        },
                        plugins: { legend: { display: false } }
                     }} 
                   />
                </div>
                <div className="mt-4 pt-2 border-t border-academic-border text-center text-xs text-academic-muted uppercase tracking-widest font-bold">
                   Success Count (Heads) = <span className="text-primary">{headsCount}</span>
                </div>
             </GlassCard>
             
          </div>

        </div>

        {/* Sidebar Theory Component */}
        <TheoryBoard 
           title="Binary Theory" 
           items={theoryItems} 
        />
      </div>

      <InsightBox 
        className="mt-16 max-w-3xl mx-auto"
        text="From Coins to AI: A coin has no memory of its past, but the math does. At scale, the binary chaos of a single flip converges into the steady prediction of a neural network." 
      />
    </SectionSection>
  );
};
