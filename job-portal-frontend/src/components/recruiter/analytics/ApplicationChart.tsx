"use client";

import React, { useMemo } from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import { MonthlyApplications } from "@/types/analytics";

interface ApplicationChartProps {
  data: MonthlyApplications[];
}

export default function ApplicationChart({ data }: ApplicationChartProps) {
  const chartData = useMemo(() => data, [data]);

  return (
    <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-slate-900">Applications Per Month</h2>
          <p className="text-sm text-slate-500">Monthly hiring activity overview</p>
        </div>
      </div>
      <div className="h-80 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <CartesianGrid stroke="#e2e8f0" strokeDasharray="3 3" />
            <XAxis dataKey="month" tickLine={false} axisLine={false} tick={{ fill: "#64748b" }} />
            <YAxis allowDecimals={false} tickLine={false} axisLine={false} tick={{ fill: "#64748b" }} />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="count"
              stroke="#2563eb"
              strokeWidth={3}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
