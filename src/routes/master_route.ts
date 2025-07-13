import { Router, Request, Response } from "express";
import { CreateMaster, DeleteMaster, GetListMaster, GetMaster, UpdateMaster } from "src/controller/masters/index.js";
import { MasterResponseSchema, CreateMasterSchema, GetListMasterResponseSchema, PaginationSchema } from "src/controller/masters/schema.js";
import { validateRequest } from "src/middleware/validate-req.js";
import { ValidateResponse } from "src/middleware/validate-response.js";
import z from "zod";

const router = Router();
router.post(
  "/create-master", 
  validateRequest({body: CreateMasterSchema}), 
  async (req: Request, res: Response): Promise<void> => {
    const params = req.body;
    const result = await CreateMaster(params);
    
    ValidateResponse(result.status, MasterResponseSchema, result, res);
  }
);

router.get("/get-list-master",
  validateRequest({params:PaginationSchema }) ,
  async (req: Request, res: Response): Promise<void> => {
    const params = PaginationSchema.parse(req.query);

    const result = await GetListMaster(params);

    ValidateResponse(result.status, GetListMasterResponseSchema, result, res);
  }
);

router.get("/get-master/:id", 
  validateRequest({
    params: z.object({id: z.string()})
  }),
  async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const result = await GetMaster(id);

    ValidateResponse(result.status, MasterResponseSchema, result, res);
  }
);

router.put("/update-master/:id",
  validateRequest({
    params: z.object({id: z.string()}),
    body: CreateMasterSchema
  }),
  async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const params = req.body;
    const result = await UpdateMaster(id, params);
    
    ValidateResponse(result.status, MasterResponseSchema, result, res);
  }
)

router.delete("/delete-master/:id",
  validateRequest({
    params: z.object({id: z.string()})
  }),
  async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const result = await DeleteMaster(id);

    ValidateResponse(result.status, MasterResponseSchema, result, res);
  }
)

export default router;
