'use client';

import { useState, useEffect } from 'react';
import PageHeader from '@/components/layout/PageHeader';
import FadeIn from '@/components/animations/FadeIn';
import Link from 'next/link';
import { ArrowUpRight, CheckCircle2 } from 'lucide-react';
import Magnetic from '@/components/animations/Magnetic';

export default function Products() {
  const [productList, setProductList] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function getProducts() {
      try {
        const res = await fetch('/api/admin/products');
        const data = await res.json();
        setProductList(data);
      } catch (err) {
        console.error('Failed to fetch products');
      }
      setIsLoading(false);
    }
    getProducts();
  }, []);

  return (
    <div className="bg-brand-cream pb-24">
      <PageHeader 
        title="Commodities Traded" 
        subtitle="Premium quality agricultural products sourced with expertise and absolute transparency."
        imagePath="/images/products-bg.jpg"
      />

      <section className="py-24">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="flex flex-col md:flex-row justify-between items-end gap-12 mb-24">
            <FadeIn direction="right">
              <span className="text-brand-green font-bold text-[0.7rem] uppercase tracking-[0.5em] mb-6 block">Our Catalog</span>
              <h2 className="text-5xl md:text-8xl font-serif font-semibold text-brand-dark tracking-tighter leading-[1.1]">
                Market-Ready <br/>
                <span className="text-brand-green italic font-light">Procurement</span>
              </h2>
            </FadeIn>
            <FadeIn direction="left">
              <p className="text-brand-gray text-xl max-w-sm leading-relaxed border-l-4 border-brand-yellow pl-8 italic">
                Rigorously graded commodities for national industrial demand and export excellence.
              </p>
            </FadeIn>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-12 gap-10">
            {isLoading ? (
              <div className="col-span-full py-24 text-center font-serif text-3xl text-brand-gray/30 italic">
                Gathering Mandi Data...
              </div>
            ) : productList.map((product, i) => {
              // Bento-style grid sizing logic
              const isLarge = i === 0 || i === 3;
              const gridClass = isLarge ? "lg:col-span-7" : "lg:col-span-5";
              
              return (
                <FadeIn key={product._id} delay={i * 0.1} direction="up" className={gridClass}>
                  <Link href={`/products/${product.slug}`} className="group block h-full">
                    <div className="relative h-[550px] rounded-[2.5rem] overflow-hidden border border-brand-cream-dark shadow-sm hover:shadow-[0_40px_80px_-20px_rgba(10,66,45,0.15)] transition-all duration-700">
                      
                      {/* Background Image Layer */}
                      <div className="absolute inset-0 z-0">
                        <img 
                          src={product.image} 
                          alt={product.title} 
                          className="w-full h-full object-cover grayscale brightness-50 group-hover:scale-110 group-hover:grayscale-0 transition-all duration-1000" 
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/40 to-transparent"></div>
                      </div>

                      {/* Content Layer */}
                      <div className="relative z-10 p-12 h-full flex flex-col">
                        <div className="flex justify-between items-start mb-10">
                          <span className="bg-brand-yellow text-brand-dark text-[0.6rem] font-bold uppercase tracking-[0.3em] px-4 py-2 rounded-full shadow-lg">
                            {product.category}
                          </span>
                          <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white border border-white/20 group-hover:bg-brand-yellow group-hover:text-brand-dark group-hover:border-brand-yellow transition-all duration-500">
                            <ArrowUpRight size={24} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                          </div>
                        </div>
                        
                        <h3 className="text-4xl md:text-5xl font-serif font-semibold text-white mb-6 group-hover:text-brand-yellow transition-colors duration-500 tracking-tighter">
                          {product.title}
                        </h3>
                        
                        <div className="space-y-4 mb-10 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-700">
                          {product.features?.slice(0, 3).map((feat: string, idx: number) => (
                            <div key={idx} className="flex items-center gap-3 text-white/60 text-base font-medium">
                              <CheckCircle2 size={16} className="text-brand-yellow" />
                              {feat}
                            </div>
                          ))}
                        </div>

                        <div className="mt-auto flex items-end justify-between">
                          <div className="flex flex-col">
                            <span className="text-[0.6rem] font-bold text-white/40 uppercase tracking-widest mb-1">Standard Variety</span>
                            <span className="text-white font-serif italic text-xl">{product.varieties?.[0]} & More</span>
                          </div>
                          <span className="text-brand-yellow font-bold text-xs uppercase tracking-widest border-b border-brand-yellow/30 pb-1 group-hover:border-brand-yellow transition-colors">
                            View Specifications
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </section>

      {/* Product CTA */}
      <section className="py-24 bg-white border-y border-brand-cream-dark">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <FadeIn direction="right">
              <h2 className="text-5xl md:text-7xl font-serif font-semibold text-brand-dark leading-tight tracking-tighter">
                Custom Bulk <br/>
                <span className="text-brand-green italic">Sourcing</span>
              </h2>
              <p className="text-brand-gray text-xl mt-8 leading-relaxed max-w-md font-medium">
                Need a specific grade or high-volume procurement? Our expert agents specialize in matching industrial requirements with farm-level quality.
              </p>
              <div className="mt-12">
                <Magnetic>
                  <Link href="/contact" className="inline-flex items-center gap-6 bg-brand-green text-white px-12 py-6 rounded-full font-bold text-lg hover:bg-brand-dark transition-all shadow-xl">
                    Inquire for Bulk Order
                    <ArrowUpRight size={24} />
                  </Link>
                </Magnetic>
              </div>
            </FadeIn>
            <FadeIn direction="left">
              <div className="relative rounded-[3rem] overflow-hidden shadow-2xl h-[450px]">
                <img src="/images/products-bg.jpg" alt="Bulk Sourcing" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-brand-green/20 backdrop-blur-[2px]"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-white/90 backdrop-blur-md p-10 rounded-[2rem] shadow-2xl max-w-xs text-center border border-white/40">
                    <span className="text-brand-green font-bold text-4xl block mb-4 italic">100%</span>
                    <p className="text-brand-dark font-bold text-xs uppercase tracking-widest leading-loose">
                      Fair Trade & Certified Quality Assurance
                    </p>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>
    </div>
  );
}
