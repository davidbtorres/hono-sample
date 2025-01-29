import { Hono } from "hono";
import { z } from "zod";
import { createNoteSchema, updateNoteSchema } from "./schemas/notes";
import { getNotes, addNote, editNote, deleteNote } from "./store/notes";
import type { Note } from "./types/note.js";

const app = new Hono();

// Utility function to validate with Zod
const validate = <T>(schema: z.Schema<T>, data: unknown): T => {
  try {
    return schema.parse(data);
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw new Error(error.errors.map((e) => e.message).join(", "));
    }
    throw error;
  }
};

// Get all notes
app.get("/notes", (c) => {
  const notes = getNotes();
  return c.json<Note[]>(notes);
});

// Add a new note
app.post("/notes", async (c) => {
  try {
    const body = await c.req.json();
    const validatedBody = validate(createNoteSchema, body);
    const newNote = addNote(validatedBody.text);
    return c.json(newNote, 201);
  } catch (error) {
    return c.json({ error: error.message }, 400);
  }
});

// Edit a note
app.put("/notes/:id", async (c) => {
  try {
    const id = c.req.param("id");
    const body = await c.req.json();
    const validatedBody = validate(updateNoteSchema, { id, ...body });
    const updatedNote = editNote(validatedBody.id, validatedBody.text);
    if (!updatedNote) {
      return c.json({ error: "Note not found" }, 404);
    }
    return c.json(updatedNote);
  } catch (error) {
    return c.json({ error: error.message }, 400);
  }
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
