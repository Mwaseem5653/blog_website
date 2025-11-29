'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

declare global {
  interface Window {
    adsbygoogle: { [key: string]: unknown }[];
  }
}

interface AdUnitProps {
  slot: string;
  className?: string;
}

export default function AdUnit({ slot, className = "" }: AdUnitProps) {
  const pathname = usePathname();
  const adRef = useRef<HTMLModElement>(null); // Use HTMLModElement for the ins itself

  useEffect(() => {
    const loadAd = () => {
      try {
        if (typeof window !== "undefined" && adRef.current) {
          // Aggressively clear all children of the ins element
          while (adRef.current.firstChild) {
            adRef.current.removeChild(adRef.current.firstChild);
          }

          // Reset data attributes to force AdSense re-evaluation
          adRef.current.dataset.adStatus = '';
          adRef.current.dataset.adsbygoogleStatus = '';



          // Push the ad
          (window.adsbygoogle = window.adsbygoogle || []).push({});
        }
      } catch (e) {
        console.error("AdSense error:", e);
      }
    };

    const timer = setTimeout(loadAd, 500);

    // Capture adRef.current at the time of effect execution
    const currentAdElement = adRef.current;

    // Cleanup function: This runs when the component unmounts or dependencies change
    return () => {
      clearTimeout(timer); // Clear timeout on cleanup
      if (currentAdElement) {
        currentAdElement.innerHTML = '';
        currentAdElement.dataset.adStatus = '';
        currentAdElement.dataset.adsbygoogleStatus = '';
      }
    };
  }, [pathname]);

  return (
    <ins
      ref={adRef}
      className={`adsbygoogle ${className}`}
      style={{ display: "block" }}
      data-ad-client="ca-pub-5961112055480826"
      data-ad-slot={slot}
      data-ad-format="auto"
      data-full-width-responsive="true"
    ></ins>
  );
}