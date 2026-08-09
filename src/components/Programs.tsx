export function Programs({ onApplyClick }: { onApplyClick?: (programId: string) => void }) {
  const programs = [
    {
      id: "nursing",
      title: "Professional Nursing Associate",
      subtitle: "Nursing Associate Program",
      img: "https://images.unsplash.com/photo-1584982751601-97dcc096659c?w=600&h=400&fit=crop&q=80",
      desc: "Acquire hands-on training and clinical knowledge based on rigorous German nursing standards.",
    },
    {
      id: "lab",
      title: "Medical Laboratory Technician",
      subtitle: "Laboratory Technology Program",
      img: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=600&h=400&fit=crop&q=80",
      desc: "Master diagnostic technology, specimen analysis, and clinical chemistry in modern lab settings.",
    },
    {
      id: "physio",
      title: "Physiotherapy Assistant",
      subtitle: "Physiotherapy Program",
      img: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600&h=400&fit=crop&q=80",
      desc: "Learn physical rehabilitation, kinesiology, and patient support under licensed clinical guidance.",
    }
  ];

  return (
    <section id="programs" className="py-20 lg:py-28 bg-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-sm font-semibold tracking-widest text-primary uppercase mb-2">Accredited Programs</p>
          <h2 className="text-3xl md:text-4xl font-bold text-primary-dark mb-4">Our Educational <span className="text-[#00aa8a]">Solutions</span></h2>
          <p className="text-base sm:text-lg text-text-secondary">
            Comprehensive vocational training specialized for Kosova's growing clinical healthcare sector.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {programs.map((prog, idx) => (
            <div 
              key={idx} 
              onClick={() => onApplyClick?.(prog.id)}
              className="bg-surface rounded-3xl overflow-hidden shadow-soft-lg border border-white group cursor-pointer hover:shadow-soft-xl transition-all duration-300 transform hover:-translate-y-1 flex flex-col h-full"
            >
              <div className="h-48 overflow-hidden relative">
                <div className="absolute inset-0 bg-secondary/10 group-hover:bg-transparent transition-colors z-10"></div>
                <img src={prog.img} alt={prog.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out" />
              </div>
              <div className="p-6 text-left relative bg-surface flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-bold text-primary-dark mb-1 leading-snug">{prog.title}</h3>
                  <p className="text-xs text-text-secondary font-medium mb-3">{prog.subtitle}</p>
                  <p className="text-text-secondary leading-relaxed text-sm">
                    {prog.desc}
                  </p>
                </div>
                <div className="mt-6 flex items-center text-primary font-semibold text-sm group-hover:text-accent-warm transition-colors pt-2 border-t border-border/10">
                  Apply for this program <span className="ml-1.5 group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
