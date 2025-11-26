'use client';

import { useEffect, useRef } from "react";

interface AdUnitProps {
  slot: string;
  className?: string;
}

export default function AdUnit({ slot, className = "" }: AdUnitProps) {
  const insRef = useRef<HTMLModElement>(null);

  useEffect(() => {
    try {
      if (insRef.current && !insRef.current.dataset.processed) {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
        insRef.current.dataset.processed = "true";
      }
    } catch (e) {
      console.error("AdSense error:", e);
    }
  }, []);

  return (
    <ins
      ref={insRef}
      className={`adsbygoogle ${className}`}
      style={{ display: "block" }}
      data-ad-client="ca-pub-5961112055480826"
      data-ad-slot={slot}
      data-ad-format="auto"
      data-full-width-responsive="true"
    ></ins>
  );
}
