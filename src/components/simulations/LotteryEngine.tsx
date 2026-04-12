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
  const [draw, setDraw] = useState<number[]>([]);
  const [matches, setMatches] = useState<number | null>(null);
  const [fallacyLog, setFallacyLog] = useState<("W" | "L")[]>([]);
  const [running, setRunning] = useState(false);

  const toggle = (n: number) => {
    if (picks.includes(n)) setPicks(picks.filter((p) => p !== n));
    else if (picks.length < 6) setPicks([...picks, n]);
  };

  const runDraw = () => {
    const d = [...POOL].sort(() => Math.random() - 0.5).slice(0, 6).sort((a, b) => a - b);
    setDraw(d);
    setMatches(picks.filter((p) => d.includes(p)).length);
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
      <div>
        <div className="flex items-center justify-between mb-3">
          <p className="text-xs font-bold uppercase tracking-widest text-secondary">// Pick 6 Numbers (1–45)</p>
          <span className="text-xs font-mono text-academic-muted">{picks.length}/6 selected</span>
        </div>
        <div className="grid grid-cols-9 gap-1 mb-3">
          {POOL.map((n) => {
            const isPick = picks.includes(n);
            const isMatch = draw.includes(n) && isPick;
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
          <button className="btn-primary" disabled={picks.length < 6} onClick={runDraw}>
            ▶ Draw ({picks.length}/6)
          </button>
          <button
            className="px-6 py-3 rounded-xl border-2 border-academic-border text-sm font-bold text-academic-text hover:border-secondary transition-all"
            onClick={() => { setPicks([]); setDraw([]); setMatches(null); }}
          >
            Clear
          </button>
        </div>
      </div>

      <AnimatePresence>
        {matches !== null && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-6 rounded-lg border-l-4"
            style={{ borderColor: matches >= 3 ? "#755B00" : "#d1c7be", background: "rgba(255,255,255,0.5)" }}
          >
            <div className="flex gap-2 mb-3">
              {draw.map((n) => (
                <span
                  key={n}
                  className="w-8 h-8 flex items-center justify-center text-xs font-bold rounded-md"
                  style={{
                    background: picks.includes(n) ? "#755B00" : "rgba(0,0,0,0.06)",
                    color: picks.includes(n) ? "#fff" : "#5c4d40",
                  }}
                >
                  {n}
                </span>
              ))}
            </div>
            <p className="text-3xl font-bold font-serif text-academic-text">
              {matches} Match{matches !== 1 ? "es" : ""}
            </p>
            <p className="text-xs text-academic-muted mt-1">
              {matches === 6
                ? "🏆 JACKPOT — 1 in 8,145,060"
                : matches >= 4
                ? "✓ Prize tier — well done!"
                : matches >= 3
                ? "✓ Small prize"
                : "✗ No prize — the math never lied"}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Gambler's Fallacy */}
      <div className="border-t border-academic-border pt-6">
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
    </div>
  );
}

/* ── QUIZ TAB ──────────────────────────────────────────────────────────────── */
const QUESTIONS = [
  {
    q: "A coin is flipped 10 times and lands heads each time. What's the probability of heads on the next flip?",
    options: ["Much higher than 50%", "50%", "Much lower than 50%", "Impossible to know"],
    correct: 1,
    explanation: "Each flip is independent. Prior results don't change the probability. This is the Gambler's Fallacy trap — falling for it has cost gamblers enormous amounts of money.",
    concept: "Independence & Gambler's Fallacy",
  },
  {
    q: "A weather model says 70% chance of rain for 3 consecutive days. What's the probability of rain on ALL 3 days?",
    options: ["70%", "34.3%", "210%", "0.7%"],
    correct: 1,
    explanation: "0.7 × 0.7 × 0.7 = 0.343 = 34.3%. When events are independent, their joint probability equals the product of individual probabilities — and it shrinks quickly.",
    concept: "Multiplication Rule for Independent Events",
  },
  {
    q: "A spam filter is 99% accurate. Only 1 in 10,000 emails is actually spam. You get a 'SPAM' alert. What's the real chance it IS spam?",
    options: ["99%", "~50%", "~1%", "0.01%"],
    correct: 2,
    explanation: "Bayes in action. With 10,000 emails, ~1 is spam (flagged correctly), but ~100 non-spam emails are falsely flagged. Only 1/101 ≈ 1% are real spam. Base rates dominate!",
    concept: "Bayes' Theorem & Base Rate Neglect",
  },
];

function QuizTab() {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);
  const [answers, setAnswers] = useState<number[]>([]);

  const q = QUESTIONS[current];
  const answered = selected !== null;

  const handleSelect = (i: number) => {
    if (answered) return;
    setSelected(i);
    if (i === q.correct) setScore((s) => s + 1);
    setAnswers((prev) => [...prev, i]);
  };

  const next = () => {
    if (current < QUESTIONS.length - 1) {
      setCurrent((c) => c + 1);
      setSelected(null);
    } else {
      setDone(true);
    }
  };

  const restart = () => {
    setCurrent(0); setSelected(null); setScore(0); setDone(false); setAnswers([]);
  };

  return (
    <AnimatePresence mode="wait">
      {!done ? (
        <motion.div key={current} initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }}>
          {/* Progress */}
          <div className="flex gap-2 mb-6">
            {QUESTIONS.map((_, i) => (
              <div
                key={i}
                className="h-1 flex-1 rounded-full transition-all duration-300"
                style={{ background: i <= current ? "#755B00" : "#e5e0da", opacity: i === current ? 1 : 0.6 }}
              />
            ))}
          </div>

          <p className="text-[10px] uppercase tracking-widest font-bold text-academic-muted mb-2">
            Question {current + 1} of {QUESTIONS.length} — {q.concept}
          </p>
          <h3 className="text-xl font-bold font-serif text-academic-text leading-tight mb-6">{q.q}</h3>

          <div className="space-y-3 mb-6">
            {q.options.map((opt, i) => {
              const isCorrect = i === q.correct;
              const isSelected = i === selected;
              let bg = "rgba(255,255,255,0.6)";
              let border = "#e5e0da";
              let color = "#1d1c17";
              if (answered) {
                if (isCorrect) { bg = "rgba(22,101,52,0.1)"; border = "#166534"; color = "#166534"; }
                else if (isSelected) { bg = "rgba(155,47,0,0.1)"; border = "#9B2F00"; color = "#9B2F00"; }
                else { color = "#a09890"; }
              }
              return (
                <button
                  key={i}
                  onClick={() => handleSelect(i)}
                  className="w-full text-left rounded-xl px-5 py-4 text-sm font-medium transition-all duration-200 border-2"
                  style={{ background: bg, borderColor: border, color }}
                >
                  <span className="font-mono mr-3 opacity-60">{String.fromCharCode(65 + i)}.</span>
                  {opt}
                </button>
              );
            })}
          </div>

          <AnimatePresence>
            {answered && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                <div
                  className="p-6 rounded-lg bg-white/60 backdrop-blur-xl border border-academic-border shadow-academic-sm"
                  style={{ borderLeftWidth: 4, borderLeftColor: selected === q.correct ? "#166534" : "#9B2F00" }}
                >
                  <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: selected === q.correct ? "#166534" : "#9B2F00" }}>
                    {selected === q.correct ? "✓ Correct!" : "✗ Incorrect"}
                  </p>
                  <p className="text-sm text-academic-muted leading-relaxed mb-4">{q.explanation}</p>
                  <button className="btn-primary px-8 py-3" onClick={next}>
                    {current < QUESTIONS.length - 1 ? "Next Question →" : "See Results"}
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ) : (
        <motion.div key="done" initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }}>
          <p className="text-xs font-bold uppercase tracking-widest text-secondary mb-4">Results</p>
          <h2 className="text-5xl font-bold font-serif mb-4">
            {score}/{QUESTIONS.length}{" "}
            <span className="text-secondary">
              {score === QUESTIONS.length ? "Perfect." : score >= 2 ? "Well done." : "Keep learning."}
            </span>
          </h2>
          <p className="text-academic-muted leading-relaxed mb-6">
            {score === QUESTIONS.length
              ? "You think like a probabilist. The universe is full of randomness — you now have the tools to navigate it."
              : "Probability is counter-intuitive by design. The more you practice, the sharper your instincts become."}
          </p>
          <button className="btn-primary px-8 py-3" onClick={restart}>Try Again</button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ── MAIN ──────────────────────────────────────────────────────────────────── */
const TABS = [
  { label: "🎱 Lottery Odds", comp: <LotteryTab /> },
  { label: "🧠 Probability Quiz", comp: <QuizTab /> },
];

const theoryItems = [
  { l: "Combinations", v: "$\\binom{n}{k} = \\frac{n!}{k!(n-k)!}$ — the number of ways to choose $k$ items from $n$ without regard to order." },
  { l: "Jackpot Odds", v: "$P(\\text{jackpot}) = \\frac{1}{\\binom{45}{6}} = \\frac{1}{8{,}145{,}060} \\approx 0.0000123\\%$" },
  { l: "Independent Events", v: "Two events are independent if knowing the outcome of one does not change the probability of the other: $P(A|B) = P(A)$" },
  { l: "Expected Value", v: "$E[X] = \\sum x_i P(x_i)$. For most lotteries, $E[X] < \\text{ticket cost}$, making them financially negative-expected games." },
];

export const LotteryEngine = () => {
  const [tab, setTab] = useState(0);
  const [speechOpen, setSpeechOpen] = useState(false);

  return (
    <SectionSection
      id="sim-lottery"
      speaker="4"
      label={SPEAKER_4_SPEECH.topic}
      title="The Daily Gamble"
      formula={SPEAKER_4_SPEECH.formula}
    >
      {/* Speech Panel */}
      <div className="mb-12">
        <button
          onClick={() => setSpeechOpen(!speechOpen)}
          className="flex items-center gap-3 text-sm font-bold uppercase tracking-widest text-secondary hover:text-primary transition-colors mb-4"
        >
          <span className={`transition-transform duration-300 ${speechOpen ? "rotate-90" : ""}`}>▶</span>
          {SPEAKER_4_SPEECH.name} — "{SPEAKER_4_SPEECH.teaser.slice(0, 60)}…"
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
                  "{SPEAKER_4_SPEECH.teaser}"
                </p>
                <div className="space-y-4">
                  {SPEAKER_4_SPEECH.points.map((pt, i) => (
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
