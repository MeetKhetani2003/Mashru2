'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import PageHeader from '@/components/layout/PageHeader';
import FadeIn from '@/components/animations/FadeIn';
import { CheckCircle2, ArrowLeft, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import * as Icons from 'lucide-react';
import Magnetic from '@/components/animations/Magnetic';

export default function ServiceDetail() {
  const { slug } = useParams();
  const [service, setService] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function getService() {
      try {
        const res = await fetch('/api/admin/services');
        const data = await res.json();
        const found = data.find((s: any) => s.slug === slug);
        setService(found);
      } catch (err) {
        console.error('Failed to fetch service');
      }
      setIsLoading(false);
    }
    getService();
  }, [slug]);

  if (isLoading) {
    return <div className="py-24 text-center font-serif text-2xl text-brand-dark italic opacity-30">Retrieving Service Architecture...</div>;
  }

  if (!service) {
    return <div className="py-24 text-center font-serif text-2xl text-brand-dark">Service not found.</div>;
  }

  const IconComponent = (Icons as any)[service.iconName] || Icons.Handshake;

  return (
    <div className="bg-brand-cream pb-24">
      <PageHeader 
        title={service.title} 
        subtitle={service.description}
        imagePath="/images/products-bg.jpg"
      />

      <div className="container mx-auto px-6 max-w-7xl -mt-24 relative z-20">
        <div className="bg-white rounded-[2.5rem] p-8 md:p-20 shadow-[0_40px_100px_-20px_rgba(10,66,45,0.1)] border border-brand-cream-dark">
          <FadeIn direction="up">
            <Link 
              href="/services" 
              className="inline-flex items-center gap-3 text-brand-green font-bold text-xs uppercase tracking-widest mb-16 hover:-translate-x-2 transition-transform"
            >
              <ArrowLeft size={16} /> Back to Services
            </Link>

            <div className="grid lg:grid-cols-12 gap-20 items-start">
              <div className="lg:col-span-7">
                <div className="flex items-center gap-6 mb-12">
                  <div className="bg-brand-green text-brand-yellow p-6 rounded-[2rem] shadow-xl shadow-brand-green/10">
                    <IconComponent size={48} />
                  </div>
                  <div>
                    <span className="text-brand-yellow font-bold text-[0.7rem] uppercase tracking-[0.5em] mb-2 block">Service Deep-Dive</span>
                    <h2 className="text-4xl md:text-6xl font-serif font-semibold text-brand-dark tracking-tighter leading-tight">{service.title}</h2>
                  </div>
                </div>

                <p className="text-xl md:text-2xl text-brand-dark/80 leading-relaxed font-medium mb-12 italic border-l-4 border-brand-yellow pl-8">
                  {service.longDescription}
                </p>

                <div className="space-y-12">
                  <div>
                    <h3 className="text-3xl font-serif font-semibold text-brand-dark mb-10 border-b border-brand-cream-dark pb-6">Key Benefits</h3>
                    <div className="grid md:grid-cols-2 gap-8">
                      {service.benefits?.map((benefit: string, i: number) => (
                        <div key={i} className="flex items-start gap-4 p-6 rounded-2xl bg-brand-cream/50 border border-brand-cream-dark">
                          <div className="mt-1 bg-brand-green text-brand-yellow p-1 rounded-full shrink-0">
                            <CheckCircle2 size={16} />
                          </div>
                          <span className="text-brand-dark font-semibold text-base leading-snug">{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-5 bg-brand-dark rounded-[2.5rem] p-12 text-white relative overflow-hidden shadow-2xl">
                <div className="absolute top-0 right-0 w-32 h-32 bg-brand-green/20 rounded-full blur-3xl"></div>
                <h3 className="text-3xl font-serif font-semibold text-brand-yellow mb-12 border-b border-white/10 pb-6">Service Process</h3>
                <div className="space-y-10">
                  {service.process?.map((p: any, i: number) => (
                    <div key={i} className="flex gap-8 relative">
                      {i < service.process.length - 1 && (
                        <div className="absolute left-5 top-10 bottom-0 w-px bg-white/10"></div>
                      )}
                      <div className="w-10 h-10 rounded-2xl bg-brand-yellow flex items-center justify-center text-brand-dark font-black text-sm shrink-0 z-10 shadow-lg shadow-brand-yellow/10">
                        {i + 1}
                      </div>
                      <div>
                        <h4 className="text-xl font-serif font-semibold text-white mb-2">{p.step}</h4>
                        <p className="text-white/50 text-base font-medium leading-relaxed">{p.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
      
      {/* Dynamic CTA */}
      <section className="py-24 container mx-auto px-6 max-w-5xl">
        <FadeIn scale={0.98}>
          <div className="bg-brand-green rounded-[4rem] p-16 text-center text-white relative overflow-hidden shadow-2xl">
             <div className="absolute top-0 right-0 w-96 h-96 bg-brand-yellow/10 rounded-full blur-[100px]"></div>
             <h2 className="text-4xl md:text-6xl font-serif font-semibold mb-8 tracking-tighter">Ready to Begin?</h2>
             <p className="text-white/70 text-xl mb-12 max-w-xl mx-auto leading-relaxed">
               Experience the {service.title} service first-hand. Our expert agents are standing by to facilitate your next trade.
             </p>
             <div className="flex flex-col sm:flex-row items-center justify-center gap-8">
               <Magnetic>
                 <Link href="/contact" className="bg-brand-yellow text-brand-dark px-12 py-6 rounded-full font-bold text-lg hover:bg-white transition-all shadow-2xl shadow-brand-yellow/10">
                   Get Started Today
                 </Link>
               </Magnetic>
               <a href="tel:+919427740313" className="flex items-center gap-3 text-white font-bold border-b border-brand-yellow pb-1 hover:gap-5 transition-all uppercase tracking-widest text-xs">
                 Call Now <ArrowRight size={16} />
               </a>
             </div>
          </div>
        </FadeIn>
      </section>
    </div>
  );
}
