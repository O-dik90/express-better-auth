import { Router, Request, Response } from "express";
import { CreateMaster } from "src/controller/masters/index.js";
import { CreateMasterResponseSchema, CreateMasterSchema } from "src/controller/masters/schema.js";
import { validateBody } from "src/middleware/validate-body.js";
import { ValidateResponse } from "src/middleware/validate-response.js";

import z from "zod";

const router = Router();

export const ISchema = z.object({
  name: z.string().min(1, "Name is required"),
  category: z.string().min(1, "Category is required"),
  description: z.string().nullable(),
});
router.post(
  "/create-master", 
  validateBody(CreateMasterSchema), 
  async (req: Request, res: Response): Promise<void> => {
    const params = req.body;
    const result = await CreateMaster(params);
    ValidateResponse(result.status, CreateMasterResponseSchema, result, res);
  }
);

export default router;
