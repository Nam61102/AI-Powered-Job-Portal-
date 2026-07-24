"use client";

import { useAuth } from "@/hooks/useAuth";
import Link from "next/link";
import { useState } from "react";

export default function HomePage() {
  const { user, logout } = useAuth();
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("");

  return (
    <div className="flex flex-col min-h-screen bg-[#fafbfc]">
      {/* HEADER COMPONENT */}
      <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/95 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <Link href="/" className="text-xl font-extrabold tracking-tight text-slate-900 flex items-center">
              EliteTalent
            </Link>
            <nav className="hidden md:flex space-x-6 text-sm font-medium text-slate-500">
              <Link href="/" className="text-blue-600 border-b-2 border-blue-600 pb-1.5 font-semibold transition-colors">
                Home
              </Link>
              <a href="#" className="hover:text-slate-900 transition-colors">
                Jobs
              </a>
              <a href="#" className="hover:text-slate-900 transition-colors">
                Companies
              </a>
            </nav>
          </div>

          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <Link
                  href={
                    user.role === "admin"
                      ? "/admin/dashboard"
                      : user.role === "recruiter"
                      ? "/recruiter/dashboard"
                      : "/candidate/dashboard"
                  }
                  className="text-sm font-semibold text-slate-700 hover:text-blue-600 transition-colors"
                >
                  Dashboard
                </Link>
                <button
                  onClick={logout}
                  className="px-4 py-2 rounded-lg text-sm font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="text-sm font-semibold text-slate-700 hover:text-blue-600 transition-colors"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="px-4 py-2 rounded-md text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 transition-colors shadow-sm"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="relative px-4 pt-20 pb-16 text-center sm:px-6 lg:px-8 max-w-5xl mx-auto">
        {/* Soft background blue gradient overlay */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -z-10 h-[500px] w-full max-w-7xl bg-gradient-to-b from-blue-50/70 to-transparent rounded-full blur-3xl"></div>
        
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight">
          Find Your Dream Job
        </h1>
        <p className="mt-4 text-base sm:text-lg text-slate-500 max-w-2xl mx-auto">
          EliteTalent connects the world's most ambitious professionals with industry-leading enterprises. Elevate your career with exclusive opportunities.
        </p>

        {/* Search Bar */}
        <div className="max-w-4xl mx-auto mt-10 rounded-xl bg-white p-3 flex flex-col md:flex-row gap-2 border border-slate-200 shadow-md">
          <div className="flex-1 flex items-center px-3 border-b md:border-b-0 md:border-r border-slate-200 pb-2 md:pb-0">
            <span className="text-slate-400 mr-2.5 text-lg">🔍</span>
            <input
              type="text"
              placeholder="Job title, keywords..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-transparent border-0 text-sm focus:outline-none text-slate-800 placeholder-slate-400"
            />
          </div>
          <div className="flex-1 flex items-center px-3 pb-2 md:pb-0">
            <span className="text-slate-400 mr-2.5 text-lg">📍</span>
            <input
              type="text"
              placeholder="City, state, or remote"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full bg-transparent border-0 text-sm focus:outline-none text-slate-800 placeholder-slate-400"
            />
          </div>
          <button className="px-7 py-3 rounded-lg text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 transition-colors shadow-sm">
            Search
          </button>
        </div>

        {/* Popular Tags */}
        <div className="mt-5 text-xs text-slate-400 flex flex-wrap items-center justify-center gap-2">
          <span>Popular:</span>
          <a href="#" className="text-blue-600 hover:underline">UI Design</a>
          <a href="#" className="text-blue-600 hover:underline">React Developer</a>
          <a href="#" className="text-blue-600 hover:underline">Product Manager</a>
        </div>
      </section>

      {/* TRUSTED BY COMPANIES */}
      <section className="text-center py-6 border-t border-slate-100 bg-white">
        <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-6">
          TRUSTED BY THE WORLD'S MOST INNOVATIVE COMPANIES
        </p>
        <div className="flex flex-wrap items-center justify-center gap-12 px-4 opacity-50">
          <span className="text-lg font-bold text-slate-700 tracking-wider">slack</span>
          <span className="text-lg font-bold text-slate-700 tracking-wider">stripe</span>
          <span className="text-lg font-bold text-slate-700 tracking-wider">airbnb</span>
          <span className="text-lg font-bold text-slate-700 tracking-wider">linear</span>
          <span className="text-lg font-bold text-slate-700 tracking-wider">figma</span>
        </div>
      </section>

      {/* EXPLORE BY CATEGORY */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full">
        <div className="flex items-end justify-between mb-2">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">Explore by Category</h2>
            <p className="text-sm text-slate-500 mt-1">Find the perfect role across various professional fields</p>
          </div>
          <a href="#" className="text-sm font-semibold text-blue-600 hover:text-blue-700 flex items-center">
            View all categories <span className="ml-1">→</span>
          </a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 mt-8">
          {[
            { name: "Developer", count: "1,240 open roles", icon: "</>" },
            { name: "Designer", count: "840 open roles", icon: "🎨" },
            { name: "Marketing", count: "420 open roles", icon: "📈" },
            { name: "Finance", count: "310 open roles", icon: "💬" },
            { name: "Sales", count: "680 open roles", icon: "📢" },
          ].map((cat, idx) => (
            <div key={idx} className="bg-white p-6 rounded-xl border border-slate-200/80 hover:border-blue-400 hover:shadow-md transition-all duration-200 cursor-pointer">
              <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-base mb-4">
                {cat.icon}
              </div>
              <h3 className="font-bold text-slate-800">{cat.name}</h3>
              <p className="text-xs text-slate-400 mt-1">{cat.count}</p>
            </div>
          ))}
        </div>
      </section>

      {/* LATEST JOB LISTINGS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full border-t border-slate-100 bg-[#f8fafc]">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">Latest Job Listings</h2>
            <p className="text-sm text-slate-500 mt-1">Fresh opportunities posted in the last 24 hours</p>
          </div>
          <a href="#" className="text-sm font-semibold text-blue-600 hover:text-blue-700 flex items-center">
            View all jobs <span className="ml-1">→</span>
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              title: "Senior UX Designer",
              company: "Airbnb",
              location: "San Francisco, CA",
              type: "Full-time",
              salary: "$120k - $150k",
              logoColor: "bg-red-500",
              logoText: "A",
              bookmarked: false,
            },
            {
              title: "Backend Engineer",
              company: "Stripe",
              location: "Remote",
              type: "Remote",
              salary: "$100k - $125k",
              logoColor: "bg-indigo-600",
              logoText: "S",
              bookmarked: true,
            },
            {
              title: "Marketing Manager",
              company: "Slack",
              location: "New York, NY",
              type: "Hybrid",
              salary: "$90k - $110k",
              logoColor: "bg-amber-500",
              logoText: "S",
              bookmarked: false,
            },
          ].map((job, idx) => (
            <div key={idx} className="bg-white p-6 rounded-xl border border-slate-200/80 hover:shadow-md transition-all duration-200 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-10 h-10 rounded-lg ${job.logoColor} text-white flex items-center justify-center font-bold`}>
                    {job.logoText}
                  </div>
                  <button className="text-slate-400 hover:text-blue-600">
                    {job.bookmarked ? (
                      <span className="text-blue-600 text-lg">🔖</span>
                    ) : (
                      <span className="text-lg">🔖</span>
                    )}
                  </button>
                </div>
                <h3 className="text-base font-bold text-slate-800 hover:text-blue-600 cursor-pointer transition-colors">
                  {job.title}
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  {job.company} • {job.location}
                </p>
                <div className="flex gap-2 mt-4 mb-6">
                  <span className="bg-slate-100 text-slate-600 px-2.5 py-1 rounded text-xs font-semibold">
                    {job.type}
                  </span>
                  <span className="bg-slate-100 text-slate-600 px-2.5 py-1 rounded text-xs font-semibold">
                    {job.salary}
                  </span>
                </div>
              </div>
              <button className="w-full py-2.5 border border-blue-600 text-blue-600 hover:bg-blue-50 rounded-lg text-xs font-bold transition-all">
                View Job
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* STATS BANNER */}
      <section className="bg-[#0f172a] text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="flex flex-col items-center">
            <span className="text-3xl mb-2">💼</span>
            <div className="text-3xl font-extrabold">50k+</div>
            <div className="text-xs text-slate-400 mt-1">Active Jobs</div>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-3xl mb-2">🏢</span>
            <div className="text-3xl font-extrabold">10k+</div>
            <div className="text-xs text-slate-400 mt-1">Verified Companies</div>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-3xl mb-2">👥</span>
            <div className="text-3xl font-extrabold">2M+</div>
            <div className="text-xs text-slate-400 mt-1">Daily Candidates</div>
          </div>
        </div>
      </section>

      {/* SUCCESS STORIES (TESTIMONIALS) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full text-center">
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">Success Stories</h2>
        <p className="text-sm text-slate-500 mt-1 max-w-2xl mx-auto">
          Hear from the elite professionals who found their next career-defining role through EliteTalent.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10 text-left">
          <div className="bg-white p-8 rounded-xl border border-slate-200/80 shadow-sm flex flex-col justify-between">
            <p className="text-sm leading-relaxed text-slate-600 italic">
              "EliteTalent completely changed my job search experience! Within two weeks, I was interviewed by three top-tier tech companies. The process was seamless and incredibly professional."
            </p>
            <div className="flex items-center space-x-4 mt-6">
              <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center font-bold text-slate-500">
                SJ
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-800">Sarah Jenkins</h4>
                <p className="text-xs text-slate-400">Product Designer at Meta</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-8 rounded-xl border border-slate-200/80 shadow-sm flex flex-col justify-between">
            <p className="text-sm leading-relaxed text-slate-600 italic">
              "The quality of recruiters on this platform is unmatched. It wasn't just another recruiter; I felt like they understood my specific expertise and matched me with the perfect role at a fast-growing startup."
            </p>
            <div className="flex items-center space-x-4 mt-6">
              <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center font-bold text-slate-500">
                DM
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-800">David Miller</h4>
                <p className="text-xs text-slate-400">Principal Engineer at Stripe</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* LOOKING FOR ELITE TALENT BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full">
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-8 md:p-12 text-white flex flex-col md:flex-row items-center justify-between shadow-lg overflow-hidden relative">
          <div className="flex-1 z-10">
            <h2 className="text-2xl md:text-3xl font-extrabold">Looking for Elite Talent?</h2>
            <p className="text-sm md:text-base text-blue-100 mt-3 max-w-xl leading-relaxed">
              Access our exclusive database of the top 1% of candidates in tech, design, and business. Start building your dream team today.
            </p>
            <div className="flex gap-4 mt-8">
              <button className="px-6 py-3 rounded-lg text-sm font-bold text-blue-700 bg-white hover:bg-slate-100 transition-colors shadow-sm">
                Post a Job
              </button>
              <button className="px-6 py-3 rounded-lg text-sm font-bold text-white border border-blue-400 hover:bg-blue-500/20 transition-colors">
                Contact Sales
              </button>
            </div>
          </div>
          
          {/* Vector representation of illustrated characters on the right */}
          <div className="flex-1 mt-8 md:mt-0 relative h-40 w-full flex items-center justify-center z-10 md:opacity-90">
            <div className="flex items-end space-x-2">
              <div className="w-14 h-24 bg-white/20 rounded-t-full border border-white/10 flex items-center justify-center text-white/50 text-xl font-bold">👩‍💻</div>
              <div className="w-16 h-28 bg-white/30 rounded-t-full border border-white/10 flex items-center justify-center text-white/60 text-2xl font-bold">👨‍💼</div>
              <div className="w-14 h-20 bg-white/20 rounded-t-full border border-white/10 flex items-center justify-center text-white/50 text-xl font-bold">👩‍🎨</div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER COMPONENT */}
      <footer className="bg-white border-t border-slate-200 mt-12 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <span className="text-lg font-extrabold text-slate-900">EliteTalent</span>
            <p className="text-xs text-slate-400 mt-3 leading-relaxed">
              © 2026 EliteTalent. Bridging the gap between elite talent and innovation.
            </p>
            <div className="flex space-x-3 mt-4 text-slate-400">
              <span className="cursor-pointer hover:text-blue-600">🌐</span>
              <span className="cursor-pointer hover:text-blue-600">🏀</span>
            </div>
          </div>
          <div>
            <h4 className="text-xs font-bold text-slate-800 uppercase tracking-widest mb-4">Platform</h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li><a href="#" className="hover:text-slate-600">About Us</a></li>
              <li><a href="#" className="hover:text-slate-600">Careers</a></li>
              <li><a href="#" className="hover:text-slate-600">Partner Program</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-xs font-bold text-slate-800 uppercase tracking-widest mb-4">Legal</h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li><a href="#" className="hover:text-slate-600">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-slate-600">Terms of Service</a></li>
              <li><a href="#" className="hover:text-slate-600">Cookie Policy</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-xs font-bold text-slate-800 uppercase tracking-widest mb-4">Support</h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li><a href="#" className="hover:text-slate-600">Contact</a></li>
              <li><a href="#" className="hover:text-slate-600">Help Center</a></li>
              <li><a href="#" className="hover:text-slate-600">FAQ</a></li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
}
