import React, { useEffect, useState } from 'react';
import { Mail, MessageCircle, RefreshCcw, Trash2, Eye, CheckCircle2 } from 'lucide-react';
import { AdminLayout } from '../components/AdminLayout';
import { getContactMessages, updateContactMessageStatus, deleteContactMessage } from '../../services/contactService';
import { toast } from 'sonner';

const statusOptions = [
  { value: 'new', label: 'New' },
  { value: 'read', label: 'Read' },
  { value: 'replied', label: 'Replied' },
  { value: 'resolved', label: 'Resolved' },
];

export const AdminContactMessages = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const loadMessages = async () => {
    try {
      setLoading(true);
      const res = await getContactMessages();
      setMessages(res?.data || []);
      setError('');
    } catch (err) {
      setError(err?.response?.data?.message || 'Unable to load contact messages.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMessages();
  }, []);

  const handleStatusChange = async (id, status) => {
    try {
      await updateContactMessageStatus(id, status);
      setMessages((prev) => prev.map((item) => item._id === id ? { ...item, status } : item));
      toast.success('Message status updated.');
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Unable to update status.');
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteContactMessage(id);
      setMessages((prev) => prev.filter((item) => item._id !== id));
      toast.success('Message deleted.');
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Unable to delete message.');
    }
  };

  return (
    <AdminLayout title="Contact Messages" subtitle="Review and manage messages from your customer inquiries.">
      <div className="rounded-[24px] border border-beige/70 bg-cream p-4 shadow-warm-sm sm:p-6">
        <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="font-serif text-xl font-semibold text-earth">Recent inquiries</h2>
            <p className="text-sm text-muted">Keep track of new messages and update their progress.</p>
          </div>
          <button onClick={loadMessages} className="inline-flex items-center gap-2 rounded-full border border-sage/30 bg-white px-3.5 py-2 text-sm font-medium text-sage transition hover:bg-sage/10">
            <RefreshCcw className="h-4 w-4" />
            Refresh
          </button>
        </div>

        {loading ? (
          <div className="space-y-3">
            {[1, 2, 3].map((item) => (
              <div key={item} className="h-16 animate-pulse rounded-2xl bg-beige/40" />
            ))}
          </div>
        ) : error ? (
          <div className="rounded-2xl border border-terracotta/30 bg-terracotta/10 p-4 text-sm text-terracotta">{error}</div>
        ) : messages.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-beige bg-white/70 p-8 text-center text-sm text-muted">
            No contact messages yet.
          </div>
        ) : (
          <div className="space-y-3">
            {messages.map((message) => (
              <div key={message._id} className="rounded-2xl border border-beige/70 bg-white/85 p-4 shadow-warm-sm">
                <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                  <div className="space-y-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="inline-flex items-center gap-2 rounded-full bg-sage/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-sage">
                        <MessageCircle className="h-3.5 w-3.5" />
                        {message.subject}
                      </span>
                      <span className="inline-flex items-center gap-1 rounded-full bg-terracotta/10 px-2.5 py-1 text-[11px] font-semibold text-terracotta">
                        <Mail className="h-3.5 w-3.5" />
                        {message.email}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-earth">{message.name}</p>
                      <p className="text-sm text-muted">{message.message}</p>
                    </div>
                    {message.phone ? <p className="text-xs text-muted">Phone: {message.phone}</p> : null}
                  </div>
                  <div className="flex flex-col gap-3 lg:items-end">
                    <select
                      value={message.status}
                      onChange={(event) => handleStatusChange(message._id, event.target.value)}
                      className="rounded-full border border-beige/80 bg-cream px-3 py-2 text-sm text-earth outline-none"
                    >
                      {statusOptions.map((option) => (
                        <option key={option.value} value={option.value}>{option.label}</option>
                      ))}
                    </select>
                    <div className="flex gap-2">
                      <button className="rounded-full border border-sage/30 bg-sage/10 p-2 text-sage transition hover:bg-sage/20" title="Mark as read">
                        <Eye className="h-4 w-4" />
                      </button>
                      <button onClick={() => handleDelete(message._id)} className="rounded-full border border-terracotta/30 bg-terracotta/10 p-2 text-terracotta transition hover:bg-terracotta/20" title="Delete message">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </AdminLayout>
  );
};
