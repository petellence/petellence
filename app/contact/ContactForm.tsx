"use client";

import { useState } from "react";
import { submitContact } from "@/lib/api";
import { C, sans } from "@/lib/theme";

type Status = { type: "idle" | "loading" | "success" | "error"; message?: string };

const SUBJECTS = ["General enquiry", "Product question", "Order support", "Partnership", "Feedback"];

export default function ContactForm() {
  const [form, setForm]     = useState({ name: "", email: "", subject: SUBJECTS[0], message: "" });
  const [status, setStatus] = useState<Status>({ type: "idle" });

  function update<K extends keyof typeof form>(key: K, value: string) {
    setForm(f => ({ ...f, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus({ type: "loading" });
    try {
      const { message } = await submitContact(form);
      setStatus({ type: "success", message });
      setForm({ name: "", email: "", subject: SUBJECTS[0], message: "" });
    } catch (err) {
      setStatus({ type: "error", message: (err as Error).message });
    }
  }

  const inputStyle: React.CSSProperties = {
    background: C.dark,
    border: `1px solid ${C.gold}30`,
    color: C.ivory,
    fontFamily: sans,
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-[11px] font-bold tracking-wide uppercase mb-2" style={{ color: `${C.ivory}70`, fontFamily: sans }}>Name</label>
          <input
            required
            value={form.name}
            onChange={e => update("name", e.target.value)}
            placeholder="Your name"
            className="w-full px-4 py-3 rounded-xl text-sm outline-none focus:border-yellow-500/60 transition-colors"
            style={inputStyle}
          />
        </div>
        <div>
          <label className="block text-[11px] font-bold tracking-wide uppercase mb-2" style={{ color: `${C.ivory}70`, fontFamily: sans }}>Email</label>
          <input
            required
            type="email"
            value={form.email}
            onChange={e => update("email", e.target.value)}
            placeholder="you@example.com"
            className="w-full px-4 py-3 rounded-xl text-sm outline-none focus:border-yellow-500/60 transition-colors"
            style={inputStyle}
          />
        </div>
      </div>

      <div>
        <label className="block text-[11px] font-bold tracking-wide uppercase mb-2" style={{ color: `${C.ivory}70`, fontFamily: sans }}>Subject</label>
        <select
          value={form.subject}
          onChange={e => update("subject", e.target.value)}
          className="w-full px-4 py-3 rounded-xl text-sm outline-none focus:border-yellow-500/60 transition-colors"
          style={inputStyle}
        >
          {SUBJECTS.map(s => <option key={s} value={s} style={{ background: C.dark }}>{s}</option>)}
        </select>
      </div>

      <div>
        <label className="block text-[11px] font-bold tracking-wide uppercase mb-2" style={{ color: `${C.ivory}70`, fontFamily: sans }}>Message</label>
        <textarea
          required
          rows={5}
          value={form.message}
          onChange={e => update("message", e.target.value)}
          placeholder="How can we help?"
          className="w-full px-4 py-3 rounded-xl text-sm outline-none focus:border-yellow-500/60 transition-colors resize-none"
          style={inputStyle}
        />
      </div>

      {status.type === "success" && (
        <p className="text-sm font-medium" style={{ color: "#6BCB77", fontFamily: sans }}>{status.message}</p>
      )}
      {status.type === "error" && (
        <p className="text-sm font-medium" style={{ color: "#E07A7A", fontFamily: sans }}>{status.message}</p>
      )}

      <button
        type="submit"
        disabled={status.type === "loading"}
        className="w-full py-3.5 rounded-xl text-sm font-bold transition-all disabled:opacity-60"
        style={{ background: C.gold, color: C.deepBurg, fontFamily: sans }}
      >
        {status.type === "loading" ? "Sending…" : "Send Message"}
      </button>
    </form>
  );
}
