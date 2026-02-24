"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useAppStore } from "@/stores/app-store";
import { t, isRTL } from "@/lib/translations";
import { cn, formatMRU } from "@/lib/utils";
import { mockOrders, orderStatusConfig, type OrderStatus } from "@/data/mock-orders";
import {
  BarChart3,
  Users,
  Package,
  DollarSign,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  Eye,
  Send,
  AlertCircle,
  TrendingUp,
  ArrowUpRight,
} from "lucide-react";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type AdminTab = "overview" | "orders" | "users" | "analytics";

// ---------------------------------------------------------------------------
// Mock data
// ---------------------------------------------------------------------------

const mockUsers = [
  { id: "user-1", name: "Ahmed Ould Mohamed", phone: "+222 22 33 44 55", orders: 5, totalSpent: 3568, joinDate: "2025-12-01" },
  { id: "user-2", name: "Fatima Mint Sidi", phone: "+222 36 11 22 33", orders: 3, totalSpent: 1875, joinDate: "2026-01-10" },
  { id: "user-3", name: "Oumar Ba", phone: "+222 42 55 66 77", orders: 8, totalSpent: 6200, joinDate: "2025-11-15" },
  { id: "user-4", name: "Mariem Mint Ahmed", phone: "+222 46 88 99 00", orders: 2, totalSpent: 1033, joinDate: "2026-02-05" },
  { id: "user-5", name: "Cheikh Ould Abdallahi", phone: "+222 33 77 44 11", orders: 12, totalSpent: 9450, joinDate: "2025-10-20" },
  { id: "user-6", name: "Aissata Diallo", phone: "+222 41 22 33 99", orders: 1, totalSpent: 429, joinDate: "2026-02-18" },
];

const weeklyOrderData = [
  { day: "Mon", orders: 12, revenue: 5200 },
  { day: "Tue", orders: 18, revenue: 7800 },
  { day: "Wed", orders: 8, revenue: 3400 },
  { day: "Thu", orders: 22, revenue: 9600 },
  { day: "Fri", orders: 15, revenue: 6500 },
  { day: "Sat", orders: 28, revenue: 12100 },
  { day: "Sun", orders: 20, revenue: 8700 },
];

const topServices = [
  { name: "Spotify Premium", count: 42, color: "#1DB954" },
  { name: "Netflix", count: 38, color: "#E50914" },
  { name: "ChatGPT Plus", count: 27, color: "#10A37F" },
  { name: "Roblox", count: 21, color: "#E3231D" },
  { name: "PlayStation Plus", count: 15, color: "#003087" },
];

const paymentMethods = [
  { name: "Bankily", share: 42, color: "#00D4AA" },
  { name: "Sedad", share: 28, color: "#D4A445" },
  { name: "Masrivi", share: 18, color: "#3693F3" },
  { name: "BimBank", share: 12, color: "#E50914" },
];

// ---------------------------------------------------------------------------
// Sidebar navigation items
// ---------------------------------------------------------------------------

const sidebarItems: { key: AdminTab; label: string; icon: typeof BarChart3 }[] = [
  { key: "overview", label: "Overview", icon: BarChart3 },
  { key: "orders", label: "Orders", icon: Package },
  { key: "users", label: "Users", icon: Users },
  { key: "analytics", label: "Analytics", icon: TrendingUp },
];

// ---------------------------------------------------------------------------
// Stat Card
// ---------------------------------------------------------------------------

function StatCard({
  title,
  value,
  subtitle,
  icon: Icon,
  iconColor,
  isDark,
  valueColor,
  index,
}: {
  title: string;
  value: string;
  subtitle?: string;
  icon: typeof BarChart3;
  iconColor: string;
  isDark: boolean;
  valueColor?: string;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      className={cn(
        "relative p-5 rounded-2xl overflow-hidden",
        isDark
          ? "bg-card-dark border border-border-dark"
          : "bg-white border border-gray-100 shadow-sm"
      )}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1 min-w-0">
          <p className={cn("text-sm font-medium", isDark ? "text-gray-400" : "text-gray-500")}>
            {title}
          </p>
          <p
            className={cn("text-2xl font-bold mt-1.5 truncate", valueColor || (isDark ? "text-white" : "text-navy"))}
          >
            {value}
          </p>
          {subtitle && (
            <p className={cn("text-xs mt-1 flex items-center gap-1", isDark ? "text-gray-500" : "text-gray-400")}>
              <ArrowUpRight size={12} className="text-teal" />
              {subtitle}
            </p>
          )}
        </div>
        <div
          className="flex items-center justify-center w-10 h-10 rounded-xl flex-shrink-0"
          style={{ backgroundColor: `${iconColor}15` }}
        >
          <Icon size={20} style={{ color: iconColor }} />
        </div>
      </div>
    </motion.div>
  );
}

// ---------------------------------------------------------------------------
// Status Badge
// ---------------------------------------------------------------------------

function StatusBadge({ status, language }: { status: OrderStatus; language: "en" | "ar" | "fr" }) {
  const config = orderStatusConfig[status];
  const label = language === "ar" ? config.labelAr : language === "fr" ? config.labelFr : config.label;

  return (
    <span
      className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full"
      style={{ backgroundColor: `${config.color}18`, color: config.color }}
    >
      <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: config.color }} />
      {label}
    </span>
  );
}

// ---------------------------------------------------------------------------
// Mini Bar Chart (div-based)
// ---------------------------------------------------------------------------

function MiniBarChart({
  data,
  isDark,
  height = 120,
}: {
  data: { label: string; value: number }[];
  isDark: boolean;
  height?: number;
}) {
  const maxValue = Math.max(...data.map((d) => d.value));

  return (
    <div className="flex items-end justify-between gap-2" style={{ height }}>
      {data.map((d, i) => {
        const barHeight = (d.value / maxValue) * 100;
        return (
          <div key={i} className="flex flex-col items-center gap-1 flex-1">
            <span className={cn("text-[10px] font-medium", isDark ? "text-gray-400" : "text-gray-500")}>
              {d.value}
            </span>
            <motion.div
              initial={{ height: 0 }}
              animate={{ height: `${barHeight}%` }}
              transition={{ duration: 0.6, delay: i * 0.06, ease: "easeOut" }}
              className="w-full rounded-t-md min-h-[4px]"
              style={{
                background: `linear-gradient(to top, rgba(0,212,170,0.7), rgba(0,212,170,0.35))`,
              }}
            />
            <span className={cn("text-[10px]", isDark ? "text-gray-600" : "text-gray-400")}>
              {d.label}
            </span>
          </div>
        );
      })}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Horizontal Bar Chart
// ---------------------------------------------------------------------------

function HorizontalBarChart({
  data,
  isDark,
}: {
  data: { name: string; count: number; color: string }[];
  isDark: boolean;
}) {
  const maxCount = Math.max(...data.map((d) => d.count));

  return (
    <div className="space-y-3">
      {data.map((d, i) => (
        <div key={i} className="space-y-1">
          <div className="flex items-center justify-between text-sm">
            <span className={cn("font-medium", isDark ? "text-gray-300" : "text-gray-700")}>{d.name}</span>
            <span className={cn("text-xs", isDark ? "text-gray-500" : "text-gray-400")}>{d.count} orders</span>
          </div>
          <div className={cn("h-2.5 rounded-full overflow-hidden", isDark ? "bg-white/5" : "bg-gray-100")}>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${(d.count / maxCount) * 100}%` }}
              transition={{ duration: 0.7, delay: i * 0.1, ease: "easeOut" }}
              className="h-full rounded-full"
              style={{ backgroundColor: d.color }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Payment Method Distribution Bar
// ---------------------------------------------------------------------------

function PaymentDistribution({
  data,
  isDark,
}: {
  data: { name: string; share: number; color: string }[];
  isDark: boolean;
}) {
  return (
    <div>
      {/* Stacked horizontal bar */}
      <div className="flex h-5 rounded-full overflow-hidden mb-4">
        {data.map((d, i) => (
          <motion.div
            key={i}
            initial={{ width: 0 }}
            animate={{ width: `${d.share}%` }}
            transition={{ duration: 0.8, delay: i * 0.1, ease: "easeOut" }}
            className="h-full"
            style={{ backgroundColor: d.color }}
          />
        ))}
      </div>
      {/* Legend */}
      <div className="grid grid-cols-2 gap-2">
        {data.map((d, i) => (
          <div key={i} className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-sm flex-shrink-0" style={{ backgroundColor: d.color }} />
            <span className={cn("text-sm", isDark ? "text-gray-300" : "text-gray-600")}>
              {d.name}
            </span>
            <span className={cn("text-xs ml-auto", isDark ? "text-gray-500" : "text-gray-400")}>
              {d.share}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Overview Tab
// ---------------------------------------------------------------------------

function OverviewTab({ isDark, language }: { isDark: boolean; language: "en" | "ar" | "fr" }) {
  const totalRevenue = mockOrders.reduce((sum, o) => sum + o.totalMRU, 0);
  const pendingCount = mockOrders.filter((o) => o.status === "pending").length;

  return (
    <div className="space-y-6">
      {/* Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard
          title="Total Revenue"
          value={formatMRU(totalRevenue)}
          subtitle="+12.5% from last week"
          icon={DollarSign}
          iconColor="#D4A445"
          isDark={isDark}
          valueColor="text-gold"
          index={0}
        />
        <StatCard
          title="Total Orders"
          value={String(mockOrders.length)}
          subtitle="+3 today"
          icon={Package}
          iconColor="#00D4AA"
          isDark={isDark}
          index={1}
        />
        <StatCard
          title="Pending Verification"
          value={String(pendingCount)}
          subtitle="Needs attention"
          icon={AlertCircle}
          iconColor="#E8C472"
          isDark={isDark}
          index={2}
        />
        <StatCard
          title="Conversion Rate"
          value="87.3%"
          subtitle="+2.1% this month"
          icon={TrendingUp}
          iconColor="#3693F3"
          isDark={isDark}
          index={3}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent orders */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className={cn(
            "lg:col-span-2 rounded-2xl p-5 overflow-hidden",
            isDark
              ? "bg-card-dark border border-border-dark"
              : "bg-white border border-gray-100 shadow-sm"
          )}
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className={cn("text-base font-bold", isDark ? "text-white" : "text-navy")}>
              Recent Orders
            </h3>
            <span className={cn("text-xs", isDark ? "text-gray-500" : "text-gray-400")}>
              Last 5 orders
            </span>
          </div>

          <div className="space-y-3">
            {mockOrders.slice(0, 5).map((order) => (
              <div
                key={order.id}
                className={cn(
                  "flex items-center gap-3 p-3 rounded-xl transition-colors",
                  isDark ? "hover:bg-white/[0.03]" : "hover:bg-gray-50"
                )}
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className={cn("text-sm font-semibold", isDark ? "text-white" : "text-navy")}>
                      {order.id}
                    </span>
                    <StatusBadge status={order.status} language={language} />
                  </div>
                  <p className={cn("text-xs mt-0.5 truncate", isDark ? "text-gray-500" : "text-gray-400")}>
                    {order.serviceName} &middot; {order.planName}
                  </p>
                </div>
                <span className={cn("text-sm font-bold flex-shrink-0", isDark ? "text-white" : "text-navy")}>
                  {formatMRU(order.totalMRU)}
                </span>
                <div className="flex items-center gap-1.5 flex-shrink-0">
                  {order.status === "pending" && (
                    <button className="flex items-center gap-1 text-xs font-semibold px-2.5 py-1.5 rounded-lg bg-teal/10 text-teal hover:bg-teal/20 transition-colors">
                      <CheckCircle2 size={12} /> Verify
                    </button>
                  )}
                  {order.status === "confirmed" && (
                    <button className="flex items-center gap-1 text-xs font-semibold px-2.5 py-1.5 rounded-lg bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 transition-colors">
                      <Send size={12} /> Fulfill
                    </button>
                  )}
                  <button
                    className={cn(
                      "flex items-center gap-1 text-xs font-medium px-2.5 py-1.5 rounded-lg transition-colors",
                      isDark ? "text-gray-400 hover:bg-white/5" : "text-gray-500 hover:bg-gray-100"
                    )}
                  >
                    <Eye size={12} /> View
                  </button>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Mini chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.4 }}
          className={cn(
            "rounded-2xl p-5",
            isDark
              ? "bg-card-dark border border-border-dark"
              : "bg-white border border-gray-100 shadow-sm"
          )}
        >
          <h3 className={cn("text-base font-bold mb-1", isDark ? "text-white" : "text-navy")}>
            Orders This Week
          </h3>
          <p className={cn("text-xs mb-4", isDark ? "text-gray-500" : "text-gray-400")}>
            Daily order count
          </p>
          <MiniBarChart
            data={weeklyOrderData.map((d) => ({ label: d.day, value: d.orders }))}
            isDark={isDark}
            height={140}
          />
        </motion.div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Orders Tab
// ---------------------------------------------------------------------------

function OrdersTab({ isDark, language }: { isDark: boolean; language: "en" | "ar" | "fr" }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | OrderStatus>("all");
  const [deliveryCodes, setDeliveryCodes] = useState<Record<string, string>>({});

  const filteredOrders = mockOrders.filter((order) => {
    const matchesStatus = statusFilter === "all" || order.status === statusFilter;
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      !q ||
      order.id.toLowerCase().includes(q) ||
      order.serviceName.toLowerCase().includes(q) ||
      order.planName.toLowerCase().includes(q) ||
      order.paymentMethod.toLowerCase().includes(q);
    return matchesStatus && matchesSearch;
  });

  const statusOptions: { key: "all" | OrderStatus; label: string }[] = [
    { key: "all", label: "All" },
    { key: "pending", label: "Pending" },
    { key: "confirmed", label: "Confirmed" },
    { key: "processing", label: "Processing" },
    { key: "delivered", label: "Delivered" },
  ];

  return (
    <div className="space-y-4">
      {/* Search and filter bar */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row gap-3"
      >
        <div
          className={cn(
            "relative flex items-center rounded-xl flex-1 overflow-hidden",
            isDark
              ? "bg-white/5 border border-white/10 focus-within:border-teal/40"
              : "bg-white border border-gray-200 focus-within:border-teal/40 shadow-sm"
          )}
        >
          <Search size={16} className={cn("mx-3 flex-shrink-0", isDark ? "text-gray-500" : "text-gray-400")} />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search orders..."
            className={cn(
              "flex-1 py-2.5 bg-transparent text-sm outline-none placeholder:text-gray-500",
              isDark ? "text-white" : "text-navy"
            )}
          />
        </div>

        <div
          className={cn(
            "relative flex items-center rounded-xl overflow-hidden",
            isDark
              ? "bg-white/5 border border-white/10"
              : "bg-white border border-gray-200 shadow-sm"
          )}
        >
          <Filter size={14} className={cn("mx-3 flex-shrink-0", isDark ? "text-gray-500" : "text-gray-400")} />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as "all" | OrderStatus)}
            className={cn(
              "py-2.5 pr-8 bg-transparent text-sm outline-none appearance-none cursor-pointer",
              isDark ? "text-white" : "text-navy"
            )}
          >
            {statusOptions.map((opt) => (
              <option key={opt.key} value={opt.key} className={isDark ? "bg-navy text-white" : ""}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      </motion.div>

      {/* Orders table / list */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className={cn(
          "rounded-2xl overflow-hidden",
          isDark
            ? "bg-card-dark border border-border-dark"
            : "bg-white border border-gray-100 shadow-sm"
        )}
      >
        {/* Table header - hidden on mobile */}
        <div
          className={cn(
            "hidden md:grid md:grid-cols-[100px_1fr_1fr_100px_120px_110px_180px] gap-3 px-5 py-3 text-xs font-semibold uppercase tracking-wider border-b",
            isDark ? "text-gray-500 border-white/5 bg-white/[0.02]" : "text-gray-400 border-gray-100 bg-gray-50/50"
          )}
        >
          <span>Order ID</span>
          <span>User</span>
          <span>Service</span>
          <span>Amount</span>
          <span>Status</span>
          <span>Date</span>
          <span>Actions</span>
        </div>

        {/* Rows */}
        <div className="divide-y" style={{ borderColor: isDark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.04)" }}>
          {filteredOrders.map((order) => {
            const date = new Date(order.createdAt);
            const dateStr = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;

            return (
              <div
                key={order.id}
                className={cn(
                  "flex flex-col md:grid md:grid-cols-[100px_1fr_1fr_100px_120px_110px_180px] gap-2 md:gap-3 p-4 md:px-5 md:py-3.5 md:items-center transition-colors",
                  isDark ? "hover:bg-white/[0.02]" : "hover:bg-gray-50/50"
                )}
              >
                {/* Order ID */}
                <span className={cn("text-sm font-semibold", isDark ? "text-white" : "text-navy")}>
                  <span className="md:hidden text-xs font-normal text-gray-500 mr-1">ID:</span>
                  {order.id}
                </span>

                {/* User */}
                <span className={cn("text-sm truncate", isDark ? "text-gray-300" : "text-gray-600")}>
                  <span className="md:hidden text-xs font-normal text-gray-500 mr-1">User:</span>
                  {order.userId}
                </span>

                {/* Service */}
                <div className="flex flex-col">
                  <span className={cn("text-sm font-medium truncate", isDark ? "text-gray-200" : "text-gray-700")}>
                    {order.serviceName}
                  </span>
                  <span className={cn("text-xs truncate", isDark ? "text-gray-600" : "text-gray-400")}>
                    {order.planName}
                  </span>
                </div>

                {/* Amount */}
                <span className={cn("text-sm font-bold", isDark ? "text-white" : "text-navy")}>
                  <span className="md:hidden text-xs font-normal text-gray-500 mr-1">Amt:</span>
                  {formatMRU(order.totalMRU)}
                </span>

                {/* Status */}
                <div>
                  <StatusBadge status={order.status} language={language} />
                </div>

                {/* Date */}
                <span className={cn("text-xs", isDark ? "text-gray-500" : "text-gray-400")}>
                  {dateStr}
                </span>

                {/* Actions */}
                <div className="flex items-center gap-1.5 flex-wrap">
                  {order.status === "pending" && (
                    <button className="flex items-center gap-1 text-xs font-semibold px-3 py-1.5 rounded-lg bg-teal/15 text-teal hover:bg-teal/25 transition-colors">
                      <CheckCircle2 size={12} /> Verify Payment
                    </button>
                  )}
                  {order.status === "confirmed" && (
                    <button className="flex items-center gap-1 text-xs font-semibold px-3 py-1.5 rounded-lg bg-blue-500/15 text-blue-400 hover:bg-blue-500/25 transition-colors">
                      <Clock size={12} /> Mark Processing
                    </button>
                  )}
                  {order.status === "processing" && (
                    <div className="flex items-center gap-1.5">
                      <input
                        type="text"
                        placeholder="Enter code..."
                        value={deliveryCodes[order.id] || ""}
                        onChange={(e) =>
                          setDeliveryCodes((prev) => ({ ...prev, [order.id]: e.target.value }))
                        }
                        className={cn(
                          "text-xs px-2.5 py-1.5 rounded-lg w-28 outline-none border",
                          isDark
                            ? "bg-white/5 border-white/10 text-white placeholder:text-gray-600 focus:border-teal/40"
                            : "bg-gray-50 border-gray-200 text-navy placeholder:text-gray-400 focus:border-teal/40"
                        )}
                      />
                      <button className="flex items-center gap-1 text-xs font-semibold px-2.5 py-1.5 rounded-lg bg-teal/15 text-teal hover:bg-teal/25 transition-colors">
                        <Send size={11} /> Deliver
                      </button>
                    </div>
                  )}
                  {order.status === "delivered" && (
                    <button
                      className={cn(
                        "flex items-center gap-1 text-xs font-medium px-3 py-1.5 rounded-lg transition-colors",
                        isDark ? "text-gray-400 hover:bg-white/5" : "text-gray-500 hover:bg-gray-100"
                      )}
                    >
                      <Eye size={12} /> View Details
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {filteredOrders.length === 0 && (
          <div className="py-12 text-center">
            <Package size={32} className={isDark ? "text-gray-700 mx-auto" : "text-gray-300 mx-auto"} />
            <p className={cn("text-sm mt-3", isDark ? "text-gray-500" : "text-gray-400")}>
              No orders match your filters
            </p>
          </div>
        )}
      </motion.div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Users Tab
// ---------------------------------------------------------------------------

function UsersTab({ isDark }: { isDark: boolean }) {
  return (
    <div className="space-y-4">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <h3 className={cn("text-lg font-bold", isDark ? "text-white" : "text-navy")}>
          Registered Users
        </h3>
        <span className={cn("text-sm", isDark ? "text-gray-500" : "text-gray-400")}>
          {mockUsers.length} users
        </span>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {mockUsers.map((user, i) => {
          const joinDate = new Date(user.joinDate);
          const joinStr = joinDate.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });

          return (
            <motion.div
              key={user.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: i * 0.06 }}
              className={cn(
                "p-5 rounded-2xl transition-colors",
                isDark
                  ? "bg-card-dark border border-border-dark hover:border-teal/20"
                  : "bg-white border border-gray-100 shadow-sm hover:shadow-md"
              )}
            >
              <div className="flex items-start gap-3">
                {/* Avatar */}
                <div
                  className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0",
                    isDark ? "bg-teal/10 text-teal" : "bg-teal/10 text-teal-dark"
                  )}
                >
                  {user.name.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className={cn("text-sm font-bold truncate", isDark ? "text-white" : "text-navy")}>
                    {user.name}
                  </h4>
                  <p className={cn("text-xs mt-0.5", isDark ? "text-gray-500" : "text-gray-400")}>
                    {user.phone}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3 mt-4 pt-3 border-t" style={{ borderColor: isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)" }}>
                <div>
                  <p className={cn("text-xs", isDark ? "text-gray-600" : "text-gray-400")}>Orders</p>
                  <p className={cn("text-sm font-bold mt-0.5", isDark ? "text-white" : "text-navy")}>{user.orders}</p>
                </div>
                <div>
                  <p className={cn("text-xs", isDark ? "text-gray-600" : "text-gray-400")}>Spent</p>
                  <p className={cn("text-sm font-bold mt-0.5 text-gold")}>{formatMRU(user.totalSpent)}</p>
                </div>
                <div>
                  <p className={cn("text-xs", isDark ? "text-gray-600" : "text-gray-400")}>Joined</p>
                  <p className={cn("text-xs font-medium mt-0.5", isDark ? "text-gray-400" : "text-gray-500")}>{joinStr}</p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Analytics Tab
// ---------------------------------------------------------------------------

function AnalyticsTab({ isDark }: { isDark: boolean }) {
  return (
    <div className="space-y-6">
      {/* Orders & Revenue charts side by side */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Orders per day */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className={cn(
            "rounded-2xl p-5",
            isDark
              ? "bg-card-dark border border-border-dark"
              : "bg-white border border-gray-100 shadow-sm"
          )}
        >
          <h3 className={cn("text-base font-bold mb-1", isDark ? "text-white" : "text-navy")}>
            Orders Per Day
          </h3>
          <p className={cn("text-xs mb-5", isDark ? "text-gray-500" : "text-gray-400")}>
            Last 7 days
          </p>
          <MiniBarChart
            data={weeklyOrderData.map((d) => ({ label: d.day, value: d.orders }))}
            isDark={isDark}
            height={160}
          />
        </motion.div>

        {/* Revenue per day */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className={cn(
            "rounded-2xl p-5",
            isDark
              ? "bg-card-dark border border-border-dark"
              : "bg-white border border-gray-100 shadow-sm"
          )}
        >
          <h3 className={cn("text-base font-bold mb-1", isDark ? "text-white" : "text-navy")}>
            Revenue Per Day
          </h3>
          <p className={cn("text-xs mb-5", isDark ? "text-gray-500" : "text-gray-400")}>
            Last 7 days (MRU)
          </p>
          <MiniBarChart
            data={weeklyOrderData.map((d) => ({ label: d.day, value: d.revenue }))}
            isDark={isDark}
            height={160}
          />
        </motion.div>
      </div>

      {/* Top Services & Payment Methods */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top services */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className={cn(
            "rounded-2xl p-5",
            isDark
              ? "bg-card-dark border border-border-dark"
              : "bg-white border border-gray-100 shadow-sm"
          )}
        >
          <h3 className={cn("text-base font-bold mb-1", isDark ? "text-white" : "text-navy")}>
            Top Services
          </h3>
          <p className={cn("text-xs mb-5", isDark ? "text-gray-500" : "text-gray-400")}>
            By order count
          </p>
          <HorizontalBarChart data={topServices} isDark={isDark} />
        </motion.div>

        {/* Payment method distribution */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className={cn(
            "rounded-2xl p-5",
            isDark
              ? "bg-card-dark border border-border-dark"
              : "bg-white border border-gray-100 shadow-sm"
          )}
        >
          <h3 className={cn("text-base font-bold mb-1", isDark ? "text-white" : "text-navy")}>
            Popular Payment Methods
          </h3>
          <p className={cn("text-xs mb-5", isDark ? "text-gray-500" : "text-gray-400")}>
            Share of total transactions
          </p>
          <PaymentDistribution data={paymentMethods} isDark={isDark} />
        </motion.div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main Admin Page
// ---------------------------------------------------------------------------

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<AdminTab>("overview");
  const { language, theme } = useAppStore();
  const isDark = theme === "dark";
  const rtl = isRTL(language);

  return (
    <div
      className={cn("min-h-screen page-enter", isDark ? "bg-navy" : "bg-warm-white")}
      dir={rtl ? "rtl" : "ltr"}
    >
      {/* Header */}
      <div className={cn("border-b", isDark ? "border-white/5" : "border-black/5")}>
        <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className={cn("text-2xl sm:text-3xl font-bold", isDark ? "text-white" : "text-navy")}>
              Admin Panel
            </h1>
            <p className={cn("text-sm mt-1", isDark ? "text-gray-500" : "text-gray-400")}>
              Manage orders, users, and monitor performance
            </p>
          </motion.div>
        </div>
      </div>

      {/* Mobile tab bar */}
      <div className={cn("lg:hidden border-b sticky top-0 z-30", isDark ? "border-white/5 bg-navy/95 backdrop-blur-xl" : "border-black/5 bg-warm-white/95 backdrop-blur-xl")}>
        <div className="mx-auto max-w-[1440px] px-4 flex gap-1 overflow-x-auto py-2 no-scrollbar">
          {sidebarItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.key;
            return (
              <button
                key={item.key}
                onClick={() => setActiveTab(item.key)}
                className={cn(
                  "flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium whitespace-nowrap transition-all flex-shrink-0",
                  isActive
                    ? "bg-teal/10 text-teal"
                    : isDark
                      ? "text-gray-400 hover:text-white hover:bg-white/5"
                      : "text-gray-500 hover:text-navy hover:bg-black/5"
                )}
              >
                <Icon size={16} />
                {item.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Body: Sidebar + Content */}
      <div className="mx-auto max-w-[1440px] flex">
        {/* Desktop sidebar */}
        <aside
          className={cn(
            "hidden lg:flex flex-col w-60 flex-shrink-0 min-h-[calc(100vh-120px)] border-r sticky top-0 pt-6 px-3",
            isDark ? "border-white/5 bg-navy-light/30" : "border-black/5 bg-gray-50/50"
          )}
        >
          <nav className="space-y-1">
            {sidebarItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.key;
              return (
                <button
                  key={item.key}
                  onClick={() => setActiveTab(item.key)}
                  className={cn(
                    "w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all text-left",
                    rtl && "text-right flex-row-reverse",
                    isActive
                      ? isDark
                        ? "bg-teal/10 text-teal"
                        : "bg-teal/10 text-teal-dark"
                      : isDark
                        ? "text-gray-400 hover:text-white hover:bg-white/5"
                        : "text-gray-500 hover:text-navy hover:bg-black/5"
                  )}
                >
                  <Icon size={18} />
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Sidebar bottom info */}
          <div className="mt-auto pb-6 pt-4">
            <div
              className={cn(
                "p-4 rounded-xl",
                isDark ? "bg-white/[0.03] border border-white/5" : "bg-white border border-gray-100"
              )}
            >
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 rounded-full bg-teal animate-pulse" />
                <span className={cn("text-xs font-semibold", isDark ? "text-gray-300" : "text-gray-600")}>
                  System Status
                </span>
              </div>
              <p className={cn("text-xs", isDark ? "text-gray-500" : "text-gray-400")}>
                All services operational
              </p>
            </div>
          </div>
        </aside>

        {/* Main content */}
        <main className="flex-1 min-w-0 px-4 sm:px-6 lg:px-8 py-6">
          {activeTab === "overview" && <OverviewTab isDark={isDark} language={language} />}
          {activeTab === "orders" && <OrdersTab isDark={isDark} language={language} />}
          {activeTab === "users" && <UsersTab isDark={isDark} />}
          {activeTab === "analytics" && <AnalyticsTab isDark={isDark} />}
        </main>
      </div>
    </div>
  );
}
