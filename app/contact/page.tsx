import type { Metadata } from "next";
import { C, serif, sans } from "@/lib/theme";
import ContactForm from "./ContactForm";

export const metadata: Metadata = {
  title: "Contact Us — Pete'llence",
  description: "Get in touch with the Pete'llence team — product questions, order support, partnerships and feedback.",
};

const CHANNELS = [
  { icon: "✉️", label: "Email",    value: "hello@petellence.com",   href: "mailto:hello@petellence.com" },
  { icon: "💬", label: "WhatsApp", value: "+91 98765 43210",        href: "https://wa.me/919876543210" },
  { icon: "📍", label: "Studio",   value: "Bengaluru, India",       href: undefined },
  { icon: "🕑", label: "Hours",    value: "Mon–Sat, 10am – 7pm IST", href: undefined },
];

export default function ContactPage() {
  return (
    <main style={{ background: C.dark, color: C.ivory }}>
      <section className="max-w-4xl mx-auto px-5 pt-36 pb-12 text-center">
        <p className="text-[11px] font-bold tracking-[0.3em] uppercase mb-5" style={{ color: C.gold, fontFamily: sans }}>
          Get in Touch
        </p>
        <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6" style={{ fontFamily: serif, color: C.ivory }}>
          We&apos;d love to hear<br />from you.
        </h1>
        <p className="text-base leading-relaxed max-w-xl mx-auto" style={{ color: `${C.ivory}80`, fontFamily: sans }}>
          Questions about a formula, your order, or your pet&apos;s wellness journey? Our team usually replies within one business day.
        </p>
      </section>

      <section className="max-w-5xl mx-auto px-5 pb-24">
        <div className="grid md:grid-cols-5 gap-8">
          {/* channels */}
          <div className="md:col-span-2 space-y-4">
            {CHANNELS.map(c => {
              const inner = (
                <div className="flex items-start gap-4 rounded-2xl p-5 h-full"
                  style={{ background: C.deepBurg, border: `1px solid ${C.gold}22` }}>
                  <span className="text-2xl">{c.icon}</span>
                  <div>
                    <p className="text-[11px] font-bold tracking-wide uppercase mb-1" style={{ color: C.gold, fontFamily: sans }}>{c.label}</p>
                    <p className="text-sm" style={{ color: `${C.ivory}85`, fontFamily: sans }}>{c.value}</p>
                  </div>
                </div>
              );
              return c.href
                ? <a key={c.label} href={c.href} target="_blank" rel="noopener noreferrer" className="block transition-transform hover:-translate-y-0.5">{inner}</a>
                : <div key={c.label}>{inner}</div>;
            })}
          </div>

          {/* form */}
          <div className="md:col-span-3 rounded-2xl p-7"
            style={{ background: C.deepBurg, border: `1px solid ${C.gold}22` }}>
            <h2 className="text-xl font-bold mb-5" style={{ fontFamily: serif, color: C.ivory }}>Send us a message</h2>
            <ContactForm />
          </div>
        </div>
      </section>
    </main>
  );
}
