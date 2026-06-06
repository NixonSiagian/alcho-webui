/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, ChevronRight, ChefHat, Flame, Zap, ArrowRight, X } from 'lucide-react';
import { Link } from 'react-router-dom';

const FLAVOR_QUESTIONS = [
  {
    id: 1,
    question: "What is your primary application?",
    options: ["Meat & Proteins", "Snacks & Chips", "Soups & Broths", "Sauces & Glazes"]
  },
  {
    id: 2,
    question: "Which flavor profile do you prioritize?",
    options: ["Classic Savory (Umami)", "Spicy & Heat (Balado)", "Sweet & Aromatic", "Roasted & Smoky"]
  },
  {
    id: 3,
    question: "Scale of production?",
    options: ["Small Batch (Catering)", "Central Kitchen (Horeca)", "Industrial Factory (OEM)", "Distributor Portfolio"]
  }
];

export default function FlavorFinder() {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [isFinished, setIsFinished] = useState(false);

  const handleAnswer = (answer: string) => {
    const newAnswers = [...answers, answer];
    setAnswers(newAnswers);
    if (step < FLAVOR_QUESTIONS.length - 1) {
      setStep(step + 1);
    } else {
      setIsFinished(true);
    }
  };

  const reset = () => {
    setStep(0);
    setAnswers([]);
    setIsFinished(false);
    setIsOpen(false);
  };

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed bottom-8 right-8 z-50 bg-brand-primary text-brand-text px-8 py-4 rounded-full font-black uppercase tracking-widest shadow-2xl hover:scale-105 transition-all flex items-center gap-3 active:scale-95"
      >
        <Zap size={20} fill="currentColor" />
        Flavor Finder
      </button>

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 sm:p-12">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={reset}
              className="absolute inset-0 bg-brand-bg/90 backdrop-blur-xl"
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 40 }}
              className="relative w-full max-w-2xl bg-brand-card border border-brand-border-strong rounded-[3rem] p-12 overflow-hidden shadow-2xl"
            >
              <button 
                onClick={reset}
                className="absolute top-8 right-8 text-brand-text-secondary hover:text-brand-text transition-colors"
              >
                <X size={24} />
              </button>

              {!isFinished ? (
                <div className="space-y-12">
                  <div>
                    <p className="text-brand-primary text-[10px] uppercase font-bold tracking-[0.4em] mb-4">Step {step + 1} of {FLAVOR_QUESTIONS.length}</p>
                    <h2 className="text-brand-text text-3xl font-black uppercase">{FLAVOR_QUESTIONS[step].question}</h2>
                  </div>

                  <div className="grid gap-4">
                    {FLAVOR_QUESTIONS[step].options.map((opt, i) => (
                      <button
                        key={i}
                        onClick={() => handleAnswer(opt)}
                        className="w-full p-6 text-left bg-brand-fill border border-brand-border-strong rounded-2xl text-brand-text font-bold hover:bg-brand-primary/10 hover:border-brand-primary/30 transition-all flex items-center justify-between group"
                      >
                        {opt}
                        <ChevronRight size={18} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="text-center space-y-12">
                  <div className="w-24 h-24 bg-brand-primary/10 rounded-3xl flex items-center justify-center text-brand-primary mx-auto">
                    <ChefHat size={48} />
                  </div>
                  <div>
                    <h2 className="text-brand-text text-4xl font-black uppercase mb-4">Flavor Profile Matched.</h2>
                    <p className="text-brand-text-secondary">Based on your requirement for <span className="text-brand-text font-bold">{answers[1]}</span> in <span className="text-brand-text font-bold">{answers[0]}</span>, we have several industrial SKU benchmarks ready.</p>
                  </div>
                  
                  <div className="flex flex-col gap-4">
                    <Link 
                      to="/products" 
                      onClick={reset}
                      className="btn-primary py-6 flex items-center justify-center gap-3 text-lg"
                    >
                      View Recommended SKU <ArrowRight size={20} />
                    </Link>
                    <button 
                      onClick={reset}
                      className="text-brand-text-secondary text-sm font-bold uppercase tracking-widest hover:text-brand-text transition-colors"
                    >
                      Restart Discovery
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
