'use client';

export default function NotificationStatsCard({ count, loading }: {count: any, loading: boolean}) {
  return (
    <div className="relative overflow-hidden bg-white rounded-2xl shadow-sm border border-slate-100 p-6 w-full max-w-xs">
      {/* Decorative accent */}
      <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-violet-500 to-indigo-600 rounded-l-2xl" />

      <div className="pl-2">
        <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-3">
          Total Messages
        </p>

        {loading ? (
          <div className="h-12 w-24 bg-slate-100 rounded-xl animate-pulse" />
        ) : (
          <p className="text-5xl font-bold text-slate-800 leading-none tabular-nums">
            {count}
          </p>
        )}

        <p className="mt-3 text-xs text-slate-400 flex items-center gap-1.5">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400" />
          Live from Firestore
        </p>
      </div>
    </div>
  );
}