import { Request } from 'express';
import { ParamsDictionary } from "express-serve-static-core";

declare global {
  namespace Express {
    interface Request {
      validatedBody?: any;
      validatedQuery?: any;
      validatedParams?: ParamsDictionary;
    }
  }
}