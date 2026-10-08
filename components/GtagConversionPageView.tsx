"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export default function GtagConversionPageView() {
  useEffect(() => {
    const send = () => {
      if (typeof window.gtag !== "function") return false;
      window.gtag("event", "conversion_event_page_view", {});
      return true;
    };

    if (send()) return;

    const interval = window.setInterval(() => {
      if (send()) window.clearInterval(interval);
    }, 200);
    const timeout = window.setTimeout(() => window.clearInterval(interval), 10000);

    return () => {
      window.clearInterval(interval);
      window.clearTimeout(timeout);
    };
  }, []);

  return null;
}
