'use client'

import { useEffect, useState } from "react";
import MainBanner from "./_components/MainBanner";

export function ClientOnlyMainBanner({ data, banners }: any) {
    const [hydrated, setHydrated] = useState(false);
  
    useEffect(() => {
      setHydrated(true);
      // hide fallback banner when hydrated
      const fallback = document.getElementById("fallback-banner");
      if (fallback) fallback.style.display = "none";
    }, []);
  
    if (!hydrated) return null;
  
    return <MainBanner data={data} banners={banners} />;
  }