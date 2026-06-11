"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { RichEditor } from "@/components/editor/RichEditor";
import { ArrowLeft, Save, MoreVertical, Share2, Clock, Download } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Modal } from "@/components/ui/Modal";
import { useParams, useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import html2pdf from "html2pdf.js";

export default function NoteEditorPage() {
  const params = useParams();
  const router = useRouter();
  const supabase = createClient();
  const noteId = params.id as string;
  
  const editorRef = useRef<HTMLDivElement>(null);

  const [note, setNote] = useState<any>(null);
  const [notebook, setNotebook] = useState<any>(null);
  const [subject, setSubject] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  const [content, setContent] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [isFlashcardModalOpen, setIsFlashcardModalOpen] = useState(false);
  const [fcFront, setFcFront] = useState("");
  const [fcBack, setFcBack] = useState("");

  const loadData = useCallback(async () => {
    setIsLoading(true);
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      router.push('/login');
      return;
    }

    const { data: noteData, error: noteError } = await supabase
      .from('notes')
      .select('*')
      .eq('id', noteId)
      .single();

    if (noteError) {
      console.error(noteError);
      setIsLoading(false);
      return;
    }

    setNote(noteData);
    setContent(noteData.content || "");

    const { data: notebookData } = await supabase
      .from('notebooks')
      .select('*')
      .eq('id', noteData.notebook_id)
      .single();

    if (notebookData) {
      setNotebook(notebookData);

      const { data: subjectData } = await supabase
        .from('subjects')
        .select('*')
        .eq('id', notebookData.subject_id)
        .single();
      
      if (subjectData) {
        setSubject(subjectData);
      }
    }
    
    setIsLoading(false);
  }, [noteId, router, supabase]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleCreateFlashcard = async () => {
    if (!fcFront.trim() || !fcBack.trim() || !note) return;
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { error } = await supabase.from('flashcards').insert({
        note_id: noteId,
        user_id: user.id,
        front: fcFront,
        back: fcBack,
        difficulty: 0,
        next_review_date: new Date().toISOString(),
        interval: 1,
        repetitions: 0,
        ease_factor: 2.5
      });

      if (error) throw error;

      setIsFlashcardModalOpen(false);
      setFcFront("");
      setFcBack("");
      alert("Flashcard created and added to your review queue!");
    } catch (e) {
      console.error(e);
    }
  };

  const handleSave = async () => {
    if (!note) return;
    setIsSaving(true);
    try {
      const { error } = await supabase
        .from('notes')
        .update({
          content,
          updated_at: new Date().toISOString()
        })
        .eq('id', note.id);

      if (error) throw error;
      
      setNote({ ...note, updated_at: new Date().toISOString() });
    } catch (e) {
      console.error(e);
    } finally {
      setTimeout(() => setIsSaving(false), 800);
    }
  };

  const handleDownloadPDF = () => {
    if (!editorRef.current) return;
    
    const element = editorRef.current;
    const opt = {
      margin:       1,
      filename:     `${note?.title || 'Note'}.pdf`,
      image:        { type: 'jpeg', quality: 0.98 },
      html2canvas:  { scale: 2, useCORS: true },
      jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
    };

    html2pdf().set(opt).from(element).save();
  };

  if (isLoading && !note) return <div className="p-8">Loading note...</div>;
  if (!note) return <div className="p-8">Note not found.</div>;

  return (
    <div className="flex flex-col h-full bg-[var(--background)]">
      {/* Top Header */}
      <div className="h-16 border-b border-[var(--paper)] bg-[var(--card)] px-4 flex items-center justify-between shrink-0 sticky top-0 z-10 shadow-sm">
        <div className="flex items-center space-x-4">
          <Link href={`/notebooks/${note.notebook_id || note.notebookId}`} className="p-2 -ml-2 rounded-full text-gray-500 hover:text-[var(--text-primary)] hover:bg-[var(--paper)] transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="font-heading font-bold text-lg text-[var(--text-primary)] truncate max-w-[200px] sm:max-w-md">
                {notebook?.title || "..."} / {note.title}
              </h1>
              {subject && <Badge variant={subject.color as any}>{subject.name}</Badge>}
            </div>
            <div className="flex items-center text-xs text-gray-400 mt-0.5">
              <Clock className="w-3 h-3 mr-1" />
              {isSaving ? "Saving..." : `Last edited ${new Date(note.updated_at || note.updatedAt).toLocaleDateString()}`}
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Button 
            variant="ghost" 
            className="text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
            onClick={() => setIsFlashcardModalOpen(true)}
          >
            <span className="hidden sm:inline">+ Flashcard</span>
            <span className="sm:hidden">+</span>
          </Button>
          
          <Button 
            variant="ghost" 
            size="sm"
            className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] hidden sm:inline-flex"
            onClick={handleDownloadPDF}
          >
            <Download className="w-4 h-4 mr-2" />
            PDF Export
          </Button>
          
          <div className="w-px h-6 bg-gray-200 dark:bg-gray-700 mx-1 hidden sm:block"></div>
          <Button variant="ghost" size="sm" className="hidden sm:inline-flex" onClick={handleSave}>
            <Save className="w-4 h-4 mr-2" />
            Save
          </Button>
          <Button variant="ghost" size="sm" className="hidden sm:inline-flex"><Share2 className="w-4 h-4" /></Button>
          <Button variant="ghost" size="sm"><MoreVertical className="w-4 h-4" /></Button>
        </div>
      </div>

      {/* Editor Workspace */}
      <div className="flex-1 overflow-hidden p-4 md:p-8 max-w-5xl mx-auto w-full">
        {/* We attach the ref to the container we want to export */}
        <div ref={editorRef} className="h-full print:p-8 print:bg-white print:text-black">
          <RichEditor 
            content={content} 
            onChange={setContent} 
          />
        </div>
      </div>

      {/* Manual Flashcard Modal */}
      <Modal isOpen={isFlashcardModalOpen} onClose={() => setIsFlashcardModalOpen(false)} title="Create Flashcard">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-[var(--text-primary)] mb-1">Front (Question)</label>
            <textarea 
              className="w-full rounded-[var(--radius-card)] border border-gray-300 dark:border-gray-700 bg-[var(--background)] px-4 py-2 text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)] min-h-[80px]"
              placeholder="e.g. What is Newton's First Law?"
              value={fcFront}
              onChange={(e) => setFcFront(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[var(--text-primary)] mb-1">Back (Answer)</label>
            <textarea 
              className="w-full rounded-[var(--radius-card)] border border-gray-300 dark:border-gray-700 bg-[var(--background)] px-4 py-2 text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)] min-h-[80px]"
              placeholder="e.g. An object at rest stays at rest..."
              value={fcBack}
              onChange={(e) => setFcBack(e.target.value)}
            />
          </div>
          <div className="pt-4 flex justify-end space-x-3">
            <Button variant="ghost" onClick={() => setIsFlashcardModalOpen(false)}>Cancel</Button>
            <Button onClick={handleCreateFlashcard}>Create Card</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
