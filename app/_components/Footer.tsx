"use client";

import { C, serif, sans } from "@/lib/theme";

export default function Footer() {
  return (
    <footer style={{ background:C.deepBurg }}>
      <div className="max-w-7xl mx-auto px-5 py-14">
        <div className="grid md:grid-cols-4 gap-10 pb-10" style={{ borderBottom:`1px solid ${C.gold}22` }}>
          <div>
            <div className="text-2xl font-bold mb-1" style={{ fontFamily:serif, color:C.ivory }}>Pete&apos;llence</div>
            <div className="text-[10px] tracking-[0.25em] uppercase mb-4" style={{ color:C.gold }}>The Science of Pet Wellness</div>
            <p className="text-xs leading-relaxed" style={{ color:`${C.ivory}45` }}>
              Ultra-luxury pet nutraceuticals crafted from Italian ingredients and Ayurvedic wisdom.
            </p>
          </div>
          {[
            { heading:"Products",  links:[["All Products","/products"],["Joint Support","/products"],["Skin & Coat","/products"],["Immunity","/products"]] },
            { heading:"Company",   links:[["Our Promise","/"],["The Science","/"],["Reviews","/"],["Newsletter","/"]] },
            { heading:"Support",   links:[["Marketplace Buying","/products"],["Amazon","https://www.amazon.in/s?k=petellence+pet+supplements"],["Flipkart","https://www.flipkart.com/search?q=petellence+pet+supplements"],["Meesho","https://www.meesho.com/search?q=petellence%20pet%20supplements"]] },
          ].map(({heading,links})=>(
            <div key={heading}>
              <p className="text-[10px] font-bold tracking-[0.22em] uppercase mb-5" style={{ color:C.gold }}>{heading}</p>
              <ul className="space-y-2.5">
                {links.map(([label, href])=>(
                  <li key={label}>
                    <a href={href} className="text-xs transition-colors" style={{ color:`${C.ivory}50`, fontFamily:sans }}
                      onMouseEnter={e=>((e.target as HTMLElement).style.color=C.ivory)}
                      onMouseLeave={e=>((e.target as HTMLElement).style.color=`${C.ivory}50`)}>
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8">
          <p className="text-xs" style={{ color:`${C.ivory}30` }}>© 2026 Pete&apos;llence Wellness Pvt. Ltd. All rights reserved.</p>
          <div className="flex gap-5">
            {["Instagram","Facebook","WhatsApp"].map(s=>(
              <a key={s} href="#" className="text-xs transition-colors" style={{ color:`${C.ivory}35`, fontFamily:sans }}
                onMouseEnter={e=>((e.target as HTMLElement).style.color=C.gold)}
                onMouseLeave={e=>((e.target as HTMLElement).style.color=`${C.ivory}35`)}>
                {s}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
