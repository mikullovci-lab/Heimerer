import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';

export function Hero({ onApplyClick }: { onApplyClick?: () => void }) {
  const [imgUrls, setImgUrls] = useState<string[]>([
    "/images/hero1.jpg",
    "/images/hero2.jpg",
    "/images/hero3.jpg"
  ]);

  const fallbacks = [
    "https://images.unsplash.com/photo-1527613426441-4da17471b66d?w=1600&h=900&fit=crop&q=80",
    "https://images.unsplash.com/photo-1581056771107-24ca5f033842?w=1600&h=900&fit=crop&q=80",
    "https://images.unsplash.com/photo-1516534775068-ba3e84589d90?w=1600&h=900&fit=crop&q=80"
  ];

  const images = [
    {
      url: imgUrls[0],
      alt: "Cheerful college students studying together"
    },
    {
      url: imgUrls[1],
      alt: "College student group collaborating"
    },
    {
      url: imgUrls[2],
      alt: "Youth students laughing at college campus"
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-scroll images every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [images.length]);

  const handleImageError = (index: number) => {
    setImgUrls(prev => {
      const copy = [...prev];
      if (copy[index] !== fallbacks[index]) {
        copy[index] = fallbacks[index];
      }
      return copy;
    });
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  return (
    <section className="pt-2 pb-4 lg:pt-4 lg:pb-8 overflow-x-hidden bg-bg">
      <div className="max-w-[96%] xl:max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Full-width container with 20% less height than 16:9 (aspect-[2.2/1] on large screens) */}
        <div className="relative bg-white rounded-[2.5rem] flex flex-col justify-center overflow-hidden border border-border/40 min-h-[460px] lg:min-h-0 lg:aspect-[2.2/1] group">
          
          {/* Background image slider */}
          <div className="absolute inset-0 w-full h-full z-0">
            {images.map((image, index) => (
              <div
                key={index}
                className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
                  index === currentIndex ? 'opacity-100' : 'opacity-0 pointer-events-none'
                }`}
              >
                <img 
                  src={image.url} 
                  alt={image.alt} 
                  className="w-full h-full object-cover object-center"
                  referrerPolicy="no-referrer"
                  onError={() => handleImageError(index)}
                />
              </div>
            ))}
          </div>
          
          {/* Content panel - Removed to allow custom text within slide images directly */}
          <div className="relative z-10 w-full lg:w-[55%] p-8 sm:p-12 lg:p-20 flex flex-col justify-center h-full rounded-[2.5rem]" />

          {/* Navigation Controls */}
          <div className="absolute bottom-6 right-6 z-20 flex items-center gap-4 bg-white/90 backdrop-blur-sm px-4 py-2.5 rounded-full border border-border/50 shadow-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <button 
              onClick={handlePrev}
              className="p-1 hover:bg-gray-100 rounded-full transition-colors cursor-pointer text-primary-dark"
              aria-label="Previous image"
            >
              <ChevronLeft size={20} />
            </button>
            
            {/* Dots */}
            <div className="flex gap-2">
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={(e) => {
                    e.stopPropagation();
                    setCurrentIndex(index);
                  }}
                  className={`w-2.5 h-2.5 rounded-full transition-all cursor-pointer ${
                    index === currentIndex ? 'bg-primary w-6' : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>

            <button 
              onClick={handleNext}
              className="p-1 hover:bg-gray-100 rounded-full transition-colors cursor-pointer text-primary-dark"
              aria-label="Next image"
            >
              <ChevronRight size={20} />
            </button>
          </div>

        </div>
      </div>

      {/* Much smaller, compact stats block overlapping the hero */}
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 relative -mt-8 lg:-mt-10 z-20">
        <div className="bg-white rounded-2xl p-4 lg:p-5 flex flex-row justify-between items-center gap-2 border border-border/50 shadow-[0_1px_3px_rgba(0,0,0,0),_0_1px_25px_-1px_rgba(0,0,0,0.08)]">
          
          <div className="text-center flex-1">
            <div className="text-2xl lg:text-3xl font-heading font-bold text-primary-dark">95%</div>
            <div className="text-text-secondary text-[10px] lg:text-xs font-semibold uppercase tracking-wider mt-0.5">Employment Rate</div>
          </div>
          
          <div className="w-px h-8 bg-border/80"></div>
          
          <div className="text-center flex-1">
            <div className="text-2xl lg:text-3xl font-heading font-bold text-primary-dark">500+</div>
            <div className="text-text-secondary text-[10px] lg:text-xs font-semibold uppercase tracking-wider mt-0.5">Active Students</div>
          </div>
          
          <div className="w-px h-8 bg-border/80"></div>
          
          <div className="text-center flex-1">
            <div className="text-2xl lg:text-3xl font-heading font-bold text-primary-dark">20+</div>
            <div className="text-text-secondary text-[10px] lg:text-xs font-semibold uppercase tracking-wider mt-0.5">Clinical Partners</div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
