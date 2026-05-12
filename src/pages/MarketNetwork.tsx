import PageHeader from '../components/layout/PageHeader';
import FadeIn from '../components/animations/FadeIn';
import { MapPin, ArrowRightLeft, Building2, Store } from 'lucide-react';

export default function MarketNetwork() {
  return (
    <div className="bg-brand-cream pb-24">
      <PageHeader 
        title="Market Network" 
        subtitle="Connecting local harvests to national markets."
        imagePath="/images/hero-bg.jpg"
      />

      <section className="pt-24 pb-16">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <FadeIn direction="right">
              <h2 className="text-3xl md:text-5xl font-serif font-bold text-brand-dark mb-6 leading-tight">
                A Deeply Rooted <br/><span className="text-brand-green">Trading Ecosystem</span>
              </h2>
              <p className="text-brand-gray text-lg mb-6 leading-relaxed">
                Our strength lies in our network. Over 40 years of operations have allowed us to build an intricate web of relationships connecting thousands of farmers with hundreds of bulk buyers, oil mills, and wholesale traders.
              </p>
              <p className="text-brand-gray text-lg mb-8 leading-relaxed">
                Operating out of key Agricultural Produce Market Committees (APMCs), we have our finger on the pulse of regional supply and national demand.
              </p>
              
              <div className="grid grid-cols-2 gap-6 mt-8">
                <div className="bg-white p-6 rounded-xl border-l-4 border-brand-green shadow-sm">
                  <div className="text-3xl font-serif font-bold text-brand-dark mb-1">400+</div>
                  <div className="text-sm font-bold text-brand-gray uppercase tracking-wider">Active Buyers</div>
                </div>
                <div className="bg-white p-6 rounded-xl border-l-4 border-brand-yellow shadow-sm">
                  <div className="text-3xl font-serif font-bold text-brand-dark mb-1">5000+</div>
                  <div className="text-sm font-bold text-brand-gray uppercase tracking-wider">Farmer Network</div>
                </div>
              </div>
            </FadeIn>
            
            <FadeIn direction="left" className="relative">
              <div className="bg-brand-green p-8 md:p-12 rounded-3xl text-white relative overflow-hidden">
                {/* Abstract Network Graphic */}
                <div className="absolute inset-0 opacity-10">
                  <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                      <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                        <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1"/>
                      </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#grid)" />
                  </svg>
                </div>
                
                <h3 className="text-2xl font-serif font-bold mb-8 relative z-10">Our Strategic Reach</h3>
                <ul className="space-y-6 relative z-10">
                  {[
                    { icon: <Building2 size={24}/>, title: "Oil Mills & Processors", desc: "Direct supply lines to major groundnut and seed crushing units." },
                    { icon: <Store size={24}/>, title: "Wholesale Markets", desc: "Connecting APMC yards to major metropolitan wholesale markets." },
                    { icon: <ArrowRightLeft size={24}/>, title: "Exporters", desc: "Procuring export-quality commodities for international traders." },
                    { icon: <MapPin size={24}/>, title: "Regional Mandis", desc: "Active presence and deep ties in primary agricultural hubs." }
                  ].map((item, i) => (
                    <li key={i} className="flex gap-4">
                      <div className="mt-1 text-brand-yellow">{item.icon}</div>
                      <div>
                        <h4 className="font-bold text-lg">{item.title}</h4>
                        <p className="text-white/70 text-sm">{item.desc}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Trust Banner */}
      <section className="py-16 bg-white border-y border-brand-cream-dark">
        <div className="container mx-auto px-6 max-w-5xl text-center">
          <FadeIn>
            <h3 className="font-serif text-2xl md:text-3xl text-brand-dark mb-6">"The strength of a commission agent is measured by the trust of their network."</h3>
            <p className="text-brand-green font-bold uppercase tracking-widest text-sm">— J J & Co. Philosophy</p>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
