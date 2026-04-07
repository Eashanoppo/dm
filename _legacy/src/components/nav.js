/**
 * Navigation Component (Frosted Glass Ivory Archive Style)
 */
export const renderNav = () => {
    return `
    <nav class="main-nav">
        <div class="container nav-content">
            <div class="logo">
                <span class="logo-text">ProbLab</span>
                <span class="logo-dot"></span>
            </div>
            <ul class="nav-links">
                <li><a href="#hero" class="active">Home</a></li>
                <li><a href="#speaker1">Fundamentals</a></li>
                <li><a href="#speaker2">Coins</a></li>
                <li><a href="#speaker3">Dice</a></li>
                <li><a href="#speaker4">Cards</a></li>
                <li><a href="#speaker5">AI</a></li>
            </ul>
        </div>
    </nav>
    <style>
        .main-nav {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 70px;
            background: rgba(254, 249, 241, 0.70);
            backdrop-filter: blur(16px);
            -webkit-backdrop-filter: blur(16px);
            border-bottom: 1px solid var(--color-border);
            z-index: 1000;
            display: flex;
            align-items: center;
        }

        .nav-content {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        .logo {
            display: flex;
            align-items: center;
            gap: 2px;
            font-family: var(--font-serif);
            font-size: 1.5rem;
            font-weight: 700;
            color: var(--color-text);
        }

        .logo-dot {
            width: 6px;
            height: 6px;
            background: var(--color-secondary);
            border-radius: 50%;
            margin-top: 6px;
        }

        .nav-links {
            display: flex;
            list-style: none;
            gap: 2.5rem;
        }

        .nav-links a {
            text-decoration: none;
            color: var(--color-muted);
            font-weight: 500;
            font-size: 0.95rem;
            transition: color var(--trans-time) var(--ease-base), border var(--trans-time) var(--ease-base);
            padding-bottom: 4px;
            border-bottom: 2px solid transparent;
        }

        .nav-links a:hover {
            color: var(--color-text);
        }

        .nav-links a.active {
            color: var(--color-text);
            border-bottom: 2px solid var(--color-secondary);
        }

        @media (max-width: 768px) {
            .nav-links { display: none; }
        }
    </style>
    `;
};

export const initNavScroll = () => {
    const links = document.querySelectorAll('.nav-links a');
    const sections = document.querySelectorAll('section');

    const observerOptions = {
        root: null,
        threshold: 0.5
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                links.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href').substring(1) === entry.target.id) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, observerOptions);

    sections.forEach(section => observer.observe(section));

    links.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const id = link.getAttribute('href').substring(1);
            const target = document.getElementById(id);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
};
