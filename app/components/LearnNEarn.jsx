"use client";

import { 
  MessageCircle, 
  ExternalLink, 
  Wrench, 
  BookOpen, 
  Zap, 
  Briefcase, 
  Tag, 
  Smile 
} from "lucide-react";
import { useEffect, useRef } from "react";

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

export default function LearnNEarn() {
  const commRefs = useRef([]);

  useEffect(() => {
    let ctx;
    (async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {
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
            }
          );
        });
      });
    })();

    return () => ctx?.revert();
  }, []);

  return (
    <section className="py-10 sm:py-14 bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
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

        {/* Communities Grid */}
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
  );
}