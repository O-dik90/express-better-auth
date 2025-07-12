// utils/responseWrapper.ts
import { ZodSchema } from "zod";

export const ValidateResponse = <T>(status: number, schema: ZodSchema<T>, payload: T, res: any) => {
  const parsed = schema.safeParse(payload);
  if (!parsed.success) {
    console.error("❌ Response validation failed", parsed.error);
    return res.status(500).json({
      status: 500,
      message: "Internal server error: Invalid response shape",
    });
  }

  return res.status(status).json(parsed.data);
};
