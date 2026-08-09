import React, { useState } from 'react';
import { X, Check, ArrowRight, ArrowLeft, GraduationCap, Stethoscope, Beaker, MapPin, Phone, Mail, Calendar, User } from 'lucide-react';

interface ApplicationModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialProgram?: string | null;
}

export function ApplicationModal({ isOpen, onClose, initialProgram }: ApplicationModalProps) {
  const [step, setStep] = useState(1);
  const [selectedProgram, setSelectedProgram] = useState<string>(initialProgram || '');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    birthYear: '',
    city: '',
    highSchoolStream: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const programs = [
    {
      id: 'nursing',
      title: 'Professional Nursing Associate',
      titleSq: 'Bashkëpunëtor Profesional i Infermierisë',
      icon: Stethoscope,
      description: 'Acquire hands-on training and clinical knowledge based on rigorous German nursing guidelines.',
      color: 'from-blue-500/10 to-indigo-500/10 text-indigo-600 border-indigo-100'
    },
    {
      id: 'lab',
      title: 'Medical Laboratory Technician',
      titleSq: 'Teknik i Laboratorit Mjekësor',
      icon: Beaker,
      description: 'Master diagnostic technology, specimen analysis, and clinical chemistry in modern lab settings.',
      color: 'from-emerald-500/10 to-teal-500/10 text-emerald-600 border-emerald-100'
    },
    {
      id: 'physio',
      title: 'Physiotherapy Assistant',
      titleSq: 'Asistent i Fizioterapisë',
      icon: GraduationCap,
      description: 'Learn rehabilitation techniques, kinesiology, and patient physical care procedures.',
      color: 'from-amber-500/10 to-orange-500/10 text-amber-600 border-amber-100'
    }
  ];

  // Set selected program if initialProgram is passed and changed
  if (initialProgram && selectedProgram !== initialProgram) {
    setSelectedProgram(initialProgram);
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => {
        const copy = { ...prev };
        delete copy[name];
        return copy;
      });
    }
  };

  const validateStep1 = () => {
    if (!selectedProgram) {
      setErrors({ program: 'Please select one of the study programs.' });
      return false;
    }
    setErrors({});
    return true;
  };

  const validateStep2 = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required.';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required.';
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required.';
    } else if (!/^[+0-9\s-]{6,15}$/.test(formData.phone)) {
      newErrors.phone = 'Please provide a valid phone number.';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required.';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please provide a valid email address.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep3 = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.city.trim()) newErrors.city = 'Residence is required.';
    if (!formData.birthYear.trim()) {
      newErrors.birthYear = 'Birth year is required.';
    } else {
      const year = parseInt(formData.birthYear);
      if (isNaN(year) || year < 1950 || year > new Date().getFullYear() - 14) {
        newErrors.birthYear = 'Please provide a valid birth year.';
      }
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (step === 1 && validateStep1()) {
      setStep(2);
    } else if (step === 2 && validateStep2()) {
      setStep(3);
    }
  };

  const handlePrev = () => {
    setStep(prev => Math.max(1, prev - 1));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep3()) return;

    setIsSubmitting(true);
    // Simulate API request
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 1500);
  };

  const handleReset = () => {
    setStep(1);
    setSelectedProgram('');
    setFormData({
      firstName: '',
      lastName: '',
      phone: '',
      email: '',
      birthYear: '',
      city: '',
      highSchoolStream: ''
    });
    setErrors({});
    setIsSuccess(false);
    onClose();
  };

  const selectedProgObj = programs.find(p => p.id === selectedProgram);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto" id="application-modal">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-primary-dark/40 backdrop-blur-md transition-opacity duration-300"
        onClick={handleReset}
      />

      {/* Modal Container */}
      <div className="flex min-h-full items-center justify-center p-4 sm:p-6 text-center">
        <div className="relative transform overflow-hidden rounded-[2rem] bg-surface text-left shadow-[0_20px_50px_rgba(0,0,0,0.15)] border border-border/40 transition-all w-full max-w-2xl my-8">
          
          {/* Header */}
          <div className="px-6 sm:px-8 pt-8 pb-4 flex items-center justify-between border-b border-border/10">
            <div>
              <span className="text-[10px] font-bold tracking-widest text-primary uppercase bg-primary/5 px-2.5 py-1 rounded-full">
                Application Form
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-primary-dark font-heading mt-2">
                {isSuccess ? 'Application Submitted' : `Step ${step} of 3: ${step === 1 ? 'Choose Program' : step === 2 ? 'Contact Details' : 'Background & Complete'}`}
              </h2>
            </div>
            <button 
              onClick={handleReset}
              className="p-2 rounded-full text-text-secondary hover:text-primary-dark hover:bg-gray-100 transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X size={20} />
            </button>
          </div>

          {/* Progress Bar */}
          {!isSuccess && (
            <div className="w-full h-1 bg-gray-100">
              <div 
                className="h-full bg-primary transition-all duration-300 ease-out" 
                style={{ width: `${(step / 3) * 100}%` }}
              />
            </div>
          )}

          {/* Content */}
          <div className="p-6 sm:p-8 max-h-[70vh] overflow-y-auto">
            {isSuccess ? (
              /* Success Screen */
              <div className="text-center py-8 px-4 flex flex-col items-center">
                <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-6 animate-bounce">
                  <Check size={36} strokeWidth={3} />
                </div>
                <h3 className="text-2xl font-bold text-primary-dark font-heading mb-3">
                  Application Submitted Successfully!
                </h3>
                <p className="text-sm sm:text-base text-text-secondary max-w-md leading-relaxed mb-8">
                  Thank you for applying. We have received your request for the <strong className="text-primary-dark">{selectedProgObj?.title}</strong> program. Our admissions team will contact you shortly via phone or email.
                </p>

                <div className="w-full max-w-md bg-bg border border-border/40 rounded-2xl p-5 mb-8 text-left space-y-2">
                  <div className="text-xs text-text-secondary uppercase tracking-wider font-semibold border-b border-border/10 pb-2 mb-2">Summary of receipt</div>
                  <div className="flex justify-between text-sm"><span className="text-text-secondary">Applicant:</span> <span className="font-semibold text-primary-dark">{formData.firstName} {formData.lastName}</span></div>
                  <div className="flex justify-between text-sm"><span className="text-text-secondary">Program:</span> <span className="font-semibold text-primary-dark">{selectedProgObj?.title}</span></div>
                  <div className="flex justify-between text-sm"><span className="text-text-secondary">Phone:</span> <span className="font-semibold text-primary-dark">{formData.phone}</span></div>
                  <div className="flex justify-between text-sm"><span className="text-text-secondary">Email:</span> <span className="font-semibold text-primary-dark">{formData.email}</span></div>
                </div>

                <button 
                  onClick={handleReset}
                  className="bg-primary hover:bg-secondary text-white font-semibold px-8 py-3 rounded-full transition-colors duration-200 cursor-pointer shadow-soft hover:shadow-soft-lg"
                >
                  Close & Return
                </button>
              </div>
            ) : (
              /* Multi-step Form Content */
              <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* STEP 1: Select Program */}
                {step === 1 && (
                  <div className="space-y-4">
                    <p className="text-sm text-text-secondary mb-4">
                      Choose one of the accredited programs of Heimerer Medical High School:
                    </p>
                    
                    <div className="grid gap-4">
                      {programs.map((prog) => {
                        const Icon = prog.icon;
                        const isSelected = selectedProgram === prog.id;
                        return (
                          <div 
                            key={prog.id}
                            onClick={() => {
                              setSelectedProgram(prog.id);
                              if (errors.program) {
                                setErrors({});
                              }
                            }}
                            className={`p-5 rounded-2xl border-2 transition-all duration-300 cursor-pointer flex gap-4 text-left relative ${
                              isSelected 
                                ? 'border-primary bg-primary/5 shadow-soft-lg' 
                                : 'border-border/40 bg-surface hover:border-primary/40 hover:bg-bg/40'
                            }`}
                          >
                            <div className={`w-12 h-12 rounded-xl shrink-0 flex items-center justify-center bg-gradient-to-br ${prog.color}`}>
                              <Icon size={24} />
                            </div>
                            
                            <div className="space-y-1 pr-6">
                              <h4 className="font-bold text-primary-dark text-base sm:text-lg leading-snug">{prog.title}</h4>
                              <p className="text-xs text-text-secondary leading-relaxed pt-1">{prog.description}</p>
                            </div>

                            <div className={`absolute top-5 right-5 w-5 h-5 rounded-full border flex items-center justify-center transition-colors ${
                              isSelected ? 'bg-primary border-primary text-white' : 'border-gray-300'
                            }`}>
                              {isSelected && <Check size={12} strokeWidth={3} />}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                    {errors.program && (
                      <p className="text-xs text-red-500 font-semibold mt-1">{errors.program}</p>
                    )}
                  </div>
                )}

                {/* STEP 2: Personal & Contact Information */}
                {step === 2 && (
                  <div className="space-y-5">
                    <p className="text-sm text-text-secondary">
                      Please provide your accurate contact details so we can reach you:
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* First Name */}
                      <div className="space-y-1.5 text-left">
                        <label className="text-xs font-bold text-primary-dark uppercase tracking-wider flex items-center gap-1.5">
                          <User size={13} className="text-primary" /> First Name *
                        </label>
                        <input 
                          type="text" 
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleInputChange}
                          placeholder="e.g. John"
                          className={`w-full px-4 py-3 rounded-xl border bg-bg focus:bg-white text-primary-dark font-medium transition-all duration-200 outline-none text-sm sm:text-base ${
                            errors.firstName ? 'border-red-500 focus:ring-1 focus:ring-red-500' : 'border-border/40 focus:border-primary/50 focus:ring-1 focus:ring-primary/20'
                          }`}
                        />
                        {errors.firstName && <p className="text-xs text-red-500 font-semibold">{errors.firstName}</p>}
                      </div>

                      {/* Last Name */}
                      <div className="space-y-1.5 text-left">
                        <label className="text-xs font-bold text-primary-dark uppercase tracking-wider flex items-center gap-1.5">
                          <User size={13} className="text-primary" /> Last Name *
                        </label>
                        <input 
                          type="text" 
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleInputChange}
                          placeholder="e.g. Doe"
                          className={`w-full px-4 py-3 rounded-xl border bg-bg focus:bg-white text-primary-dark font-medium transition-all duration-200 outline-none text-sm sm:text-base ${
                            errors.lastName ? 'border-red-500 focus:ring-1 focus:ring-red-500' : 'border-border/40 focus:border-primary/50 focus:ring-1 focus:ring-primary/20'
                          }`}
                        />
                        {errors.lastName && <p className="text-xs text-red-500 font-semibold">{errors.lastName}</p>}
                      </div>

                      {/* Phone */}
                      <div className="space-y-1.5 text-left sm:col-span-2">
                        <label className="text-xs font-bold text-primary-dark uppercase tracking-wider flex items-center gap-1.5">
                          <Phone size={13} className="text-primary" /> Phone Number *
                        </label>
                        <input 
                          type="tel" 
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          placeholder="e.g. +383 44 123 456"
                          className={`w-full px-4 py-3 rounded-xl border bg-bg focus:bg-white text-primary-dark font-medium transition-all duration-200 outline-none text-sm sm:text-base ${
                            errors.phone ? 'border-red-500 focus:ring-1 focus:ring-red-500' : 'border-border/40 focus:border-primary/50 focus:ring-1 focus:ring-primary/20'
                          }`}
                        />
                        {errors.phone && <p className="text-xs text-red-500 font-semibold">{errors.phone}</p>}
                      </div>

                      {/* Email */}
                      <div className="space-y-1.5 text-left sm:col-span-2">
                        <label className="text-xs font-bold text-primary-dark uppercase tracking-wider flex items-center gap-1.5">
                          <Mail size={13} className="text-primary" /> Email Address *
                        </label>
                        <input 
                          type="email" 
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="e.g. example@gmail.com"
                          className={`w-full px-4 py-3 rounded-xl border bg-bg focus:bg-white text-primary-dark font-medium transition-all duration-200 outline-none text-sm sm:text-base ${
                            errors.email ? 'border-red-500 focus:ring-1 focus:ring-red-500' : 'border-border/40 focus:border-primary/50 focus:ring-1 focus:ring-primary/20'
                          }`}
                        />
                        {errors.email && <p className="text-xs text-red-500 font-semibold">{errors.email}</p>}
                      </div>
                    </div>
                  </div>
                )}

                {/* STEP 3: Educational Background & Complete */}
                {step === 3 && (
                  <div className="space-y-5">
                    <p className="text-sm text-text-secondary">
                      Additional options to complete your application profile:
                    </p>

                    <div className="space-y-4">
                      {/* Residence */}
                      <div className="space-y-1.5 text-left">
                        <label className="text-xs font-bold text-primary-dark uppercase tracking-wider flex items-center gap-1.5">
                          <MapPin size={13} className="text-primary" /> Residence (City/Village) *
                        </label>
                        <input 
                          type="text" 
                          name="city"
                          value={formData.city}
                          onChange={handleInputChange}
                          placeholder="e.g. Prishtina"
                          className={`w-full px-4 py-3 rounded-xl border bg-bg focus:bg-white text-primary-dark font-medium transition-all duration-200 outline-none text-sm sm:text-base ${
                            errors.city ? 'border-red-500 focus:ring-1 focus:ring-red-500' : 'border-border/40 focus:border-primary/50 focus:ring-1 focus:ring-primary/20'
                          }`}
                        />
                        {errors.city && <p className="text-xs text-red-500 font-semibold">{errors.city}</p>}
                      </div>

                      {/* Year of Birth */}
                      <div className="space-y-1.5 text-left">
                        <label className="text-xs font-bold text-primary-dark uppercase tracking-wider flex items-center gap-1.5">
                          <Calendar size={13} className="text-primary" /> Birth Year *
                        </label>
                        <input 
                          type="number" 
                          name="birthYear"
                          value={formData.birthYear}
                          onChange={handleInputChange}
                          placeholder="e.g. 2008"
                          className={`w-full px-4 py-3 rounded-xl border bg-bg focus:bg-white text-primary-dark font-medium transition-all duration-200 outline-none text-sm sm:text-base ${
                            errors.birthYear ? 'border-red-500 focus:ring-1 focus:ring-red-500' : 'border-border/40 focus:border-primary/50 focus:ring-1 focus:ring-primary/20'
                          }`}
                        />
                        {errors.birthYear && <p className="text-xs text-red-500 font-semibold">{errors.birthYear}</p>}
                      </div>

                      {/* High School Stream */}
                      <div className="space-y-1.5 text-left">
                        <label className="text-xs font-bold text-primary-dark uppercase tracking-wider flex items-center gap-1.5">
                          <GraduationCap size={13} className="text-primary" /> High School Stream or Current Status
                        </label>
                        <input 
                          type="text" 
                          name="highSchoolStream"
                          value={formData.highSchoolStream}
                          onChange={handleInputChange}
                          placeholder="e.g. Science Gymnasium, Medicine, or 11th grade..."
                          className="w-full px-4 py-3 rounded-xl border bg-bg focus:bg-white text-primary-dark font-medium transition-all duration-200 outline-none text-sm sm:text-base border-border/40 focus:border-primary/50 focus:ring-1 focus:ring-primary/20"
                        />
                      </div>
                    </div>

                    {/* Selected Program preview card */}
                    <div className="mt-4 p-4 rounded-xl bg-primary/5 border border-primary/10 flex items-center gap-3 text-left">
                      <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
                        <Check size={16} strokeWidth={2.5} />
                      </div>
                      <div>
                        <div className="text-[10px] uppercase font-bold text-primary tracking-wider">Selected Program</div>
                        <div className="text-xs sm:text-sm font-bold text-primary-dark">{selectedProgObj?.title}</div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Footer Buttons */}
                <div className="pt-4 border-t border-border/10 flex justify-between items-center">
                  {step > 1 ? (
                    <button
                      type="button"
                      onClick={handlePrev}
                      className="px-5 py-3 rounded-full text-text-primary hover:text-primary-dark border border-border/40 hover:bg-gray-100 font-semibold text-sm transition-all flex items-center gap-1.5 cursor-pointer"
                    >
                      <ArrowLeft size={16} /> Back
                    </button>
                  ) : (
                    <div />
                  )}

                  {step < 3 ? (
                    <button
                      type="button"
                      onClick={handleNext}
                      className="bg-[#162f7a] hover:bg-[#0f2259] text-white font-semibold px-6 py-3 rounded-full transition-colors duration-200 cursor-pointer shadow-soft flex items-center gap-1.5 text-sm ml-auto"
                    >
                      Next <ArrowRight size={16} />
                    </button>
                  ) : (
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="bg-[#00aa8a] hover:bg-[#00967a] disabled:bg-gray-400 text-white font-semibold px-8 py-3 rounded-full transition-all duration-200 cursor-pointer shadow-soft flex items-center gap-1.5 text-sm ml-auto"
                    >
                      {isSubmitting ? (
                        <>Submitting...</>
                      ) : (
                        <>Submit Application</>
                      )}
                    </button>
                  )}
                </div>

              </form>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
