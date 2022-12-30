import * as redis from 'redis';
import { redisHostname, redisPort } from './env';
import session from 'express-session';
import connectRedis from 'connect-redis';
import { log } from '../helpers';

// config redis client
const redisClient = redis.createClient({
  url: `redis://${redisHostname}:${redisPort}`,
});

const RedisStore = connectRedis(session);

redisClient.on('ready', () => {
  log.info('Redis client is ready!');
});

redisClient.on('error', () => {
  log.error("Couldn't establish redis connection.");
});

export { RedisStore, redisClient };
