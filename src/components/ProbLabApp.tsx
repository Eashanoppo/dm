"use client";

import React, { useState, useEffect } from "react";
import { VennEngine } from "./simulations/VennEngine";
import { CoinEngine } from "./simulations/CoinEngine";
import { DiceEngine } from "./simulations/DiceEngine";
import { CardEngine } from "./simulations/CardEngine";
import { AIEngine } from "./simulations/AIEngine";

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
      <VennEngine />
      <CoinEngine />
      <DiceEngine />
      <CardEngine />
      <AIEngine />
    </>
  );
};
