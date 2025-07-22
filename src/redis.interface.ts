import { RedisOptions } from 'ioredis';

export interface RedisModuleConfig {
  isGlobal?: boolean;
  url?: string;
}

export type RedisConfig = RedisModuleConfig & RedisOptions;
