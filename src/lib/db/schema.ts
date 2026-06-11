import Dexie, { Table } from 'dexie';

export interface User {
  id?: number;
  name: string;
  email: string;
  avatar?: string;
  class?: string;
  examGoal?: string;
  createdAt: Date;
}

export interface Subject {
  id?: number;
  name: string;
  color: string;
  icon: string;
  archived: boolean;
  createdAt: Date;
}

export interface Notebook {
  id?: number;
  subjectId: number;
  title: string;
  coverStyle: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Note {
  id?: number;
  notebookId: number;
  title: string;
  content: string; // HTML string or JSON
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Flashcard {
  id?: number;
  noteId?: number;
  deckId?: number;
  front: string;
  back: string;
  difficulty: number; // For SRS
  nextReviewDate: Date;
  interval: number;
  repetitions: number;
  easeFactor: number;
}

export class SWNotesDatabase extends Dexie {
  users!: Table<User, number>;
  subjects!: Table<Subject, number>;
  notebooks!: Table<Notebook, number>;
  notes!: Table<Note, number>;
  flashcards!: Table<Flashcard, number>;

  constructor() {
    super('SWNotesDB');
    this.version(1).stores({
      users: '++id, email',
      subjects: '++id, name',
      notebooks: '++id, subjectId, title',
      notes: '++id, notebookId, title, updatedAt',
      flashcards: '++id, noteId, deckId, nextReviewDate',
    });
  }
}

export const db = new SWNotesDatabase();

// Seed data
db.on('populate', async () => {
  await db.subjects.bulkAdd([
    { name: "Physics", color: "sage", icon: "BookOpen", archived: false, createdAt: new Date() },
    { name: "Chemistry", color: "terracotta", icon: "BookOpen", archived: false, createdAt: new Date() },
    { name: "Mathematics", color: "amber", icon: "BookOpen", archived: false, createdAt: new Date() },
    { name: "Biology", color: "lavender", icon: "BookOpen", archived: false, createdAt: new Date() },
  ]);

  await db.notebooks.bulkAdd([
    { subjectId: 1, title: "Thermodynamics", coverStyle: "sage", createdAt: new Date(), updatedAt: new Date() },
    { subjectId: 1, title: "Kinematics", coverStyle: "sage", createdAt: new Date(), updatedAt: new Date() },
    { subjectId: 3, title: "Calculus", coverStyle: "amber", createdAt: new Date(), updatedAt: new Date() },
  ]);

  await db.notes.add({
    notebookId: 1,
    title: "Zeroth Law & Temperature",
    content: "<h1>Zeroth Law & Temperature</h1><p>If body A is in thermal equilibrium with body B...</p>",
    tags: ["physics", "thermodynamics"],
    createdAt: new Date(),
    updatedAt: new Date()
  });

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);

  await db.flashcards.bulkAdd([
    { 
      deckId: 1, 
      front: "What is the First Law of Thermodynamics?", 
      back: "Energy cannot be created or destroyed, only transformed. (ΔU = Q - W)",
      difficulty: 0,
      nextReviewDate: new Date(), // Due today
      interval: 1,
      repetitions: 0,
      easeFactor: 2.5
    },
    { 
      deckId: 1, 
      front: "Define Entropy (S)", 
      back: "A measure of the number of specific ways in which a thermodynamic system may be arranged, commonly understood as a measure of disorder.",
      difficulty: 0,
      nextReviewDate: new Date(), // Due today
      interval: 1,
      repetitions: 0,
      easeFactor: 2.5
    },
    { 
      deckId: 1, 
      front: "What is an Isothermal process?", 
      back: "A thermodynamic process in which the temperature of a system remains constant (ΔT = 0).",
      difficulty: 0,
      nextReviewDate: tomorrow, // Not due
      interval: 1,
      repetitions: 0,
      easeFactor: 2.5
    }
  ]);
});
