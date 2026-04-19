import { useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function MessagesPage() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('/api/contact')
      .then(res => res.json())
      .then(data => {
        if (data.ok) setMessages(data.data);
        else setError('Failed to load messages.');
      })
      .catch(() => setError('Failed to load messages.'))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 text-gray-900">
      <Header />
      <main className="mx-auto max-w-7xl px-6 flex-grow w-full py-12">
        <h1 className="text-3xl font-bold mb-2">Contact Messages</h1>
        <p className="text-sm text-gray-500 mb-8">All submitted contact requests.</p>

        {loading && <p className="text-sm text-gray-400">Loading...</p>}
        {error && <p className="text-sm text-red-600">{error}</p>}
        {!loading && !error && messages.length === 0 && (
          <p className="text-sm text-gray-400">No messages yet.</p>
        )}
        {!loading && !error && messages.length > 0 && (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {messages.map(msg => (
              <div key={msg.id} className="rounded-2xl bg-white p-6 shadow-md">
                <p className="font-semibold text-base">{msg.name}</p>
                <p className="mt-1 text-sm text-gray-500">{msg.email}</p>
                <p className="mt-3 text-xs text-gray-400">
                  Preferred date: <span className="text-gray-700 font-medium">{msg.preferred_date}</span>
                </p>
                <p className="mt-1 text-xs text-gray-300">
                  Submitted: {new Date(msg.created_at).toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}