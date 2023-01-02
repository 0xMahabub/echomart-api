import { redisClient } from '../configs';

export async function setInRedis(key: string, value: object): Promise<void> {
  await redisClient.set(key, JSON.stringify(value));
}

export async function getFromRedis(key: string): Promise<string> {
  const value = await redisClient.get(key);
  if (value === null) throw new Error('Redis: key got null value');
  else return JSON.parse(value); // parsing redis value string into object {}
}

export async function delFromRedis(key: string): Promise<void> {
  await redisClient.del(key);
}
