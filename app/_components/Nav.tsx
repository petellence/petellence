"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown, Store } from "lucide-react";
import { useProducts } from "@/lib/hooks";
import { C, serif, sans } from "@/lib/theme";

export default function Nav() {
  const [scrolled,   setScrolled]   = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [prodOpen,   setProdOpen]   = useState(false);
  const { products } = useProducts();
  const pathname = usePathname();

  // Hover-intent: keep the dropdown open while moving across the small gap
  // between the trigger and the menu, and close after a short grace period.
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const openMenu = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setProdOpen(true);
  };
  const closeMenu = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setProdOpen(false), 140);
  };
  useEffect(() => () => { if (closeTimer.current) clearTimeout(closeTimer.current); }, []);

  const isHome = pathname === "/";

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => { setMobileOpen(false); }, [pathname]);

  const navBg = (!isHome || scrolled) ? "rgba(42,6,16,0.97)" : "transparent";

  return (
    <nav
      className="fixed top-0 inset-x-0 z-50 transition-all duration-500"
      style={{
        background:     navBg,
        backdropFilter: (!isHome || scrolled) ? "blur(16px)" : "none",
        borderBottom:   (!isHome || scrolled) ? `1px solid ${C.gold}28` : "none",
      }}
    >
      <div className="max-w-7xl mx-auto px-5 py-3.5 flex items-center justify-between">
        {/* wordmark */}
        <Link href="/" className="group">
          <div className="text-[22px] font-bold leading-none" style={{ fontFamily: serif, color: C.ivory }}>
            Pete&apos;llence
          </div>
          <div className="text-[9px] tracking-[0.28em] uppercase mt-0.5" style={{ color: C.gold, fontFamily: sans }}>
            The Science of Pet Wellness
          </div>
        </Link>

        {/* desktop links */}
        <div className="hidden md:flex items-center gap-7">
          <Link href="/" className="text-sm transition-colors" style={{ color: `${C.ivory}90`, fontFamily: sans }}
            onMouseEnter={e => (e.currentTarget.style.color = C.gold)}
            onMouseLeave={e => (e.currentTarget.style.color = `${C.ivory}90`)}>
            Home
          </Link>

          {/* products dropdown */}
          <div className="relative"
            onMouseEnter={openMenu}
            onMouseLeave={closeMenu}
          >
            <Link href="/products" className="flex items-center gap-1 text-sm transition-colors"
              style={{ color: prodOpen ? C.gold : `${C.ivory}90`, fontFamily: sans }}
              aria-expanded={prodOpen}
              onFocus={openMenu}>
              Products <ChevronDown size={13} className="transition-transform duration-200"
                style={{ transform: prodOpen ? "rotate(180deg)" : "none" }} />
            </Link>
            {prodOpen && (
              <div
                className="absolute top-full left-1/2 -translate-x-1/2 pt-2 w-56"
                onMouseEnter={openMenu}
                onMouseLeave={closeMenu}
              >
              <div
                className="rounded-2xl shadow-2xl overflow-hidden"
                style={{ background: "rgba(42,6,16,0.98)", border: `1px solid ${C.gold}30` }}
              >
                <Link
                  href="/products"
                  className="flex items-center gap-3 px-4 py-3 transition-colors"
                  style={{ borderBottom: `1px solid ${C.gold}30` }}
                  onMouseEnter={e => (e.currentTarget.style.background = `${C.gold}10`)}
                  onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
                >
                  <span className="text-lg">🛍️</span>
                  <div>
                    <p className="text-xs font-bold" style={{ color: C.gold, fontFamily: sans }}>All Products</p>
                    <p className="text-[10px]" style={{ color: `${C.ivory}55`, fontFamily: sans }}>Browse the collection</p>
                  </div>
                </Link>
                {products.map(p => (
                  <Link
                    key={p.id}
                    href={`/products/${p.id}`}
                    className="flex items-center gap-3 px-4 py-3 transition-colors"
                    style={{ borderBottom: `1px solid ${C.gold}18` }}
                    onMouseEnter={e => (e.currentTarget.style.background = `${C.gold}10`)}
                    onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
                  >
                    <span className="text-lg">🌿</span>
                    <div>
                      <p className="text-xs font-bold" style={{ color: C.ivory, fontFamily: sans }}>{p.name}</p>
                      <p className="text-[10px]" style={{ color: `${C.ivory}55`, fontFamily: sans }}>₹{p.price.toLocaleString("en-IN")}</p>
                    </div>
                  </Link>
                ))}
              </div>
              </div>
            )}
          </div>
        </div>

        {/* right actions */}
        <div className="flex items-center gap-2">
          <Link
            href="/products"
            className="relative flex items-center gap-1.5 px-3.5 py-2 rounded-lg transition-all"
            style={{ background: `${C.gold}1a`, border: `1px solid ${C.gold}45` }}
          >
            <Store size={16} style={{ color: C.gold }} />
            <span className="hidden sm:block text-xs font-bold" style={{ color: C.gold }}>Where to Buy</span>
          </Link>
          <button
            className="md:hidden"
            onClick={() => setMobileOpen(m => !m)}
            style={{ color: C.ivory }}
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* mobile menu */}
      {mobileOpen && (
        <div className="md:hidden px-5 pb-5" style={{ background: "rgba(42,6,16,0.98)" }}>
          {[{ label: "Home", to: "/" }, { label: "All Products", to: "/products" }].map(({ label, to }) => (
            <Link key={to} href={to}
              className="flex items-center justify-between py-3 text-sm"
              style={{ color: C.ivory, fontFamily: sans, borderBottom: `1px solid ${C.gold}18` }}>
              {label}
            </Link>
          ))}
          <p className="text-[10px] tracking-[0.2em] uppercase mt-4 mb-2" style={{ color: C.gold }}>Products</p>
          {products.map(p => (
            <Link key={p.id} href={`/products/${p.id}`}
              className="block py-2.5 text-sm"
              style={{ color: `${C.ivory}80`, fontFamily: sans, borderBottom: `1px solid ${C.gold}10` }}>
              {p.name} <span style={{ color: C.gold }}>₹{p.price.toLocaleString("en-IN")}</span>
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
