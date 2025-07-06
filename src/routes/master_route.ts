import { Router } from "express";
import { Master } from "src/controller/masters/index.js";

const router = Router();

router.post("/master",async (req, res) => {
  const params = req.body;

  const result = await Master(params);
  res.send(result);
});

export default router;
