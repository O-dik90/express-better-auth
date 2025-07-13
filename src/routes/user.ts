import { Router } from "express";
import { auth } from "src/auth.js";

const router = Router();
router.post(
  "/create-user",
  async (req, res): Promise<void> => {
    const params = req.body;

    const result = await auth.api.signUpEmail({
      body: {
        name: params.name,
        email: params.email,
        password: params.password,
      }
    })
    res.status(200).json(result);
  }
);

router.post(
  "/login",
  async (req, res): Promise<void> => {
    const params = req.body;
    const result = await auth.api.signInEmail({
      body: {
        email: params.email,
        password: params.password,
      }
    })
    res.status(200).json(result);
  }  
);


export default router;