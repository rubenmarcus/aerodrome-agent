import { analyticsPaths } from './analytics';
import { poolsPaths } from './pools';
import { positionPaths } from './position';
import { routingPaths } from './routing';
import { txnPaths } from './txn';

export const paths = {
  ...txnPaths,
  ...analyticsPaths,
  ...positionPaths,
  ...routingPaths,
  ...poolsPaths,
};
