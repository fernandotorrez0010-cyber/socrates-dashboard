'use client';

import { format } from 'date-fns';

// ── Skeleton row ──────────────────────────────────────────────────────────────
function SkeletonRow() {
  return (
    <tr className="border-b border-slate-100">
      {[140, 180, 260, 80].map((w, i) => (
        <td key={i} className="px-5 py-4">
          <div
            className="h-3.5 bg-slate-100 rounded-full animate-pulse"
            style={{ width: w }}
          />
        </td>
      ))}
    </tr>
  );
}

// ── Helpers ───────────────────────────────────────────────────────────────────
function formatDate(raw: any) {
  if (!raw) return '—';
  try {
    // Firestore Timestamp → JS Date
    const date = raw?.toDate ? raw.toDate() : new Date(raw);
    return format(date, 'MMM d, yyyy · h:mm a');
  } catch {
    return String(raw);
  }
}

function preview(text = '', len = 60) {
  return text.length <= len ? text : text.slice(0, len).trimEnd() + '…';
}

// ── Component ─────────────────────────────────────────────────────────────────
export default function MessagesTable({ messages, loading, onRowClick }: {messages: any, loading: boolean, onRowClick: any}) {
  const headers = ['FullName', 'Email', 'Message Preview', 'Date'];
    console.log(messages)
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
      {/* Table header */}
      <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
        <h2 className="text-sm font-semibold text-slate-700 tracking-tight">
          Inbox
        </h2>
        {!loading && messages.length > 0 && (
          <span className="text-xs text-slate-400">
            {messages.length} message{messages.length !== 1 ? 's' : ''}
          </span>
        )}
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-100 bg-slate-50/60">
              {headers.map((h) => (
                <th
                  key={h}
                  className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-widest text-slate-400"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {/* Loading skeletons */}
            {loading &&
              Array.from({ length: 5 }).map((_, i) => (
                <SkeletonRow key={i} />
              ))}

            {/* Empty state */}
            {!loading && messages.length === 0 && (
              <tr>
                <td colSpan={4} className="px-5 py-16 text-center">
                  <div className="flex flex-col items-center gap-3 text-slate-400">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-10 h-10 opacity-30"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={1.2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0H4m8 4h.01"
                      />
                    </svg>
                    <p className="text-sm font-medium">No messages yet</p>
                    <p className="text-xs">
                      Contact form submissions will appear here.
                    </p>
                  </div>
                </td>
              </tr>
            )}

            {/* Data rows */}
            {!loading &&
              messages.map((msg:any) => (
                
                <tr
                  key={msg.id}
                  onClick={() => onRowClick(msg)}
                  className="border-b border-slate-50 hover:bg-violet-50/40 cursor-pointer transition-colors duration-150 group"
                >
                  <td className="px-5 py-4 font-medium text-slate-500 whitespace-nowrap">
                  {msg.firstName} {msg.lastName} 
                  </td>
                  <td className="px-5 py-4 text-slate-500 whitespace-nowrap">
                    {msg.email}
                  </td>
                  <td className="px-5 py-4 text-slate-400 max-w-xs">
                    {preview(msg.message)}
                  </td>
                  <td className="px-5 py-4 text-slate-400 whitespace-nowrap text-xs">
                    {formatDate(msg.createdAt)}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}