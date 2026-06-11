"use client";

import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Plus, BookOpen, MoreVertical, Trash2, Edit3, Settings } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Modal } from "@/components/ui/Modal";
import { Input } from "@/components/ui/Input";
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "@/lib/db/schema";

export default function SubjectsPage() {
  const [isNewSubjectModalOpen, setIsNewSubjectModalOpen] = useState(false);
  const [newSubjectName, setNewSubjectName] = useState("");
  const [newSubjectColor, setNewSubjectColor] = useState("sage");
  const [isCreating, setIsCreating] = useState(false);

  const subjects = useLiveQuery(() => db.subjects.toArray(), []) || [];
  // Use a separate query to get counts or simply just assume 0 for now
  // Real implementation would join or do a count query per subject.
  // For simplicity, we just display the subjects.

  const handleCreateSubject = async () => {
    if (!newSubjectName.trim()) return;
    setIsCreating(true);
    try {
      await db.subjects.add({
        name: newSubjectName,
        color: newSubjectColor,
        icon: "BookOpen",
        archived: false,
        createdAt: new Date()
      });
      setIsNewSubjectModalOpen(false);
      setNewSubjectName("");
    } catch (e) {
      console.error("Failed to create subject", e);
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold font-heading text-[var(--text-primary)]">Subjects</h1>
          <p className="text-[var(--text-secondary)] mt-1">Organize your learning into subjects.</p>
        </div>
        <Button onClick={() => setIsNewSubjectModalOpen(true)}>
          <Plus className="w-4 h-4 mr-2" />
          New Subject
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {subjects.map((subject) => (
          <Link key={subject.id} href={`/subjects/${subject.id}`}>
            <Card hoverable className="p-0 overflow-hidden border-t-8 h-full flex flex-col" style={{ borderTopColor: `var(--color-${subject.color})` }}>
              <div className="p-6 flex-1 flex flex-col">
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center bg-[var(--${subject.color})]/20 text-[var(--${subject.color})]`}>
                    <BookOpen className="w-6 h-6" />
                  </div>
                  <button 
                    onClick={(e) => { e.preventDefault(); /* open menu */ }}
                    className="p-1 rounded hover:bg-gray-100 dark:hover:bg-[#3d352f] text-gray-400"
                  >
                    <MoreVertical className="w-5 h-5" />
                  </button>
                </div>
                <h2 className="text-xl font-bold font-heading text-[var(--text-primary)] mb-1">{subject.name}</h2>
                <p className="text-sm text-[var(--text-secondary)]">Notebooks inside</p>
              </div>
            </Card>
          </Link>
        ))}
        {subjects.length === 0 && (
          <div className="col-span-full py-12 text-center text-[var(--text-secondary)] border-2 border-dashed border-[var(--paper)] rounded-2xl">
            No subjects yet. Click "New Subject" to create one.
          </div>
        )}
      </div>

      <Modal 
        isOpen={isNewSubjectModalOpen} 
        onClose={() => setIsNewSubjectModalOpen(false)}
        title="Create New Subject"
      >
        <div className="space-y-4">
          <Input 
            label="Subject Name" 
            placeholder="e.g. History" 
            value={newSubjectName}
            onChange={(e) => setNewSubjectName(e.target.value)}
          />
          
          <div>
            <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">Color Theme</label>
            <div className="flex space-x-3">
              {["sage", "terracotta", "amber", "lavender"].map(c => (
                <button 
                  key={c}
                  onClick={() => setNewSubjectColor(c)}
                  className={`w-8 h-8 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 ring-offset-[var(--card)] focus:ring-[var(--${c})] border border-gray-200 dark:border-gray-700 ${newSubjectColor === c ? 'ring-2 ring-offset-2 ring-[var(--text-primary)]' : ''}`}
                  style={{ backgroundColor: `var(--${c})` }}
                />
              ))}
            </div>
          </div>

          <div className="pt-4 flex justify-end space-x-3">
            <Button variant="ghost" onClick={() => setIsNewSubjectModalOpen(false)}>Cancel</Button>
            <Button onClick={handleCreateSubject} isLoading={isCreating}>Create</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
