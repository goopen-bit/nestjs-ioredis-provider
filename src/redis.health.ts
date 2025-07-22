import { Injectable } from '@nestjs/common';
import {
  HealthCheckError,
  HealthIndicator,
  HealthIndicatorResult,
} from '@nestjs/terminus';
import { Redis } from 'ioredis';
import { InjectRedis } from './injectRedis.decorator';

@Injectable()
export class RedisHealthIndicator extends HealthIndicator {
  constructor(@InjectRedis() private readonly redisClient: Redis) {
    super();
  }

  async isHealthy(key: string): Promise<HealthIndicatorResult> {
    const isHealthy = await this.redisClient.ping((err, res) => {
      if (err) {
        throw new HealthCheckError('Redis health check failed', err);
      }
      return res;
    });
    const result = this.getStatus(key, isHealthy === 'PONG');

    if (isHealthy === 'PONG') {
      return result;
    }
  }
}
