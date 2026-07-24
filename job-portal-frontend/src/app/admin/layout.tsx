"use client";

import AdminLayout from "@/components/layouts/AdminLayout";
import ProtectedRoute from "@/components/ProtectedRoute";

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectedRoute allowedRoles={["admin"]}>
      <AdminLayout>
        {children}
      </AdminLayout>
    </ProtectedRoute>
  );
}