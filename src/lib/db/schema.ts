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
