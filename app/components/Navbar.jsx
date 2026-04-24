"use client";

import Image from "next/image";
import { useState } from "react";
import {
  Menu,
  X,
  MessageCircle,
  Phone,
  Clock,
  ChevronRight,
} from "lucide-react";

/* ─────────────────────────────────────────────
   Keyframe injection — SSR-safe, runs once
───────────────────────────────────────────── */
const STYLE_ID = "ctu-navbar-styles";
if (typeof document !== "undefined" && !document.getElementById(STYLE_ID)) {
  const style = document.createElement("style");
  style.id = STYLE_ID;
  style.textContent = `
    /* Seamless right-to-left marquee */
    @keyframes marqueeScroll {
      0%   { transform: translateX(0); }
      100% { transform: translateX(-50%); }
    }
    .ctu-marquee-track {
      display: flex;
      width: max-content;
      animation: marqueeScroll 28s linear infinite;
      will-change: transform;
    }
    /* Pause on hover */
    .ctu-marquee-wrap:hover .ctu-marquee-track {
      animation-play-state: paused;
    }
    /* Slight background darken on hover — CTA feel */
    .ctu-marquee-wrap:hover {
      background: linear-gradient(90deg, #ffe4e4 0%, #fff5f5 40%, #ffe4e4 100%) !important;
    }

    /* Left-to-right sweeping line */
    @keyframes lineSlide {
      0%   { transform: translateX(-100%); }
      100% { transform: translateX(100vw);  }
    }
    .ctu-line-runner {
      position: absolute;
      top: 0;
      left: 0;
      height: 100%;
      width: 180px;
      background: linear-gradient(
        90deg,
        transparent           0%,
        rgba(237,28,36,0.15) 20%,
        rgba(237,28,36,0.90) 50%,
        rgba(237,28,36,0.15) 80%,
        transparent          100%
      );
      animation: lineSlide 2.6s linear infinite;
      will-change: transform;
      pointer-events: none;
    }
  `;
  document.head.appendChild(style);
}

/* ─────────────────────────────────────────────
   Constants
───────────────────────────────────────────── */
const WA_LINK = "https://wa.me/923193533420";

const MARQUEE_TEXT =
  "VEO-3 Ultra Plan \u00a0•\u00a0 Top Selling \u00a0•\u00a0 Semi Private Account \u00a0•\u00a0 30 Days Warranty \u00a0•\u00a0 Unlimited VEO 3 Fast Generation \u00a0•\u00a0 Nano Banana Image Generation \u00a0•\u00a0 Limited Slots Available \u00a0•\u00a0 Buy via WhatsApp \u00a0\u00a0\u00a0\u00a0\u00a0\u00a0";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Pricing & Plans", href: "#products" },
  { label: "Reviews", href: "#reviews" },
  { label: "Contact Us", href: "tel:+923193533420" },
];

const socialLinks = [];

/* ─────────────────────────────────────────────
   Component
───────────────────────────────────────────── */
export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      {/* ════════════════════════════════════════
          1.  MARQUEE BAR — fully clickable CTA
      ════════════════════════════════════════ */}
      <a
        href={WA_LINK}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Buy via WhatsApp — click to chat"
        className="ctu-marquee-wrap"
        style={{
          display: "block",
          background: "linear-gradient(90deg,#fff0f0 0%,#fff 40%,#fff0f0 100%)",
          borderBottom: "1px solid #fcd4d5",
          overflow: "hidden",
          position: "relative",
          cursor: "pointer",
          textDecoration: "none",
          transition: "background 0.2s ease",
        }}
      >
        {/* Left/right edge fade */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(90deg,#fff8f8 0%,transparent 6%,transparent 94%,#fff8f8 100%)",
            pointerEvents: "none",
            zIndex: 2,
          }}
        />

        <div
          style={{
            overflow: "hidden",
            padding: "6px 0",
            position: "relative",
            zIndex: 3,
          }}
        >
          <div className="ctu-marquee-track" aria-hidden="true">
            {/* Two identical copies — second copy makes the loop invisible */}
            {[0, 1].map((idx) => (
              <span
                key={idx}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  whiteSpace: "nowrap",
                  fontSize: "11px",
                  fontWeight: 600,
                  letterSpacing: "0.03em",
                  color: "#b91c1c",
                  paddingRight: "2rem",
                }}
              >
                {MARQUEE_TEXT}
                <span style={{ color: "#ED1C24", margin: "0 1rem" }}>◆</span>
              </span>
            ))}
          </div>
        </div>
      </a>

      {/* ════════════════════════════════════════
          2.  TOP UTILITY BAR
      ════════════════════════════════════════ */}
      <div className="bg-[#ED1C24] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between py-2">
          <div className="flex items-center gap-1.5 text-[11px] sm:text-xs font-semibold opacity-90">
            <Clock className="w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0" />
            <span>Mon – Fri: 8AM – 5PM</span>
          </div>
          <a
            href="tel:+923193533420"
            className="flex items-center gap-1.5 text-[11px] sm:text-xs font-semibold hover:opacity-80 transition-opacity"
          >
            <Phone className="w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0" />
            <span>+92 319 3533420</span>
          </a>
        </div>
      </div>

      {/* ════════════════════════════════════════
          3.  MAIN NAVBAR
      ════════════════════════════════════════ */}
      <nav className="sticky top-0 z-30 bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-14 sm:h-16">
          {/* Logo — clamp keeps it big on mobile without overflow */}
          <a href="/" className="shrink-0">
            <Image
              src="/logo/ctu1.png"
              width={220}
              height={80}
              alt="Creator Tools by Usama"
              priority
              className="object-contain w-auto"
              style={{ height: "clamp(44px, 8vw, 56px)" }}
            />
          </a>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-6 xl:gap-7">
            {navLinks.map(({ label, href }) => (
              <a
                key={label}
                href={href}
                className="relative text-sm font-semibold text-gray-500 hover:text-[#ED1C24] transition-colors duration-200 after:absolute after:-bottom-0.5 after:left-0 after:h-0.5 after:w-0 after:bg-[#ED1C24] after:rounded-full after:transition-all after:duration-300 hover:after:w-full"
              >
                {label}
              </a>
            ))}
          </div>

          {/* Right buttons */}
          <div className="flex items-center gap-2 shrink-0">
            <a
              href={WA_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 bg-[#25D366] hover:bg-[#1fb85a] text-white text-xs font-bold px-3 py-2 sm:px-4 sm:py-2.5 rounded-xl transition-all duration-200 hover:shadow-md hover:shadow-green-200"
            >
              <MessageCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span className="hidden sm:inline">WhatsApp</span>
            </a>

            <button
              onClick={() => setMobileOpen(true)}
              className="lg:hidden w-9 h-9 rounded-xl hover:bg-gray-100 flex items-center justify-center transition-colors"
              aria-label="Open menu"
            >
              <Menu className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>

        {/* ── Left-to-right sweeping line border ── */}
        <div
          aria-hidden="true"
          style={{
            position: "relative",
            height: "1.5px",
            width: "100%",
            background: "rgba(237,28,36,0.10)" /* dim base track */,
            overflow: "hidden",
          }}
        >
          <div className="ctu-line-runner" />
        </div>
      </nav>

      {/* ════════════════════════════════════════
          4.  MOBILE DRAWER
      ════════════════════════════════════════ */}
      <aside
        className={`fixed top-0 left-0 z-50 h-full bg-white shadow-2xl flex flex-col transition-transform duration-300 ease-in-out lg:hidden ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        style={{ width: "min(280px, 85vw)" }}
      >
        {/* Drawer header */}
        <div className="flex items-center justify-between px-4 py-4 border-b border-gray-100">
          <Image
            src="/logo/ctu1.png"
            width={130}
            height={48}
            alt="Logo"
            className="object-contain h-10 w-auto"
          />
          <button
            onClick={() => setMobileOpen(false)}
            className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-gray-100 transition-colors text-gray-500"
            aria-label="Close menu"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Drawer nav */}
        <nav className="flex-1 overflow-y-auto py-3 px-3">
          <ul className="space-y-0.5">
            {navLinks.map(({ label, href }) => (
              <li key={label}>
                <a
                  href={href}
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-semibold text-gray-700 hover:bg-red-50 hover:text-[#ED1C24] transition-all duration-200 group"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-gray-300 group-hover:text-[#ED1C24] transition-colors shrink-0" />
                  {label}
                </a>
              </li>
            ))}
          </ul>

          <div className="my-4 border-t border-gray-100" />

          <div className="px-3 space-y-3">
            <a
              href="tel:+923193533420"
              className="flex items-center gap-2.5 text-sm text-gray-500 font-medium hover:text-[#ED1C24] transition-colors"
            >
              <Phone className="w-4 h-4 text-[#ED1C24] shrink-0" />
              +92 319 3533420
            </a>
            <div className="flex items-center gap-2.5 text-sm text-gray-500 font-medium">
              <Clock className="w-4 h-4 text-[#ED1C24] shrink-0" />
              Mon – Fri: 8AM – 5PM
            </div>
          </div>

          {socialLinks.length > 0 && (
            <div className="flex gap-2 px-3 mt-5">
              {socialLinks.map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 rounded-xl bg-gray-100 hover:bg-[#ED1C24] flex items-center justify-center transition-all duration-200"
                >
                  <Icon className="w-4 h-4 text-gray-500" />
                </a>
              ))}
            </div>
          )}
        </nav>

        {/* Drawer footer CTA */}
        <div className="p-4 border-t border-gray-100">
          <a
            href={WA_LINK}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMobileOpen(false)}
            className="flex items-center justify-center gap-2 w-full bg-[#25D366] hover:bg-[#1fb85a] text-white text-sm font-bold py-3 rounded-xl transition-all duration-200"
          >
            <MessageCircle className="w-4 h-4" />
            Chat on WhatsApp
          </a>
        </div>
      </aside>

      {/* Mobile backdrop */}
      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm lg:hidden"
        />
      )}
    </>
  );
}
