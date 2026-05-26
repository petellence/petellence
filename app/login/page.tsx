"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "motion/react";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { useAuth } from "@/lib/context";
import { C, serif, sans } from "@/lib/theme";

export default function Login() {
  const { login } = useAuth();
  const router    = useRouter();

  const [email,    setEmail]    = useState("");
  const [password, setPassword] = useState("");
  const [showPwd,  setShowPwd]  = useState(false);
  const [loading,  setLoading]  = useState(false);
  const [error,    setError]    = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!email || !password) { setError("Please fill in all fields."); return; }
    setLoading(true);
    await new Promise(r => setTimeout(r, 1200));
    const name = email.split("@")[0].replace(/[._]/g, " ").replace(/\b\w/g, c => c.toUpperCase());
    login(name, email);
    setLoading(false);
    router.push("/account");
  };

  return (
    <div className="min-h-screen flex items-center justify-center pt-16 pb-10"
      style={{ background:`linear-gradient(145deg,${C.deepBurg} 0%,${C.burgundy} 55%,#3D0A14 100%)` }}>

      <div className="absolute inset-0 pointer-events-none"
        style={{ background:`radial-gradient(ellipse at 50% 40%,${C.gold}10 0%,transparent 60%)` }} />

      <div className="relative w-full max-w-md mx-auto px-5">
        <motion.div
          initial={{ opacity:0, y:30 }} animate={{ opacity:1, y:0 }}
          transition={{ duration:0.6, ease:[0.25,0.1,0.25,1] }}
          className="rounded-3xl p-8 md:p-10"
          style={{ background:"rgba(255,255,255,0.04)", border:`1px solid ${C.gold}28`, backdropFilter:"blur(20px)" }}
        >
          <div className="text-center mb-8">
            <Link href="/">
              <div className="text-3xl font-bold" style={{ fontFamily:serif, color:C.ivory }}>Pete&apos;llence</div>
              <div className="text-[10px] tracking-[0.28em] uppercase mt-0.5" style={{ color:C.gold }}>The Science of Pet Wellness</div>
            </Link>
            <div className="mt-6 w-12 h-px mx-auto" style={{ background:C.gold }} />
            <h1 className="text-2xl font-bold mt-5" style={{ fontFamily:serif, color:C.ivory }}>Welcome Back</h1>
            <p className="text-sm mt-1" style={{ color:`${C.ivory}60` }}>Sign in to your account</p>
          </div>

          <div className="grid grid-cols-2 gap-3 mb-6">
            {["Continue with Google","Continue with Apple"].map(label => (
              <button
                key={label}
                className="py-3 rounded-xl text-xs font-bold transition-all"
                style={{ background:`${C.ivory}08`, border:`1px solid ${C.ivory}20`, color:C.ivory }}
                onMouseEnter={e=>(e.currentTarget.style.background=`${C.ivory}14`)}
                onMouseLeave={e=>(e.currentTarget.style.background=`${C.ivory}08`)}
              >
                {label.replace("Continue with ", "")} {label.includes("Google") ? "🔵" : "🍎"}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3 mb-6">
            <div className="flex-1 h-px" style={{ background:`${C.ivory}18` }} />
            <span className="text-xs" style={{ color:`${C.ivory}40` }}>or</span>
            <div className="flex-1 h-px" style={{ background:`${C.ivory}18` }} />
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-xs font-bold tracking-wide mb-1.5 block" style={{ color:`${C.ivory}70` }}>
                Email Address
              </label>
              <div className="relative">
                <Mail size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2" style={{ color:`${C.ivory}40` }} />
                <input
                  type="email" value={email} onChange={e => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full pl-10 pr-4 py-3.5 rounded-xl text-sm outline-none transition-all"
                  style={{ background:`${C.ivory}0c`, border:`1px solid ${C.ivory}20`, color:C.ivory, fontFamily:sans }}
                  onFocus={e=>(e.currentTarget.style.borderColor=C.gold)}
                  onBlur={e=>(e.currentTarget.style.borderColor=`${C.ivory}20`)}
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold tracking-wide mb-1.5 block" style={{ color:`${C.ivory}70` }}>
                Password
              </label>
              <div className="relative">
                <Lock size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2" style={{ color:`${C.ivory}40` }} />
                <input
                  type={showPwd ? "text" : "password"}
                  value={password} onChange={e => setPassword(e.target.value)}
                  placeholder="Your password"
                  className="w-full pl-10 pr-11 py-3.5 rounded-xl text-sm outline-none transition-all"
                  style={{ background:`${C.ivory}0c`, border:`1px solid ${C.ivory}20`, color:C.ivory, fontFamily:sans }}
                  onFocus={e=>(e.currentTarget.style.borderColor=C.gold)}
                  onBlur={e=>(e.currentTarget.style.borderColor=`${C.ivory}20`)}
                />
                <button type="button" onClick={() => setShowPwd(s => !s)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2"
                  style={{ color:`${C.ivory}40` }}>
                  {showPwd ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>

            {error && (
              <p className="text-xs px-3 py-2 rounded-lg" style={{ background:"rgba(212,24,61,0.15)", color:"#FF6B80", border:"1px solid rgba(212,24,61,0.3)" }}>
                {error}
              </p>
            )}

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="rounded" />
                <span className="text-xs" style={{ color:`${C.ivory}60` }}>Remember me</span>
              </label>
              <button type="button" className="text-xs transition-colors" style={{ color:C.gold }}
                onMouseEnter={e=>(e.currentTarget.style.color=C.ivory)}
                onMouseLeave={e=>(e.currentTarget.style.color=C.gold)}>
                Forgot password?
              </button>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full gold-btn py-4 rounded-xl text-sm tracking-wide relative overflow-hidden"
              style={{ opacity: loading ? 0.8 : 1 }}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="w-4 h-4 rounded-full border-2 border-current border-t-transparent animate-spin" />
                  Signing in…
                </span>
              ) : "Sign In"}
            </button>
          </form>

          <p className="text-center text-sm mt-6" style={{ color:`${C.ivory}50` }}>
            New to Pete&apos;llence?{" "}
            <Link href="/signup" className="font-bold transition-colors" style={{ color:C.gold }}
              onMouseEnter={e=>(e.currentTarget.style.color=C.ivory)}
              onMouseLeave={e=>(e.currentTarget.style.color=C.gold)}>
              Create account
            </Link>
          </p>
        </motion.div>

        <p className="text-center text-[11px] mt-5" style={{ color:`${C.ivory}35` }}>
          🔒 Your data is protected with 256-bit SSL encryption
        </p>
      </div>
    </div>
  );
}
