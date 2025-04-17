import { pluginMetadata } from '@/api-config/metadata';
import { paths } from '@/api-config/paths';
import { NextResponse } from 'next/server';

export async function GET() {
  const pluginData = {
    ...pluginMetadata,
    paths,
  };

  return NextResponse.json(pluginData);
}
