"use client";

import { useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";

export default function AuthInitializer({
  children,
}: {
  children: React.ReactNode;
}) {
  const { initAuth } = useAuth();

  useEffect(() => {
    initAuth();
  }, [initAuth]);

  return <>{children}</>;
}
