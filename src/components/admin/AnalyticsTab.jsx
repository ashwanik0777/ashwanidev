import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  BarChart3,
  Eye,
  Globe,
  Laptop,
  Monitor,
  MonitorSmartphone,
  RefreshCw,
  Smartphone,
  Tablet,
  TrendingUp,
  Users,
  FileText,
  Loader2,
  Calendar,
  CalendarRange,
  Zap,
  ExternalLink,
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
} from "recharts";
import {
  fetchAnalyticsOverview,
  fetchVisitorTimeline,
  fetchDeviceBreakdown,
  fetchBrowserBreakdown,
  fetchOsBreakdown,
  fetchTopPages,
} from "../../services/analyticsService";
import AllPagesModal from "./AllPagesModal";

/* ─── Theme Colors ─── */
const CHART_COLORS = [
  "#0ea5e9", "#6366f1", "#10b981", "#f59e0b",
  "#f43f5e", "#8b5cf6", "#06b6d4", "#ec4899",
];

const DEVICE_ICONS = {
  desktop: Monitor,
  mobile: Smartphone,
  tablet: Tablet,
};

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

/* ─── Card component ─── */
const cardClass = "rounded-2xl border border-slate-200 bg-white p-5 shadow-sm";

/* ─── Skeleton shimmer ─── */
const Skeleton = ({ className = "" }) => (
  <div className={`animate-pulse rounded-xl bg-slate-200 ${className}`} />
);

/* ─── Custom Tooltip for charts ─── */
const ChartTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-lg">
      <p className="mb-1 text-xs font-semibold text-slate-500">{label}</p>
      {payload.map((entry, i) => (
        <p key={i} className="text-sm font-bold" style={{ color: entry.color }}>
          {entry.name}: {Number(entry.value).toLocaleString("en-IN")}
        </p>
      ))}
    </div>
  );
};

/* ─── Pie Chart Label ─── */
const renderCustomLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
  if (percent < 0.04) return null;
  const RADIAN = Math.PI / 180;
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);
  return (
    <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central" className="text-xs font-bold">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

/* ═══════════════════════════════════════════════════════════ */

const AnalyticsTab = () => {
  /* ─── Filter State ─── */
  const [filterMode, setFilterMode] = useState("quick"); // "quick" | "month" | "custom"
  const [quickDays, setQuickDays] = useState(30);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth()); // 0-11
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [customFrom, setCustomFrom] = useState("");
  const [customTo, setCustomTo] = useState("");

  /* ─── Data State ─── */
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [overview, setOverview] = useState({});
  const [timeline, setTimeline] = useState([]);
  const [devices, setDevices] = useState([]);
  const [browsers, setBrowsers] = useState([]);
  const [osList, setOsList] = useState([]);
  const [topPages, setTopPages] = useState([]);
  const [topPagesTotal, setTopPagesTotal] = useState(0);
  const [showAllPages, setShowAllPages] = useState(false);

  /* ─── Compute filter params from current filter state ─── */
  const filterParams = useMemo(() => {
    if (filterMode === "month") {
      const y = selectedYear;
      const m = selectedMonth;
      const from = `${y}-${String(m + 1).padStart(2, "0")}-01`;
      // Last day of month
      const lastDay = new Date(y, m + 1, 0).getDate();
      const to = `${y}-${String(m + 1).padStart(2, "0")}-${String(lastDay).padStart(2, "0")}`;
      return { from, to };
    }
    if (filterMode === "custom") {
      // Only fetch when BOTH dates are filled — don't reload on partial input
      if (customFrom && customTo) return { from: customFrom, to: customTo };
      // Return null to signal "don't reload yet"
      return null;
    }
    // Quick mode
    return { days: quickDays };
  }, [filterMode, quickDays, selectedMonth, selectedYear, customFrom, customTo]);

  // Keep a ref to last valid filter so we don't lose data while typing custom dates
  const [activeFilter, setActiveFilter] = useState({ days: 30 });
  useEffect(() => {
    if (filterParams !== null) setActiveFilter(filterParams);
  }, [filterParams]);

  /* ─── Human-readable label for current filter ─── */
  const filterLabel = useMemo(() => {
    if (filterMode === "month") {
      return `${MONTHS[selectedMonth]} ${selectedYear}`;
    }
    if (filterMode === "custom") {
      if (customFrom && customTo) return `${customFrom} to ${customTo}`;
      return "Select date range...";
    }
    if (quickDays === 0) return "All Time";
    return `Last ${quickDays} days`;
  }, [filterMode, quickDays, selectedMonth, selectedYear, customFrom, customTo]);

  /* ─── Load all data ─── */
  const loadAll = useCallback(
    async (showSpinner = true) => {
      if (showSpinner) setLoading(true);
      else setRefreshing(true);
      try {
        const [ov, tl, dv, br, os, pg] = await Promise.all([
          fetchAnalyticsOverview(),
          fetchVisitorTimeline(activeFilter),
          fetchDeviceBreakdown(activeFilter),
          fetchBrowserBreakdown(activeFilter),
          fetchOsBreakdown(activeFilter),
          fetchTopPages({ ...activeFilter, limit: 15 }),
        ]);
        setOverview(ov);
        setTimeline(
          tl.map((d) => ({
            ...d,
            date: new Date(d.date).toLocaleDateString("en-IN", { day: "2-digit", month: "short" }),
            page_views: Number(d.page_views),
            unique_visitors: Number(d.unique_visitors),
          })),
        );
        setDevices(dv.map((d) => ({ ...d, value: Number(d.value) })));
        setBrowsers(br.map((d) => ({ ...d, value: Number(d.value) })));
        setOsList(os.map((d) => ({ ...d, value: Number(d.value) })));
        setTopPages(pg.data.map((d) => ({ ...d, views: Number(d.views), unique_visitors: Number(d.unique_visitors) })));
        setTopPagesTotal(pg.total);
      } catch (err) {
        console.error("Analytics load error:", err);
      } finally {
        setLoading(false);
        setRefreshing(false);
      }
    },
    [activeFilter],
  );

  useEffect(() => {
    loadAll(true);
  }, [loadAll]);

  const totalDeviceVisits = useMemo(() => devices.reduce((sum, d) => sum + d.value, 0), [devices]);

  /* ─── Available years for dropdown ─── */
  const yearOptions = useMemo(() => {
    const current = new Date().getFullYear();
    const years = [];
    for (let y = current; y >= current - 5; y--) years.push(y);
    return years;
  }, []);

  /* ─── Stat Cards Data ─── */
  const statCards = [
    {
      label: "Total Unique Visitors",
      value: overview.totalUniqueVisitors ?? 0,
      icon: Users,
      gradient: "from-sky-500 to-sky-600",
      bg: "bg-sky-50",
    },
    {
      label: "Today's Visitors",
      value: overview.todayUniqueVisitors ?? 0,
      icon: Eye,
      gradient: "from-emerald-500 to-emerald-600",
      bg: "bg-emerald-50",
    },
    {
      label: "This Week",
      value: overview.weekUniqueVisitors ?? 0,
      icon: TrendingUp,
      gradient: "from-indigo-500 to-indigo-600",
      bg: "bg-indigo-50",
    },
    {
      label: "This Month",
      value: overview.monthUniqueVisitors ?? 0,
      icon: Globe,
      gradient: "from-amber-500 to-amber-600",
      bg: "bg-amber-50",
    },
    {
      label: "Today's Page Views",
      value: overview.todayPageViews ?? 0,
      icon: FileText,
      gradient: "from-rose-500 to-rose-600",
      bg: "bg-rose-50",
    },
    {
      label: "Total Page Views",
      value: overview.totalPageViews ?? 0,
      icon: BarChart3,
      gradient: "from-violet-500 to-violet-600",
      bg: "bg-violet-50",
    },
  ];

  /* ─── Filter tab button class ─── */
  const filterTabClass = (mode) =>
    `px-3.5 py-2 text-xs font-semibold transition flex items-center gap-1.5 ${
      filterMode === mode ? "bg-sky-500 text-white" : "text-slate-600 hover:bg-slate-50"
    }`;
  const quickBtnClass = (val) =>
    `px-3 py-1.5 text-xs font-semibold rounded-lg transition ${
      quickDays === val && filterMode === "quick"
        ? "bg-sky-500 text-white shadow-sm"
        : "text-slate-600 hover:bg-slate-100 border border-slate-200"
    }`;
  const selectClass = "rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-100";
  const dateInputClass = "rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-100";

  /* ─── RENDER ─── */

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className={cardClass}>
              <Skeleton className="mb-3 h-4 w-24" />
              <Skeleton className="h-8 w-20" />
            </div>
          ))}
        </div>
        <div className={cardClass}>
          <Skeleton className="h-64 w-full" />
        </div>
        <div className="grid gap-6 lg:grid-cols-2">
          <div className={cardClass}><Skeleton className="h-64 w-full" /></div>
          <div className={cardClass}><Skeleton className="h-64 w-full" /></div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* ── Header + Filter Bar ── */}
      <div className={`${cardClass} !p-4`}>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-xl font-bold text-slate-900">Website Analytics</h2>

          <div className="flex items-center gap-2">
            {/* Refresh */}
            <button
              onClick={() => loadAll(false)}
              disabled={refreshing}
              className="inline-flex items-center gap-1.5 rounded-xl border border-slate-300 bg-white px-3 py-2 text-xs font-bold text-slate-700 shadow-sm transition hover:bg-slate-50"
            >
              <RefreshCw className={`h-3.5 w-3.5 ${refreshing ? "animate-spin" : ""}`} />
              Refresh
            </button>
          </div>
        </div>

        {/* ── Filter Tabs ── */}
        <div className="mt-4 flex flex-col gap-3">
          {/* Mode selector */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="inline-flex overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
              <button onClick={() => setFilterMode("quick")} className={filterTabClass("quick")}>
                <Zap className="h-3 w-3" /> Quick
              </button>
              <button onClick={() => setFilterMode("month")} className={filterTabClass("month")}>
                <Calendar className="h-3 w-3" /> Month
              </button>
              <button onClick={() => setFilterMode("custom")} className={filterTabClass("custom")}>
                <CalendarRange className="h-3 w-3" /> Custom
              </button>
            </div>

            {/* Filter controls per mode */}
            {filterMode === "quick" && (
              <div className="flex flex-wrap items-center gap-2">
                {[
                  { label: "7D", value: 7 },
                  { label: "30D", value: 30 },
                  { label: "90D", value: 90 },
                  { label: "This Year", value: 365 },
                  { label: "All Time", value: 0 },
                ].map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => setQuickDays(opt.value)}
                    className={quickBtnClass(opt.value)}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            )}

            {filterMode === "month" && (
              <div className="flex flex-wrap items-center gap-2">
                <select
                  value={selectedMonth}
                  onChange={(e) => setSelectedMonth(Number(e.target.value))}
                  className={selectClass}
                >
                  {MONTHS.map((m, i) => (
                    <option key={i} value={i}>{m}</option>
                  ))}
                </select>
                <select
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(Number(e.target.value))}
                  className={selectClass}
                >
                  {yearOptions.map((y) => (
                    <option key={y} value={y}>{y}</option>
                  ))}
                </select>
              </div>
            )}

            {filterMode === "custom" && (
              <div className="flex flex-wrap items-center gap-2">
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-semibold text-slate-500">From</span>
                  <input
                    type="date"
                    value={customFrom}
                    onChange={(e) => setCustomFrom(e.target.value)}
                    className={dateInputClass}
                  />
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-semibold text-slate-500">To</span>
                  <input
                    type="date"
                    value={customTo}
                    onChange={(e) => setCustomTo(e.target.value)}
                    className={dateInputClass}
                  />
                </div>
              </div>
            )}

            {/* Active filter badge */}
            <span className="rounded-full bg-sky-50 px-3 py-1 text-[10px] font-bold text-sky-600 border border-sky-200">
              {filterLabel}
            </span>
          </div>
        </div>
      </div>

      {/* ── Stat Cards ── */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {statCards.map((card) => {
          const Icon = card.icon;
          return (
            <div key={card.label} className={cardClass + " relative overflow-hidden"}>
              <div className={`absolute -right-4 -top-4 h-20 w-20 rounded-full ${card.bg} opacity-60`} />
              <div className="relative">
                <div className="mb-3 flex items-center gap-2">
                  <div className={`flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br ${card.gradient} shadow-sm`}>
                    <Icon className="h-4 w-4 text-white" />
                  </div>
                  <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                    {card.label}
                  </span>
                </div>
                <p className="text-3xl font-extrabold text-slate-900">
                  {Number(card.value).toLocaleString("en-IN")}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* ── Visitor Trend Chart ── */}
      <div className={cardClass}>
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-slate-900">
            <TrendingUp className="mr-2 inline h-5 w-5 text-sky-500" />
            Visitor Trends
          </h3>
          <span className="text-xs text-slate-400">{filterLabel}</span>
        </div>
        {timeline.length === 0 ? (
          <div className="flex h-64 items-center justify-center rounded-xl border border-dashed border-slate-300 bg-slate-50 text-sm text-slate-500">
            No data yet. Visitor data will appear as users visit the website.
          </div>
        ) : (
          <ResponsiveContainer width="100%" height={320}>
            <AreaChart data={timeline} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
              <defs>
                <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorVisitors" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis
                dataKey="date"
                tick={{ fontSize: 11, fill: "#94a3b8" }}
                tickLine={false}
                axisLine={{ stroke: "#e2e8f0" }}
              />
              <YAxis
                tick={{ fontSize: 11, fill: "#94a3b8" }}
                tickLine={false}
                axisLine={false}
                width={40}
              />
              <Tooltip content={<ChartTooltip />} />
              <Area
                type="monotone"
                dataKey="page_views"
                name="Page Views"
                stroke="#0ea5e9"
                strokeWidth={2.5}
                fill="url(#colorViews)"
              />
              <Area
                type="monotone"
                dataKey="unique_visitors"
                name="Unique Visitors"
                stroke="#6366f1"
                strokeWidth={2.5}
                fill="url(#colorVisitors)"
              />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </div>

      {/* ── Devices + Browsers ── */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Devices Donut */}
        <div className={cardClass}>
          <h3 className="mb-4 text-lg font-semibold text-slate-900">
            <MonitorSmartphone className="mr-2 inline h-5 w-5 text-sky-500" />
            Device Breakdown
          </h3>
          {devices.length === 0 ? (
            <div className="flex h-56 items-center justify-center rounded-xl border border-dashed border-slate-300 bg-slate-50 text-sm text-slate-500">
              No device data yet
            </div>
          ) : (
            <div className="flex flex-col items-center gap-4 sm:flex-row">
              <ResponsiveContainer width="100%" height={240}>
                <PieChart>
                  <Pie
                    data={devices}
                    cx="50%"
                    cy="50%"
                    innerRadius={55}
                    outerRadius={95}
                    paddingAngle={3}
                    dataKey="value"
                    labelLine={false}
                    label={renderCustomLabel}
                  >
                    {devices.map((_, i) => (
                      <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="w-full space-y-2.5 sm:w-auto">
                {devices.map((d, i) => {
                  const DevIcon = DEVICE_ICONS[d.name] || Laptop;
                  const pct = totalDeviceVisits ? ((d.value / totalDeviceVisits) * 100).toFixed(1) : 0;
                  return (
                    <div key={d.name} className="flex items-center gap-3 rounded-xl border border-slate-100 bg-slate-50/50 px-3 py-2">
                      <div
                        className="flex h-7 w-7 items-center justify-center rounded-lg"
                        style={{ backgroundColor: CHART_COLORS[i % CHART_COLORS.length] + "20" }}
                      >
                        <DevIcon className="h-3.5 w-3.5" style={{ color: CHART_COLORS[i % CHART_COLORS.length] }} />
                      </div>
                      <div className="flex-1">
                        <p className="text-xs font-bold capitalize text-slate-700">{d.name}</p>
                        <p className="text-[10px] text-slate-400">{d.value.toLocaleString("en-IN")} visits</p>
                      </div>
                      <span className="text-xs font-extrabold text-slate-900">{pct}%</span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Browsers Bar */}
        <div className={cardClass}>
          <h3 className="mb-4 text-lg font-semibold text-slate-900">
            <Globe className="mr-2 inline h-5 w-5 text-sky-500" />
            Browser Usage
          </h3>
          {browsers.length === 0 ? (
            <div className="flex h-56 items-center justify-center rounded-xl border border-dashed border-slate-300 bg-slate-50 text-sm text-slate-500">
              No browser data yet
            </div>
          ) : (
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={browsers} layout="vertical" margin={{ top: 0, right: 20, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" horizontal={false} />
                <XAxis type="number" tick={{ fontSize: 11, fill: "#94a3b8" }} tickLine={false} axisLine={false} />
                <YAxis
                  dataKey="name"
                  type="category"
                  width={65}
                  tick={{ fontSize: 12, fill: "#475569", fontWeight: 600 }}
                  tickLine={false}
                  axisLine={false}
                />
                <Tooltip content={<ChartTooltip />} />
                <Bar dataKey="value" name="Visits" radius={[0, 8, 8, 0]} barSize={24}>
                  {browsers.map((_, i) => (
                    <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>

      {/* ── OS + Top Pages ── */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* OS Donut */}
        <div className={cardClass}>
          <h3 className="mb-4 text-lg font-semibold text-slate-900">
            <Laptop className="mr-2 inline h-5 w-5 text-sky-500" />
            Operating Systems
          </h3>
          {osList.length === 0 ? (
            <div className="flex h-56 items-center justify-center rounded-xl border border-dashed border-slate-300 bg-slate-50 text-sm text-slate-500">
              No OS data yet
            </div>
          ) : (
            <div className="flex flex-col items-center gap-4 sm:flex-row">
              <ResponsiveContainer width="100%" height={240}>
                <PieChart>
                  <Pie
                    data={osList}
                    cx="50%"
                    cy="50%"
                    innerRadius={55}
                    outerRadius={95}
                    paddingAngle={3}
                    dataKey="value"
                    labelLine={false}
                    label={renderCustomLabel}
                  >
                    {osList.map((_, i) => (
                      <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="w-full space-y-2 sm:w-auto">
                {osList.map((d, i) => {
                  const total = osList.reduce((s, x) => s + x.value, 0);
                  const pct = total ? ((d.value / total) * 100).toFixed(1) : 0;
                  return (
                    <div key={d.name} className="flex items-center gap-3 rounded-xl border border-slate-100 bg-slate-50/50 px-3 py-2">
                      <div
                        className="h-3 w-3 rounded-full"
                        style={{ backgroundColor: CHART_COLORS[i % CHART_COLORS.length] }}
                      />
                      <span className="flex-1 text-xs font-bold text-slate-700">{d.name}</span>
                      <span className="text-[10px] text-slate-400">{d.value.toLocaleString("en-IN")}</span>
                      <span className="text-xs font-extrabold text-slate-900">{pct}%</span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Top Pages — limited to 15 */}
        <div className={cardClass}>
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-lg font-semibold text-slate-900">
              <FileText className="mr-2 inline h-5 w-5 text-sky-500" />
              Most Visited Pages
            </h3>
            <span className="text-[10px] text-slate-400 font-medium">Top 15</span>
          </div>
          {topPages.length === 0 ? (
            <div className="flex h-56 items-center justify-center rounded-xl border border-dashed border-slate-300 bg-slate-50 text-sm text-slate-500">
              No page data yet
            </div>
          ) : (
            <>
              <div className="max-h-[380px] space-y-1.5 overflow-y-auto pr-1 custom-scrollbar">
                {/* Header */}
                <div className="sticky top-0 z-10 grid grid-cols-[1fr_70px_70px] gap-2 rounded-lg bg-slate-100 px-3 py-2 text-[10px] font-bold uppercase tracking-wider text-slate-500">
                  <span>Page</span>
                  <span className="text-right">Views</span>
                  <span className="text-right">Unique</span>
                </div>
                {topPages.map((page, i) => (
                  <div
                    key={page.path}
                    className="grid grid-cols-[1fr_70px_70px] items-center gap-2 rounded-xl border border-slate-100 bg-slate-50/50 px-3 py-2.5 transition hover:bg-slate-50"
                  >
                    <div className="flex items-center gap-2 overflow-hidden">
                      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-sky-100 text-[10px] font-extrabold text-sky-600">
                        {i + 1}
                      </span>
                      <span className="truncate text-xs font-semibold text-slate-700" title={page.path}>
                        {page.path}
                      </span>
                    </div>
                    <span className="text-right text-xs font-bold text-slate-900">
                      {page.views.toLocaleString("en-IN")}
                    </span>
                    <span className="text-right text-xs font-semibold text-slate-500">
                      {page.unique_visitors.toLocaleString("en-IN")}
                    </span>
                  </div>
                ))}
              </div>
              {/* View All button */}
              {topPagesTotal > 15 && (
                <button
                  onClick={() => setShowAllPages(true)}
                  className="mt-3 flex w-full items-center justify-center gap-1.5 rounded-xl border border-sky-200 bg-sky-50 py-2.5 text-xs font-bold text-sky-600 transition hover:bg-sky-100"
                >
                  <ExternalLink className="h-3.5 w-3.5" />
                  View All {topPagesTotal.toLocaleString("en-IN")} Pages
                </button>
              )}
            </>
          )}
        </div>
      </div>

      {/* ── All Pages Modal ── */}
      <AllPagesModal
        open={showAllPages}
        onClose={() => setShowAllPages(false)}
        filters={activeFilter}
        filterLabel={filterLabel}
      />
    </div>
  );
};

export default AnalyticsTab;
