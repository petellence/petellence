"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "motion/react";
import { Star, ChevronRight, CheckCircle, ExternalLink, ShieldCheck, Truck } from "lucide-react";
import { PRODUCTS } from "@/lib/data";
import { C, serif, sans } from "@/lib/theme";

const TABS = ["Benefits", "Ingredients", "How To Use"] as const;

const STORES = [
  {
    id:      "amazon",
    name:    "Amazon",
    tagline: "Fulfilled by Amazon · Prime eligible",
    logo: (
      <svg viewBox="0 0 105 31" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ height:22, width:"auto" }}>
        <path d="M64.6 24.2c-6.1 4.5-15 6.9-22.6 6.9-10.7 0-20.3-4-27.6-10.5-.6-.5-.1-1.2.6-.8 7.9 4.6 17.6 7.3 27.7 7.3 6.8 0 14.3-1.4 21.2-4.3 1-.5 1.9.7.7 1.4z" fill="#FF9900"/>
        <path d="M67.2 21.2c-.8-1-5.2-.5-7.2-.2-.6.1-.7-.4-.1-.9 3.5-2.5 9.3-1.8 9.9-1 .7.9-.2 6.7-3.5 9.5-.5.4-1 .2-.8-.4.8-1.9 2.5-6.1 1.7-7z" fill="#FF9900"/>
        <text x="0" y="22" fontSize="20" fontWeight="700" fill="#131921" fontFamily="Arial,sans-serif">amazon</text>
      </svg>
    ),
    bg:          "#131921",
    btnBg:       "#FF9900",
    btnText:     "#131921",
    hoverBg:     "#e68900",
    border:      "#FF9900",
    url:         "#",
  },
  {
    id:      "flipkart",
    name:    "Flipkart",
    tagline: "Flipkart Assured · Fast delivery",
    logo: (
      <svg viewBox="0 0 120 28" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ height:22, width:"auto" }}>
        <text x="0" y="22" fontSize="20" fontWeight="800" fill="#ffffff" fontFamily="Arial,sans-serif">flipkart</text>
      </svg>
    ),
    bg:          "#2874F0",
    btnBg:       "#ffffff",
    btnText:     "#2874F0",
    hoverBg:     "#f0f0f0",
    border:      "#2874F0",
    url:         "#",
  },
];

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const product = PRODUCTS.find(p => p.id === id);
  const related = PRODUCTS.filter(p => p.id !== id).slice(0, 3);

  const [imgIdx, setImgIdx] = useState(0);
  const [tab,    setTab]    = useState<typeof TABS[number]>("Benefits");

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background:C.ivory }}>
        <div className="text-center">
          <p className="text-2xl font-bold mb-4" style={{ fontFamily:serif, color:C.maroon }}>Product not found</p>
          <button onClick={() => router.push("/")} className="gold-btn px-6 py-3 rounded-xl text-sm">Go Home</button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ background:C.ivory }}>

      {/* ─── BREADCRUMB ─── */}
      <div style={{ background:C.deepBurg }}>
        <div className="max-w-7xl mx-auto px-5 py-3.5 pt-20 flex items-center gap-1.5 text-xs" style={{ color:`${C.ivory}50` }}>
          <Link href="/" style={{ color:`${C.ivory}50` }}
            onMouseEnter={e=>(e.currentTarget.style.color=C.gold)} onMouseLeave={e=>(e.currentTarget.style.color=`${C.ivory}50`)}>
            Home
          </Link>
          <ChevronRight size={11} />
          <span>Products</span>
          <ChevronRight size={11} />
          <span style={{ color:C.gold }}>{product.name}</span>
        </div>
      </div>

      {/* ─── MAIN ─── */}
      <section className="py-14 md:py-20">
        <div className="max-w-7xl mx-auto px-5">
          <div className="grid lg:grid-cols-2 gap-14 items-start">

            {/* ─── GALLERY ─── */}
            <div>
              <motion.div
                key={imgIdx}
                initial={{ opacity:0, scale:0.97 }}
                animate={{ opacity:1, scale:1 }}
                transition={{ duration:0.35 }}
                className="rounded-2xl overflow-hidden shadow-xl mb-4"
                style={{ border:`1px solid ${C.gold}30`, aspectRatio:"4/5" }}
              >
                <img
                  src={product.images[imgIdx]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </motion.div>
              {product.images.length > 1 && (
                <div className="flex gap-3">
                  {product.images.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setImgIdx(i)}
                      className="rounded-xl overflow-hidden transition-all"
                      style={{
                        width:72, height:80, flexShrink:0,
                        border:   imgIdx===i ? `2px solid ${C.gold}` : `2px solid transparent`,
                        opacity:  imgIdx===i ? 1 : 0.55,
                      }}
                    >
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* ─── PRODUCT INFO ─── */}
            <motion.div
              initial={{ opacity:0, x:30 }}
              animate={{ opacity:1, x:0 }}
              transition={{ duration:0.6, ease:[0.25,0.1,0.25,1] }}
            >
              <div className="flex items-center gap-3 mb-4">
                <span
                  className="px-3 py-1 rounded-full text-[10px] font-bold tracking-wide"
                  style={{ background:product.badgeColor, color:C.ivory }}
                >
                  {product.badge}
                </span>
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_,i) => <Star key={i} size={13} fill={C.gold} style={{ color:C.gold }} />)}
                  <span className="text-xs ml-1" style={{ color:C.muted }}>4.9 · 247 reviews</span>
                </div>
              </div>

              <h1 className="text-4xl md:text-5xl font-bold mb-1" style={{ fontFamily:serif, color:C.dark }}>
                {product.name}
              </h1>
              <p className="text-sm mb-1.5" style={{ color:C.muted }}>{product.subtitle} · {product.size}</p>
              <p className="text-sm italic mb-6" style={{ color:product.accentColor, fontFamily:serif }}>
                {product.tagline}
              </p>

              <p className="text-sm leading-relaxed mb-7" style={{ color:C.muted }}>
                {product.description}
              </p>

              <div className="flex items-center gap-2 mb-7">
                <span className="text-xs font-bold" style={{ color:C.muted }}>Suitable for:</span>
                <span className="text-xs px-2.5 py-1 rounded-full"
                  style={{ background:`${product.accentColor}18`, color:product.accentColor }}>
                  {product.species}
                </span>
              </div>

              <div className="flex items-center gap-4 p-5 rounded-xl mb-8"
                style={{ background:`${product.accentColor}0b`, border:`1px solid ${product.accentColor}22` }}>
                <div>
                  <p className="text-4xl font-bold" style={{ fontFamily:serif, color:product.accentColor }}>
                    ₹{product.price.toLocaleString("en-IN")}
                  </p>
                  <p className="text-xs mt-0.5" style={{ color:C.muted }}>
                    {product.size} · MRP incl. all taxes
                  </p>
                </div>
                <div className="ml-auto flex flex-col items-end gap-1.5">
                  <span className="text-xs font-bold px-3 py-1.5 rounded-full"
                    style={{ background:`${C.green}15`, color:C.green }}>In Stock</span>
                  <span className="text-[10px]" style={{ color:C.muted }}>Free shipping ₹999+</span>
                </div>
              </div>

              {/* ─── AVAILABLE ON ─── */}
              <div className="mb-3">
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-px flex-1" style={{ background:`${C.gold}35` }} />
                  <span className="text-[11px] font-bold tracking-[0.28em] uppercase" style={{ color:C.gold }}>
                    Available On
                  </span>
                  <div className="h-px flex-1" style={{ background:`${C.gold}35` }} />
                </div>

                <div className="space-y-3">
                  {STORES.map(store => (
                    <motion.a
                      key={store.id}
                      href={store.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale:1.015 }}
                      whileTap={{ scale:0.985 }}
                      className="flex items-center justify-between p-4 rounded-2xl transition-all group"
                      style={{
                        background: store.bg,
                        border:     `1px solid ${store.border}30`,
                        textDecoration: "none",
                      }}
                    >
                      <div className="flex items-center gap-4">
                        <div>{store.logo}</div>
                        <div>
                          <p className="text-[11px]" style={{ color:"rgba(255,255,255,0.6)", fontFamily:sans }}>
                            {store.tagline}
                          </p>
                        </div>
                      </div>
                      <div
                        className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm"
                        style={{
                          background: store.btnBg,
                          color:      store.btnText,
                          fontFamily: sans,
                        }}
                      >
                        Buy Now <ExternalLink size={13} />
                      </div>
                    </motion.a>
                  ))}
                </div>
              </div>

              {/* trust row */}
              <div className="grid grid-cols-3 gap-3 mt-5 pt-5" style={{ borderTop:`1px solid ${C.gold}20` }}>
                {[
                  { icon:<ShieldCheck size={14}/>, label:"100% Authentic",  sub:"Original product" },
                  { icon:<Truck size={14}/>,       label:"Fast Delivery",   sub:"2–4 business days" },
                  { icon:"↩️",                     label:"Easy Returns",    sub:"Store return policy" },
                ].map(({icon,label,sub}) => (
                  <div key={label} className="text-center">
                    <div className="flex justify-center mb-1" style={{ color:C.gold }}>{icon}</div>
                    <p className="text-[11px] font-bold" style={{ color:C.dark }}>{label}</p>
                    <p className="text-[10px]" style={{ color:C.muted }}>{sub}</p>
                  </div>
                ))}
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ─── TABS ─── */}
      <section className="pb-20">
        <div className="max-w-4xl mx-auto px-5">
          <div className="flex gap-0 mb-8 rounded-xl overflow-hidden"
            style={{ border:`1px solid ${C.gold}30`, background:"white" }}>
            {TABS.map(t => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className="flex-1 py-3.5 text-sm font-bold transition-all"
                style={{
                  background: tab===t ? product.accentColor : "transparent",
                  color:      tab===t ? C.ivory : C.muted,
                  fontFamily: sans,
                }}
              >
                {t}
              </button>
            ))}
          </div>

          <motion.div key={tab} initial={{ opacity:0, y:12 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.3 }}>
            {tab === "Benefits" && (
              <div className="grid sm:grid-cols-2 gap-4">
                {product.benefits.map(b => (
                  <div key={b.title} className="flex gap-4 p-5 rounded-2xl bg-white"
                    style={{ border:`1px solid ${C.gold}28` }}>
                    <span className="text-2xl">{b.icon}</span>
                    <div>
                      <p className="font-bold text-sm mb-1" style={{ fontFamily:serif, color:C.dark }}>{b.title}</p>
                      <p className="text-xs leading-relaxed" style={{ color:C.muted }}>{b.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
            {tab === "Ingredients" && (
              <div className="bg-white rounded-2xl p-7" style={{ border:`1px solid ${C.gold}28` }}>
                <p className="text-xs font-bold tracking-[0.2em] uppercase mb-5" style={{ color:C.gold }}>Active Ingredients</p>
                <div className="grid sm:grid-cols-2 gap-3">
                  {product.ingredients.map(ing => (
                    <div key={ing} className="flex items-center gap-2.5">
                      <CheckCircle size={14} style={{ color:C.gold, flexShrink:0 }} />
                      <span className="text-sm" style={{ color:C.dark }}>{ing}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {tab === "How To Use" && (
              <div className="bg-white rounded-2xl p-7" style={{ border:`1px solid ${C.gold}28` }}>
                <p className="text-xs font-bold tracking-[0.2em] uppercase mb-5" style={{ color:C.gold }}>Dosage & Usage</p>
                <p className="text-sm leading-relaxed" style={{ color:C.dark }}>{product.howToUse}</p>
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* ─── WHERE TO BUY ─── */}
      <section className="py-14" style={{ background:C.deepBurg }}>
        <div className="max-w-3xl mx-auto px-5 text-center">
          <span className="text-[11px] font-bold tracking-[0.3em] uppercase" style={{ color:C.gold }}>Where to Buy</span>
          <h2 className="text-3xl font-bold mt-2 mb-3" style={{ fontFamily:serif, color:C.ivory }}>
            Shop {product.name} on Your Favourite Platform
          </h2>
          <p className="text-sm mb-8" style={{ color:`${C.ivory}60` }}>
            Available on India&apos;s most trusted marketplaces. Guaranteed authentic, fast delivery, easy returns.
          </p>
          <div className="grid sm:grid-cols-2 gap-4">
            {STORES.map((store, i) => (
              <motion.a
                key={store.id}
                href={store.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity:0, y:20 }}
                whileInView={{ opacity:1, y:0 }}
                viewport={{ once:true }}
                transition={{ duration:0.5, delay:i*0.1 }}
                whileHover={{ scale:1.03, transition:{duration:0.2} }}
                className="flex flex-col items-center gap-3 p-6 rounded-2xl"
                style={{
                  background:     store.bg,
                  border:         `1px solid ${store.border}40`,
                  textDecoration: "none",
                }}
              >
                <div>{store.logo}</div>
                <p className="text-xs" style={{ color:"rgba(255,255,255,0.55)" }}>{store.tagline}</p>
                <div className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-sm mt-1"
                  style={{ background:store.btnBg, color:store.btnText, fontFamily:sans }}>
                  Buy on {store.name} <ExternalLink size={13} />
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* ─── RELATED PRODUCTS ─── */}
      <section className="py-20" style={{ background:C.ivoryDark }}>
        <div className="max-w-7xl mx-auto px-5">
          <h2 className="text-2xl font-bold mb-8" style={{ fontFamily:serif, color:C.maroon }}>You Might Also Like</h2>
          <div className="grid sm:grid-cols-3 gap-6">
            {related.map(p => (
              <motion.div
                key={p.id}
                whileHover={{ y:-5, transition:{duration:0.2} }}
                className="bg-white rounded-2xl overflow-hidden cursor-pointer"
                style={{ border:`1px solid ${C.gold}28` }}
                onClick={() => { router.push(`/products/${p.id}`); window.scrollTo({ top:0, behavior:"smooth" }); }}
              >
                <div style={{ aspectRatio:"3/2", overflow:"hidden" }}>
                  <img src={p.image} alt={p.name}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" />
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-sm mb-0.5" style={{ fontFamily:serif, color:C.dark }}>{p.name}</h3>
                  <p className="text-xs mb-2" style={{ color:C.muted }}>{p.subtitle}</p>
                  <div className="flex items-center justify-between">
                    <p className="font-bold" style={{ color:p.accentColor, fontFamily:serif }}>
                      ₹{p.price.toLocaleString("en-IN")}
                    </p>
                    <span className="text-xs font-bold" style={{ color:C.gold }}>View Details →</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
