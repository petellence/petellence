import type { Metadata } from "next";
import Link from "next/link";
import { C, serif, sans } from "@/lib/theme";

export const metadata: Metadata = {
  title: "About Us — Pete'llence",
  description: "The story behind Pete'llence — luxury pet nutraceuticals crafted from Italian coastal science and 5,000 years of Ayurvedic wisdom.",
};

const VALUES = [
  { icon: "🔬", title: "Science First", text: "Every formula is built on peer-reviewed nutraceutical research and precise, effective dosages — never guesswork." },
  { icon: "🌿", title: "Ancient Wisdom", text: "We blend modern Italian coastal science with 5,000 years of Ayurvedic tradition for whole-pet wellness." },
  { icon: "🐾", title: "Pets as Family", text: "We formulate for the pets we love as if they were our own — because to us, they are." },
  { icon: "✓", title: "Radical Transparency", text: "Full ingredient disclosure, honest sourcing, and vet-approved formulas. No fillers, no fine print." },
];

const STATS = [
  { value: "4",       label: "Signature Formulas" },
  { value: "5,000+",  label: "Happy Pets" },
  { value: "12",      label: "Indian Herbs" },
  { value: "4.9★",    label: "Average Rating" },
];

export default function AboutPage() {
  return (
    <main style={{ background: C.dark, color: C.ivory }}>
      {/* hero */}
      <section className="max-w-4xl mx-auto px-5 pt-36 pb-16 text-center">
        <p className="text-[11px] font-bold tracking-[0.3em] uppercase mb-5" style={{ color: C.gold, fontFamily: sans }}>
          Our Story
        </p>
        <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6" style={{ fontFamily: serif, color: C.ivory }}>
          Wellness worthy of<br />the ones you love.
        </h1>
        <p className="text-base md:text-lg leading-relaxed max-w-2xl mx-auto" style={{ color: `${C.ivory}80`, fontFamily: sans }}>
          Pete&apos;llence was born from a simple conviction: the pets who give us everything deserve
          nutrition crafted with the same precision and care we&apos;d demand for ourselves.
        </p>
      </section>

      {/* stats */}
      <section className="max-w-4xl mx-auto px-5 pb-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {STATS.map(s => (
            <div key={s.label} className="text-center rounded-2xl py-7 px-3"
              style={{ background: C.deepBurg, border: `1px solid ${C.gold}22` }}>
              <p className="text-3xl md:text-4xl font-bold mb-1" style={{ fontFamily: serif, color: C.gold }}>{s.value}</p>
              <p className="text-[11px] tracking-wide uppercase" style={{ color: `${C.ivory}55`, fontFamily: sans }}>{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* narrative */}
      <section className="max-w-3xl mx-auto px-5 pb-16 space-y-6" style={{ fontFamily: sans }}>
        <h2 className="text-2xl md:text-3xl font-bold" style={{ fontFamily: serif, color: C.ivory }}>Where science meets tradition</h2>
        <p className="text-sm md:text-base leading-relaxed" style={{ color: `${C.ivory}75` }}>
          Our formulas draw on the marine-rich nutraceutical science of the Italian coast and pair it with
          time-honoured Ayurvedic botanicals — neem, bhringraj, ashwagandha and more. The result is a
          collection of precision supplements engineered for joint mobility, radiant coats, resilient
          immunity and calm, balanced minds.
        </p>
        <p className="text-sm md:text-base leading-relaxed" style={{ color: `${C.ivory}75` }}>
          Every batch is vet-reviewed, transparently sourced, and made without unnecessary fillers.
          We believe luxury isn&apos;t excess — it&apos;s getting the essentials exactly right.
        </p>
      </section>

      {/* values */}
      <section className="max-w-5xl mx-auto px-5 pb-20">
        <div className="grid sm:grid-cols-2 gap-5">
          {VALUES.map(v => (
            <div key={v.title} className="rounded-2xl p-7"
              style={{ background: C.deepBurg, border: `1px solid ${C.gold}22` }}>
              <div className="text-3xl mb-4">{v.icon}</div>
              <h3 className="text-lg font-bold mb-2" style={{ fontFamily: serif, color: C.ivory }}>{v.title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: `${C.ivory}70`, fontFamily: sans }}>{v.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* cta */}
      <section className="max-w-3xl mx-auto px-5 pb-24 text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-4" style={{ fontFamily: serif, color: C.ivory }}>
          Have a question for us?
        </h2>
        <p className="text-sm mb-7" style={{ color: `${C.ivory}70`, fontFamily: sans }}>
          We&apos;d love to hear from you — whether it&apos;s about a formula, your pet, or an order.
        </p>
        <Link href="/contact"
          className="inline-block px-8 py-3.5 rounded-xl text-sm font-bold transition-all"
          style={{ background: C.gold, color: C.deepBurg, fontFamily: sans }}>
          Contact Us
        </Link>
      </section>
    </main>
  );
}
