import Link from "next/link";

export const Footer = () => {
  return (
    <footer className="bg-[#1C1310] text-[#C1B5B1] py-16 mt-20 relative overflow-hidden">
      {/* Subtle paper-like texture overlay if needed */}
      <div className="max-w-[1200px] mx-auto px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-16 mb-12">
          <div className="flex flex-col gap-4">
            <h3 className="text-secondary-gold text-3xl font-serif font-bold">ProbLab</h3>
            <p className="text-lg opacity-80 leading-relaxed font-serif italic">
              "Calculated Truth at Scale. Exploring the mathematical fabric of the universe."
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="p-4 text-left text-secondary text-xs uppercase tracking-widest font-semibold">Focus</th>
                  <th className="p-4 text-left text-secondary text-xs uppercase tracking-widest font-semibold">Real-World Hook</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {[
                  { focus: "Fundamentals", hook: "The Logic of Overlap" },
                  { focus: "Coins", hook: "The Binary Foundations of Software" },
                  { focus: "Dice", hook: "Patterns Emerging from Randomness" },
                  { focus: "Cards", hook: "Conditional Complexity" },
                  { focus: "AI", hook: "Decision Making Under Uncertainty" },
                ].map((row, i) => (
                  <tr key={i} className="hover:bg-white/5 transition-colors">
                    <td className="p-4 text-sm font-medium">{row.focus}</td>
                    <td className="p-4 text-sm opacity-60 italic">— {row.hook}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="pt-12 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6 text-sm opacity-50">
          <p>&copy; 2026 ProbLab. All rights reserved.</p>
          <div className="flex gap-8">
            <Link href="#" className="hover:text-white transition-colors">Documentation</Link>
            <Link href="#" className="hover:text-white transition-colors">Academic Credits</Link>
            <Link href="#" className="hover:text-white transition-colors">Privacy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
