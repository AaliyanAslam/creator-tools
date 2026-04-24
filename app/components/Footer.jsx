"use client";

import Image from "next/image";
import {
  Phone,
  Clock,
  MessageCircle,
  ChevronRight,
  Instagram,
  Facebook,
  Youtube,
  Music2,
} from "lucide-react";

const navLinks = [
  { label: "Home", href: "#" },
  { label: "Pricing & Plans", href: "#products" },
  { label: "Contact Us", href: "tel:+923193533420" },
];

const socialLinks = [
  { icon: Instagram, label: "Instagram", href: "#" },
  { icon: Facebook, label: "Facebook", href: "#" },
  { icon: Youtube, label: "YouTube", href: "#" },
  { icon: Music2, label: "TikTok", href: "#" },
];

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8 sm:mb-10">
          {/* Logo & About */}
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

            {/* Social Links */}
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

          {/* Quick Links */}
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

          {/* Contact */}
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
                  href="https://wa.me/923193533420"
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

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-5 sm:pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-gray-600 text-[11px] sm:text-xs font-medium text-center sm:text-left">
            © {new Date().getFullYear()} Creator Tools by Usama. All rights
            reserved.
          </p>
          <p
            onClick={() => window.open("https://wa.me/923477071276", "_blank")}
            className="text-gray-700 text-[11px] sm:text-xs font-medium cursor-pointer hover:text-[#25D366] transition-colors"
          >
            Made in Pakistan | Get your professional website today
          </p>
        </div>
      </div>
    </footer>
  );
}
