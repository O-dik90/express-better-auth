import { z } from "zod";

export const PaginationSchema = z.object({
  id: z.string().optional().default(""),
  keyword: z.string().optional().default(""),
  page: z.coerce.number().min(1).default(1),
  page_size: z.coerce.number().min(1).max(100).default(10),
  sort: z.enum(["asc", "desc"]).default("desc"),
});

export const BaseProposalSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, "Name is required"),
  category: z.string().min(1, "Category is required"),
  description: z.string().nullable(),
  createAt: z.date().optional(),
  updateAt: z.date().optional(),
});

export const ResBaseProposalSchema = z.object({
  status: z.number(),
  message: z.string(),
  data: BaseProposalSchema.optional().nullable(),
});

export const ResListBaseProposalSchema = z.object({
  status: z.number(),
  message: z.string(),
  data: z.array(BaseProposalSchema).optional().nullable(),
  meta: z.object({
    total: z.number(),
    page: z.number(),
    page_size: z.number(),
    total_pages: z.number().nullable(),
  }).optional()
});
// Type inference
export type IBaseProposal = z.infer<typeof BaseProposalSchema>;
export type IPaginationParams = z.infer<typeof PaginationSchema>;
