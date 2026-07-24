"use client";

import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

export default function RegisterPage() {
  const router = useRouter();
  const { register, loading, error } = useAuth();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "candidate",
  });
  const [confirmPassword, setConfirmPassword] = useState("");
  const [validationError, setValidationError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError("");
    setSuccess(false);

    if (!form.name || !form.email || !form.password) {
      setValidationError("Please fill in all fields.");
      return;
    }

    if (form.password !== confirmPassword) {
      setValidationError("Passwords do not match.");
      return;
    }

    try {
      await register(form);
      setSuccess(true);
      setTimeout(() => {
        router.push("/login");
      }, 1500);
    } catch (err) {
      // Error handled by hook
    }
  };

  return (
    <div className="flex min-h-screen bg-white">
      {/* LEFT SIDE PANEL */}
      <div className="hidden lg:flex w-[45%] bg-[#f0f4f8] p-12 flex-col justify-between relative overflow-hidden">
        <div>&nbsp;</div>

        {/* Centered 3D Illustration and Text */}
        <div className="flex-1 flex flex-col items-center justify-center z-10 py-6 text-center">
          <div className="w-[320px] h-[320px] relative mb-8">
            <Image
              src="/hiring_illustration.png"
              alt="Hiring Illustration"
              fill
              className="object-contain"
              priority
            />
          </div>
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            The Future of Work is Here
          </h2>
          <p className="mt-3 text-sm text-slate-500 max-w-sm leading-relaxed mx-auto">
            Join thousands of elite professionals and global companies bridging the gap between talent and innovation.
          </p>
        </div>

        <div className="text-xs text-slate-400 z-10 text-center">
          © 2026 EliteTalent. All rights reserved.
        </div>
      </div>

      {/* RIGHT SIDE FORM */}
      <div className="flex-1 flex flex-col justify-center px-6 py-12 md:px-16 lg:px-24">
        {/* Right side header */}
        <div className="w-full max-w-lg mx-auto flex items-center justify-between mb-8">
          <Link href="/" className="text-xl font-extrabold tracking-tight text-slate-900">
            EliteTalent
          </Link>
          <div className="flex items-center space-x-4 text-slate-500 text-lg">
            <button className="hover:text-slate-900">🌙</button>
            <button className="hover:text-slate-900">❓</button>
          </div>
        </div>

        <div className="w-full max-w-lg mx-auto">
          <div className="mb-6">
            <h2 className="text-3xl font-bold text-slate-950 tracking-tight">
              Create Account
            </h2>
            <p className="mt-2 text-sm text-slate-500">
              Start your journey with the world's most elite talent network.
            </p>
          </div>

          {(error || validationError) && (
            <div className="mb-6 rounded-lg bg-red-50 border border-red-200 p-4 text-xs text-red-600 font-medium">
              {validationError || error}
            </div>
          )}

          {success && (
            <div className="mb-6 rounded-lg bg-emerald-50 border border-emerald-200 p-4 text-xs text-emerald-600 font-medium">
              Registration successful! Redirecting to login...
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Role Switcher */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-2">
                I am a...
              </label>
              <div className="grid grid-cols-2 p-1 bg-[#f0f2f5] rounded-lg">
                <button
                  type="button"
                  onClick={() => setForm({ ...form, role: "candidate" })}
                  className={`py-2 text-xs font-semibold rounded-md transition-all ${
                    form.role === "candidate"
                      ? "bg-white text-blue-600 shadow-sm"
                      : "text-slate-500 hover:text-slate-800"
                  }`}
                >
                  Candidate
                </button>
                <button
                  type="button"
                  onClick={() => setForm({ ...form, role: "recruiter" })}
                  className={`py-2 text-xs font-semibold rounded-md transition-all ${
                    form.role === "recruiter"
                      ? "bg-white text-blue-600 shadow-sm"
                      : "text-slate-500 hover:text-slate-800"
                  }`}
                >
                  Recruiter
                </button>
              </div>
            </div>

            {/* Name Field */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-2">
                Full Name
              </label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="Enter your full name"
                className="w-full px-4 py-3 rounded-lg bg-[#f0f2f5] border-0 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-slate-800 placeholder-slate-400 transition-all"
                required
              />
            </div>

            {/* Email Field */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="name@company.com"
                className="w-full px-4 py-3 rounded-lg bg-[#f0f2f5] border-0 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-slate-800 placeholder-slate-400 transition-all"
                required
              />
            </div>

            {/* Password Fields */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 rounded-lg bg-[#f0f2f5] border-0 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-slate-800 placeholder-slate-400 transition-all"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-2">
                  Confirm Password
                </label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 rounded-lg bg-[#f0f2f5] border-0 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-slate-800 placeholder-slate-400 transition-all"
                  required
                />
              </div>
            </div>

            {/* Agreement Checkbox */}
            <div className="flex items-start mt-2">
              <input
                id="terms"
                type="checkbox"
                required
                className="h-4 w-4 mt-0.5 text-blue-600 border-slate-350 rounded focus:ring-blue-500"
              />
              <label htmlFor="terms" className="ml-2.5 text-xs text-slate-500 font-medium">
                I agree to the <a href="#" className="text-blue-600 font-semibold hover:underline">Terms of Service</a> and{" "}
                <a href="#" className="text-blue-600 font-semibold hover:underline">Privacy Policy</a>.
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading || success}
              className="w-full py-3.5 rounded-lg text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 transition-colors shadow-sm focus:outline-none mt-6"
            >
              {loading ? (
                <div className="flex items-center space-x-2 justify-center">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Creating account...</span>
                </div>
              ) : (
                "Create Account"
              )}
            </button>
          </form>

          {/* Separator */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200"></div>
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="px-3 bg-white text-slate-400 font-medium uppercase tracking-wider text-[10px]">
                Or register with
              </span>
            </div>
          </div>

          {/* Social Signups */}
          <div className="grid grid-cols-2 gap-4">
            <button
              type="button"
              className="flex items-center justify-center py-3 px-4 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-sm font-semibold transition-colors"
            >
              <span className="mr-2.5">🎨</span>
              <span>Google</span>
            </button>
            <button
              type="button"
              className="flex items-center justify-center py-3 px-4 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-sm font-semibold transition-colors"
            >
              <span className="mr-2.5">💼</span>
              <span>LinkedIn</span>
            </button>
          </div>

          {/* Login Link */}
          <div className="mt-8 text-center">
            <p className="text-xs text-slate-500 font-medium">
              Already have an account?{" "}
              <Link href="/login" className="font-bold text-blue-600 hover:text-blue-700 transition-colors">
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}