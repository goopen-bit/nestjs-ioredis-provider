import { Provider } from '@nestjs/common';
import { Redis } from 'ioredis';
import { REDIS_CLIENT, REDIS_MODULE_OPTIONS } from './redis.constants';
import { RedisConfig } from './redis.interface';

export function createRedisProvider(): Provider {
  return {
    provide: REDIS_CLIENT,
    useFactory: async (options: RedisConfig) => {
      let client: Redis;
      if (options.url) {
        client = new Redis(options.url);
      } else {
        client = new Redis(options);
      }
      return client;
    },
    inject: [REDIS_MODULE_OPTIONS],
  };
}
