import { Provider } from '@nestjs/common';
import { Cluster } from 'ioredis';
import { CLUSTER_CLIENT, CLUSTER_MODULE_OPTIONS } from './cluster.constants';
import { ClusterConfig } from './cluster.interface';

export function createClusterProvider(): Provider {
  return {
    provide: CLUSTER_CLIENT,
    useFactory: async (options: ClusterConfig) => {
      return new Cluster(options.startupNodes, options);
    },
    inject: [CLUSTER_MODULE_OPTIONS],
  };
}
