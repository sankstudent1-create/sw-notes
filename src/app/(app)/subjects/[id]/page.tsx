"use client";

import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Plus, Book, Clock, ArrowLeft, Search } from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { Input } from "@/components/ui/Input";
import { useState, useEffect, useCallback } from "react";
import { Modal } from "@/components/ui/Modal";
import { createClient } from "@/lib/supabase/client";

export default function SubjectDetailPage() {
  const params = useParams();
  const subjectId = params.id as string;
  const router = useRouter();
  const supabase = createClient();
  
  const [subject, setSubject] = useState<any>(null);
  const [notebooks, setNotebooks] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [isCreating, setIsCreating] = useState(false);

  const loadData = useCallback(async () => {
    setIsLoading(true);
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      router.push('/login');
      return;
    }

    const { data: subjectData, error: subjectError } = await supabase
      .from('subjects')
      .select('*')
      .eq('id', subjectId)
      .single();

    if (subjectError) {
      console.error(subjectError);
      setIsLoading(false);
      return;
    }

    setSubject(subjectData);

    const { data: notebooksData, error: notebooksError } = await supabase
      .from('notebooks')
      .select('*')
      .eq('subject_id', subjectId)
      .order('updated_at', { ascending: false });

    if (!notebooksError) {
      setNotebooks(notebooksData || []);
    }
    
    setIsLoading(false);
  }, [subjectId, router, supabase]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleCreateNotebook = async () => {
    if (!newTitle.trim() || !subject) return;
    setIsCreating(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { error } = await supabase.from('notebooks').insert({
        subject_id: subjectId,
        user_id: user.id,
        title: newTitle,
        cover_style: subject.color || "sage",
      });

      if (error) throw error;

      setIsModalOpen(false);
      setNewTitle("");
      loadData();
    } catch (e) {
      console.error(e);
    } finally {
      setIsCreating(false);
    }
  };

  if (isLoading && !subject) return <div className="p-8">Loading subject...</div>;
  if (!subject) return <div className="p-8">Subject not found.</div>;

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-8">
      <div>
        <Link href="/subjects" className="inline-flex items-center text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] mb-4">
          <ArrowLeft className="w-4 h-4 mr-1" /> Back to Subjects
        </Link>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center bg-[var(--${subject.color})]/20 text-[var(--${subject.color})]`}>
              <Book className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-3xl font-bold font-heading text-[var(--text-primary)]">{subject.name}</h1>
              <p className="text-[var(--text-secondary)]">{notebooks.length} Notebooks</p>
            </div>
          </div>
          <Button onClick={() => setIsModalOpen(true)}>
            <Plus className="w-4 h-4 mr-2" />
            New Notebook
          </Button>
        </div>
      </div>

      <div className="max-w-md">
        <Input icon={<Search className="w-4 h-4" />} placeholder="Search notebooks..." />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {notebooks.map((notebook) => (
          <Link key={notebook.id} href={`/notebooks/${notebook.id}`}>
            <Card hoverable className="p-0 overflow-hidden group">
              {/* Notebook Cover Style */}
              <div className="h-32 relative border-b-4 border-[rgba(0,0,0,0.1)]" style={{ backgroundColor: `var(--${notebook.cover_style || notebook.coverStyle || 'sage'})` }}>
                <div className="absolute left-4 top-0 bottom-0 w-8 flex flex-col justify-evenly opacity-30">
                  {/* Spine binding effect */}
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="h-2 w-full bg-black rounded-r-md"></div>
                  ))}
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-white/90 dark:bg-black/50 px-4 py-2 rounded shadow-sm max-w-[80%] text-center">
                    <span className="font-title text-xl font-bold text-gray-800 dark:text-gray-200">
                      {notebook.title}
                    </span>
                  </div>
                </div>
              </div>
              <div className="p-5 flex justify-between items-center bg-[var(--card)]">
                <div className="flex items-center text-xs text-[var(--text-secondary)]">
                  <Clock className="w-3 h-3 mr-1" />
                  {new Date(notebook.updated_at || notebook.updatedAt).toLocaleDateString()}
                </div>
                <span className="text-xs font-medium text-gray-500 bg-[var(--paper)] px-2 py-1 rounded">
                  Notes inside
                </span>
              </div>
            </Card>
          </Link>
        ))}
        {notebooks.length === 0 && !isLoading && (
          <div className="col-span-full py-12 text-center text-[var(--text-secondary)] border-2 border-dashed border-[var(--paper)] rounded-2xl">
            No notebooks here yet. Click "New Notebook".
          </div>
        )}
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Create New Notebook">
        <div className="space-y-4">
          <Input 
            label="Notebook Title" 
            placeholder="e.g. Thermodynamics Chapter 1" 
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
          />
          <div className="pt-4 flex justify-end space-x-3">
            <Button variant="ghost" onClick={() => setIsModalOpen(false)}>Cancel</Button>
            <Button onClick={handleCreateNotebook} isLoading={isCreating}>Create</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
