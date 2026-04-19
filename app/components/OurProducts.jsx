"use client";

import { ShoppingCart, CheckCircle2, ChevronRight } from "lucide-react";
import { useEffect, useRef, useState, useCallback } from "react";
import { db } from "@/config/firebase";
import { collection, getDocs } from "firebase/firestore";
import { useRouter } from "next/navigation";

const CACHE_DURATION = 2 * 60 * 1000; // 2 minutes cache (change as needed)

export default function OurProducts() {
  const cardRefs = useRef([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const lastFetchedRef = useRef(0);
  const router = useRouter();

  const fetchProducts = useCallback(async () => {
    const now = Date.now();

    // Use cache if data is fresh
    if (now - lastFetchedRef.current < CACHE_DURATION && products.length > 0) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const snapshot = await getDocs(collection(db, "products"));

      const data = snapshot.docs
        .map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
        .filter((p) => p.isActive === true); // Only active products

      setProducts(data);
      lastFetchedRef.current = now;
    } catch (error) {
      console.error("Failed to fetch products:", error);
    } finally {
      setLoading(false);
    }
  }, [products.length]);

  // Fetch on mount + when tab becomes visible again (reduces unnecessary fetches on navigation)
  useEffect(() => {
    fetchProducts();

    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        fetchProducts();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () =>
      document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, [fetchProducts]);

  // GSAP Animation
  useEffect(() => {
    if (products.length === 0 || loading) return;

    let ctx;
    (async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {
        cardRefs.current.forEach((el, i) => {
          if (!el) return;
          gsap.fromTo(
            el,
            { y: 40, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.5,
              ease: "power2.out",
              scrollTrigger: { trigger: el, start: "top 90%" },
              delay: (i % 3) * 0.08,
            },
          );
        });
      });
    })();

    return () => ctx?.revert();
  }, [products, loading]);

  return (
    <section id="products" className="py-10 sm:py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header - Unchanged */}
        <div className="flex items-end justify-between mb-6 sm:mb-8">
          <div>
            <p className="text-[#ED1C24] text-[10px] sm:text-xs font-bold uppercase tracking-widest mb-1 sm:mb-1.5">
              Our Products
            </p>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-gray-900">
              Pricing & Plans
            </h2>
          </div>
          <a
            href="https://wa.me/923041333420"
            target="_blank"
            className="hidden sm:flex items-center gap-1 text-xs sm:text-sm font-semibold text-gray-400 hover:text-[#ED1C24]"
          >
            Order via WhatsApp <ChevronRight className="w-4 h-4 shrink-0" />
          </a>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-5">
          {loading && products.length === 0 ? (
            <div className="col-span-full py-20 text-center">
              <div className="w-8 h-8 border-4 border-gray-200 border-t-[#ED1C24] rounded-full animate-spin mx-auto mb-4" />
              <p className="text-gray-400 text-sm">Loading products...</p>
            </div>
          ) : products.length === 0 ? (
            <div className="col-span-full py-16 text-center">
              <p className="text-gray-400 text-sm">
                No active products available at the moment.
              </p>
            </div>
          ) : (
            products.map((p, i) => {
              const features = Array.isArray(p.features)
                ? p.features
                : typeof p.features === "string"
                  ? p.features
                      .split(",")
                      .map((f) => f.trim())
                      .filter(Boolean)
                  : [];

              const savings =
                p.originalPrice && p.price
                  ? Math.round(
                      ((parseFloat(p.originalPrice) - parseFloat(p.price)) /
                        parseFloat(p.originalPrice)) *
                        100,
                    )
                  : 0;

              return (
                <div
                  key={p.id}
                  ref={(el) => (cardRefs.current[i] = el)}
                  onClick={() => router.push(`/product/${p.id}`)}
                  className={`group cursor-pointer relative flex flex-col bg-white rounded-2xl border overflow-hidden transition-all duration-300 hover:-translate-y-1 sm:hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-gray-200/60 ${
                    p.highlight
                      ? "border-[#ED1C24] shadow-lg shadow-red-100/80 ring-1 ring-[#ED1C24]/20"
                      : "border-gray-100 shadow-sm hover:border-gray-200"
                  }`}
                >
                  {p.highlight && (
                    <div className="h-1 w-full bg-linear-to-r from-[#ED1C24] to-rose-400 shrink-0" />
                  )}

                  {/* Image Area - unchanged */}
                  <div
                    className={`relative flex items-center justify-center px-6 py-5 sm:py-6 border-b border-gray-100 ${
                      p.highlight
                        ? "bg-linear-to-br from-red-50/40 to-white"
                        : "bg-gray-50/60"
                    }`}
                  >
                    <div className="absolute top-2.5 left-2.5 sm:top-3 sm:left-3">
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full uppercase tracking-wide ${
                          p.badgeColor || "bg-red-50 text-red-600"
                        }`}
                      >
                        {p.badge}
                      </span>
                    </div>

                    <div className="absolute top-2.5 right-2.5 sm:top-3 sm:right-3">
                      <span className="text-[10px] font-semibold text-gray-400 bg-white border border-gray-100 px-2 py-0.5 rounded-full shadow-sm">
                        {p.tag}
                      </span>
                    </div>

                    <div className="h-24 sm:h-28 w-full flex items-center justify-center overflow-hidden rounded-lg  group">
                      <img
                        src={p.image}
                        alt={p.title}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        onError={(e) => {
                          e.target.src =
                            "https://via.placeholder.com/400x300?text=Product+Image";
                        }}
                      />
                    </div>
                  </div>

                  {/* Body - unchanged */}
                  <div className="flex flex-col flex-1 p-4 sm:p-5">
                    <div className="mb-2.5 sm:mb-3">
                      <h3 className="text-sm sm:text-base font-black text-gray-900 leading-snug">
                        {p.title}
                      </h3>
                      <p className="text-[11px] sm:text-xs font-semibold text-gray-400 mt-0.5">
                        {p.subtitle}
                      </p>
                    </div>

                    <p className="text-xs sm:text-sm text-gray-500 leading-relaxed mb-3 sm:mb-4">
                      {p.description}
                    </p>

                    <div className="mb-3 sm:mb-4 flex-1">
                      <p className="text-[10px] font-bold uppercase tracking-widest text-gray-300 mb-2">
                        What's included
                      </p>
                      <ul className="grid grid-cols-2 gap-x-2 gap-y-1.5">
                        {features.map((f, idx) => (
                          <li
                            key={idx}
                            className="flex items-center gap-1.5 text-[11px] sm:text-xs text-gray-600 font-medium"
                          >
                            <CheckCircle2
                              className={`w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0 ${
                                p.highlight
                                  ? "text-[#ED1C24]"
                                  : "text-emerald-500"
                              }`}
                            />
                            <span className="truncate">{f}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="border-t border-dashed border-gray-100 mb-3 sm:mb-4" />

                    <div className="flex items-center justify-between lg:gap-3">
                      <div className="min-w-0">
                        <div className="flex items-baseline gap-1.5 mb-1 flex-wrap">
                          <span className="text-base sm:text-xl font-black text-gray-900">
                            Rs. {p.price}
                          </span>
                          {p.originalPrice && (
                            <span className="text-[11px] sm:text-xs font-semibold text-gray-300 line-through">
                              Rs. {p.originalPrice}
                            </span>
                          )}
                        </div>

                        {savings > 0 && (
                          <span className="inline-flex items-center gap-1 text-[0.4rem] lg:text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                            <CheckCircle2 className="w-3 h-3 shrink-0" />
                            Save {savings}%
                          </span>
                        )}
                      </div>

                      <a
                        href="https://wa.me/923041333420"
                        target="_blank"
                        className={`inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl transition-all duration-200 hover:-translate-y-0.5 shrink-0 ${
                          p.highlight
                            ? "bg-[#ED1C24] text-white hover:bg-red-700 shadow-md shadow-red-100"
                            : "bg-gray-900 text-white hover:bg-gray-700 shadow-sm"
                        }`}
                      >
                        <ShoppingCart className="w-3.5 h-3.5 shrink-0" />
                        Buy Now
                      </a>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </section>
  );
}
