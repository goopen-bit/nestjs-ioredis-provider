import { DynamicModule, Module } from '@nestjs/common';
import { REDIS_CLIENT, REDIS_MODULE_OPTIONS } from './redis.constants';
import { RedisConfig } from './redis.interface';
import { createRedisProvider } from './redis.provider';

@Module({
  providers: [createRedisProvider()],
  exports: [REDIS_CLIENT],
})
export class RedisModule {
  static register(options: RedisConfig): DynamicModule {
    return {
      module: RedisModule,
      global: options.isGlobal,
      providers: [{ provide: REDIS_MODULE_OPTIONS, useValue: options }],
    };
  }
}
