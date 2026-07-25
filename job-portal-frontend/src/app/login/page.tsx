"use client";

import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";



export default function LoginPage() {
  const router = useRouter();
  const { login, loading, error } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [validationError, setValidationError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError("");

    if (!email || !password) {
      setValidationError("Please fill in all fields.");
      return;
    }

    try {
      const response = await login({ email, password });
      const role = response.user?.role || response.role;

      if (role === "candidate") {
        router.push("/candidate/dashboard");
      } else if (role === "recruiter") {
        router.push("/recruiter/dashboard");
      } else if (role === "admin") {
        router.push("/admin/dashboard");
      } else {
        router.push("/");
      }
    } catch (err) {
      // Error handled by hook
    }
  };

  return (
    <div className="flex min-h-screen bg-white">
      {/* LEFT SIDE PANEL */}
      <div className="hidden lg:flex w-[45%] bg-[#f0f4f8] p-12 flex-col justify-between relative overflow-hidden">
        <div className="z-10">
          <Link href="/" className="text-xl font-extrabold tracking-tight text-slate-900">
            EliteTalent
          </Link>
        </div>
        
        {/* Centered 3D Illustration */}
        <div className="flex-1 flex flex-col items-center justify-center z-10 py-10">
          <div className="w-[380px] h-[380px] relative">
            <Image
              src="/hiring_illustration.png"
              alt="Hiring Illustration"
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>

        <div className="text-xs text-slate-400 z-10">
          © 2026 EliteTalent. All rights reserved.
        </div>
      </div>

      {/* RIGHT SIDE FORM */}
      <div className="flex-1 flex flex-col justify-center items-center px-6 py-12 md:px-16 lg:px-24">
        {/* Small mobile header */}
        <div className="lg:hidden w-full max-w-md mb-8 flex justify-start">
          <Link href="/" className="text-xl font-extrabold tracking-tight text-slate-900">
            EliteTalent
          </Link>
        </div>

        <div className="w-full max-w-md">
          <div className="mb-8">
            <h2 className="text-3xl font-extrabold text-slate-950 font-serif tracking-tight">
              Welcome back
            </h2>
            <p className="mt-2 text-sm text-slate-500">
              Enter your credentials to access your account
            </p>
          </div>

          {(error || validationError) && (
            <div className="mb-6 rounded-lg bg-red-50 border border-red-200 p-4 text-xs text-red-600 font-medium">
              {validationError || error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            {/* Email Field */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-400 text-sm">
                  @
                </span>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@company.com"
                  className="w-full pl-9 pr-4 py-3 rounded-lg bg-[#f0f2f5] border-0 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-slate-800 placeholder-slate-400 transition-all"
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-xs font-bold text-slate-700">
                  Password
                </label>
                <a href="#" className="text-xs font-semibold text-blue-600 hover:text-blue-700">
                  Forgot password?
                </a>
              </div>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-400 text-sm">
                  🔒
                </span>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-9 pr-10 py-3 rounded-lg bg-[#f0f2f5] border-0 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-slate-800 placeholder-slate-400 transition-all"
                  required
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 text-sm hover:text-slate-600"
                >
                  👁️
                </button>
              </div>
            </div>

            {/* Remember Me */}
            <div className="flex items-center">
              <input
                id="remember-me"
                type="checkbox"
                className="h-4 w-4 text-blue-600 border-slate-350 rounded focus:ring-blue-500"
              />
              <label htmlFor="remember-me" className="ml-2.5 block text-xs text-slate-500 font-medium">
                Remember me for 30 days
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center items-center py-3.5 px-4 rounded-lg text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 transition-colors shadow-sm focus:outline-none"
            >
              {loading ? (
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Signing in...</span>
                </div>
              ) : (
                <>
                  <span>Login to Dashboard</span>
                  <span className="ml-2 font-bold">→</span>
                </>
              )}
            </button>
          </form>

          {/* Separator */}
          <div className="relative my-7">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200"></div>
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="px-3 bg-white text-slate-400 font-medium uppercase tracking-wider text-[10px]">
                Or continue with
              </span>
            </div>
          </div>

          {/* Google Login */}
          <button
            type="button"
            className="w-full flex items-center justify-center py-3.5 px-4 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-sm font-semibold transition-colors"
          >
            <span className="mr-3">🎨</span>
            <span>Sign in with Google</span>
          </button>

          {/* Register Link */}
          <div className="mt-8 text-center">
            <p className="text-xs text-slate-500 font-medium">
              Don't have an account?{" "}
              <Link href="/register" className="font-bold text-blue-600 hover:text-blue-700 transition-colors">
                Register now
              </Link>
            </p>
          </div>

          {/* Footer policy links */}
          <div className="mt-12 flex justify-center space-x-6 text-[11px] text-slate-400 font-medium">
            <a href="#" className="hover:text-slate-600">Privacy Policy</a>
            <a href="#" className="hover:text-slate-600">Terms of Service</a>
          </div>
        </div>
      </div>
    </div>
  );
}