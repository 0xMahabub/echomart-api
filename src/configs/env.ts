import dotenv from 'dotenv';

dotenv.config(); // env variable parseing

/**----------------------------------------------------*
 * @Environment variable setup guide
 * export const env_name: type = value
 * value can be accesed by `process.env.[key]`
 * Where `key` will be mapped from your environment file
 *-----------------------------------------------------*/

export const port: number = Number(process.env.PORT) || 4000;
export const databaseUrl: string = process.env.DB_URL || '';
export const mode: string = process.env.NODE_ENV || 'development';
export const redisHostname: string = process.env.REDIS_HOST || 'localhost';
export const redisPort: number = Number(process.env.REDIS_PORT) || 6379;
export const jwtSecret: string = process.env.JWT_SECRET || 'secret';
export const jwtExpires: number = Number(process.env.JWT_EXPIRE) || 43200000; // 12h by default
export const sessionSecret: string = process.env.SESSION_SECRET || '';
export const sessionExpires: number =
  Number(process.env.SESSION_SECRET) || 36000000;
export const cookieCredentials: string =
  process.env.COOKIE_CRED || 'cookie-secret';
