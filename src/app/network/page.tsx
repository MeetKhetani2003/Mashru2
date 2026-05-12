'use client';

import PageHeader from '@/components/layout/PageHeader';
import FadeIn from '@/components/animations/FadeIn';
import { MapPin, ArrowRightLeft, Building2, Store, Globe2, BarChart3, ShieldCheck, Zap, Quote } from 'lucide-react';
import Magnetic from '@/components/animations/Magnetic';

const networkStats = [
  { label: "Active Buyers", value: "400+", icon: <Building2/> },
  { label: "Farmer Network", value: "5000+", icon: <Zap/> },
  { label: "Primary Mandis", value: "12", icon: <MapPin/> },
];

export default function MarketNetwork() {
  return (
    <div className="bg-brand-cream pb-24 overflow-hidden">
      <PageHeader 
        title="Market Network" 
        subtitle="Connecting the fertile fields of Saurashtra to the monumental demands of national and global markets."
        imagePath="/images/hero-bg.jpg"
      />

      {/* Monumental Stats Bar */}
      <section className="relative z-30 -mt-16 mb-24">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid md:grid-cols-3 gap-8">
            {networkStats.map((stat, i) => (
              <FadeIn key={i} delay={i * 0.1} direction="up">
                <div className="bg-white p-12 rounded-[2.5rem] border border-brand-cream-dark shadow-2xl shadow-brand-green/5 flex flex-col items-center text-center group hover:border-brand-green/30 transition-all duration-700">
                  <div className="text-brand-green mb-6 group-hover:scale-110 transition-transform duration-500">
                    {stat.icon}
                  </div>
                  <div className="text-5xl md:text-6xl font-serif font-bold text-brand-dark mb-2 tracking-tighter">
                    {stat.value}
                  </div>
                  <p className="text-brand-gray font-bold text-[0.65rem] uppercase tracking-[0.4em]">{stat.label}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Ecosystem Philosophy */}
      <section className="py-24">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-20 items-center mb-32">
            <FadeIn direction="right">
              <span className="text-brand-green font-bold text-[0.7rem] uppercase tracking-[0.5em] mb-6 block">Our Infrastructure</span>
              <h2 className="text-5xl md:text-8xl font-serif font-semibold text-brand-dark tracking-tighter leading-tight mb-10">
                A Unified <br/>
                <span className="text-brand-green italic font-light">Ecosystem</span>
              </h2>
              <p className="text-brand-gray text-xl leading-relaxed mb-12 font-medium">
                Our strength is rooted in a monumental web of relationships built over 45 years. We don't just trade commodities; we facilitate a seamless flow of trust between thousands of independent farmers and the nation's largest industrial processors.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div className="flex items-start gap-4">
                  <div className="mt-1 text-brand-yellow">
                    <ShieldCheck size={24}/>
                  </div>
                  <p className="text-brand-dark font-bold text-sm uppercase tracking-widest leading-relaxed">Verified Supply Integrity</p>
                </div>
                <div className="flex items-start gap-4">
                  <div className="mt-1 text-brand-yellow">
                    <Globe2 size={24}/>
                  </div>
                  <p className="text-brand-dark font-bold text-sm uppercase tracking-widest leading-relaxed">National Trade Reach</p>
                </div>
              </div>
            </FadeIn>
            
            <FadeIn direction="left">
              <div className="relative rounded-[3rem] overflow-hidden shadow-2xl h-[600px] border border-brand-cream-dark">
                <img src="/images/trust-bg.jpg" alt="Network Ecosystem" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-brand-dark/40 backdrop-blur-[2px]"></div>
                <div className="absolute inset-0 p-16 flex flex-col justify-end">
                   <div className="bg-white/10 backdrop-blur-xl p-10 rounded-[2rem] border border-white/20">
                     <h3 className="text-2xl font-serif font-semibold text-white mb-4">Strategic APMC Presence</h3>
                     <p className="text-white/70 text-lg leading-relaxed">Operating from the heart of Gujarat's primary mandis, ensuring we have our finger on the pulse of regional supply.</p>
                   </div>
                </div>
              </div>
            </FadeIn>
          </div>

          {/* Strategic Hubs Grid */}
          <div className="text-center mb-24">
            <FadeIn>
              <h2 className="text-4xl md:text-6xl font-serif font-semibold text-brand-dark tracking-tighter">Strategic <span className="text-brand-green italic">Market Hubs</span></h2>
            </FadeIn>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: <Building2/>, title: "Oil Mills", desc: "Direct supply lines to major groundnut and seed crushing units nationwide." },
              { icon: <Store/>, title: "Wholesale", desc: "Connecting primary APMC yards to metropolitan wholesale markets." },
              { icon: <ArrowRightLeft/>, title: "Exporters", desc: "Procuring export-quality commodities for international trade circles." },
              { icon: <BarChart3/>, title: "Mandis", desc: "Active presence and deep ties in Saurashtra's primary agricultural hubs." }
            ].map((hub, i) => (
              <FadeIn key={i} delay={i * 0.1} direction="up">
                <div className="bg-white p-12 rounded-[2.5rem] border border-brand-cream-dark h-full flex flex-col group hover:border-brand-green/30 hover:shadow-xl transition-all duration-700">
                  <div className="w-14 h-14 rounded-2xl bg-brand-cream text-brand-green flex items-center justify-center mb-8 group-hover:bg-brand-green group-hover:text-brand-yellow transition-all duration-500">
                    {hub.icon}
                  </div>
                  <h4 className="text-2xl font-serif font-semibold text-brand-dark mb-4">{hub.title}</h4>
                  <p className="text-brand-gray text-base leading-relaxed">{hub.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Philosophy Banner */}
      <section className="py-32 bg-brand-dark relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-brand-green/10 -skew-x-12 translate-x-1/2"></div>
        <div className="container mx-auto px-6 max-w-5xl relative z-10 text-center">
          <FadeIn scale={0.95}>
            <Quote size={60} className="mx-auto mb-12 text-brand-yellow opacity-40" />
            <h2 className="text-3xl md:text-5xl font-serif font-semibold text-white mb-12 leading-tight italic">
              "The strength of a commission agent is measured by the unbreakable trust of their network."
            </h2>
            <div className="h-px w-24 bg-brand-yellow mx-auto mb-8"></div>
            <p className="text-brand-yellow font-bold uppercase tracking-[0.5em] text-xs">J J & Co. Philosophy</p>
          </FadeIn>
        </div>
      </section>

      {/* Network CTA */}
      <section className="py-24 container mx-auto px-6 max-w-5xl">
        <FadeIn scale={0.98}>
          <div className="bg-white border border-brand-cream-dark rounded-[4rem] p-16 text-center shadow-2xl shadow-brand-green/5">
             <h2 className="text-4xl md:text-6xl font-serif font-semibold text-brand-dark mb-8 tracking-tighter">Expand Your Reach</h2>
             <p className="text-brand-gray text-xl mb-12 max-w-xl mx-auto">
               Join our elite ecosystem of buyers and sellers. Experience the power of a verified agricultural network.
             </p>
             <Magnetic>
               <a href="tel:+919427740313" className="bg-brand-green text-white px-12 py-6 rounded-full font-bold text-lg hover:bg-brand-dark transition-all shadow-xl">
                 Contact Our Trade Desk
               </a>
             </Magnetic>
          </div>
        </FadeIn>
      </section>
    </div>
  );
}
