"use client";

import { useRef } from "react";
import { useRouter } from "next/navigation";
import { motion, useInView, useScroll, useTransform } from "motion/react";
import { Star, ArrowRight, ExternalLink, Shield, Leaf, Zap, Heart } from "lucide-react";
import { PRODUCTS } from "@/lib/data";
import { C, serif, sans } from "@/lib/theme";

const IMG = {
  heroDog:    "https://images.unsplash.com/photo-1724367236214-e4f50691c27c?w=1000&h=1400&fit=crop&auto=format",
  catElegant: "https://images.unsplash.com/photo-1498100152307-ce63ad6c5424?w=900&h=1100&fit=crop&auto=format",
  golden:     "https://images.unsplash.com/photo-1768676758489-851bb9ea865a?w=1400&h=900&fit=crop&auto=format",
  outdoor:    "https://images.unsplash.com/photo-1758543535538-8618ebe73114?w=1600&h=900&fit=crop&auto=format",
  catPortrait:"https://images.unsplash.com/photo-1611843275167-a9bba9aa65dd?w=700&h=900&fit=crop&auto=format",
  wellness:   "https://images.unsplash.com/photo-1614633836648-68ddff9f7553?w=900&h=700&fit=crop&auto=format",
  corgi:      "https://images.unsplash.com/photo-1771465984310-89a362ef47a3?w=1200&h=800&fit=crop&auto=format",
};

const MARQUEE_ITEMS = [
  "Vet Approved","GMP Certified","5,000+ Pets","Ayurvedic Wisdom",
  "Italian Excellence","4.9 ★","Soxhlet Extraction","30-Day Guarantee",
  "Free Shipping ₹999+","Natural Ingredients","Zero Side Effects",
];

const STATS = [
  { value:"5,000+", label:"Pets Transformed",  icon: Heart  },
  { value:"4.9 ★",  label:"Average Rating",    icon: Star   },
  { value:"12",     label:"Ayurvedic Herbs",   icon: Leaf   },
  { value:"100%",   label:"Natural Formula",   icon: Shield },
];

const SCIENCE_POINTS = [
  { n:"01", title:"Cold-Harvest Extract",  body:"Green-Lipped Mussel from certified Italian coastal waters — cold-processed within hours to lock in every glycosaminoglycan." },
  { n:"02", title:"Soxhlet Process",        body:"Hydroethanolic extraction maximises bioavailability of all 12 Ayurvedic herbs. 10× more active compounds than standard capsules." },
  { n:"03", title:"GMP Certified",          body:"Every batch triple-tested in a licensed facility. QR traceability from coastal harvest to your pet's bowl." },
];

const REVIEWS = [
  {
    name:"Dr. Priya Mehta", role:"Veterinary Surgeon, Mumbai", stars:5,
    text:"In 15 years of practice this is the first supplement I recommend without hesitation. The Soxhlet extraction genuinely sets it apart from everything else on the market.",
    pet:"Recommends to all senior patients", img:IMG.wellness,
  },
  {
    name:"Arjun Kapoor", role:"Pet Parent, Bengaluru", stars:5,
    text:"Simba could barely climb stairs anymore. Within three weeks, he was running in the park again. I cannot put a price on watching my old dog come back to life.",
    pet:"Bruno, Golden Retriever · 7 yrs", img:IMG.corgi,
  },
  {
    name:"Kavya Nair", role:"Cat Parent, Chennai", stars:5,
    text:"The transformation in her energy and coat has been nothing short of remarkable. She is genuinely a different cat — lighter, faster, more herself.",
    pet:"Mishti, Persian · 7 yrs", img:IMG.catPortrait,
  },
];

function Reveal({ children, delay=0, direction="up" }: {
  children: React.ReactNode; delay?: number; direction?: "up"|"left"|"right";
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once:true, margin:"-60px" });
  const variants = {
    hidden:  { opacity:0, y:direction==="up"?36:0, x:direction==="left"?-36:direction==="right"?36:0 },
    visible: { opacity:1, y:0, x:0, transition:{ duration:0.75, delay, ease:[0.25,0.1,0.25,1] as [number,number,number,number] } },
  };
  return (
    <motion.div ref={ref} initial="hidden" animate={inView?"visible":"hidden"} variants={variants}>
      {children}
    </motion.div>
  );
}

function HeroImage() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target:ref, offset:["start start","end start"] });
  const y = useTransform(scrollYProgress, [0,1], ["0%","18%"]);
  return (
    <motion.div ref={ref} style={{ y }} className="absolute inset-0 w-full h-full">
      <img src={IMG.heroDog} alt="Majestic dog" className="w-full h-full object-cover object-top" />
    </motion.div>
  );
}

export default function Home() {
  const router = useRouter();

  return (
    <>
      {/* ══════════════════ HERO ══════════════════ */}
      <section className="relative min-h-screen flex items-stretch overflow-hidden" style={{ background:C.dark }}>
        <div className="absolute right-0 top-0 bottom-0 w-full lg:w-[58%]">
          <HeroImage />
          <div className="absolute inset-0"
            style={{ background:`linear-gradient(to right,${C.dark} 0%,${C.dark}e0 8%,${C.dark}88 22%,${C.dark}25 45%,transparent 65%)` }} />
          <div className="absolute inset-0"
            style={{ background:`linear-gradient(to top,${C.dark} 0%,transparent 30%)` }} />
        </div>

        <div className="relative z-10 w-full lg:w-[52%] flex flex-col justify-center px-8 md:px-14 pt-28 pb-16">
          <motion.div
            initial={{ scaleX:0, opacity:0 }}
            animate={{ scaleX:1, opacity:1 }}
            transition={{ duration:0.9, ease:[0.25,0.1,0.25,1] }}
            style={{ transformOrigin:"left" }}
            className="flex items-center gap-4 mb-8"
          >
            <div className="h-px w-12" style={{ background:C.gold }} />
            <span className="text-[10px] tracking-[0.44em] uppercase" style={{ color:C.gold, fontFamily:sans }}>
              Because they can&apos;t ask for better
            </span>
          </motion.div>

          <motion.p
            initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }}
            transition={{ duration:0.7, delay:0.15 }}
            className="text-xl md:text-2xl italic leading-snug mb-2"
            style={{ fontFamily:serif, color:`${C.ivory}65` }}
          >
            Some pets are lucky enough
          </motion.p>
          <motion.h1
            initial={{ opacity:0, y:30 }} animate={{ opacity:1, y:0 }}
            transition={{ duration:0.8, delay:0.28 }}
            style={{ fontFamily:serif, color:C.ivory, fontSize:"clamp(58px,8.5vw,114px)", lineHeight:0.9, fontWeight:700, letterSpacing:"-0.02em" }}
          >
            to have<br />
            <em style={{ color:C.gold, fontStyle:"italic" }}>you.</em>
          </motion.h1>

          <motion.div
            initial={{ scaleX:0 }} animate={{ scaleX:1 }}
            transition={{ duration:0.7, delay:0.5 }}
            style={{ transformOrigin:"left", background:C.gold }}
            className="w-20 h-0.5 my-7"
          />

          <motion.p
            initial={{ opacity:0 }} animate={{ opacity:1 }}
            transition={{ duration:0.7, delay:0.6 }}
            className="text-base leading-relaxed max-w-sm mb-3"
            style={{ color:`${C.ivory}68`, fontFamily:sans }}
          >
            Between their first steps and their last grey muzzle, they give you everything.
          </motion.p>
          <motion.p
            initial={{ opacity:0 }} animate={{ opacity:1 }}
            transition={{ duration:0.7, delay:0.72 }}
            className="text-base leading-relaxed max-w-sm mb-10"
            style={{ color:`${C.ivory}55`, fontFamily:sans }}
          >
            The least we can do is give them a supplement that actually works. Italian Green-Lipped Mussel.
            Twelve Ayurvedic herbs. One extraordinary formula.
          </motion.p>

          <motion.div
            initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }}
            transition={{ duration:0.6, delay:0.82 }}
            className="flex flex-wrap gap-3 mb-10"
          >
            <a href="#" target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2.5 px-5 py-3.5 rounded-xl font-bold text-sm transition-all"
              style={{ background:"#FF9900", color:"#131921", fontFamily:sans }}
              onMouseEnter={e=>(e.currentTarget.style.background="#e68900")}
              onMouseLeave={e=>(e.currentTarget.style.background="#FF9900")}>
              🛒 Buy on Amazon <ExternalLink size={13} />
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2.5 px-5 py-3.5 rounded-xl font-bold text-sm transition-all"
              style={{ background:"#2874F0", color:"#fff", fontFamily:sans }}
              onMouseEnter={e=>(e.currentTarget.style.background="#1a5fd4")}
              onMouseLeave={e=>(e.currentTarget.style.background="#2874F0")}>
              🛒 Buy on Flipkart <ExternalLink size={13} />
            </a>
            <button
              onClick={() => router.push("/products/tonico-miracolo")}
              className="flex items-center gap-2 px-5 py-3.5 rounded-xl text-sm font-bold transition-all"
              style={{ border:`1px solid ${C.ivory}28`, color:C.ivory, fontFamily:sans }}
              onMouseEnter={e=>(e.currentTarget.style.borderColor=C.gold)}
              onMouseLeave={e=>(e.currentTarget.style.borderColor=`${C.ivory}28`)}>
              See All Products <ArrowRight size={14} />
            </button>
          </motion.div>

          <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:1.0 }} className="flex gap-8">
            {[["5,000+","Pets"],["4.9★","Rating"],["Vet","Approved"]].map(([v,l]) => (
              <div key={l}>
                <p className="font-bold text-lg leading-none" style={{ fontFamily:serif, color:C.gold }}>{v}</p>
                <p className="text-xs mt-0.5" style={{ color:`${C.ivory}40`, fontFamily:sans }}>{l}</p>
              </div>
            ))}
          </motion.div>
        </div>

        {/* floating product pill */}
        <motion.div
          initial={{ opacity:0, scale:0.7, y:20 }}
          animate={{ opacity:1, scale:1, y:0 }}
          transition={{ delay:1.2, duration:0.6, ease:[0.34,1.56,0.64,1] }}
          className="float absolute bottom-14 right-[4%] lg:right-[36%] z-20 px-4 py-3.5 rounded-2xl shadow-2xl"
          style={{ background:"rgba(26,4,8,0.90)", border:`1px solid ${C.gold}55`, backdropFilter:"blur(14px)" }}
        >
          <p className="text-[9px] font-bold tracking-[0.32em] uppercase" style={{ color:C.gold, fontFamily:sans }}>Bestseller · Joint Formula</p>
          <p className="text-sm font-bold mt-0.5" style={{ color:C.ivory, fontFamily:serif }}>Tonico Miracolo</p>
          <p className="text-xs mt-0.5" style={{ color:`${C.ivory}55`, fontFamily:sans }}>Italian Lipped Mussel · ₹1,195</p>
        </motion.div>

        {/* scroll hint */}
        <div className="absolute bottom-7 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 z-10">
          <motion.div animate={{ y:[0,8,0] }} transition={{ repeat:Infinity, duration:2.2, ease:"easeInOut" }}
            className="flex flex-col items-center gap-1.5">
            <span className="text-[9px] tracking-[0.42em] uppercase" style={{ color:`${C.gold}65`, fontFamily:sans }}>Scroll</span>
            <div className="w-px h-10" style={{ background:`linear-gradient(to bottom,${C.gold}80,transparent)` }} />
          </motion.div>
        </div>
      </section>

      {/* ══════════════════ MARQUEE ══════════════════ */}
      <div className="overflow-hidden py-3" style={{ background:C.deepBurg, borderTop:`1px solid ${C.gold}22`, borderBottom:`1px solid ${C.gold}22` }}>
        <div className="marquee-track whitespace-nowrap">
          {[...MARQUEE_ITEMS,...MARQUEE_ITEMS].map((item,i) => (
            <span key={i} className="inline-flex items-center gap-4 mr-4">
              <span className="text-[11px] font-bold tracking-[0.32em] uppercase" style={{ color:C.gold, fontFamily:sans }}>{item}</span>
              <span style={{ color:`${C.gold}38`, fontSize:10 }}>◆</span>
            </span>
          ))}
        </div>
      </div>

      {/* ══════════════════ IMPACT STATS ══════════════════ */}
      <section className="relative overflow-hidden" style={{ background:C.dark }}>
        <div className="absolute inset-0">
          <img src={IMG.outdoor} alt="Happy dog outdoors" className="w-full h-full object-cover object-top opacity-20" />
          <div className="absolute inset-0" style={{ background:`linear-gradient(to bottom,${C.dark} 0%,transparent 25%,transparent 75%,${C.dark} 100%)` }} />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-6 py-24 md:py-28">
          <Reveal>
            <p className="text-center text-[10px] font-bold tracking-[0.44em] uppercase mb-3" style={{ color:C.gold }}>The Difference You Can See</p>
            <h2 className="text-center font-bold mb-3" style={{ fontFamily:serif, color:C.ivory, fontSize:"clamp(34px,5.5vw,62px)", letterSpacing:"-0.02em" }}>
              The numbers behind the love.
            </h2>
            <p className="text-center text-sm mb-16 max-w-md mx-auto" style={{ color:`${C.ivory}45`, fontFamily:sans }}>
              Every figure earned one pet at a time.
            </p>
          </Reveal>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {STATS.map(({value,label,icon:Icon}, i) => (
              <Reveal key={label} delay={i*0.1}>
                <motion.div
                  whileHover={{ y:-6, transition:{duration:0.22} }}
                  className="text-center p-7 rounded-2xl"
                  style={{ background:"rgba(255,255,255,0.035)", border:`1px solid ${C.gold}28`, backdropFilter:"blur(10px)" }}
                >
                  <div className="w-11 h-11 rounded-xl mx-auto mb-4 flex items-center justify-center"
                    style={{ background:`${C.gold}15`, border:`1px solid ${C.gold}30` }}>
                    <Icon size={18} style={{ color:C.gold }} />
                  </div>
                  <p className="font-bold mb-1" style={{ fontFamily:serif, color:C.ivory, fontSize:"clamp(28px,4vw,40px)", letterSpacing:"-0.02em" }}>{value}</p>
                  <p className="text-xs tracking-wide" style={{ color:`${C.ivory}50`, fontFamily:sans }}>{label}</p>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════ PRODUCT COLLECTION ══════════════════ */}
      <section style={{ background:C.dark }}>
        <div className="max-w-7xl mx-auto px-6 pt-20 pb-12 md:pt-24 md:pb-14">
          <Reveal>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <p className="text-[10px] font-bold tracking-[0.44em] uppercase mb-3" style={{ color:C.gold }}>The Collection</p>
                <h2 className="font-bold leading-tight" style={{ fontFamily:serif, color:C.ivory, fontSize:"clamp(34px,5.5vw,64px)", letterSpacing:"-0.025em" }}>
                  Four Formulas.<br />
                  <em style={{ fontStyle:"italic", color:`${C.ivory}48` }}>One Promise.</em>
                </h2>
              </div>
              <p className="text-sm max-w-xs" style={{ color:`${C.ivory}48`, fontFamily:sans, lineHeight:1.7 }}>
                Precision formulas for the pets you love<br className="hidden md:block" />with everything you have.
              </p>
            </div>
          </Reveal>
        </div>

        {PRODUCTS.map((p, i) => {
          const isEven = i % 2 === 0;
          return (
            <motion.div
              key={p.id}
              initial={{ opacity:0 }}
              whileInView={{ opacity:1 }}
              viewport={{ once:true, margin:"-80px" }}
              transition={{ duration:0.6 }}
              className="group relative overflow-hidden cursor-pointer"
              style={{ borderTop:`1px solid ${C.gold}15` }}
              onClick={() => router.push(`/products/${p.id}`)}
            >
              <div className={`flex flex-col ${isEven ? "lg:flex-row" : "lg:flex-row-reverse"} items-stretch`} style={{ minHeight:400 }}>
                <div className="relative overflow-hidden w-full lg:w-[52%]" style={{ minHeight:300 }}>
                  <motion.img
                    src={p.image} alt={p.name}
                    className="w-full h-full object-cover absolute inset-0"
                    style={{ minHeight:300 }}
                    whileHover={{ scale:1.04 }}
                    transition={{ duration:0.65, ease:[0.25,0.1,0.25,1] }}
                  />
                  <div className="absolute inset-0" style={{
                    background:isEven
                      ? `linear-gradient(to right,transparent 55%,${C.dark}f2 100%)`
                      : `linear-gradient(to left,transparent 55%,${C.dark}f2 100%)`,
                  }} />
                  <div className="absolute inset-0" style={{ background:`linear-gradient(to top,${C.dark}75 0%,transparent 40%)` }} />
                  <div className={`absolute top-1/2 -translate-y-1/2 ${isEven?"right-4":"left-4"} leading-none select-none pointer-events-none`}
                    style={{ fontFamily:serif, fontSize:"clamp(80px,12vw,150px)", fontWeight:800, color:`${C.gold}10` }}>
                    0{i+1}
                  </div>
                  <span className="absolute top-5 left-5 px-3 py-1.5 rounded-full text-[10px] font-bold tracking-wide z-10"
                    style={{ background:p.badgeColor, color:C.ivory }}>
                    {p.badge}
                  </span>
                </div>

                <div className={`relative z-10 w-full lg:w-[48%] flex flex-col justify-center px-8 md:px-14 lg:px-16 py-10 lg:py-14`}
                  style={{ background:C.dark }}>
                  <motion.p
                    initial={{ opacity:0, x:isEven?20:-20 }}
                    whileInView={{ opacity:1, x:0 }}
                    viewport={{ once:true }}
                    transition={{ duration:0.5, delay:0.1 }}
                    className="font-bold mb-3 leading-none"
                    style={{ fontFamily:serif, fontSize:50, color:`${C.gold}22` }}
                  >
                    0{i+1}
                  </motion.p>

                  <motion.div
                    initial={{ opacity:0, y:16 }} whileInView={{ opacity:1, y:0 }}
                    viewport={{ once:true }} transition={{ duration:0.55, delay:0.15 }}
                  >
                    <h3 className="font-bold mb-1" style={{ fontFamily:serif, color:C.ivory, fontSize:"clamp(26px,3.2vw,42px)", lineHeight:1.1, letterSpacing:"-0.02em" }}>
                      {p.name}
                    </h3>
                    <p className="text-sm font-bold mb-1" style={{ color:p.accentColor==="#7B1428"?C.gold:p.accentColor }}>
                      {p.subtitle}
                    </p>
                    <p className="text-xs italic mb-5" style={{ color:`${C.ivory}45`, fontFamily:serif }}>{p.tagline}</p>
                  </motion.div>

                  <motion.p
                    initial={{ opacity:0 }} whileInView={{ opacity:1 }}
                    viewport={{ once:true }} transition={{ duration:0.5, delay:0.25 }}
                    className="text-sm leading-relaxed mb-7 max-w-sm"
                    style={{ color:`${C.ivory}58`, fontFamily:sans }}
                  >
                    {p.description.slice(0,120)}…
                  </motion.p>

                  <motion.div
                    initial={{ opacity:0 }} whileInView={{ opacity:1 }}
                    viewport={{ once:true }} transition={{ duration:0.5, delay:0.3 }}
                    className="flex flex-wrap gap-2 mb-8"
                  >
                    {p.benefits.slice(0,3).map(b => (
                      <span key={b.title} className="text-[11px] font-bold px-3 py-1.5 rounded-full"
                        style={{ background:`${C.gold}10`, color:C.gold, border:`1px solid ${C.gold}25` }}>
                        {b.icon} {b.title}
                      </span>
                    ))}
                  </motion.div>

                  <motion.div
                    initial={{ opacity:0, y:10 }} whileInView={{ opacity:1, y:0 }}
                    viewport={{ once:true }} transition={{ duration:0.45, delay:0.35 }}
                    className="flex items-center gap-5"
                  >
                    <span className="font-bold" style={{ fontFamily:serif, color:C.ivory, fontSize:30, letterSpacing:"-0.02em" }}>
                      ₹{p.price.toLocaleString("en-IN")}
                    </span>
                    <span className="flex items-center gap-1.5 text-sm font-bold transition-all group-hover:gap-3"
                      style={{ color:C.gold, fontFamily:sans }}>
                      Discover <ArrowRight size={14} />
                    </span>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          );
        })}

        <div className="h-px" style={{ background:`${C.gold}15` }} />
      </section>

      {/* ══════════════════ PULL QUOTE ══════════════════ */}
      <section className="py-20 md:py-28 relative overflow-hidden" style={{ background:C.ivoryDark }}>
        <div className="absolute inset-0 pointer-events-none"
          style={{ background:`radial-gradient(ellipse at 50% 80%,${C.gold}09 0%,transparent 65%)` }} />
        <Reveal>
          <div className="max-w-3xl mx-auto px-6 text-center">
            <div className="w-8 h-px mx-auto mb-10" style={{ background:C.gold }} />
            <p style={{ fontFamily:serif, color:C.maroon, fontSize:"clamp(22px,3.5vw,38px)", fontStyle:"italic", lineHeight:1.45, fontWeight:600 }}>
              &ldquo;The morning he ran to the door again — I stood in the kitchen and cried.
              I hadn&apos;t seen him move like that in two years.&rdquo;
            </p>
            <div className="mt-8 flex flex-col items-center gap-1">
              <p className="text-sm font-bold" style={{ color:C.gold, fontFamily:sans }}>Arjun K. · Pet Parent, Bengaluru</p>
              <p className="text-xs" style={{ color:C.muted, fontFamily:sans }}>Bruno, Golden Retriever · After 3 weeks on Tonico Miracolo</p>
            </div>
            <div className="w-8 h-px mx-auto mt-10" style={{ background:C.gold }} />
          </div>
        </Reveal>
      </section>

      {/* ══════════════════ THE SCIENCE ══════════════════ */}
      <section className="relative overflow-hidden" style={{ background:C.dark }}>
        <div className="max-w-7xl mx-auto px-6 py-24 md:py-32">
          <div className="grid lg:grid-cols-2 gap-16 items-center">

            <Reveal direction="left">
              <div className="relative">
                <div className="absolute -top-5 -left-5 w-full h-full rounded-3xl"
                  style={{ border:`1px solid ${C.gold}25` }} />
                <div className="relative rounded-3xl overflow-hidden shadow-2xl"
                  style={{ border:`1px solid ${C.gold}45`, aspectRatio:"4/5" }}>
                  <img src={IMG.catElegant} alt="Elegant cat" className="w-full h-full object-cover" />
                  <div className="absolute inset-0"
                    style={{ background:`linear-gradient(to top,${C.dark}cc 0%,transparent 50%)` }} />
                </div>
                <motion.div
                  initial={{ opacity:0, y:16 }} whileInView={{ opacity:1, y:0 }}
                  viewport={{ once:true }} transition={{ delay:0.4 }}
                  className="absolute -bottom-6 -right-6 px-5 py-4 rounded-2xl shadow-2xl"
                  style={{ background:C.maroon, border:`1px solid ${C.gold}45` }}
                >
                  <p className="text-xs font-bold tracking-widest" style={{ color:C.gold }}>SOXHLET EXTRACTED</p>
                  <p className="text-xs mt-0.5" style={{ color:`${C.ivory}65` }}>10× more bioavailable</p>
                </motion.div>
              </div>
            </Reveal>

            <Reveal direction="right">
              <p className="text-[10px] font-bold tracking-[0.44em] uppercase mb-4" style={{ color:C.gold }}>The Science</p>
              <h2 className="font-bold leading-tight mb-6" style={{ fontFamily:serif, color:C.ivory, fontSize:"clamp(30px,4vw,50px)", letterSpacing:"-0.02em" }}>
                5,000 Years of Wisdom.<br />
                <em style={{ color:C.gold, fontStyle:"italic" }}>The Precision of Modern Science.</em>
              </h2>
              <p className="text-base leading-relaxed mb-3" style={{ color:`${C.ivory}65`, fontFamily:sans }}>
                When you love a dog long enough, you start looking everywhere for answers.
              </p>
              <p className="text-base leading-relaxed mb-10" style={{ color:`${C.ivory}50`, fontFamily:sans }}>
                We crossed an ocean and five thousand years of tradition to find the right ones —
                then built a formula that no single tradition could produce alone.
              </p>

              <div className="space-y-6 mb-10">
                {SCIENCE_POINTS.map(({n,title,body}, i) => (
                  <motion.div
                    key={n}
                    initial={{ opacity:0, x:20 }} whileInView={{ opacity:1, x:0 }}
                    viewport={{ once:true }} transition={{ delay:i*0.12, duration:0.5 }}
                    className="flex gap-5 items-start"
                  >
                    <span className="text-xs font-bold w-8 shrink-0 pt-0.5" style={{ fontFamily:sans, color:C.gold }}>{n}</span>
                    <div style={{ borderLeft:`1px solid ${C.gold}28`, paddingLeft:16 }}>
                      <p className="font-bold text-sm mb-1" style={{ color:C.ivory, fontFamily:serif }}>{title}</p>
                      <p className="text-xs leading-relaxed" style={{ color:`${C.ivory}52`, fontFamily:sans }}>{body}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="flex gap-3">
                <a href="#" target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 px-5 py-3 rounded-xl font-bold text-sm"
                  style={{ background:"#FF9900", color:"#131921", fontFamily:sans }}>
                  Buy on Amazon <ExternalLink size={13} />
                </a>
                <a href="#" target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 px-5 py-3 rounded-xl font-bold text-sm"
                  style={{ background:"#2874F0", color:"#fff", fontFamily:sans }}>
                  Buy on Flipkart <ExternalLink size={13} />
                </a>
              </div>
            </Reveal>

          </div>
        </div>
      </section>

      {/* ══════════════════ TESTIMONIALS ══════════════════ */}
      <section className="py-24 md:py-32" style={{ background:C.ivoryDark }}>
        <div className="max-w-7xl mx-auto px-6">
          <Reveal>
            <div className="text-center mb-5">
              <p className="text-[10px] font-bold tracking-[0.44em] uppercase mb-4" style={{ color:C.gold }}>Real Stories</p>
              <h2 className="font-bold" style={{ fontFamily:serif, color:C.maroon, fontSize:"clamp(30px,4.5vw,52px)", letterSpacing:"-0.02em" }}>
                When you see it<br />
                <em style={{ fontStyle:"italic", color:C.muted }}>in their eyes.</em>
              </h2>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-center text-sm max-w-md mx-auto mb-16" style={{ color:C.muted, fontFamily:sans }}>
              The first morning they sprint to the door again. The afternoon they jump on the couch.
              These are the moments we exist for.
            </p>
          </Reveal>

          <div className="grid md:grid-cols-3 gap-6">
            {REVIEWS.map(({name,role,stars,text,pet,img}, i) => (
              <motion.div
                key={name}
                initial={{ opacity:0, y:30 }} whileInView={{ opacity:1, y:0 }}
                viewport={{ once:true, margin:"-40px" }}
                transition={{ duration:0.65, delay:i*0.14 }}
                whileHover={{ y:-6, transition:{duration:0.22} }}
                className="bg-white rounded-3xl overflow-hidden"
                style={{ border:`1px solid ${C.gold}25`, boxShadow:"0 4px 28px rgba(0,0,0,0.07)" }}
              >
                <div className="overflow-hidden" style={{ aspectRatio:"16/9" }}>
                  <img src={img} alt={pet} className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" />
                </div>
                <div className="p-6">
                  <div className="flex gap-1 mb-4">
                    {[...Array(stars)].map((_,j) => <Star key={j} size={12} fill={C.gold} style={{ color:C.gold }} />)}
                  </div>
                  <p className="text-sm leading-relaxed mb-5 italic" style={{ fontFamily:serif, color:C.dark }}>
                    &ldquo;{text}&rdquo;
                  </p>
                  <div className="flex items-center gap-3 pt-4" style={{ borderTop:`1px solid ${C.gold}18` }}>
                    <div className="w-9 h-9 rounded-full shrink-0 flex items-center justify-center font-bold text-sm"
                      style={{ background:C.maroon, color:C.ivory, fontFamily:serif }}>
                      {name[0]}
                    </div>
                    <div>
                      <p className="font-bold text-sm" style={{ color:C.dark, fontFamily:sans }}>{name}</p>
                      <p className="text-xs" style={{ color:C.muted }}>{role}</p>
                      <p className="text-[11px] font-bold mt-0.5" style={{ color:C.gold }}>{pet}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════ FULL-BLEED CTA ══════════════════ */}
      <section className="relative overflow-hidden" style={{ minHeight:540 }}>
        <div className="absolute inset-0">
          <img src={IMG.golden} alt="Golden retriever at golden hour" className="w-full h-full object-cover" />
          <div className="absolute inset-0"
            style={{ background:`linear-gradient(135deg,${C.deepBurg}f4 0%,${C.burgundy}cc 50%,${C.deepBurg}e4 100%)` }} />
        </div>

        <Reveal>
          <div className="relative z-10 max-w-3xl mx-auto px-6 py-24 md:py-32 text-center">
            <p className="text-[10px] font-bold tracking-[0.44em] uppercase mb-5" style={{ color:C.gold }}>Our Promise</p>
            <h2 className="font-bold leading-tight mb-6" style={{ fontFamily:serif, color:C.ivory, fontSize:"clamp(32px,5vw,58px)", letterSpacing:"-0.025em" }}>
              Watch them<br />
              <em style={{ color:C.gold, fontStyle:"italic" }}>become themselves again.</em>
            </h2>
            <p className="text-base mb-4 max-w-lg mx-auto leading-relaxed" style={{ color:`${C.ivory}68`, fontFamily:sans }}>
              The morning they climb the stairs again. The afternoon they sprint across the park.
            </p>
            <p className="text-sm mb-10 max-w-md mx-auto" style={{ color:`${C.ivory}50`, fontFamily:sans }}>
              If you don&apos;t see the difference in 30 days, we refund every rupee. No forms, no questions.
              That&apos;s how confident we are.
            </p>
            <div className="flex flex-wrap justify-center gap-4 mb-10">
              <a href="#" target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2.5 px-7 py-4 rounded-xl font-bold text-sm transition-all"
                style={{ background:"#FF9900", color:"#131921", fontFamily:sans }}
                onMouseEnter={e=>(e.currentTarget.style.background="#e68900")}
                onMouseLeave={e=>(e.currentTarget.style.background="#FF9900")}>
                🛒 Buy on Amazon <ExternalLink size={14} />
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2.5 px-7 py-4 rounded-xl font-bold text-sm transition-all"
                style={{ background:"#2874F0", color:"#fff", fontFamily:sans }}
                onMouseEnter={e=>(e.currentTarget.style.background="#1a5fd4")}
                onMouseLeave={e=>(e.currentTarget.style.background="#2874F0")}>
                🛒 Buy on Flipkart <ExternalLink size={14} />
              </a>
              <button onClick={() => router.push("/products/tonico-miracolo")}
                className="flex items-center gap-2 px-7 py-4 rounded-xl font-bold text-sm transition-all"
                style={{ border:`1.5px solid ${C.ivory}38`, color:C.ivory, fontFamily:sans }}
                onMouseEnter={e=>(e.currentTarget.style.borderColor=C.gold)}
                onMouseLeave={e=>(e.currentTarget.style.borderColor=`${C.ivory}38`)}>
                Explore Products <ArrowRight size={14} />
              </button>
            </div>

            <div className="flex flex-wrap justify-center gap-3">
              {["🌿 Ayurvedic","🇮🇹 Italian Quality","⚗️ Soxhlet Extracted","🐾 Vet Approved","💊 GMP Certified"].map(t=>(
                <span key={t} className="text-[10px] font-bold tracking-wide px-3 py-1.5 rounded-full"
                  style={{ background:`${C.gold}16`, color:C.gold, border:`1px solid ${C.gold}28` }}>
                  {t}
                </span>
              ))}
            </div>
          </div>
        </Reveal>
      </section>

      {/* ══════════════════ NEWSLETTER ══════════════════ */}
      <section className="py-16" style={{ background:C.deepBurg }}>
        <Reveal>
          <div className="max-w-lg mx-auto px-6 text-center">
            <p className="font-bold text-2xl mb-2" style={{ fontFamily:serif, color:C.ivory }}>
              For pet parents who refuse to settle.
            </p>
            <p className="text-sm mb-7" style={{ color:`${C.ivory}50`, fontFamily:sans }}>
              Vet-backed insights, Ayurvedic wisdom, and early access to new formulas.
              Two emails a month. No noise.
            </p>
            <div className="flex gap-2">
              <input type="email" placeholder="Your email address"
                className="flex-1 px-4 py-3.5 rounded-xl text-sm outline-none transition-all"
                style={{ background:`${C.ivory}0c`, border:`1px solid ${C.ivory}1a`, color:C.ivory, fontFamily:sans }}
                onFocus={e=>(e.currentTarget.style.borderColor=C.gold)}
                onBlur={e=>(e.currentTarget.style.borderColor=`${C.ivory}1a`)} />
              <button className="gold-btn px-6 py-3.5 rounded-xl text-sm whitespace-nowrap">Subscribe</button>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
