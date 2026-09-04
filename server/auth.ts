import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { farmateDB, toSafeUser, SafeUser } from './db';

const JWT_SECRET = process.env.AUTH_SECRET || 'farmate-super-secret-auth-key-2026';
const TOKEN_MAX_AGE_MS = 7 * 24 * 60 * 60 * 1000; // 7 days

export interface AuthenticatedRequest extends Request {
  user?: SafeUser;
}

export function generateToken(userId: string): string {
  return jwt.sign({ sub: userId }, JWT_SECRET, { expiresIn: '7d' });
}

export function verifyToken(token: string): { sub: string } | null {
  try {
    return jwt.verify(token, JWT_SECRET) as { sub: string };
  } catch {
    return null;
  }
}

export function setAuthCookie(res: Response, token: string) {
  res.cookie('farmate_token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: TOKEN_MAX_AGE_MS,
    path: '/',
  });
}

export function clearAuthCookie(res: Response) {
  res.clearCookie('farmate_token', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
  });
}

export function extractToken(req: Request): string | null {
  // 1. From Cookie (parsed by cookie-parser or parsed manually)
  if (req.cookies && req.cookies.farmate_token) {
    return req.cookies.farmate_token;
  }

  // 2. Cookie header fallback
  const rawCookie = req.headers.cookie;
  if (rawCookie) {
    const match = rawCookie.match(/farmate_token=([^;]+)/);
    if (match) return match[1];
  }

  // 3. From Authorization: Bearer <token>
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    return authHeader.substring(7).trim();
  }

  return null;
}

export function requireAuth(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const token = extractToken(req);
  if (!token) {
    return res.status(401).json({ error: 'Authentication required. Please log in.' });
  }

  const payload = verifyToken(token);
  if (!payload || !payload.sub) {
    return res.status(401).json({ error: 'Session expired or invalid. Please log in again.' });
  }

  const userRecord = farmateDB.findById(payload.sub);
  if (!userRecord) {
    return res.status(401).json({ error: 'User account not found.' });
  }

  req.user = toSafeUser(userRecord);
  next();
}

export function optionalAuth(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const token = extractToken(req);
  if (token) {
    const payload = verifyToken(token);
    if (payload && payload.sub) {
      const userRecord = farmateDB.findById(payload.sub);
      if (userRecord) {
        req.user = toSafeUser(userRecord);
      }
    }
  }
  next();
}
