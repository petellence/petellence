"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "motion/react";
import {
  User, Package, MapPin, Truck, CheckCircle,
  Clock, ChevronRight, Plus, Edit3,
} from "lucide-react";
import { useCart } from "@/lib/context";
import { PRODUCTS } from "@/lib/data";
import { C, serif, sans } from "@/lib/theme";

const TABS = [
  { id: "overview",  label: "Overview",    icon: User    },
  { id: "orders",    label: "My Orders",   icon: Package },
  { id: "addresses", label: "Addresses",   icon: MapPin  },
  { id: "tracking",  label: "Track Order", icon: Truck   },
] as const;

type TabId = typeof TABS[number]["id"];

const MOCK_ORDERS = [
  {
    id: "PL-20240112",
    date: "12 Jan 2026",
    status: "Delivered",
    statusColor: C.green,
    total: 1195,
    items: [{ product: PRODUCTS[0], qty: 1 }],
  },
  {
    id: "PL-20240228",
    date: "28 Feb 2026",
    status: "In Transit",
    statusColor: C.blue,
    total: 2390,
    items: [{ product: PRODUCTS[0], qty: 1 }, { product: PRODUCTS[2], qty: 1 }],
  },
];

const MOCK_ADDRESSES = [
  {
    id: "addr1", label: "Home", name: "Arjun Mehta",
    line1: "204, Green Terrace Apartments", line2: "Koramangala, Bengaluru",
    pincode: "560034", phone: "+91 98765 43210", default: true,
  },
  {
    id: "addr2", label: "Office", name: "Arjun Mehta",
    line1: "Level 7, WeWork Galaxy", line2: "Residency Road, Bengaluru",
    pincode: "560025", phone: "+91 98765 43210", default: false,
  },
];

const TRACKING_STEPS = [
  { label: "Order Placed",     date: "28 Feb, 10:42 AM", done: true  },
  { label: "Order Confirmed",  date: "28 Feb, 11:05 AM", done: true  },
  { label: "Dispatched",       date: "1 Mar, 09:15 AM",  done: true  },
  { label: "Out for Delivery", date: "3 Mar, 08:30 AM",  done: true  },
  { label: "Delivered",        date: "Expected today",   done: false },
];

function OrderRow({ order, expanded = false }: {
  order: typeof MOCK_ORDERS[number];
  expanded?: boolean;
}) {
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <div>
          <div className="flex items-center gap-2 mb-0.5">
            <span className="font-bold text-sm" style={{ color: C.dark, fontFamily: sans }}>{order.id}</span>
            <span className="text-xs font-bold px-2.5 py-0.5 rounded-full"
              style={{ background: `${order.statusColor}15`, color: order.statusColor }}>
              {order.status}
            </span>
          </div>
          <p className="text-xs" style={{ color: C.muted }}>{order.date}</p>
        </div>
        <p className="font-bold text-lg" style={{ fontFamily: serif, color: C.maroon }}>
          ₹{order.total.toLocaleString("en-IN")}
        </p>
      </div>
      {expanded && order.items.map(({ product: p, qty }) => (
        <div key={p.id} className="flex items-center gap-3 py-3"
          style={{ borderTop: `1px solid ${C.gold}18` }}>
          <div className="w-12 h-14 rounded-lg overflow-hidden shrink-0" style={{ border: `1px solid ${C.gold}20` }}>
            <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
          </div>
          <div>
            <p className="font-bold text-sm" style={{ fontFamily: serif, color: C.dark }}>{p.name}</p>
            <p className="text-xs" style={{ color: C.muted }}>{p.size} · Qty: {qty}</p>
          </div>
          <p className="ml-auto text-sm font-bold" style={{ color: p.accentColor }}>₹{(p.price * qty).toLocaleString("en-IN")}</p>
        </div>
      ))}
    </div>
  );
}

export default function Account() {
  const { count } = useCart();
  const router = useRouter();
  const [tab, setTab] = useState<TabId>("overview");

  return (
    <div className="min-h-screen pt-20" style={{ background: C.ivory }}>

      {/* ─── HEADER ─── */}
      <div style={{ background: `linear-gradient(135deg,${C.deepBurg},${C.burgundy})` }}>
        <div className="max-w-7xl mx-auto px-5 py-10 flex items-center gap-5">
          <motion.div
            initial={{ scale: 0 }} animate={{ scale: 1 }}
            transition={{ type: "spring", duration: 0.6 }}
            className="w-16 h-16 rounded-full flex items-center justify-center text-xl font-bold shrink-0"
            style={{ background: C.gold, color: C.deepBurg, fontFamily: serif }}
          >
            🐾
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
            <h1 className="text-2xl font-bold" style={{ fontFamily: serif, color: C.ivory }}>My Account</h1>
            <p className="text-sm" style={{ color: `${C.ivory}60` }}>Manage your orders and preferences</p>
          </motion.div>
          <div className="ml-auto">
            <button onClick={() => router.push("/cart")}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-bold"
              style={{ background: `${C.gold}1a`, border: `1px solid ${C.gold}40`, color: C.gold }}>
              Cart ({count})
            </button>
          </div>
        </div>
      </div>

      {/* ─── TAB NAV ─── */}
      <div style={{ background: C.deepBurg, borderBottom: `1px solid ${C.gold}22` }}>
        <div className="max-w-7xl mx-auto px-5 flex gap-0 overflow-x-auto">
          {TABS.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setTab(id)}
              className="flex items-center gap-2 px-5 py-4 text-sm font-bold whitespace-nowrap transition-all border-b-2"
              style={{
                color:       tab === id ? C.gold : `${C.ivory}55`,
                borderColor: tab === id ? C.gold : "transparent",
              }}
            >
              <Icon size={15} />
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* ─── TAB CONTENT ─── */}
      <div className="max-w-7xl mx-auto px-5 py-10">
        <motion.div key={tab} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}>

          {/* ─── OVERVIEW ─── */}
          {tab === "overview" && (
            <div className="space-y-6">
              <div className="grid sm:grid-cols-3 gap-4">
                {[
                  { label: "Total Orders",  value: "2",      icon: Package,     color: C.blue  },
                  { label: "Active Orders", value: "1",      icon: Truck,       color: C.gold  },
                  { label: "Total Spent",   value: "₹3,585", icon: CheckCircle, color: C.green },
                ].map(({ label, value, icon: Icon, color }) => (
                  <div key={label} className="bg-white rounded-2xl p-5 flex items-center gap-4"
                    style={{ border: `1px solid ${C.gold}28` }}>
                    <div className="w-11 h-11 rounded-xl flex items-center justify-center"
                      style={{ background: `${color}15`, border: `1px solid ${color}30` }}>
                      <Icon size={19} style={{ color }} />
                    </div>
                    <div>
                      <p className="text-xl font-bold" style={{ fontFamily: serif, color: C.dark }}>{value}</p>
                      <p className="text-xs" style={{ color: C.muted }}>{label}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-white rounded-2xl p-6" style={{ border: `1px solid ${C.gold}28` }}>
                <div className="flex items-center justify-between mb-5">
                  <h3 className="font-bold text-lg" style={{ fontFamily: serif, color: C.dark }}>Recent Order</h3>
                  <button onClick={() => setTab("orders")} className="text-xs font-bold flex items-center gap-1"
                    style={{ color: C.maroon }}>
                    View All <ChevronRight size={12} />
                  </button>
                </div>
                <OrderRow order={MOCK_ORDERS[1]} />
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  { label: "Track Your Order", sub: "Real-time delivery updates",    id: "tracking"  as TabId },
                  { label: "Manage Addresses", sub: "View and edit saved addresses", id: "addresses" as TabId },
                ].map(({ label, sub, id }) => (
                  <button key={label} onClick={() => setTab(id)}
                    className="bg-white rounded-2xl p-5 flex items-center gap-4 text-left transition-all hover:shadow-md"
                    style={{ border: `1px solid ${C.gold}28` }}>
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                      style={{ background: `${C.maroon}0e` }}>
                      {id === "tracking" ? <Truck size={17} style={{ color: C.maroon }} /> : <MapPin size={17} style={{ color: C.maroon }} />}
                    </div>
                    <div>
                      <p className="font-bold text-sm" style={{ color: C.dark }}>{label}</p>
                      <p className="text-xs" style={{ color: C.muted }}>{sub}</p>
                    </div>
                    <ChevronRight size={15} className="ml-auto" style={{ color: C.muted }} />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* ─── MY ORDERS ─── */}
          {tab === "orders" && (
            <div className="space-y-5">
              <h2 className="text-2xl font-bold" style={{ fontFamily: serif, color: C.dark }}>My Orders</h2>
              {MOCK_ORDERS.map(order => (
                <div key={order.id} className="bg-white rounded-2xl p-6"
                  style={{ border: `1px solid ${C.gold}28` }}>
                  <OrderRow order={order} expanded />
                </div>
              ))}
            </div>
          )}

          {/* ─── ADDRESSES ─── */}
          {tab === "addresses" && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold" style={{ fontFamily: serif, color: C.dark }}>Saved Addresses</h2>
                <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold"
                  style={{ background: C.maroon, color: C.ivory }}
                  onMouseEnter={e => (e.currentTarget.style.opacity = "0.85")}
                  onMouseLeave={e => (e.currentTarget.style.opacity = "1")}>
                  <Plus size={14} /> Add New
                </button>
              </div>
              <div className="grid md:grid-cols-2 gap-5">
                {MOCK_ADDRESSES.map(addr => (
                  <motion.div
                    key={addr.id}
                    whileHover={{ y: -3, transition: { duration: 0.2 } }}
                    className="bg-white rounded-2xl p-6"
                    style={{ border: `2px solid ${addr.default ? C.gold : C.gold + "28"}` }}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold px-2.5 py-1 rounded-full"
                          style={{ background: `${C.maroon}12`, color: C.maroon }}>
                          {addr.label}
                        </span>
                        {addr.default && (
                          <span className="text-xs font-bold px-2 py-0.5 rounded-full"
                            style={{ background: `${C.green}15`, color: C.green }}>
                            Default
                          </span>
                        )}
                      </div>
                      <button className="p-1.5 rounded-lg transition-colors" style={{ color: C.muted }}
                        onMouseEnter={e => (e.currentTarget.style.color = C.gold)}
                        onMouseLeave={e => (e.currentTarget.style.color = C.muted)}>
                        <Edit3 size={14} />
                      </button>
                    </div>
                    <p className="font-bold text-sm mb-1" style={{ color: C.dark }}>{addr.name}</p>
                    <p className="text-sm" style={{ color: C.muted }}>{addr.line1}</p>
                    <p className="text-sm" style={{ color: C.muted }}>{addr.line2} — {addr.pincode}</p>
                    <p className="text-xs mt-2" style={{ color: C.muted }}>{addr.phone}</p>
                    {!addr.default && (
                      <button className="text-xs font-bold mt-3 transition-colors" style={{ color: C.maroon }}
                        onMouseEnter={e => (e.currentTarget.style.color = C.gold)}
                        onMouseLeave={e => (e.currentTarget.style.color = C.maroon)}>
                        Set as Default
                      </button>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* ─── TRACK ORDER ─── */}
          {tab === "tracking" && (
            <div className="max-w-2xl">
              <h2 className="text-2xl font-bold mb-6" style={{ fontFamily: serif, color: C.dark }}>Track Your Order</h2>

              <div className="bg-white rounded-2xl p-5 mb-6" style={{ border: `1px solid ${C.gold}28` }}>
                <p className="text-xs font-bold tracking-wide mb-3" style={{ color: C.gold }}>SELECT ORDER</p>
                <div className="grid sm:grid-cols-2 gap-3">
                  {MOCK_ORDERS.map(o => (
                    <div key={o.id} className="flex items-center gap-3 p-3 rounded-xl"
                      style={{ background: `${C.gold}07`, border: `1px solid ${C.gold}28` }}>
                      <div>
                        <p className="text-xs font-bold" style={{ color: C.dark }}>{o.id}</p>
                        <p className="text-[10px]" style={{ color: C.muted }}>{o.date}</p>
                      </div>
                      <span className="ml-auto text-xs font-bold px-2.5 py-1 rounded-full"
                        style={{ background: `${o.statusColor}15`, color: o.statusColor }}>
                        {o.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6" style={{ border: `1px solid ${C.gold}28` }}>
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <p className="font-bold text-base" style={{ fontFamily: serif, color: C.dark }}>Order PL-20240228</p>
                    <p className="text-xs" style={{ color: C.muted }}>28 Feb 2026 · ₹2,390</p>
                  </div>
                  <span className="text-xs font-bold px-3 py-1.5 rounded-full"
                    style={{ background: `${C.blue}15`, color: C.blue }}>
                    In Transit
                  </span>
                </div>

                <div className="relative">
                  <div className="absolute left-5 top-2 bottom-2 w-0.5" style={{ background: `${C.gold}20` }} />
                  <div className="space-y-0">
                    {TRACKING_STEPS.map(({ label, date, done }, i) => (
                      <motion.div
                        key={label}
                        initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: i * 0.12 }}
                        className="flex items-start gap-4 pb-7 last:pb-0 relative"
                      >
                        <motion.div
                          initial={{ scale: 0 }} animate={{ scale: 1 }}
                          transition={{ type: "spring", delay: 0.15 + i * 0.12, duration: 0.4 }}
                          className="w-10 h-10 rounded-full shrink-0 z-10 flex items-center justify-center"
                          style={{
                            background: done ? C.gold : C.ivory,
                            border:     done ? "none" : `2px solid ${C.gold}40`,
                          }}
                        >
                          {done
                            ? <CheckCircle size={18} style={{ color: C.deepBurg }} />
                            : <Clock size={16} style={{ color: C.muted }} />
                          }
                        </motion.div>
                        <div className="pt-1.5">
                          <p className="font-bold text-sm" style={{ color: done ? C.dark : C.muted }}>{label}</p>
                          <p className="text-xs mt-0.5" style={{ color: C.muted }}>{date}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                <div className="mt-6 pt-5 rounded-xl p-4"
                  style={{ background: `${C.gold}08`, border: `1px solid ${C.gold}25`, borderTop: "none" }}>
                  <p className="text-xs font-bold tracking-wide mb-1" style={{ color: C.gold }}>DELIVERY ADDRESS</p>
                  <p className="text-sm" style={{ color: C.dark }}>204, Green Terrace Apartments</p>
                  <p className="text-sm" style={{ color: C.muted }}>Koramangala, Bengaluru — 560034</p>
                </div>
              </div>
            </div>
          )}

        </motion.div>
      </div>
    </div>
  );
}
