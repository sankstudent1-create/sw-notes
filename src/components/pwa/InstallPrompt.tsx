"use client";

import { useEffect, useState } from "react";
import { X, Download } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showPrompt, setShowPrompt] = useState(false);

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      // Show prompt only if not dismissed before
      if (!localStorage.getItem("pwa-prompt-dismissed")) {
        setShowPrompt(true);
      }
    };
    
    window.addEventListener("beforeinstallprompt", handler);
    
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === "accepted") {
      setShowPrompt(false);
    }
    setDeferredPrompt(null);
  };

  const handleDismiss = () => {
    setShowPrompt(false);
    localStorage.setItem("pwa-prompt-dismissed", "true");
  };

  if (!showPrompt) return null;

  return (
    <div className="fixed bottom-20 md:bottom-6 right-4 md:right-6 bg-[var(--card)] p-4 rounded-2xl shadow-[var(--shadow-lift)] border border-[var(--paper)] max-w-sm z-50 animate-in slide-in-from-bottom-5">
      <button onClick={handleDismiss} className="absolute top-3 right-3 text-gray-400 hover:text-[var(--text-primary)]">
        <X className="w-4 h-4" />
      </button>
      <div className="flex items-start space-x-3 pr-6">
        <div className="w-10 h-10 rounded-xl bg-[var(--accent)] flex items-center justify-center shrink-0">
          <Download className="w-5 h-5 text-white" />
        </div>
        <div>
          <h3 className="font-semibold text-[var(--text-primary)]">Install SW Notes</h3>
          <p className="text-xs text-[var(--text-secondary)] mt-1 mb-3">Install our app for offline access, focus mode, and better performance.</p>
          <Button size="sm" onClick={handleInstall} className="w-full">
            Install App
          </Button>
        </div>
      </div>
    </div>
  );
}
