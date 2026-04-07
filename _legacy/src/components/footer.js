/**
 * Insight Card Component (Gold Accent Academic Card)
 */
export const renderInsight = (text) => {
    return `
    <div class="insight-box glass-card">
        <blockquote class="insight-text">
            "${text}"
        </blockquote>
    </div>
    <style>
        .insight-box {
            max-width: 800px;
            margin: 2.5rem auto 0;
            border-left: 4px solid var(--color-secondary);
            background: rgba(224, 184, 74, 0.05);
            padding: 2rem 2.5rem;
            position: relative;
        }

        .insight-text {
            font-family: var(--font-serif);
            font-size: 1.2rem;
            line-height: 1.5;
            color: var(--color-text);
            font-style: italic;
        }
    </style>
    `;
};

/**
 * Footer Component (Dark Warm Academic Style)
 */
export const renderFooter = () => {
    return `
    <footer class="main-footer">
        <div class="container footer-content">
            <div class="footer-grid">
                <div class="footer-brand">
                    <h3>ProbLab</h3>
                    <p>Calculated Truth at Scale.</p>
                </div>
                <div class="footer-table">
                    <table>
                        <thead>
                            <tr>
                                <th>Focus</th>
                                <th>Hook</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr><td>Rules</td><td>“Why probability matters”</td></tr>
                            <tr><td>Coins</td><td>“How computers think”</td></tr>
                            <tr><td>Dice</td><td>“Random ≠ equal”</td></tr>
                            <tr><td>Cards</td><td>“Real-world complexity”</td></tr>
                            <tr><td>AI</td><td>“Future is probability”</td></tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div class="footer-bottom">
                <p>&copy; 2026 ProbLab. All rights reserved.</p>
            </div>
        </div>
        <style>
            .main-footer {
                background: #1C1310;
                color: #C1B5B1;
                padding: 4rem 0 2rem;
                margin-top: 5rem;
            }

            .footer-grid {
                display: grid;
                grid-template-columns: 1fr 2fr;
                gap: 4rem;
                margin-bottom: 3rem;
            }

            .footer-brand h3 {
                color: var(--color-primary);
                font-size: 1.8rem;
                margin-bottom: 0.5rem;
            }

            .footer-table table {
                width: 100%;
                border-collapse: collapse;
            }

            .footer-table th, .footer-table td {
                padding: 1rem;
                text-align: left;
                border-bottom: 1px solid rgba(255,255,255,0.1);
            }

            .footer-table th {
                color: var(--color-secondary);
                text-transform: uppercase;
                font-size: 0.8rem;
                letter-spacing: 1px;
            }

            .footer-bottom {
                text-align: center;
                font-size: 0.9rem;
                opacity: 0.5;
                border-top: 1px solid rgba(255,255,255,0.1);
                padding-top: 2rem;
            }

            @media (max-width: 768px) {
                .footer-grid { grid-template-columns: 1fr; }
            }
        </style>
    </footer>
    `;
};
