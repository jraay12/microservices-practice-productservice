import { Request, Response, NextFunction } from "express";
import { BadRequestError } from "./BadRequestError";

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

  res.status(500).json({ message: err.message });
}