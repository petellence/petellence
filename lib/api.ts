import { PRODUCTS } from "./data";

// Sanitize: strip surrounding whitespace and any trailing slash so a stray
// space or "/" in the env var can't produce URLs like "...com%20/api/...".
const BASE = (process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8080").trim().replace(/\/+$/, "");

export interface StoreLink {
  platform: string;
  url:      string;
  tagline:  string;
  price?:   number;
  active?:  boolean;
  stockStatus?: "in_stock" | "limited" | "out_of_stock";
}

export interface ApiBenefit {
  icon:        string;
  title:       string;
  description: string;
}

export interface ApiIngredient {
  name:    string;
  amount:  string;
  purpose: string;
}

export interface ApiProduct {
  _id:         string;
  id:          string;
  name:        string;
  subtitle:    string;
  tagline:     string;
  price:       number;
  mrp:         number;
  size:        string;
  image:       string;
  images:      string[];
  badge:       string;
  badgeColor:  string;
  category:    string;
  concerns:    string[];
  species:     string[];
  benefits:    ApiBenefit[];
  ingredients: ApiIngredient[];
  howToUse:    string[];
  storeLinks:  StoreLink[];
  faqs:        { question: string; answer: string }[];
  seo:         { title: string; description: string };
  description: string;
  inStock:     boolean;
  featured:    boolean;
  sortOrder:   number;
  status:      "draft" | "published" | "archived";
  createdAt:   string;
  updatedAt:   string;
}

export interface ApiTestimonial {
  _id:       string;
  name:      string;
  petName:   string;
  petType:   string;
  rating:    number;
  review:    string;
  avatar:    string;
  approved:  boolean;
  featured:  boolean;
  createdAt: string;
  updatedAt?: string;
}

async function apiFetch<T>(path: string): Promise<T> {
  const res = await fetch(`${BASE}${path}`, { next: { revalidate: 60 } });
  if (!res.ok) throw new Error(`API error ${res.status}: ${path}`);
  const json = await res.json() as { success: boolean; data: T };
  if (!json?.success || json.data === undefined || json.data === null) {
    throw new Error(`Malformed API response: ${path}`);
  }
  return json.data;
}

export async function fetchProducts(): Promise<ApiProduct[]> {
  try {
    const products = await apiFetch<ApiProduct[]>("/api/products");
    return Array.isArray(products) ? products : FALLBACK_PRODUCTS;
  } catch {
    return FALLBACK_PRODUCTS;
  }
}

export async function fetchProduct(id: string): Promise<ApiProduct> {
  try {
    return await apiFetch<ApiProduct>(`/api/products/${id}`);
  } catch {
    const product = FALLBACK_PRODUCTS.find(p => p.id === id);
    if (!product) throw new Error("Product not found");
    return product;
  }
}

export async function fetchTestimonials(): Promise<ApiTestimonial[]> {
  try {
    const testimonials = await apiFetch<ApiTestimonial[]>("/api/testimonials");
    return Array.isArray(testimonials) ? testimonials : FALLBACK_TESTIMONIALS;
  } catch {
    return FALLBACK_TESTIMONIALS;
  }
}

export async function subscribeNewsletter(email: string): Promise<{ message: string }> {
  const res = await fetch(`${BASE}/api/newsletter/subscribe`, {
    method:  "POST",
    headers: { "Content-Type": "application/json" },
    body:    JSON.stringify({ email, source: "website" }),
  });
  const json = await res.json() as { success: boolean; message: string };
  if (!res.ok) throw new Error(json.message ?? "Subscription failed");
  return { message: json.message };
}

export async function submitContact(payload: {
  name: string; email: string; subject?: string; message: string;
}): Promise<{ message: string }> {
  const res = await fetch(`${BASE}/api/contact`, {
    method:  "POST",
    headers: { "Content-Type": "application/json" },
    body:    JSON.stringify(payload),
  });
  const json = await res.json() as { success: boolean; message: string };
  if (!res.ok) throw new Error(json.message ?? "Message could not be sent");
  return { message: json.message };
}

export async function submitTestimonial(payload: {
  name: string; petName: string; petType: string; rating: number; review: string;
}): Promise<void> {
  const res = await fetch(`${BASE}/api/testimonials`, {
    method:  "POST",
    headers: { "Content-Type": "application/json" },
    body:    JSON.stringify(payload),
  });
  if (!res.ok) {
    const json = await res.json() as { message?: string };
    throw new Error(json.message ?? "Submission failed");
  }
}

const FALLBACK_STORE_LINKS: StoreLink[] = [
  {
    platform: "Amazon",
    url: "https://www.amazon.in/s?k=petellence+pet+supplements",
    tagline: "Prime eligible · Fulfilled by Amazon",
    active: true,
    stockStatus: "in_stock",
  },
  {
    platform: "Flipkart",
    url: "https://www.flipkart.com/search?q=petellence+pet+supplements",
    tagline: "Flipkart Assured · Fast delivery",
    active: true,
    stockStatus: "in_stock",
  },
  {
    platform: "Meesho",
    url: "https://www.meesho.com/search?q=petellence%20pet%20supplements",
    tagline: "Value deals · Marketplace fulfilment",
    active: true,
    stockStatus: "limited",
  },
];

const FALLBACK_PRODUCTS: ApiProduct[] = PRODUCTS.map((product, index) => ({
  _id: product.id,
  id: product.id,
  name: product.name,
  subtitle: product.subtitle,
  tagline: product.tagline,
  price: product.price,
  mrp: Math.round(product.price * 1.25),
  size: product.size,
  image: product.image,
  images: product.images.length ? product.images : [product.image],
  badge: product.badge,
  badgeColor: product.badgeColor,
  category: product.subtitle.split("·")[0]?.trim() || product.subtitle,
  concerns: product.benefits.map(benefit => benefit.title),
  species: product.species.includes("Cats") ? ["Dogs", "Cats"] : ["Dogs"],
  benefits: product.benefits.map(benefit => ({
    icon: benefit.icon,
    title: benefit.title,
    description: benefit.desc,
  })),
  ingredients: product.ingredients.map(name => ({
    name,
    amount: "Daily blend",
    purpose: "Wellness support",
  })),
  howToUse: product.howToUse.split(". ").filter(Boolean),
  storeLinks: FALLBACK_STORE_LINKS,
  faqs: [
    {
      question: `Where can I buy ${product.name}?`,
      answer: "Use the marketplace buttons on this page to buy from active Amazon, Flipkart, or Meesho listings.",
    },
    {
      question: "Should I consult a veterinarian first?",
      answer: "For diagnosed medical conditions, pregnancy, prescription diets, or ongoing medication, speak with your veterinarian before starting a supplement.",
    },
  ],
  seo: {
    title: `${product.name} | Pete'llence`,
    description: product.description.slice(0, 150),
  },
  description: product.description,
  inStock: true,
  featured: index === 0 || index === 2,
  sortOrder: index,
  status: "published",
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
}));

const FALLBACK_TESTIMONIALS: ApiTestimonial[] = [
  {
    _id: "fallback-priya",
    name: "Dr. Priya Mehta",
    petName: "Senior clinic patients",
    petType: "Dogs & Cats",
    rating: 5,
    review: "The product detail and ingredient clarity make it easy to recommend Pete'llence formulas for long-term wellness routines.",
    avatar: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=300&q=80",
    approved: true,
    featured: true,
    createdAt: new Date().toISOString(),
  },
  {
    _id: "fallback-arjun",
    name: "Arjun Kapoor",
    petName: "Bruno",
    petType: "Golden Retriever",
    rating: 5,
    review: "Bruno is more comfortable on walks, and the marketplace links made ordering simple for our family.",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300&q=80",
    approved: true,
    featured: true,
    createdAt: new Date().toISOString(),
  },
  {
    _id: "fallback-kavya",
    name: "Kavya Nair",
    petName: "Mishti",
    petType: "Persian Cat",
    rating: 5,
    review: "Her coat looks healthier and the routine is easy to follow. I like seeing dosage steps clearly listed.",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&q=80",
    approved: true,
    featured: false,
    createdAt: new Date().toISOString(),
  },
];
