import type { Metadata } from "next";
import { C, serif, sans } from "@/lib/theme";

export const metadata: Metadata = {
  title: "Privacy Policy — Pete'llence",
  description: "How Pete'llence collects, uses, and protects your personal information.",
};

const SECTIONS = [
  {
    heading: "1. Information We Collect",
    body: [
      "We collect information you provide directly to us — such as your name, email address, and message — when you subscribe to our newsletter, submit the contact form, or leave a testimonial.",
      "We may also automatically collect limited technical data (such as browser type and pages visited) to help us improve the site experience.",
    ],
  },
  {
    heading: "2. How We Use Your Information",
    body: [
      "To respond to your enquiries and provide customer support.",
      "To send you newsletters and product updates you have opted into. You can unsubscribe at any time.",
      "To improve our products, website, and overall service quality.",
    ],
  },
  {
    heading: "3. Sharing of Information",
    body: [
      "We do not sell your personal information. We only share data with trusted service providers who help us operate our website and communicate with you, and only to the extent necessary.",
      "We may disclose information if required by law or to protect our legal rights.",
    ],
  },
  {
    heading: "4. Data Security",
    body: [
      "We use reasonable technical and organisational measures to protect your personal information. However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.",
    ],
  },
  {
    heading: "5. Your Rights",
    body: [
      "You may request access to, correction of, or deletion of your personal information at any time by contacting us. You may also unsubscribe from marketing communications using the link in any email.",
    ],
  },
  {
    heading: "6. Cookies",
    body: [
      "Our website may use cookies and similar technologies to remember your preferences and understand how the site is used. You can control cookies through your browser settings.",
    ],
  },
  {
    heading: "7. Changes to This Policy",
    body: [
      "We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated effective date.",
    ],
  },
  {
    heading: "8. Contact Us",
    body: [
      "If you have any questions about this Privacy Policy or how we handle your data, please reach out via our Contact page or email hello@petellence.com.",
    ],
  },
];

export default function PrivacyPage() {
  return (
    <main style={{ background: C.dark, color: C.ivory }}>
      <section className="max-w-3xl mx-auto px-5 pt-36 pb-10">
        <p className="text-[11px] font-bold tracking-[0.3em] uppercase mb-4" style={{ color: C.gold, fontFamily: sans }}>
          Legal
        </p>
        <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4" style={{ fontFamily: serif, color: C.ivory }}>
          Privacy Policy
        </h1>
        <p className="text-sm" style={{ color: `${C.ivory}55`, fontFamily: sans }}>
          Effective date: 25 July 2026
        </p>
      </section>

      <section className="max-w-3xl mx-auto px-5 pb-24 space-y-9">
        <p className="text-sm md:text-base leading-relaxed" style={{ color: `${C.ivory}75`, fontFamily: sans }}>
          At Pete&apos;llence, your privacy matters to us. This policy explains what information we collect,
          how we use it, and the choices you have. By using our website, you agree to the practices described below.
        </p>
        {SECTIONS.map(s => (
          <div key={s.heading}>
            <h2 className="text-lg md:text-xl font-bold mb-3" style={{ fontFamily: serif, color: C.gold }}>{s.heading}</h2>
            <div className="space-y-3">
              {s.body.map((p, i) => (
                <p key={i} className="text-sm md:text-base leading-relaxed" style={{ color: `${C.ivory}75`, fontFamily: sans }}>{p}</p>
              ))}
            </div>
          </div>
        ))}
      </section>
    </main>
  );
}
