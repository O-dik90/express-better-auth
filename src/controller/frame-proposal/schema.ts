import z from "zod";

export const DetailFrameSchema = z.object({
  id: z.string().optional(),
  title: z.string().toUpperCase().min(1, "Title is required")
})
export const FrameProposalSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, "Name is required"),
  init: z.string().min(1, "Init is required"),
  description: z.string().nullable(),
  detail: z.array(DetailFrameSchema).optional().nullable(),
  createAt: z.date().optional(),
  updateAt: z.date().optional(),
});