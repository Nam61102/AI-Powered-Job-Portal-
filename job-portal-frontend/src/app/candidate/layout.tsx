"use client";

import CandidateLayout from "@/components/layouts/CandidateLayout";
import ProtectedRoute from "@/components/ProtectedRoute";

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectedRoute allowedRoles={["candidate"]}>
      <CandidateLayout>
        {children}
      </CandidateLayout>
    </ProtectedRoute>
  );
}