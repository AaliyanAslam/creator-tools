"use client";

import { useEffect, useState, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import { db } from "@/config/firebase";
import { doc, getDoc, collection, getDocs, limit, query } from "firebase/firestore";
import { ShoppingCart, CheckCircle2, ChevronLeft, ArrowRight } from "lucide-react";
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
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-4 border-gray-200 border-t-[#ED1C24] rounded-full animate-spin" />
          <p className="text-sm text-gray-500 font-medium">Loading product...</p>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white px-6">
        <div className="text-center max-w-md">
          <div className="text-6xl mb-6">😕</div>
          <h2 className="text-2xl font-black text-gray-900 mb-3">Oops!</h2>
          <p className="text-gray-600 mb-8">{error || "Product not found."}</p>
          <button
            onClick={() => router.push("/#products")}
            className="px-8 py-3 bg-black text-white rounded font-bold hover:bg-gray-800 transition-all"
          >
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

  const savings = product.originalPrice && product.price
      ? Math.round(((parseFloat(product.originalPrice) - parseFloat(product.price)) / parseFloat(product.originalPrice)) * 100)
      : 0;

  return (
    <>
      <Navbar />

      {/* Sticky Buy Bar (mobile only) */}
      <div
        ref={stickyBarRef}
        style={{ display: "none" }}
        className="lg:hidden fixed bottom-0 left-0 right-0 z-50 items-center justify-between gap-3 bg-white border-t border-gray-200 px-4 py-3 shadow-[0_-4px_24px_rgba(0,0,0,0.10)]"
      >
        <div className="flex flex-col">
          <span className="text-[11px] uppercase tracking-widest text-gray-400 font-bold leading-none mb-0.5">Price</span>
          <span className="text-xl font-black text-gray-900 leading-tight">Rs. {product.price}</span>
          {savings > 0 && <span className="text-[11px] font-bold text-[#ED1C24]">Save {savings}%</span>}
        </div>
        <a
          href={`https://wa.me/923041333420?text=I'm interested in: ${encodeURIComponent(product.title)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 bg-[#ED1C24] text-white font-black text-sm tracking-widest py-3.5 px-6 rounded transition-all active:scale-95 shadow-lg shadow-red-200"
        >
          <ShoppingCart className="w-4 h-4" />
          BUY NOW
        </a>
      </div>

      <main className={`bg-white min-h-screen ${urbanist.className}`}>
        <nav className="sticky top-0 z-40 bg-white/90 backdrop-blur-lg border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-5">
            <button
              onClick={() => router.push("/")}
              className="group flex items-center gap-2 text-xs sm:text-sm font-semibold text-gray-500 hover:text-gray-900 transition-colors"
            >
              <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover:-translate-x-1" />
              BACK TO COLLECTION
            </button>
          </div>
        </nav>

        <section ref={productSectionRef} className="max-w-7xl mx-auto px-4 sm:px-6 pt-6 pb-12 lg:pt-16 lg:pb-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
            {/* Image Section */}
            <div className="lg:col-span-5">
              <div className="relative aspect-square bg-[#F9F9F9] rounded p-6 md:p-12 flex items-center justify-center border border-gray-100 overflow-hidden">
                {product.highlight && (
                  <span className="absolute top-4 left-4 bg-black text-white text-[10px] font-black px-3 py-1 rounded-full tracking-widest z-10">
                    FEATURED
                  </span>
                )}
                <img
                  src={product.image || "https://via.placeholder.com/600x600?text=Product+Image"}
                  alt={product.title}
                  className="max-h-full max-w-full object-contain drop-shadow-xl transition-transform duration-700 hover:scale-105"
                  onError={(e) => { e.currentTarget.src = "https://via.placeholder.com/600x600?text=Product+Image"; }}
                />
              </div>
            </div>

            {/* Product Info */}
            <div className="lg:col-span-7">
              <div className="mb-6 sm:mb-10">
                <div className="flex items-center gap-3 mb-3">
                  <span className="h-px w-8 bg-[#ED1C24]" />
                  <span className="text-[#ED1C24] text-[10px] font-black uppercase tracking-widest">{product.badge || "Premium Plan"}</span>
                </div>
                <h1 className="text-3xl md:text-5xl xl:text-6xl font-black text-gray-900 tracking-tighter mb-4">{product.title}</h1>
                <p className="text-sm sm:text-lg text-gray-600 leading-relaxed max-w-2xl">{product.description}</p>
              </div>

              {features.length > 0 && (
                <div className="mb-8">
                  <p className="uppercase text-[10px] font-bold tracking-widest text-gray-400 mb-6">WHAT'S INCLUDED</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {features.map((feature, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <div className="mt-0.5 w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        </div>
                        <span className="text-[14px] font-medium text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="bg-white border border-gray-100 rounded p-6 sm:p-10 shadow-sm">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
                  <div>
                    <div className="flex items-baseline gap-3">
                      <span className="text-3xl sm:text-5xl font-black text-gray-900">Rs. {product.price}</span>
                      {product.originalPrice && <span className="text-xl text-gray-400 line-through">Rs. {product.originalPrice}</span>}
                    </div>
                    {savings > 0 && (
                      <div className="mt-2 inline-flex items-center px-3 py-1 bg-red-50 rounded-full">
                        <span className="text-xs font-bold text-[#ED1C24]">Save {savings}%</span>
                      </div>
                    )}
                  </div>
                  <a
                    href={`https://wa.me/923041333420?text=I'm interested in purchasing: ${encodeURIComponent(product.title)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-3 bg-[#ED1C24] hover:bg-black text-white font-black text-sm sm:text-base tracking-widest py-4 sm:py-5 px-8 sm:px-12 rounded transition-all active:scale-95"
                  >
                    <ShoppingCart className="w-5 h-5" />
                    BUY ON WHATSAPP
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Related Products */}
        {related.length > 0 && (
          <section className="bg-gray-50 py-12 sm:py-20 border-t border-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
              <div className="flex items-end justify-between mb-8 sm:mb-12">
                <div>
                  <p className="text-[#ED1C24] text-[10px] font-black uppercase tracking-widest mb-2">You may also like</p>
                  <h2 className="text-2xl sm:text-3xl font-black text-gray-900">Recommended Products</h2>
                </div>
                <button onClick={() => router.push("/#products")} className="hidden sm:flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-black">
                  VIEW ALL <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {related.map((p) => (
                  <div
                    key={p.id}
                    onClick={() => router.push(`/product/${p.id}`)}
                    className="related-card group cursor-pointer bg-white border border-gray-100 rounded-xl p-6 hover:-translate-y-2 transition-all duration-300 shadow-sm"
                  >
                    <div className="h-44 bg-[#F9F9F9] rounded-2xl flex items-center justify-center mb-6 overflow-hidden">
                      <img
                        src={p.image}
                        alt={p.title}
                        className="h-32 object-contain group-hover:scale-110 transition-transform duration-500"
                        onError={(e) => { e.currentTarget.src = "https://via.placeholder.com/400x300?text=Product"; }}
                      />
                    </div>
                    <div className="flex justify-between items-start gap-4">
                      <div>
                        <h3 className="font-black text-lg text-gray-900 leading-tight mb-1">{p.title}</h3>
                        <p className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">{p.badge || "Plan"}</p>
                      </div>
                      <p className="font-black text-[#ED1C24] text-lg">Rs. {p.price}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
    </>
  );
}