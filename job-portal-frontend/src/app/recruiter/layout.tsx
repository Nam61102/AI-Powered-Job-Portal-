"use client";

import RecruiterLayout from "@/components/layouts/RecruiterLayout";
import ProtectedRoute from "@/components/ProtectedRoute";

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectedRoute allowedRoles={["recruiter"]}>
      <RecruiterLayout>
        {children}
      </RecruiterLayout>
    </ProtectedRoute>
  );
}