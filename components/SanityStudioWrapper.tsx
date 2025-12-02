'use client';

import { NextStudio } from 'next-sanity/studio';
import { type NextStudioProps } from 'next-sanity/studio';
import { useMemo } from 'react';

interface SanityStudioWrapperProps extends NextStudioProps {
  disableTransition?: boolean;
  params?: { [key: string]: string | string[] };
  searchParams?: { [key: string]: string | string[] };
  [key: string]: unknown; // Changed 'any' to 'unknown'
}

export default function SanityStudioWrapper({
  config,
  disableTransition: _disableTransition, // Renamed to suppress warning
  ..._restProps // Renamed to suppress warning
}: SanityStudioWrapperProps) {
  const memoizedConfig = useMemo(() => config, [config]);

  return (
    <NextStudio config={memoizedConfig} />
  );
}