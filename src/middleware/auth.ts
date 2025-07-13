import { Request, Response, NextFunction } from 'express';
import { auth } from '../auth.js';

export interface AuthenticatedRequest extends Request {
  user?: any;
  session?: any;
}

export const requireAuth = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const session = await auth.api.getSession({
      headers: req.headers as any,
    });

    if (!session) {
      return res.status(401).json({
        message: 'Authentication required',
        status: 401,
      });
    }

    req.user = session.user;
    req.session = session.session;
    next();
  } catch (error) {
    return res.status(401).json({
      message: 'Invalid authentication',
      status: 401,
    });
  }
};