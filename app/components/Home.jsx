"use client";

import { useEffect, useRef, useState } from "react";
import Head from "next/head";
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

// ─── Data ────────────────────────────────────────────────────────────────────

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
    desc: "All accounts tested before delivery",
    color: "text-blue-500",
    bg: "bg-blue-50",
  },
  {
    icon: Zap,
    title: "Instant Delivery",
    desc: "Access within minutes of purchase",
    color: "text-yellow-500",
    bg: "bg-yellow-50",
  },
  {
    icon: MessageCircle,
    title: "WhatsApp Support",
    desc: "Chat with us anytime for help",
    color: "text-green-500",
    bg: "bg-green-50",
  },
  {
    icon: Star,
    title: "Best Prices",
    desc: "Lowest rates guaranteed in Pakistan",
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

  // Lock body scroll when mobile nav is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  // GSAP animations
  useEffect(() => {
    let ctx;
    (async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {
        // Nav entrance
        gsap.fromTo(
          navRef.current,
          { y: -60, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.65, ease: "power3.out" },
        );

        // Hero stagger
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

        // Stats
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

        // Product cards
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

        // Community cards
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
    <>
      <Head>
        <title>Creator Tools by Usama — Premium Digital Tools Pakistan</title>
        <meta
          name="description"
          content="Get verified Canva Pro, Adobe CC, YouTube Premium & more at Pakistan's lowest prices."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div
        className={`min-h-screen bg-gray-50 text-gray-900 antialiased ${urbanist.className}`}
      >
        {/* ─── Mobile Nav Overlay ─────────────────────────────────────────── */}
        {/* Backdrop */}
        <div
          onClick={() => setMobileOpen(false)}
          className={`fixed inset-0 z-40 bg-black/40 backdrop-blur-sm transition-opacity duration-300 lg:hidden ${
            mobileOpen
              ? "opacity-100 pointer-events-auto"
              : "opacity-0 pointer-events-none"
          }`}
        />

        {/* Drawer — slides left → right */}
        <aside
          className={`fixed top-0 left-0 z-50 h-full w-72 bg-white shadow-2xl flex flex-col transition-transform duration-300 ease-in-out lg:hidden ${
            mobileOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          {/* Drawer header */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
            <Image
              src="/logo/ctu1.png"
              width={110}
              height={40}
              alt="Logo"
              className="object-contain"
            />
            <button
              onClick={() => setMobileOpen(false)}
              className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-gray-100 transition-colors text-gray-500"
              aria-label="Close menu"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Nav links */}
          <nav className="flex-1 overflow-y-auto py-4 px-4">
            <ul className="space-y-1">
              {navLinks.map(({ label, href }) => (
                <li key={label}>
                  <a
                    href={href}
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-semibold text-gray-700 hover:bg-red-50 hover:text-[#ED1C24] transition-all duration-200 group"
                  >
                    <ChevronRight className="w-3.5 h-3.5 text-gray-300 group-hover:text-[#ED1C24] transition-colors" />
                    {label}
                  </a>
                </li>
              ))}
            </ul>

            {/* Divider */}
            <div className="my-4 border-t border-gray-100" />

            {/* Contact info */}
            <div className="px-3 space-y-3">
              <a
                href="tel:+923041333420"
                className="flex items-center gap-2.5 text-sm text-gray-500 font-medium hover:text-[#ED1C24] transition-colors"
              >
                <Phone className="w-4 h-4 text-[#ED1C24]" />
                +92304 1333420
              </a>
              <div className="flex items-center gap-2.5 text-sm text-gray-500 font-medium">
                <Clock className="w-4 h-4 text-[#ED1C24]" />
                Mon – Fri: 8AM – 5PM
              </div>
            </div>

            {/* Social icons */}
            <div className="flex gap-2 px-3 mt-5">
              {socialLinks.map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 rounded-xl bg-gray-100 hover:bg-[#ED1C24] flex items-center justify-center transition-all duration-200"
                >
                  <Icon className="w-4 h-4 text-gray-500 hover:text-white" />
                </a>
              ))}
            </div>
          </nav>

          {/* Drawer footer CTA */}
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

        {/* ─── Top Bar ────────────────────────────────────────────────────── */}
        <div className="bg-[#ED1C24] text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between py-2 text-xs font-semibold">
            <div className="flex items-center gap-1.5 opacity-90">
              <Clock className="w-3.5 h-3.5" />
              <span>Mon – Fri: 8AM – 5PM</span>
            </div>
            <a
              href="tel:+923041333420"
              className="flex items-center gap-1.5 hover:opacity-80 transition-opacity"
            >
              <Phone className="w-3.5 h-3.5" />
              +92304 1333420
            </a>
          </div>
        </div>

        {/* ─── Navbar ─────────────────────────────────────────────────────── */}
        <nav
          ref={navRef}
          className="sticky top-0 z-30 bg-white border-b border-gray-100 shadow-sm"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center">
              <Image
                src="/logo/ctu1.png"
                width={120}
                height={40}
                alt="Creator Tools by Usama"
                className="object-contain"
              />
            </div>

            {/* Desktop links */}
            <div className="hidden lg:flex items-center gap-7">
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

            {/* Right side */}
            <div className="flex items-center gap-2.5">
              {/* WhatsApp button */}
              <a
                href="https://wa.me/923041333420"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-[#25D366] hover:bg-[#1fb85a] text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-all duration-200 hover:shadow-md hover:shadow-green-200"
              >
                <MessageCircle className="w-4 h-4" />
                <span className="hidden sm:inline">WhatsApp</span>
              </a>

              {/* Hamburger (mobile only) */}
              <button
                onClick={() => setMobileOpen(true)}
                className="lg:hidden flex flex-col justify-center items-center w-9 h-9 rounded-xl hover:bg-gray-100 transition-colors gap-1.25"
                aria-label="Open menu"
              >
                <Menu className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>
        </nav>

        {/* ─── Hero ───────────────────────────────────────────────────────── */}
        <section className="bg-white border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
            <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
              {/* Text */}
              <div className="flex-1 max-w-xl">
                <div className="h-anim inline-flex items-center gap-2 bg-red-50 text-[#ED1C24] text-xs font-bold px-3 py-1.5 rounded-full mb-5 uppercase tracking-widest">
                  <Sparkles className="w-3.5 h-3.5" />
                  Pakistan's #1 Digital Tools Store
                </div>
                <h1 className="h-anim text-4xl sm:text-5xl font-black text-gray-900 leading-[1.1] tracking-tight mb-4">
                  Premium Tools,{" "}
                  <span className="text-[#ED1C24]">Unbeatable</span> Prices
                </h1>
                <p className="h-anim text-base text-gray-500 font-medium leading-relaxed mb-7">
                  Get verified Canva Pro, Adobe CC, YouTube Premium & more —
                  delivered instantly at Pakistan's lowest prices.
                </p>
                <div className="h-anim flex flex-wrap gap-3">
                  <a
                    href="#products"
                    className="inline-flex items-center gap-2 bg-[#ED1C24] hover:bg-red-700 text-white font-bold px-6 py-3 rounded-xl text-sm transition-all duration-200 hover:shadow-lg hover:shadow-red-100 hover:-translate-y-0.5"
                  >
                    Shop Now <ArrowRight className="w-4 h-4" />
                  </a>
                  <a
                    href="https://wa.me/923041333420"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-gray-50 hover:bg-gray-100 text-gray-700 font-bold px-6 py-3 rounded-xl text-sm border border-gray-200 transition-all duration-200 hover:-translate-y-0.5"
                  >
                    <MessageCircle className="w-4 h-4 text-[#25D366]" />
                    Get Help
                  </a>
                </div>
              </div>

              {/* Stats */}
              <div
                ref={statsRef}
                className="grid grid-cols-2 gap-3 w-full max-w-xs"
              >
                {stats.map(({ value, label, icon: Icon }) => (
                  <div
                    key={label}
                    className="group flex flex-col gap-3 p-5 bg-gray-50 hover:bg-white border border-gray-100 hover:border-gray-200 rounded-2xl transition-all duration-300 hover:shadow-md hover:shadow-gray-100"
                  >
                    <div className="w-9 h-9 rounded-xl bg-[#ED1C24]/8 flex items-center justify-center group-hover:bg-[#ED1C24]/12 transition-colors">
                      <Icon className="w-4 h-4 text-[#ED1C24]" />
                    </div>
                    <div>
                      <p className="text-2xl font-black text-gray-900 leading-none">
                        {value}
                      </p>
                      <p className="text-xs text-gray-400 font-semibold mt-1">
                        {label}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ─── Trust Strip ────────────────────────────────────────────────── */}
        <section className="bg-white border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
              {trust.map(({ icon: Icon, title, desc, color, bg }) => (
                <div
                  key={title}
                  className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 border border-gray-100"
                >
                  <div
                    className={`w-8 h-8 rounded-lg ${bg} flex items-center justify-center shrink-0`}
                  >
                    <Icon className={`w-4 h-4 ${color}`} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-800">{title}</p>
                    <p className="text-[10px] text-gray-400 font-medium leading-tight mt-0.5 hidden sm:block">
                      {desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── Products ───────────────────────────────────────────────────── */}
        <section id="products" className="py-14">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-end justify-between mb-8">
              <div>
                <p className="text-[#ED1C24] text-xs font-bold uppercase tracking-widest mb-1.5">
                  Our Products
                </p>
                <h2 className="text-3xl sm:text-4xl font-black text-gray-900">
                  Pricing & Plans
                </h2>
              </div>
              <a
                href="https://wa.me/923041333420"
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:flex items-center gap-1 text-sm font-semibold text-gray-400 hover:text-[#ED1C24] transition-colors"
              >
                Order via WhatsApp <ChevronRight className="w-4 h-4" />
              </a>
            </div>

            <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-5">
              {products.map((p, i) => (
                <div
                  key={p.id}
                  ref={(el) => (cardRefs.current[i] = el)}
                  className={`group relative flex flex-col bg-white rounded-2xl border overflow-hidden transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-gray-200/60 ${
                    p.highlight
                      ? "border-[#ED1C24] shadow-lg shadow-red-100/80 ring-1 ring-[#ED1C24]/20"
                      : "border-gray-100 shadow-sm hover:border-gray-200"
                  }`}
                >
                  {/* Top accent bar */}
                  {p.highlight && (
                    <div className="h-1 w-full bg-linear-to-r from-[#ED1C24] to-rose-400 shrink-0" />
                  )}

                  {/* Product image */}
                  <div
                    className={`relative flex items-center justify-center p-6 border-b border-gray-100 ${
                      p.highlight
                        ? "bg-linear-to-br from-red-50/40 to-white"
                        : "bg-gray-50/60"
                    }`}
                    style={{ minHeight: 160 }}
                  >
                    {/* Badges */}
                    <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                      <span
                        className={`text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wide ${p.badgeColor}`}
                      >
                        {p.badge}
                      </span>
                    </div>
                    <div className="absolute top-3 right-3">
                      <span className="text-[10px] font-semibold text-gray-400 bg-white border border-gray-100 px-2 py-0.5 rounded-full shadow-sm">
                        {p.tag}
                      </span>
                    </div>
                    <img
                      src={p.image}
                      alt={p.title}
                      className="max-h-28 max-w-full object-contain drop-shadow-sm transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>

                  {/* Card body */}
                  <div className="flex flex-col flex-1 p-5">
                    {/* Title */}
                    <div className="mb-3">
                      <h3 className="text-base font-black text-gray-900 leading-snug">
                        {p.title}
                      </h3>
                      <p className="text-xs font-semibold text-gray-400 mt-0.5">
                        {p.subtitle}
                      </p>
                    </div>

                    {/* Description */}
                    <p className="text-sm text-gray-500 leading-relaxed mb-4">
                      {p.description}
                    </p>

                    {/* Features */}
                    <div className="mb-4 flex-1">
                      <p className="text-[10px] font-bold uppercase tracking-widest text-gray-300 mb-2">
                        What's included
                      </p>
                      <ul className="grid grid-cols-2 gap-y-1.5 gap-x-2">
                        {p.features.map((f) => (
                          <li
                            key={f}
                            className="flex items-center gap-1.5 text-xs text-gray-600 font-medium"
                          >
                            <CheckCircle2
                              className={`w-3.5 h-3.5 shrink-0 ${p.highlight ? "text-[#ED1C24]" : "text-emerald-500"}`}
                            />
                            {f}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Divider */}
                    <div className="border-t border-dashed border-gray-100 mb-4" />

                    {/* Price + CTA */}
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="flex items-baseline gap-1.5 mb-1">
                          <span className="text-xl font-black text-gray-900">
                            Rs. {p.price}
                          </span>
                          <span className="text-xs font-semibold text-gray-300 line-through">
                            Rs. {p.originalPrice}
                          </span>
                        </div>
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                          <CheckCircle2 className="w-3 h-3" />
                          Save {p.savings}%
                        </span>
                      </div>
                      <a
                        href="https://wa.me/923041333420"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`inline-flex items-center gap-1.5 text-sm font-bold px-4 py-2.5 rounded-xl transition-all duration-200 hover:-translate-y-0.5 ${
                          p.highlight
                            ? "bg-[#ED1C24] text-white hover:bg-red-700 shadow-md shadow-red-100"
                            : "bg-gray-900 text-white hover:bg-gray-700 shadow-sm"
                        }`}
                      >
                        <ShoppingCart className="w-3.5 h-3.5" />
                        Buy Now
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── Communities ────────────────────────────────────────────────── */}
        <section className="py-14 bg-white border-t border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
              <div>
                <p className="text-[#ED1C24] text-xs font-bold uppercase tracking-widest mb-1.5">
                  Free Communities
                </p>
                <h2 className="text-3xl sm:text-4xl font-black text-gray-900">
                  Learn & Earn —{" "}
                  <span className="text-[#ED1C24]">For Free.</span>
                </h2>
              </div>
              <p className="text-sm text-gray-400 font-medium max-w-xs leading-relaxed">
                Join our WhatsApp channels for AI courses, tools & monetization
                strategies.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {communities.map((c, i) => {
                const Icon = c.icon;
                return (
                  <div
                    key={c.title}
                    ref={(el) => (commRefs.current[i] = el)}
                    className="group flex flex-col gap-4 bg-gray-50 border border-gray-100 rounded-2xl p-5 hover:bg-white hover:border-gray-200 hover:-translate-y-1 hover:shadow-lg hover:shadow-gray-100/80 transition-all duration-300"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-10 h-10 rounded-xl ${c.bg} flex items-center justify-center shrink-0`}
                      >
                        <Icon className={`w-5 h-5 ${c.color}`} />
                      </div>
                      <h3 className="text-sm font-black text-gray-900 leading-tight">
                        {c.title}
                      </h3>
                    </div>
                    <p className="text-xs text-gray-400 font-medium leading-relaxed flex-1">
                      {c.desc}
                    </p>
                    <a
                      href={c.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-between bg-[#25D366]/10 hover:bg-[#25D366] text-[#25D366] hover:text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-all duration-200"
                    >
                      <span className="flex items-center gap-2">
                        <MessageCircle className="w-3.5 h-3.5" />
                        Join Channel
                      </span>
                      <ExternalLink className="w-3 h-3 opacity-60" />
                    </a>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ─── CTA ────────────────────────────────────────────────────────── */}
        <section className="py-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="relative bg-[#ED1C24] rounded-3xl overflow-hidden py-14 px-6 sm:px-14 text-center">
              {/* Dot grid pattern */}
              <div
                className="absolute inset-0 opacity-[0.07]"
                style={{
                  backgroundImage:
                    "radial-linear(circle, white 1.5px, transparent 1.5px)",
                  backgroundSize: "24px 24px",
                }}
              />
              <div className="relative">
                <p className="text-white/60 text-xs font-bold uppercase tracking-widest mb-3">
                  Get Started Today
                </p>
                <h2 className="text-3xl sm:text-4xl font-black text-white mb-3 leading-tight">
                  Ready to Get Premium Tools?
                </h2>
                <p className="text-white/70 text-sm font-medium mb-8 max-w-md mx-auto leading-relaxed">
                  Message us on WhatsApp and get your subscription within
                  minutes. Verified & Instant.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                  <a
                    href="https://wa.me/923041333420"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-white text-[#ED1C24] font-black px-8 py-3.5 rounded-xl text-sm hover:bg-red-50 transition-all duration-200 hover:shadow-xl hover:-translate-y-0.5 w-full sm:w-auto justify-center"
                  >
                    <MessageCircle className="w-4 h-4" />
                    Order on WhatsApp
                  </a>
                  <a
                    href="tel:+923041333420"
                    className="inline-flex items-center gap-2 border-2 border-white/25 hover:border-white/60 text-white font-bold px-8 py-3.5 rounded-xl text-sm transition-all duration-200 hover:-translate-y-0.5 w-full sm:w-auto justify-center"
                  >
                    <Phone className="w-4 h-4" />
                    Call Now
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── Footer ─────────────────────────────────────────────────────── */}
        <footer className="bg-gray-900 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
              {/* Brand */}
              <div className="lg:col-span-2">
                <div className="mb-4">
                  <Image
                    src="/logo/ctu.png"
                    width={120}
                    height={40}
                    alt="Creator Tools by Usama"
                    className="object-contain"
                  />
                </div>
                <p className="text-gray-400 text-sm leading-relaxed max-w-xs mb-5">
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
                      <Icon className="w-4 h-4 text-gray-400 group-hover:text-white" />
                    </a>
                  ))}
                </div>
              </div>

              {/* Quick Links */}
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-4">
                  Quick Links
                </p>
                <ul className="space-y-2.5">
                  {navLinks.map(({ label, href }) => (
                    <li key={label}>
                      <a
                        href={href}
                        className="text-sm text-gray-400 hover:text-white transition-colors font-medium flex items-center gap-1.5 group"
                      >
                        <ChevronRight className="w-3 h-3 text-[#ED1C24] opacity-0 group-hover:opacity-100 -ml-1 transition-opacity" />
                        {label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Contact */}
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-4">
                  Contact
                </p>
                <ul className="space-y-3">
                  <li className="flex items-center gap-2.5 text-sm text-gray-400 font-medium">
                    <Phone className="w-4 h-4 text-[#ED1C24] shrink-0" />
                    +92304 1333420
                  </li>
                  <li className="flex items-center gap-2.5 text-sm text-gray-400 font-medium">
                    <Clock className="w-4 h-4 text-[#ED1C24] shrink-0" />
                    Mon – Fri: 8AM – 5PM
                  </li>
                  <li className="pt-1">
                    <a
                      href="https://wa.me/923041333420"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#1fb85a] text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-all duration-200"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      Chat on WhatsApp
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            {/* Bottom bar */}
            <div className="border-t border-gray-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-2">
              <p className="text-gray-600 text-xs font-medium">
                © {new Date().getFullYear()} Creator Tools by Usama. All rights
                reserved.
              </p>
              <p className="text-gray-700 text-xs font-medium">
                Made with ❤️ in Pakistan
              </p>
            </div>
          </div>
        </footer>

        {/* ─── Floating WhatsApp FAB ───────────────────────────────────────── */}
        <a
          href="https://wa.me/923041333420"
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-6 right-6 z-50 bg-[#25D366] hover:bg-[#1fb85a] rounded-2xl shadow-xl shadow-green-400/30 flex items-center justify-center transition-all duration-300 hover:scale-110 hover:-translate-y-1"
          style={{ width: 52, height: 52 }}
          title="Chat on WhatsApp"
        >
          <MessageCircle className="w-6 h-6 text-white" fill="white" />
        </a>
      </div>
    </>
  );
}
