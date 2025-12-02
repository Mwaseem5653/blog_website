'use client'

import { NextStudio } from 'next-sanity/studio'
import { useMemo } from 'react'
import config from '@/sanity.config'

interface SanityStudioWrapperProps {
  config?: typeof config
  disableTransition?: boolean   // incoming prop (safe)
}

export default function SanityStudioWrapper({
  config: propConfig,
  disableTransition: _disableTransition, // renamed, not forwarded
}: SanityStudioWrapperProps) {
  const memoizedConfig = useMemo(() => propConfig || config, [propConfig])

  return (
    <div suppressHydrationWarning>
      <NextStudio config={memoizedConfig} />
    </div>
  )
}
