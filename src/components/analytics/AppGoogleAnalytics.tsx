"use client";

import { GoogleAnalytics, sendGAEvent } from "@next/third-parties/google";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";

type AppGoogleAnalyticsProps = {
  gaId: string;
};

export function AppGoogleAnalytics({ gaId }: AppGoogleAnalyticsProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const skipNextConfig = useRef(true);

  useEffect(() => {
    if (skipNextConfig.current) {
      skipNextConfig.current = false;
      return;
    }
    const query = searchParams?.toString();
    const pagePath = query ? `${pathname}?${query}` : pathname;
    sendGAEvent("config", gaId, { page_path: pagePath });
  }, [pathname, searchParams, gaId]);

  return <GoogleAnalytics gaId={gaId} />;
}
