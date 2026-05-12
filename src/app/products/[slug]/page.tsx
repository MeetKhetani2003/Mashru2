'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import PageHeader from '@/components/layout/PageHeader';
import FadeIn from '@/components/animations/FadeIn';
import { ArrowLeft, ArrowUpRight, CheckCircle2, ShieldCheck, Factory, Gauge } from 'lucide-react';
import Link from 'next/link';
import Magnetic from '@/components/animations/Magnetic';

export default function ProductDetail() {
  const { slug } = useParams();
  const [product, setProduct] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function getProduct() {
      try {
        const res = await fetch('/api/admin/products');
        const data = await res.json();
        const found = data.find((s: any) => s.slug === slug);
        setProduct(found);
      } catch (err) {
        console.error('Failed to fetch product');
      }
      setIsLoading(false);
    }
    getProduct();
  }, [slug]);

  if (isLoading) {
    return <div className="py-24 text-center font-serif text-2xl text-brand-dark italic opacity-30">Verifying Commodity Specs...</div>;
  }

  if (!product) {
    return <div className="py-24 text-center font-serif text-2xl text-brand-dark">Product not found.</div>;
  }

  return (
    <div className="bg-brand-cream pb-24">
      <PageHeader 
        title={product.title} 
        subtitle={product.description}
        imagePath={product.image}
      />

      <div className="container mx-auto px-6 max-w-7xl -mt-24 relative z-20">
        <div className="bg-white rounded-[2.5rem] p-8 md:p-20 shadow-[0_40px_100px_-20px_rgba(10,66,45,0.1)] border border-brand-cream-dark">
          <FadeIn direction="up">
            <Link 
              href="/products" 
              className="inline-flex items-center gap-3 text-brand-green font-bold text-xs uppercase tracking-widest mb-16 hover:-translate-x-2 transition-transform"
            >
              <ArrowLeft size={16} /> Back to Catalog
            </Link>

            <div className="grid lg:grid-cols-12 gap-20 items-start">
              {/* Left Column: Deep Dive */}
              <div className="lg:col-span-7">
                <div className="flex items-center gap-4 mb-6">
                  <span className="bg-brand-yellow/20 text-brand-dark text-[0.6rem] font-bold uppercase tracking-[0.4em] px-4 py-2 rounded-full">
                    {product.category}
                  </span>
                </div>
                
                <h2 className="text-4xl md:text-7xl font-serif font-semibold text-brand-dark tracking-tighter leading-tight mb-12">
                  {product.title}
                </h2>

                <p className="text-xl md:text-2xl text-brand-dark/80 leading-relaxed font-medium mb-16 italic border-l-4 border-brand-yellow pl-8">
                  {product.longDescription}
                </p>

                <div className="grid md:grid-cols-2 gap-12 mb-16">
                  <div className="space-y-8">
                    <h3 className="text-2xl font-serif font-semibold text-brand-dark flex items-center gap-3">
                      <ShieldCheck className="text-brand-green" /> Quality Focus
                    </h3>
                    <div className="space-y-4">
                      {product.features?.map((feat: string, i: number) => (
                        <div key={i} className="flex items-start gap-3 p-4 rounded-2xl bg-brand-cream/50 border border-brand-cream-dark">
                          <CheckCircle2 size={16} className="text-brand-green mt-1 shrink-0" />
                          <span className="text-brand-dark font-semibold text-sm leading-snug">{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-8">
                    <h3 className="text-2xl font-serif font-semibold text-brand-dark flex items-center gap-3">
                      <Factory className="text-brand-green" /> Industry Varieties
                    </h3>
                    <div className="flex flex-wrap gap-3">
                      {product.varieties?.map((v: string, i: number) => (
                        <div key={i} className="px-6 py-3 rounded-2xl bg-brand-dark text-white font-bold text-sm shadow-lg shadow-brand-dark/10">
                          {v}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Technical Specs Card */}
              <div className="lg:col-span-5">
                <div className="bg-brand-dark rounded-[2.5rem] p-12 text-white relative overflow-hidden shadow-2xl">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-brand-green/20 rounded-full blur-3xl"></div>
                  
                  <div className="flex items-center gap-4 mb-10 border-b border-white/10 pb-6">
                    <div className="bg-brand-yellow text-brand-dark p-3 rounded-2xl">
                      <Gauge size={24} />
                    </div>
                    <h3 className="text-2xl font-serif font-semibold">Technical Specifications</h3>
                  </div>

                  <div className="space-y-6">
                    {product.specifications?.map((spec: any, i: number) => (
                      <div key={i} className="flex justify-between items-center py-4 border-b border-white/5 last:border-0">
                        <span className="text-white/40 font-bold text-[0.7rem] uppercase tracking-widest">{spec.label}</span>
                        <span className="text-brand-yellow font-serif italic text-lg">{spec.value}</span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-12 pt-8 border-t border-white/10">
                    <p className="text-white/50 text-sm italic mb-8">
                      Looking for a custom grade or bulk procurement rate for this commodity?
                    </p>
                    <Magnetic>
                      <Link href="/contact" className="flex items-center justify-center gap-3 w-full py-5 bg-brand-yellow text-brand-dark rounded-2xl font-bold hover:bg-white transition-all shadow-xl shadow-brand-yellow/10">
                        Request Price Quote
                        <ArrowUpRight size={20} />
                      </Link>
                    </Magnetic>
                  </div>
                </div>

                <div className="mt-10 p-10 bg-white rounded-[2.5rem] border border-brand-cream-dark shadow-sm">
                  <h4 className="text-brand-green font-bold text-[0.65rem] uppercase tracking-widest mb-6 block text-center">Logistics & Supply</h4>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-brand-gray font-medium">Market Base</span>
                      <span className="font-bold text-brand-dark">Junagadh Mandi</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-brand-gray font-medium">Bulk Supply</span>
                      <span className="font-bold text-brand-dark">Pan-India</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-brand-gray font-medium">Compliance</span>
                      <span className="font-bold text-brand-dark">APMC Certified</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>

      {/* Recommended CTA */}
      <section className="py-24 container mx-auto px-6 max-w-5xl">
        <FadeIn scale={0.98}>
          <div className="bg-brand-green rounded-[4rem] p-16 text-center text-white relative overflow-hidden shadow-2xl">
             <div className="absolute top-0 right-0 w-96 h-96 bg-brand-yellow/10 rounded-full blur-[100px]"></div>
             <h2 className="text-4xl md:text-6xl font-serif font-semibold mb-8 tracking-tighter leading-tight">Scale Your <br/> <span className="text-brand-yellow italic">Industrial Procurement</span></h2>
             <p className="text-white/70 text-xl mb-12 max-w-xl mx-auto leading-relaxed">
               Partner with J J & Co. for consistent, high-grade agricultural commodities. We handle the sourcing, you focus on your production.
             </p>
             <div className="flex flex-col sm:flex-row items-center justify-center gap-8">
               <Magnetic>
                 <Link href="/contact" className="bg-brand-yellow text-brand-dark px-12 py-6 rounded-full font-bold text-lg hover:bg-white transition-all shadow-2xl">
                   Connect With Us
                 </Link>
               </Magnetic>
               <a href="tel:+919427740313" className="text-white font-bold border-b border-brand-yellow pb-1 hover:gap-4 transition-all flex items-center gap-2 uppercase tracking-widest text-[0.7rem]">
                 Direct Line <ArrowUpRight size={18} />
               </a>
             </div>
          </div>
        </FadeIn>
      </section>
    </div>
  );
}
