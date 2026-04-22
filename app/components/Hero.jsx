"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
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
  const intervalRef = useRef(null);

  // Initialize with null to detect "not yet loaded" vs "zero"
  const [timeLeft, setTimeLeft] = useState(null);

  // Fetch & Manage Timer
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

      const tick = () => {
        const now = Date.now();
        const distance = endTime - now;

        if (distance <= 0) {
          setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
          clearInterval(intervalRef.current);
          return;
        }

        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000),
        });
      };

      tick(); // set immediately to avoid 1s blank
      intervalRef.current = setInterval(tick, 1000);
    });

    return () => {
      unsubscribe();
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
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

  // Stable placeholder while timer is loading to prevent layout shift
  const display = timeLeft ?? { days: 0, hours: 0, minutes: 0, seconds: 0 };

  return (
    <div className="relative bg-white overflow-hidden">
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
            <div className="mb-4 flex justify-center">
              <div className="inline-flex items-center gap-3 bg-white border border-red-200 shadow-sm rounded-2xl px-2 lg:px-7 py-3.5 text-[0.7rem] md:text-[1rem] font-semibold text-gray-800">
                <span className="text-[#ED1C24] flex items-center gap-1">
                  <span>⏰</span> Limited Offer Ends In
                </span>
                <div className="flex gap-5 text-[1rem] md:text-[1rem] font-black tabular-nums text-[#ED1C24]">
                  <span>
                    {String(display.days).padStart(2, "0")}
                    <span className="text-[0.6rem] lg:text-[0.8rem] font-normal text-gray-500 ml-0.5">D</span>
                  </span>
                  <span>
                    {String(display.hours).padStart(2, "0")}
                    <span className="text-[0.6rem] lg:text-[0.8rem] font-normal text-gray-500 ml-0.5">H</span>
                  </span>
                  <span>
                    {String(display.minutes).padStart(2, "0")}
                    <span className="text-[0.6rem] lg:text-[0.8rem] font-normal text-gray-500 ml-0.5">M</span>
                  </span>
                  <span>
                    {String(display.seconds).padStart(2, "0")}
                    <span className="text-[0.6rem] lg:text-[0.8rem] font-normal text-gray-500 ml-0.5">S</span>
                  </span>
                </div>
              </div>
            </div>

            <h1 className="text-[2.3rem] sm:text-6xl lg:text-6xl font-black text-gray-900 leading-none tracking-tighter mb-4">
              Get Premium Tools at <br />
              <span className="text-[#ED1C24]">Unbeatable</span> Prices
            </h1>

            {/* Money Back Guarantee */}
            <div className="inline-flex items-center gap-3 text-black text-xl font-semibold px-7 py-3 rounded-2xl">
              100% Money Back Guarantee if the tool doesn&apos;t work
            </div>
          </div>

          {/* Image */}
          <div className="relative w-full max-w-5xl mx-auto mb-8 lg:mb-6 z-0">
            <div className="relative group">
              <div className="absolute -inset-12 bg-linear-to-r from-red-100 via-orange-50 to-red-100 rounded-[3rem] blur-3xl opacity-40 group-hover:opacity-60 transition-opacity duration-1000" />
              <div className="relative rounded-xl sm:rounded-2xl overflow-hidden shadow-2xl bg-white">
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
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
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

            {/* Stats — always 4 in one row */}
            <div className="grid grid-cols-4 gap-2 sm:gap-4 lg:gap-6 w-full max-w-4xl">
              {stats.map(({ value, label, icon: Icon }, index) => (
                <div
                  key={index}
                  className="group relative bg-white border border-gray-100 hover:border-red-200 hover:shadow-lg transition-all duration-300 rounded-xl sm:rounded-2xl p-2 sm:p-4 lg:p-6 flex flex-col items-center text-center"
                >
                  {/* Icon */}
                  <div className="w-7 h-7 sm:w-10 sm:h-10 lg:w-12 lg:h-12 rounded-lg sm:rounded-2xl bg-red-50 flex items-center justify-center mb-1.5 sm:mb-3 lg:mb-4 transition-transform group-hover:scale-110 group-hover:bg-red-100">
                    <Icon className="w-3.5 h-3.5 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-[#ED1C24]" />
                  </div>

                  {/* Value */}
                  <p className="text-sm sm:text-2xl lg:text-4xl font-black text-gray-900 tracking-tighter mb-0.5 sm:mb-1 leading-none">
                    {value}
                  </p>

                  {/* Label */}
                  <p className="text-[9px] sm:text-xs lg:text-sm text-gray-500 font-medium leading-tight">
                    {label}
                  </p>

                  {/* Accent line */}
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-6 h-0.5 bg-[#ED1C24] rounded-full scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
                </div>
              ))}
            </div>
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