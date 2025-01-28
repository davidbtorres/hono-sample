import { Note } from "./../types/note.js";

let notes: Note[] = [];

// Generate a unique ID
const generateId = (): string => Math.random().toString(36).substr(2, 9);

export const getNotes = (): Note[] => notes;

export const addNote = (text: string): Note => {
  const newNote: Note = { id: generateId(), text };
  notes.push(newNote);
  return newNote;
};

export const editNote = (id: string, text: string): Note | null => {
  const note = notes.find((n) => n.id === id);
  if (note) {
    note.text = text;
    return note;
  }
  return null;
};

export const deleteNote = (id: string): Note | null => {
  const index = notes.findIndex((n) => n.id === id);
  if (index !== -1) {
    const [deleted] = notes.splice(index, 1);
    return deleted;
  }
  return null;
};
