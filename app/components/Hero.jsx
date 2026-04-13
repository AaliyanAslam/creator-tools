"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { 
  Sparkles, 
  ArrowRight, 
  MessageCircle, 
  Shield, 
  Zap, 
  Star, 
  Users, 
  CheckCircle2 
} from "lucide-react";

export default function Hero() {
  const statsRef = useRef(null);

  useEffect(() => {
    let ctx;
    (async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {
        if (statsRef.current) {
          gsap.fromTo(
            [...statsRef.current.children],
            { y: 20, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.5,
              stagger: 0.08,
              ease: "power2.out",
              scrollTrigger: { 
                trigger: statsRef.current, 
                start: "top 88%" 
              },
            }
          );
        }
      });
    })();

    return () => ctx?.revert();
  }, []);

  const stats = [
    { value: "500+", label: "Pro Accounts", icon: Users },
    { value: "6+", label: "Premium Tools", icon: Star },
    { value: "24/7", label: "Support", icon: Shield },
    { value: "99%", label: "Satisfaction", icon: CheckCircle2 },
  ];

  const trust = [
    {
      icon: Shield,
      title: "100% Verified",
      desc: "Tested before delivery",
      color: "text-blue-500",
      bg: "bg-blue-50",
    },
    {
      icon: Zap,
      title: "Instant Delivery",
      desc: "Access within minutes",
      color: "text-yellow-500",
      bg: "bg-yellow-50",
    },
    {
      icon: MessageCircle,
      title: "WhatsApp Support",
      desc: "Chat anytime for help",
      color: "text-green-500",
      bg: "bg-green-50",
    },
    {
      icon: Star,
      title: "Best Prices",
      desc: "Lowest rates in Pakistan",
      color: "text-red-500",
      bg: "bg-red-50",
    },
  ];

  return (
    <>
      {/* ── Main Hero Section ───────────────────────────────────────────── */}
      <section className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 lg:py-16">
          <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-14">
            
            {/* Text Content */}
            <div className="flex-1 w-full max-w-xl mx-auto lg:mx-0 text-center lg:text-left">
              <div className="h-anim inline-flex items-center gap-2 bg-red-50 text-[#ED1C24] text-[10px] sm:text-xs font-bold px-3 py-1.5 rounded-full mb-4 uppercase tracking-widest">
                <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0" />
                Pakistan's #1 Digital Tools Store
              </div>

              <h1 className="h-anim text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 leading-[1.1] tracking-tight mb-3 sm:mb-4">
                Premium Tools,{" "}
                <span className="text-[#ED1C24]">Unbeatable</span> Prices
              </h1>

              <p className="h-anim text-sm sm:text-base text-gray-500 font-medium leading-relaxed mb-6 max-w-md mx-auto lg:mx-0">
                Get verified Canva Pro, Adobe CC, YouTube Premium & more — 
                delivered instantly at Pakistan's lowest prices.
              </p>

              <div className="h-anim flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
                <a
                  href="#products"
                  className="inline-flex items-center justify-center gap-2 bg-[#ED1C24] hover:bg-red-700 text-white font-bold px-6 py-3 rounded-xl text-sm transition-all duration-200 hover:shadow-lg hover:shadow-red-100 hover:-translate-y-0.5"
                >
                  Shop Now <ArrowRight className="w-4 h-4" />
                </a>

                <a
                  href="https://wa.me/923041333420"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-gray-50 hover:bg-gray-100 text-gray-700 font-bold px-6 py-3 rounded-xl text-sm border border-gray-200 transition-all duration-200 hover:-translate-y-0.5"
                >
                  <MessageCircle className="w-4 h-4 text-[#25D366]" />
                  Get Help
                </a>
              </div>
            </div>

            {/* Stats Grid */}
            <div
              ref={statsRef}
              className="grid grid-cols-2 gap-3 w-full max-w-xs sm:max-w-sm lg:max-w-xs mx-auto lg:mx-0 shrink-0"
            >
              {stats.map(({ value, label, icon: Icon }) => (
                <div
                  key={label}
                  className="group flex flex-col gap-2.5 p-4 sm:p-5 bg-gray-50 hover:bg-white border border-gray-100 hover:border-gray-200 rounded-2xl transition-all duration-300 hover:shadow-md hover:shadow-gray-100"
                >
                  <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-red-50 flex items-center justify-center">
                    <Icon className="w-4 h-4 text-[#ED1C24]" />
                  </div>
                  <div>
                    <p className="text-xl sm:text-2xl font-black text-gray-900 leading-none">
                      {value}
                    </p>
                    <p className="text-[10px] sm:text-xs text-gray-400 font-semibold mt-1">
                      {label}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Trust Strip (Hero ke neeche) ─────────────────────────────────── */}
      <section className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3">
            {trust.map(({ icon: Icon, title, desc, color, bg }, index) => (
              <div
                key={index}
                className="flex items-center gap-2.5 sm:gap-3 p-2.5 sm:p-3 rounded-xl bg-gray-50 border border-gray-100"
              >
                <div
                  className={`w-8 h-8 rounded-lg ${bg} flex items-center justify-center shrink-0`}
                >
                  <Icon className={`w-4 h-4 ${color}`} />
                </div>
                <div className="min-w-0">
                  <p className="text-[11px] sm:text-xs font-bold text-gray-800 truncate">
                    {title}
                  </p>
                  <p className="text-[10px] text-gray-400 font-medium leading-tight mt-0.5 hidden sm:block truncate">
                    {desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}