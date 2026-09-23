import React, { useCallback, useEffect, useState } from "react";
import {
  X,
  Search,
  ChevronLeft,
  ChevronRight,
  FileText,
  Loader2,
  ArrowUpDown,
} from "lucide-react";
import { fetchTopPages } from "../../services/analyticsService";

const ITEMS_PER_PAGE = 50;

/**
 * Full-screen modal showing all visited pages with pagination and search.
 * @param {{ open: boolean, onClose: () => void, filters: { from?: string, to?: string, days?: number }, filterLabel: string }} props
 */
const AllPagesModal = ({ open, onClose, filters = {}, filterLabel = "" }) => {
  const [pages, setPages] = useState([]);
  const [total, setTotal] = useState(0);
  const [offset, setOffset] = useState(0);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [sortBy, setSortBy] = useState("views"); // "views" | "unique"

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(search), 400);
    return () => clearTimeout(timer);
  }, [search]);

  // Reset offset when search changes
  useEffect(() => {
    setOffset(0);
  }, [debouncedSearch]);

  const loadPages = useCallback(async () => {
    setLoading(true);
    try {
      const result = await fetchTopPages({
        ...filters,
        limit: ITEMS_PER_PAGE,
        offset,
        search: debouncedSearch,
      });
      let data = result.data.map((d) => ({
        ...d,
        views: Number(d.views),
        unique_visitors: Number(d.unique_visitors),
      }));
      // Client-side sort
      if (sortBy === "unique") {
        data.sort((a, b) => b.unique_visitors - a.unique_visitors);
      }
      setPages(data);
      setTotal(result.total);
    } catch (err) {
      console.error("Failed to load pages:", err);
    } finally {
      setLoading(false);
    }
  }, [filters, offset, debouncedSearch, sortBy]);

  useEffect(() => {
    if (open) loadPages();
  }, [open, loadPages]);

  if (!open) return null;

  const totalPages = Math.ceil(total / ITEMS_PER_PAGE);
  const currentPage = Math.floor(offset / ITEMS_PER_PAGE) + 1;

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto bg-black/50 backdrop-blur-sm p-4 sm:p-6">
      <div className="relative w-full max-w-5xl rounded-2xl border border-slate-200 bg-white shadow-2xl my-4">
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between rounded-t-2xl border-b border-slate-200 bg-white px-6 py-4">
          <div>
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <FileText className="h-5 w-5 text-sky-500" />
              All Visited Pages
            </h2>
            {filterLabel && (
              <p className="mt-0.5 text-xs text-slate-500">{filterLabel} &middot; {total.toLocaleString("en-IN")} pages found</p>
            )}
          </div>
          <button
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 text-slate-500 transition hover:bg-slate-100 hover:text-slate-700"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Search + Sort */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 px-6 py-4 border-b border-slate-100 bg-slate-50/50">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search pages by URL path..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-9 pr-3 text-sm text-slate-700 placeholder-slate-400 outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-100"
            />
          </div>
          <div className="inline-flex overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm shrink-0">
            <button
              onClick={() => setSortBy("views")}
              className={`px-3.5 py-2.5 text-xs font-semibold transition flex items-center gap-1.5 ${
                sortBy === "views" ? "bg-sky-500 text-white" : "text-slate-600 hover:bg-slate-50"
              }`}
            >
              <ArrowUpDown className="h-3 w-3" /> Views
            </button>
            <button
              onClick={() => setSortBy("unique")}
              className={`px-3.5 py-2.5 text-xs font-semibold transition flex items-center gap-1.5 ${
                sortBy === "unique" ? "bg-sky-500 text-white" : "text-slate-600 hover:bg-slate-50"
              }`}
            >
              <ArrowUpDown className="h-3 w-3" /> Unique
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="px-6 py-4">
          {loading ? (
            <div className="flex items-center justify-center py-16">
              <Loader2 className="h-8 w-8 animate-spin text-sky-500" />
            </div>
          ) : pages.length === 0 ? (
            <div className="flex items-center justify-center rounded-xl border border-dashed border-slate-300 bg-slate-50 py-16 text-sm text-slate-500">
              {debouncedSearch ? `No pages matching "${debouncedSearch}"` : "No page data found"}
            </div>
          ) : (
            <>
              {/* Table Header */}
              <div className="grid grid-cols-[40px_1fr_80px_80px] gap-3 rounded-xl bg-slate-100 px-4 py-2.5 text-[10px] font-bold uppercase tracking-wider text-slate-500">
                <span>#</span>
                <span>Page Path</span>
                <span className="text-right">Views</span>
                <span className="text-right">Unique</span>
              </div>
              {/* Rows */}
              <div className="divide-y divide-slate-100">
                {pages.map((page, i) => (
                  <div
                    key={page.path}
                    className="grid grid-cols-[40px_1fr_80px_80px] items-center gap-3 px-4 py-3 transition hover:bg-sky-50/40"
                  >
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-sky-100 text-[10px] font-extrabold text-sky-600">
                      {offset + i + 1}
                    </span>
                    <span className="truncate text-sm font-medium text-slate-700" title={page.path}>
                      {page.path}
                    </span>
                    <span className="text-right text-sm font-bold text-slate-900">
                      {page.views.toLocaleString("en-IN")}
                    </span>
                    <span className="text-right text-sm font-semibold text-slate-500">
                      {page.unique_visitors.toLocaleString("en-IN")}
                    </span>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Pagination Footer */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between border-t border-slate-200 px-6 py-4 bg-slate-50/50 rounded-b-2xl">
            <span className="text-xs text-slate-500">
              Page {currentPage} of {totalPages} &middot; {total.toLocaleString("en-IN")} total pages
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setOffset(Math.max(0, offset - ITEMS_PER_PAGE))}
                disabled={offset === 0}
                className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-600 transition hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="h-3 w-3" /> Previous
              </button>
              <button
                onClick={() => setOffset(offset + ITEMS_PER_PAGE)}
                disabled={offset + ITEMS_PER_PAGE >= total}
                className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-600 transition hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Next <ChevronRight className="h-3 w-3" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllPagesModal;
