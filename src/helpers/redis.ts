import { redisClient } from '../configs';

export function setInRedis(key: string, value: object): void {
  redisClient.set(key, JSON.stringify(value));
}

export function delFromRedis(key: string): void {
  redisClient.del(key);
}
