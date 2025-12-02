'use client';

import { NextStudio } from 'next-sanity/studio';
import { type NextStudioProps } from 'next-sanity/studio';
import { useMemo } from 'react';

interface SanityStudioWrapperProps extends NextStudioProps {
  disableTransition?: boolean;
  params?: { [key: string]: string | string[] };
  searchParams?: { [key: string]: string | string[] };
  [key: string]: any;
}

export default function SanityStudioWrapper({
  config,
  disableTransition,
  ...restProps
}: SanityStudioWrapperProps) {
  const memoizedConfig = useMemo(() => config, [config]);

  return (
    <NextStudio config={memoizedConfig} />
  );
}
