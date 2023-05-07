import { DynamicModule, Logger, Module, OnModuleDestroy } from '@nestjs/common';
import { REDIS_CLIENT, REDIS_MODULE_OPTIONS } from './redis.constants';
import { RedisConfig } from './redis.interface';
import { createRedisProvider } from './redis.provider';
import { Redis } from 'ioredis';
import { InjectRedis } from './injectRedis.decorator';

@Module({
  providers: [createRedisProvider()],
  exports: [REDIS_CLIENT],
})
export class RedisModule implements OnModuleDestroy {
  private readonly logger = new Logger(this.constructor.name);

  constructor(@InjectRedis() private readonly redisClient: Redis) {}

  static register(options: RedisConfig): DynamicModule {
    return {
      module: RedisModule,
      global: options.isGlobal,
      providers: [{ provide: REDIS_MODULE_OPTIONS, useValue: options }],
    };
  }

  onModuleDestroy() {
    this.logger.verbose('Closing Redis connection');
    this.redisClient.disconnect();
  }
}
