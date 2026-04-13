"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import Link from "next/link";
import {
  Sparkles,
  ArrowRight,
  MessageCircle,
  Shield,
  Zap,
  Star,
  Users,
  CheckCircle2,
} from "lucide-react";

export default function HeroCentered() {
  const statsRef = useRef(null);
  const imageRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    let ctx;
    (async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {
        const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

        tl.from(".h-anim-top", {
          y: -40,
          opacity: 0,
          duration: 1,
          stagger: 0.15,
        });

        if (imageRef.current) {
          tl.fromTo(
            imageRef.current,
            { opacity: 0, scale: 0.8, y: 50 },
            {
              opacity: 1,
              scale: 1,
              y: 0,
              duration: 1.2,
              ease: "expo.out",
            },
            "-=0.6"
          );
        }

        tl.from(
          ".h-anim-bottom",
          {
            y: 30,
            opacity: 0,
            duration: 0.8,
            stagger: 0.1,
          },
          "-=0.4"
        );

        if (statsRef.current) {
          gsap.from([...statsRef.current.children], {
            y: 20,
            opacity: 0,
            duration: 0.5,
            stagger: 0.08,
            ease: "power2.out",
            scrollTrigger: {
              trigger: statsRef.current,
              start: "top 95%",
            },
          });
        }
      }, containerRef);
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
    { icon: Shield, title: "100% Verified", desc: "Tested daily", color: "text-blue-500", bg: "bg-blue-50" },
    { icon: Zap, title: "Instant Delivery", desc: "Within minutes", color: "text-yellow-500", bg: "bg-yellow-50" },
    { icon: MessageCircle, title: "WhatsApp Help", desc: "Active support", color: "text-green-500", bg: "bg-green-50" },
    { icon: Star, title: "Best Prices", desc: "Lowest in PK", color: "text-red-500", bg: "bg-red-50" },
  ];

  return (
    <div ref={containerRef} className="relative bg-white overflow-hidden">

      
      {/* ── NEW: Center Radial Gradient Theme ────────────────────────── */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-250 h-200 opacity-[0.12] pointer-events-none -z-10"
        style={{
          background: "radial-gradient(circle, #ED1C24 0%, #fee2e2 40%, transparent 70%)",
          filter: "blur(80px)"
        }}
      />

      {/* Subtle Grid overlay */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('/grid.svg')] bg-center -z-20" />

      {/* ── Main Hero Section ───────────────────────────────────────────── */}
      <section className="relative pt-8 pb-20 lg:pt-8 lg:pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">
          
          {/* TOP CONTENT */}
          <div className="max-w-3xl z-10 mb-6">
            <div className="h-anim-top inline-flex items-center gap-2 bg-red-50 border border-red-100 text-[#ED1C24] text-xs font-bold px-4 py-2 rounded-full mb-4 uppercase tracking-wider">
              <Sparkles className="w-4 h-4" />
              Pakistan's #1 Digital Store
            </div>

            <h1 className="h-anim-top text-[2.3rem] sm:text-6xl lg:text-6xl font-black text-gray-900 leading-none tracking-tighter mb-4">
              Get Premium Tools at <br />
              <span className="text-[#ED1C24]">Unbeatable</span> Prices
            </h1>

            <p className="h-anim-top text-[1rem] sm:text-lg text-gray-600 font-medium max-w-2xl mx-auto">
              Verified Canva Pro, Adobe CC, YouTube Premium & more — delivered
              instantly to your inbox in minutes. Stop paying full price.
            </p>
          </div>

          {/* CENTER IMAGE */}
          <div
            ref={imageRef}
            className="relative w-full max-w-5xl mx-auto mb-8 lg:mb-6 z-0"
          >
            <div className="relative group">
              <div className="absolute -inset-10 bg-linear-to-r from-red-100 via-orange-50 to-red-100 rounded-[3rem] blur-3xl opacity-50 group-hover:opacity-70 transition duration-1000" />

              <div className="relative rounded-xl sm:rounded overflow-hidden shadow-2xl border-4 border-white bg-white">
                <Image
                  src="/hbg1.png"
                  alt="Premium Digital Tools Showcase"
                  width={1200}
                  height={800}
                  priority
                  className="w-full h-auto object-cover transform transition-transform duration-700 group-hover:scale-[1.02]"
                />
              </div>
            </div>
          </div>

          {/* BOTTOM CONTENT */}
          <div className="w-full max-w-4xl z-10 flex flex-col items-center gap-12">
            <div className="h-anim-bottom flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="#products"
                className="inline-flex items-center justify-center gap-2.5 bg-[#ED1C24] hover:bg-red-700 text-white font-bold px-10 py-4 rounded-sm text-lg transition-all duration-300 hover:shadow-xl hover:shadow-red-200 active:scale-95"
              >
                Browse Our Store <ArrowRight className="w-5 h-5" />
              </Link>

              <a
                href="https://wa.me/923041333420"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex  items-center justify-center gap-2.5 bg-white hover:bg-gray-50 text-gray-900 font-bold px-10 py-4 rounded-sm text-lg border-2 border-[#b3e8c6] transition-all duration-300 active:scale-95"
              >
                <MessageCircle className="w-5 h-5 text-[#25D366] fill-[#25D366]/10" />
                WhatsApp Support
              </a>
            </div>

         <div
  ref={statsRef}
  className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full"
>
  {stats.map(({ value, label, icon: Icon }) => (
    <div
      key={label}
      className="group relative flex flex-col items-center lg:items-start gap-3 px-5 py-5 rounded bg-white border border-gray-100 hover:border-gray-200 hover:shadow-sm transition-all duration-200"
    >
      {/* Icon */}
      <div className="w-9 h-9 rounded-xl bg-red-50 flex items-center justify-center shrink-0">
        <Icon className="w-4 h-4 text-[#ED1C24]" />
      </div>

      {/* Value + Label */}
      <div className="text-center lg:text-left">
        <p className="text-2xl font-black text-gray-900 leading-none tracking-tight">
          {value}
        </p>
        <p className="text-[11px] text-gray-400 font-semibold uppercase tracking-widest mt-1.5 leading-tight">
          {label}
        </p>
      </div>

      {/* Subtle left accent bar on hover */}
      <span className="absolute left-0 top-4 bottom-4 w-0.75 rounded-full bg-[#ED1C24] opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
    </div>
  ))}
</div>
          </div>
        </div>
      </section>

      {/* TRUST STRIP */}
      <section className="hidden lg:block">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {trust.map(({ icon: Icon, title, desc, color, bg }, index) => (
              <div
                key={index}
                className="flex items-center gap-4 group cursor-default bg-white p-5 rounded border border-gray-100  transition-all hover:shadow-md"
              >
                <div className={`w-14 h-14 rounded-xl ${bg} flex items-center justify-center shrink-0 transition-transform group-hover:scale-110`}>
                  <Icon className={`w-7 h-7 ${color}`} />
                </div>
                <div className="min-w-0">
                  <p className="text-base font-bold text-gray-900 leading-tight truncate">
                    {title}
                  </p>
                  <p className="text-sm text-gray-500 font-medium mt-1 truncate">
                    {desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}