import { z } from "zod";

export const createNoteSchema = z.object({
  text: z
    .string()
    .min(1, "Text is required")
    .max(255, "Text must be less than 255 characters"),
});

export const updateNoteSchema = z.object({
  id: z.string().uuid("Invalid ID format"),
  text: z
    .string()
    .min(1, "Text is required")
    .max(255, "Text must be less than 255 characters"),
});
