"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      const sections = ["hero", "sim-slider", "speaker1", "sim-realworld", "sim-tech", "sim-lottery", "speaker5"];
      const scrollPos = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element && scrollPos >= element.offsetTop && scrollPos < element.offsetTop + element.offsetHeight) {
          setActiveSection(section);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { id: "hero", label: "Home" },
    { id: "sim-slider", label: "Intro" },
    { id: "speaker1", label: "Fundamentals" },
    { id: "sim-realworld", label: "Real World" },
    { id: "sim-tech", label: "Tech & AI" },
    { id: "sim-lottery", label: "Lottery  " },
    { id: "speaker5", label: "AI Engine" },
  ];

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 w-full h-[70px] z-[1000] transition-all duration-300 flex items-center border-b",
        scrolled ? "bg-white/70 backdrop-blur-xl border-academic-border" : "bg-transparent border-transparent"
      )}
    >
      <div className="max-w-[1200px] mx-auto w-full px-8 flex justify-between items-center">
        <Link href="#hero" className="flex items-center gap-0.5 group">
          <span className="font-serif text-2xl font-bold text-academic-text">ProbLab</span>
          <span className="w-1.5 h-1.5 bg-secondary rounded-full mt-1.5 transition-transform group-hover:scale-125" />
        </Link>

        <ul className="hidden md:flex items-center gap-10 list-none">
          {navLinks.map((link) => (
            <li key={link.id}>
              <Link
                href={`#${link.id}`}
                className={cn(
                  "text-[0.95rem] font-medium transition-all duration-300 pb-1 border-b-2 hover:text-academic-text",
                  activeSection === link.id ? "text-academic-text border-secondary" : "text-academic-muted border-transparent"
                )}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden lg:block">
          <button className="px-6 py-2 border border-academic-border rounded-full text-xs font-bold uppercase tracking-widest hover:bg-academic-text hover:text-white transition-all">
            Research Tool
          </button>
        </div>
      </div>
    </nav>
  );
};
