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
            { heading:"Products",  links:["Tonico Miracolo","Derma Rituale","Immuno Forte","Calmo Sera"] },
            { heading:"Company",   links:["Our Story","The Science","Vet Partners","Blog"] },
            { heading:"Support",   links:["WhatsApp Chat","FAQ","Shipping Policy","Returns & Refunds"] },
          ].map(({heading,links})=>(
            <div key={heading}>
              <p className="text-[10px] font-bold tracking-[0.22em] uppercase mb-5" style={{ color:C.gold }}>{heading}</p>
              <ul className="space-y-2.5">
                {links.map(l=>(
                  <li key={l}>
                    <a href="#" className="text-xs transition-colors" style={{ color:`${C.ivory}50`, fontFamily:sans }}
                      onMouseEnter={e=>((e.target as HTMLElement).style.color=C.ivory)}
                      onMouseLeave={e=>((e.target as HTMLElement).style.color=`${C.ivory}50`)}>
                      {l}
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
