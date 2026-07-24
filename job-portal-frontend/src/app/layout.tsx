

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import AuthInitializer from "@/components/AuthInitializer";
import { Toaster } from "react-hot-toast";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "VibeJobs - Premium Job Portal",
  description: "Find your dream job or hire the best talents with ease.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <AuthInitializer>
          {children}
          <Toaster position="top-right" toastOptions={{ duration: 4500 }} />
        </AuthInitializer>
      </body>
    </html>
  );
}

