import { DynamicModule, Module } from '@nestjs/common';
import { CLUSTER_CLIENT, CLUSTER_MODULE_OPTIONS } from './cluster.constants';
import { createClusterProvider } from './cluster.provider';
import { ClusterConfig } from './cluster.interface';

@Module({
  providers: [createClusterProvider()],
  exports: [CLUSTER_CLIENT],
})
export class ClusterModule {
  static register(options: ClusterConfig): DynamicModule {
    return {
      module: ClusterModule,
      global: options.isGlobal,
      providers: [{ provide: CLUSTER_MODULE_OPTIONS, useValue: options }],
    };
  }
}
