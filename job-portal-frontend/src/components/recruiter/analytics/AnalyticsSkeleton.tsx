export default function AnalyticsSkeleton() {
  return (
    <div className="space-y-6">
      <div className="animate-pulse space-y-3">
        <div className="h-6 w-48 rounded bg-slate-200" />
        <div className="h-4 w-96 rounded bg-slate-200" />
      </div>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 8 }).map((_, index) => (
          <div key={index} className="h-32 animate-pulse rounded-2xl border border-slate-200/80 bg-white" />
        ))}
      </div>
      <div className="grid gap-6 xl:grid-cols-[2fr_1fr]">
        <div className="h-80 animate-pulse rounded-2xl border border-slate-200/80 bg-white" />
        <div className="h-80 animate-pulse rounded-2xl border border-slate-200/80 bg-white" />
      </div>
      <div className="h-64 animate-pulse rounded-2xl border border-slate-200/80 bg-white" />
    </div>
  );
}
