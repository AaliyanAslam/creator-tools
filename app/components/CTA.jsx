"use client";

import { MessageCircle, Phone } from "lucide-react";

export default function CTA() {
  return (
    <section className="py-8 sm:py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative bg-[#ED1C24] rounded-2xl sm:rounded-3xl overflow-hidden py-10 sm:py-14 px-5 sm:px-10 lg:px-14 text-center">
          
          {/* Background Pattern */}
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
  );
}