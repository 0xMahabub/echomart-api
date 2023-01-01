import * as redis from 'redis';
import { redisHostname, redisPort } from './env';
import { log } from '../helpers';

// config redis client
const redisClient = redis.createClient({
  url: `redis://${redisHostname}:${redisPort}`,
});

redisClient.on('ready', () => {
  log.info('Redis client is ready!');
});

redisClient.on('error', () => {
  log.error("Couldn't establish redis connection.");
});

export { redisClient };
