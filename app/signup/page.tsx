"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "motion/react";
import { Mail, Lock, Eye, EyeOff, User, PawPrint } from "lucide-react";
import { useAuth } from "@/lib/context";
import { C, serif, sans } from "@/lib/theme";

const PERKS = [
  { icon:"🌿", title:"Exclusive Formulas",   desc:"First access to new Pete'llence products before public launch" },
  { icon:"🎁", title:"Welcome Gift",          desc:"10% off your first order — applied automatically at checkout" },
  { icon:"📦", title:"Order Tracking",        desc:"Real-time delivery updates and full order history" },
  { icon:"🐾", title:"Personalised Care",     desc:"Tailored wellness recommendations based on your pet's profile" },
];

export default function Signup() {
  const { login }  = useAuth();
  const router     = useRouter();

  const [name,     setName]     = useState("");
  const [petName,  setPetName]  = useState("");
  const [email,    setEmail]    = useState("");
  const [password, setPassword] = useState("");
  const [showPwd,  setShowPwd]  = useState(false);
  const [agreed,   setAgreed]   = useState(false);
  const [loading,  setLoading]  = useState(false);
  const [error,    setError]    = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !password) { setError("Please fill in all required fields."); return; }
    if (!agreed) { setError("Please accept the terms and conditions."); return; }
    setError("");
    setLoading(true);
    await new Promise(r => setTimeout(r, 1300));
    login(name, email);
    setLoading(false);
    router.push("/account");
  };

  const inputStyle = {
    background: `${C.ivory}0c`,
    border:     `1px solid ${C.ivory}20`,
    color:      C.ivory,
    fontFamily: sans,
  };
  const focusIn  = (e: React.FocusEvent<HTMLInputElement>) => (e.currentTarget.style.borderColor = C.gold);
  const focusOut = (e: React.FocusEvent<HTMLInputElement>) => (e.currentTarget.style.borderColor = `${C.ivory}20`);

  return (
    <div className="min-h-screen flex items-start justify-center pt-16 pb-10"
      style={{ background:`linear-gradient(145deg,${C.deepBurg} 0%,${C.burgundy} 55%,#3D0A14 100%)` }}>

      <div className="absolute inset-0 pointer-events-none"
        style={{ background:`radial-gradient(ellipse at 50% 30%,${C.gold}10 0%,transparent 60%)` }} />

      <div className="relative w-full max-w-5xl mx-auto px-5 py-8">
        <div className="grid lg:grid-cols-[1fr_440px] gap-8 items-start">

          {/* ─── LEFT: perks panel ─── */}
          <motion.div
            initial={{ opacity:0, x:-30 }} animate={{ opacity:1, x:0 }}
            transition={{ duration:0.6, ease:[0.25,0.1,0.25,1] }}
            className="hidden lg:block pt-4"
          >
            <Link href="/">
              <div className="text-3xl font-bold mb-0.5" style={{ fontFamily:serif, color:C.ivory }}>Pete&apos;llence</div>
              <div className="text-[10px] tracking-[0.28em] uppercase" style={{ color:C.gold }}>The Science of Pet Wellness</div>
            </Link>

            <div className="mt-10 mb-3 w-10 h-px" style={{ background:C.gold }} />
            <h2 className="text-3xl font-bold mb-3" style={{ fontFamily:serif, color:C.ivory }}>
              Join the Wellness Circle
            </h2>
            <p className="text-sm mb-10" style={{ color:`${C.ivory}60` }}>
              Over 5,000 pet parents have transformed their pets&apos; lives. Your pet deserves the best.
            </p>

            <div className="space-y-5">
              {PERKS.map(({icon,title,desc}, i) => (
                <motion.div
                  key={title}
                  initial={{ opacity:0, x:-20 }} animate={{ opacity:1, x:0 }}
                  transition={{ duration:0.5, delay:0.2 + i*0.1 }}
                  className="flex gap-4 items-start"
                >
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 text-xl"
                    style={{ background:`${C.gold}15`, border:`1px solid ${C.gold}30` }}>
                    {icon}
                  </div>
                  <div>
                    <p className="font-bold text-sm mb-0.5" style={{ color:C.ivory }}>{title}</p>
                    <p className="text-xs leading-relaxed" style={{ color:`${C.ivory}55` }}>{desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* ─── RIGHT: form ─── */}
          <motion.div
            initial={{ opacity:0, y:30 }} animate={{ opacity:1, y:0 }}
            transition={{ duration:0.6, delay:0.1, ease:[0.25,0.1,0.25,1] }}
            className="rounded-3xl p-8"
            style={{ background:"rgba(255,255,255,0.04)", border:`1px solid ${C.gold}28`, backdropFilter:"blur(20px)" }}
          >
            <div className="lg:hidden text-center mb-6">
              <Link href="/">
                <div className="text-2xl font-bold" style={{ fontFamily:serif, color:C.ivory }}>Pete&apos;llence</div>
              </Link>
            </div>

            <h1 className="text-2xl font-bold mb-1" style={{ fontFamily:serif, color:C.ivory }}>Create Account</h1>
            <p className="text-sm mb-6" style={{ color:`${C.ivory}55` }}>Join thousands of pet parents</p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-bold tracking-wide mb-1.5 block" style={{ color:`${C.ivory}70` }}>Your Name *</label>
                <div className="relative">
                  <User size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2" style={{ color:`${C.ivory}40` }} />
                  <input type="text" value={name} onChange={e=>setName(e.target.value)} placeholder="Full name"
                    className="w-full pl-10 pr-4 py-3 rounded-xl text-sm outline-none transition-all"
                    style={inputStyle} onFocus={focusIn} onBlur={focusOut} />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold tracking-wide mb-1.5 block" style={{ color:`${C.ivory}70` }}>
                  Pet&apos;s Name <span style={{ color:`${C.ivory}35` }}>(optional)</span>
                </label>
                <div className="relative">
                  <PawPrint size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2" style={{ color:`${C.ivory}40` }} />
                  <input type="text" value={petName} onChange={e=>setPetName(e.target.value)} placeholder="e.g. Bruno, Mishti…"
                    className="w-full pl-10 pr-4 py-3 rounded-xl text-sm outline-none transition-all"
                    style={inputStyle} onFocus={focusIn} onBlur={focusOut} />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold tracking-wide mb-1.5 block" style={{ color:`${C.ivory}70` }}>Email Address *</label>
                <div className="relative">
                  <Mail size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2" style={{ color:`${C.ivory}40` }} />
                  <input type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="you@example.com"
                    className="w-full pl-10 pr-4 py-3 rounded-xl text-sm outline-none transition-all"
                    style={inputStyle} onFocus={focusIn} onBlur={focusOut} />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold tracking-wide mb-1.5 block" style={{ color:`${C.ivory}70` }}>Password *</label>
                <div className="relative">
                  <Lock size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2" style={{ color:`${C.ivory}40` }} />
                  <input type={showPwd?"text":"password"} value={password} onChange={e=>setPassword(e.target.value)}
                    placeholder="Min. 8 characters"
                    className="w-full pl-10 pr-11 py-3 rounded-xl text-sm outline-none transition-all"
                    style={inputStyle} onFocus={focusIn} onBlur={focusOut} />
                  <button type="button" onClick={()=>setShowPwd(s=>!s)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2" style={{ color:`${C.ivory}40` }}>
                    {showPwd ? <EyeOff size={14}/> : <Eye size={14}/>}
                  </button>
                </div>
              </div>

              <label className="flex items-start gap-3 cursor-pointer">
                <input type="checkbox" checked={agreed} onChange={e=>setAgreed(e.target.checked)} className="mt-0.5 rounded" />
                <span className="text-xs leading-relaxed" style={{ color:`${C.ivory}55` }}>
                  I agree to Pete&apos;llence&apos;s{" "}
                  <a href="#" className="underline" style={{ color:C.gold }}>Terms of Service</a> and{" "}
                  <a href="#" className="underline" style={{ color:C.gold }}>Privacy Policy</a>.
                  I consent to receive wellness updates and exclusive offers.
                </span>
              </label>

              {error && (
                <p className="text-xs px-3 py-2 rounded-lg" style={{ background:"rgba(212,24,61,0.15)", color:"#FF6B80", border:"1px solid rgba(212,24,61,0.3)" }}>
                  {error}
                </p>
              )}

              <button type="submit" disabled={loading}
                className="w-full gold-btn py-4 rounded-xl text-sm tracking-wide"
                style={{ opacity:loading?0.8:1 }}>
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="w-4 h-4 rounded-full border-2 border-current border-t-transparent animate-spin" />
                    Creating account…
                  </span>
                ) : "Create My Account"}
              </button>
            </form>

            <p className="text-center text-sm mt-5" style={{ color:`${C.ivory}50` }}>
              Already have an account?{" "}
              <Link href="/login" className="font-bold" style={{ color:C.gold }}
                onMouseEnter={e=>(e.currentTarget.style.color=C.ivory)}
                onMouseLeave={e=>(e.currentTarget.style.color=C.gold)}>
                Sign in
              </Link>
            </p>
          </motion.div>

        </div>
      </div>
    </div>
  );
}
