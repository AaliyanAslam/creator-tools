"use client";

import Image from "next/image";
import { useState } from "react";
import { Menu, X, MessageCircle, Phone, Clock , ChevronRight } from "lucide-react";

const navLinks = [
  { label: "Home", href: "#" },
  { label: "Pricing & Plans", href: "#products" },
  { label: "Contact Us", href: "tel:+923041333420" },
  { label: "FAQs", href: "#" },
];

const socialLinks = [
//   { icon: Facebook, label: "Facebook", href: "#" },
//   { icon: Youtube, label: "YouTube", href: "#" },
//   { icon: Music2, label: "TikTok", href: "#" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      {/* Top Bar */}
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

      {/* Main Navbar */}
      <nav className="sticky top-0 z-30 bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-14 sm:h-16">
          <Image
            src="/logo/ctu1.png"
            width={110}
            height={38}
            alt="Creator Tools by Usama"
            className="object-contain h-8 sm:h-9 w-auto"
          />

          {/* Desktop Navigation */}
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

          {/* Right Side Buttons */}
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

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileOpen(true)}
              className="lg:hidden w-9 h-9 rounded-xl hover:bg-gray-100 flex items-center justify-center transition-colors"
            >
              <Menu className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer */}
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

      {/* Mobile Backdrop */}
      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm lg:hidden"
        />
      )}
    </>
  );
}