'use client';

import { useState, useEffect } from 'react';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { db } from '@/config/firebase'
import NotificationStatsCard from '@/components/NotificationCard';
import MessagesTable from '@/components/MessageTable';
import MessageModal from '@/components/MessageModal';



export default function NotificationsPage() {
  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    async function fetchMessages() {
      try {
        const q = query(
          collection(db, 'contact_messages'),
        );
        const snapshot = await getDocs(q);
        console.log(snapshot.docs, '============')
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setMessages(data);
      } catch (err) {
        console.error('Firestore fetch error:', err);
        setError('Failed to load messages. Please try again later.');
      } finally {
        setLoading(false);
      }
    }

    fetchMessages();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">

        {/* Page heading */}
        <div>
          <h1 className="text-2xl font-bold text-slate-800 tracking-tight">
            Notifications
          </h1>
          <p className="mt-1 text-sm text-slate-400">
            Contact form submissions from your visitors.
          </p>
        </div>

        {/* Error banner */}
        {error && (
          <div className="flex items-start gap-3 bg-red-50 border border-red-200 text-red-700 rounded-xl px-5 py-4 text-sm">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5 flex-shrink-0 mt-0.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
            <span>{error}</span>
          </div>
        )}

        {/* Stats */}
        <NotificationStatsCard count={messages.length} loading={loading} />

        {/* Messages table */}
        <MessagesTable
          messages={messages}
          loading={loading}
          onRowClick={setSelected}
        />
      </div>

      {/* Message detail modal */}
      {selected && (
        <MessageModal message={selected} onClose={() => setSelected(null)} />
      )}
    </div>
  );
}