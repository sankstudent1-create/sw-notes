"use client";

import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Plus, Book, Clock, ArrowLeft, Search } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Input } from "@/components/ui/Input";

const MOCK_NOTEBOOKS = [
  { id: 1, title: "Thermodynamics", lastEdited: "2 hours ago", pages: 45 },
  { id: 2, title: "Kinematics", lastEdited: "3 days ago", pages: 120 },
  { id: 3, title: "Electromagnetism", lastEdited: "1 week ago", pages: 89 },
];

export default function SubjectDetailPage() {
  const params = useParams();
  const subjectId = params.id;
  
  // In a real app, fetch subject by ID
  const subject = { name: "Physics", color: "sage" };

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
              <p className="text-[var(--text-secondary)]">3 Notebooks</p>
            </div>
          </div>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            New Notebook
          </Button>
        </div>
      </div>

      <div className="max-w-md">
        <Input icon={<Search className="w-4 h-4" />} placeholder="Search notebooks..." />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {MOCK_NOTEBOOKS.map((notebook) => (
          <Link key={notebook.id} href={`/notebooks/${notebook.id}`}>
            <Card hoverable className="p-0 overflow-hidden group">
              {/* Notebook Cover Style */}
              <div className="h-32 bg-[var(--accent)] relative border-b-4 border-[rgba(0,0,0,0.1)]">
                <div className="absolute left-4 top-0 bottom-0 w-8 flex flex-col justify-evenly opacity-30">
                  {/* Spine binding effect */}
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="h-2 w-full bg-black rounded-r-md"></div>
                  ))}
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-white/90 dark:bg-black/50 px-4 py-2 rounded shadow-sm">
                    <span className="font-title text-xl font-bold text-gray-800 dark:text-gray-200">
                      {notebook.title}
                    </span>
                  </div>
                </div>
              </div>
              <div className="p-5 flex justify-between items-center bg-[var(--card)]">
                <div className="flex items-center text-xs text-[var(--text-secondary)]">
                  <Clock className="w-3 h-3 mr-1" />
                  {notebook.lastEdited}
                </div>
                <span className="text-xs font-medium text-gray-500 bg-[var(--paper)] px-2 py-1 rounded">
                  {notebook.pages} pages
                </span>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
