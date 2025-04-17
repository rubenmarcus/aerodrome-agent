import { DEPLOYMENT_URL } from 'vercel-url';

const ACCOUNT_ID = process.env.ACCOUNT_ID;

// Set the plugin url in order of BITTE_CONFIG, env, DEPLOYMENT_URL (used for Vercel deployments)
const PLUGIN_URL =
  DEPLOYMENT_URL ||
  `${process.env.NEXT_PUBLIC_HOST || 'localhost'}:${process.env.PORT || 3000}`;

if (!PLUGIN_URL) {
  console.error(
    '!!! Plugin URL not found in env, BITTE_CONFIG or DEPLOYMENT_URL !!!',
  );
  process.exit(1);
}

export const AERODROME_ROUTER = '0xcF77a3Ba9A5CA399B7c97c74d54e5b1Beb874E43' as const;

export const TOKENS = {
  AERO: '0x940181a94A35A4569E4529A3CDfB74e38FD98631' as const,
  WETH: '0x4200000000000000000000000000000000000006' as const,
} as const;

export { ACCOUNT_ID, PLUGIN_URL };
