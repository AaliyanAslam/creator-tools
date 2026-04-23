"use client";

import { ShoppingCart, CheckCircle2, ChevronRight } from "lucide-react";
import { useRef } from "react";
import { useRouter } from "next/navigation";
import { useProducts } from "@/lib/hooks";

export default function OurProducts() {
  const cardRefs = useRef([]);
  const router = useRouter();
  const { products, loading, error } = useProducts();

  return (
    <section id="products" className="py-10 sm:py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-end justify-between mb-6 sm:mb-8">
          <div>
            <p className="text-[#ED1C24] text-[10px] sm:text-xs font-bold uppercase tracking-widest mb-1 sm:mb-1.5">
              Our Products
            </p>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-gray-900">
              Pricing &amp; Plans
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
        <div className="grid grid-cols-2 xl:grid-cols-3 gap-2 sm:gap-4">
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
                  ? p.features.split(",").map((f) => f.trim()).filter(Boolean)
                  : [];

              const savings =
                p.originalPrice && p.price
                  ? Math.round(
                      ((parseFloat(p.originalPrice) - parseFloat(p.price)) /
                        parseFloat(p.originalPrice)) * 100,
                    )
                  : 0;

              return (
                <div
                  key={p.id}
                  ref={(el) => (cardRefs.current[i] = el)}
                  onClick={() => router.push(`/product/${p.id}`)}
                  className={`group cursor-pointer relative flex flex-col bg-white rounded-lg border overflow-hidden transition-all duration-300 sm:hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-gray-200/60 ${
                    p.highlight
                      ? "border-[#ED1C24] shadow-lg shadow-red-100/80 ring-1 ring-[#ED1C24]/20"
                      : "border-gray-100 shadow-sm  hover:border-gray-200"
                  }`}
                >
                  {p.highlight && (
                    <div className="h-1 w-full bg-linear-to-r from-[#ED1C24] to-rose-400 shrink-0" />
                  )}

                  {/* ── IMAGE AREA ── */}
                  <div
                    className={`relative flex items-center justify-center border-b border-gray-100 ${
                      p.highlight
                        ? "bg-linear-to-br from-red-50/40 to-white"
                        : "bg-gray-50/60"
                    }`}
                  >
                    {/* Badge — top-left */}
                    <div className="absolute top-2 left-2 z-10">
                      <span
                        className={`text-[9px] sm:text-[10px] font-bold px-1.5 sm:px-2.5 py-0.5 sm:py-1 rounded-full uppercase tracking-wide ${
                          p.badgeColor || "bg-red-50 text-red-600"
                        }`}
                      >
                        {p.badge}
                      </span>
                    </div>

                    {/* Tag — top-right — hidden on mobile */}
                    <div className="absolute top-2 right-2 z-10 hidden sm:block">
                      <span className="text-[10px] font-semibold text-gray-400 bg-white border border-gray-100 px-2 py-0.5 rounded-full shadow-sm">
                        {p.tag}
                      </span>
                    </div>

                    {/* Image */}
                    <div className="h-28 sm:h-42 w-full overflow-hidden">
                      <img
                        src={p.image}
                        alt={p.title}
                        className="w-full h-full object-cover transition-transform duration-300 sm:group-hover:scale-105"
                        onError={(e) => {
                          e.target.src =
                            "https://via.placeholder.com/400x300?text=Product+Image";
                        }}
                      />
                    </div>
                  </div>

                  {/* ── CARD BODY ── */}
                  <div className="flex flex-col flex-1 p-2.5 sm:p-5">
                    {/* Title + Subtitle */}
                    <div className="mt-2 mb-1.5 sm:mb-3">
                      <h3 className="text-xs sm:text-base font-black text-gray-900 leading-snug line-clamp-2">
                        {p.title}
                      </h3>
                      <p className="text-[10px] sm:text-xs font-semibold text-gray-400 mt-0.5 line-clamp-1">
                        {p.subtitle}
                      </p>
                    </div>

                    {/* Description — desktop only */}
                    <p className="hidden sm:block text-xs sm:text-sm text-gray-500 leading-relaxed mb-3 sm:mb-4">
                      {p.description}
                    </p>

                    {/* Features list — desktop only */}
                    {features.length > 0 && (
                      <div className="hidden sm:block mb-3 sm:mb-4 flex-1">
                        <p className="text-[10px] font-bold uppercase tracking-widest text-gray-300 mb-2">
                          What&apos;s included
                        </p>
                        <ul className="grid grid-cols-2 gap-x-2 gap-y-1.5">
                          {features.map((f, idx) => (
                            <li
                              key={idx}
                              className="flex items-center gap-1.5 text-xs text-gray-600 font-medium"
                            >
                              <CheckCircle2
                                className={`w-3.5 h-3.5 shrink-0 ${
                                  p.highlight ? "text-[#ED1C24]" : "text-emerald-500"
                                }`}
                              />
                              <span className="truncate">{f}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Divider — desktop only */}
                    <div className="hidden sm:block border-t border-dashed border-gray-100 mb-3 sm:mb-4" />

                    {/* Price + CTA */}
                    <div className="flex items-center justify-between gap-2 mt-auto">
                      <div className="min-w-0">
                        <div className="flex items-baseline gap-1 flex-wrap">
                          <span className="text-sm sm:text-xl font-black text-gray-900">
                            Rs. {p.price}
                          </span>
                          {p.originalPrice && (
                            <span className="hidden sm:inline text-xs font-semibold text-gray-300 line-through">
                              Rs. {p.originalPrice}
                            </span>
                          )}
                        </div>

                        {/* Savings badge — desktop only */}
                        {savings > 0 && (
                          <span className="hidden sm:inline-flex items-center gap-1 text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                            <CheckCircle2 className="w-3 h-3 shrink-0" />
                            Save {savings}%
                          </span>
                        )}
                      </div>

                      <a
                        href="https://wa.me/923041333420"
                        target="_blank"
                        onClick={(e) => e.stopPropagation()}
                        className={`inline-flex items-center gap-1 sm:gap-1.5 text-[10px] sm:text-sm font-bold px-2.5 sm:px-4 py-1.5 sm:py-2.5 rounded-lg sm:rounded-xl transition-all duration-200 sm:hover:-translate-y-0.5 shrink-0 ${
                          p.highlight
                            ? "bg-[#ED1C24] text-white hover:bg-red-700 shadow-md shadow-red-100"
                            : "bg-gray-900 text-white hover:bg-gray-700 shadow-sm"
                        }`}
                      >
                        <ShoppingCart className="w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0" />
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