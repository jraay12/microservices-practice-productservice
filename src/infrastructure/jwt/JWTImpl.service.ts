import { JWTService } from "./../../domain/ports/jwt/jwt.service";
import jwt from "jsonwebtoken";
export class JWTServiceImpl implements JWTService {
  constructor(private readonly accessTokenSecret: string) {}

  async verifyAccessToken<T = unknown>(token: string): Promise<T> {
    try {
      return jwt.verify(token, this.accessTokenSecret) as T;
    } catch (error) {
      throw new Error("Invalid or expired token!");
    }
  }
}
