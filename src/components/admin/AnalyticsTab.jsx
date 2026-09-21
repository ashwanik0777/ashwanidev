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
  Legend,
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

/* ─── Theme Colors ─── */
const CHART_COLORS = [
  "#0ea5e9", // sky-500
  "#6366f1", // indigo-500
  "#10b981", // emerald-500
  "#f59e0b", // amber-500
  "#f43f5e", // rose-500
  "#8b5cf6", // violet-500
  "#06b6d4", // cyan-500
  "#ec4899", // pink-500
];

const DEVICE_ICONS = {
  desktop: Monitor,
  mobile: Smartphone,
  tablet: Tablet,
};

const RANGE_OPTIONS = [
  { label: "7 Days", value: 7 },
  { label: "30 Days", value: 30 },
  { label: "90 Days", value: 90 },
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
  const [days, setDays] = useState(30);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [overview, setOverview] = useState({});
  const [timeline, setTimeline] = useState([]);
  const [devices, setDevices] = useState([]);
  const [browsers, setBrowsers] = useState([]);
  const [osList, setOsList] = useState([]);
  const [topPages, setTopPages] = useState([]);

  const loadAll = useCallback(
    async (showSpinner = true) => {
      if (showSpinner) setLoading(true);
      else setRefreshing(true);
      try {
        const [ov, tl, dv, br, os, pg] = await Promise.all([
          fetchAnalyticsOverview(),
          fetchVisitorTimeline(days),
          fetchDeviceBreakdown(days),
          fetchBrowserBreakdown(days),
          fetchOsBreakdown(days),
          fetchTopPages(days),
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
        setTopPages(pg.map((d) => ({ ...d, views: Number(d.views), unique_visitors: Number(d.unique_visitors) })));
      } catch (err) {
        console.error("Analytics load error:", err);
      } finally {
        setLoading(false);
        setRefreshing(false);
      }
    },
    [days],
  );

  useEffect(() => {
    loadAll(true);
  }, [loadAll]);

  const totalDeviceVisits = useMemo(() => devices.reduce((sum, d) => sum + d.value, 0), [devices]);
  const totalBrowserVisits = useMemo(() => browsers.reduce((sum, d) => sum + d.value, 0), [browsers]);

  /* ─── Stat Cards Data ─── */
  const statCards = [
    {
      label: "Total Unique Visitors",
      value: overview.totalUniqueVisitors ?? 0,
      icon: Users,
      gradient: "from-sky-500 to-sky-600",
      bg: "bg-sky-50",
      text: "text-sky-700",
    },
    {
      label: "Today's Visitors",
      value: overview.todayUniqueVisitors ?? 0,
      icon: Eye,
      gradient: "from-emerald-500 to-emerald-600",
      bg: "bg-emerald-50",
      text: "text-emerald-700",
    },
    {
      label: "This Week",
      value: overview.weekUniqueVisitors ?? 0,
      icon: TrendingUp,
      gradient: "from-indigo-500 to-indigo-600",
      bg: "bg-indigo-50",
      text: "text-indigo-700",
    },
    {
      label: "This Month",
      value: overview.monthUniqueVisitors ?? 0,
      icon: Globe,
      gradient: "from-amber-500 to-amber-600",
      bg: "bg-amber-50",
      text: "text-amber-700",
    },
    {
      label: "Today's Page Views",
      value: overview.todayPageViews ?? 0,
      icon: FileText,
      gradient: "from-rose-500 to-rose-600",
      bg: "bg-rose-50",
      text: "text-rose-700",
    },
    {
      label: "Total Page Views",
      value: overview.totalPageViews ?? 0,
      icon: BarChart3,
      gradient: "from-violet-500 to-violet-600",
      bg: "bg-violet-50",
      text: "text-violet-700",
    },
  ];

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
      {/* ── Header ── */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Website Analytics</h2>
          {/* <p className="mt-1 text-sm text-slate-500">Track visitor activity, devices, browsers & popular pages</p> */}
        </div>
        <div className="flex items-center gap-2">
          {/* Range Selector */}
          <div className="inline-flex overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
            {RANGE_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                onClick={() => setDays(opt.value)}
                className={`px-3.5 py-2 text-xs font-semibold transition ${
                  days === opt.value
                    ? "bg-sky-500 text-white"
                    : "text-slate-600 hover:bg-slate-50"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
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
          <span className="text-xs text-slate-400">Last {days} days</span>
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

        {/* Top Pages */}
        <div className={cardClass}>
          <h3 className="mb-4 text-lg font-semibold text-slate-900">
            <FileText className="mr-2 inline h-5 w-5 text-sky-500" />
            Most Visited Pages
          </h3>
          {topPages.length === 0 ? (
            <div className="flex h-56 items-center justify-center rounded-xl border border-dashed border-slate-300 bg-slate-50 text-sm text-slate-500">
              No page data yet
            </div>
          ) : (
            <div className="max-h-[320px] space-y-1.5 overflow-y-auto pr-1 custom-scrollbar">
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
          )}
        </div>
      </div>
    </div>
  );
};

export default AnalyticsTab;
