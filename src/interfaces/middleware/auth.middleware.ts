import { JWTService } from './../../domain/ports/jwt/jwt.service';
import { Request, Response, NextFunction } from "express";

interface JwtPayload {
  id: string;
  email: string;
  role?: string;
}

// Extend Express Request type
declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;
    }
  }
}


export function authMiddleware(jwtService: JWTService) {
  return async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) throw new Error("No token provided");

    const [, token] = authHeader.split(" ");

    if (!token) throw new Error("Token missing");

    try {
      const payload = await jwtService.verifyAccessToken(token);
      (req as any).user = payload;
      next();
    } catch {
      throw new Error("Invalid or expired token");
    }
  };
}
