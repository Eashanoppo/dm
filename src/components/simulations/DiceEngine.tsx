"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GlassCard, SectionSection, TheoryBoard, DiceFace, InsightBox } from "../ui/AcademicUI";
import { getDiceDistribution } from "@/lib/probability-utils";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

if (typeof window !== "undefined") {
  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );
}

export const DiceEngine = () => {
  const [rolls, setRolls] = useState<[number, number]>([1, 1]);
  const [isRolling, setIsRolling] = useState(false);
  const [history, setHistory] = useState<number[]>([]);

  const distribution = getDiceDistribution(6, 2);
  const sums = Object.keys(distribution).map(Number);
  const probabilities = Object.values(distribution);

  const rollDice = () => {
    setIsRolling(true);
    setTimeout(() => {
      const d1 = Math.floor(Math.random() * 6) + 1;
      const d2 = Math.floor(Math.random() * 6) + 1;
      setRolls([d1, d2]);
      setHistory(prev => [...prev, d1 + d2].slice(-100)); // Keep last 100
      setIsRolling(false);
    }, 800);
  };

  const chartData = {
    labels: sums.map(String),
    datasets: [
      {
        label: "Theoretical Probability",
        data: probabilities,
        backgroundColor: "rgba(155, 47, 0, 0.6)",
        borderColor: "rgba(155, 47, 0, 1)",
        borderWidth: 1,
        borderRadius: 4,
      },
      {
        label: "Experimental (History)",
        data: sums.map(s => {
          if (history.length === 0) return 0;
          return history.filter(h => h === s).length / history.length;
        }),
        backgroundColor: "rgba(117, 91, 0, 0.4)",
        borderColor: "rgba(117, 91, 0, 1)",
        borderWidth: 1,
        borderRadius: 4,
      }
    ],
  };

  const theoryItems = [
    { l: "Sample Space", v: "$6 \\times 6 = 36$ total outcomes. Each pair is a unique point in space." },
    { l: "The '7' Peak", v: "Why is 7 so common? It has the most combinations: (1,6), (2,5), (3,4)..." },
    { l: "Large Numbers", v: "With enough rolls, randomness becomes a stable mathematical structure." }
  ];

  return (
    <SectionSection
      id="speaker3"
      speaker="3"
      label="Patterns & Distribution"
      title="Dice Analytics Engine"
      formula={`P(Sum = k) = \\frac{\\text{Frequency of } k}{36}`}
    >
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_350px] gap-12 mb-16">
        
        {/* Main Simulation Area */}
        <div className="space-y-8">
            <GlassCard className="p-12 flex flex-col items-center justify-center bg-white/40 min-h-[450px] relative overflow-hidden">
                <div className="flex gap-16 mb-16 h-40 items-center justify-center">
                   {[0, 1].map((i) => (
                      <motion.div
                        key={i}
                        animate={
                            isRolling 
                            ? {
                                rotateX: [0, 360, 720],
                                rotateY: [0, 360, 720],
                                rotateZ: [0, 180, 360],
                                y: [0, -80, 0, -30, 0],
                                scale: [1, 1.2, 1, 1.1, 1]
                            }
                            : {
                                rotateX: 0,
                                rotateY: 0,
                                rotateZ: 0,
                                y: 0,
                                scale: 1
                            }
                        }
                        transition={{ 
                           duration: isRolling ? 0.8 : 0, 
                           ease: isRolling ? "easeOut" : "linear"
                        }}
                      >
                         <DiceFace value={rolls[i]} size="lg" className="shadow-2xl" />
                      </motion.div>
                   ))}
                </div>

                <div className="flex flex-col items-center gap-6">
                  <button 
                    onClick={rollDice}
                    disabled={isRolling}
                    className="btn-primary"
                  >
                    {isRolling ? "Analyzing Probabilities..." : "Roll Physical Dice"}
                  </button>
                  <p className="text-secondary text-2xl font-serif font-bold tracking-tight">Outcome Sum: <span className="text-academic-text">{rolls[0] + rolls[1]}</span></p>
                </div>
            </GlassCard>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <GlassCard className="p-8">
                    <h3 className="text-xl font-bold mb-8 text-center text-academic-muted">Sum Distribution</h3>
                    <div className="h-[250px]">
                      <Bar data={chartData} options={{ responsive: true, maintainAspectRatio: false }} />
                    </div>
                </GlassCard>

                <GlassCard className="p-8 overflow-hidden">
                    <h3 className="text-sm uppercase tracking-widest font-bold text-secondary mb-6">Outcome Heatmap (Theory)</h3>
                    <div className="grid grid-cols-6 gap-1 w-full max-w-[240px] mx-auto">
                      {[1,2,3,4,5,6].map((d1) => 
                        [1,2,3,4,5,6].map((d2) => (
                            <div 
                               key={`${d1}-${d2}`}
                               className={`w-full aspect-square border border-academic-border/30 flex items-center justify-center text-[10px] font-bold transition-all duration-300 ${
                                  d1 + d2 === rolls[0] + rolls[1]
                                  ? "bg-primary text-white z-10 shadow-lg scale-110"
                                  : d1 + d2 === 7 
                                    ? "bg-secondary-gold/20 text-secondary" 
                                    : "bg-white/20 text-academic-muted"
                               }`}
                            >
                               {d1+d2}
                            </div>
                        ))
                      )}
                    </div>
                </GlassCard>
            </div>
        </div>

        {/* Sidebar Theory Component */}
        <TheoryBoard 
           title="Theory Board" 
           items={theoryItems} 
        />
      </div>

      <InsightBox 
        className="mt-16 max-w-3xl mx-auto"
        text="The universe is built on these patterns — what seems like luck is just math at scale." 
      />
    </SectionSection>
  );
};
