import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Bell } from 'lucide-react';
import { getMaintenanceNotifications, markMaintenanceNotificationsRead } from '../../../services/maintenanceService';
import { formatDateTime } from './maintenanceMeta';

const POLL_MS = 60000;

const NotificationBell = ({ onOpenTicket }) => {
  const [data, setData] = useState({ items: [], unread: 0 });
  const [open, setOpen] = useState(false);
  const containerRef = useRef(null);

  const load = useCallback(async () => {
    try {
      const result = await getMaintenanceNotifications();
      if (result) setData(result);
    } catch {
      // Notifications are a convenience; a failed poll should stay silent.
    }
  }, []);

  useEffect(() => {
    load();
    const timer = setInterval(load, POLL_MS);
    return () => clearInterval(timer);
  }, [load]);

  useEffect(() => {
    if (!open) return undefined;
    const onClick = (event) => {
      if (!containerRef.current?.contains(event.target)) setOpen(false);
    };
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, [open]);

  const markAllRead = async () => {
    await markMaintenanceNotificationsRead().catch(() => {});
    setData((prev) => ({ items: prev.items.map((item) => ({ ...item, is_read: true })), unread: 0 }));
  };

  const handleItemClick = async (item) => {
    if (!item.is_read) {
      await markMaintenanceNotificationsRead([item.id]).catch(() => {});
      setData((prev) => ({
        items: prev.items.map((row) => (row.id === item.id ? { ...row, is_read: true } : row)),
        unread: Math.max(prev.unread - 1, 0),
      }));
    }
    if (item.ticket_id && onOpenTicket) {
      setOpen(false);
      onOpenTicket(item.ticket_id);
    }
  };

  return (
    <div className="relative" ref={containerRef}>
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        className="relative rounded-xl border border-slate-200 bg-white p-2 text-slate-600 hover:bg-slate-50"
        aria-label="Notifications"
      >
        <Bell className="h-5 w-5" />
        {data.unread > 0 && (
          <span className="absolute -right-1.5 -top-1.5 flex h-5 min-w-[20px] items-center justify-center rounded-full bg-rose-600 px-1 text-[11px] font-bold text-white">
            {data.unread > 99 ? '99+' : data.unread}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 z-40 mt-2 w-80 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl sm:w-96">
          <div className="flex items-center justify-between border-b border-slate-200 px-4 py-3">
            <p className="text-sm font-semibold text-slate-900">Notifications</p>
            {data.unread > 0 && (
              <button type="button" onClick={markAllRead} className="text-xs font-medium text-blue-600 hover:text-blue-800">
                Mark all read
              </button>
            )}
          </div>
          <div className="max-h-96 overflow-y-auto">
            {data.items.length === 0 ? (
              <p className="px-4 py-8 text-center text-sm text-slate-500">No notifications yet.</p>
            ) : (
              data.items.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleItemClick(item)}
                  className={`block w-full border-b border-slate-100 px-4 py-3 text-left hover:bg-slate-50 ${item.is_read ? '' : 'bg-blue-50/60'}`}
                >
                  <p className="text-sm font-medium text-slate-900">{item.title}</p>
                  {item.message && <p className="mt-0.5 line-clamp-2 text-xs text-slate-600">{item.message}</p>}
                  <p className="mt-1 text-[11px] text-slate-400">
                    {item.ticket_id && `#${item.ticket_id} · `}
                    {formatDateTime(item.created_at)}
                  </p>
                </button>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationBell;
