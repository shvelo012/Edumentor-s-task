import { z } from "zod";

export const StageSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  durationWeeks: z.number().int().positive().optional(),
  resources: z.array(z.string()).optional(),
  prerequisites: z.array(z.string()).optional()
});

export const SyllabusSchema = z.object({
  skill: z.string().min(1),
  totalWeeks: z.number().int().positive().optional(),
  stages: z.array(StageSchema).min(1)
});

export type SyllabusType = z.infer<typeof SyllabusSchema>;
