"use client";

import { useEffect, useState, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import { db } from "@/config/firebase";
import { doc, getDoc, collection, getDocs, limit, query } from "firebase/firestore";
import { ShoppingCart, CheckCircle2, ChevronLeft, ArrowRight, Zap, Tag } from "lucide-react";
import { urbanist } from "@/app/fonts";
import Navbar from "@/app/components/Navbar";

export default function ProductDetails() {
  const { id } = useParams();
  const router = useRouter();

  const [product, setProduct] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const productSectionRef = useRef(null);
  const stickyBarRef = useRef(null);
  const stickyVisible = useRef(false);

  // Fetch Product + Related Products
  useEffect(() => {
    const fetchProductData = async () => {
      if (!id) return;

      setLoading(true);
      setError(null);

      try {
        const docRef = doc(db, "products", id);
        const docSnap = await getDoc(docRef);

        if (!docSnap.exists()) {
          setError("Product not found");
          return;
        }

        const productData = { id: docSnap.id, ...docSnap.data() };

        if (productData.isActive === false) {
          setError("This product is no longer available.");
          return;
        }

        setProduct(productData);

        const q = query(collection(db, "products"), limit(10));
        const relatedSnap = await getDocs(q);

        const relatedData = relatedSnap.docs
          .map((d) => ({ id: d.id, ...d.data() }))
          .filter((p) => p.id !== id && p.isActive === true)
          .slice(0, 3);

        setRelated(relatedData);
      } catch (err) {
        console.error("Error fetching product:", err);
        setError("Failed to load product. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchProductData();
  }, [id]);

  // GSAP Animation for Related Cards
  useEffect(() => {
    if (related.length === 0) return;

    let ctx;
    const animateCards = async () => {
      const { gsap } = await import("gsap");
      ctx = gsap.context(() => {
        gsap.fromTo(
          ".related-card",
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.12,
            duration: 0.7,
            ease: "power3.out",
          }
        );
      });
    };

    animateCards();
    return () => ctx?.revert();
  }, [related]);

  // GSAP Sticky Bar on Scroll (mobile only)
  useEffect(() => {
    if (!product) return;

    let scrollTriggerInstance;

    const initStickyBar = async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);
      scrollTriggerInstance = ScrollTrigger;

      const bar = stickyBarRef.current;
      const section = productSectionRef.current;

      if (!bar || !section) return;

      gsap.set(bar, { y: 100, opacity: 0, display: "flex" });

      ScrollTrigger.create({
        trigger: section,
        start: "bottom 60%",
        onEnter: () => {
          if (stickyVisible.current) return;
          stickyVisible.current = true;
          gsap.to(bar, {
            y: 0,
            opacity: 1,
            duration: 0.5,
            ease: "power3.out",
          });
        },
        onLeaveBack: () => {
          if (!stickyVisible.current) return;
          stickyVisible.current = false;
          gsap.to(bar, {
            y: 100,
            opacity: 0,
            duration: 0.4,
            ease: "power3.in",
          });
        },
      });
    };

    initStickyBar();
    return () => {
      scrollTriggerInstance?.getAll().forEach((t) => t.kill());
    };
  }, [product]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="flex flex-col items-center gap-5">
          <div className="relative w-12 h-12">
            <div className="absolute inset-0 rounded-full border-[3px] border-gray-100" />
            <div className="absolute inset-0 rounded-full border-[3px] border-transparent border-t-[#ED1C24] animate-spin" />
          </div>
          <p className="text-xs text-gray-400 font-semibold tracking-widest uppercase">Loading product…</p>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white px-6">
        <div className="text-center max-w-sm">
          <div className="w-20 h-20 rounded-2xl bg-red-50 flex items-center justify-center mx-auto mb-6">
            <span className="text-4xl">😕</span>
          </div>
          <h2 className="text-2xl font-black text-gray-900 mb-2">Oops!</h2>
          <p className="text-gray-500 text-sm mb-8 leading-relaxed">{error || "Product not found."}</p>
          <button
            onClick={() => router.push("/#products")}
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-gray-900 text-white rounded-xl font-bold text-sm tracking-wide hover:bg-[#ED1C24] transition-all duration-300"
          >
            <ChevronLeft className="w-4 h-4" />
            Back to Products
          </button>
        </div>
      </div>
    );
  }

  const features = Array.isArray(product.features)
    ? product.features
    : typeof product.features === "string"
    ? product.features.split(",").map((f) => f.trim()).filter(Boolean)
    : [];

  const savings =
    product.originalPrice && product.price
      ? Math.round(
          ((parseFloat(product.originalPrice) - parseFloat(product.price)) /
            parseFloat(product.originalPrice)) *
            100
        )
      : 0;

  return (
    <>
      <Navbar />

      {/* ── Sticky Buy Bar (mobile only) ── */}
      <div
        ref={stickyBarRef}
        style={{ display: "none" }}
        className="lg:hidden fixed bottom-0 left-0 right-0 z-50 items-center justify-between gap-3 bg-white/95 backdrop-blur-xl border-t border-gray-100 px-5 py-3.5 shadow-[0_-8px_32px_rgba(0,0,0,0.08)]"
      >
        <div className="flex flex-col min-w-0">
          <span className="text-[10px] uppercase tracking-widest text-gray-400 font-bold mb-0.5">Price</span>
          <span className="text-xl font-black text-gray-900 leading-none truncate">
            Rs. {product.price}
          </span>
          {savings > 0 && (
            <span className="text-[10px] font-bold text-[#ED1C24] mt-0.5">Save {savings}%</span>
          )}
        </div>
        <a
          href={`https://wa.me/923193533420?text=I'm interested in: ${encodeURIComponent(product.title)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 flex items-center gap-2 bg-[#ED1C24] text-white font-black text-xs tracking-widest py-3.5 px-6 rounded-xl transition-all active:scale-95 shadow-[0_4px_16px_rgba(237,28,36,0.35)]"
        >
          <ShoppingCart className="w-4 h-4" />
          BUY NOW
        </a>
      </div>

      <main className={`bg-white min-h-screen ${urbanist.className}`}>

        {/* ── Breadcrumb Nav ── */}
        <nav className="sticky top-0 z-40 bg-white/90 backdrop-blur-xl border-b border-gray-100/80">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
            <button
              onClick={() => router.push("/")}
              className="group inline-flex items-center gap-2 text-xs font-semibold text-gray-400 hover:text-gray-900 transition-colors duration-200"
            >
              <span className="w-7 h-7 rounded-lg bg-gray-100 group-hover:bg-gray-900 flex items-center justify-center transition-colors duration-200">
                <ChevronLeft className="w-4 h-4 text-gray-500 group-hover:text-white transition-colors duration-200" />
              </span>
              <span className="tracking-widest uppercase">Back to Collection</span>
            </button>
          </div>
        </nav>

        {/* ── Hero Product Section ── */}
        <section
          ref={productSectionRef}
          className="max-w-7xl mx-auto px-4 sm:px-6 pt-8 pb-14 lg:pt-14 lg:pb-24"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-20 items-start">

            {/* ── Image Column ── */}
            <div className="lg:sticky lg:top-24">
              <div className="relative group">
                {/* Glow blob */}
                <div className="absolute inset-8 bg-[#ED1C24]/10 rounded-full blur-3xl opacity-60 group-hover:opacity-90 transition-opacity duration-700 pointer-events-none" />

                {/* Badge */}
                {product.highlight && (
                  <span className="absolute top-4 left-4 z-10 bg-gray-900 text-white text-[10px] font-black px-3 py-1.5 rounded-full tracking-widest shadow-lg">
                    ✦ FEATURED
                  </span>
                )}

                {/* Image container */}
                <div className="relative aspect-square bg-linear-to-br from-gray-50 to-gray-100/60 rounded-3xl p-8 sm:p-14 flex items-center justify-center border border-gray-200/60 overflow-hidden shadow-[0_8px_40px_rgba(0,0,0,0.06)]">
                  <img
                    src={product.image || "https://via.placeholder.com/600x600?text=Product+Image"}
                    alt={product.title}
                    className="max-h-full max-w-full object-contain drop-shadow-2xl transition-transform duration-700 group-hover:scale-105"
                    onError={(e) => {
                      e.currentTarget.src = "https://via.placeholder.com/600x600?text=Product+Image";
                    }}
                  />
                </div>
              </div>
            </div>

            {/* ── Info Column ── */}
            <div className="flex flex-col gap-7">

              {/* Badge + Title + Description */}
              <div>
                <div className="inline-flex items-center gap-2 mb-4 px-3 py-1.5 bg-red-50 rounded-full border border-red-100">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#ED1C24] animate-pulse" />
                  <span className="text-[#ED1C24] text-[10px] font-black uppercase tracking-widest">
                    {product.badge || "Premium Plan"}
                  </span>
                </div>

                <h1 className="text-3xl sm:text-4xl xl:text-5xl font-black text-gray-900 tracking-tight leading-[1.1] mb-4">
                  {product.title}
                </h1>

                <p className="text-sm sm:text-base text-gray-500 leading-relaxed max-w-xl">
                  {product.description}
                </p>
              </div>

              {/* ── Features Grid ── */}
              {features.length > 0 && (
                <div>
                  <p className="uppercase text-[10px] font-black tracking-widest text-gray-400 mb-4 flex items-center gap-2">
                    <Zap className="w-3 h-3 text-[#ED1C24]" />
                    What's Included
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {features.map((feature, i) => (
                      <div
                        key={i}
                        className="group/feat flex items-start gap-3 bg-gray-50 hover:bg-white border border-gray-100 hover:border-emerald-200 hover:shadow-[0_4px_16px_rgba(16,185,129,0.08)] rounded-2xl px-4 py-3.5 transition-all duration-250"
                      >
                        <div className="mt-0.5 w-6 h-6 rounded-full bg-linear-to-br from-emerald-400 to-emerald-600 flex items-center justify-center shrink-0 shadow-[0_2px_8px_rgba(16,185,129,0.3)]">
                          <CheckCircle2 className="w-3.5 h-3.5 text-white" />
                        </div>
                        <span className="text-[13px] font-semibold text-gray-700 leading-snug">
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* ── Price + CTA Card ── */}
              <div className="bg-linear-to-br from-gray-900 to-gray-800 rounded-3xl p-6 sm:p-8 shadow-[0_24px_64px_rgba(0,0,0,0.18)] border border-white/5">

                {/* Price row */}
                <div className="flex flex-wrap items-end gap-3 mb-6">
                  <span className="text-4xl sm:text-5xl font-black text-white leading-none">
                    Rs. {product.price}
                  </span>
                  {product.originalPrice && (
                    <span className="text-lg text-gray-500 line-through mb-0.5">
                      Rs. {product.originalPrice}
                    </span>
                  )}
                  {savings > 0 && (
                    <span className="ml-auto inline-flex items-center gap-1.5 px-3 py-1 bg-red-500/20 border border-red-500/30 rounded-full text-xs font-black text-[#FF6B6B] tracking-wider">
                      <Tag className="w-3 h-3" />
                      {savings}% OFF
                    </span>
                  )}
                </div>

                {/* Trust badge row */}
                <div className="flex flex-wrap items-center gap-3 mb-6 pb-6 border-b border-white/10">
                  {["Instant Delivery", "24/7 Support", "Secure Order"].map((t) => (
                    <span
                      key={t}
                      className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-gray-400"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                      {t}
                    </span>
                  ))}
                </div>

                {/* CTA Button */}
                <a
                  href={`https://wa.me/923193533420?text=I'm interested in purchasing: ${encodeURIComponent(product.title)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/cta w-full flex items-center justify-center gap-3 bg-[#ED1C24] hover:bg-[#c9151b] text-white font-black text-sm tracking-widest py-4 sm:py-5 px-8 rounded-2xl transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_32px_rgba(237,28,36,0.45)] active:scale-[0.98]"
                >
                  <ShoppingCart className="w-4 h-4 transition-transform duration-300 group-hover/cta:-rotate-12" />
                  BUY ON WHATSAPP
                  <ArrowRight className="w-4 h-4 ml-auto opacity-70 transition-transform duration-300 group-hover/cta:translate-x-1" />
                </a>
              </div>

            </div>
          </div>
        </section>

        {/* ── Related Products ── */}
        {related.length > 0 && (
          <section className="border-t border-gray-100 bg-[#FAFAFA] py-14 sm:py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">

              {/* Section Header */}
              <div className="flex items-end justify-between mb-10 sm:mb-14">
                <div>
                  <div className="inline-flex items-center gap-2 mb-3 px-3 py-1 bg-red-50 rounded-full border border-red-100">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#ED1C24]" />
                    <span className="text-[#ED1C24] text-[10px] font-black uppercase tracking-widest">
                      You may also like
                    </span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
                    Recommended Products
                  </h2>
                </div>

                <button
                  onClick={() => router.push("/#products")}
                  className="hidden sm:inline-flex items-center gap-2 text-xs font-black text-gray-400 hover:text-gray-900 tracking-widest uppercase transition-colors duration-200 group"
                >
                  View All
                  <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" />
                </button>
              </div>

              {/* Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-7">
                {related.map((p) => (
                  <div
                    key={p.id}
                    onClick={() => router.push(`/product/${p.id}`)}
                    className="related-card group cursor-pointer bg-white rounded-3xl border border-gray-100 overflow-hidden hover:border-gray-200 hover:-translate-y-2 hover:shadow-[0_20px_56px_rgba(0,0,0,0.09)] transition-all duration-350 shadow-[0_4px_16px_rgba(0,0,0,0.04)]"
                  >
                    {/* Card Image */}
                    <div className="relative h-48 sm:h-52 bg-linear-to-br from-gray-50 to-gray-100 flex items-center justify-center overflow-hidden">
                      {/* blur orb */}
                      <div className="absolute inset-6 bg-[#ED1C24]/8 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                      <img
                        src={p.image}
                        alt={p.title}
                        className="h-32 sm:h-36 object-contain transition-transform duration-500 group-hover:scale-110 drop-shadow-lg relative z-10"
                        onError={(e) => {
                          e.currentTarget.src = "https://via.placeholder.com/400x300?text=Product";
                        }}
                      />
                    </div>

                    {/* Card Body */}
                    <div className="p-5 sm:p-6">
                      {/* Badge pill */}
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-gray-100 text-gray-500 text-[10px] font-bold rounded-full uppercase tracking-widest mb-3">
                        {p.badge || "Premium Plan"}
                      </span>

                      <h3 className="font-black text-base sm:text-lg text-gray-900 leading-tight mb-1 group-hover:text-[#ED1C24] transition-colors duration-200">
                        {p.title}
                      </h3>

                      <p className="text-xs text-gray-400 font-medium mb-4 line-clamp-1">
                        {p.subtitle || p.description || "Premium streaming plan"}
                      </p>

                      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                        <span className="text-lg font-black text-[#ED1C24]">Rs. {p.price}</span>
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-gray-400 group-hover:text-gray-700 transition-colors duration-200">
                          View
                          <ArrowRight className="w-3 h-3 transition-transform duration-200 group-hover:translate-x-1" />
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Mobile view all */}
              <div className="sm:hidden mt-8 text-center">
                <button
                  onClick={() => router.push("/#products")}
                  className="inline-flex items-center gap-2 text-xs font-black text-gray-500 hover:text-gray-900 tracking-widest uppercase border border-gray-200 hover:border-gray-900 rounded-xl px-6 py-3 transition-all duration-200"
                >
                  View All Products <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>
          </section>
        )}
      </main>
    </>
  );
}