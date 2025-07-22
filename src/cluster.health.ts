import { Injectable } from '@nestjs/common';
import {
  HealthCheckError,
  HealthIndicator,
  HealthIndicatorResult,
} from '@nestjs/terminus';
import { Cluster } from 'ioredis';
import { InjectCluster } from './injectCluster.decorator';

@Injectable()
export class ClusterHealthIndicator extends HealthIndicator {
  constructor(@InjectCluster() private readonly clusterClient: Cluster) {
    super();
  }

  async isHealthy(key: string): Promise<HealthIndicatorResult> {
    const isHealthy = await this.clusterClient.ping((err, res) => {
      if (err) {
        throw new HealthCheckError('Redis cluster health check failed', err);
      }
      return res;
    });
    const result = this.getStatus(key, isHealthy === 'PONG');

    if (isHealthy === 'PONG') {
      return result;
    }
  }
}
