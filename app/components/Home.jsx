"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Urbanist } from "next/font/google";
import {
  ShoppingCart,
  Star,
  Zap,
  Shield,
  Clock,
  ChevronRight,
  Phone,
  MessageCircle,
  Users,
  BookOpen,
  Wrench,
  Briefcase,
  Tag,
  Smile,
  ExternalLink,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  Instagram,
  Youtube,
  Music2,
  Facebook,
  X,
  Menu,
} from "lucide-react";

const urbanist = Urbanist({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

// ─── Data ─────────────────────────────────────────────────────────────────────

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

const communities = [
  {
    title: "Creator Tools by Usama",
    desc: "All channels connected. Free learning, AI tools & monetization.",
    icon: Wrench,
    color: "text-red-500",
    bg: "bg-red-50",
    link: "#",
  },
  {
    title: "Free AI Courses",
    desc: "Beginner-friendly AI courses. Step-by-step. No fluff.",
    icon: BookOpen,
    color: "text-blue-500",
    bg: "bg-blue-50",
    link: "#",
  },
  {
    title: "Automation & AI Tools",
    desc: "Smart workflows. Save time. Turn systems into income.",
    icon: Zap,
    color: "text-yellow-500",
    bg: "bg-yellow-50",
    link: "#",
  },
  {
    title: "AI Services & Freelancing",
    desc: "Attract high-paying clients. From skills to sales.",
    icon: Briefcase,
    color: "text-purple-500",
    bg: "bg-purple-50",
    link: "#",
  },
  {
    title: "Exclusive Deals & Tools",
    desc: "Special discounts only for community members.",
    icon: Tag,
    color: "text-green-500",
    bg: "bg-green-50",
    link: "#",
  },
  {
    title: "Fun & News",
    desc: "Memes, light content. Learning that never feels boring.",
    icon: Smile,
    color: "text-orange-500",
    bg: "bg-orange-50",
    link: "#",
  },
];

const navLinks = [
  { label: "Home", href: "#" },
  { label: "Pricing & Plans", href: "#products" },
  { label: "Contact Us", href: "tel:+923041333420" },
  { label: "FAQs", href: "#" },
];

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

const socialLinks = [
  { icon: Instagram, label: "Instagram", href: "#" },
  { icon: Facebook, label: "Facebook", href: "#" },
  { icon: Youtube, label: "YouTube", href: "#" },
  { icon: Music2, label: "TikTok", href: "#" },
];

// ─── Component ────────────────────────────────────────────────────────────────

export default function Home() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const navRef = useRef(null);
  const cardRefs = useRef([]);
  const commRefs = useRef([]);
  const statsRef = useRef(null);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  useEffect(() => {
    let ctx;
    (async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);
      ctx = gsap.context(() => {
        gsap.fromTo(
          navRef.current,
          { y: -60, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.65, ease: "power3.out" },
        );
        gsap.fromTo(
          ".h-anim",
          { y: 28, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            stagger: 0.1,
            ease: "power3.out",
            delay: 0.25,
          },
        );
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
              scrollTrigger: { trigger: statsRef.current, start: "top 88%" },
            },
          );
        }
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
        commRefs.current.forEach((el, i) => {
          if (!el) return;
          gsap.fromTo(
            el,
            { y: 28, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.45,
              ease: "power2.out",
              scrollTrigger: { trigger: el, start: "top 92%" },
              delay: (i % 3) * 0.07,
            },
          );
        });
      });
    })();
    return () => ctx?.revert();
  }, []);

  return (
    <div
      className={`min-h-screen bg-gray-50 text-gray-900 antialiased ${urbanist.className}`}
    >
      {/* ── Mobile Drawer Backdrop ───────────────────────────────────────── */}
      <div
        onClick={() => setMobileOpen(false)}
        className={`fixed inset-0 z-40 bg-black/40 backdrop-blur-sm transition-opacity duration-300 lg:hidden ${
          mobileOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      />

      {/* ── Mobile Drawer ────────────────────────────────────────────────── */}
      <aside
        className={`fixed top-0 left-0 z-50 h-full w-70 bg-white shadow-2xl flex flex-col transition-transform duration-300 ease-in-out lg:hidden ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between px-4 py-4 border-b border-gray-100">
          <Image
            src="/logo/ctu1.png"
            width={100}
            height={36}
            alt="Logo"
            className="object-contain h-8 w-auto"
          />
          <button
            onClick={() => setMobileOpen(false)}
            className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-gray-100 transition-colors text-gray-500"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

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
              href="tel:+923041333420"
              className="flex items-center gap-2.5 text-sm text-gray-500 font-medium hover:text-[#ED1C24] transition-colors"
            >
              <Phone className="w-4 h-4 text-[#ED1C24] shrink-0" />
              +92304 1333420
            </a>
            <div className="flex items-center gap-2.5 text-sm text-gray-500 font-medium">
              <Clock className="w-4 h-4 text-[#ED1C24] shrink-0" />
              Mon – Fri: 8AM – 5PM
            </div>
          </div>
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
        </nav>

        <div className="p-4 border-t border-gray-100">
          <a
            href="https://wa.me/923041333420"
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

      {/* ── Top Bar ──────────────────────────────────────────────────────── */}
      <div className="bg-[#ED1C24] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between py-2">
          <div className="flex items-center gap-1.5 text-[11px] sm:text-xs font-semibold opacity-90">
            <Clock className="w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0" />
            <span>Mon – Fri: 8AM – 5PM</span>
          </div>
          <a
            href="tel:+923041333420"
            className="flex items-center gap-1.5 text-[11px] sm:text-xs font-semibold hover:opacity-80 transition-opacity"
          >
            <Phone className="w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0" />
            <span>+92304 1333420</span>
          </a>
        </div>
      </div>

      {/* ── Navbar ───────────────────────────────────────────────────────── */}
      <nav
        ref={navRef}
        className="sticky top-0 z-30 bg-white border-b border-gray-100 shadow-sm"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-14 sm:h-16">
          <Image
            src="/logo/ctu1.png"
            width={110}
            height={38}
            alt="Creator Tools by Usama"
            className="object-contain h-8 sm:h-9 w-auto"
          />

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

          <div className="flex items-center gap-2">
            <a
              href="https://wa.me/923041333420"
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
            >
              <Menu className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>
      </nav>

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 lg:py-16">
          <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-14">
            {/* Text */}
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

      {/* ── Trust Strip ──────────────────────────────────────────────────── */}
      <section className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3">
            {trust.map(({ icon: Icon, title, desc, color, bg }) => (
              <div
                key={title}
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

      {/* ── Products ─────────────────────────────────────────────────────── */}
      <section id="products" className="py-10 sm:py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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

                {/* Image zone */}
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

                {/* Body */}
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
                            className={`w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0 ${p.highlight ? "text-[#ED1C24]" : "text-emerald-500"}`}
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

      {/* ── Communities ──────────────────────────────────────────────────── */}
      <section className="py-10 sm:py-14 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 sm:gap-4 mb-6 sm:mb-8">
            <div>
              <p className="text-[#ED1C24] text-[10px] sm:text-xs font-bold uppercase tracking-widest mb-1 sm:mb-1.5">
                Free Communities
              </p>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-gray-900">
                Learn & Earn — <span className="text-[#ED1C24]">For Free.</span>
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-gray-400 font-medium max-w-xs leading-relaxed">
              Join our WhatsApp channels for AI courses, tools & monetization
              strategies.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {communities.map((c, i) => {
              const Icon = c.icon;
              return (
                <div
                  key={c.title}
                  ref={(el) => (commRefs.current[i] = el)}
                  className="group flex flex-col gap-3 sm:gap-4 bg-gray-50 border border-gray-100 rounded-2xl p-4 sm:p-5 hover:bg-white hover:border-gray-200 hover:-translate-y-1 hover:shadow-lg hover:shadow-gray-100/80 transition-all duration-300"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl ${c.bg} flex items-center justify-center shrink-0`}
                    >
                      <Icon className={`w-4 h-4 sm:w-5 sm:h-5 ${c.color}`} />
                    </div>
                    <h3 className="text-xs sm:text-sm font-black text-gray-900 leading-tight">
                      {c.title}
                    </h3>
                  </div>
                  <p className="text-[11px] sm:text-xs text-gray-400 font-medium leading-relaxed flex-1">
                    {c.desc}
                  </p>
                  <a
                    href={c.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-between bg-[#25D366]/10 hover:bg-[#25D366] text-[#25D366] hover:text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-all duration-200"
                  >
                    <span className="flex items-center gap-2">
                      <MessageCircle className="w-3.5 h-3.5 shrink-0" />
                      Join Channel
                    </span>
                    <ExternalLink className="w-3 h-3 opacity-60 shrink-0" />
                  </a>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────────── */}
      <section className="py-8 sm:py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative bg-[#ED1C24] rounded-2xl sm:rounded-3xl overflow-hidden py-10 sm:py-14 px-5 sm:px-10 lg:px-14 text-center">
            <div
              className="absolute inset-0 opacity-[0.07]"
              style={{
                backgroundImage:
                  "radial-gradient(circle, white 1.5px, transparent 1.5px)",
                backgroundSize: "24px 24px",
              }}
            />
            <div className="relative">
              <p className="text-white/60 text-[10px] sm:text-xs font-bold uppercase tracking-widest mb-2 sm:mb-3">
                Get Started Today
              </p>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white mb-2 sm:mb-3 leading-tight">
                Ready to Get Premium Tools?
              </h2>
              <p className="text-white/70 text-xs sm:text-sm font-medium mb-6 sm:mb-8 max-w-md mx-auto leading-relaxed">
                Message us on WhatsApp and get your subscription within minutes.
                Verified & Instant.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <a
                  href="https://wa.me/923041333420"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-white text-[#ED1C24] font-black px-6 sm:px-8 py-3 sm:py-3.5 rounded-xl text-sm hover:bg-red-50 transition-all duration-200 hover:shadow-xl hover:-translate-y-0.5 w-full sm:w-auto justify-center"
                >
                  <MessageCircle className="w-4 h-4 shrink-0" />
                  Order on WhatsApp
                </a>
                <a
                  href="tel:+923041333420"
                  className="inline-flex items-center gap-2 border-2 border-white/25 hover:border-white/60 text-white font-bold px-6 sm:px-8 py-3 sm:py-3.5 rounded-xl text-sm transition-all duration-200 hover:-translate-y-0.5 w-full sm:w-auto justify-center"
                >
                  <Phone className="w-4 h-4 shrink-0" />
                  Call Now
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Footer ───────────────────────────────────────────────────────── */}
      <footer className="bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8 sm:mb-10">
            <div className="sm:col-span-2 lg:col-span-2">
              <div className="mb-4">
                <Image
                  src="/logo/ctu.png"
                  width={110}
                  height={38}
                  alt="Creator Tools by Usama"
                  className="object-contain h-8 w-auto"
                />
              </div>
              <p className="text-gray-400 text-xs sm:text-sm leading-relaxed max-w-xs mb-5">
                Premium digital subscriptions at Pakistan's lowest prices.
                Verified accounts, instant delivery.
              </p>
              <div className="flex gap-2">
                {socialLinks.map(({ icon: Icon, label, href }) => (
                  <a
                    key={label}
                    href={href}
                    aria-label={label}
                    className="w-9 h-9 rounded-xl bg-gray-800 hover:bg-[#ED1C24] flex items-center justify-center transition-all duration-200 hover:-translate-y-0.5"
                  >
                    <Icon className="w-4 h-4 text-gray-400" />
                  </a>
                ))}
              </div>
            </div>

            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-3 sm:mb-4">
                Quick Links
              </p>
              <ul className="space-y-2 sm:space-y-2.5">
                {navLinks.map(({ label, href }) => (
                  <li key={label}>
                    <a
                      href={href}
                      className="text-xs sm:text-sm text-gray-400 hover:text-white transition-colors font-medium flex items-center gap-1.5 group"
                    >
                      <ChevronRight className="w-3 h-3 text-[#ED1C24] opacity-0 group-hover:opacity-100 -ml-1 transition-opacity shrink-0" />
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-3 sm:mb-4">
                Contact
              </p>
              <ul className="space-y-3">
                <li className="flex items-center gap-2.5 text-xs sm:text-sm text-gray-400 font-medium">
                  <Phone className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#ED1C24] shrink-0" />
                  +92304 1333420
                </li>
                <li className="flex items-center gap-2.5 text-xs sm:text-sm text-gray-400 font-medium">
                  <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#ED1C24] shrink-0" />
                  Mon – Fri: 8AM – 5PM
                </li>
                <li className="pt-1">
                  <a
                    href="https://wa.me/923041333420"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#1fb85a] text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-all duration-200"
                  >
                    <MessageCircle className="w-3.5 h-3.5 shrink-0" />
                    Chat on WhatsApp
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-5 sm:pt-6 flex flex-col sm:flex-row items-center justify-between gap-2">
            <p className="text-gray-600 text-[11px] sm:text-xs font-medium text-center sm:text-left">
              © {new Date().getFullYear()} Creator Tools by Usama. All rights
              reserved.
            </p>
            <p className="text-gray-700 text-[11px] sm:text-xs font-medium">
              Made with ❤️ in Pakistan
            </p>
          </div>
        </div>
      </footer>

      {/* ── Floating WhatsApp FAB ────────────────────────────────────────── */}
      <a
        href="https://wa.me/923041333420"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-50 bg-[#25D366] hover:bg-[#1fb85a] rounded-2xl shadow-xl shadow-green-400/30 flex items-center justify-center transition-all duration-300 hover:scale-110 hover:-translate-y-1"
        style={{ width: 48, height: 48 }}
        title="Chat on WhatsApp"
      >
        <MessageCircle
          className="w-5 h-5 sm:w-6 sm:h-6 text-white"
          fill="white"
        />
      </a>
    </div>
  );
}
