import { Note } from "./../types/note.js";
import { v4 as uuidv4 } from "uuid";

let notes: Note[] = [];

export const getNotes = (): Note[] => notes;

export const addNote = (text: string): Note => {
  const newNote: Note = { id: uuidv4(), text };
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
