import { DynamicModule, Logger, Module, OnModuleDestroy } from '@nestjs/common';
import { CLUSTER_CLIENT, CLUSTER_MODULE_OPTIONS } from './cluster.constants';
import { Cluster } from 'ioredis';
import { InjectRedis } from './injectRedis.decorator';
import { createClusterProvider } from './cluster.provider';
import { ClusterConfig } from './cluster.interface';

@Module({
  providers: [createClusterProvider()],
  exports: [CLUSTER_CLIENT],
})
export class ClusterModule implements OnModuleDestroy {
  private readonly logger = new Logger(this.constructor.name);

  constructor(@InjectRedis() private readonly clusterClient: Cluster) {}

  static register(options: ClusterConfig): DynamicModule {
    return {
      module: ClusterModule,
      global: options.isGlobal,
      providers: [{ provide: CLUSTER_MODULE_OPTIONS, useValue: options }],
    };
  }

  onModuleDestroy() {
    this.logger.verbose('Closing Cluster connection');
    this.clusterClient.disconnect();
  }
}
