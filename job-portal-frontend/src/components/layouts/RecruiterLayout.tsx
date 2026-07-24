"use client";

import Sidebar from "../common/Sidebar";
import Header from "../common/Header";

export default function RecruiterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex bg-[#fafbfc] min-h-screen">
      <Sidebar role="recruiter" />

      <div className="flex-1 flex flex-col min-w-0">
        <Header role="recruiter" />

        <main className="p-8 flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}