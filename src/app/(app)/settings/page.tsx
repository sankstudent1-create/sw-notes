"use client";

import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { Bell, Cloud, Lock, Eye, Type, Globe } from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="p-6 md:p-8 max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold font-heading text-[var(--text-primary)]">Settings</h1>
        <p className="text-[var(--text-secondary)] mt-1">Manage your app preferences and account.</p>
      </div>

      <div className="grid md:grid-cols-4 gap-8">
        {/* Settings Navigation */}
        <div className="md:col-span-1 space-y-1 hidden md:block">
          {[
            { name: "Appearance", icon: Eye, active: true },
            { name: "Notifications", icon: Bell, active: false },
            { name: "Sync & Backup", icon: Cloud, active: false },
            { name: "Privacy", icon: Lock, active: false },
          ].map((item, i) => (
            <button key={i} className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${item.active ? 'bg-[var(--paper)] text-[var(--text-primary)]' : 'text-[var(--text-secondary)] hover:bg-[var(--paper)] hover:text-[var(--text-primary)]'}`}>
              <item.icon className={`w-4 h-4 ${item.active ? 'text-[var(--accent)]' : ''}`} />
              <span>{item.name}</span>
            </button>
          ))}
        </div>

        {/* Settings Content */}
        <div className="md:col-span-3 space-y-6">
          <Card>
            <h2 className="text-xl font-bold font-heading text-[var(--text-primary)] mb-6 flex items-center">
              <Eye className="w-5 h-5 mr-2 text-[var(--accent)]" />
              Appearance
            </h2>
            
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-6 border-b border-[var(--paper)]">
                <div>
                  <h3 className="font-medium text-[var(--text-primary)]">Theme Preference</h3>
                  <p className="text-sm text-[var(--text-secondary)] mt-1">Choose between light and dark mode.</p>
                </div>
                <ThemeToggle />
              </div>

              <div className="flex items-center justify-between pb-6 border-b border-[var(--paper)]">
                <div>
                  <h3 className="font-medium text-[var(--text-primary)]">Base Font Size</h3>
                  <p className="text-sm text-[var(--text-secondary)] mt-1">Adjust the readability of your notes.</p>
                </div>
                <select className="bg-[var(--background)] border border-[var(--paper)] rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--accent)]">
                  <option>Small</option>
                  <option selected>Medium</option>
                  <option>Large</option>
                </select>
              </div>
            </div>
          </Card>

          <Card>
            <h2 className="text-xl font-bold font-heading text-[var(--text-primary)] mb-6 flex items-center">
              <Cloud className="w-5 h-5 mr-2 text-[var(--accent)]" />
              Sync & Data
            </h2>
            
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-6 border-b border-[var(--paper)]">
                <div>
                  <h3 className="font-medium text-[var(--text-primary)]">Cloud Sync</h3>
                  <p className="text-sm text-[var(--text-secondary)] mt-1">Back up your notes to SW Cloud.</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" value="" className="sr-only peer" defaultChecked />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[var(--accent)]/30 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-[var(--accent)]"></div>
                </label>
              </div>

              <div>
                <Button variant="secondary" className="w-full sm:w-auto">
                  Export All Data
                </Button>
                <p className="text-xs text-[var(--text-secondary)] mt-2">Download your notes as Markdown or JSON.</p>
              </div>
            </div>
          </Card>

          <div className="flex justify-end pt-4">
            <Button variant="danger" className="bg-transparent border border-[var(--danger)] text-[var(--danger)] hover:bg-[var(--danger)] hover:text-white">
              Log Out
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
