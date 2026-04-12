"use client";

import React, { useState, useEffect } from "react";
import { ProbabilitySlider } from "./simulations/ProbabilitySlider";
import { VennEngine }       from "./simulations/VennEngine";
import { RealWorldEngine }  from "./simulations/RealWorldEngine";
import { TechEngine }       from "./simulations/TechEngine";
import { LotteryEngine }    from "./simulations/LotteryEngine";
import { AIEngine }         from "./simulations/AIEngine";

export const ProbLabApp = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="py-24 text-center">
        <p className="text-academic-muted italic font-serif">Initialzing Simulation Engines...</p>
      </div>
    );
  }

  return (
    <>
      <ProbabilitySlider />
      <VennEngine />
      <RealWorldEngine />
      <TechEngine />
      <LotteryEngine />
      <AIEngine />
    </>
  );
};
