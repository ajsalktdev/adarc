"use client";
import { useState, useEffect } from "react";
import Wrapper from "@/components/includes/Wrapper";
import PageLoader from "@/components/includes/PageLoader";

export default function Loading() {
    const [isOnline, setIsOnline] = useState(() => typeof navigator !== "undefined" ? navigator.onLine : true);

    useEffect(() => {
        const handleOnline = () => setIsOnline(true);
        const handleOffline = () => setIsOnline(false);

        window.addEventListener("online", handleOnline);
        window.addEventListener("offline", handleOffline);

        return () => {
            window.removeEventListener("online", handleOnline);
            window.removeEventListener("offline", handleOffline);
        };
    }, []);

    return (
        <Wrapper className="h-[100vh] w-full flex items-center justify-center">
          {typeof window === "undefined" || isOnline ? (
            <PageLoader />
          ) : (
            <p>No Internet</p>
          )}
        </Wrapper>
      );}