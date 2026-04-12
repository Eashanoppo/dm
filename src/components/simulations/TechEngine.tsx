"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GlassCard, SectionSection, InsightBox, TheoryBoard } from "../ui/AcademicUI";

// ── Speaker 3 Speech ─────────────────────────────────────────────────────────
export const SPEAKER_3_SPEECH = {
  name: "Speaker 3",
  topic: "Algorithms & Technology",
  teaser: "Every time Google Maps recalculates your route, every time Gmail moves a message to Spam, every time Netflix suggests a show — a probabilistic algorithm made that call in milliseconds.",
  points: [
    "SMART ROUTING: Navigation apps like Google Maps and Waze are Monte Carlo engines. They don't calculate one optimal route — they simulate thousands of possible traffic scenarios using historical data, live sensor feeds, and accident probabilities, then recommend the route with the best expected travel time.",
    "SPAM FILTERS: The Naïve Bayes classifier — one of the oldest and most elegant algorithms in machine learning — computes the probability that an email is spam given the words it contains: P(spam | words). 'Naïve' refers to the assumption that each word's contribution is independent, which is mathematically convenient and surprisingly effective.",
    "Monte Carlo methods are named after the Monte Carlo Casino. The core idea: when a problem is too complex to solve analytically, simulate it thousands of times with random inputs and average the results. This same technique is used in financial risk modeling, drug trials, and nuclear reactor design.",
    "Naïve Bayes reaches production-grade accuracy with very little training data — which is why it dominated spam detection from the 1990s through today. Modern LLMs are simply more sophisticated Bayesian predictors operating over billions of parameters.",
  ],
  formula: "P(\\text{spam}|w_1...w_n) \\propto P(\\text{spam}) \\prod P(w_i|\\text{spam})",
};

/* ── TRAFFIC / SMART ROUTING DEMO ─────────────────────────────────────────── */
const HOURS = ["06:00","07:00","08:00","09:00","10:00","11:00","12:00","13:00","14:00","15:00","16:00","17:00","18:00","19:00","20:00","21:00","22:00"];

function getTrafficLevel(hour: number): "low" | "medium" | "high" {
  if ((hour >= 8 && hour <= 9) || (hour >= 17 && hour <= 19)) return "high";
  if ((hour >= 7 && hour <= 10) || (hour >= 16 && hour <= 20)) return "medium";
  return "low";
}

function calcTime(distKm: number, baseSpeed: number, congestion: number, accidentProb: number) {
  const effectiveSpeed = baseSpeed * (1 - congestion * 0.7);
  const base = (distKm / effectiveSpeed) * 60;
  const accident = Math.random() < accidentProb ? 12 + Math.random() * 10 : 0;
  return base + accident + (Math.random() - 0.5) * 4;
}

const ROUTE_A = { name: "HIGHWAY", dist: 28, speed: 90 };
const ROUTE_B = { name: "CITY STREETS", dist: 18, speed: 40 };
const CONGESTION: Record<string, { highway: number; city: number; accident: number }> = {
  low:    { highway: 0.05, city: 0.15, accident: 0.03 },
  medium: { highway: 0.25, city: 0.45, accident: 0.06 },
  high:   { highway: 0.65, city: 0.80, accident: 0.12 },
};

function TrafficDemo() {
  const [hourIdx, setHourIdx] = useState(8);
  const [result, setResult] = useState<{ aAvg: number; bAvg: number; aWins: number; runs: number } | null>(null);
  const [running, setRunning] = useState(false);

  const hour = 6 + hourIdx;
  const level = getTrafficLevel(hour);
  const cong = CONGESTION[level];
  const etaA = ((ROUTE_A.dist / (ROUTE_A.speed * (1 - cong.highway * 0.7))) * 60).toFixed(0);
  const etaB = ((ROUTE_B.dist / (ROUTE_B.speed * (1 - cong.city * 0.7))) * 60).toFixed(0);
  const levelColor = level === "high" ? "#9B2F00" : level === "medium" ? "#755B00" : "#166534";

  const simulate = () => {
    if (running) return;
    setRunning(true);
    setResult(null);
    const N = 200;
    let aWins = 0, aSum = 0, bSum = 0, done = 0;
    const iv = setInterval(() => {
      for (let i = 0; i < 10; i++) {
        if (done >= N) break;
        const a = calcTime(ROUTE_A.dist, ROUTE_A.speed, cong.highway, cong.accident);
        const b = calcTime(ROUTE_B.dist, ROUTE_B.speed, cong.city, cong.accident * 0.5);
        aSum += a; bSum += b;
        if (a < b) aWins++;
        done++;
      }
      setResult({ aAvg: aSum / done, bAvg: bSum / done, aWins, runs: done });
      if (done >= N) { clearInterval(iv); setRunning(false); }
    }, 40);
  };

  return (
    <div className="space-y-6">
      <div>
        <div className="flex justify-between text-xs font-bold font-mono mb-2">
          <span className="text-academic-muted">DEPARTURE TIME</span>
          <span className="text-secondary">{HOURS[hourIdx]}</span>
        </div>
        <input type="range" min={0} max={HOURS.length - 1} value={hourIdx}
          onChange={(e) => { setHourIdx(+e.target.value); setResult(null); }}
          className="w-full accent-secondary" />
        <div className="flex justify-between text-[9px] font-mono text-academic-muted mt-1">
          <span>06:00</span><span>12:00</span><span>22:00</span>
        </div>
      </div>

      <div className="flex items-center gap-4 p-4 rounded-lg border" style={{ borderColor: levelColor + "40", background: levelColor + "08" }}>
        <div className="w-3 h-3 rounded-full" style={{ background: levelColor }} />
        <div>
          <p className="text-[10px] uppercase tracking-widest font-bold text-academic-muted">Traffic Level</p>
          <p className="text-sm font-bold font-mono" style={{ color: levelColor }}>{level.toUpperCase()}</p>
        </div>
        <div className="ml-auto text-right">
          <p className="text-[9px] text-academic-muted font-mono">Accident risk</p>
          <p className="text-sm font-mono font-bold text-academic-text">{(cong.accident * 100).toFixed(0)}%</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {[
          { r: ROUTE_A, eta: etaA, cong: cong.highway, color: "#755B00" },
          { r: ROUTE_B, eta: etaB, cong: cong.city, color: "#1d4ed8" },
        ].map(({ r, eta, cong: c, color }) => (
          <GlassCard key={r.name} className="p-5">
            <p className="text-[9px] uppercase tracking-widest font-bold mb-1" style={{ color }}>// {r.name}</p>
            <p className="text-3xl font-bold font-serif" style={{ color }}>{eta} min</p>
            <p className="text-[9px] font-mono text-academic-muted mt-1">{r.dist}km · base {r.speed}km/h</p>
            <div className="mt-3 h-2 rounded-full bg-black/10 overflow-hidden">
              <div className="h-full rounded-full transition-all" style={{ width: `${Math.min(c * 100, 100)}%`, background: color }} />
            </div>
            <p className="text-[9px] font-mono text-academic-muted mt-1">{(c * 100).toFixed(0)}% congested</p>
          </GlassCard>
        ))}
      </div>

      <button className="btn-primary w-full" disabled={running} onClick={simulate}>
        {running ? "Simulating 200 Trips…" : "▶ Run Monte Carlo (200 Trips)"}
      </button>

      <AnimatePresence>
        {result && (
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
            className="p-6 rounded-lg border-l-4"
            style={{ borderColor: result.aAvg < result.bAvg ? "#755B00" : "#1d4ed8", background: "rgba(255,255,255,0.5)" }}>
            <p className="text-[10px] uppercase tracking-widest font-bold text-secondary mb-2">
              Simulation Result — {result.runs} Trips
            </p>
            <p className="text-2xl font-bold font-serif" style={{ color: result.aAvg < result.bAvg ? "#755B00" : "#1d4ed8" }}>
              Take {result.aAvg < result.bAvg ? ROUTE_A.name : ROUTE_B.name}
            </p>
            <div className="grid grid-cols-2 gap-4 mt-3 text-xs font-mono">
              <div>
                <span className="text-academic-muted">Avg Highway: </span>
                <span className="font-bold text-secondary">{result.aAvg.toFixed(1)} min</span>
              </div>
              <div>
                <span className="text-academic-muted">Avg City: </span>
                <span className="font-bold" style={{ color: "#1d4ed8" }}>{result.bAvg.toFixed(1)} min</span>
              </div>
            </div>
            <p className="text-xs font-mono text-academic-muted mt-2">
              Highway wins {result.aWins}/{result.runs} trips ({((result.aWins / result.runs) * 100).toFixed(0)}%)
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ── SPAM FILTER DEMO ─────────────────────────────────────────────────────── */
const SPAM_WORDS = [
  { word: "FREE",        spam: 0.92 }, { word: "WIN",     spam: 0.88 }, { word: "URGENT",      spam: 0.82 },
  { word: "CLICK NOW",   spam: 0.79 }, { word: "GUARANTEED", spam: 0.85 }, { word: "OFFER",    spam: 0.66 },
  { word: "LIMITED",     spam: 0.71 }, { word: "PRIZE",   spam: 0.90 }, { word: "Hello",       spam: 0.10 },
  { word: "Meeting",     spam: 0.08 }, { word: "Report",  spam: 0.09 }, { word: "Team",        spam: 0.05 },
  { word: "Invoice",     spam: 0.32 }, { word: "Project", spam: 0.07 }, { word: "Regards",     spam: 0.04 },
];

function SpamDemo() {
  const [active, setActive] = useState<Set<number>>(new Set());

  const toggle = (i: number) => {
    const s = new Set(active);
    s.has(i) ? s.delete(i) : s.add(i);
    setActive(s);
  };

  const activeList = [...active].map((i) => SPAM_WORDS[i]);
  const spamProb = () => {
    if (activeList.length === 0) return 0.5;
    const logOdds = activeList.reduce((sum, t) => sum + Math.log(t.spam / (1 - t.spam + 0.001)), 0);
    return 1 / (1 + Math.exp(-logOdds));
  };

  const prob = spamProb();
  const pct = Math.round(prob * 100);
  const verdict =
    pct > 75 ? { label: "SPAM",        color: "#9B2F00" } :
    pct > 50 ? { label: "LIKELY SPAM", color: "#C2410C" } :
    pct > 30 ? { label: "UNCERTAIN",   color: "#755B00" } :
               { label: "NOT SPAM",    color: "#166534" };

  return (
    <div className="space-y-6">
      <GlassCard className="p-4">
        <p className="text-xs font-bold uppercase tracking-widest text-secondary mb-2">
          Toggle words — watch the AI decide
        </p>
        <p className="text-xs text-academic-muted">
          Click words to add them to the email. The model computes P(spam | words) using Naïve Bayes.
        </p>
      </GlassCard>

      <div className="flex flex-wrap gap-2">
        {SPAM_WORDS.map((w, i) => {
          const on = active.has(i);
          const isSpam = w.spam > 0.6;
          return (
            <button
              key={i}
              onClick={() => toggle(i)}
              className="px-3 py-2 rounded-md text-xs font-mono font-bold transition-all border-2"
              style={on ? {
                borderColor: isSpam ? "#9B2F00" : "#166534",
                color: isSpam ? "#9B2F00" : "#166534",
                background: isSpam ? "rgba(155,47,0,0.08)" : "rgba(22,101,52,0.08)",
              } : { borderColor: "#e5e0da", color: "#5c4d40", background: "rgba(0,0,0,0.02)" }}
            >
              {w.word}
            </button>
          );
        })}
      </div>

      {activeList.length > 0 && (
        <div>
          <p className="text-[10px] uppercase tracking-widest font-bold text-academic-muted mb-3">
            Model Calculates P(word):
          </p>
          <div className="space-y-2">
            {activeList.sort((a, b) => b.spam - a.spam).map((w, i) => (
              <div key={i} className="flex items-center gap-3 text-xs">
                <span className="font-mono w-24 text-academic-muted shrink-0">P({w.word})</span>
                <span className="text-academic-muted">=</span>
                <div className="flex-1 h-2 bg-black/10 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full rounded-full"
                    animate={{ width: `${w.spam * 100}%` }}
                    style={{ background: w.spam > 0.6 ? "#9B2F00" : "#166534" }}
                  />
                </div>
                <span className="font-mono w-10 text-right shrink-0" style={{ color: w.spam > 0.6 ? "#9B2F00" : "#166534" }}>
                  {(w.spam * 100).toFixed(0)}%
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="p-6 rounded-lg border-l-4" style={{ borderColor: verdict.color, background: "rgba(255,255,255,0.5)" }}>
        <p className="text-[10px] uppercase tracking-widest font-bold text-academic-muted mb-2">Verdict</p>
        <p className="text-3xl font-bold font-serif" style={{ color: verdict.color }}>
          {pct}% — {verdict.label}
        </p>
        <div className="mt-2 h-2 bg-black/10 rounded-full overflow-hidden">
          <motion.div className="h-full rounded-full" animate={{ width: `${pct}%` }} style={{ background: verdict.color }} />
        </div>
        {activeList.length > 0 && (
          <p className="text-[10px] font-mono text-academic-muted mt-2">
            argmax P(spam | words) via Naïve Bayes
          </p>
        )}
      </div>
    </div>
  );
}

/* ── MAIN ─────────────────────────────────────────────────────────────────── */
const DEMOS = [
  {
    id: "SMART ROUTING",
    icon: "🗺",
    comp: <TrafficDemo />,
    theory: [
      { l: "Monte Carlo Method", v: "Named after the casino, it estimates outcomes by running thousands of random simulations. Used in navigation, finance, physics, and drug trials." },
      { l: "Expected Travel Time", v: "$E[T] = \\frac{d}{v_{eff}}$ where $v_{eff} = v_{base}(1 - c_{congestion} \\times 0.7)$. Accident risk adds a stochastic delay." },
      { l: "Why 200 Trips?", v: "By the Law of Large Numbers, 200 simulations is enough for the average to converge closely to the true expected travel time." },
    ],
  },
  {
    id: "SPAM FILTER AI",
    icon: "📧",
    comp: <SpamDemo />,
    theory: [
      { l: "Naïve Bayes Classifier", v: "Assumes each word's presence is independent: $P(\\text{spam}|w_1..w_n) \\propto P(\\text{spam}) \\prod P(w_i|\\text{spam})$" },
      { l: "Log-Odds Trick", v: "To avoid numeric underflow from multiplying many small probabilities, classifiers sum log-odds: $\\sum \\log \\frac{P(w_i|\\text{spam})}{P(w_i|\\text{ham})}$" },
      { l: "Naïve Assumption", v: "Words are treated as independent features — clearly false in real English, but the classification accuracy remains high enough for production use." },
    ],
  },
];

export const TechEngine = () => {
  const [tab, setTab] = useState(0);
  const [speechOpen, setSpeechOpen] = useState(false);

  return (
    <SectionSection
      id="sim-tech"
      speaker="3"
      label={SPEAKER_3_SPEECH.topic}
      title="Algorithms Decide"
      formula={SPEAKER_3_SPEECH.formula}
    >
      {/* Speech Panel */}
      <div className="mb-12">
        <button
          onClick={() => setSpeechOpen(!speechOpen)}
          className="flex items-center gap-3 text-sm font-bold uppercase tracking-widest text-secondary hover:text-primary transition-colors mb-4"
        >
          <span className={`transition-transform duration-300 ${speechOpen ? "rotate-90" : ""}`}>▶</span>
          {SPEAKER_3_SPEECH.name} — "{SPEAKER_3_SPEECH.teaser.slice(0, 60)}…"
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
                  "{SPEAKER_3_SPEECH.teaser}"
                </p>
                <div className="space-y-4">
                  {SPEAKER_3_SPEECH.points.map((pt, i) => (
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
        <div className="space-y-8">
          {/* Tab selector */}
          <div className="flex gap-3 flex-wrap">
            {DEMOS.map((d, i) => (
              <button
                key={i}
                onClick={() => setTab(i)}
                className={`flex items-center gap-2 px-5 py-3 rounded-lg text-sm font-bold uppercase tracking-wider transition-all border-2 ${
                  tab === i
                    ? "bg-primary text-white border-primary"
                    : "bg-white/60 text-academic-text border-academic-border hover:border-secondary"
                }`}
              >
                <span>{d.icon}</span>
                {d.id}
              </button>
            ))}
          </div>

          {/* Demo panel */}
          <GlassCard className="p-8 min-h-[500px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={tab}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.2 }}
              >
                {DEMOS[tab].comp}
              </motion.div>
            </AnimatePresence>
          </GlassCard>
        </div>

        <TheoryBoard title={DEMOS[tab].id} items={DEMOS[tab].theory} />
      </div>

      <InsightBox
        className="max-w-3xl mx-auto"
        text="Every navigation app, every email filter, every recommendation system runs the same core loop: observe → estimate probability → act on the most likely outcome → update beliefs. This is Bayesian reasoning at machine speed — millions of decisions per second, each one a solved probability problem."
      />
    </SectionSection>
  );
};
