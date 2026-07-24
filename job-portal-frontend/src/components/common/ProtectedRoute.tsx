"use client";

import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: ("candidate" | "recruiter" | "admin")[];
}

export default function ProtectedRoute({
  children,
  allowedRoles,
}: ProtectedRouteProps) {
  const router = useRouter();
  const { user, token, loading } = useAuth();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || loading) return;

    if (!token) {
      router.replace("/login");
      return;
    }

    if (user && allowedRoles && !allowedRoles.includes(user.role)) {
      // Redirect unauthorized user to their respective dashboard
      if (user.role === "candidate") {
        router.replace("/candidate/dashboard");
      } else if (user.role === "recruiter") {
        router.replace("/recruiter/dashboard");
      } else if (user.role === "admin") {
        router.replace("/admin/dashboard");
      } else {
        router.replace("/login");
      }
    }
  }, [mounted, token, user, loading, allowedRoles, router]);

  // Prevent render during hydration or while verifying auth
  if (!mounted || loading || !token || (allowedRoles && user && !allowedRoles.includes(user.role))) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-background">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-zinc-400 text-sm animate-pulse">Securing session...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
