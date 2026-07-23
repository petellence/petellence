export type Product = {
  id:          string;
  name:        string;
  subtitle:    string;
  price:       number;
  size:        string;
  image:       string;
  images:      string[];
  badge:       string;
  badgeColor:  string;
  accentColor: string;
  tagline:     string;
  description: string;
  benefits:    { icon: string; title: string; desc: string }[];
  ingredients: string[];
  species:     string;
  howToUse:    string;
};

export const PRODUCTS: Product[] = [
  {
    id:          "tonico-miracolo",
    name:        "Tonico Miracolo",
    subtitle:    "Joint Mobility & Vitality",
    price:       1195,
    size:        "30 ml",
    image:       "/image-3.png",
    images:      ["/image-3.png", "/image-4.png"],
    badge:       "Bestseller",
    badgeColor:  "#C9A025",
    accentColor: "#7B1428",
    tagline:     "Italian Lipped Mussel Extract · Infused Indian Herbs",
    description: "A luxurious joint mobility supplement engineered at the intersection of Italian coastal science and 5,000 years of Ayurvedic wisdom. Tonico Miracolo delivers maximum-potency Green-Lipped Mussel glycosaminoglycans alongside 12 Ayurvedic herbs — for joint comfort, daily vitality, healthy skin, and a lustrous coat.",
    benefits: [
      { icon: "Zap",      title: "Joint Mobility",  desc: "Restores flexibility and comfort in ageing joints" },
      { icon: "Heart",    title: "Daily Vitality",  desc: "Sustained energy and overall wellness all day" },
      { icon: "Leaf",     title: "12 Indian Herbs", desc: "Classical Ayurvedic anti-inflammatory complex" },
      { icon: "Sparkles", title: "Coat & Skin",     desc: "Lustrous coat visible within 4–6 weeks" },
    ],
    ingredients: ["Green-Lipped Mussel Extract (Perna canaliculus)", "Ashwagandha (KSM-66)", "Boswellia Serrata Extract", "Shatavari Extract", "Turmeric Curcumin (95%)", "Ginger Root Extract", "Brahmi Extract", "Triphala", "Amla Extract", "Guduchi", "Punarnava", "Purified Water"],
    species:    "Dogs & Cats — all breeds, adult and senior",
    howToUse:   "Add 0.5–1 ml per 10 kg body weight directly to food or water, once daily. Results typically visible within 2–4 weeks of consistent use. Store in a cool, dry place away from direct sunlight. Refrigerate after opening.",
  },
  {
    id:          "derma-rituale",
    name:        "Derma Rituale",
    subtitle:    "Skin & Coat Elixir",
    price:       1395,
    size:        "30 ml",
    image:       "https://images.unsplash.com/photo-1701992678972-c82c28069b88?w=600&h=800&fit=crop&auto=format",
    images:      ["https://images.unsplash.com/photo-1701992678972-c82c28069b88?w=600&h=800&fit=crop&auto=format", "https://images.unsplash.com/photo-1701992679016-b2a738d179c4?w=600&h=800&fit=crop&auto=format"],
    badge:       "New",
    badgeColor:  "#2B4A1A",
    accentColor: "#2B4A1A",
    tagline:     "Cold-Pressed Botanical Oils · Neem · Bhringraj",
    description: "A botanical elixir for deep skin nourishment and coat revival. Derma Rituale blends cold-pressed Italian seed oils with Ayurvedic classics Neem, Bhringraj, and Brahmi — crafted to resolve dry skin, reduce excess shedding, and restore a mirror-bright, lustrous coat.",
    benefits: [
      { icon: "Sparkles", title: "Mirror-Bright Coat", desc: "Visible sheen improvement in 2–3 weeks" },
      { icon: "Droplets", title: "Deep Hydration",     desc: "Resolves dry, flaky, and itchy skin" },
      { icon: "Sprout",   title: "Neem & Bhringraj",  desc: "Classical Ayurvedic botanical duo" },
      { icon: "Shield",   title: "Barrier Repair",   desc: "Strengthens the skin's natural microbiome" },
    ],
    ingredients: ["Cold-Pressed Argan Oil", "Neem Leaf Extract", "Bhringraj Extract", "Brahmi Extract", "Sweet Almond Oil", "Vitamin E (d-alpha tocopherol)", "Evening Primrose Oil", "Rosehip Seed Oil", "Purified Water"],
    species:    "Dogs & Cats — all coat types",
    howToUse:   "Add 0.5 ml per 10 kg body weight to daily food. For external use on coat, dilute 3–4 drops in 100 ml warm water and mist lightly onto coat. Do not apply to open wounds or broken skin.",
  },
  {
    id:          "immuno-forte",
    name:        "Immuno Forte",
    subtitle:    "Immunity & Gut Shield",
    price:       995,
    size:        "30 ml",
    image:       "https://images.unsplash.com/photo-1633171036157-78d53387fdc0?w=600&h=800&fit=crop&auto=format",
    images:      ["https://images.unsplash.com/photo-1633171036157-78d53387fdc0?w=600&h=800&fit=crop&auto=format"],
    badge:       "Popular",
    badgeColor:  "#1A3A5C",
    accentColor: "#1A3A5C",
    tagline:     "Probiotic Complex · Tulsi · Giloy · Amla",
    description: "A comprehensive immunity and gut-health formula harnessing the power of Tulsi, Giloy, and Amla — India's most revered immune-boosting trio — alongside a 10-strain probiotic complex for a healthy gut microbiome and resilient year-round immune defence.",
    benefits: [
      { icon: "Shield",      title: "Immune Defence",   desc: "Tulsi, Giloy & Amla triple-action complex" },
      { icon: "Microscope",  title: "Gut Microbiome",   desc: "10-strain clinically-studied probiotic blend" },
      { icon: "Sun",         title: "Natural Vitamin C", desc: "Amla — the world's richest natural source" },
      { icon: "Zap",         title: "Fast Absorption",  desc: "Soxhlet liquid extraction for bioavailability" },
    ],
    ingredients: ["Tulsi (Holy Basil) Extract", "Giloy (Tinospora cordifolia) Extract", "Amla (Indian Gooseberry) Extract", "Probiotic Complex — 10 strains (5B CFU)", "Zinc Picolinate", "Quercetin", "Elderberry Extract", "Purified Water"],
    species:    "Dogs & Cats — all breeds",
    howToUse:   "Add 0.5 ml per 10 kg body weight to daily food. For best results, administer in the morning with the first meal. Do not mix with hot food. Refrigerate after opening.",
  },
  {
    id:          "calmo-sera",
    name:        "Calmo Sera",
    subtitle:    "Calming & Sleep Formula",
    price:       1095,
    size:        "30 ml",
    image:       "https://images.unsplash.com/photo-1673081815475-8e6a9a3817d4?w=600&h=800&fit=crop&auto=format",
    images:      ["https://images.unsplash.com/photo-1673081815475-8e6a9a3817d4?w=600&h=800&fit=crop&auto=format"],
    badge:       "New",
    badgeColor:  "#3D1A5C",
    accentColor: "#3D1A5C",
    tagline:     "Ashwagandha · Valerian · Brahmi · L-Theanine",
    description: "A sophisticated calming formula for pets prone to anxiety, thunderstorm phobia, travel stress, or separation anxiety. Calmo Sera combines adaptogenic Ashwagandha with Valerian root, Brahmi, and L-Theanine for a non-sedative, entirely natural calming effect.",
    benefits: [
      { icon: "Wind",      title: "Calms Anxiety",    desc: "Non-sedative, natural calming without drowsiness" },
      { icon: "BedDouble", title: "Better Sleep",      desc: "Valerian & Brahmi deep-sleep complex" },
      { icon: "Lightbulb", title: "Cognitive Support", desc: "Brahmi enhances mental clarity and focus" },
      { icon: "Plane",     title: "Travel & Stress",   desc: "Safe for daily and situational use" },
    ],
    ingredients: ["Ashwagandha Root (KSM-66)", "Valerian Root Extract", "Brahmi (Bacopa monnieri) Extract", "L-Theanine", "Chamomile Extract", "Passionflower Extract", "Lemon Balm", "Purified Water"],
    species:    "Dogs & Cats — all breeds",
    howToUse:   "Daily anxiety support: 0.5 ml per 10 kg body weight with morning meal. Situational use (travel, fireworks, grooming): give 1–2 hours before the stressful event. Safe for long-term daily use.",
  },
];
