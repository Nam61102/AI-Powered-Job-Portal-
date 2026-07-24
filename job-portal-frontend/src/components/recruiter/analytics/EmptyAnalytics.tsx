export default function EmptyAnalytics() {
  return (
    <div className="flex min-h-[320px] flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-slate-50/70 px-6 text-center shadow-sm">
      <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-white text-2xl shadow-sm">
        📊
      </div>
      <h3 className="text-lg font-semibold text-slate-900">No analytics available yet.</h3>
      <p className="mt-2 max-w-md text-sm text-slate-500">
        Once your company starts posting jobs and receiving applications, insights will appear here.
      </p>
    </div>
  );
}
