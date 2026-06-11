"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";

interface FlashCardProps {
  front: React.ReactNode;
  back: React.ReactNode;
  onResult?: (difficulty: "easy" | "good" | "hard" | "again") => void;
}

export function FlashCard({ front, back, onResult }: FlashCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div className="w-full max-w-lg mx-auto aspect-[4/3] perspective-1000 relative group">
      <motion.div
        className="w-full h-full relative preserve-3d cursor-pointer"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, type: "spring", stiffness: 200, damping: 20 }}
        onClick={() => !isFlipped && setIsFlipped(true)}
      >
        {/* Front */}
        <div className="absolute inset-0 w-full h-full backface-hidden bg-[var(--card)] rounded-2xl p-8 shadow-[var(--shadow-lift)] flex items-center justify-center border-t-4 border-[var(--accent)] text-center">
          <div className="text-xl md:text-2xl font-medium text-[var(--text-primary)]">
            {front}
          </div>
          {!isFlipped && (
            <div className="absolute bottom-4 left-0 right-0 text-center text-xs text-[var(--text-secondary)] opacity-50 group-hover:opacity-100 transition-opacity">
              Tap to reveal
            </div>
          )}
        </div>

        {/* Back */}
        <div className="absolute inset-0 w-full h-full backface-hidden bg-[var(--paper)] rounded-2xl p-8 shadow-[var(--shadow-lift)] flex flex-col items-center justify-center border-t-4 border-[var(--amber)] text-center [transform:rotateY(180deg)]">
          <div className="text-lg md:text-xl text-[var(--text-primary)] flex-1 flex items-center justify-center overflow-y-auto">
            {back}
          </div>
          
          {/* SRS Buttons */}
          <div className="w-full grid grid-cols-4 gap-2 mt-6 shrink-0" onClick={(e) => e.stopPropagation()}>
            <Button variant="danger" size="sm" onClick={() => onResult?.("again")}>
              Again
            </Button>
            <Button variant="secondary" size="sm" onClick={() => onResult?.("hard")}>
              Hard
            </Button>
            <Button className="bg-[var(--accent)] hover:bg-[#7a8e79]" size="sm" onClick={() => onResult?.("good")}>
              Good
            </Button>
            <Button className="bg-blue-500 hover:bg-blue-600" size="sm" onClick={() => onResult?.("easy")}>
              Easy
            </Button>
          </div>
        </div>
      </motion.div>

      {/* Injecting tailwind 3D utilities for convenience */}
      <style jsx global>{`
        .perspective-1000 {
          perspective: 1000px;
        }
        .preserve-3d {
          transform-style: preserve-3d;
        }
        .backface-hidden {
          backface-visibility: hidden;
        }
      `}</style>
    </div>
  );
}
