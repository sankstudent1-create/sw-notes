"use client";

import { useState } from "react";
import { ArrowLeft, Bookmark, MoreVertical, Search, Plus, List } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { useParams, useRouter } from "next/navigation";
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "@/lib/db/schema";
import { Modal } from "@/components/ui/Modal";
import { Input } from "@/components/ui/Input";

export default function NotebookPage() {
  const params = useParams();
  const router = useRouter();
  const notebookId = Number(params.id);
  
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newNoteTitle, setNewNoteTitle] = useState("");

  const notebook = useLiveQuery(() => db.notebooks.get(notebookId), [notebookId]);
  const notes = useLiveQuery(() => db.notes.where({ notebookId }).sortBy('createdAt'), [notebookId]) || [];

  const handleCreateNote = async () => {
    if (!newNoteTitle.trim()) return;
    try {
      const id = await db.notes.add({
        notebookId,
        title: newNoteTitle,
        content: `<h1>${newNoteTitle}</h1><p>Start writing here...</p>`,
        tags: [],
        createdAt: new Date(),
        updatedAt: new Date()
      });
      setIsModalOpen(false);
      setNewNoteTitle("");
      router.push(`/notes/${id}`);
    } catch (e) {
      console.error(e);
    }
  };

  if (!notebook) return <div className="p-8">Loading notebook...</div>;

  return (
    <div className="flex h-full relative">
      {/* Chapter Sidebar */}
      <div className={`w-64 border-r border-[var(--paper)] bg-[var(--background)] flex-shrink-0 transition-all duration-300 ${sidebarOpen ? 'ml-0' : '-ml-64'} md:ml-0 md:block absolute md:relative z-20 h-full shadow-lg md:shadow-none`}>
        <div className="p-4 border-b border-[var(--paper)] flex items-center justify-between">
          <h3 className="font-semibold text-[var(--text-primary)]">Chapters</h3>
          <Button variant="ghost" size="sm" onClick={() => setSidebarOpen(false)} className="md:hidden">
            <ArrowLeft className="w-4 h-4" />
          </Button>
        </div>
        <div className="overflow-y-auto h-[calc(100%-60px)]">
          {notes.map((note) => (
            <Link key={note.id} href={`/notes/${note.id}`} className="block p-4 border-b border-[var(--paper)] hover:bg-[var(--paper)] transition-colors">
              <div className="flex justify-between items-start">
                <h4 className="font-medium text-sm text-[var(--text-primary)] line-clamp-2">{note.title}</h4>
                <Bookmark className="w-3 h-3 text-gray-400 shrink-0 mt-1" />
              </div>
              <p className="text-xs text-gray-500 mt-1">{note.createdAt.toLocaleDateString()}</p>
            </Link>
          ))}
          {notes.length === 0 && (
            <div className="p-4 text-sm text-gray-500">No notes yet.</div>
          )}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-full bg-[var(--paper)] relative overflow-hidden">
        {/* Notebook Top Bar */}
        <div className="h-14 border-b border-[var(--terracotta)]/30 bg-[var(--paper)]/80 backdrop-blur flex items-center justify-between px-4 sticky top-0 z-10">
          <div className="flex items-center">
            <button onClick={() => setSidebarOpen(true)} className="md:hidden p-2 mr-2 text-[var(--text-secondary)] hover:text-[var(--text-primary)]">
              <List className="w-5 h-5" />
            </button>
            <Link href={`/subjects/${notebook.subjectId}`} className="p-2 text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <h2 className="ml-2 font-title text-2xl font-bold text-[var(--text-primary)] line-clamp-1">{notebook.title}</h2>
          </div>
          <div className="flex items-center space-x-2 shrink-0">
            <Button variant="ghost" size="sm"><Search className="w-4 h-4" /></Button>
            <Button variant="ghost" size="sm"><MoreVertical className="w-4 h-4" /></Button>
            <Button size="sm" onClick={() => setIsModalOpen(true)}><Plus className="w-4 h-4 mr-1" /> Add Note</Button>
          </div>
        </div>

        {/* Notebook Paper Area */}
        <div className="flex-1 overflow-y-auto notebook-paper p-8 pl-16">
          <div className="notebook-margin hidden sm:block"></div>
          
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="text-center mb-12">
              <h1 className="font-title text-5xl text-[var(--text-primary)]">{notebook.title}</h1>
              <p className="font-heading text-[var(--text-secondary)] mt-2">Notebook Details</p>
            </div>

            {notes.map(note => (
              <Link key={note.id} href={`/notes/${note.id}`} className="block">
                <div className="group border-b border-transparent hover:border-[var(--terracotta)]/30 transition-colors pb-4 cursor-pointer">
                  <div className="flex justify-between items-end mb-2">
                    <h3 className="text-xl font-bold font-heading text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors">
                      {note.title}
                    </h3>
                    <span className="text-sm font-heading text-gray-500">{note.createdAt.toLocaleDateString()}</span>
                  </div>
                  {/* Extract plain text from HTML content (naively) for preview */}
                  <p className="text-[var(--text-secondary)] text-sm font-body line-clamp-2">
                    {note.content.replace(/<[^>]*>?/gm, '')}
                  </p>
                </div>
              </Link>
            ))}
            
            <div className="py-8 flex justify-center">
              <Button variant="ghost" className="text-[var(--accent)] font-heading text-lg" onClick={() => setIsModalOpen(true)}>
                <Plus className="w-5 h-5 mr-2" />
                Start writing a new note...
              </Button>
            </div>
          </div>
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Create New Note">
        <div className="space-y-4">
          <Input 
            label="Note Title" 
            placeholder="e.g. Newton's First Law" 
            value={newNoteTitle}
            onChange={(e) => setNewNoteTitle(e.target.value)}
          />
          <div className="pt-4 flex justify-end space-x-3">
            <Button variant="ghost" onClick={() => setIsModalOpen(false)}>Cancel</Button>
            <Button onClick={handleCreateNote}>Create</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
