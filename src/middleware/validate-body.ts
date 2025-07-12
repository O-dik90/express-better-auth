// middleware/validate-body.ts
import { ZodSchema } from "zod";
import { Request, Response, NextFunction, RequestHandler } from "express";

export const validateBody = <T>(schema: ZodSchema<T>): RequestHandler => {
  return (req: Request, res: Response, next: NextFunction): void => {
    try {
      const result = schema.safeParse(req.body);
      if (!result.success) {
        res.status(400).json({
          status: 400,
          message: "Validation error",
          errors: result.error.flatten().fieldErrors,
        });
        return;
      }
      req.body = result.data;
      next();
    } catch (error) {
      next(error);
    }
  };
};
