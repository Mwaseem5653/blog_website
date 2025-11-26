'use client';

import { useEffect } from "react";

interface AdUnitProps {
  slot: string;
  className?: string;
}

export default function AdUnit({ slot, className = "" }: AdUnitProps) {
  useEffect(() => {
    try {
      // ✅ Only push if not already pushed
      const ads = (window as any).adsbygoogle || [];
      if (ads.length === 0) {
        (window as any).adsbygoogle = ads;
      }
      // Check if current ins element already has ads
      const insElements = document.getElementsByClassName("adsbygoogle");
      for (let i = 0; i < insElements.length; i++) {
        const ins = insElements[i] as HTMLElement & { pushed?: boolean };
        if (!ins.dataset.processed) {
          ads.push({});
          ins.dataset.processed = "true"; // mark as processed
        }
      }
    } catch (e) {
      console.error("AdSense error:", e);
    }
  }, []);

  return (
    <ins
      className={`adsbygoogle ${className}`}
      style={{ display: "block" }}
      data-ad-client="ca-pub-5961112055480826"
      data-ad-slot={slot}
      data-ad-format="auto"
      data-full-width-responsive="true"
    ></ins>
  );
}
