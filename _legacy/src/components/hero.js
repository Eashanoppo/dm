/**
 * Hero Section Component (Premium Editorial Academic Style)
 */
export const renderHero = () => {
    return `
    <header id="hero" class="hero-section section visible">
        <div class="container hero-content">
            <h1 class="hero-title">Probability: <br><span class="highlight">From Coins to AI</span></h1>
            <div class="math-pill-container">
                <div class="math-pill" id="hero-formula">P(A ∪ B) = P(A) + P(B) - P(A ∩ B)</div>
            </div>
            <p class="hero-subtitle">Explore the mathematical fabric of the universe through 5 interactive simulations. Real-world applications for a refined academic perspective.</p>
            <div class="hero-actions">
                <a href="#speaker1" class="btn-primary">Explore Simulations</a>
            </div>
            <div class="hero-cards">
                <div class="preview-card" data-target="speaker1">
                    <span class="preview-icon">F</span>
                    <h4>Fundamentals</h4>
                    <p>The logic of overlap.</p>
                </div>
                <div class="preview-card" data-target="speaker2">
                    <span class="preview-icon">C</span>
                    <h4>Coins</h4>
                    <p>Binary computing core.</p>
                </div>
                <div class="preview-card" data-target="speaker3">
                    <span class="preview-icon">D</span>
                    <h4>Dice</h4>
                    <p>Patterns & Distribution.</p>
                </div>
                <div class="preview-card" data-target="speaker4">
                    <span class="preview-icon">K</span>
                    <h4>Cards</h4>
                    <p>Conditional Probability.</p>
                </div>
                <div class="preview-card" data-target="speaker5">
                    <span class="preview-icon">A</span>
                    <h4>AI</h4>
                    <p>Future is probability.</p>
                </div>
            </div>
        </div>
    </header>
    <style>
        .hero-section {
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            text-align: center;
            padding-top: 80px;
        }

        .hero-content {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 2rem;
            max-width: 900px;
        }

        .hero-title {
            font-size: 4.5rem;
            line-height: 1.1;
            margin-bottom: 0.5rem;
            color: var(--color-text);
        }

        .highlight {
            color: var(--color-primary);
        }

        .math-pill-container {
            height: 60px;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 1rem 0;
        }

        .hero-subtitle {
            font-size: 1.25rem;
            color: var(--color-muted);
            max-width: 650px;
            margin-bottom: 1.5rem;
        }

        .hero-cards {
            display: flex;
            gap: 1rem;
            margin-top: 4rem;
            flex-wrap: wrap;
            justify-content: center;
        }

        .preview-card {
            background: var(--color-surface);
            border: 1px solid var(--color-border);
            padding: 1.5rem;
            border-radius: var(--radius-md);
            width: 180px;
            transition: all var(--trans-time) var(--ease-base);
            cursor: pointer;
            text-align: center;
        }

        .preview-card:hover {
            transform: translateY(-8px);
            border-color: var(--color-secondary);
            box-shadow: var(--shadow-md);
        }

        .preview-icon {
            display: block;
            font-size: 1.5rem;
            font-weight: 700;
            margin-bottom: 0.5rem;
            color: var(--color-secondary);
            font-family: var(--font-serif);
        }

        .preview-card h4 {
            font-size: 1.1rem;
            margin-bottom: 0.25rem;
        }

        .preview-card p {
            font-size: 0.85rem;
            color: var(--color-muted);
        }

        @media (max-width: 768px) {
            .hero-title { font-size: 3rem; }
            .hero-cards { display: grid; grid-template-columns: repeat(2, 1fr); }
            .preview-card { width: 100%; }
        }
    </style>
    `;
};

export const initHeroLogic = () => {
    const formulas = [
        "P(A ∪ B) = P(A) + P(B) - P(A ∩ B)",
        "|S| = 2ⁿ",
        "P(X=x) = \\binom{n}{x} p^x (1-p)^{n-x}",
        "P(A|B) = \\frac{P(B|A)P(A)}{P(B)}",
        "P(A_{i} | B) = \\frac{P(B | A_{i}) P(A_{i})}{\\sum_{j=1}^{k} P(B | A_{j}) P(A_{j})}"
    ];

    const formulaEl = document.getElementById('hero-formula');
    let currentIndex = 0;

    const updateFormula = () => {
        currentIndex = (currentIndex + 1) % formulas.length;
        formulaEl.style.opacity = '0';

        setTimeout(() => {
            formulaEl.innerHTML = formulas[currentIndex];
            if (window.katex) {
                window.katex.render(formulas[currentIndex], formulaEl, { throwOnError: false });
            }
            formulaEl.style.opacity = '1';
        }, 300);
    };

    if (window.katex) {
        window.katex.render(formulas[0], formulaEl, { throwOnError: false });
    }

    setInterval(updateFormula, 4000);

    // Card navigation
    document.querySelectorAll('.preview-card').forEach(card => {
        card.addEventListener('click', () => {
            const id = card.getAttribute('data-target');
            document.getElementById(id).scrollIntoView({ behavior: 'smooth' });
        });
    });
};
