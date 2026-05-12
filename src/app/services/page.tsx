'use client';

import { useState, useEffect } from 'react';
import PageHeader from '@/components/layout/PageHeader';
import FadeIn from '@/components/animations/FadeIn';
import Link from 'next/link';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import * as Icons from 'lucide-react';
import Magnetic from '@/components/animations/Magnetic';

export default function Services() {
  const [serviceList, setServiceList] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function getServices() {
      try {
        const res = await fetch('/api/admin/services');
        const data = await res.json();
        setServiceList(data);
      } catch (err) {
        console.error('Failed to fetch services');
      }
      setIsLoading(false);
    }
    getServices();
  }, []);

  return (
    <div className="bg-brand-cream pb-24">
      <PageHeader 
        title="Our Services" 
        subtitle="Comprehensive trading and commission solutions for the modern agricultural market."
        imagePath="/images/products-bg.jpg"
      />

      <section className="py-24">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="text-center max-w-3xl mx-auto mb-24">
            <FadeIn direction="up">
              <span className="text-brand-green font-bold text-[0.7rem] uppercase tracking-[0.5em] mb-6 block">Professional Expertise</span>
              <h2 className="text-5xl md:text-7xl font-serif font-semibold text-brand-dark mb-8 leading-tight tracking-tighter">
                Trading Excellence <br/>
                <span className="text-brand-green italic font-light">Redefined</span>
              </h2>
              <p className="text-brand-gray text-xl leading-relaxed">
                Since 1977, we have perfected the art of agricultural commodity trading. We handle the complexities of the mandi so our clients can trade with absolute peace of mind.
              </p>
            </FadeIn>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {isLoading ? (
              <div className="col-span-full py-24 text-center font-serif text-3xl text-brand-gray/30 italic">
                Synchronizing Market Solutions...
              </div>
            ) : serviceList.map((service, i) => {
              const IconComponent = (Icons as any)[service.iconName] || Icons.Handshake;
              const displayIndex = (i + 1).toString().padStart(2, '0');
              
              return (
                <FadeIn key={service._id} delay={i * 0.1} direction="up">
                  <Link href={`/services/${service.slug}`} className="group block h-full">
                    <div className="relative bg-white p-12 rounded-[2rem] border border-brand-cream-dark hover:border-brand-green/30 transition-all duration-700 h-full flex flex-col shadow-sm hover:shadow-[0_30px_60px_-15px_rgba(10,66,45,0.1)] overflow-hidden">
                      
                      {/* Architectural Numbering */}
                      <span className="absolute -right-4 -top-8 text-[12rem] font-serif font-bold text-brand-cream-dark/30 group-hover:text-brand-green/5 transition-colors duration-700 pointer-events-none select-none">
                        {displayIndex}
                      </span>

                      <div className="relative z-10">
                        <div className="w-16 h-16 rounded-2xl bg-brand-cream flex items-center justify-center text-brand-green mb-10 group-hover:bg-brand-green group-hover:text-brand-yellow transition-all duration-500">
                          <IconComponent size={32} />
                        </div>
                        
                        <h3 className="text-3xl font-serif font-semibold text-brand-dark mb-6 group-hover:text-brand-green transition-colors duration-500 leading-tight">
                          {service.title}
                        </h3>
                        
                        <p className="text-brand-gray text-lg leading-relaxed mb-10 opacity-80">
                          {service.description}
                        </p>
                        
                        <div className="mt-auto flex items-center gap-3 text-brand-green font-bold text-xs uppercase tracking-widest pt-8 border-t border-brand-cream-dark">
                          Learn More <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />
                        </div>
                      </div>

                      {/* Bottom Accent */}
                      <div className="absolute bottom-0 left-0 w-full h-1 bg-brand-cream group-hover:bg-brand-green transition-colors duration-500"></div>
                    </div>
                  </Link>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </section>
      
      {/* Service CTA */}
      <section className="py-24 bg-brand-dark relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-brand-green/10 -skew-x-12 translate-x-1/2"></div>
        <div className="container mx-auto px-6 max-w-5xl relative z-10">
          <FadeIn scale={0.98}>
            <div className="text-center">
              <h2 className="text-5xl md:text-7xl font-serif font-semibold text-white mb-10 tracking-tighter">Ready to <span className="text-brand-yellow italic">Scale Your Trade?</span></h2>
              <p className="text-white/60 text-xl mb-12 max-w-2xl mx-auto leading-relaxed">
                Connect with our expert agents today for a personalized consultation on bulk procurement or commodity selling.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-8">
                <Magnetic>
                  <a href="tel:+919427740313" className="bg-brand-yellow text-brand-dark px-12 py-6 rounded-full font-bold text-lg hover:bg-white transition-all shadow-2xl">
                    Speak to an Agent
                  </a>
                </Magnetic>
                <Link href="/contact" className="text-white font-bold border-b-2 border-brand-yellow pb-1 flex items-center gap-2 hover:gap-4 transition-all">
                  Inquire Now <ArrowUpRight size={20} />
                </Link>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
