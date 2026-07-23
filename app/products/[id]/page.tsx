"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "motion/react";
import { Star, ChevronRight, CheckCircle, ExternalLink, ShieldCheck, Truck, Store } from "lucide-react";
import { C, serif, sans } from "@/lib/theme";
import { useProduct, useProducts } from "@/lib/hooks";
import type { StoreLink } from "@/lib/api";
import BenefitIcon from "../../_components/BenefitIcon";

const TABS = ["Benefits", "Ingredients", "How To Use", "FAQs"] as const;

/* ── Per-platform visual config ──────────────────────────────────────────── */
interface PlatformTheme {
  bg:      string;
  btnBg:   string;
  btnText: string;
  border:  string;
  logo:    React.ReactNode;
}

const PLATFORM_THEMES: Record<string, PlatformTheme> = {
  amazon: {
    bg: "#131921", border: "#FF9900", btnBg: "#FF9900", btnText: "#131921",
    logo: (
      <svg viewBox="0 0 140 32" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ height: 22, width: "auto" }}>
        <path d="M85.8 32c-8.1 6-19.9 9.2-30 9.2-14.2 0-27-5.3-36.7-14-.8-.7-.1-1.6.9-1.1 10.5 6.1 23.4 9.8 36.8 9.8 9 0 18.9-1.9 28-5.7 1.4-.6 2.5.9.9 1.8H85.8z" fill="#FF9900" transform="scale(0.7)"/>
        <path d="M89.4 28.2c-1-1.3-6.9-.6-9.5-.3-.8.1-.9-.6-.2-1.1 4.7-3.3 12.3-2.4 13.2-1.3.9 1.2-.3 8.9-4.6 12.6-.7.6-1.3.3-1-.5 1-2.5 3.3-8.1 2.1-9.4z" fill="#FF9900" transform="scale(0.7)"/>
        <text x="0" y="22" fontSize="22" fontWeight="700" fill="#ffffff" fontFamily="Arial,sans-serif">amazon</text>
      </svg>
    ),
  },
  flipkart: {
    bg: "#2874F0", border: "#2874F0", btnBg: "#ffffff", btnText: "#2874F0",
    logo: (
      <svg viewBox="0 0 130 28" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ height: 22, width: "auto" }}>
        <text x="0" y="22" fontSize="22" fontWeight="800" fill="#ffffff" fontFamily="Arial,sans-serif">flipkart</text>
      </svg>
    ),
  },
  meesho: {
    bg: "#1A1A2E", border: "#7B5EA7", btnBg: "#7B5EA7", btnText: "#ffffff",
    logo: (
      <svg viewBox="0 0 100 28" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ height: 22, width: "auto" }}>
        <text x="0" y="22" fontSize="22" fontWeight="700" fill="#ffffff" fontFamily="Arial,sans-serif">meesho</text>
      </svg>
    ),
  },
  jiomart: {
    bg: "#003087", border: "#003087", btnBg: "#FF6B00", btnText: "#ffffff",
    logo: (
      <svg viewBox="0 0 110 28" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ height: 22, width: "auto" }}>
        <text x="0" y="22" fontSize="22" fontWeight="700" fill="#ffffff" fontFamily="Arial,sans-serif">JioMart</text>
      </svg>
    ),
  },
};

function getTheme(platform: string): PlatformTheme {
  const key = platform.toLowerCase().replace(/\s+/g, "");
  return PLATFORM_THEMES[key] ?? {
    bg: "#1f2937", border: "#C9A025", btnBg: "#C9A025", btnText: "#1A0609",
    logo: (
      <span style={{ color: "#ffffff", fontSize: 16, fontWeight: 700 }}>{platform}</span>
    ),
  };
}

function activeStores(stores: StoreLink[]) {
  return stores.filter(store => store.active !== false && store.stockStatus !== "out_of_stock");
}

/* ── Store card ───────────────────────────────────────────────────────────── */
function StoreCard({ store, index, variant }: { store: StoreLink; index: number; variant: "sidebar" | "full" }) {
  const theme = getTheme(store.platform);
  const stockLabel = store.stockStatus === "limited" ? "Limited stock" : "In stock";
  const priceLabel = store.price ? `₹${store.price.toLocaleString("en-IN")}` : null;

  if (variant === "sidebar") {
    return (
      <motion.a
        href={store.url}
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ scale: 1.015 }}
        whileTap={{ scale: 0.985 }}
        className="flex items-center justify-between p-4 rounded-2xl transition-all group"
        style={{ background: theme.bg, border: `1px solid ${theme.border}40`, textDecoration: "none" }}
      >
        <div className="flex items-center gap-4">
          <div>{theme.logo}</div>
          <div>
            <p className="text-[11px]" style={{ color: "rgba(255,255,255,0.72)", fontFamily: sans }}>
              {priceLabel ? `${priceLabel} · ` : ""}{stockLabel}
            </p>
            <p className="text-[10px] mt-0.5" style={{ color: "rgba(255,255,255,0.5)", fontFamily: sans }}>{store.tagline}</p>
          </div>
        </div>
        <div
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-sm shrink-0"
          style={{ background: theme.btnBg, color: theme.btnText, fontFamily: sans }}
        >
          Buy Now <ExternalLink size={13} />
        </div>
      </motion.a>
    );
  }

  return (
    <motion.a
      href={store.url}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
      className="flex flex-col items-center gap-3 p-6 rounded-2xl"
      style={{ background: theme.bg, border: `1px solid ${theme.border}40`, textDecoration: "none" }}
    >
      <div>{theme.logo}</div>
      <p className="text-xs font-bold" style={{ color: "rgba(255,255,255,0.78)" }}>
        {priceLabel ? `${priceLabel} · ` : ""}{stockLabel}
      </p>
      <p className="text-xs text-center" style={{ color: "rgba(255,255,255,0.55)" }}>{store.tagline}</p>
      <div className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-sm mt-1"
        style={{ background: theme.btnBg, color: theme.btnText, fontFamily: sans }}>
        Buy on {store.platform} <ExternalLink size={13} />
      </div>
    </motion.a>
  );
}

/* ── Page ─────────────────────────────────────────────────────────────────── */
export default function ProductDetail() {
  const { id }   = useParams<{ id: string }>();
  const router   = useRouter();
  const { product, loading } = useProduct(id);
  const { products }         = useProducts();

  const related = products.filter(p => p.id !== id).slice(0, 3);

  const [imgIdx, setImgIdx] = useState(0);
  const [tab,    setTab]    = useState<typeof TABS[number]>("Benefits");
  const stores = product ? activeStores(product.storeLinks) : [];
  const bestStore = stores[0];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: C.ivory }}>
        <div className="w-8 h-8 rounded-full border-2 border-t-transparent animate-spin" style={{ borderColor: C.gold, borderTopColor: "transparent" }} />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: C.ivory }}>
        <div className="text-center">
          <p className="text-2xl font-bold mb-4" style={{ fontFamily: serif, color: C.maroon }}>Product not found</p>
          <button onClick={() => router.push("/")} className="gold-btn px-6 py-3 rounded-xl text-sm">Go Home</button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ background: C.ivory }}>

      {/* ─── BREADCRUMB ─── */}
      <div style={{ background: C.deepBurg }}>
        <div className="max-w-7xl mx-auto px-5 py-3.5 pt-20 flex items-center gap-1.5 text-xs" style={{ color: `${C.ivory}50` }}>
          <Link href="/" style={{ color: `${C.ivory}50` }}
            onMouseEnter={e => (e.currentTarget.style.color = C.gold)} onMouseLeave={e => (e.currentTarget.style.color = `${C.ivory}50`)}>
            Home
          </Link>
          <ChevronRight size={12} />
          <Link href="/products" style={{ color: `${C.ivory}50` }}
            onMouseEnter={e => (e.currentTarget.style.color = C.gold)} onMouseLeave={e => (e.currentTarget.style.color = `${C.ivory}50`)}>
            Products
          </Link>
          <ChevronRight size={12} />
          <span style={{ color: C.ivory }}>{product.name}</span>
        </div>
      </div>

      {/* ─── HERO ─── */}
      <section className="max-w-7xl mx-auto px-5 py-12 grid md:grid-cols-2 gap-12 items-start">

        {/* left — images */}
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
          <div className="rounded-3xl overflow-hidden mb-3" style={{ aspectRatio: "3/4", background: C.deepBurg }}>
            <img
              src={product.images[imgIdx] ?? product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>
          {product.images.length > 1 && (
            <div className="flex gap-2">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setImgIdx(i)}
                  className="rounded-xl overflow-hidden transition-all"
                  style={{
                    width: 64, height: 80, flexShrink: 0,
                    border: `2px solid ${i === imgIdx ? C.gold : "transparent"}`,
                    opacity: i === imgIdx ? 1 : 0.55,
                  }}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </motion.div>

        {/* right — info */}
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.1 }}>
          <div className="flex items-center gap-3 mb-3">
            <span className="text-[10px] font-bold tracking-[0.32em] uppercase px-2.5 py-1 rounded-full"
              style={{ background: product.badgeColor, color: C.ivory }}>{product.badge}</span>
            <div className="flex items-center gap-0.5">
              {[...Array(5)].map((_, i) => <Star key={i} size={13} fill={C.gold} style={{ color: C.gold }} />)}
              <span className="text-xs ml-1.5" style={{ color: C.muted }}>4.9 · 247 reviews</span>
            </div>
          </div>

          <p className="text-[10px] font-bold tracking-[0.28em] uppercase mb-1" style={{ color: C.gold, fontFamily: sans }}>{product.subtitle}</p>
          <h1 className="font-bold leading-tight mb-1" style={{ fontFamily: serif, color: C.dark, fontSize: "clamp(28px,4vw,44px)", letterSpacing: "-0.02em" }}>
            {product.name}
          </h1>
          <p className="italic mb-5" style={{ color: C.muted, fontFamily: serif }}>{product.tagline}</p>

          <div className="flex items-end gap-3 mb-6">
            <p className="font-bold" style={{ fontFamily: serif, color: C.maroon, fontSize: 36, letterSpacing: "-0.02em" }}>
              ₹{product.price.toLocaleString("en-IN")}
            </p>
            <p className="line-through text-lg mb-1" style={{ color: C.muted }}>₹{product.mrp.toLocaleString("en-IN")}</p>
            <span className="mb-1 text-xs font-bold px-2 py-1 rounded-lg" style={{ background: "#dcfce7", color: "#166534" }}>
              {Math.round((1 - product.price / product.mrp) * 100)}% OFF
            </span>
          </div>

          <div className="flex flex-wrap gap-2 mb-6">
            {product.benefits.slice(0, 3).map(b => (
              <span key={b.title} className="flex items-center gap-1.5 text-[11px] font-bold px-3 py-1.5 rounded-full"
                style={{ background: `${C.gold}12`, color: C.gold, border: `1px solid ${C.gold}30` }}>
                <BenefitIcon name={b.icon} size={11} strokeWidth={2.5} style={{ color: C.gold }} />
                {b.title}
              </span>
            ))}
          </div>

          <div className="flex gap-2 mb-2">
            {["Dogs", "Cats"].map(s => (
              product.species.includes(s) && (
                <span key={s} className="text-[10px] font-bold px-2.5 py-1 rounded-full"
                  style={{ background: `${C.maroon}15`, color: C.maroon, border: `1px solid ${C.maroon}25` }}>
                  {s === "Dogs" ? "🐶" : "🐱"} {s}
                </span>
              )
            ))}
            <span className="text-[10px] font-bold px-2.5 py-1 rounded-full"
              style={{ background: `${C.gold}12`, color: C.gold, border: `1px solid ${C.gold}25` }}>
              {product.size}
            </span>
            {product.category && (
              <span className="text-[10px] font-bold px-2.5 py-1 rounded-full"
                style={{ background: `${C.blue}10`, color: C.blue, border: `1px solid ${C.blue}20` }}>
                {product.category}
              </span>
            )}
          </div>

          <div className="flex items-center gap-2 mb-6 mt-4">
            <CheckCircle size={14} style={{ color: "#22c55e" }} />
            <span className="text-xs font-medium" style={{ color: product.inStock ? "#16a34a" : "#b91c1c" }}>
              {product.inStock ? `Available on ${stores.length || product.storeLinks.length} marketplace${(stores.length || product.storeLinks.length) !== 1 ? "s" : ""}` : "Currently out of stock"}
            </span>
          </div>

          <a
            href={bestStore?.url ?? "#stores"}
            target={bestStore ? "_blank" : undefined}
            rel="noopener noreferrer"
            className="w-full mb-5 flex items-center justify-center gap-2 py-4 rounded-2xl text-sm font-bold transition-all"
            style={{ background: C.maroon, color: C.ivory, fontFamily: sans }}
          >
            <Store size={16} /> {bestStore ? `Buy on ${bestStore.platform}` : "See Buying Options"}
          </a>

          {/* ─── AVAILABLE ON ─── */}
          {stores.length > 0 && (
            <div className="mb-3" id="stores">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-px flex-1" style={{ background: `${C.gold}35` }} />
                <span className="text-[11px] font-bold tracking-[0.28em] uppercase" style={{ color: C.gold }}>Available On</span>
                <div className="h-px flex-1" style={{ background: `${C.gold}35` }} />
              </div>
              <div className="space-y-3">
                {stores.map((store, i) => (
                  <StoreCard key={i} store={store} index={i} variant="sidebar" />
                ))}
              </div>
            </div>
          )}

          {/* trust row */}
          <div className="grid grid-cols-3 gap-3 mt-5 pt-5" style={{ borderTop: `1px solid ${C.gold}20` }}>
            {[
              { icon: <ShieldCheck size={14} />, label: "100% Authentic",  sub: "Original product" },
              { icon: <Truck size={14} />,       label: "Fast Delivery",   sub: "By marketplace" },
              { icon: <span>↩</span>,            label: "Easy Returns",    sub: "Store return policy" },
            ].map(({ icon, label, sub }) => (
              <div key={label} className="text-center">
                <div className="flex justify-center mb-1" style={{ color: C.gold }}>{icon}</div>
                <p className="text-[11px] font-bold" style={{ color: C.dark }}>{label}</p>
                <p className="text-[10px]" style={{ color: C.muted }}>{sub}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ─── TABS ─── */}
      <section className="py-14 px-5" style={{ background: C.ivory }}>
        <div className="max-w-3xl mx-auto">
          <div className="flex gap-1 mb-8 p-1 rounded-2xl" style={{ background: `${C.gold}10` }}>
            {TABS.map(t => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className="flex-1 py-2.5 rounded-xl text-sm font-bold transition-all"
                style={{
                  background:  t === tab ? C.gold   : "transparent",
                  color:       t === tab ? C.deepBurg : C.muted,
                  fontFamily:  sans,
                }}
              >
                {t}
              </button>
            ))}
          </div>

          <motion.div key={tab} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
            {tab === "Benefits" && (
              <div className="grid sm:grid-cols-2 gap-4">
                {product.benefits.map(b => (
                  <div key={b.title} className="flex gap-4 p-5 rounded-2xl bg-white" style={{ border: `1px solid ${C.gold}28` }}>
                    <span className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0" style={{ background: `${C.gold}15` }}>
                      <BenefitIcon name={b.icon} size={18} strokeWidth={2} style={{ color: C.gold }} />
                    </span>
                    <div>
                      <p className="font-bold text-sm mb-1" style={{ fontFamily: serif, color: C.dark }}>{b.title}</p>
                      <p className="text-xs leading-relaxed" style={{ color: C.muted }}>{b.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {tab === "Ingredients" && (
              <div className="space-y-3">
                {product.ingredients.map(ing => (
                  <div key={ing.name} className="flex items-start gap-4 p-4 rounded-2xl bg-white" style={{ border: `1px solid ${C.gold}20` }}>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-0.5">
                        <p className="font-bold text-sm" style={{ fontFamily: serif, color: C.dark }}>{ing.name}</p>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ background: `${C.gold}15`, color: C.gold }}>{ing.amount}</span>
                      </div>
                      <p className="text-xs" style={{ color: C.muted }}>{ing.purpose}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {tab === "How To Use" && (
              <div className="space-y-3">
                {product.howToUse.map((step, i) => (
                  <div key={i} className="flex gap-4 p-4 rounded-2xl bg-white" style={{ border: `1px solid ${C.gold}20` }}>
                    <span className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0"
                      style={{ background: C.gold, color: C.deepBurg }}>{i + 1}</span>
                    <p className="text-sm leading-relaxed self-center" style={{ color: C.dark }}>{step}</p>
                  </div>
                ))}
              </div>
            )}

            {tab === "FAQs" && (
              <div className="space-y-3">
                {(product.faqs?.length ? product.faqs : [
                  { question: "Where do I buy this product?", answer: "Use the marketplace buttons on this page. Pete'llence redirects you to active marketplace listings for purchase and delivery." },
                  { question: "Is this a replacement for veterinary care?", answer: "No. Supplements can support wellness routines, but diagnosed conditions, prescription diets, pregnancy, or ongoing medication should be discussed with your veterinarian." },
                ]).map(faq => (
                  <div key={faq.question} className="p-5 rounded-2xl bg-white" style={{ border: `1px solid ${C.gold}20` }}>
                    <p className="font-bold text-sm mb-2" style={{ fontFamily: serif, color: C.dark }}>{faq.question}</p>
                    <p className="text-sm leading-relaxed" style={{ color: C.muted }}>{faq.answer}</p>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* ─── WHERE TO BUY ─── */}
      {stores.length > 0 && (
        <section className="py-14" style={{ background: C.deepBurg }}>
          <div className="max-w-3xl mx-auto px-5 text-center">
            <span className="text-[11px] font-bold tracking-[0.3em] uppercase" style={{ color: C.gold }}>Where to Buy</span>
            <h2 className="text-3xl font-bold mt-2 mb-3" style={{ fontFamily: serif, color: C.ivory }}>
              Shop {product.name} on Your Favourite Platform
            </h2>
            <p className="text-sm mb-8" style={{ color: `${C.ivory}60` }}>
              Available on India&apos;s most trusted marketplaces. Guaranteed authentic, fast delivery, easy returns.
            </p>
            <div className="grid sm:grid-cols-2 gap-4">
              {stores.map((store, i) => (
                <StoreCard key={i} store={store} index={i} variant="full" />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ─── RELATED PRODUCTS ─── */}
      {related.length > 0 && (
        <section className="py-20" style={{ background: C.ivoryDark }}>
          <div className="max-w-7xl mx-auto px-5">
            <h2 className="text-2xl font-bold mb-8" style={{ fontFamily: serif, color: C.maroon }}>You Might Also Like</h2>
            <div className="grid sm:grid-cols-3 gap-6">
              {related.map(p => (
                <motion.div
                  key={p.id}
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                  className="bg-white rounded-2xl overflow-hidden cursor-pointer"
                  style={{ border: `1px solid ${C.gold}28` }}
                  onClick={() => { router.push(`/products/${p.id}`); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                >
                  <div style={{ aspectRatio: "3/2", overflow: "hidden" }}>
                    <img src={p.image} alt={p.name} className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" />
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-sm mb-0.5" style={{ fontFamily: serif, color: C.dark }}>{p.name}</h3>
                    <p className="text-xs mb-2" style={{ color: C.muted }}>{p.subtitle}</p>
                    <div className="flex items-center justify-between">
                      <p className="font-bold" style={{ color: C.maroon, fontFamily: serif }}>₹{p.price.toLocaleString("en-IN")}</p>
                      <span className="text-xs font-bold" style={{ color: C.gold }}>View Details →</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

    </div>
  );
}
