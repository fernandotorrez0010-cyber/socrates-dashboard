'use client';

import { useEffect, useCallback } from 'react';
import { format } from 'date-fns';

function formatDate(raw:any) {
  if (!raw) return '—';
  try {
    const date = raw?.toDate ? raw.toDate() : new Date(raw);
    return format(date, 'MMMM d, yyyy · h:mm a');
  } catch {
    return String(raw);
  }
}

export default function MessageModal({ message, onClose }:{message:any, onClose: any}) {
  // Escape key support
  const handleKey = useCallback(
    (e: any) => {
      if (e.key === 'Escape') onClose();
    },
    [onClose]
  );

  useEffect(() => {
    document.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [handleKey]);

  if (!message) return null;

  return (
    /* Dark overlay */
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm"
      onClick={(e) => e.target === e.currentTarget && onClose()}
      role="dialog"
      aria-modal="true"
      aria-label="Message details"
    >
      {/* Modal card */}
      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden animate-modal-in">
        {/* Top accent bar */}
        <div className="h-1 w-full bg-gradient-to-r from-violet-500 to-indigo-600" />

        {/* Header */}
        <div className="flex items-start justify-between px-7 pt-6 pb-4 border-b border-slate-100">
          <div>
            <h2 className="text-lg font-bold text-slate-800 leading-tight">
              {message?.firstName} {message?.lastName}
            </h2>
            <a
              href={`mailto:${message.email}`}
              className="text-sm text-violet-500 hover:text-violet-700 transition-colors mt-0.5 inline-block"
            >
              {message.email}
            </a>
          </div>

          {/* Close button */}
          <button
            onClick={onClose}
            aria-label="Close modal"
            className="ml-4 flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-700 transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>

        {/* Meta row */}
        <div className="px-7 py-3 bg-slate-50/60 border-b border-slate-100">
          <p className="text-xs text-slate-400 flex items-center gap-1.5">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-3.5 h-3.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            {formatDate(message.createdAt)}
          </p>
        </div>

        {/* Message body */}
        <div className="px-7 py-6">
          <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-3">
            Message
          </p>
          <p className="text-slate-700 leading-relaxed text-sm whitespace-pre-wrap">
            {message.message}
          </p>
        </div>

        {/* Footer */}
        <div className="px-7 pb-6 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 text-sm font-medium transition-colors"
          >
            Close
          </button>
        </div>
      </div>

      <style jsx global>{`
        @keyframes modal-in {
          from {
            opacity: 0;
            transform: translateY(16px) scale(0.97);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        .animate-modal-in {
          animation: modal-in 0.22s cubic-bezier(0.34, 1.4, 0.64, 1) both;
        }
      `}</style>
    </div>
  );
}