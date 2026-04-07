import { Hero } from "@/components/Hero";
import { ProbLabApp } from "@/components/ProbLabApp";

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <Hero />

      {/* Interactive Simulation Layer (Client Shell) */}
      <ProbLabApp />

      {/* Final Curator Insight (Static Server Content) */}
      <section className="py-32 bg-[#1C1310] overflow-hidden relative">
         <div className="absolute top-0 left-0 w-full h-full bg-paper/5 -z-10" />
         <div className="max-w-[800px] mx-auto text-center px-8">
            <h2 className="text-secondary-gold text-4xl font-serif font-bold mb-8">The Curator's Conclusion</h2>
            <p className="text-white/60 text-xl font-serif italic leading-relaxed mb-12">
               "Probability is not the absence of knowledge, but the measurement of its limits. In the gap between 0 and 1, we find the architecture of the future."
            </p>
            <div className="w-16 h-1 bg-secondary-gold mx-auto" />
         </div>
      </section>
    </div>
  );
}
