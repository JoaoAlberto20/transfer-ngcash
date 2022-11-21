import { ErrorRequestHandler, Request, Response, NextFunction } from 'express';
import { AppError } from '../errors/AppError';
import { ZodError } from 'zod';

export const errorHandler:ErrorRequestHandler = (
  error: Error | ZodError,
  _req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (error instanceof ZodError) {
    return res.status(400).json({ message: error.issues[0].message });
  }

  if (error instanceof AppError) {
    const { message, statusCode } = error;
    return res.status(statusCode).json({ message });
  }

  res.status(500).json({ message: error.message });
  return next();
};
