"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "motion/react";
import { Star, ArrowRight, SlidersHorizontal, Search } from "lucide-react";
import { PRODUCTS } from "@/lib/data";
import { C, serif, sans } from "@/lib/theme";

const FILTERS = ["All", "Dogs & Cats", "Joint & Mobility", "Skin & Coat", "Immunity", "Calming"];

const SPECIES_ICONS: Record<string, string> = {
  "tonico-miracolo": "🦴",
  "derma-rituale":   "✨",
  "immuno-forte":    "🛡️",
  "calmo-sera":      "🌙",
};

export default function ProductsPage() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");
  const [sortBy, setSortBy] = useState<"default" | "price-asc" | "price-desc">("default");

  const filtered = PRODUCTS
    .filter(p => {
      const matchesSearch =
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.subtitle.toLowerCase().includes(search.toLowerCase()) ||
        p.tagline.toLowerCase().includes(search.toLowerCase());

      const matchesFilter =
        activeFilter === "All" ||
        (activeFilter === "Dogs & Cats"     && p.species.includes("Dogs")) ||
        (activeFilter === "Joint & Mobility"&& p.subtitle.toLowerCase().includes("joint")) ||
        (activeFilter === "Skin & Coat"     && p.subtitle.toLowerCase().includes("skin")) ||
        (activeFilter === "Immunity"         && p.subtitle.toLowerCase().includes("immun")) ||
        (activeFilter === "Calming"          && p.subtitle.toLowerCase().includes("calm"));

      return matchesSearch && matchesFilter;
    })
    .sort((a, b) => {
      if (sortBy === "price-asc")  return a.price - b.price;
      if (sortBy === "price-desc") return b.price - a.price;
      return 0;
    });

  return (
    <div style={{ background: C.dark, minHeight: "100vh" }}>

      {/* ─── HERO BANNER ─── */}
      <div className="relative overflow-hidden pt-20" style={{ background: `linear-gradient(135deg, ${C.deepBurg} 0%, ${C.burgundy} 60%, ${C.dark} 100%)` }}>
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: `radial-gradient(ellipse at 60% 50%, ${C.gold}12 0%, transparent 65%)` }} />
        <div className="max-w-7xl mx-auto px-6 py-16 md:py-20 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-[10px] font-bold tracking-[0.44em] uppercase mb-3" style={{ color: C.gold, fontFamily: sans }}>
              The Collection
            </p>
            <h1 className="font-bold leading-tight mb-4"
              style={{ fontFamily: serif, color: C.ivory, fontSize: "clamp(36px,5vw,64px)", letterSpacing: "-0.025em" }}>
              Every Formula.<br />
              <em style={{ color: C.gold, fontStyle: "italic" }}>One Promise.</em>
            </h1>
            <p className="text-sm max-w-md leading-relaxed" style={{ color: `${C.ivory}60`, fontFamily: sans }}>
              Precision nutraceuticals crafted from Italian coastal science and 5,000 years of Ayurvedic wisdom — for the pets you love with everything you have.
            </p>
          </motion.div>

          {/* stats row */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="flex flex-wrap gap-8 mt-10"
          >
            {[["4", "Formulas"], ["5,000+", "Pets"], ["4.9★", "Rating"], ["Vet", "Approved"]].map(([v, l]) => (
              <div key={l}>
                <p className="font-bold text-lg leading-none" style={{ fontFamily: serif, color: C.gold }}>{v}</p>
                <p className="text-xs mt-0.5" style={{ color: `${C.ivory}40`, fontFamily: sans }}>{l}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* ─── FILTERS & SEARCH ─── */}
      <div className="sticky top-14 z-30 border-b" style={{ background: "rgba(26,6,9,0.96)", backdropFilter: "blur(16px)", borderColor: `${C.gold}20` }}>
        <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">

          {/* filter pills */}
          <div className="flex gap-2 flex-wrap">
            {FILTERS.map(f => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className="px-4 py-1.5 rounded-full text-[11px] font-bold tracking-wide transition-all"
                style={{
                  background:   activeFilter === f ? C.gold           : `${C.gold}12`,
                  color:        activeFilter === f ? C.deepBurg        : `${C.ivory}70`,
                  border:       `1px solid ${activeFilter === f ? C.gold : C.gold + "25"}`,
                }}
              >
                {f}
              </button>
            ))}
          </div>

          {/* search + sort */}
          <div className="flex gap-2 items-center">
            <div className="relative">
              <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: `${C.ivory}40` }} />
              <input
                type="text"
                placeholder="Search products…"
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="pl-8 pr-4 py-2 rounded-xl text-xs outline-none w-44 transition-all"
                style={{ background: `${C.ivory}08`, border: `1px solid ${C.ivory}18`, color: C.ivory, fontFamily: sans }}
                onFocus={e => (e.currentTarget.style.borderColor = C.gold)}
                onBlur={e  => (e.currentTarget.style.borderColor = `${C.ivory}18`)}
              />
            </div>
            <div className="relative flex items-center gap-1.5">
              <SlidersHorizontal size={13} style={{ color: `${C.ivory}50` }} />
              <select
                value={sortBy}
                onChange={e => setSortBy(e.target.value as typeof sortBy)}
                className="text-xs py-2 pl-1 pr-6 rounded-xl outline-none appearance-none cursor-pointer"
                style={{ background: `${C.ivory}08`, border: `1px solid ${C.ivory}18`, color: `${C.ivory}80`, fontFamily: sans }}
              >
                <option value="default">Featured</option>
                <option value="price-asc">Price: Low → High</option>
                <option value="price-desc">Price: High → Low</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* ─── PRODUCT GRID ─── */}
      <div className="max-w-7xl mx-auto px-6 py-12">

        {filtered.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="text-center py-24"
          >
            <p className="text-4xl mb-4">🐾</p>
            <p className="font-bold text-lg mb-2" style={{ fontFamily: serif, color: C.ivory }}>No products found</p>
            <p className="text-sm mb-6" style={{ color: `${C.ivory}45`, fontFamily: sans }}>Try a different search or filter.</p>
            <button onClick={() => { setSearch(""); setActiveFilter("All"); }}
              className="text-xs font-bold px-5 py-2.5 rounded-xl"
              style={{ background: `${C.gold}18`, color: C.gold, border: `1px solid ${C.gold}30` }}>
              Clear Filters
            </button>
          </motion.div>
        ) : (
          <>
            <p className="text-xs mb-8" style={{ color: `${C.ivory}35`, fontFamily: sans }}>
              Showing {filtered.length} of {PRODUCTS.length} formulas
            </p>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {filtered.map((p, i) => (
                <motion.div
                  key={p.id}
                  initial={{ opacity: 0, y: 28 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.08, ease: [0.25, 0.1, 0.25, 1] }}
                  whileHover={{ y: -6, transition: { duration: 0.22 } }}
                  onClick={() => router.push(`/products/${p.id}`)}
                  className="group rounded-2xl overflow-hidden cursor-pointer flex flex-col"
                  style={{ background: `rgba(255,255,255,0.04)`, border: `1px solid ${C.gold}22` }}
                >
                  {/* image */}
                  <div className="relative overflow-hidden" style={{ aspectRatio: "3/4" }}>
                    <img
                      src={p.image}
                      alt={p.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    {/* gradient overlay */}
                    <div className="absolute inset-0"
                      style={{ background: `linear-gradient(to top, ${C.dark}e0 0%, transparent 55%)` }} />

                    {/* badge */}
                    <span className="absolute top-4 left-4 px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wide"
                      style={{ background: p.badgeColor, color: C.ivory }}>
                      {p.badge}
                    </span>

                    {/* species icon */}
                    <span className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center text-base"
                      style={{ background: "rgba(0,0,0,0.45)", backdropFilter: "blur(8px)" }}>
                      {SPECIES_ICONS[p.id]}
                    </span>

                    {/* bottom price overlay */}
                    <div className="absolute bottom-0 left-0 right-0 px-5 pb-5">
                      <p className="font-bold text-2xl leading-none" style={{ fontFamily: serif, color: C.ivory, letterSpacing: "-0.02em" }}>
                        ₹{p.price.toLocaleString("en-IN")}
                      </p>
                      <p className="text-[10px] mt-0.5" style={{ color: `${C.ivory}55`, fontFamily: sans }}>{p.size} · MRP incl. taxes</p>
                    </div>
                  </div>

                  {/* info */}
                  <div className="flex flex-col flex-1 p-5">
                    <p className="text-[9px] font-bold tracking-[0.32em] uppercase mb-1" style={{ color: C.gold, fontFamily: sans }}>
                      {p.subtitle}
                    </p>
                    <h3 className="font-bold text-lg leading-tight mb-1" style={{ fontFamily: serif, color: C.ivory }}>
                      {p.name}
                    </h3>
                    <p className="text-[11px] italic mb-4" style={{ color: `${C.ivory}45`, fontFamily: serif }}>
                      {p.tagline}
                    </p>

                    {/* benefit pills */}
                    <div className="flex flex-wrap gap-1.5 mb-5">
                      {p.benefits.slice(0, 2).map(b => (
                        <span key={b.title} className="text-[10px] font-bold px-2.5 py-1 rounded-full"
                          style={{ background: `${C.gold}10`, color: C.gold, border: `1px solid ${C.gold}22` }}>
                          {b.icon} {b.title}
                        </span>
                      ))}
                    </div>

                    {/* rating */}
                    <div className="flex items-center gap-1.5 mb-5">
                      {[...Array(5)].map((_, j) => (
                        <Star key={j} size={11} fill={C.gold} style={{ color: C.gold }} />
                      ))}
                      <span className="text-[10px]" style={{ color: `${C.ivory}40`, fontFamily: sans }}>4.9 · 247 reviews</span>
                    </div>

                    {/* CTA */}
                    <div className="mt-auto">
                      <button
                        className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-xs font-bold transition-all"
                        style={{ background: `${C.gold}15`, color: C.gold, border: `1px solid ${C.gold}30` }}
                        onMouseEnter={e => { e.currentTarget.style.background = C.gold; e.currentTarget.style.color = C.deepBurg; }}
                        onMouseLeave={e => { e.currentTarget.style.background = `${C.gold}15`; e.currentTarget.style.color = C.gold; }}
                      >
                        View Details <ArrowRight size={13} />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* ─── BOTTOM CTA ─── */}
      <div className="border-t py-14" style={{ borderColor: `${C.gold}18` }}>
        <div className="max-w-2xl mx-auto px-6 text-center">
          <p className="text-[10px] font-bold tracking-[0.38em] uppercase mb-3" style={{ color: C.gold, fontFamily: sans }}>
            Not sure which formula?
          </p>
          <h2 className="text-2xl font-bold mb-3" style={{ fontFamily: serif, color: C.ivory }}>
            Every formula. One promise.
          </h2>
          <p className="text-sm mb-7 leading-relaxed" style={{ color: `${C.ivory}50`, fontFamily: sans }}>
            If you don&apos;t see a difference in 30 days, we refund every rupee — no forms, no questions.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {["🌿 Ayurvedic", "🇮🇹 Italian Quality", "⚗️ Soxhlet Extracted", "🐾 Vet Approved"].map(t => (
              <span key={t} className="text-[10px] font-bold tracking-wide px-3 py-1.5 rounded-full"
                style={{ background: `${C.gold}12`, color: C.gold, border: `1px solid ${C.gold}25` }}>
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
}
