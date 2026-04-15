"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GlassCard, SectionSection, InsightBox, TheoryBoard } from "../ui/AcademicUI";

// ── Speaker 4 Speech ─────────────────────────────────────────────────────────
export const SPEAKER_4_SPEECH = {
  name: "Speaker 4",
  topic: "Chance, Fallacies & The Lottery",
  teaser: "The lottery is the most honest probability lesson ever designed — it shows us exactly how bad human intuition is at comprehending truly large numbers, and exactly how powerful the Gambler's Fallacy is at keeping us playing.",
  points: [
    "LOTTERY ODDS: The probability of winning a 6-from-45 jackpot is 1 in 8,145,060. That means if you bought one ticket every week from birth to age 80, your expected number of jackpots won is 0.0005 — essentially zero. Yet millions play weekly. This gap between perceived and actual probability is one of the most studied phenomena in behavioral economics.",
    "THE GAMBLER'S FALLACY: The belief that a series of losses makes a win 'due.' This is mathematically false for any independent random process. A lottery ball picked last week has no memory of last week. The probability of any number appearing resets to exactly 1/45 for every single draw. Independence is the key concept: past outcomes carry zero information about future outcomes.",
    "WHY WE PLAY ANYWAY: Expected Utility Theory shows that the rational reason to play is if the utility of the jackpot (life-changing wealth) exceeds the disutility of the ticket cost (near-zero). For most people, this utility calculation actually passes — even though the expected monetary value is negative. This is why lottery designers make jackpots as large and visible as possible.",
    "The Law of Large Numbers works both for you and against you: run enough trials and you will see occasional wins. But the casino and the lottery commission run far more trials than you ever will — and their advantage compounds relentlessly over time.",
  ],
  formula: "P(\\text{jackpot}) = \\frac{1}{\\binom{45}{6}} = \\frac{1}{8{,}145{,}060}",
};

/* ── LOTTERY DEMO ──────────────────────────────────────────────────────────── */
const POOL = Array.from({ length: 45 }, (_, i) => i + 1);

function LotteryTab() {
  const [picks, setPicks] = useState<number[]>([]);
  const [history, setHistory] = useState<{ draw: number[]; matches: number }[]>([]);
  const [fallacyLog, setFallacyLog] = useState<("W" | "L")[]>([]);
  const [running, setRunning] = useState(false);

  const toggle = (n: number) => {
    if (picks.includes(n)) setPicks(picks.filter((p) => p !== n));
    else if (picks.length < 6) setPicks([...picks, n]);
  };

  const runDraw = async () => {
    setRunning(true);
    setHistory([]);
    
    for (let i = 0; i < 8; i++) {
      await new Promise(r => setTimeout(r, 150));
      const d = [...POOL].sort(() => Math.random() - 0.5).slice(0, 6).sort((a, b) => a - b);
      const m = picks.filter((p) => d.includes(p)).length;
      setHistory(prev => [...prev, { draw: d, matches: m }]);
    }
    setRunning(false);
  };

  const runFallacy = async () => {
    setRunning(true);
    setFallacyLog([]);
    const results: ("W" | "L")[] = [];
    for (let i = 0; i < 10; i++) {
      await new Promise((r) => setTimeout(r, 200));
      results.push(Math.random() < 0.15 ? "W" : "L");
      setFallacyLog([...results]);
    }
    setRunning(false);
  };

  return (
    <div className="space-y-6">
      {/* Gambler's Fallacy */}
      <div className="pb-6 border-b border-academic-border">
        <p className="text-xs font-bold uppercase tracking-widest text-academic-muted mb-2">
          // Gambler's Fallacy Test
        </p>
        <p className="text-sm text-academic-muted mb-4">
          "I lost 8 times in a row — I'm <em>due</em> for a win!" The truth is…
        </p>
        <button className="btn-primary px-6 py-3 text-sm" disabled={running} onClick={runFallacy}>
          Run 10 Independent Tries (15% win chance each)
        </button>
        {fallacyLog.length > 0 && (
          <div className="flex gap-2 flex-wrap mt-4">
            {fallacyLog.map((r, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-8 h-8 flex items-center justify-center text-xs font-bold rounded-md border-2"
                style={{
                  background: r === "W" ? "#fff" : "#1d1c17",
                  borderColor: "#1d1c17",
                  color: r === "W" ? "#1d1c17" : "#f4f4f0",
                }}
              >
                {r}
              </motion.span>
            ))}
            {fallacyLog.length >= 10 && (
              <p className="w-full text-xs text-academic-muted mt-2">
                Each trial was independent. Past losses never influence future draws.
              </p>
            )}
          </div>
        )}
      </div>

      <div>
        <div className="flex items-center justify-between mb-3">
          <p className="text-xs font-bold uppercase tracking-widest text-secondary">// Pick 6 Numbers (1–45)</p>
          <span className="text-xs font-mono text-academic-muted">{picks.length}/6 selected</span>
        </div>
        <div className="grid grid-cols-9 gap-1 mb-3">
          {POOL.map((n) => {
            const isPick = picks.includes(n);
            const isMatch = history.length > 0 && history[0].draw.includes(n) && isPick;
            return (
              <button
                key={n}
                onClick={() => toggle(n)}
                className="aspect-square flex items-center justify-center text-[11px] font-bold rounded-md transition-all duration-200"
                style={{
                  background: isMatch ? "#755B00" : isPick ? "rgba(117,91,0,0.15)" : "rgba(0,0,0,0.04)",
                  border: `2px solid ${isMatch ? "#755B00" : isPick ? "rgba(117,91,0,0.5)" : "#e5e0da"}`,
                  color: isMatch ? "#fff" : isPick ? "#755B00" : "#5c4d40",
                  transform: isMatch ? "scale(1.1)" : "scale(1)",
                }}
              >
                {n}
              </button>
            );
          })}
        </div>
        <div className="flex gap-3">
          <button className="btn-primary" disabled={picks.length < 6 || running} onClick={runDraw}>
            {running ? "Drawing…" : `▶ Draw 8 Trials (${picks.length}/6)`}
          </button>
          <button
            className="px-6 py-3 rounded-xl border-2 border-academic-border text-sm font-bold text-academic-text hover:border-secondary transition-all disabled:opacity-50"
            disabled={running}
            onClick={() => { setPicks([]); setHistory([]); }}
          >
            Clear
          </button>
        </div>
      </div>

      <AnimatePresence>
        {(history.length > 0 || running) && (
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            <GlassCard className="p-6">
              <p className="text-[10px] uppercase tracking-widest font-bold text-academic-muted mb-4">
                // Batch Simulation Chart (8 Trials)
              </p>
              <div className="flex items-end gap-2 h-32 mb-2 px-2">
                {Array.from({ length: 8 }).map((_, i) => {
                  const h = history[i];
                  return (
                    <div key={i} className="flex-1 h-full flex items-end">
                      {h ? (
                        <motion.div
                          initial={{ height: 0 }}
                          animate={{ height: `${(h.matches / 6) * 100}%` }}
                          className="w-full rounded-t-sm relative group bg-secondary/80"
                        >
                          <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] font-mono font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                            {h.matches}
                          </div>
                        </motion.div>
                      ) : (
                        <div className="w-full h-1 bg-black/5 rounded-t-sm" />
                      )}
                    </div>
                  );
                })}
              </div>
              <div className="flex justify-between text-[9px] font-mono text-academic-muted border-t pt-2">
                <span>SIM #1</span>
                <span>SIM #4</span>
                <span>SIM #8</span>
              </div>
            </GlassCard>

            <div className="space-y-2">
               <p className="text-[10px] uppercase tracking-widest font-bold text-academic-muted mb-2">
                 // Serial Results Log
               </p>
               {Array.from({ length: 8 }).map((_, i) => {
                 const h = history[i];
                 if (!h) return (
                   <div key={i} className="flex items-center gap-4 p-3 bg-white/10 border border-dashed rounded-lg text-xs font-mono opacity-40">
                     <span className="text-academic-muted font-bold w-12 shrink-0">#{i+1}</span>
                     <div className="flex gap-1 flex-1">
                       {Array.from({ length: 6 }).map((_, j) => (
                         <span key={j} className="w-6 h-6 flex items-center justify-center rounded bg-black/5 animate-pulse" />
                       ))}
                     </div>
                     <span className="w-16 animate-pulse bg-black/5 h-4 rounded" />
                   </div>
                 );
                 return (
                   <motion.div 
                     key={i} 
                     initial={{ opacity: 0, x: -10 }}
                     animate={{ opacity: 1, x: 0 }}
                     className="flex items-center gap-4 p-3 bg-white/40 border rounded-lg text-xs font-mono shadow-academic-sm"
                   >
                     <span className="text-secondary font-bold w-12 shrink-0">#{i+1}</span>
                     <div className="flex gap-1 flex-1">
                       {h.draw.map(n => (
                         <span key={n} className={`w-6 h-6 flex items-center justify-center rounded ${picks.includes(n) ? "bg-secondary text-white" : "bg-black/5"}`}>
                           {n}
                         </span>
                       ))}
                     </div>
                     <span className={`font-bold w-16 text-right ${h.matches >= 3 ? "text-secondary" : "text-academic-muted"}`}>
                       {h.matches} Matches
                     </span>
                   </motion.div>
                 );
               })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ── MAIN ──────────────────────────────────────────────────────────────────── */
const TABS = [
  { label: "🎱 Lottery Odds", comp: <LotteryTab /> },
];

const theoryItems = [
  { l: "Combinations", v: "$\\binom{n}{k} = \\frac{n!}{k!(n-k)!}$ — the number of ways to choose $k$ items from $n$ without regard to order." },
  { l: "Jackpot Odds", v: "$P(\\text{jackpot}) = \\frac{1}{\\binom{45}{6}} = \\frac{1}{8{,}145{,}060} \\approx 0.0000123\\%$" },
  { l: "Independent Events", v: "Two events are independent if knowing the outcome of one does not change the probability of the other: $P(A|B) = P(A)$" },
  { l: "Expected Value", v: "$E[X] = \\sum x_i P(x_i)$. For most lotteries, $E[X] < \\text{ticket cost}$, making them financially negative-expected games." },
];

export const LotteryEngine = () => {
  const [tab, setTab] = useState(0);

  return (
    <SectionSection
      id="sim-lottery"
      speaker="4"
      label={SPEAKER_4_SPEECH.topic}
      title="The Daily Gamble"
      formula={SPEAKER_4_SPEECH.formula}
    >
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_350px] gap-12 mb-16">
        <div className="space-y-8">
          {/* Tab selector */}
          <div className="flex gap-3 flex-wrap">
            {TABS.map((t, i) => (
              <button
                key={i}
                onClick={() => setTab(i)}
                className={`px-5 py-3 rounded-lg text-sm font-bold transition-all border-2 ${
                  tab === i
                    ? "bg-primary text-white border-primary"
                    : "bg-white/60 text-academic-text border-academic-border hover:border-secondary"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          <GlassCard className="p-8 min-h-[500px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={tab}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.2 }}
              >
                {TABS[tab].comp}
              </motion.div>
            </AnimatePresence>
          </GlassCard>
        </div>

        <TheoryBoard title="Theory" items={theoryItems} />
      </div>

      <InsightBox
        className="max-w-3xl mx-auto"
        text="The lottery is not a game of luck — it is a precision instrument for demonstrating that humans are neurologically incapable of imagining one-in-eight-million. Every scratch card, every number ball, every jackpot is a live lesson in the mathematics of impossibility."
      />
    </SectionSection>
  );
};
