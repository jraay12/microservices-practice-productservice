import { ZodError } from 'zod';
import { Request, Response, NextFunction } from "express";
import { BadRequestError } from "./BadRequestError";
import { NotFoundError } from "./NotFoundError";

interface AppError extends Error {
  statusCode?: number;
}

export function errorHandler(
  err: AppError,
  req: Request,
  res: Response,
  next: NextFunction
) {
  
  if (err instanceof BadRequestError){
    return res.status(400).json({
      error: err.message
    })
  }

  if (err instanceof NotFoundError){
    return res.status(404).json({
      error: err.message
    })
  }

   if (err instanceof ZodError) {
      return res.status(400).json({ errors: err.flatten() });
    }

  res.status(500).json({ message: err.message });
}