import { z } from "zod";

export const CreateMasterSchema = z.object({
  name: z.string().min(1, "Name is required"),
  category: z.string().min(1, "Category is required"),
  description: z.string().nullable(),
});

export const CreateMasterResponseSchema = z.object({
  status: z.number(),
  message: z.string(),
  data: CreateMasterSchema.optional(),
});
// Type inference
export type ICreateMaster = z.infer<typeof CreateMasterSchema>;
