"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MathPill } from "./ui/AcademicUI";

const FORMULAS = [
  "P(A \\cup B) = P(A) + P(B) - P(A \\cap B)",
  "|S| = 2^n",
  "P(X=x) = \\binom{n}{x} p^x (1-p)^{n-x}",
  "P(A|B) = \\frac{P(B|A)P(A)}{P(B)}",
  "P(A_{i} | B) = \\frac{P(B | A_{i}) P(A_{i})}{\\sum P(B | A_{j}) P(A_{j})}"
];

export const Hero = () => {
    const [formulaIndex, setFormulaIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setFormulaIndex((prev) => (prev + 1) % FORMULAS.length);
        }, 4000);
        return () => clearInterval(interval);
    }, []);

    const scrollTo = (id: string) => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <header id="hero" className="min-h-screen pt-[70px] flex items-center justify-center text-center relative overflow-hidden">
            {/* Background Texture Overlay */}
            <div className="absolute inset-0 bg-paper-grad -z-10" />
            
            <div className="max-w-[1200px] mx-auto px-8 flex flex-col items-center gap-8 relative z-10">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, ease: "easeOut" }}
                >
                    <span className="text-secondary font-bold uppercase tracking-[0.3em] text-xs mb-4 block">Calculated Truth at Scale</span>
                    <h1 className="text-6xl md:text-8xl font-bold leading-[1.05] tracking-tight text-academic-text">
                        Probability <br />
                        <span className="text-primary">From Coins to AI</span>
                    </h1>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5, duration: 1 }}
                  className="h-20 flex items-center justify-center w-full"
                >
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={formulaIndex}
                            initial={{ opacity: 0, y: 10, filter: "blur(4px)" }}
                            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                            exit={{ opacity: 0, y: -10, filter: "blur(4px)" }}
                            transition={{ duration: 0.8 }}
                        >
                            <MathPill formula={FORMULAS[formulaIndex]} className="shadow-academic-md" />
                        </motion.div>
                    </AnimatePresence>
                </motion.div>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8, duration: 1 }}
                  className="max-w-2xl text-xl text-academic-muted font-serif italic leading-relaxed"
                >
                    Explore the mathematical fabric of the universe through 5 interactive simulations. 
                    From simple binary foundations to the future of neural classification.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.2, duration: 0.6 }}
                  className="flex flex-col md:flex-row gap-6 mt-8"
                >
                    <button onClick={() => scrollTo("speaker1")} className="btn-primary">Explore Simulations</button>
                    <button onClick={() => scrollTo("speaker5")} className="px-10 py-4 border-2 border-secondary text-secondary rounded-xl font-bold hover:bg-secondary hover:text-white transition-all duration-300">
                        View AI Engine
                    </button>
                </motion.div>

                <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-24">
                   {[
                      { l: "F", label: "Fundamental", id: "speaker1" },
                      { l: "C", label: "Coins", id: "speaker2" },
                      { l: "D", label: "Dice", id: "speaker3" },
                      { l: "K", label: "Cards", id: "speaker4" },
                      { l: "A", label: "AI", id: "speaker5" },
                   ].map((item, i) => (
                       <motion.div
                          key={i}
                          whileHover={{ y: -8 }}
                          onClick={() => scrollTo(item.id)}
                          className="glass-card p-6 cursor-pointer border-b-2 border-transparent hover:border-secondary transition-all"
                       >
                          <div className="text-secondary font-bold font-serif mb-2">{item.l}</div>
                          <div className="text-xs font-bold uppercase tracking-widest opacity-60">{item.label}</div>
                       </motion.div>
                   ))}
                </div>
            </div>

            {/* Aesthetic Decor */}
            <div className="absolute top-[20%] left-[-10%] w-[40%] h-[40%] rounded-full bg-secondary-gold/5 blur-[120px] -z-10" />
            <div className="absolute bottom-[10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-primary/5 blur-[120px] -z-10" />
        </header>
    );
};
