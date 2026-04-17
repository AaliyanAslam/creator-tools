"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
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
import { db } from "@/config/firebase";
import { doc, onSnapshot } from "firebase/firestore";

export default function HeroCentered() {
  const statsRef = useRef(null);
  const imageRef = useRef(null);
  const containerRef = useRef(null);
  const intervalRef = useRef(null);

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  // Fetch & Manage Timer (Fixed - proper cleanup)
  useEffect(() => {
    const timerRef = doc(db, "settings", "countdown");

    const unsubscribe = onSnapshot(timerRef, (docSnap) => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }

      if (!docSnap.exists()) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      const data = docSnap.data();
      let endTime = data.endTime;

      if (endTime?.toMillis) endTime = endTime.toMillis();
      else if (typeof endTime === "string") endTime = Date.parse(endTime);

      if (!endTime || isNaN(endTime)) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      intervalRef.current = setInterval(() => {
        const now = Date.now();
        const distance = endTime - now;

        if (distance <= 0) {
          setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
          clearInterval(intervalRef.current);
          return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
        );
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        setTimeLeft({ days, hours, minutes, seconds });
      }, 1000);
    });

    return () => {
      unsubscribe();
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  // One-time animation per session
  useEffect(() => {
    const hasAnimated = sessionStorage.getItem("heroAnimated");
    if (hasAnimated) return;

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
            { opacity: 0, scale: 0.92, y: 60 },
            { opacity: 1, scale: 1, y: 0, duration: 1.4, ease: "expo.out" },
            "-=0.5",
          );
        }

        tl.from(
          ".h-anim-bottom",
          { y: 40, opacity: 0, duration: 0.9, stagger: 0.12 },
          "-=0.6",
        );

        if (statsRef.current) {
          gsap.from([...statsRef.current.children], {
            y: 25,
            opacity: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: "power2.out",
            scrollTrigger: { trigger: statsRef.current, start: "top 90%" },
          });
        }
      }, containerRef);

      sessionStorage.setItem("heroAnimated", "true");
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
      desc: "Tested daily",
      color: "text-blue-500",
      bg: "bg-blue-50",
    },
    {
      icon: Zap,
      title: "Instant Delivery",
      desc: "Within minutes",
      color: "text-yellow-500",
      bg: "bg-yellow-50",
    },
    {
      icon: MessageCircle,
      title: "WhatsApp Help",
      desc: "Active support",
      color: "text-green-500",
      bg: "bg-green-50",
    },
    {
      icon: Star,
      title: "Best Prices",
      desc: "Lowest in PK",
      color: "text-red-500",
      bg: "bg-red-50",
    },
  ];

  return (
    <div ref={containerRef} className="relative bg-white overflow-hidden">
      {/* Background Radial Gradient */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-200 h-150 pointer-events-none -z-10"
        style={{
          background:
            "radial-gradient(circle at center, #ED1C24 0%, #fee2e2 45%, transparent 75%)",
          filter: "blur(90px)",
          opacity: 0.11,
        }}
      />

      <div className="absolute inset-0 opacity-[0.025] pointer-events-none bg-[url('/grid.svg')] bg-center -z-20" />

      <section className="relative pt-8 pb-20 lg:pt-8 lg:pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">
          {/* Top Content */}
          <div className="max-w-3xl z-10 mb-6">
            {/* Timer Badge */}
            <div className="h-anim-top mb-4 flex justify-center">
              <div className="inline-flex items-center gap-3 bg-white border border-red-200 shadow-sm rounded-2xl px-2 lg:px-7 py-3.5 text-[0.7rem] md:text-[1rem] font-semibold text-gray-800">
                <span className="text-[#ED1C24] flex items-center gap-1">
                  <span>⏰</span> Limited Offer Ends In
                </span>
                <div className="flex gap-5 text-[1rem] md:text-[1rem] font-black tabular-nums text-[#ED1C24]">
                  <span>
                    {String(timeLeft.days).padStart(2, "0")}
                    <span className="text-[0.6rem] lg:text-[0.8rem] font-normal text-gray-500 ml-0.5">
                      D
                    </span>
                  </span>
                  <span>
                    {String(timeLeft.hours).padStart(2, "0")}
                    <span className="text-[0.6rem] lg:text-[0.8rem] font-normal text-gray-500 ml-0.5">
                      H
                    </span>
                  </span>
                  <span>
                    {String(timeLeft.minutes).padStart(2, "0")}
                    <span className="text-[0.6rem] lg:text-[0.8rem] font-normal text-gray-500 ml-0.5">
                      M
                    </span>
                  </span>
                  <span>
                    {String(timeLeft.seconds).padStart(2, "0")}
                    <span className="text-[0.6rem] lg:text-[0.8rem] font-normal text-gray-500 ml-0.5">
                      S
                    </span>
                  </span>
                </div>
              </div>
            </div>

            <h1 className="h-anim-top text-[2.3rem] sm:text-6xl lg:text-6xl font-black text-gray-900 leading-none tracking-tighter mb-4">
              Get Premium Tools at <br />
              <span className="text-[#ED1C24]">Unbeatable</span> Prices
            </h1>

            {/* Money Back Guarantee */}
            <div className="h-anim-top inline-flex items-center gap-3 text-black text-xl font-semibold px-7 py-3 rounded-2xl">
              100% Money Back Guarantee if the tool doesn’t work
            </div>
          </div>

          {/* Image */}
          <div
            ref={imageRef}
            className="relative w-full max-w-5xl mx-auto mb-8 lg:mb-6 z-0 will-change-transform"
          >
            <div className="relative group">
              <div className="absolute -inset-12 bg-linear-to-r from-red-100 via-orange-50 to-red-100 rounded-[3rem] blur-3xl opacity-40 group-hover:opacity-60 transition-opacity duration-1000" />
              <div className="relative rounded-xl sm:rounded-2xl overflow-hidden shadow-2xl  bg-white">
                <a
                  href="https://wa.me/923041333420"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Image
                    src="/hbg1.png"
                    alt="Premium Digital Tools Showcase"
                    width={1200}
                    height={800}
                    priority
                    className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                  />
                </a>
              </div>
            </div>
          </div>

          {/* Bottom Content */}
          <div className="w-full max-w-4xl z-10 flex flex-col items-center gap-12">
            <div className="h-anim-bottom flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="#products"
                className="inline-flex items-center justify-center gap-2.5 bg-[#ED1C24] hover:bg-red-700 text-white font-bold px-10 py-4 rounded-sm text-lg transition-all duration-300 hover:shadow-xl hover:shadow-red-200 active:scale-95"
              >
                Our Store <ArrowRight className="w-5 h-5" />
              </Link>

              <a
                href="https://wa.me/923041333420"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 bg-white hover:bg-gray-50 text-gray-900 font-bold px-10 py-4 rounded-sm text-lg border-2 border-[#b3e8c6] transition-all duration-300 active:scale-95"
              >
                <MessageCircle className="w-5 h-5 text-[#25D366]" />
                WhatsApp Support
              </a>
            </div>

            {/* ==================== IMPROVED STATS SECTION ==================== */}
            <div
              ref={statsRef}
              className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 w-full max-w-4xl"
            >
              {stats.map(({ value, label, icon: Icon }, index) => (
                <div
                  key={index}
                  className="group relative bg-white border border-gray-100 hover:border-red-200 hover:shadow-lg transition-all duration-300 rounded-2xl p-6 flex flex-col items-center text-center h-full"
                >
                  <div className="w-12 h-12 rounded-2xl bg-red-50 flex items-center justify-center mb-4 transition-transform group-hover:scale-110 group-hover:bg-red-100">
                    <Icon className="w-6 h-6 text-[#ED1C24]" />
                  </div>

                  <p className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tighter mb-1">
                    {value}
                  </p>
                  <p className="text-sm sm:text-base text-gray-500 font-medium">
                    {label}
                  </p>

                  {/* Subtle accent line */}
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-[#ED1C24] rounded-full scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
                </div>
              ))}
            </div>
            {/* ==================== END IMPROVED STATS ==================== */}
          </div>
        </div>
      </section>

      {/* Trust Strip */}
      <section className="hidden lg:block pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {trust.map(({ icon: Icon, title, desc, color, bg }, index) => (
              <div
                key={index}
                className="flex items-center gap-4 group cursor-default bg-white p-5 rounded border border-gray-100 hover:shadow-md transition-all"
              >
                <div
                  className={`w-14 h-14 rounded-xl ${bg} flex items-center justify-center shrink-0 transition-transform group-hover:scale-110`}
                >
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
