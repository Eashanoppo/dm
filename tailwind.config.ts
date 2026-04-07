import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        paper: {
          DEFAULT: "#FEF9F1",
          gold: "rgba(224, 184, 74, 0.08)",
          muted: "#F8F3EB",
        },
        primary: {
          DEFAULT: "#9B2F00",
          hover: "#C2410C",
        },
        secondary: {
          DEFAULT: "#755B00",
          gold: "#E0B84A",
        },
        academic: {
          text: "#1D1C17",
          muted: "#59413A",
          border: "rgba(141, 113, 104, 0.12)",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "ui-sans-serif", "system-ui"],
        serif: ["var(--font-lora)", "ui-serif", "Georgia", "serif"],
      },
      borderRadius: {
        lg: "18px",
        xl: "24px",
      },
      backgroundImage: {
        "paper-grad": "linear-gradient(135deg, #FEF9F1 0%, #F1ECE4 100%)",
        "primary-grad": "linear-gradient(135deg, #9B2F00 0%, #C2410C 100%)",
      },
      boxShadow: {
        "academic-sm": "0 4px 16px rgba(89, 65, 58, 0.04)",
        "academic-md": "0 12px 32px rgba(89, 65, 58, 0.06)",
        "academic-lg": "0 20px 48px rgba(89, 65, 58, 0.08)",
      },
    },
  },
  plugins: [],
};
export default config;
