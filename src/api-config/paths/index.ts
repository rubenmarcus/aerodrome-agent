import { txnPaths } from './txn';
import { analyticsPaths } from './analytics';
import { positionPaths } from './position';
import { routingPaths } from './routing';
import { poolsPaths } from './pools';

export const paths = {
  ...txnPaths,
  ...analyticsPaths,
  ...positionPaths,
  ...routingPaths,
  ...poolsPaths,
};