"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Star, Quote, X } from "lucide-react";

const Reviews = () => {
  const scrollRef = useRef(null);
  const [showLeftBtn, setShowLeftBtn] = useState(false);
  const [showRightBtn, setShowRightBtn] = useState(true);
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);

  // Generate image paths r1.jpg to r8.jpg
  const reviewImages = Array.from(
    { length: 8 },
    (_, i) => `/reviews/r${i + 1}.jpeg`,
  );

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setShowLeftBtn(scrollLeft > 10);
      setShowRightBtn(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    const node = scrollRef.current;
    if (node) {
      node.addEventListener("scroll", checkScroll);
      return () => node.removeEventListener("scroll", checkScroll);
    }
  }, []);

  // Handle Escape key to close modal
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        setSelectedImageIndex(null);
      }
    };

    if (selectedImageIndex !== null) {
      document.addEventListener("keydown", handleEscape);
      return () => document.removeEventListener("keydown", handleEscape);
    }
  }, [selectedImageIndex]);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { clientWidth } = scrollRef.current;
      const scrollAmount =
        direction === "left" ? -clientWidth / 1.5 : clientWidth / 1.5;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  const handlePrevImage = () => {
    setSelectedImageIndex((prev) =>
      prev === 0 ? reviewImages.length - 1 : prev - 1,
    );
  };

  const handleNextImage = () => {
    setSelectedImageIndex((prev) =>
      prev === reviewImages.length - 1 ? 0 : prev + 1,
    );
  };

  return (
    <section id="reviews" className="relative py-8 sm:py-12 md:py-14 lg:py-16 bg-white overflow-hidden">
      {/* Background Decorative Element */}
      <div
        className="absolute top-0 right-0 w-48 sm:w-56 md:w-64 h-48 sm:h-56 md:h-64 pointer-events-none -z-10"
        style={{
          background: "radial-gradient(circle, #ED1C24 0%, transparent 70%)",
          filter: "blur(80px)",
          opacity: 0.05,
        }}
      />

      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
        {/* Heading Section */}
        <div className="text-center mb-6 sm:mb-8 md:mb-10 lg:mb-12">
          <div className="inline-flex items-center gap-1.5 sm:gap-2 bg-red-50 text-[#ED1C24] px-2.5 sm:px-4 py-1 sm:py-1.5 rounded-full text-[11px] sm:text-xs md:text-sm font-bold mb-2 sm:mb-3 md:mb-4">
            <Star className="w-3 h-3 sm:w-4 sm:h-4 fill-[#ED1C24]" />
            <span>Trusted by 10,000+ Users</span>
          </div>
          <h2 className="text-xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-gray-900 tracking-tighter mb-2 sm:mb-3">
            Our Customers <span className="text-[#ED1C24]">Reviews</span>
          </h2>
          <p className="text-gray-500 mt-2 sm:mt-3 md:mt-4 max-w-2xl mx-auto font-medium text-xs sm:text-sm md:text-base px-2">
            Real feedback from our premium community. Check why we are the #1
            choice for digital tools in Pakistan.
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative group">
          {/* Left Button */}
          {showLeftBtn && (
            <button
              onClick={() => scroll("left")}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-white/90 hover:bg-[#ED1C24] hover:text-white text-gray-900 p-2 sm:p-3 rounded-full shadow-lg md:shadow-xl transition-all duration-300 hidden sm:flex items-center justify-center border border-gray-100 ml-1 sm:ml-2 md:ml-4"
            >
              <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
            </button>
          )}

          {/* Right Button */}
          {showRightBtn && (
            <button
              onClick={() => scroll("right")}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-white/90 hover:bg-[#ED1C24] hover:text-white text-gray-900 p-2 sm:p-3 rounded-full shadow-lg md:shadow-xl transition-all duration-300 hidden sm:flex items-center justify-center border border-gray-100 mr-1 sm:mr-2 md:mr-4"
            >
              <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
            </button>
          )}

          {/* Scrollable Area - with smooth scrolling */}
          <div
            ref={scrollRef}
            className="flex gap-2 sm:gap-3 md:gap-4 lg:gap-6 overflow-x-auto scrollbar-hide snap-x snap-mandatory px-2 sm:px-3 md:px-4 lg:px-0 pb-4 sm:pb-6 md:pb-8 cursor-grab active:cursor-grabbing"
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
              WebkitOverflowScrolling: "touch",
              scrollBehavior: "smooth",
            }}
          >
            {reviewImages.map((src, index) => (
              <div
                key={index}
                className="min-w-[160px] sm:min-w-[220px] md:min-w-[300px] lg:min-w-[380px] snap-center flex-shrink-0"
              >
                <div
                  className="relative aspect-[9/16] rounded-lg sm:rounded-xl md:rounded-2xl overflow-hidden border-2 sm:border-3 md:border-4 border-white shadow-md hover:shadow-xl sm:hover:shadow-2xl transition-shadow duration-500 bg-gray-100 group/card cursor-pointer"
                  onClick={() => setSelectedImageIndex(index)}
                >
                  {/* Overlay for aesthetic */}
                  <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-500" />

                  <Image
                    src={src}
                    alt={`Customer Review ${index + 1}`}
                    fill
                    className="object-cover transition-transform duration-700 group-hover/card:scale-105"
                    sizes="(max-width: 640px) 160px, (max-width: 768px) 220px, (max-width: 1024px) 300px, 380px"
                    priority={index < 2}
                  />

                  {/* Top Quote Icon Badge */}
                  <div className="absolute top-2 sm:top-3 md:top-4 right-2 sm:right-3 md:right-4 bg-white/90 backdrop-blur-sm p-1.5 sm:p-2 rounded-lg sm:rounded-xl shadow-sm">
                    <Quote className="w-3 h-3 sm:w-4 sm:h-4 text-[#ED1C24] fill-[#ED1C24]" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Trust Line */}
        <div className="mt-4 sm:mt-6 md:mt-8 flex justify-center items-center gap-2 sm:gap-3 md:gap-4 text-gray-400">
          <div className="h-[1px] w-8 sm:w-10 md:w-12 bg-gray-200" />
          <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest whitespace-nowrap">
            Swipe to see more
          </span>
          <div className="h-[1px] w-8 sm:w-10 md:w-12 bg-gray-200" />
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedImageIndex !== null && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 sm:p-6 backdrop-blur-sm"
          onClick={() => setSelectedImageIndex(null)}
        >
          {/* Close Button */}
          <button
            onClick={() => setSelectedImageIndex(null)}
            className="absolute top-4 sm:top-6 right-4 sm:right-6 z-51 bg-white/10 hover:bg-white/20 text-white p-2 sm:p-3 rounded-full transition-colors duration-200 hover:backdrop-blur-md"
          >
            <X className="w-6 h-6 sm:w-8 sm:h-8" />
          </button>

          {/* Main Image Container */}
          <div
            className="relative w-full h-full max-w-2xl max-h-[90vh] flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Image */}
            <div className="relative w-full h-full">
              <Image
                src={reviewImages[selectedImageIndex]}
                alt={`Full View - Review ${selectedImageIndex + 1}`}
                fill
                className="object-contain"
                sizes="(max-width: 768px) 90vw, 90vh"
              />
            </div>

            {/* Left Navigation Arrow */}
            <button
              onClick={handlePrevImage}
              className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/30 text-white p-2 sm:p-3 rounded-full transition-colors duration-200 hover:backdrop-blur-md group"
            >
              <ChevronLeft className="w-6 h-6 sm:w-8 sm:h-8" />
            </button>

            {/* Right Navigation Arrow */}
            <button
              onClick={handleNextImage}
              className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/30 text-white p-2 sm:p-3 rounded-full transition-colors duration-200 hover:backdrop-blur-md group"
            >
              <ChevronRight className="w-6 h-6 sm:w-8 sm:h-8" />
            </button>

            {/* Image Counter */}
            <div className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 bg-black/50 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-full text-sm sm:text-base font-semibold backdrop-blur-md">
              {selectedImageIndex + 1} / {reviewImages.length}
            </div>
          </div>
        </div>
      )}

      {/* Custom CSS for hiding scrollbar and smooth thumb scrolling */}
      <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }

        .scrollbar-hide::-webkit-scrollbar-track {
          background: transparent;
        }

        .scrollbar-hide::-webkit-scrollbar-thumb {
          background: #ed1c24;
          border-radius: 10px;
        }

        /* Smooth scroll for thumb */
        .scrollbar-hide {
          -webkit-overflow-scrolling: touch;
          scroll-behavior: smooth;
        }
      `}</style>
    </section>
  );
};

export default Reviews;
