"use client";

import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
}

export function Modal({ isOpen, onClose, title, children }: ModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50"
          />
          <div className="fixed inset-0 flex items-center justify-center p-4 z-50 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
              className="bg-[var(--card)] w-full max-w-lg rounded-[var(--radius-large)] shadow-[var(--shadow-lift)] overflow-hidden pointer-events-auto"
            >
              <div className="flex items-center justify-between p-6 border-b border-[var(--paper)]">
                {title && (
                  <h2 className="text-xl font-semibold font-heading text-[var(--text-primary)]">
                    {title}
                  </h2>
                )}
                <button
                  onClick={onClose}
                  className="p-2 rounded-full hover:bg-[var(--paper)] text-gray-500 hover:text-[var(--text-primary)] transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="p-6">{children}</div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
