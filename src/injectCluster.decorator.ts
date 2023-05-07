import { Inject } from '@nestjs/common';
import { CLUSTER_CLIENT } from './cluster.constants';

export const InjectCluster = () => Inject(CLUSTER_CLIENT);
