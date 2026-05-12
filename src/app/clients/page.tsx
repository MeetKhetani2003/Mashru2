'use client';

import { useState, useEffect } from 'react';
import PageHeader from '@/components/layout/PageHeader';
import FadeIn from '@/components/animations/FadeIn';
import { Quote, Factory, Globe, Star, CheckCircle, ArrowLeft, ArrowRight, TrendingUp, Award, Users } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Magnetic from '@/components/animations/Magnetic';

const partners = [
  "Premium Oil Mills", "Gujarat Export Corp", "National Grain Traders", 
  "Saurashtra Pulses", "Apex Edibles", "Royal Wheat Exporters",
  "Heritage Grains", "Modern Oil Extraction", "Kheti Vikas Co.",
  "Junagadh Trade Desk", "Bulk Agri Solutions"
];

const stats = [
  { icon: <TrendingUp size={24}/>, label: "Market Legacy", value: "45+", suffix: "Years" },
  { icon: <Users size={24}/>, label: "Active Partners", value: "400+", suffix: "Clients" },
  { icon: <Award size={24}/>, label: "Annual Volume", value: "50k", suffix: "MT" },
];

const clientCategories = [
  { 
    icon: <Factory size={32}/>, 
    title: "Industrial Mills", 
    desc: "National oil and flour mills relying on our consistent, high-yield raw materials.",
    count: "150+"
  },
  { 
    icon: <Globe size={32}/>, 
    title: "Export Partners", 
    desc: "Leading agricultural exporters sourcing premium commodities for global markets.",
    count: "80+"
  },
  { 
    icon: <Store size={32}/>, 
    title: "Bulk Wholesalers", 
    desc: "Regional distribution hubs and food processors seeking verified quality lots.",
    count: "200+"
  }
];

export default function Clients() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [testimonialList, setTestimonialList] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const nextTestimonial = () => {
    if (testimonialList.length === 0) return;
    setCurrentIndex((prev) => (prev + 1) % testimonialList.length);
  };

  const prevTestimonial = () => {
    if (testimonialList.length === 0) return;
    setCurrentIndex((prev) => (prev - 1 + testimonialList.length) % testimonialList.length);
  };

  useEffect(() => {
    async function getTestimonials() {
      try {
        const res = await fetch('/api/admin/testimonials');
        const data = await res.json();
        setTestimonialList(data);
      } catch (err) {
        console.error('Failed to fetch testimonials');
      }
      setIsLoading(false);
    }
    getTestimonials();
  }, []);

  useEffect(() => {
    if (testimonialList.length === 0) return;
    const timer = setInterval(nextTestimonial, 8000);
    return () => clearInterval(timer);
  }, [testimonialList]);

  return (
    <div className="bg-brand-cream pb-24 overflow-hidden">
      <PageHeader 
        title="Trust & Legacy" 
        subtitle="Generations of agricultural excellence, verified by over 400+ active market partnerships."
        imagePath="/images/trust-bg.jpg"
      />

      {/* PARTNER MARQUEE */}
      <div className="py-12 bg-white border-b border-brand-cream-dark overflow-hidden whitespace-nowrap">
        <div className="flex animate-marquee gap-20 items-center w-max px-10">
          {[...partners, ...partners].map((partner, i) => (
            <span key={i} className="text-brand-gray/30 text-2xl font-serif font-bold uppercase tracking-widest hover:text-brand-green transition-colors cursor-default">
              {partner}
            </span>
          ))}
        </div>
      </div>

      {/* STATS SECTION */}
      <section className="py-24 bg-brand-cream">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid md:grid-cols-3 gap-12">
            {stats.map((stat, i) => (
              <FadeIn key={i} delay={i * 0.1} direction="up">
                <div className="bg-white p-10 rounded-[2.5rem] border border-brand-cream-dark shadow-sm text-center group hover:border-brand-green/30 transition-all duration-500">
                  <div className="w-12 h-12 rounded-2xl bg-brand-cream text-brand-green flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                    {stat.icon}
                  </div>
                  <div className="text-5xl md:text-6xl font-serif font-bold text-brand-dark mb-2 tracking-tighter">
                    {stat.value} <span className="text-brand-green text-2xl font-light italic">{stat.suffix}</span>
                  </div>
                  <p className="text-brand-gray font-bold text-xs uppercase tracking-[0.3em]">{stat.label}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIAL CAROUSEL */}
      <section className="py-24 bg-brand-dark relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none"></div>
        <div className="container mx-auto px-6 max-w-7xl relative z-10">
          <div className="flex flex-col lg:flex-row gap-20 items-center">
            <div className="lg:w-1/2">
              <FadeIn direction="right">
                <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-white/5 border border-white/10 mb-8">
                  <img src="https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_92x30dp.png" alt="Google" className="h-4 w-auto" />
                  <span className="text-white font-bold text-[0.6rem] uppercase tracking-widest">Verified Market Authority</span>
                </div>
                <h2 className="text-5xl md:text-7xl font-serif font-semibold text-white tracking-tighter leading-tight mb-8">
                  What Our <br/>
                  <span className="text-brand-yellow italic">Partners Say</span>
                </h2>
                <div className="flex gap-4">
                  <Magnetic>
                    <button onClick={prevTestimonial} className="w-16 h-16 rounded-full border border-white/10 flex items-center justify-center text-white hover:bg-brand-yellow hover:text-brand-dark transition-all">
                      <ArrowLeft size={24} />
                    </button>
                  </Magnetic>
                  <Magnetic>
                    <button onClick={nextTestimonial} className="w-16 h-16 rounded-full border border-white/10 flex items-center justify-center text-white hover:bg-brand-yellow hover:text-brand-dark transition-all">
                      <ArrowRight size={24} />
                    </button>
                  </Magnetic>
                </div>
              </FadeIn>
            </div>

            <div className="lg:w-1/2 w-full">
              {isLoading ? (
                 <div className="bg-white/5 backdrop-blur-md p-20 rounded-[3rem] border border-white/10 text-center">
                   <p className="font-serif text-2xl text-white/30 italic">Retrieving Verified Trust...</p>
                 </div>
              ) : testimonialList.length > 0 && (
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentIndex}
                    initial={{ opacity: 0, x: 50, scale: 0.9 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    exit={{ opacity: 0, x: -50, scale: 0.9 }}
                    transition={{ type: "spring", damping: 20, stiffness: 100 }}
                    className="bg-white p-12 md:p-16 rounded-[3rem] shadow-2xl relative"
                  >
                    <Quote size={60} className="absolute -top-6 -left-6 text-brand-yellow opacity-40" />
                    
                    <div className="flex items-center gap-1 mb-8">
                      {[...Array(testimonialList[currentIndex].rating)].map((_, i) => (
                        <Star key={i} size={18} className="text-brand-yellow" fill="currentColor" />
                      ))}
                    </div>

                    <p className="text-2xl md:text-3xl font-serif font-medium text-brand-dark leading-relaxed italic mb-12">
                      "{testimonialList[currentIndex].quote}"
                    </p>

                    <div className="grid md:grid-cols-2 gap-8 border-t border-brand-cream-dark pt-10">
                      <div>
                        <div className="flex items-center gap-4 mb-4">
                          <div className="w-12 h-12 rounded-full bg-brand-dark text-brand-yellow flex items-center justify-center font-bold text-lg">
                            {testimonialList[currentIndex].initial}
                          </div>
                          <div>
                            <h4 className="text-brand-dark font-bold text-lg leading-none">{testimonialList[currentIndex].author}</h4>
                            <span className="text-brand-gray text-xs">{testimonialList[currentIndex].location}</span>
                          </div>
                        </div>
                        <p className="text-brand-green font-bold text-sm uppercase tracking-wider">{testimonialList[currentIndex].company}</p>
                      </div>
                      <div className="flex flex-col gap-2 justify-center">
                        <div className="flex justify-between items-center text-xs">
                          <span className="text-brand-gray uppercase tracking-widest">Partner Since</span>
                          <span className="text-brand-dark font-bold">{testimonialList[currentIndex].partnerSince}</span>
                        </div>
                        <div className="flex justify-between items-center text-xs">
                          <span className="text-brand-gray uppercase tracking-widest">Volume Capacity</span>
                          <span className="text-brand-dark font-bold">{testimonialList[currentIndex].volume}</span>
                        </div>
                        <div className="flex items-center gap-2 text-brand-green text-[0.6rem] uppercase tracking-widest mt-1">
                          <CheckCircle size={12} /> Verified Google Review
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* CATEGORIES SECTION */}
      <section className="py-24">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid md:grid-cols-3 gap-10">
            {clientCategories.map((cat, i) => (
              <FadeIn key={i} delay={i * 0.1} direction="up">
                <div className="bg-white p-12 rounded-[2.5rem] border border-brand-cream-dark shadow-sm hover:shadow-2xl hover:shadow-brand-green/5 transition-all duration-700 h-full group relative overflow-hidden">
                  <span className="absolute -right-4 -top-8 text-[10rem] font-serif font-bold text-brand-cream-dark/20 group-hover:text-brand-green/5 transition-colors duration-700 pointer-events-none select-none">
                    {cat.count}
                  </span>
                  <div className="relative z-10">
                    <div className="w-16 h-16 rounded-2xl bg-brand-cream text-brand-green flex items-center justify-center mb-10 group-hover:bg-brand-green group-hover:text-brand-yellow transition-all duration-500">
                      {cat.icon}
                    </div>
                    <h3 className="text-3xl font-serif font-semibold text-brand-dark mb-6 leading-tight">{cat.title}</h3>
                    <p className="text-brand-gray text-lg leading-relaxed">{cat.desc}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Join the Network CTA */}
      <section className="container mx-auto px-6 max-w-5xl">
        <FadeIn scale={0.98}>
          <div className="bg-brand-green rounded-[4rem] p-16 text-center text-white relative overflow-hidden shadow-2xl">
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none"></div>
            <div className="relative z-10">
              <h2 className="text-4xl md:text-6xl font-serif font-semibold mb-8 tracking-tighter leading-tight">Join our <br/> <span className="text-brand-yellow italic">Global Trade Desk</span></h2>
              <p className="text-white/60 text-xl mb-12 max-w-xl mx-auto leading-relaxed">
                Connect with J J & Co. to secure your procurement chain with the most trusted commission agents in Saurashtra.
              </p>
              <Magnetic>
                <a href="tel:+919427740313" className="bg-brand-yellow text-brand-dark px-12 py-6 rounded-full font-bold text-lg hover:bg-white transition-all inline-block shadow-2xl">
                  Contact Now
                </a>
              </Magnetic>
            </div>
          </div>
        </FadeIn>
      </section>
    </div>
  );
}

function Store({ size }: { size: number }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      <path d="m2 7 4.41-4.41A2 2 0 0 1 7.83 2h8.34a2 2 0 0 1 1.42.59L22 7"/>
      <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/>
      <path d="M15 22v-4a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v4"/>
      <path d="M2 7h20"/>
      <path d="M22 7v3a2 2 0 0 1-2 2v0a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 16 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 12 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 8 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 4 12v0a2 2 0 0 1-2-2V7"/>
    </svg>
  );
}
