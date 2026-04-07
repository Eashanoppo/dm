"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GlassCard, SectionSection, TheoryBoard, PlayingCard, InsightBox } from "../ui/AcademicUI";

type Card = { suit: string; rank: string; color: string };

const SUITS = ["Hearts", "Diamonds", "Clubs", "Spades"];
const RANKS = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];

export const CardEngine = () => {
    const [deck, setDeck] = useState<Card[]>([]);
    const [history, setHistory] = useState<Card[]>([]);
    const [lastCard, setLastCard] = useState<Card | null>(null);

    const initDeck = () => {
        const newDeck: Card[] = [];
        SUITS.forEach(suit => {
            RANKS.forEach(rank => {
                newDeck.push({
                    suit,
                    rank,
                    color: (suit === "Hearts" || suit === "Diamonds") ? "red" : "black"
                });
            });
        });
        setDeck(shuffle(newDeck));
        setHistory([]);
        setLastCard({ suit: "Spades", rank: "K", color: "black" });
    };

    const shuffle = (array: Card[]) => {
        const newArray = [...array];
        for (let i = newArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
        }
        return newArray;
    };

    useEffect(() => {
        initDeck();
    }, []);

    const drawCard = () => {
        if (deck.length === 0) return;
        const newDeck = [...deck];
        const card = newDeck.pop()!;
        setDeck(newDeck);
        setLastCard(card);
        setHistory(prev => [card, ...prev]);
    };

    const calculateProb = (condition: (c: Card) => boolean) => {
        if (deck.length === 0) return 0;
        const matches = deck.filter(condition).length;
        return matches / deck.length;
    };

    const theoryItems = [
        { l: "Conditional P(A|B)", v: "The probability of A happening *given* that B has already occurred." },
        { l: "Dependency", v: "Unlike dice, deck probability changes with every draw (Memory)." },
        { l: "Face Cards", v: "There are 12 face cards (J, Q, K) in a 52-card deck ($3 \\times 4$ suits)." }
    ];

    return (
        <SectionSection
            id="speaker4"
            speaker="4"
            label="Conditional Complexity"
            title="Smart Card Engine"
            formula={`P(A|B) = \\frac{P(A \\cap B)}{P(B)}`}
        >
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_350px] gap-12 mb-16">
                
                {/* Visual Simulation Area */}
                <div className="space-y-8">
                    <GlassCard className="p-12 min-h-[500px] flex flex-col items-center justify-center bg-white/40 overflow-hidden relative">
                        
                        {/* The Drawing Table */}
                        <div className="flex flex-col md:flex-row items-center justify-center gap-16 mb-16 w-full">
                           
                           {/* The Deck Stack */}
                           <div className="relative w-48 h-64">
                              <div className="absolute inset-0 bg-paper-gold border-2 border-secondary-gold/50 rounded-xl flex flex-col items-center justify-center text-secondary-gold shadow-academic-lg group">
                                 <span className="text-6xl font-serif font-bold">{deck.length}</span>
                                 <span className="text-[10px] uppercase tracking-widest font-bold opacity-60">Deck Count</span>
                                 <div className="absolute top-2 left-2 w-4 h-4 bg-secondary rounded-full" />
                              </div>
                              
                              {/* Visual deck depth */}
                              {[...Array(5)].map((_, i) => (
                                 <div 
                                    key={i} 
                                    className="absolute inset-0 bg-paper-muted border border-academic-border rounded-xl -z-10 translate-x-1 translate-y-1" 
                                    style={{ transform: `translate(${i*2.5}px, ${i*2.5}px)` }} 
                                 />
                              ))}
                           </div>

                           {/* Drawn Card Slot */}
                           <div className="w-48 h-64 border-4 border-dashed border-academic-border rounded-[24px] flex items-center justify-center relative">
                              <AnimatePresence mode="wait">
                                 {lastCard ? (
                                    <motion.div
                                       key={`${lastCard.rank}-${lastCard.suit}`}
                                       initial={{ scale: 0, rotateY: 180, x: -300 }}
                                       animate={{ scale: 1, rotateY: 0, x: 0 }}
                                       exit={{ scale: 0, y: 100, opacity: 0 }}
                                       transition={{ type: "spring", stiffness: 200, damping: 20 }}
                                       className="z-10"
                                    >
                                       <PlayingCard {...lastCard} className="w-40 h-56" />
                                    </motion.div>
                                 ) : (
                                    <span className="text-academic-muted italic font-serif opacity-40">Place Draw Here</span>
                                 )}
                              </AnimatePresence>
                           </div>

                        </div>

                        <div className="flex flex-col sm:flex-row gap-4">
                           <button onClick={drawCard} disabled={deck.length === 0} className="btn-primary">Draw Next Card</button>
                           <button onClick={initDeck} className="px-10 py-4 bg-secondary text-white rounded-xl font-bold hover:scale-105 transition-transform flex items-center gap-2">
                               <span>Reshuffle & Clear</span>
                           </button>
                        </div>
                    </GlassCard>

                    {/* Conditional Monitors Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[
                            { label: "Next card is Red", condition: (c: Card) => c.color === "red" },
                            { label: "Next card is Heart", condition: (c: Card) => c.suit === "Hearts" },
                            { label: "Next card is Rank J/Q/K", condition: (c: Card) => ["J", "Q", "K"].includes(c.rank) },
                        ].map((row, i) => (
                            <GlassCard key={i} className="p-6 border-b-4 border-secondary/20">
                                <h4 className="text-[10px] font-bold uppercase tracking-widest text-academic-muted mb-4">{row.label}</h4>
                                <div className="flex items-end justify-between mb-2">
                                   <span className="text-3xl font-serif font-bold text-academic-text">{(calculateProb(row.condition) * 100).toFixed(1)}%</span>
                                   <span className="text-[10px] text-secondary font-bold">P(A|B)</span>
                                </div>
                                <div className="w-full h-1 bg-paper-muted rounded-full overflow-hidden">
                                   <motion.div 
                                      className="h-full bg-secondary-gold"
                                      animate={{ width: `${calculateProb(row.condition) * 100}%` }}
                                   />
                                </div>
                            </GlassCard>
                        ))}
                    </div>

                    {/* History Drawer - Horizontal Scrolling Container */}
                    <GlassCard className="p-8">
                        <h4 className="text-sm font-bold uppercase tracking-widest text-academic-muted mb-6">Drawn History (Memory Loop)</h4>
                        <div className="flex gap-4 overflow-x-auto pb-4 px-2 snap-x">
                           {history.map((card, i) => (
                               <motion.div 
                                 key={i}
                                 initial={{ scale: 0, x: 20 }}
                                 animate={{ scale: 1, x: 0 }}
                                 className="snap-start flex-shrink-0"
                               >
                                   <PlayingCard {...card} className="w-20 h-28 text-sm" />
                               </motion.div>
                           ))}
                           {history.length === 0 && (
                               <p className="text-academic-muted italic font-serif py-10 opacity-40">No cards drawn yet...</p>
                           )}
                        </div>
                    </GlassCard>
                </div>

                {/* Sidebar Theory Component */}
                <TheoryBoard 
                   title="Theory Board" 
                   items={theoryItems} 
                />
            </div>

            <InsightBox 
              className="mt-16 max-w-3xl mx-auto"
              text="Unlike coins or dice, a deck of cards has a 'history.' The future depends on the cards already drawn." 
            />
        </SectionSection>
    );
};
