"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "motion/react";
import { Plus, Minus, Trash2, Tag, ShoppingBag, ArrowRight } from "lucide-react";
import { useCart } from "@/lib/context";
import { C, serif, sans } from "@/lib/theme";

const COUPON_CODE = "PELLE10";
const COUPON_DISCOUNT = 0.1;
const FREE_SHIPPING_THRESHOLD = 999;

export default function Cart() {
  const { items, removeFromCart, updateQty, total } = useCart();
  const router = useRouter();
  const [coupon,    setCoupon]    = useState("");
  const [applied,   setApplied]   = useState(false);
  const [couponErr, setCouponErr] = useState("");

  const discount   = applied ? Math.round(total * COUPON_DISCOUNT) : 0;
  const shipping   = (total - discount) >= FREE_SHIPPING_THRESHOLD ? 0 : 99;
  const grandTotal = total - discount + shipping;
  const firstStoreUrl = items.flatMap(item => item.product.storeLinks).find(Boolean)?.url;

  const handleCoupon = () => {
    if (coupon.trim().toUpperCase() === COUPON_CODE) {
      setApplied(true);
      setCouponErr("");
    } else {
      setCouponErr("Invalid coupon code. Try PELLE10");
      setApplied(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20" style={{ background:C.ivory }}>
        <motion.div
          initial={{ opacity:0, y:24 }} animate={{ opacity:1, y:0 }}
          transition={{ duration:0.5 }}
          className="text-center max-w-sm mx-auto px-5"
        >
          <ShoppingBag size={60} className="mx-auto mb-6" style={{ color:`${C.gold}80` }} />
          <h2 className="text-3xl font-bold mb-3" style={{ fontFamily:serif, color:C.maroon }}>Your cart is empty</h2>
          <p className="text-sm mb-8" style={{ color:C.muted }}>Discover our luxury pet wellness collection.</p>
          <button onClick={() => router.push("/")} className="gold-btn px-8 py-4 rounded-xl text-sm">
            Shop the Collection
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20" style={{ background:C.ivory }}>
      {/* header */}
      <div style={{ background:C.deepBurg }}>
        <div className="max-w-7xl mx-auto px-5 py-8">
          <motion.h1
            initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }}
            transition={{ duration:0.5 }}
            className="text-4xl md:text-5xl font-bold"
            style={{ fontFamily:serif, color:C.ivory }}
          >
            Your Cart
          </motion.h1>
          <p className="text-sm mt-1" style={{ color:`${C.ivory}60` }}>
            {items.reduce((s,i)=>s+i.qty,0)} item{items.reduce((s,i)=>s+i.qty,0)!==1?"s":""} · Free delivery above ₹999
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-5 py-12">
        <div className="grid lg:grid-cols-[1fr_360px] gap-8 items-start">

          {/* ─── ITEMS ─── */}
          <div className="space-y-4">
            {items.map(({ product: p, qty }, i) => (
              <motion.div
                key={p.id}
                initial={{ opacity:0, x:-20 }} animate={{ opacity:1, x:0 }}
                transition={{ duration:0.4, delay:i*0.07 }}
                className="bg-white rounded-2xl p-5 flex gap-5"
                style={{ border:`1px solid ${C.gold}28` }}
              >
                <div className="w-24 h-28 rounded-xl overflow-hidden shrink-0"
                  style={{ border:`1px solid ${C.gold}20` }}>
                  <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <Link href={`/products/${p.id}`}
                        className="font-bold text-base hover:underline"
                        style={{ fontFamily:serif, color:C.dark }}>
                        {p.name}
                      </Link>
                      <p className="text-xs mt-0.5" style={{ color:C.muted }}>{p.subtitle} · {p.size}</p>
                      <span className="inline-block mt-1 text-[10px] font-bold px-2 py-0.5 rounded-full"
                        style={{ background:p.badgeColor, color:C.ivory }}>{p.badge}</span>
                    </div>
                    <button
                      onClick={() => removeFromCart(p.id)}
                      className="shrink-0 p-1.5 rounded-lg transition-colors"
                      style={{ color:C.muted }}
                      onMouseEnter={e=>(e.currentTarget.style.color="#d4183d")}
                      onMouseLeave={e=>(e.currentTarget.style.color=C.muted)}
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>

                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center gap-0 rounded-lg overflow-hidden"
                      style={{ border:`1px solid ${C.gold}40` }}>
                      <button onClick={() => updateQty(p.id, qty-1)}
                        className="w-9 h-9 flex items-center justify-center transition-colors"
                        onMouseEnter={e=>(e.currentTarget.style.background=`${C.gold}15`)}
                        onMouseLeave={e=>(e.currentTarget.style.background="transparent")}
                        style={{ color:C.dark }}>
                        <Minus size={13} />
                      </button>
                      <span className="w-9 text-center text-sm font-bold" style={{ color:C.dark }}>{qty}</span>
                      <button onClick={() => updateQty(p.id, qty+1)}
                        className="w-9 h-9 flex items-center justify-center transition-colors"
                        onMouseEnter={e=>(e.currentTarget.style.background=`${C.gold}15`)}
                        onMouseLeave={e=>(e.currentTarget.style.background="transparent")}
                        style={{ color:C.dark }}>
                        <Plus size={13} />
                      </button>
                    </div>
                    <p className="font-bold text-lg" style={{ fontFamily:serif, color:p.badgeColor }}>
                      ₹{(p.price * qty).toLocaleString("en-IN")}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}

            <button
              onClick={() => router.push("/")}
              className="flex items-center gap-2 text-sm font-bold pt-2 transition-colors"
              style={{ color:C.maroon }}
              onMouseEnter={e=>(e.currentTarget.style.color=C.gold)}
              onMouseLeave={e=>(e.currentTarget.style.color=C.maroon)}
            >
              ← Continue Shopping
            </button>
          </div>

          {/* ─── ORDER SUMMARY ─── */}
          <motion.div
            initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }}
            transition={{ duration:0.5, delay:0.2 }}
            className="bg-white rounded-2xl p-6 sticky top-24"
            style={{ border:`1px solid ${C.gold}30` }}
          >
            <h2 className="text-xl font-bold mb-6" style={{ fontFamily:serif, color:C.dark }}>Order Summary</h2>

            <div className="mb-6">
              <label className="text-xs font-bold tracking-wide mb-2 block" style={{ color:C.muted }}>
                <Tag size={11} className="inline mr-1" />Coupon Code
              </label>
              <div className="flex gap-2">
                <input
                  value={coupon}
                  onChange={e => { setCoupon(e.target.value); setCouponErr(""); }}
                  onKeyDown={e => e.key === "Enter" && handleCoupon()}
                  placeholder="e.g. PELLE10"
                  className="flex-1 px-3 py-2.5 rounded-lg text-sm outline-none"
                  style={{ border:`1px solid ${applied ? C.green : couponErr ? "#d4183d" : C.gold+"50"}`, background:`${C.gold}05`, color:C.dark }}
                />
                <button
                  onClick={applied ? () => { setApplied(false); setCoupon(""); } : handleCoupon}
                  className="px-4 py-2.5 rounded-lg text-xs font-bold transition-all"
                  style={{
                    background: applied ? `${C.green}15` : C.maroon,
                    color:      applied ? C.green : C.ivory,
                    border:     applied ? `1px solid ${C.green}` : "none",
                  }}
                >
                  {applied ? "Remove" : "Apply"}
                </button>
              </div>
              {couponErr && <p className="text-xs mt-1.5" style={{ color:"#d4183d" }}>{couponErr}</p>}
              {applied   && <p className="text-xs mt-1.5 font-bold" style={{ color:C.green }}>✓ 10% discount applied!</p>}
            </div>

            <div className="space-y-3 pb-5 mb-5" style={{ borderBottom:`1px solid ${C.gold}22` }}>
              <div className="flex justify-between text-sm">
                <span style={{ color:C.muted }}>Subtotal</span>
                <span style={{ color:C.dark }}>₹{total.toLocaleString("en-IN")}</span>
              </div>
              {applied && (
                <div className="flex justify-between text-sm">
                  <span style={{ color:C.green }}>Coupon (PELLE10)</span>
                  <span style={{ color:C.green }}>−₹{discount.toLocaleString("en-IN")}</span>
                </div>
              )}
              <div className="flex justify-between text-sm">
                <span style={{ color:C.muted }}>Shipping</span>
                <span style={{ color: shipping===0 ? C.green : C.dark }}>
                  {shipping===0 ? "FREE" : `₹${shipping}`}
                </span>
              </div>
              {shipping > 0 && (
                <p className="text-xs" style={{ color:C.muted }}>
                  Add ₹{(FREE_SHIPPING_THRESHOLD - (total - discount)).toLocaleString("en-IN")} more for free shipping
                </p>
              )}
            </div>

            <div className="flex justify-between items-center mb-6">
              <span className="font-bold" style={{ color:C.dark }}>Total</span>
              <span className="text-2xl font-bold" style={{ fontFamily:serif, color:C.maroon }}>
                ₹{grandTotal.toLocaleString("en-IN")}
              </span>
            </div>

            <button
              onClick={() => firstStoreUrl ? window.open(firstStoreUrl, "_blank", "noopener,noreferrer") : router.push(`/products/${items[0].product.id}`)}
              className="w-full gold-btn py-4 rounded-xl text-sm tracking-wide flex items-center justify-center gap-2 mb-3"
            >
              Continue to Marketplace <ArrowRight size={15} />
            </button>
            <p className="text-xs text-center" style={{ color:C.muted }}>Razorpay · Stripe · 256-bit SSL encryption</p>

            <div className="grid grid-cols-3 gap-2 mt-5 pt-5" style={{ borderTop:`1px solid ${C.gold}18` }}>
              {[["🚚","Free Ship","₹999+"],["↩️","30-Day","Returns"],["🔒","SSL","Secure"]].map(([icon,label,sub])=>(
                <div key={label} className="text-center">
                  <div className="text-lg">{icon}</div>
                  <p className="text-[10px] font-bold mt-0.5" style={{ color:C.dark }}>{label}</p>
                  <p className="text-[9px]" style={{ color:C.muted }}>{sub}</p>
                </div>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
}
