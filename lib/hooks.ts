"use client";

import { useState, useEffect } from "react";
import { fetchProducts, fetchProduct, fetchTestimonials, fetchCategories, type ApiProduct, type ApiTestimonial, type ApiCategory } from "./api";

export function useProducts() {
  const [products, setProducts] = useState<ApiProduct[]>([]);
  const [loading,  setLoading]  = useState(true);
  const [error,    setError]    = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    fetchProducts()
      .then(data => { if (!cancelled) { setProducts(data); setError(null); } })
      .catch(e   => { if (!cancelled) setError((e as Error).message); })
      .finally(()=> { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, []);

  return { products, loading, error };
}

export function useCategories() {
  const [categories, setCategories] = useState<ApiCategory[]>([]);
  const [loading,    setLoading]    = useState(true);

  useEffect(() => {
    let cancelled = false;
    fetchCategories()
      .then(data => { if (!cancelled) setCategories(data); })
      .catch(()  => { if (!cancelled) setCategories([]); })
      .finally(()=> { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, []);

  return { categories, loading };
}

export function useProduct(id: string) {
  const [product, setProduct] = useState<ApiProduct | null>(null);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    let cancelled = false;
    setLoading(true);
    fetchProduct(id)
      .then(data => { if (!cancelled) { setProduct(data); setError(null); } })
      .catch(e   => { if (!cancelled) setError((e as Error).message); })
      .finally(()=> { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, [id]);

  return { product, loading, error };
}

export function useTestimonials() {
  const [testimonials, setTestimonials] = useState<ApiTestimonial[]>([]);
  const [loading,      setLoading]      = useState(true);
  const [error,        setError]        = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    fetchTestimonials()
      .then(data => { if (!cancelled) { setTestimonials(data); setError(null); } })
      .catch(e   => { if (!cancelled) setError((e as Error).message); })
      .finally(()=> { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, []);

  return { testimonials, loading, error };
}
