import { DynamicModule, Module, OnModuleDestroy } from '@nestjs/common';
import Redis from 'ioredis';
import { REDIS_CLIENT, REDIS_MODULE_OPTIONS } from './redis.constants';
import { RedisConfig } from './redis.interface';
import { createRedisProvider } from './redis.provider';
import { InjectRedis } from './injectRedis.decorator';

@Module({
  providers: [createRedisProvider()],
  exports: [REDIS_CLIENT],
})
export class RedisModule implements OnModuleDestroy {
  constructor(@InjectRedis() private readonly redis: Redis) {}

  static register(options: RedisConfig): DynamicModule {
    return {
      module: RedisModule,
      global: options.isGlobal,
      providers: [{ provide: REDIS_MODULE_OPTIONS, useValue: options }],
    };
  }

  async onModuleDestroy() {
    await this.redis.quit();
  }
}
