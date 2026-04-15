"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GlassCard, SectionSection, InsightBox, TheoryBoard } from "../ui/AcademicUI";

// ── Speaker 2 Speech ─────────────────────────────────────────────────────────
export const SPEAKER_2_SPEECH = {
  name: "Speaker 2",
  topic: "Real-World Applications",
  teaser: "Probability is not an abstraction confined to textbooks. It is the invisible algorithm that governs whether you carry an umbrella, whether your medical test is trustworthy, and what your insurance company thinks your life is worth.",
  points: [
    "WEATHER: Modern numerical weather models run millions of probabilistic simulations — called ensemble forecasts — each starting with slightly different initial conditions. The '70% chance of rain' is not a guess; it's the fraction of those simulations that produce rain.",
    "MEDICINE: Bayes' Theorem reveals one of the most counter-intuitive truths in statistics: even a 99% accurate test mostly produces false positives when the disease is rare. A positive result for a disease with 1% prevalence may only carry a ~50% real probability of infection. This is why doctors always ask 'what is the base rate?'",
    "INSURANCE: Every premium you pay was calculated by actuaries using conditional probability tables built from millions of historical claims. Your age, location, health history, and lifestyle choices each shift the probability distribution of your future claims — and your premium reflects that shift exactly.",
    "The common thread: in each domain, a prior belief (base rate) is updated with new evidence to produce a posterior probability. This is Bayesian reasoning — and it is the engine behind modern medicine, weather science, and economic modeling.",
  ],
  formula: "P(H|E) = \\frac{P(E|H) \\cdot P(H)}{P(E)}",
};

/* ── WEATHER DEMO ─────────────────────────────── */
function WeatherDemo() {
  const [humidity, setHumidity] = useState(65);
  const [cloud, setCloud] = useState(70);
  const [pressure, setPressure] = useState(1013);
  const [days, setDays] = useState<boolean[]>([]);
  const [running, setRunning] = useState(false);

  const rainP = Math.min(
    100,
    Math.max(0, Math.round(humidity * 0.35 + cloud * 0.45 + (1015 - pressure) * 1.8))
  );

  const simulate = async () => {
    setRunning(true);
    setDays([]);
    const arr: boolean[] = [];
    for (let i = 0; i < 30; i++) {
      await new Promise((r) => setTimeout(r, 55));
      arr.push(Math.random() * 100 < rainP);
      setDays([...arr]);
    }
    setRunning(false);
  };

  const rainColor =
    rainP > 70 ? "#1d4ed8" : rainP > 40 ? "#755B00" : "#166534";

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <p className="text-xs font-bold uppercase tracking-widest text-secondary">// Atmospheric Inputs</p>
        {[
          { label: "Humidity", val: humidity, set: setHumidity, unit: "%", min: 0, max: 100 },
          { label: "Cloud Cover", val: cloud, set: setCloud, unit: "%", min: 0, max: 100 },
          { label: "Atm. Pressure", val: pressure, set: setPressure, unit: " hPa", min: 980, max: 1030 },
        ].map(({ label, val, set, unit, min, max }) => (
          <div key={label}>
            <div className="flex justify-between text-xs font-bold mb-1">
              <span className="text-academic-muted font-mono">{label}</span>
              <span className="text-secondary font-mono">{val}{unit}</span>
            </div>
            <input
              type="range" min={min} max={max} value={val}
              onChange={(e) => set(+e.target.value)}
              className="w-full accent-secondary"
            />
          </div>
        ))}
      </div>

      <div className="p-6 rounded-lg border-l-4 border-secondary bg-secondary-gold/5">
        <p className="text-[10px] uppercase tracking-widest font-bold text-academic-muted mb-2">Model Output</p>
        <p className="text-4xl font-bold font-serif" style={{ color: rainColor }}>
          {rainP}% RAIN
        </p>
        <p className="text-xs text-academic-muted mt-1">
          {rainP > 70 ? "⛈ High chance — carry an umbrella" : rainP > 40 ? "🌤 Uncertain — check again later" : "☀ Low risk — looks clear"}
        </p>
      </div>

      <div>
        <div className="flex items-center justify-between mb-3">
          <p className="text-xs font-bold uppercase tracking-widest text-academic-muted">// 30-Day Simulation</p>
          <button
            className="btn-primary px-4 py-2 text-xs"
            onClick={simulate}
            disabled={running}
          >
            {running ? "Running…" : "▶ Simulate"}
          </button>
        </div>
        {days.length > 0 && (
          <div>
            <div className="flex flex-wrap gap-1 mb-2">
              {days.map((r, i) => (
                <div
                  key={i}
                  className="w-6 h-6 flex items-center justify-center text-[9px] rounded"
                  style={{
                    background: r ? "rgba(29,78,216,0.15)" : "rgba(0,0,0,0.04)",
                    color: r ? "#1d4ed8" : "#999",
                  }}
                >
                  {r ? "🌧" : "—"}
                </div>
              ))}
            </div>
            {days.length === 30 && (
              <p className="text-xs font-mono text-academic-muted">
                Rained {days.filter(Boolean).length}/30 days · Predicted: {rainP}% · Actual:{" "}
                {Math.round((days.filter(Boolean).length / 30) * 100)}%
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

/* ── MEDICAL DEMO ──────────────────────────────── */
function MedicalDemo() {
  const [sensitivity, setSensitivity] = useState(99);
  const [prevalence, setPrevalence] = useState(1);
  const [tested, setTested] = useState(false);

  const ppvRaw = () => {
    const p = prevalence / 100;
    const sens = sensitivity / 100;
    const spec = 0.99;
    const pPos = sens * p + (1 - spec) * (1 - p);
    return (sens * p) / pPos * 100;
  };
  const ppvVal = parseFloat(ppvRaw().toFixed(1));

  return (
    <div className="space-y-6">
      <GlassCard className="p-6 border-l-4 border-primary">
        <p className="text-xs font-bold uppercase tracking-widest text-secondary mb-1">The Paradox</p>
        <p className="text-sm text-academic-muted leading-relaxed">
          Your test is {sensitivity}% accurate. You test <span className="font-bold text-primary">positive</span>.
          What's the real chance you have the disease?
        </p>
      </GlassCard>

      <div className="space-y-4">
        {[
          { label: "Test Accuracy (Sensitivity)", val: sensitivity, set: setSensitivity, min: 50, max: 100 },
          { label: "Disease Prevalence in Population", val: prevalence, set: setPrevalence, min: 0, max: 20 },
        ].map(({ label, val, set, min, max }) => (
          <div key={label}>
            <div className="flex justify-between text-xs font-bold mb-1">
              <span className="text-academic-muted font-mono">{label}</span>
              <span className="text-secondary font-mono">{val}%</span>
            </div>
            <input
              type="range" min={min} max={max} value={val}
              onChange={(e) => { set(+e.target.value); setTested(false); }}
              className="w-full accent-primary"
            />
          </div>
        ))}
      </div>

      <button className="btn-primary w-full" onClick={() => setTested(true)}>
        Get Result
      </button>

      <AnimatePresence>
        {tested && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-6 rounded-lg"
            style={{ borderLeft: `4px solid ${ppvVal > 50 ? "#9B2F00" : "#166534"}`, background: "rgba(255,255,255,0.5)" }}
          >
            <p className="text-[10px] uppercase tracking-widest font-bold text-academic-muted mb-2">Model Calculates</p>
            <p className="text-4xl font-bold font-serif" style={{ color: ppvVal > 50 ? "#9B2F00" : "#166534" }}>
              {ppvVal}% Real Chance
            </p>
            <p className="text-xs text-academic-muted mt-2 leading-relaxed">
              Even a {sensitivity}% accurate test mostly gives false positives when the disease affects only {prevalence}% of people.
              This is <span className="font-bold text-secondary">Bayes' Theorem</span> in action.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ── INSURANCE DEMO ─────────────────────────────── */
function InsuranceDemo() {
  const [age, setAge] = useState(30);
  const [smoker, setSmoker] = useState(false);
  const [sport, setSport] = useState(false);

  const risk = Math.min(95, Math.round(
    10 + (age > 50 ? 25 : age > 35 ? 12 : 3) + (smoker ? 30 : 0) + (sport ? 15 : 0)
  ));
  const premium = Math.round(500 + risk * 28);
  const riskColor = risk > 60 ? "#9B2F00" : risk > 35 ? "#755B00" : "#166534";

  return (
    <div className="space-y-6">
      <p className="text-sm text-academic-muted leading-relaxed">
        Insurance companies use probability to price your risk. Actuaries run your profile
        through conditional probability tables to estimate your annual claim likelihood.
      </p>

      <div>
        <div className="flex justify-between text-xs font-bold mb-1">
          <span className="text-academic-muted font-mono">Age</span>
          <span className="text-secondary font-mono">{age} yrs</span>
        </div>
        <input type="range" min={18} max={80} value={age} onChange={(e) => setAge(+e.target.value)} className="w-full accent-secondary" />
      </div>

      <div className="space-y-3">
        {[
          { label: "Smoker", val: smoker, set: setSmoker },
          { label: "Extreme Sports", val: sport, set: setSport },
        ].map(({ label, val, set }) => (
          <button
            key={label}
            onClick={() => set(!val)}
            className={`flex items-center justify-between w-full p-4 rounded-lg text-left transition-all border-2 ${
              val ? "border-primary bg-primary/5" : "border-academic-border bg-white/40"
            }`}
          >
            <span className={`text-sm font-bold ${val ? "text-primary" : "text-academic-text"}`}>{label}</span>
            <span className={`text-xs font-bold uppercase ${val ? "text-primary" : "text-academic-muted"}`}>
              {val ? "✓ YES" : "○ NO"}
            </span>
          </button>
        ))}
      </div>

      <div className="p-6 rounded-lg border-l-4 bg-white/50" style={{ borderColor: riskColor }}>
        <div className="flex items-end justify-between mb-4">
          <div>
            <p className="text-[10px] uppercase tracking-widest font-bold text-academic-muted mb-1">Risk Score</p>
            <p className="text-4xl font-bold font-serif" style={{ color: riskColor }}>{risk}%</p>
          </div>
          <div className="text-right">
            <p className="text-[10px] uppercase tracking-widest font-bold text-academic-muted mb-1">Est. Premium</p>
            <p className="text-4xl font-bold font-serif text-secondary">${premium}/yr</p>
          </div>
        </div>
        <div className="w-full h-2 bg-black/10 rounded-full overflow-hidden">
          <motion.div
            className="h-full rounded-full"
            animate={{ width: `${risk}%` }}
            transition={{ type: "spring", damping: 20 }}
            style={{ background: riskColor }}
          />
        </div>
      </div>
    </div>
  );
}

/* ── MAIN SECTION ─────────────────────────────── */
const DEMOS = [
  {
    id: "WEATHER FORECAST",
    icon: "🌦",
    comp: <WeatherDemo />,
    theory: [
      { l: "Ensemble Forecasting", v: "Meteorologists run thousands of simulations with slightly varied initial conditions. The '70% rain' is the fraction that produce rainfall." },
      { l: "Numerical Weather Prediction", v: "Modern NWP models solve fluid dynamics equations over a grid of the atmosphere, updating probabilities every 6 hours." },
      { l: "Calibration", v: "A forecast is 'calibrated' if events predicted at 70% actually happen 70% of the time. Most modern forecasts are well-calibrated." },
    ],
  },
  {
    id: "MEDICAL DIAGNOSIS",
    icon: "🏥",
    comp: <MedicalDemo />,
    theory: [
      { l: "Sensitivity vs. Specificity", v: "Sensitivity = P(+|disease). Specificity = P(−|no disease). High sensitivity catches cases; high specificity avoids false positives." },
      { l: "Base Rate Neglect", v: "The cognitive bias of ignoring how rare a disease is. Even 99% accurate tests produce mostly false positives for 0.01% prevalence diseases." },
      { l: "Positive Predictive Value", v: "$PPV = P(disease | positive) = \\frac{sens \\cdot prev}{sens \\cdot prev + (1-spec)(1-prev)}$" },
    ],
  },
  {
    id: "INSURANCE RISK",
    icon: "🛡",
    comp: <InsuranceDemo />,
    theory: [
      { l: "Actuarial Science", v: "The profession that applies probability and statistics to assess risk in insurance, finance, and other industries." },
      { l: "Risk Segmentation", v: "Insurers segment customers into risk groups using conditional probability. High-risk profiles pay premiums that reflect their expected claim cost." },
      { l: "Expected Value", v: "$E[\\text{claim}] = P(\\text{claim}) \\times \\text{claim amount}$. Premiums are set to cover this plus operating margin." },
    ],
  },
];

export const RealWorldEngine = () => {
  const [tab, setTab] = useState(0);

  return (
    <SectionSection
      id="sim-realworld"
      speaker="2"
      label={SPEAKER_2_SPEECH.topic}
      title="Where Probability Hits"
      formula={SPEAKER_2_SPEECH.formula}
    >
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_350px] gap-12 mb-16">
        <div className="space-y-8">
          {/* Tab nav */}
          <div className="flex flex-wrap gap-3">
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

        {/* Theory sidebar */}
        <TheoryBoard title={DEMOS[tab].id} items={DEMOS[tab].theory} />
      </div>

      <InsightBox
        className="max-w-3xl mx-auto"
        text="Every prediction society makes — from the probability a bridge will fail, to an AI detecting a tumor — is Bayesian reasoning in disguise. The question is always the same: given what I know, how likely is this? The math never changes. Only the domain does."
      />
    </SectionSection>
  );
};
