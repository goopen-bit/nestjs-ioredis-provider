import { DynamicModule, Module, OnModuleDestroy } from '@nestjs/common';
import { CLUSTER_CLIENT, CLUSTER_MODULE_OPTIONS } from './cluster.constants';
import { createClusterProvider } from './cluster.provider';
import { ClusterConfig } from './cluster.interface';
import { InjectCluster } from './injectCluster.decorator';
import { Cluster } from 'ioredis';

@Module({
  providers: [createClusterProvider()],
  exports: [CLUSTER_CLIENT],
})
export class ClusterModule implements OnModuleDestroy {
  constructor(@InjectCluster() private readonly cluster: Cluster) {}

  static register(options: ClusterConfig): DynamicModule {
    return {
      module: ClusterModule,
      global: options.isGlobal,
      providers: [{ provide: CLUSTER_MODULE_OPTIONS, useValue: options }],
    };
  }

  async onModuleDestroy() {
    await this.cluster.quit();
  }
}
