import { useState, useEffect } from 'react';
import { MapPin, Phone, Mail, Facebook, Instagram, Linkedin, ChevronLeft, ChevronRight, Plus, Stethoscope, Globe } from 'lucide-react';

export function WhatIsDualEducation() {
  return (
    <section className="py-6 overflow-x-hidden bg-bg">
      <div className="max-w-[96%] xl:max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-[2.5rem] overflow-hidden bg-[#0c0a3e] text-white p-8 sm:p-12 lg:p-16 border border-border/30">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-accent-warm/15 via-transparent to-transparent pointer-events-none"></div>
          <div className="relative z-10 flex flex-col lg:flex-row gap-8 lg:gap-16 items-center">
            <div className="lg:w-1/3 text-center lg:text-left">
              <h2 className="text-3xl md:text-4xl font-bold text-white font-heading leading-tight">
                What is <br className="hidden lg:block"/>
                <span className="text-accent-warm">Dual Education?</span>
              </h2>
              <div className="w-12 h-1 bg-accent-warm mt-4 rounded-full mx-auto lg:mx-0"></div>
            </div>
            <div className="lg:w-2/3 grid sm:grid-cols-2 gap-6 lg:gap-8 text-white/95 text-base sm:text-lg leading-snug font-normal text-center sm:text-left">
              <p className="leading-snug">
                Dual education programs combine school-based education (theoretical training) and work-based education (practical training). This system is practiced in several countries, especially in Germany.
              </p>
              <p className="leading-snug">
                It is known worldwide as a highly effective model for combining theory and practice. Through this educational system, the skill gaps existing in the labor market are filled.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function ProgramDetails() {
  return (
    <section className="bg-bg pt-10 lg:pt-14 pb-16 lg:pb-20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between mb-16 gap-8">
          <div className="md:w-1/2 text-center md:text-left">
            <h3 className="text-3xl md:text-4xl font-bold text-primary-dark leading-tight font-heading">
              A modern curriculum<br/> <span className="text-primary">designed for your future</span>
            </h3>
          </div>
          <div className="md:w-1/2 text-center md:text-left">
            <p className="text-lg text-text-secondary border-t-4 md:border-t-0 md:border-l-4 border-primary pt-4 md:pt-0 md:pl-6 py-2 inline-block md:block">
              This program is offered within the framework of vocational high school, specifically grades 10/11 and 12 for the 14-17 age group.
            </p>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {[
            "Dual education according to German standards",
            "Teachers and instructors qualified in Germany",
            "Use of the most modern methods and technologies in the market",
            "Professional training from mentors with practical experience"
          ].map((text, idx) => (
            <div key={idx} className="bg-surface rounded-3xl p-8 flex items-center justify-center md:justify-start text-center md:text-left shadow-soft-lg border border-white hover:shadow-soft-xl transition-shadow">
              <p className="text-text-primary font-medium text-lg">{text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function CareerOpportunities() {
  const [imgSources, setImgSources] = useState<Record<string, string>>({
    "01": "/images/career1.jpg",
    "02": "/images/career2.jpg"
  });

  const fallbacks: Record<string, string> = {
    "01": "https://images.unsplash.com/photo-1584982751601-97dcc096659c?w=800&h=600&fit=crop&q=80",
    "02": "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&h=600&fit=crop&q=80"
  };

  const paths = [
    {
      num: "01",
      title: "Clinical Practice & Partnerships",
      description: "Gain immediate access to premium medical environments and hospitals through our established regional healthcare network.",
      bullets: [
        "Hospital Contractual Agreements",
        "Regional Health Institution Practice",
        "Mentored Clinical Rotations"
      ],
      imgKey: "01"
    },
    {
      num: "02",
      title: "International Career Pathways",
      description: "Leverage your academic and practical achievements to unlock clinical work and training opportunities across Western Europe.",
      bullets: [
        "Clinical practice in Austria & Germany",
        "Recognized European Standards",
        "Academic excellence progression"
      ],
      imgKey: "02"
    }
  ];

  const handleImageError = (key: string) => {
    setImgSources(prev => {
      if (prev[key] === fallbacks[key]) return prev;
      return {
        ...prev,
        [key]: fallbacks[key]
      };
    });
  };

  return (
    <section className="bg-bg py-20 relative border-t border-border/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Eyebrow and Main Header */}
        <div className="text-center mb-16">
          <p className="text-sm font-semibold tracking-widest text-primary uppercase mb-2">You Can Learn Here</p>
          <h2 className="text-3xl md:text-4xl font-bold text-primary-dark">Your Career Path</h2>
        </div>
 
        {/* Content Rows */}
        <div className="space-y-16 max-w-5xl mx-auto mb-16">
          {paths.map((path, idx) => {
            const currentImg = imgSources[path.imgKey];
            return (
              <div 
                key={idx} 
                className={`flex flex-col md:flex-row gap-8 md:gap-10 lg:gap-12 items-center justify-between ${
                  idx % 2 === 1 ? "md:flex-row-reverse" : ""
                }`}
              >
                {/* Image Column - Responsive aspect ratio */}
                <div className="w-full md:w-[40%] lg:w-[35%] flex justify-center">
                  <div className="relative rounded-3xl overflow-hidden shadow-soft w-full max-w-md md:max-w-none aspect-square bg-gradient-to-br from-primary/5 to-secondary/5 border border-border/10">
                    <img 
                      src={currentImg} 
                      alt={path.title} 
                      className="w-full h-full object-cover object-top" 
                      referrerPolicy="no-referrer"
                      onError={() => handleImageError(path.imgKey)}
                    />
                  </div>
                </div>
  
                {/* Text and List Column - More spacious */}
                <div className="w-full md:w-[54%] lg:w-[58%] space-y-4 text-center md:text-left">
                  <h3 className="text-xl lg:text-2xl font-bold text-primary-dark leading-tight">
                    {path.title}
                  </h3>
                  
                  <p className="text-text-secondary text-base leading-relaxed">
                    {path.description}
                  </p>
  
                  <div className="h-[1px] bg-border/60 my-3" />
  
                  {/* Bullets with circular check icons */}
                  <div className="space-y-2.5 pt-1">
                    {path.bullets.map((bullet, bIdx) => (
                      <div key={bIdx} className="flex items-center justify-center md:justify-start gap-3">
                        <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                          <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <span className="text-text-primary font-semibold text-base">{bullet}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
 
        {/* Accredited Diploma Banner */}
        <div className="max-w-4xl mx-auto bg-surface p-8 md:p-10 rounded-[2rem] border border-border/40 shadow-soft relative overflow-hidden text-center">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-accent-warm"></div>
          <p className="text-lg md:text-xl text-text-primary font-medium leading-relaxed">
            Upon completion of schooling, students earn a diploma with the title <br/> 
            <span className="font-bold text-primary-dark text-2xl md:text-3xl mt-3 mb-2 inline-block">"Professional Nursing Associate"</span> <br/> 
            <span className="text-sm text-text-secondary font-normal mt-2 inline-block">which is in accordance with the regulations of the Ministry of Education, Science, Technology and Innovation.</span>
          </p>
        </div>
      </div>
    </section>
  );
}

export function Instructors() {
  const [imgSources, setImgSources] = useState<Record<number, string>>({
    0: "/images/instructor1.jpg",
    1: "/images/instructor2.jpg",
    2: "/images/instructor3.jpg",
    3: "/images/instructor4.jpg",
    4: "/images/instructor5.jpg",
    5: "/images/instructor6.jpg"
  });

  const fallbacks: Record<number, string> = {
    0: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=400&h=400&fit=crop&q=80",
    1: "https://images.unsplash.com/photo-1594824813573-246434de83fb?w=400&h=400&fit=crop&q=80",
    2: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=400&h=400&fit=crop&q=80",
    3: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop&q=80",
    4: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop&q=80",
    5: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop&q=80"
  };

  const educators = [
    { 
      name: "Dr. Arben K.", 
      role: "Head of Nursing", 
      index: 0 
    },
    { 
      name: "Prof. Lindita M.", 
      role: "Clinical Lead", 
      index: 1 
    },
    { 
      name: "Dr. Stefan W.", 
      role: "German Coordinator", 
      index: 2 
    },
    { 
      name: "MSc. Besa R.", 
      role: "Practical Instructor", 
      index: 3 
    },
    { 
      name: "Dr. Valbona N.", 
      role: "Pediatrics Lead", 
      index: 4 
    },
    { 
      name: "MSc. Ilir B.", 
      role: "Anatomy Instructor", 
      index: 5 
    },
  ];

  const handleImageError = (index: number) => {
    setImgSources(prev => {
      if (prev[index] === fallbacks[index]) return prev;
      return {
        ...prev,
        [index]: fallbacks[index]
      };
    });
  };

  const [startIndex, setStartIndex] = useState(0);
  const [itemsToShow, setItemsToShow] = useState(4);

  useEffect(() => {
    const updateItems = () => {
      if (window.innerWidth >= 1024) {
        setItemsToShow(4);
      } else if (window.innerWidth >= 640) {
        setItemsToShow(2);
      } else {
        setItemsToShow(1);
      }
    };
    updateItems();
    window.addEventListener('resize', updateItems);
    return () => window.removeEventListener('resize', updateItems);
  }, []);

  const maxIndex = Math.max(0, educators.length - itemsToShow);

  useEffect(() => {
    setStartIndex((prev) => Math.min(prev, maxIndex));
  }, [itemsToShow, maxIndex]);

  const handlePrev = () => {
    setStartIndex((prev) => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setStartIndex((prev) => Math.min(maxIndex, prev + 1));
  };

  return (
    <section className="py-16 lg:py-20 bg-bg overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-dark">Meet Our Expert Instructors</h2>
          <p className="text-text-secondary text-base max-w-lg mx-auto mt-2">Learn directly from highly qualified healthcare professionals with years of German and regional clinical experience.</p>
        </div>

        {/* Carousel Container with responsive padding */}
        <div className="relative px-2 sm:px-10">
          {/* Left Arrow Button */}
          {startIndex > 0 && (
            <button 
              onClick={handlePrev}
              className="absolute left-0 lg:-left-2 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white border border-border/60 shadow-[0_2px_8px_rgba(0,0,0,0.08)] flex items-center justify-center text-primary-dark hover:text-primary hover:border-primary/40 transition-colors duration-200 cursor-pointer"
              aria-label="Previous instructors"
            >
              <ChevronLeft size={22} />
            </button>
          )}

          {/* Right Arrow Button */}
          {startIndex < maxIndex && (
            <button 
              onClick={handleNext}
              className="absolute right-0 lg:-right-2 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white border border-border/60 shadow-[0_2px_8px_rgba(0,0,0,0.08)] flex items-center justify-center text-primary-dark hover:text-primary hover:border-primary/40 transition-colors duration-200 cursor-pointer"
              aria-label="Next instructors"
            >
              <ChevronRight size={22} />
            </button>
          )}

          {/* Viewport wrapper */}
          <div className="overflow-hidden">
            {/* Sliding Track */}
            <div 
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${startIndex * (100 / itemsToShow)}%)` }}
            >
              {educators.map((ed, idx) => (
                <div 
                  key={idx} 
                  className="shrink-0 p-2"
                  style={{ width: `${100 / itemsToShow}%` }}
                >
                  <div className="bg-surface rounded-3xl overflow-hidden border border-border/50 group cursor-pointer transition-all duration-300 flex flex-col h-full hover:border-primary/40">
                    {/* Image Section */}
                    <div className="aspect-square overflow-hidden relative">
                      <div className="absolute inset-0 bg-secondary/5 group-hover:bg-transparent transition-colors z-10"></div>
                      <img 
                        src={imgSources[ed.index]} 
                        alt={ed.name} 
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out object-top" 
                        referrerPolicy="no-referrer"
                        onError={() => handleImageError(ed.index)}
                      />
                    </div>

                    {/* Text & Content Section */}
                    <div className="p-5 text-left relative bg-surface flex-1 flex flex-col justify-between">
                      <div>
                        <h3 className="text-lg font-bold text-primary-dark mb-1">{ed.name}</h3>
                        <p className="text-sm text-text-secondary font-normal mb-3">{ed.role}</p>
                      </div>
                      
                      <div className="mt-2 flex items-center text-primary font-medium text-sm group-hover:text-accent-warm transition-colors">
                        Expert teacher <span className="ml-1 group-hover:translate-x-1 transition-transform">→</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Carousel Pagination Dots */}
        {maxIndex > 0 && (
          <div className="flex justify-center gap-2 mt-8">
            {Array.from({ length: maxIndex + 1 }).map((_, idx) => (
              <button
                key={idx}
                onClick={() => setStartIndex(idx)}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                  idx === startIndex ? 'bg-primary w-6' : 'bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Go to slide group ${idx + 1}`}
              />
            ))}
          </div>
        )}

      </div>
    </section>
  );
}

export function FAQ({ onContactClick }: { onContactClick?: () => void }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: "How does the dual education system work?",
      answer: "Our students split their training between classroom-based theory on campus and fully structured, paid clinical rotations at partnered regional healthcare institutions."
    },
    {
      question: "Are the certifications recognized in Germany?",
      answer: "Yes, our programs are designed strictly to match European and German clinical standards, giving graduates a direct pathway to international careers."
    },
    {
      question: "What are the requirements to enroll?",
      answer: "We welcome high school graduates and active healthcare professionals. Admissions are based on previous academic performance and a friendly introductory interview."
    },
    {
      question: "Is language training included in the curriculum?",
      answer: "Absolutely. Since our programs align with German standards, we offer intensive integrated German language modules to prepare you for international licensing."
    }
  ];

  return (
    <section className="py-16 lg:py-24 bg-bg border-t border-border/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Heading Info */}
          <div className="lg:col-span-5 text-left">
            <p className="text-sm font-semibold tracking-widest text-primary uppercase mb-2">FAQ</p>
            <h2 className="text-3xl md:text-4xl font-bold text-primary-dark font-heading leading-tight mb-4">
              Quick answers to important questions
            </h2>
            <p className="text-text-secondary text-base leading-relaxed mb-6">
              Find essential details about academic structure, European qualification standards, language integration, and practical rotations below.
            </p>
            <div 
              onClick={onContactClick}
              className="inline-flex items-center gap-2 text-primary font-semibold text-sm hover:text-accent-warm transition-colors cursor-pointer"
            >
              Have another question? Let's talk <span className="text-lg">→</span>
            </div>
          </div>

          {/* Right Column: Accordion Items */}
          <div className="lg:col-span-7 space-y-4">
            {faqs.map((faq, idx) => {
              const isOpen = openIndex === idx;
              return (
                <div 
                  key={idx}
                  className={`border border-border/40 rounded-2xl transition-all duration-300 ${
                    isOpen ? 'bg-surface shadow-soft' : 'bg-surface/50 hover:bg-surface'
                  }`}
                >
                  <button
                    onClick={() => setOpenIndex(isOpen ? null : idx)}
                    className="w-full py-5 px-6 flex items-center justify-between text-left font-heading font-semibold text-primary-dark text-base sm:text-lg focus:outline-none cursor-pointer"
                  >
                    <span>{faq.question}</span>
                    <span className={`ml-4 shrink-0 flex items-center justify-center w-8 h-8 rounded-full transition-all duration-300 ${
                      isOpen ? 'bg-primary/10 text-primary rotate-45' : 'bg-gray-100 text-text-secondary'
                    }`}>
                      <Plus size={18} className="transition-transform duration-300" />
                    </span>
                  </button>
                  <div 
                    className={`overflow-hidden transition-all duration-300 ease-in-out ${
                      isOpen ? 'max-h-40 border-t border-border/20 opacity-100' : 'max-h-0 opacity-0'
                    }`}
                  >
                    <div className="p-6 text-sm sm:text-base text-text-secondary leading-relaxed bg-surface/40">
                      {faq.answer}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}

export function CTAAndFooter({ onApplyClick }: { onApplyClick?: () => void }) {
  return (
    <footer className="bg-[#0c0a3e] pt-20 pb-10 mt-12 text-center md:text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-12 mb-16">
          <div className="md:col-span-1 flex flex-col items-center md:items-start">
            <div className="flex items-center gap-2 mb-6 justify-center md:justify-start">
              <img src="/images/aph.logo-negative.png" alt="Heimerer Logo" className="h-10 w-auto brightness-0 invert" />
            </div>
            <ul className="space-y-4 w-full flex flex-col items-center md:items-start">
              <li className="flex items-start gap-3 text-white/60 justify-center md:justify-start text-left md:text-left">
                <MapPin size={20} className="shrink-0 text-white mt-1" />
                <span>Ukshin Hoti Street, Prishtina, Kosovo</span>
              </li>
              <li className="flex items-center gap-3 text-white/60 justify-center md:justify-start">
                <Phone size={20} className="shrink-0 text-white" />
                <span>+383 44 123 456</span>
              </li>
              <li className="flex items-center gap-3 text-white/60 justify-center md:justify-start">
                <Mail size={20} className="shrink-0 text-white" />
                <span>info@heimerer.edu</span>
              </li>
            </ul>
          </div>

          <div className="text-center md:text-left">
            <h3 className="text-white font-bold text-lg mb-6">Programs</h3>
            <ul className="space-y-4">
              <li><a href="#" className="text-white/60 hover:text-white transition-colors">Nursing</a></li>
              <li><a href="#" className="text-white/60 hover:text-white transition-colors">Medical Assistant</a></li>
              <li><a href="#" className="text-white/60 hover:text-white transition-colors">Dental Hygiene</a></li>
              <li><a href="#" className="text-white/60 hover:text-white transition-colors">Elderly Care</a></li>
            </ul>
          </div>

          <div className="text-center md:text-left">
            <h3 className="text-white font-bold text-lg mb-6">Information</h3>
            <ul className="space-y-4">
              <li><a href="#" className="text-white/60 hover:text-white transition-colors">About Us</a></li>
              <li><a href="#" className="text-white/60 hover:text-white transition-colors">Admissions</a></li>
              <li><a href="#" className="text-white/60 hover:text-white transition-colors">Dual Study</a></li>
              <li><a href="#" className="text-white/60 hover:text-white transition-colors">News & Events</a></li>
            </ul>
          </div>

          <div className="text-center md:text-left flex flex-col items-center md:items-start">
            <h3 className="text-white font-bold text-lg mb-6">Follow Us</h3>
            <div className="flex space-x-4 justify-center md:justify-start">
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-primary transition-colors"><Facebook size={18} /></a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-primary transition-colors"><Instagram size={18} /></a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-primary transition-colors"><Linkedin size={18} /></a>
            </div>
            <div className="mt-8 w-full max-w-xs md:max-w-none">
              <button 
                onClick={onApplyClick}
                className="bg-success hover:bg-green-500 text-white px-8 py-3 rounded-full font-bold transition-colors shadow-lg cursor-pointer w-full text-center"
              >
                APPLY NOW
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center text-white/60 text-sm text-center md:text-left">
          <p className="mb-4 md:mb-0">&copy; {new Date().getFullYear()} Heimerer Professional Academy.</p>
          <div className="space-x-6">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
