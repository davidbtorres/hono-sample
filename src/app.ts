import { Hono } from "hono";
import { getNotes, addNote, editNote, deleteNote } from "./store/notes";
import type { Note } from "./types/note.js";

const app = new Hono();

// Get all notes
app.get("/notes", (c) => {
  const notes = getNotes();
  return c.json<Note[]>(notes);
});

// Add a new note
app.post("/notes", async (c) => {
  const body = await c.req.json<{ text: string }>();
  if (!body.text) {
    return c.json({ error: "Text is required" }, 400);
  }

  const newNote = addNote(body.text);
  return c.json<Note>(newNote, 201);
});

// Edit a note
app.put("/notes/:id", async (c) => {
  const id = c.req.param("id");
  const body = await c.req.json<{ text: string }>();
  if (!body.text) {
    return c.json({ error: "Text is required" }, 400);
  }

  const updatedNote = editNote(id, body.text);
  if (!updatedNote) {
    return c.json({ error: "Note not found" }, 404);
  }

  return c.json<Note>(updatedNote);
});

// Delete a note
app.delete("/notes/:id", (c) => {
  const id = c.req.param("id");
  const deletedNote = deleteNote(id);
  if (!deletedNote) {
    return c.json({ error: "Note not found" }, 404);
  }

  return c.json<Note>(deletedNote);
});

export default app;
