# Probability Lab — Design System (Ivory Archive)

## 1. Overview & Strategy: "The Academic Atelier"
This design merges high-end academic journal authority with frictionless modern luxury software. It uses intentional asymmetry and tonal depth to command respect.

## 2. Core Palette
| Name | Hex | Usage |
|---|---|---|
| **Background (Base)** | `#FEF9F1` | Warm paper foundation |
| **Surface (Card)** | `rgba(255,255,255,0.60)` | White glass, 60% opacity |
| **Primary** | `#9B2F00` | Sophisticated Burnt Orange (CTAs, high intent) |
| **Secondary** | `#755B00` | Refined Gold (accents, academic indicators) |
| **Neutral Text** | `#1D1C17` | On-surface near-black |
| **Tertiary** | `#0051AF` | Cold data points |

## 3. Typography
- **Headlines:** Inter (600-700 weight). Tracking `-0.02em` for ink-on-paper authority.
- **Body:** Inter (400-500 weight). Line-height `1.6`.
- **Labels:** Inter (All-Caps, 0.05em spacing).
- **Formulas:** Lora or Georgia (Serif fonts) for mathematical elegance.

## 4. Surfaces & Depth
- **The Glassmorphism Rule:** Cards use `backdrop-filter: blur(12px)` and white background at `60% opacity`.
- **The "No-Line" Rule:** Boundaries are defined via background shifts rather than 1px solid borders.
- **Floating Shadows:** Tincture shadows (0.04 opacity) mimic natural light.
- **Radius:** 18px for cards; 24px for Hero zones.

## 5. Interaction
- **Primary CTA:** Burnt Orange gradient `linear-gradient(135deg, #9B2F00 0%, #C2410C 100%)`.
- **Luminous Glow:** Subtle warm diffusion `box-shadow` on active states.
- **Transitions:** Slow (`300ms+`) ease-in-out transitions for luxury feel.

## 6. Formula Presentation
- **The Gold Pill:** Background `rgba(224,184,74,0.08)`, border `1px solid rgba(224,184,74,0.3)`. Contains serif-rendered KaTeX.

## 7. Insight Delivery
- **Insight Cards:** Reusable component with 4px gold left border and soft gold background.
