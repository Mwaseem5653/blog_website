'use client';
import dynamic from 'next/dynamic';
import config from '@/sanity.config'

const SanityStudioWrapper = dynamic(
  () => import('@/components/SanityStudioWrapper'),
  { ssr: false } // only render on client
);

export default function StudioPage() {
  return <SanityStudioWrapper config={config} />;
}
