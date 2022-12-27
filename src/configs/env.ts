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
