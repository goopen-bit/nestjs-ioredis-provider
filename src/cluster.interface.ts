import { ClusterNode, ClusterOptions } from 'ioredis';

export interface ClusterModuleConfig {
  isGlobal?: boolean;
  startupNodes?: ClusterNode[];
}

export type ClusterConfig = ClusterModuleConfig & ClusterOptions;
