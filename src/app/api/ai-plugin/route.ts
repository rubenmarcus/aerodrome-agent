import { NextResponse } from 'next/server';
import { pluginMetadata } from '@/api-config/metadata';
import { paths } from '@/api-config/paths';

export async function GET() {
  const pluginData = {
    ...pluginMetadata,
    paths,
  };

  return NextResponse.json(pluginData);
}
