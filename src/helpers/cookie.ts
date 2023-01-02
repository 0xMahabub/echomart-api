import { Response, Request } from 'express';
import parser from 'cookie-parser';
import { cookieCredentials } from '../configs';
// import { mode } from '../configs'

// init cookie parser
export const cookieParser = parser(cookieCredentials); // our cookie credentials

export function setCookie(res: Response, key: string, value: unknown): void {
  res.cookie(key, value, {
    // secure: mode === 'production ' ? true : false, // ssl required is production
    secure: false, // for now, core-development first purpose
    httpOnly: true, // disable (JavaScript) Browser document.cookie
    // signed: true, // signed
  });
}

export function getCookie(req: Request, key: string) {
  const cookies = req.headers.cookie;
  const hashMap = {};
  if (cookies && key !== '') {
    cookies.split(';').map((cookie) => {
      cookie.trim();
      hashMap[`${cookie.split('=')[0]}`] = cookie.split('=')[1];
    });
    return hashMap[key];
  }

  return null;

  
}

export function rmCookie(res: Response, key: string | string[]): void {
  if (key instanceof Array) key.map((k) => res.clearCookie(k));
  else res.clearCookie(key);
}
