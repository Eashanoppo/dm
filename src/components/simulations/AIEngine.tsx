"use client";

import React, { useState, useEffect, useMemo, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GlassCard, SectionSection, InsightBox, TheoryBoard } from "../ui/AcademicUI";
import { FULL_LEXICON, naiveBayesTrace, ClassificationStep } from "@/lib/probability-utils";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { Line, Bar } from "react-chartjs-2";

if (typeof window !== "undefined") {
  ChartJS.register(
    CategoryScale, LinearScale, PointElement,
    LineElement, BarElement, Title, Tooltip, Legend, Filler
  );
}

const PIPELINE_STAGES = ["Tokenizer", "Feature Extractor", "Accumulator", "Decision"];

const getRiskProfile = (prob: number) => {
  if (prob > 0.85) return { label: "HIGH RISK", sub: "Spam", color: "#9B2F00", bg: "bg-red-50", ring: "ring-red-300", text: "text-primary" };
  if (prob > 0.60) return { label: "SUSPICIOUS", sub: "Likely Spam", color: "#D97706", bg: "bg-amber-50", ring: "ring-amber-300", text: "text-amber-700" };
  if (prob > 0.40) return { label: "UNCERTAIN", sub: "Borderline", color: "#6366F1", bg: "bg-indigo-50", ring: "ring-indigo-300", text: "text-indigo-700" };
  if (prob > 0.20) return { label: "LOW RISK", sub: "Likely Ham", color: "#059669", bg: "bg-emerald-50", ring: "ring-emerald-300", text: "text-emerald-700" };
  return { label: "SAFE", sub: "Ham", color: "#059669", bg: "bg-green-50", ring: "ring-green-300", text: "text-emerald-600" };
};

export const AIEngine = () => {
  const [message, setMessage] = useState("Click here to win a free prize, congratulations winner!");
  const [activeStage, setActiveStage] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const steps = useMemo<ClassificationStep[]>(() => {
    return naiveBayesTrace(message, FULL_LEXICON);
  }, [message]);

  const finalProb = steps.length > 0 ? steps[steps.length - 1].posterior : 0.5;
  const risk = getRiskProfile(finalProb);

  // Posterior trace for chart
  const traceData = [0.5, ...steps.map(s => s.posterior)];
  const traceLabels = ["Prior", ...steps.map(s => s.word)];

  // Run pipeline animation when message changes
  useEffect(() => {
    setActiveStage(0);
    setIsAnimating(true);
    const timers = [
      setTimeout(() => setActiveStage(1), 400),
      setTimeout(() => setActiveStage(2), 900),
      setTimeout(() => setActiveStage(3), 1400),
      setTimeout(() => { setActiveStage(4); setIsAnimating(false); }, 1800),
    ];
    return () => timers.forEach(clearTimeout);
  }, [message]);

  const posteriorChart = {
    labels: traceLabels,
    datasets: [{
      label: "P(Spam) Posterior",
      data: traceData,
      borderColor: "#9B2F00",
      backgroundColor: "rgba(155,47,0,0.10)",
      tension: 0.4,
      fill: true,
      pointRadius: traceData.map((_, i) => i === 0 ? 5 : 4),
      pointBackgroundColor: traceData.map(p => p > 0.5 ? "#9B2F00" : "#059669"),
    }],
  };

  // Feature bar chart (log-likelihood ratios)
  const knownSteps = steps.filter(s => s.known);
  const featureChart = {
    labels: knownSteps.map(s => s.word),
    datasets: [{
      label: "Log-Likelihood Ratio",
      data: knownSteps.map(s => parseFloat(s.logLikelihoodRatio.toFixed(3))),
      backgroundColor: knownSteps.map(s => s.logLikelihoodRatio > 0 ? "rgba(155,47,0,0.75)" : "rgba(5,150,105,0.75)"),
      borderRadius: 4,
    }],
  };

  const theoryItems = [
    { l: "Naive Bayes", v: "Assumes word evidence is independent. $P(S|w_1...w_n) \\propto P(S) \\prod_i P(w_i|S)$" },
    { l: "Log-Space Math", v: "Sum of $\\log P$ avoids floating-point underflow for long texts." },
    { l: "TF-IDF Dampening", v: "Repeated words count less: weight $\\propto 1/\\sqrt{\\text{freq}}$" },
    { l: "Laplace Smoothing", v: "Unknown words pull the prediction toward the prior ($\\alpha=0.05$) instead of zeroing it." },
  ];

  return (
    <SectionSection
      id="speaker5"
      speaker="5"
      label="Future & Artificial Intelligence"
      title="Bayesian AI Engine"
      formula={`P(S|w_{1..n}) = \\frac{P(S)\\prod P(w_i|S)}{P(S)\\prod P(w_i|S)+P(H)\\prod P(w_i|H)}`}
    >
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_350px] gap-12 mb-16">
        <div className="space-y-8">

          {/* Textarea */}
          <GlassCard className="p-8 bg-white/40">
            <div className="flex items-center gap-3 mb-4">
              <div className={`w-2.5 h-2.5 rounded-full ${isAnimating ? "animate-pulse bg-amber-400" : "bg-emerald-500"}`} />
              <h3 className="text-base font-bold uppercase tracking-widest text-academic-muted">
                {isAnimating ? "Processing Pipeline..." : "Engine Ready"}
              </h3>
            </div>
            <textarea
              className="w-full h-24 p-5 bg-white/70 border border-academic-border rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none text-lg leading-relaxed shadow-inner font-sans"
              placeholder="Type any message to classify..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />

            {/* Pipeline Stage Indicator */}
            <div className="flex items-center justify-between mt-5 gap-2">
              {PIPELINE_STAGES.map((stage, i) => (
                <div key={stage} className="flex-1 flex flex-col items-center gap-1">
                  <div className={`w-full h-1.5 rounded-full transition-all duration-500 ${activeStage > i ? "bg-primary" : "bg-academic-border"}`} />
                  <span className={`text-[9px] font-bold uppercase tracking-widest transition-colors ${activeStage > i ? "text-primary" : "text-academic-muted/60"}`}>
                    {stage}
                  </span>
                </div>
              ))}
            </div>
          </GlassCard>

          {/* Word Token Evidence */}
          <GlassCard className="p-6 bg-white/40">
            <div className="flex justify-between items-center mb-4">
              <h4 className="text-xs font-bold uppercase tracking-widest text-academic-muted">Feature Extraction — Token Evidence</h4>
              <span className="text-xs text-academic-muted font-bold">{steps.filter(s => s.known).length}/{steps.length} tokens matched</span>
            </div>
            <div className="flex flex-wrap gap-2 min-h-[60px]">
              <AnimatePresence>
                {steps.map((step, i) => {
                  const ratio = step.logLikelihoodRatio;
                  const isSpam = ratio > 0.05;
                  const isHam = ratio < -0.05;
                  const power = Math.min(Math.abs(ratio) / 2, 1);
                  return (
                    <motion.div
                      key={`${step.word}-${i}`}
                      initial={{ opacity: 0, scale: 0.7, y: 8 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      transition={{ delay: i * 0.04 }}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-bold transition-all ${
                        !step.known
                          ? "bg-gray-50 border-gray-200 text-gray-400"
                          : isSpam
                            ? "bg-red-50 border-red-200 text-primary"
                            : isHam
                              ? "bg-green-50 border-green-200 text-emerald-700"
                              : "bg-amber-50 border-amber-200 text-amber-700"
                      }`}
                      title={step.known
                        ? `P(spam)=${step.evidence?.pSpam}, P(ham)=${step.evidence?.pHam}`
                        : "Unknown word — using prior smoothing"
                      }
                    >
                      <span>{step.word}</span>
                      {step.known && (
                        <>
                          <div
                            className={`h-4 rounded-full ${isSpam ? "bg-primary" : "bg-emerald-600"}`}
                            style={{ width: `${Math.max(4, power * 28)}px`, opacity: 0.6 + power * 0.4 }}
                          />
                          <span className="text-[9px] opacity-70">
                            {isSpam ? "+" : ""}{ratio.toFixed(2)}
                          </span>
                        </>
                      )}
                      {!step.known && <span className="text-[9px] opacity-50">~neutral</span>}
                    </motion.div>
                  );
                })}
              </AnimatePresence>
              {steps.length === 0 && (
                <p className="text-sm text-academic-muted">Type something to see evidence chips...</p>
              )}
            </div>
          </GlassCard>

          {/* Charts Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

            {/* Posterior Evolution */}
            <GlassCard className="p-6 bg-white/40">
              <h4 className="text-xs font-bold uppercase tracking-widest text-academic-muted mb-4">Posterior Evolution</h4>
              <div className="h-[200px]">
                <Line
                  data={posteriorChart}
                  options={{
                    responsive: true, maintainAspectRatio: false,
                    animation: { duration: 600 },
                    scales: {
                      y: { min: 0, max: 1, grid: { color: "rgba(0,0,0,0.04)" } },
                      x: { ticks: { maxRotation: 30, font: { size: 9 } }, grid: { display: false } },
                    },
                    plugins: {
                      legend: { display: false },
                      tooltip: {
                        callbacks: {
                          label: (ctx) => `P(Spam): ${( (ctx.parsed.y ?? 0) * 100).toFixed(1)}%`
                        }
                      }
                    }
                  }}
                />
              </div>
            </GlassCard>

            {/* Feature Importance Bar */}
            <GlassCard className="p-6 bg-white/40">
              <h4 className="text-xs font-bold uppercase tracking-widest text-academic-muted mb-4">Feature Weights (LLR)</h4>
              <div className="h-[200px]">
                {knownSteps.length > 0 ? (
                  <Bar
                    data={featureChart}
                    options={{
                      responsive: true, maintainAspectRatio: false,
                      animation: { duration: 600 },
                      scales: {
                        y: { grid: { color: "rgba(0,0,0,0.04)" } },
                        x: { ticks: { font: { size: 9 } }, grid: { display: false } },
                      },
                      plugins: {
                        legend: { display: false },
                        tooltip: {
                          callbacks: {
                            label: (ctx) => `LLR: ${(ctx.parsed.y as number).toFixed(3)}`
                          }
                        }
                      },
                    }}
                  />
                ) : (
                  <div className="h-full flex items-center justify-center text-sm text-academic-muted">
                    No lexicon matches yet.
                  </div>
                )}
              </div>
            </GlassCard>

          </div>

          {/* Final Decision Panel */}
          <GlassCard className={`p-6 bg-white/40 ring-2 ${risk.ring} transition-all duration-700`}>
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-xs font-bold uppercase tracking-widest text-academic-muted">Machine Verdict</p>
                <h3 className={`text-4xl font-bold tracking-tight ${risk.text}`}>{risk.label}</h3>
                <p className="text-sm font-bold text-academic-muted uppercase tracking-widest">{risk.sub}</p>
              </div>
              <div className="relative w-32 h-32">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="42" fill="transparent" stroke="#E5E7EB" strokeWidth="10" />
                  <motion.circle
                    cx="50" cy="50" r="42"
                    fill="transparent"
                    stroke={risk.color}
                    strokeWidth="10"
                    strokeDasharray={264}
                    animate={{ strokeDashoffset: 264 * (1 - finalProb) }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <motion.span
                    key={finalProb}
                    animate={{ scale: [1.2, 1] }}
                    className="text-2xl font-bold tracking-tight"
                    style={{ color: risk.color }}
                  >
                    {(finalProb * 100).toFixed(0)}%
                  </motion.span>
                  <span className="text-[9px] uppercase tracking-widest font-bold text-academic-muted">Spam</span>
                </div>
              </div>
            </div>
          </GlassCard>

          <InsightBox
            text="From Coins to AI: every flip, every roll, every draw was training us for this — the machine learns by counting evidence, one word at a time."
          />
        </div>

        <TheoryBoard title="Bayes' Board" items={theoryItems} />
      </div>
    </SectionSection>
  );
};
