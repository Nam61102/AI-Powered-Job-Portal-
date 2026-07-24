"use client";

import Sidebar from "../common/Sidebar";
import Header from "../common/Header";

export default function CandidateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex bg-[#fafbfc] min-h-screen">
      <Sidebar role="candidate" />

      <div className="flex-1 flex flex-col min-w-0">
        <Header role="candidate" />

        <main className="p-8 flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}