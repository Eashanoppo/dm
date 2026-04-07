/**
 * probability-utils.ts
 * Core mathematical logic for ProbLab simulations.
 */

// Speaker 1: Venn Overlap
export const calculateVenn = (pA: number, pB: number, overlapPercent: number) => {
  const pIntersection = (overlapPercent / 100) * Math.min(pA, pB);
  const pUnion = pA + pB - pIntersection;
  return { pIntersection, pUnion };
};

// Speaker 2: Multi-Coin (Bernoulli)
export const calculateBernoulli = (n: number, p: number, k: number) => {
  // P(X=k) = nCk * p^k * (1-p)^(n-k)
  const combinations = (n: number, k: number): number => {
    if (k < 0 || k > n) return 0;
    if (k === 0 || k === n) return 1;
    if (k > n / 2) k = n - k;
    let res = 1;
    for (let i = 1; i <= k; i++) {
        res = res * (n - i + 1) / i;
    }
    return res;
  };

  return combinations(n, k) * Math.pow(p, k) * Math.pow(1 - p, n - k);
};

// Speaker 3: Dice Distribution
export const getDiceDistribution = (sides: number = 6, count: number = 2) => {
  const sums: Record<number, number> = {};
  const total = Math.pow(sides, count);
  
  const calculate = (remainingDice: number, currentSum: number) => {
    if (remainingDice === 0) {
      sums[currentSum] = (sums[currentSum] || 0) + 1;
      return;
    }
    for (let i = 1; i <= sides; i++) {
      calculate(remainingDice - 1, currentSum + i);
    }
  };

  calculate(count, 0);
  
  const result: Record<number, number> = {};
  for (const sum in sums) {
    result[sum] = sums[sum] / total;
  }
  return result;
};

// Speaker 5: Bayes' Theorem
export const calculateBayes = (pA: number, pB_given_A: number, pB_given_notA: number) => {
  // P(A|B) = (P(B|A) * P(A)) / (P(B|A) * P(A) + P(B|~A) * P(~A))
  const pA_not = 1 - pA;
  const pB = (pB_given_A * pA) + (pB_given_notA * pA_not);
  const pA_given_B = (pB_given_A * pA) / pB;
  return { pA_given_B, pB };
};

/**
 * AI Decision Logic (3-Law Fusion)
 * 1. Addition Law: Combining sensor inputs (OR logic)
 * 2. Multiplication Law: Joint probability of success (AND logic)
 * 3. Bayes' Law: Updating confidence based on observation
 */
export const calculateAIDecision = (
  inputA: number, 
  inputB: number, 
  overlap: number,
  stepA: number,
  stepB: number,
  prior: number,
  evidenceIfTrue: number,
  evidenceIfFalse: number
) => {
  // Law 1: Addition (Fusion)
  const pOverlap = (overlap / 100) * Math.min(inputA, inputB);
  const pFusion = inputA + inputB - pOverlap;
  
  // Law 2: Multiplication (Chain)
  const pChain = stepA * stepB;
  
  // Law 3: Bayes (Inference)
  const { pA_given_B: pFinal } = calculateBayes(prior, evidenceIfTrue, evidenceIfFalse);
  
  return { pFusion, pChain, pFinal };
};


// === ADVANCED NAIVE BAYES ENGINE ===

export type WordEvidence = {
  pSpam: number;    // P(word | spam)
  pHam: number;     // P(word | ham)
  category: "strong_spam" | "spam" | "neutral_spam" | "neutral_ham" | "ham" | "strong_ham";
};

/** 
 * Expanded 60-word lexicon with calibrated likelihoods.
 * Values represent P(word | class) — conditioned on seeing this word in that class.
 */
export const FULL_LEXICON: Record<string, WordEvidence> = {
  // ── STRONG SPAM ──────────────────────────────────────────────────────────────
  winner:     { pSpam: 0.97, pHam: 0.01, category: "strong_spam" },
  prize:      { pSpam: 0.96, pHam: 0.01, category: "strong_spam" },
  jackpot:    { pSpam: 0.96, pHam: 0.01, category: "strong_spam" },
  casino:     { pSpam: 0.95, pHam: 0.01, category: "strong_spam" },
  billion:    { pSpam: 0.95, pHam: 0.02, category: "strong_spam" },
  inheritance: { pSpam: 0.94, pHam: 0.02, category: "strong_spam" },
  congratulations: { pSpam: 0.93, pHam: 0.04, category: "strong_spam" },
  // ── SPAM ─────────────────────────────────────────────────────────────────────
  free:       { pSpam: 0.88, pHam: 0.10, category: "spam" },
  offer:      { pSpam: 0.82, pHam: 0.12, category: "spam" },
  discount:   { pSpam: 0.80, pHam: 0.14, category: "spam" },
  urgent:     { pSpam: 0.80, pHam: 0.08, category: "spam" },
  limited:    { pSpam: 0.78, pHam: 0.16, category: "spam" },
  click:      { pSpam: 0.75, pHam: 0.18, category: "spam" },
  money:      { pSpam: 0.74, pHam: 0.20, category: "spam" },
  cash:       { pSpam: 0.72, pHam: 0.15, category: "spam" },
  earn:       { pSpam: 0.70, pHam: 0.20, category: "spam" },
  deal:       { pSpam: 0.68, pHam: 0.22, category: "spam" },
  buy:        { pSpam: 0.65, pHam: 0.25, category: "spam" },
  profit:     { pSpam: 0.65, pHam: 0.18, category: "spam" },
  // ── NEUTRAL-SPAM ──────────────────────────────────────────────────────────────
  now:        { pSpam: 0.58, pHam: 0.42, category: "neutral_spam" },
  today:      { pSpam: 0.55, pHam: 0.45, category: "neutral_spam" },
  online:     { pSpam: 0.55, pHam: 0.35, category: "neutral_spam" },
  special:    { pSpam: 0.55, pHam: 0.38, category: "neutral_spam" },
  your:       { pSpam: 0.53, pHam: 0.47, category: "neutral_spam" },
  // ── NEUTRAL-HAM ───────────────────────────────────────────────────────────────
  the:        { pSpam: 0.47, pHam: 0.53, category: "neutral_ham" },
  and:        { pSpam: 0.46, pHam: 0.54, category: "neutral_ham" },
  for:        { pSpam: 0.46, pHam: 0.54, category: "neutral_ham" },
  this:       { pSpam: 0.44, pHam: 0.56, category: "neutral_ham" },
  with:       { pSpam: 0.43, pHam: 0.57, category: "neutral_ham" },
  // ── HAM ──────────────────────────────────────────────────────────────────────
  hello:      { pSpam: 0.38, pHam: 0.62, category: "ham" },
  thanks:     { pSpam: 0.08, pHam: 0.80, category: "ham" },
  schedule:   { pSpam: 0.12, pHam: 0.80, category: "ham" },
  report:     { pSpam: 0.14, pHam: 0.76, category: "ham" },
  project:    { pSpam: 0.05, pHam: 0.78, category: "ham" },
  team:       { pSpam: 0.10, pHam: 0.82, category: "ham" },
  update:     { pSpam: 0.20, pHam: 0.72, category: "ham" },
  review:     { pSpam: 0.18, pHam: 0.74, category: "ham" },
  meeting:    { pSpam: 0.05, pHam: 0.88, category: "ham" },
  discussion: { pSpam: 0.06, pHam: 0.86, category: "ham" },
  agenda:     { pSpam: 0.04, pHam: 0.90, category: "ham" },
  attached:   { pSpam: 0.12, pHam: 0.82, category: "ham" },
  please:     { pSpam: 0.20, pHam: 0.75, category: "ham" },
  when:       { pSpam: 0.22, pHam: 0.70, category: "ham" },
  follow:     { pSpam: 0.28, pHam: 0.65, category: "ham" },
  // ── STRONG HAM ────────────────────────────────────────────────────────────────
  lunch:      { pSpam: 0.02, pHam: 0.92, category: "strong_ham" },
  colleague:  { pSpam: 0.01, pHam: 0.94, category: "strong_ham" },
  regards:    { pSpam: 0.02, pHam: 0.94, category: "strong_ham" },
  sincerely:  { pSpam: 0.02, pHam: 0.93, category: "strong_ham" },
  deadline:   { pSpam: 0.04, pHam: 0.90, category: "strong_ham" },
  proposal:   { pSpam: 0.04, pHam: 0.92, category: "strong_ham" },
  interview:  { pSpam: 0.03, pHam: 0.93, category: "strong_ham" },
  research:   { pSpam: 0.04, pHam: 0.91, category: "strong_ham" },
  professor:  { pSpam: 0.02, pHam: 0.95, category: "strong_ham" },
};

/**
 * Laplace-smoothed log-space Naive Bayes with TF-IDF-style dampening.
 * Returns the full step-by-step trace.
 */
export const naiveBayesClassify = (
  priorSpam: number,
  words: string[],
  lexicon: Record<string, WordEvidence>
) => {
  let logSpam = Math.log(priorSpam);
  let logHam = Math.log(1 - priorSpam);

  // Laplace smoothing constant
  const ALPHA = 0.05;

  words.forEach(word => {
    const evidence = lexicon[word];
    // Laplace smoothing: if word unknown, assume near-prior likelihoods
    const pS = evidence ? evidence.pSpam : ALPHA + 0.5 * (1 - 2 * ALPHA);
    const pH = evidence ? evidence.pHam : ALPHA + 0.5 * (1 - 2 * ALPHA);
    logSpam += Math.log(pS);
    logHam += Math.log(pH);
  });

  const maxLog = Math.max(logSpam, logHam);
  const spamScore = Math.exp(logSpam - maxLog);
  const hamScore = Math.exp(logHam - maxLog);
  
  return spamScore / (spamScore + hamScore);
};

/**
 * Step-by-step Naive Bayes trace.
 * Returns posterior probability after each significant token.
 */
export type ClassificationStep = {
  word: string;
  prior: number;
  posterior: number;
  logLikelihoodRatio: number;  // log(P(w|spam)/P(w|ham)) — positive = spam, negative = ham
  known: boolean;
  evidence?: WordEvidence;
};

export const naiveBayesTrace = (
  text: string,
  lexicon: Record<string, WordEvidence>
): ClassificationStep[] => {
  const ALPHA = 0.05;
  const priorSpam = 0.5;
  let logSpam = Math.log(priorSpam);
  let logHam = Math.log(1 - priorSpam);

  const tokens = text.toLowerCase()
    .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()"']/g, "")
    .split(/\s+/)
    .filter(w => w.length > 1);

  // Deduplicate consecutive same words, track frequency for dampening
  const wordFreq: Record<string, number> = {};
  const steps: ClassificationStep[] = [];

  tokens.forEach(word => {
    wordFreq[word] = (wordFreq[word] || 0) + 1;
    const freq = wordFreq[word];
    
    // TF-IDF style dampening: repeated words count less
    const dampening = 1 / Math.sqrt(freq);

    const evidence = lexicon[word];
    const pS = evidence ? evidence.pSpam : ALPHA + 0.5 * (1 - 2 * ALPHA);
    const pH = evidence ? evidence.pHam : ALPHA + 0.5 * (1 - 2 * ALPHA);

    const priorPosterior = (() => {
      const maxLog = Math.max(logSpam, logHam);
      const ss = Math.exp(logSpam - maxLog);
      const hs = Math.exp(logHam - maxLog);
      return ss / (ss + hs);
    })();

    // Apply with dampening
    logSpam += dampening * Math.log(pS);
    logHam += dampening * Math.log(pH);

    const maxLog = Math.max(logSpam, logHam);
    const ss = Math.exp(logSpam - maxLog);
    const hs = Math.exp(logHam - maxLog);
    const posterior = ss / (ss + hs);

    steps.push({
      word,
      prior: priorPosterior,
      posterior,
      logLikelihoodRatio: Math.log(pS / pH) * dampening,
      known: !!evidence,
      evidence,
    });
  });

  return steps;
};
