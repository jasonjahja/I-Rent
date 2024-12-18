"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function DeviceRedirect() {
  const router = useRouter();

  useEffect(() => {
    const detectDeviceType = () => {
      if (typeof window !== "undefined") {
        const width = window.innerWidth;
        if (width > 1024) return "desktop";
        return "mobile";
      }
      return "unknown";
    };

    const deviceType = detectDeviceType();

    // Redirect based on device type
    if (deviceType === "desktop" && !window.location.pathname.startsWith("/desktop")) {
      router.push("/desktop");
    } else if (deviceType === "mobile") {
      router.push("/");
    }
    // Add a condition for tablet if required
  }, [router]);

  return null; // No UI rendering
}
