"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GlassCard, SectionSection, InsightBox } from "../ui/AcademicUI";

const LABELS = [
  { pct: 0,   word: "IMPOSSIBLE",  color: "#9B2F00",  desc: "This event cannot happen under any known circumstance." },
  { pct: 10,  word: "VERY RARE",   color: "#C2410C",  desc: "Extremely unlikely — happens roughly once every 10 attempts." },
  { pct: 25,  word: "UNLIKELY",    color: "#D97706",  desc: "Occurs about once every 4 trials. Long-shot territory." },
  { pct: 50,  word: "EVEN ODDS",   color: "#755B00",  desc: "A perfect coin-flip. Neither side has advantage." },
  { pct: 75,  word: "LIKELY",      color: "#166534",  desc: "Expected 3 out of 4 times. The probable outcome." },
  { pct: 90,  word: "VERY LIKELY", color: "#14532D",  desc: "Happens 9 times in 10. Safe to plan for this outcome." },
  { pct: 100, word: "CERTAIN",     color: "#052e16",  desc: "This event is guaranteed to occur." },
];

const EXAMPLES = [
  { label: "Coin flip — Heads",     pct: 50  },
  { label: "Rain in monsoon season", pct: 88  },
  { label: "Win the jackpot lottery", pct: 0  },
  { label: "Sun rises tomorrow",    pct: 100 },
  { label: "Car starts in winter",  pct: 72  },
  { label: "Draw an Ace from deck", pct: 8   },
];

function getLabel(p: number) {
  let best = LABELS[0];
  for (const l of LABELS) {
    if (Math.abs(p - l.pct) < Math.abs(p - best.pct)) best = l;
  }
  return best;
}

// ── Speaker 1 Speech ────────────────────────────────────────────────────────
export const SPEAKER_1_SPEECH = {
  name: "Speaker 1",
  topic: "The Language of Uncertainty",
  teaser: "Everything that has ever been decided — every bridge built, every drug approved, every forecast issued — was built on a single number between 0 and 1.",
  points: [
    "Probability is not about luck. It is the formal mathematics of incomplete information. When we say P(rain) = 0.70, we are not guessing — we are encoding everything we know about humidity, pressure, and cloud cover into a single, actionable number.",
    "The scale runs from 0 (absolute impossibility) to 1 (absolute certainty). Nothing in the observable universe sits permanently at the extremes — even the \"impossible\" has probability 10⁻¹²³ in some quantum theories.",
    "The Law of Large Numbers guarantees that as we repeat any stable random experiment, the observed frequency converges to the true probability. This is why casinos always win and why insurance companies never go bankrupt from randomness alone.",
    "Every AI model, every spam filter, every self-driving car is fundamentally a machine that takes raw sensory data and returns a probability distribution: 'Given what I see, what is the most likely next action?' The math starts here — with this slider.",
  ],
  formula: "P(A) \\in [0, 1]",
};

// ── Component ────────────────────────────────────────────────────────────────
export const ProbabilitySlider = () => {
  const [prob, setProb] = useState(50);
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const info = getLabel(prob);
  const contextText =
    prob === 0
      ? "This event cannot happen."
      : prob === 100
      ? "This event is guaranteed to occur."
      : prob < 50
      ? `Expected once every ${Math.round(100 / Math.max(prob, 1))} attempts.`
      : `Expected ${prob} times out of 100 attempts.`;

  return (
    <SectionSection
      id="sim-slider"
      speaker="1"
      label={SPEAKER_1_SPEECH.topic}
      title="Feel The Randomness"
      formula={SPEAKER_1_SPEECH.formula}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
        {/* LEFT — Quick-pick examples */}
        <div className="flex flex-col justify-center space-y-8">
          <div>
            <p className="text-xs uppercase tracking-widest font-bold text-academic-muted mb-4">
              // Click an example to feel the scale
            </p>
            <div className="flex flex-wrap gap-3">
              {EXAMPLES.map((ex) => (
                <button
                  key={ex.label}
                  onClick={() => setProb(ex.pct)}
                  className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider border transition-all duration-200 ${
                    prob === ex.pct
                      ? "bg-primary text-white border-primary"
                      : "bg-white/60 text-academic-text border-academic-border hover:border-secondary"
                  }`}
                >
                  {ex.label}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="text-2xl font-bold font-serif text-academic-text">What Is Probability?</h3>
            <p className="text-academic-muted leading-relaxed">
              Probability is the mathematics of uncertainty. It quantifies how likely an event is to occur on a scale from{" "}
              <span className="font-bold text-primary">0 (impossible)</span> to{" "}
              <span className="font-bold text-secondary">1 (certain)</span>.
            </p>
            <p className="text-academic-muted leading-relaxed text-sm">
              Every forecast, every AI prediction, every medical test result is expressed as a probability.
              Understanding this scale is the first step to understanding how the modern world makes decisions.
            </p>
          </div>

          {/* Scale markers */}
          <div className="flex justify-between text-[10px] font-mono text-academic-muted">
            {LABELS.map((l) => (
              <span key={l.pct}>{l.pct}</span>
            ))}
          </div>
        </div>

        {/* RIGHT — Interactive terminal */}
        <GlassCard className="p-8 relative overflow-hidden">
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-academic-border">
            <span className="text-xs font-bold uppercase tracking-widest text-secondary">
              // Probability Scale
            </span>
            <div className="flex gap-1.5">
              {["#ff5f57", "#febc2e", "#28c840"].map((c, i) => (
                <div key={i} className="w-3 h-3 rounded-full" style={{ background: c }} />
              ))}
            </div>
          </div>

          {/* Big percentage readout */}
          <div className="text-center mb-8">
            {mounted && (
              <motion.p
                key={Math.ceil(prob / 10)}
                initial={{ scale: 0.92, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="text-8xl font-bold font-serif leading-none"
                style={{ color: info.color, transition: "color 0.3s" }}
              >
                {prob}%
              </motion.p>
            )}
            <motion.p
              key={info.word}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-2xl font-bold uppercase tracking-wider mt-3"
              style={{ color: info.color }}
            >
              {info.word}
            </motion.p>
          </div>

          {/* Slider */}
          <div className="mb-6">
            <div
              className="w-full h-1.5 rounded-full mb-1 overflow-hidden"
              style={{ background: "rgba(0,0,0,0.08)" }}
            >
              <div
                className="h-full rounded-full transition-all duration-200"
                style={{ width: `${prob}%`, background: info.color }}
              />
            </div>
            <input
              type="range"
              min={0}
              max={100}
              value={prob}
              onChange={(e) => setProb(+e.target.value)}
              className="w-full accent-primary"
              style={{ marginTop: -6 }}
            />
          </div>

          {/* Insight box */}
          <div
            className="p-6 rounded-lg"
            style={{
              background: "rgba(255,255,255,0.5)",
              borderLeft: `4px solid ${info.color}`,
            }}
          >
            <p className="text-[10px] uppercase tracking-widest font-bold text-academic-muted mb-2">
              Matched Context
            </p>
            <p className="font-mono text-sm font-bold" style={{ color: info.color }}>
              P(event) = {(prob / 100).toFixed(2)}
            </p>
            <p className="text-xs text-academic-muted mt-2 leading-relaxed">{contextText}</p>
            <p className="text-xs text-academic-muted mt-1 italic">{info.desc}</p>
          </div>
        </GlassCard>
      </div>

      <InsightBox
        className="max-w-3xl mx-auto"
        text="Before any simulation, any forecast, any neural network — there is this: a single number between 0 and 1. Every sophisticated model in existence is simply a machine for computing this number, faster and more accurately than human intuition alone."
      />
    </SectionSection>
  );
};
