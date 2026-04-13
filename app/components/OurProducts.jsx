"use client";

import Image from "next/image";
import { ShoppingCart, CheckCircle2, ChevronRight } from "lucide-react";
import { useEffect, useRef } from "react";

const products = [
  {
    id: 1,
    badge: "Best Seller",
    badgeColor: "bg-red-50 text-red-600",
    title: "Canva Admin Panel",
    subtitle: "500 Canva Pro Accounts",
    description:
      "Full admin access to manage 500 Canva Pro accounts. Perfect for agencies and resellers.",
    price: "3,000",
    originalPrice: "8,000",
    features: [
      "500 Pro Accounts",
      "Admin Dashboard",
      "Team Management",
      "Instant Access",
    ],
    image: "/cards_images/canva.png",
    highlight: true,
    tag: "Exclusive",
    savings: "63",
  },
  {
    id: 2,
    badge: "1 Year",
    badgeColor: "bg-orange-50 text-orange-600",
    title: "YouTube Premium",
    subtitle: "Prepaid Annual Plan",
    description:
      "Ad-free YouTube, background play, YouTube Music included for a full year.",
    price: "500",
    originalPrice: "2,400",
    features: [
      "Ad-Free Browsing",
      "Background Play",
      "YouTube Music",
      "Offline Downloads",
    ],
    image: "/cards_images/youtube.png",
    highlight: false,
    tag: "Prepaid",
    savings: "79",
  },
  {
    id: 3,
    badge: "2 TB Storage",
    badgeColor: "bg-blue-50 text-blue-600",
    title: "Gemini Pro",
    subtitle: "1 Year + 2TB Storage",
    description:
      "Google's most advanced AI with 2TB private Drive storage for a full year.",
    price: "1,000",
    originalPrice: "4,800",
    features: [
      "Gemini Advanced AI",
      "2TB Google Drive",
      "Private Account",
      "1 Year Access",
    ],
    image: "/cards_images/gemini.png",
    highlight: false,
    tag: "AI Powered",
    savings: "79",
  },
  {
    id: 4,
    badge: "Private",
    badgeColor: "bg-purple-50 text-purple-600",
    title: "CapCut Pro",
    subtitle: "Private Account",
    description:
      "Full CapCut Pro with all premium effects, templates and watermark-free exports.",
    price: "1,000",
    originalPrice: "3,600",
    features: [
      "No Watermark",
      "Premium Templates",
      "4K Export",
      "Private Account",
    ],
    image: "/cards_images/black_capcut.png",
    highlight: false,
    tag: "Creator",
    savings: "72",
  },
  {
    id: 5,
    badge: "Full Suite",
    badgeColor: "bg-red-50 text-red-600",
    title: "Adobe Creative Cloud",
    subtitle: "Complete Subscription",
    description:
      "Photoshop, Illustrator, Premiere Pro and 20+ professional creative apps.",
    price: "1,500",
    originalPrice: "6,000",
    features: [
      "Photoshop & Illustrator",
      "Premiere Pro",
      "20+ Apps Included",
      "100GB Cloud",
    ],
    image: "/cards_images/adobe.png",
    highlight: false,
    tag: "Creative",
    savings: "75",
  },
  {
    id: 6,
    badge: "Family Plan",
    badgeColor: "bg-green-50 text-green-600",
    title: "Microsoft Office 365",
    subtitle: "Family Subscription",
    description:
      "Word, Excel, PowerPoint, Teams and 1TB OneDrive for up to 6 family members.",
    price: "2,500",
    originalPrice: "9,000",
    features: [
      "6 Users Included",
      "1TB OneDrive Each",
      "All Office Apps",
      "Teams Access",
    ],
    image: "/cards_images/micro.png",
    highlight: false,
    tag: "Family",
    savings: "72",
  },
];

export default function OurProducts() {
  const cardRefs = useRef([]);

  useEffect(() => {
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
            }
          );
        });
      });
    })();

    return () => ctx?.revert();
  }, []);

  return (
    <section id="products" className="py-10 sm:py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
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
            rel="noopener noreferrer"
            className="hidden sm:flex items-center gap-1 text-xs sm:text-sm font-semibold text-gray-400 hover:text-[#ED1C24] transition-colors whitespace-nowrap"
          >
            Order via WhatsApp <ChevronRight className="w-4 h-4 shrink-0" />
          </a>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-5">
          {products.map((p, i) => (
            <div
              key={p.id}
              ref={(el) => (cardRefs.current[i] = el)}
              className={`group relative flex flex-col bg-white rounded-2xl border overflow-hidden transition-all duration-300 hover:-translate-y-1 sm:hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-gray-200/60 ${
                p.highlight
                  ? "border-[#ED1C24] shadow-lg shadow-red-100/80 ring-1 ring-[#ED1C24]/20"
                  : "border-gray-100 shadow-sm hover:border-gray-200"
              }`}
            >
              {p.highlight && (
                <div className="h-1 w-full bg-linear-to-r from-[#ED1C24] to-rose-400 shrink-0" />
              )}

              {/* Image Area */}
              <div
                className={`relative flex items-center justify-center px-6 py-5 sm:py-6 border-b border-gray-100 ${
                  p.highlight
                    ? "bg-linear-to-br from-red-50/40 to-white"
                    : "bg-gray-50/60"
                }`}
              >
                <div className="absolute top-2.5 left-2.5 sm:top-3 sm:left-3">
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full uppercase tracking-wide ${p.badgeColor}`}
                  >
                    {p.badge}
                  </span>
                </div>
                <div className="absolute top-2.5 right-2.5 sm:top-3 sm:right-3">
                  <span className="text-[10px] font-semibold text-gray-400 bg-white border border-gray-100 px-2 py-0.5 rounded-full shadow-sm">
                    {p.tag}
                  </span>
                </div>

                <div className="h-24 sm:h-28 flex items-center justify-center w-full">
                  <img
                    src={p.image}
                    alt={p.title}
                    className="max-h-full max-w-[70%] sm:max-w-full object-contain drop-shadow-sm transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
              </div>

              {/* Card Body */}
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
                    {p.features.map((f) => (
                      <li
                        key={f}
                        className="flex items-center gap-1.5 text-[11px] sm:text-xs text-gray-600 font-medium"
                      >
                        <CheckCircle2
                          className={`w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0 ${
                            p.highlight ? "text-[#ED1C24]" : "text-emerald-500"
                          }`}
                        />
                        <span className="truncate">{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="border-t border-dashed border-gray-100 mb-3 sm:mb-4" />

                <div className="flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <div className="flex items-baseline gap-1.5 mb-1 flex-wrap">
                      <span className="text-lg sm:text-xl font-black text-gray-900">
                        Rs. {p.price}
                      </span>
                      <span className="text-[11px] sm:text-xs font-semibold text-gray-300 line-through">
                        Rs. {p.originalPrice}
                      </span>
                    </div>
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                      <CheckCircle2 className="w-3 h-3 shrink-0" />
                      Save {p.savings}%
                    </span>
                  </div>

                  <a
                    href="https://wa.me/923041333420"
                    target="_blank"
                    rel="noopener noreferrer"
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
          ))}
        </div>
      </div>
    </section>
  );
}