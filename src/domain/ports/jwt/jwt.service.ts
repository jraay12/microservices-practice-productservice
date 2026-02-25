export interface JWTService {
  verifyAccessToken<T = unknown>(token: string): Promise<T>;
}
