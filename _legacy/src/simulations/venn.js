import { renderInsight } from '../components/insightCard.js';

/**
 * Speaker 1: Venn Overlap Engine (Fundamentals)
 */
export const renderSpeaker1 = () => {
    return `
    <section id="speaker1" class="venn-section">
        <div class="container">
            <div class="section-header">
                <span class="label">Speaker 1: Fundamentals</span>
                <h2 class="section-title">Universal Rules & Overlap</h2>
                <div class="math-pill" id="venn-formula">P(A ∪ B) = P(A) + P(B) - P(A ∩ B)</div>
            </div>

            <div class="simulation-grid">
                <!-- Simulation Sidebar -->
                <div class="sim-sidebar">
                    <div class="glass-card control-panel">
                        <h3>Simulation Parameters</h3>
                        <div class="control-group">
                            <label>Interaction Intensity (P(A ∩ B))</label>
                            <input type="range" id="venn-slider" min="0" max="100" value="30">
                            <div class="slider-labels">
                                <span>Disjoint</span>
                                <span>Subset</span>
                            </div>
                        </div>
                        <div class="stats-display">
                            <div class="stat-item">
                                <span class="stat-label">P(A)</span>
                                <span class="stat-value">0.70</span>
                            </div>
                            <div class="stat-item">
                                <span class="stat-label">P(B)</span>
                                <span class="stat-value">0.60</span>
                            </div>
                            <div class="stat-item highlight">
                                <span class="stat-label">P(A ∩ B)</span>
                                <span class="stat-value" id="venn-intersection-val">0.30</span>
                            </div>
                            <div class="stat-divider"></div>
                            <div class="stat-item result">
                                <span class="stat-label">P(A ∪ B)</span>
                                <span class="stat-value" id="venn-union-val">1.00</span>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Visual Engine -->
                <div class="sim-visual glass-card">
                    <div id="venn-engine-container">
                        <svg id="venn-svg" viewBox="0 0 400 300">
                            <defs>
                                <filter id="glow">
                                    <feGaussianBlur stdDeviation="3.5" result="coloredBlur"/>
                                    <feMerge>
                                        <feMergeNode in="coloredBlur"/>
                                        <feMergeNode in="SourceGraphic"/>
                                    </feMerge>
                                </filter>
                            </defs>
                            <!-- Circle A -->
                            <circle id="circle-a" cx="150" cy="150" r="80" fill="rgba(155, 47, 0, 0.15)" stroke="var(--color-primary)" stroke-width="1.5" />
                            <!-- Circle B -->
                            <circle id="circle-b" cx="250" cy="150" r="80" fill="rgba(117, 91, 0, 0.15)" stroke="var(--color-secondary)" stroke-width="1.5" />
                            <!-- Highlight Overlap -->
                            <path id="overlap-path" fill="var(--color-glow-gold)" />
                        </svg>
                    </div>
                </div>
            </div>

            <div class="mapping-grid">
                <div class="mapping-card glass-card">
                    <span class="card-icon">DS</span>
                    <h4>Data Science</h4>
                    <p>Understanding SQL Joins and record overlap in large datasets.</p>
                </div>
                <div class="mapping-card glass-card">
                    <span class="card-icon">MR</span>
                    <h4>Market Research</h4>
                    <p>Analyzing consumer segments that fall into two different categories.</p>
                </div>
                <div class="mapping-card glass-card">
                    <span class="card-icon">SA</span>
                    <h4>Survey Analysis</h4>
                    <p>Detecting respondents who provide conflicting or overlapping answers.</p>
                </div>
            </div>

            ${renderInsight("Most people forget to subtract the overlap — mathematics does not.")}
        </div>
    </section>

    <style>
        .venn-section { border-top: 1px solid var(--color-border); }

        .section-header {
            text-align: center;
            margin-bottom: 4rem;
        }

        .label {
            display: block;
            color: var(--color-secondary);
            font-weight: 600;
            text-transform: uppercase;
            font-size: 0.8rem;
            letter-spacing: 0.1em;
            margin-bottom: 0.5rem;
        }

        .section-title {
            font-size: 3rem;
            margin-bottom: 1.5rem;
        }

        .simulation-grid {
            display: grid;
            grid-template-columns: 350px 1fr;
            gap: 2rem;
            margin-bottom: 4rem;
        }

        .control-panel h3 {
            font-size: 1.2rem;
            margin-bottom: 1.5rem;
            color: var(--color-text);
        }

        .control-group label {
            display: block;
            font-size: 0.9rem;
            color: var(--color-muted);
            margin-bottom: 0.75rem;
        }

        input[type="range"] {
            width: 100%;
            height: 4px;
            background: var(--color-border);
            border-radius: 2px;
            -webkit-appearance: none;
            cursor: pointer;
        }

        input[type="range"]::-webkit-slider-thumb {
            -webkit-appearance: none;
            width: 18px;
            height: 18px;
            background: var(--color-primary);
            border: 2px solid #fff;
            border-radius: 50%;
            box-shadow: 0 2px 6px rgba(0,0,0,0.1);
        }

        .slider-labels {
            display: flex;
            justify-content: space-between;
            font-size: 0.75rem;
            color: var(--color-muted);
            margin-top: 0.5rem;
        }

        .stats-display {
            margin-top: 2rem;
            display: flex;
            flex-direction: column;
            gap: 0.75rem;
        }

        .stat-item {
            display: flex;
            justify-content: space-between;
            font-size: 0.95rem;
        }

        .stat-label { color: var(--color-muted); }
        .stat-value { font-weight: 600; font-family: var(--font-serif); }

        .stat-item.highlight .stat-value { color: var(--color-secondary); }
        .stat-item.result { margin-top: 0.5rem; font-size: 1.2rem; }
        .stat-item.result .stat-value { color: var(--color-primary); }

        .stat-divider {
            height: 1px;
            background: var(--color-border);
            margin: 0.5rem 0;
        }

        .sim-visual {
            display: flex;
            align-items: center;
            justify-content: center;
            min-height: 400px;
        }

        #venn-svg {
            max-width: 500px;
            width: 100%;
            filter: drop-shadow(0 10px 20px rgba(0,0,0,0.02));
        }

        .mapping-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 1.5rem;
        }

        .mapping-card {
            text-align: center;
            padding: 2rem;
        }

        .card-icon {
            display: inline-block;
            width: 40px;
            height: 40px;
            line-height: 40px;
            background: var(--color-glow-gold);
            color: var(--color-secondary);
            font-weight: 700;
            border-radius: 8px;
            margin-bottom: 1rem;
        }

        .mapping-card h4 { margin-bottom: 0.75rem; }
        .mapping-card p { font-size: 0.9rem; color: var(--color-muted); }

        @media (max-width: 992px) {
            .simulation-grid { grid-template-columns: 1fr; }
            .mapping-grid { grid-template-columns: 1fr; }
        }
    </style>
    `;
};

export const initSpeaker1Logic = () => {
    const slider = document.getElementById('venn-slider');
    const circleB = document.getElementById('circle-b');
    const intersectionVal = document.getElementById('venn-intersection-val');
    const unionVal = document.getElementById('venn-union-val');

    const updateVenn = () => {
        const value = parseInt(slider.value); // 0 to 100
        const pA = 0.70;
        const pB = 0.60;
        const pIntersection = (value / 100) * Math.min(pA, pB); // Caps at min(A,B)
        const pUnion = pA + pB - pIntersection;

        // Visual update
        // We move circle B from cx=310 (disjoint-ish) to cx=150 (perfect subset/overlap)
        // Disjoint cx would be around 310, Overlap cx=150
        const minCx = 150;
        const maxCx = 310;
        const targetCx = maxCx - (value / 100) * (maxCx - minCx);
        
        circleB.setAttribute('cx', targetCx);

        // Update stats
        intersectionVal.textContent = pIntersection.toFixed(2);
        unionVal.textContent = pUnion.toFixed(2);
        
        if (window.katex) {
            const mathPill = document.getElementById('venn-formula');
            window.katex.render(`P(A \\cup B) = ${pA.toFixed(2)} + ${pB.toFixed(2)} - ${pIntersection.toFixed(2)} = ${pUnion.toFixed(2)}`, mathPill, { throwOnError: false });
        }
    };

    slider.addEventListener('input', updateVenn);
    updateVenn(); // Initial call
};
