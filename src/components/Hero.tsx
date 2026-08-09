import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Phone, Mail } from 'lucide-react';

interface SlideData {
  url: string;
  alt: string;
  subtitle: string;
  title: string;
  buttonColor: string;
  buttonHoverColor: string;
  buttonText: string;
}

function AnimatedCounter({ end, suffix = "" }: { end: number; suffix?: string }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTimestamp: number | null = null;
    const duration = 1800; // 1.8 seconds ease out counter

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const easeOut = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(easeOut * end));

      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        setCount(end);
      }
    };

    const animFrame = window.requestAnimationFrame(step);
    return () => window.cancelAnimationFrame(animFrame);
  }, [end]);

  return <>{count}{suffix}</>;
}

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

  const slides: SlideData[] = [
    {
      url: imgUrls[0],
      alt: "Professional Nursing Associate - Akademia Profesionale Heimerer",
      subtitle: "START YOUR FUTURE AS",
      title: "PROFESSIONAL NURSING ASSOCIATE",
      buttonColor: "bg-[#00aa8a]",
      buttonHoverColor: "hover:bg-[#00967a]",
      buttonText: "REGISTER NOW"
    },
    {
      url: imgUrls[1],
      alt: "Physiotherapy Assistant - Akademia Profesionale Heimerer",
      subtitle: "START YOUR FUTURE AS",
      title: "PHYSIOTHERAPY ASSISTANT",
      buttonColor: "bg-[#00aa8a]",
      buttonHoverColor: "hover:bg-[#00967a]",
      buttonText: "REGISTER NOW"
    },
    {
      url: imgUrls[2],
      alt: "Medical Laboratory Technician - Akademia Profesionale Heimerer",
      subtitle: "START YOUR FUTURE AS",
      title: "MEDICAL LABORATORY TECHNICIAN",
      buttonColor: "bg-[#00aa8a]",
      buttonHoverColor: "hover:bg-[#00967a]",
      buttonText: "REGISTER NOW"
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-scroll images every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [slides.length]);

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
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  };

  return (
    <section className="pt-2 pb-4 lg:pt-4 lg:pb-8 overflow-x-hidden bg-bg">
      <div className="max-w-[96%] xl:max-w-[1400px] mx-auto px-2 sm:px-6 lg:px-8">
        
        {/* Full-width container with ~35% height reduction on mobile (min-h-[290px] sm:min-h-[380px] lg:min-h-0 lg:aspect-[2.2/1]) */}
        <div className="relative bg-white rounded-[1.8rem] sm:rounded-[2.5rem] flex flex-col justify-center overflow-hidden border border-border/40 min-h-[290px] sm:min-h-[380px] lg:min-h-0 lg:aspect-[2.2/1] group shadow-none">
          
          {/* Background image slider */}
          <div className="absolute inset-0 w-full h-full z-0">
            {slides.map((slide, index) => (
              <div
                key={index}
                className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
                  index === currentIndex ? 'opacity-100' : 'opacity-0 pointer-events-none'
                }`}
              >
                <img 
                  src={slide.url} 
                  alt={slide.alt} 
                  className="w-full h-full object-cover object-center"
                  referrerPolicy="no-referrer"
                  onError={() => handleImageError(index)}
                />
              </div>
            ))}
          </div>

          {/* Left light gradient mask ensuring clean legibility for overlay text */}
          <div className="absolute inset-0 z-1 bg-gradient-to-r from-white/95 via-white/85 to-transparent sm:from-white/90 sm:via-white/60 lg:via-white/30 max-w-full sm:max-w-[75%] lg:max-w-[70%] pointer-events-none" />
          
          {/* Slide Text Content Overlay */}
          <div className="relative z-10 w-full sm:w-[70%] lg:w-[62%] xl:w-[65%] p-5 sm:p-10 lg:p-16 flex flex-col justify-center h-full">
            {slides.map((slide, index) => (
              <div
                key={index}
                className={`transition-all duration-700 ease-out flex flex-col justify-center ${
                  index === currentIndex 
                    ? 'opacity-100 translate-x-0' 
                    : 'opacity-0 -translate-x-4 absolute pointer-events-none'
                }`}
              >
                {/* Subtitle */}
                <span className="font-sans italic font-bold tracking-wider text-slate-800 text-[11px] sm:text-sm lg:text-base uppercase">
                  {slide.subtitle}
                </span>

                {/* Main Program Title */}
                <h1 className="font-sans font-extrabold uppercase text-[#0084FF] text-lg sm:text-2xl md:text-3xl lg:text-[2.7rem] xl:text-[3.1rem] leading-[1.08] my-1.5 sm:my-3 max-w-xl xl:max-w-2xl">
                  {slide.title}
                </h1>

                {/* Action Register Button */}
                <div className="mt-1 sm:mt-2">
                  <button
                    onClick={onApplyClick}
                    className={`inline-flex items-center justify-center px-5 py-2 sm:px-7 sm:py-2.5 rounded-full text-white font-black text-[11px] sm:text-xs lg:text-sm uppercase tracking-wider ${slide.buttonColor} ${slide.buttonHoverColor} transition-all transform hover:-translate-y-0.5 cursor-pointer active:scale-95`}
                  >
                    {slide.buttonText}
                  </button>
                </div>

                {/* Contact Phone & Email */}
                <div className="mt-2.5 sm:mt-4 space-y-0.5 font-sans italic text-slate-800 text-[11px] sm:text-xs lg:text-sm font-semibold">
                  <div>
                    <a href="tel:+38348424924" className="hover:text-primary transition-colors inline-flex items-center gap-1.5">
                      +38348424924
                    </a>
                  </div>
                  <div>
                    <a href="mailto:info@akademia-profesionale.eu" className="hover:text-primary transition-colors inline-flex items-center gap-1.5">
                      info@akademia-profesionale.eu
                    </a>
                  </div>
                </div>

              </div>
            ))}
          </div>

          {/* Navigation Controls */}
          <div className="absolute bottom-3 right-3 sm:bottom-6 sm:right-6 z-20 flex items-center gap-2 sm:gap-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 sm:px-4 sm:py-2.5 rounded-full border border-border/50 opacity-90 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-300">
            <button 
              onClick={handlePrev}
              className="p-1 hover:bg-gray-100 rounded-full transition-colors cursor-pointer text-primary-dark"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
            
            {/* Dots */}
            <div className="flex gap-1.5 sm:gap-2">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={(e) => {
                    e.stopPropagation();
                    setCurrentIndex(index);
                  }}
                  className={`h-2 rounded-full transition-all cursor-pointer ${
                    index === currentIndex ? 'bg-[#00aa8a] w-5 sm:w-6' : 'bg-gray-300 hover:bg-gray-400 w-2'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>

            <button 
              onClick={handleNext}
              className="p-1 hover:bg-gray-100 rounded-full transition-colors cursor-pointer text-primary-dark"
              aria-label="Next slide"
            >
              <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>

        </div>
      </div>

      {/* Stats block overlapping the hero */}
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 relative -mt-6 sm:-mt-8 lg:-mt-10 z-20">
        <div className="bg-white rounded-2xl p-3.5 sm:p-4 lg:p-5 flex flex-row justify-between items-center gap-2 border border-border/50 shadow-[0_1px_3px_0_rgba(0,0,0,0),_0_1px_25px_-1px_rgba(0,0,0,0.08)]">
          
          <div className="text-center flex-1">
            <div className="text-xl sm:text-2xl lg:text-3xl font-heading font-bold text-primary-dark">
              <AnimatedCounter end={95} suffix="%" />
            </div>
            <div className="text-text-secondary text-[9px] sm:text-[10px] lg:text-xs font-semibold uppercase tracking-wider mt-0.5">Employment Rate</div>
          </div>
          
          <div className="w-px h-8 bg-border/80"></div>
          
          <div className="text-center flex-1">
            <div className="text-xl sm:text-2xl lg:text-3xl font-heading font-bold text-primary-dark">
              <AnimatedCounter end={500} suffix="+" />
            </div>
            <div className="text-text-secondary text-[9px] sm:text-[10px] lg:text-xs font-semibold uppercase tracking-wider mt-0.5">Active Students</div>
          </div>
          
          <div className="w-px h-8 bg-border/80"></div>
          
          <div className="text-center flex-1">
            <div className="text-xl sm:text-2xl lg:text-3xl font-heading font-bold text-primary-dark">
              <AnimatedCounter end={20} suffix="+" />
            </div>
            <div className="text-text-secondary text-[9px] sm:text-[10px] lg:text-xs font-semibold uppercase tracking-wider mt-0.5">Clinical Partners</div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
