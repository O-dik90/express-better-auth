import { Router, Request, Response } from "express";
import { CreateBaseProposal, DeleteBaseProposal, GetBaseProposal, GetListBaseProposal, UpdateBaseProposal } from "src/controller/base-proposal/index.js";
import { BaseProposalSchema, PaginationSchema, ResListBaseProposalSchema } from "src/controller/base-proposal/schema.js";
import { validateRequest } from "src/middleware/validate-req.js";
import { ValidateResponse } from "src/middleware/validate-response.js";
import z from "zod";
import { ResBaseProposalSchema } from '../controller/base-proposal/schema.js';

const router = Router();
router.post(
  "/create-master",
  validateRequest({ body: BaseProposalSchema }),
  async (req: Request, res: Response): Promise<void> => {
    const params = req.body;
    const result = await CreateBaseProposal(params);

    ValidateResponse(result.status, ResBaseProposalSchema, result, res);
  }
);

router.get("/get-list-master",
  validateRequest({ params: PaginationSchema }),
  async (req: Request, res: Response): Promise<void> => {
    const params = PaginationSchema.parse(req.query);

    const result = await GetListBaseProposal(params);

    ValidateResponse(result.status, ResListBaseProposalSchema, result, res);
  }
);

router.get("/get-master/:id",
  validateRequest({
    params: z.object({ id: z.string() })
  }),
  async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const result = await GetBaseProposal(id);

    ValidateResponse(result.status, ResBaseProposalSchema, result, res);
  }
);

router.put("/update-master/:id",
  validateRequest({
    params: z.object({ id: z.string() }),
    body: BaseProposalSchema
  }),
  async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const params = req.body;
    const result = await UpdateBaseProposal(id, params);

    ValidateResponse(result.status, ResBaseProposalSchema, result, res);
  }
)

router.delete("/delete-master/:id",
  validateRequest({
    params: z.object({ id: z.string() })
  }),
  async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const result = await DeleteBaseProposal(id);

    ValidateResponse(result.status, ResBaseProposalSchema, result, res);
  }
)

export default router;
