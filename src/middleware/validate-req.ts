import { ZodSchema } from "zod";
import { Request, Response, NextFunction, RequestHandler } from "express";

type RequestParts = "body" | "query" | "params";
type ValidationSchemas = Partial<Record<RequestParts, ZodSchema<any>>>;

interface ValidationErrorResponse {
  status: number;
  message: string;
  errors: Record<string, any>;
}

export const validateRequest = (schemas: ValidationSchemas): RequestHandler => {
  return (req: Request, res: Response, next: NextFunction): void => {
    try {
      // FIXED: Use more flexible error type
      const errors: Record<string, any> = {};

      for (const key of Object.keys(schemas) as RequestParts[]) {
        const schema = schemas[key];
        if (!schema) continue;

        const result = schema.safeParse(req[key]);
        if (!result.success) {
          const zodError = result.error.flatten();
          errors[key] = {
            fieldErrors: zodError.fieldErrors,
            formErrors: zodError.formErrors
          };
        } else {
          (req as any)[key] = result.data;
        }
      }

      if (Object.keys(errors).length > 0) {
        const errorResponse: ValidationErrorResponse = {
          status: 400,
          message: "Validation error",
          errors,
        };
        res.status(400).json(errorResponse);
        return;
      }

      next();
    } catch (err) {
      next(err);
    }
  };
};

export const validateBody = <T>(schema: ZodSchema<T>): RequestHandler => {
  return (req: Request, res: Response, next: NextFunction): void => {
    try {
      const result = schema.safeParse(req.body);
      
      if (!result.success) {
        res.status(400).json({
          status: 400,
          message: "Validation error",
          errors: {
            body: result.error.flatten().fieldErrors
          },
        });
        return;
      }

      req.body = result.data;
      next();
    } catch (err) {
      next(err);
    }
  };
};

export const validateQuery = <T>(schema: ZodSchema<T>): RequestHandler => {
  return (req: Request, res: Response, next: NextFunction): void => {
    try {
      const result = schema.safeParse(req.query);
      
      if (!result.success) {
        res.status(400).json({
          status: 400,
          message: "Validation error",
          errors: {
            query: result.error.flatten().fieldErrors
          },
        });
        return;
      }

      req.query = result.data as any;
      next();
    } catch (err) {
      next(err);
    }
  };
};

export const validateParams = <T>(schema: ZodSchema<T>): RequestHandler => {
  return (req: Request, res: Response, next: NextFunction): void => {
    try {
      const result = schema.safeParse(req.params);
      
      if (!result.success) {
        res.status(400).json({
          status: 400,
          message: "Validation error",
          errors: {
            params: result.error.flatten().fieldErrors
          },
        });
        return;
      }

      req.params = result.data as any;
      next();
    } catch (err) {
      next(err);
    }
  };
};

// Export types
export type { ValidationErrorResponse, RequestParts, ValidationSchemas };