import React, { useState, useEffect } from "react";
import { Mail, CheckCircle, XCircle, Trash2, Search, Download } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import { listSubscribers, deleteSubscriber, toggleSubscriberStatus } from "../../services/subscriberService";

const SubscribersTab = () => {
  const [subscribers, setSubscribers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState(null);

  const fetchSubscribers = async () => {
    try {
      setLoading(true);
      const data = await listSubscribers();
      setSubscribers(data);
      setError(null);
    } catch (err) {
      setError("Failed to fetch subscribers.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubscribers();
  }, []);

  const handleDelete = (id) => {
    toast((t) => (
      <div className="flex flex-col gap-3">
        <p className="text-sm font-medium text-slate-800">
          Are you sure you want to delete this subscriber?
        </p>
        <div className="flex gap-2 justify-end">
          <button
            onClick={() => toast.dismiss(t.id)}
            className="px-3 py-1.5 text-xs font-semibold text-slate-600 bg-slate-100 rounded-lg hover:bg-slate-200 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={async () => {
              toast.dismiss(t.id);
              try {
                await deleteSubscriber(id);
                setSubscribers((prev) => prev.filter((sub) => sub.id !== id));
                toast.success("Subscriber deleted");
              } catch (err) {
                toast.error("Failed to delete subscriber");
              }
            }}
            className="px-3 py-1.5 text-xs font-semibold text-white bg-rose-600 rounded-lg hover:bg-rose-700 transition-colors"
          >
            Delete
          </button>
        </div>
      </div>
    ), { duration: Infinity });
  };

  const handleToggle = async (id) => {
    try {
      const updated = await toggleSubscriberStatus(id);
      setSubscribers((prev) =>
        prev.map((sub) => (sub.id === id ? { ...sub, is_active: updated.is_active } : sub))
      );
      toast.success(`Subscriber marked as ${updated.is_active ? "Active" : "Inactive"}`);
    } catch (err) {
      toast.error("Failed to toggle status");
    }
  };

  const handleExport = () => {
    const csvContent = "data:text/csv;charset=utf-8," 
      + "Email,Status,Subscribed At\n"
      + subscribers.map(sub => `${sub.email},${sub.is_active ? 'Active' : 'Inactive'},${new Date(sub.subscribed_at).toLocaleString()}`).join("\n");
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "newsletter_subscribers.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filtered = subscribers.filter(sub => sub.email.toLowerCase().includes(searchTerm.toLowerCase()));

  if (loading) return <div className="p-8 text-center text-slate-500">Loading subscribers...</div>;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Newsletter Subscribers</h2>
        </div>
        <button
          onClick={handleExport}
          className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-xl text-sm font-semibold hover:bg-slate-800 transition-colors"
        >
          <Download className="w-4 h-4" />
          Export CSV
        </button>
      </div>

      <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-xl border border-slate-200 shadow-sm w-full max-w-md">
        <Search className="w-4 h-4 text-slate-400" />
        <input
          type="text"
          placeholder="Search emails..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="bg-transparent border-none outline-none text-sm w-full"
        />
      </div>

      {error && <div className="text-red-500 text-sm p-4 bg-red-50 rounded-xl">{error}</div>}

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-600">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-800 font-semibold">
              <tr>
                <th className="px-6 py-4">Email</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Subscribed At</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan="4" className="px-6 py-8 text-center text-slate-500">
                    No subscribers found.
                  </td>
                </tr>
              ) : (
                filtered.map((sub) => (
                  <tr key={sub.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4 font-medium text-slate-900 flex items-center gap-2">
                      <Mail className="w-4 h-4 text-slate-400" />
                      {sub.email}
                    </td>
                    <td className="px-6 py-4">
                      <button 
                        onClick={() => handleToggle(sub.id)}
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${
                          sub.is_active 
                            ? "bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100" 
                            : "bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100"
                        }`}
                      >
                        {sub.is_active ? <CheckCircle className="w-3.5 h-3.5" /> : <XCircle className="w-3.5 h-3.5" />}
                        {sub.is_active ? "Active" : "Inactive"}
                      </button>
                    </td>
                    <td className="px-6 py-4 text-slate-500 whitespace-nowrap">
                      {new Date(sub.subscribed_at).toLocaleString()}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => handleDelete(sub.id)}
                        className="p-2 text-rose-500 hover:bg-rose-50 rounded-lg transition-colors"
                        title="Delete Subscriber"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
      <Toaster position="bottom-right" />
    </div>
  );
};

export default SubscribersTab;
