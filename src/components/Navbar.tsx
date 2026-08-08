import { Menu, X, ArrowRight } from 'lucide-react';
import { useState } from 'react';

export function Navbar({ onApplyClick }: { onApplyClick?: () => void }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-bg py-6">
      <div className="max-w-[96%] xl:max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <a href="#" className="flex items-center gap-3">
              <img src="/images/aph.logo.png" alt="Heimerer Logo" className="h-10 w-auto" />
            </a>
          </div>
          
          <div className="hidden md:flex items-center space-x-10">
            <a href="#programs" className="text-text-primary hover:text-primary transition-colors font-medium text-base">Programs</a>
            <a href="#dual-study" className="text-text-primary hover:text-primary transition-colors font-medium text-base">Dual Study</a>
            <a href="#about" className="text-text-primary hover:text-primary transition-colors font-medium text-base">About</a>
            <a href="#admissions" className="text-text-primary hover:text-primary transition-colors font-medium text-base">Admissions</a>
          </div>

          <div className="hidden md:flex items-center space-x-4">
             <button 
               onClick={onApplyClick}
               className="text-text-primary bg-transparent hover:bg-gray-100 px-6 py-2.5 font-medium text-sm transition-colors rounded-full cursor-pointer"
             >
              Contact Us
            </button>
            <button 
              onClick={onApplyClick}
              className="bg-primary-dark hover:bg-secondary text-white px-6 py-2.5 rounded-full font-medium text-sm transition-colors cursor-pointer flex items-center gap-2"
            >
              Apply Now <ArrowRight size={16} />
            </button>
          </div>

          <div className="flex items-center md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-text-primary p-2 cursor-pointer hover:bg-gray-100 rounded-full">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden px-4 mt-2 relative z-50">
          <div className="bg-surface rounded-2xl p-4 flex flex-col space-y-4">
            <a href="#programs" className="text-text-primary font-medium p-2 hover:bg-gray-50 rounded-lg">Programs</a>
            <a href="#dual-study" className="text-text-primary font-medium p-2 hover:bg-gray-50 rounded-lg">Dual Study</a>
            <a href="#about" className="text-text-primary font-medium p-2 hover:bg-gray-50 rounded-lg">About</a>
            <a href="#admissions" className="text-text-primary font-medium p-2 hover:bg-gray-50 rounded-lg">Admissions</a>
            <div className="grid grid-cols-2 gap-2 mt-2">
              <button 
                onClick={() => {
                  setIsOpen(false);
                  onApplyClick?.();
                }}
                className="text-text-primary px-4 py-2.5 rounded-full font-medium cursor-pointer hover:bg-gray-100"
              >
                Contact
              </button>
              <button 
                onClick={() => {
                  setIsOpen(false);
                  onApplyClick?.();
                }}
                className="bg-primary-dark text-white px-4 py-2.5 rounded-full font-medium cursor-pointer"
              >
                Apply Now
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
