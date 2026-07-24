"use client";

import { useAuth } from "@/hooks/useAuth";

export default function AdminDashboard() {
  const { user } = useAuth();

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
        
        {/* Title and Top Action Filters */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
              Platform Overview
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              Real-time performance metrics for PortalAdmin.
            </p>
          </div>

          <div className="flex items-center space-x-3 shrink-0">
            <div className="flex items-center space-x-2 bg-white border border-slate-200 rounded-lg px-3.5 py-2 text-xs font-semibold text-slate-600 shadow-sm cursor-pointer">
              <span>📅</span>
              <span>Oct 1, 2023 - Oct 31, 2023</span>
              <span className="text-slate-400">▼</span>
            </div>
            <button className="px-4 py-2.5 rounded-lg border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 text-xs font-bold transition-colors flex items-center gap-1.5 shadow-sm">
              <span>📥</span>
              <span>Export Report</span>
            </button>
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Stat 1 */}
          <div className="bg-white p-6 rounded-xl border border-slate-200/80 shadow-sm flex flex-col justify-between h-44">
            <div className="flex items-start justify-between">
              <div className="w-9 h-9 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center text-base">
                👥
              </div>
              <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-100">
                +12%
              </span>
            </div>
            <div>
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Total Users</div>
              <div className="text-3xl font-extrabold text-slate-900 mt-1">42,891</div>
              {/* Mini Sparkline Representation */}
              <div className="flex items-end space-x-1 mt-3 h-5">
                <div className="bg-blue-100/50 w-2.5 rounded-sm" style={{ height: "40%" }}></div>
                <div className="bg-blue-100/50 w-2.5 rounded-sm" style={{ height: "60%" }}></div>
                <div className="bg-blue-100/50 w-2.5 rounded-sm" style={{ height: "50%" }}></div>
                <div className="bg-blue-100/50 w-2.5 rounded-sm" style={{ height: "70%" }}></div>
                <div className="bg-blue-100/50 w-2.5 rounded-sm" style={{ height: "60%" }}></div>
                <div className="bg-blue-500 w-2.5 rounded-sm" style={{ height: "90%" }}></div>
              </div>
            </div>
          </div>

          {/* Stat 2 */}
          <div className="bg-white p-6 rounded-xl border border-slate-200/80 shadow-sm flex flex-col justify-between h-44">
            <div className="flex items-start justify-between">
              <div className="w-9 h-9 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center text-base">
                💼
              </div>
              <span className="text-[10px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full border border-slate-200/50">
                New Today
              </span>
            </div>
            <div>
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Active Jobs</div>
              <div className="text-3xl font-extrabold text-slate-900 mt-1">1,402</div>
              <span className="text-[10px] text-slate-400 font-semibold mt-2.5 block">+45 postings added in 24h</span>
            </div>
          </div>

          {/* Stat 3 */}
          <div className="bg-white p-6 rounded-xl border border-slate-200/80 shadow-sm flex flex-col justify-between h-44">
            <div className="flex items-start justify-between">
              <div className="w-9 h-9 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center text-base">
                💳
              </div>
              <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-100">
                ↑ 8.4%
              </span>
            </div>
            <div>
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Monthly Revenue</div>
              <div className="text-3xl font-extrabold text-slate-900 mt-1">$184,200</div>
              <span className="text-[10px] text-slate-400 font-semibold mt-2.5 block">Vs $169,800 last month</span>
            </div>
          </div>

          {/* Stat 4 */}
          <div className="bg-white p-6 rounded-xl border border-slate-200/80 shadow-sm flex flex-col justify-between h-44">
            <div className="flex items-start justify-between">
              <div className="w-9 h-9 rounded-lg bg-red-50 text-red-500 flex items-center justify-center text-base">
                🛡️
              </div>
              <span className="text-[10px] font-bold text-red-650 bg-red-50 px-2 py-0.5 rounded-full border border-red-100">
                Urgent
              </span>
            </div>
            <div>
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Pending Verifications</div>
              <div className="text-3xl font-extrabold text-slate-900 mt-1">28</div>
              <div className="w-full bg-slate-100 h-1 rounded-full overflow-hidden mt-3.5 mb-1">
                <div className="bg-red-500 h-full rounded-full" style={{ width: "40%" }}></div>
              </div>
              <span className="text-[9px] text-slate-400 font-medium">40% done</span>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Revenue Trends Chart */}
          <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200/80 p-6 flex flex-col justify-between">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-lg font-bold text-slate-800">Revenue Trends</h2>
              <div className="flex bg-slate-100 p-0.5 rounded-lg border border-slate-200 text-[10px] font-bold">
                <button className="px-2.5 py-1.5 rounded text-slate-500">Weekly</button>
                <button className="px-2.5 py-1.5 rounded bg-white text-blue-600 shadow-sm">Monthly</button>
              </div>
            </div>
            
            {/* Visual Bar Chart */}
            <div className="h-64 flex items-end justify-between px-4 pb-2 border-b border-slate-100">
              <div className="flex flex-col items-center flex-1">
                <div className="bg-blue-500/80 w-12 rounded-t-lg transition-all hover:bg-blue-600" style={{ height: "110px" }}></div>
                <span className="text-[10px] text-slate-400 mt-2 font-medium">May</span>
              </div>
              <div className="flex flex-col items-center flex-1">
                <div className="bg-blue-500/85 w-12 rounded-t-lg transition-all hover:bg-blue-600" style={{ height: "90px" }}></div>
                <span className="text-[10px] text-slate-400 mt-2 font-medium">Jun</span>
              </div>
              <div className="flex flex-col items-center flex-1">
                <div className="bg-blue-500/85 w-12 rounded-t-lg transition-all hover:bg-blue-600" style={{ height: "170px" }}></div>
                <span className="text-[10px] text-slate-400 mt-2 font-medium">Jul</span>
              </div>
              <div className="flex flex-col items-center flex-1">
                <div className="bg-blue-500/85 w-12 rounded-t-lg transition-all hover:bg-blue-600" style={{ height: "140px" }}></div>
                <span className="text-[10px] text-slate-400 mt-2 font-medium">Aug</span>
              </div>
              <div className="flex flex-col items-center flex-1">
                <div className="bg-blue-500/90 w-12 rounded-t-lg transition-all hover:bg-blue-600" style={{ height: "210px" }}></div>
                <span className="text-[10px] text-slate-400 mt-2 font-medium">Sep</span>
              </div>
              <div className="flex flex-col items-center flex-1">
                <div className="bg-blue-600 w-12 rounded-t-lg transition-all hover:bg-blue-700" style={{ height: "240px" }}></div>
                <span className="text-[10px] text-blue-600 mt-2 font-bold">Oct</span>
              </div>
            </div>
          </div>

          {/* User Distribution Circular Progress Panel */}
          <div className="bg-white rounded-xl border border-slate-200/80 p-6 flex flex-col justify-between">
            <h2 className="text-lg font-bold text-slate-800 mb-6">User Distribution</h2>

            <div className="flex-1 flex flex-col items-center justify-center py-4">
              {/* Doughnut Chart representation via Tailwind */}
              <div className="relative w-36 h-36 rounded-full border-[12px] border-blue-500 flex items-center justify-center">
                <div className="absolute inset-0 rounded-full border-[12px] border-blue-200 border-t-transparent rotate-45"></div>
                <div className="text-center">
                  <span className="text-xl font-extrabold text-slate-900 block leading-tight">42.9k</span>
                  <span className="text-[9px] text-slate-400 font-semibold tracking-wider uppercase block">Total</span>
                </div>
              </div>

              {/* Legends */}
              <div className="w-full space-y-2 mt-8 text-xs font-semibold text-slate-600">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-blue-600 inline-block"></span>
                    <span>Candidates</span>
                  </div>
                  <span className="text-slate-400">65%</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-blue-300 inline-block"></span>
                    <span>Recruiters</span>
                  </div>
                  <span className="text-slate-400">25%</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-blue-100 inline-block"></span>
                    <span>Enterprise</span>
                  </div>
                  <span className="text-slate-400">10%</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Platform Activity Section */}
        <div className="bg-white rounded-xl border border-slate-200/80 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-slate-800">Recent Platform Activity</h2>
            <a href="#" className="text-xs font-bold text-blue-600 hover:text-blue-700">View All Activity</a>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-100 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  <th className="pb-3 font-semibold">Event</th>
                  <th className="pb-3 font-semibold">Entity</th>
                  <th className="pb-3 font-semibold">Status</th>
                  <th className="pb-3 font-semibold">Date</th>
                  <th className="pb-3 font-semibold text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs text-slate-600">
                {[
                  {
                    event: "John Doe",
                    detail: "Registered as Candidate",
                    entity: "john.doe@email.com",
                    status: "VERIFIED",
                    badgeStyle: "bg-emerald-50 text-emerald-600 border border-emerald-100",
                    date: "Just now",
                    icon: "👤",
                  },
                  {
                    event: "Senior Dev",
                    detail: "New Job Posted",
                    entity: "TechCorp Inc.",
                    status: "PUBLISHED",
                    badgeStyle: "bg-blue-50 text-blue-600 border border-blue-100",
                    date: "14 mins ago",
                    icon: "📄",
                  },
                  {
                    event: "$499 Payment",
                    detail: "Premium Subscription",
                    entity: "Nexus Systems",
                    status: "SUCCESS",
                    badgeStyle: "bg-emerald-50 text-emerald-600 border border-emerald-100",
                    date: "2 hours ago",
                    icon: "💳",
                  },
                  {
                    event: "Quick Cash",
                    detail: "Job Flagged",
                    entity: "Reported by 3 users",
                    status: "PENDING REVIEW",
                    badgeStyle: "bg-red-50 text-red-500 border border-red-100",
                    date: "5 hours ago",
                    icon: "⚠️",
                  },
                ].map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/50">
                    <td className="py-4 flex items-center space-x-3 font-bold text-slate-800">
                      <div className="w-8 h-8 rounded-lg bg-slate-100 text-slate-500 flex items-center justify-center text-xs">
                        {row.icon}
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-800 leading-tight">{row.event}</h4>
                        <span className="text-[10px] text-slate-400 font-semibold">{row.detail}</span>
                      </div>
                    </td>
                    <td className="py-4 font-semibold text-slate-700">{row.entity}</td>
                    <td className="py-4">
                      <span className={`px-2.5 py-1 rounded-full text-[9px] font-bold ${row.badgeStyle}`}>
                        {row.status}
                      </span>
                    </td>
                    <td className="py-4 text-slate-400 font-medium">{row.date}</td>
                    <td className="py-4 text-right text-slate-400 hover:text-slate-800 font-bold cursor-pointer">
                      •••
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
}
