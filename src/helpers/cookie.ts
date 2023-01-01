import { Response } from 'express';
import parser from 'cookie-parser';
import { cookieCredentials } from '../configs';
// import { mode } from '../configs'

// init cookie parser
export const cookieParser = parser(cookieCredentials); // our cookie credentials

export function setCookie(res: Response, key: string, value: unknown): void {
  res.cookie(key, value, {
    // secure: mode === 'production ' ? true : false, // ssl required is production
    secure: false, // for now, core-development first purpose
    httpOnly: true,
  });
}

export function rmCookie(res: Response, key: string | string[]): void {
  if (key instanceof Array) key.map((k) => res.clearCookie(k));
  else res.clearCookie(key);
}
