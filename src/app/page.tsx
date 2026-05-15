'use client';

import { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { 
  ArrowRight, ShieldCheck, TrendingUp, Sprout, Handshake, 
  Award, CheckCircle2, Globe, Users2, Wheat, Play, 
  ArrowUpRight, Truck, BarChart3, Search, Settings, 
  Zap, Database, BarChart, ShoppingCart, Tag, Mail
} from 'lucide-react';
import FadeIn from '@/components/animations/FadeIn';
import Counter from '@/components/animations/Counter';
import HeroCarousel from '@/components/sections/HeroCarousel';
import Magnetic from '@/components/animations/Magnetic';

const IconMap: { [key: string]: any } = {
  Handshake, Award, TrendingUp, ShieldCheck, Sprout, Globe, 
  Wheat, Users2, Truck, BarChart3, Search, Settings, 
  Zap, Database, BarChart, ShoppingCart, Tag, Mail
};

function DynamicIcon({ name, size = 32, className = "" }: { name: string, size?: number, className?: string }) {
  const IconComponent = IconMap[name] || Handshake;
  return <IconComponent size={size} className={className} />;
}

function ParallaxImage({ src, alt, className }: { src: string; alt: string; className?: string }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <div ref={ref} className={`overflow-hidden relative ${className}`}>
      <motion.img 
        src={src} 
        alt={alt} 
        style={{ y, scale: 1.1 }}
        className="w-full h-full object-cover"
      />
    </div>
  );
}

export default function Home() {
  const introRef = useRef(null);
  const isIntroInView = useInView(introRef, { once: true, margin: "-100px" });
  
  const [services, setServices] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const [servicesRes, productsRes] = await Promise.all([
          fetch('/api/admin/services'),
          fetch('/api/admin/products')
        ]);
        
        const servicesData = await servicesRes.json();
        const productsData = await productsRes.json();
        
        if (Array.isArray(servicesData)) setServices(servicesData);
        if (Array.isArray(productsData)) setProducts(productsData);
      } catch (err) {
        console.error('Failed to fetch home data:', err);
      }
    }
    fetchData();
  }, []);

  const groupedProducts = products.reduce((acc: any, product: any) => {
    if (!acc[product.category]) {
      acc[product.category] = {
        category: product.category,
        items: [],
        img: product.image,
        icon: product.category === 'Oilseeds' ? 'Sprout' : 
              product.category === 'Grains' ? 'Wheat' :
              product.category === 'Pulses' ? 'Users2' : 'Award'
      };
    }
    acc[product.category].items.push(product.title);
    return acc;
  }, {});

  const displayProducts = Object.values(groupedProducts).length > 0 
    ? Object.values(groupedProducts) 
    : [
        { 
          category: "Oilseeds", 
          items: ["Peanut / Mungfali", "Soyabean", "Arandi (Castor)"], 
          icon: "Sprout",
          img: "/images/hero-bg.jpg"
        },
        { 
          category: "Grains", 
          items: ["Premium Wheat"], 
          icon: "Wheat",
          img: "/images/products-bg.jpg"
        },
        { 
          category: "Pulses", 
          items: ["Chickpeas (Chana)", "Green Gram (Moong)", "Black Gram (Urad)"], 
          icon: "Users2",
          img: "/images/pulses-bg.jpg"
        },
        { 
          category: "Bio-Coal", 
          items: ["Groundnut Shell", "Coal Products"], 
          icon: "Award",
          img: "/images/products-bg.jpg"
        }
      ];

  const displayServices = services.length > 0 ? services : [
    { 
      title: "Auctioning & Brokerage", 
      description: "Facilitating fair and transparent auctions between farmers and national buyers at competitive rates.",
      benefits: ["Real-time bidding", "Fair price discovery", "Bulk buyer access"],
      iconName: "Handshake"
    },
    { 
      title: "Quality Grading", 
      description: "Expert moisture testing and quality grading to ensure premium market value for your produce.",
      benefits: ["Moisture analysis", "Impurity sorting", "Grade certification"],
      iconName: "Award"
    },
    { 
      title: "Market Intelligence", 
      description: "Real-time price tracking and mandi updates across Gujarat for informed trading decisions.",
      benefits: ["Price forecasting", "Market trends", "Volume reports"],
      iconName: "TrendingUp"
    },
    { 
      title: "Financial Settlements", 
      description: "Prompt and transparent payment systems for farmers and seamless commercial billing solutions.",
      benefits: ["Same-day payment", "Digital invoicing", "Tax compliance"],
      iconName: "ShieldCheck"
    },
    { 
      title: "Bulk Procurement", 
      description: "Direct farm-to-industry supply chain management for all major agri commodities.",
      benefits: ["Direct sourcing", "Contract farming", "SOP compliance"],
      iconName: "Sprout"
    },
    { 
      title: "Logistics Support", 
      description: "Handling end-to-end transport and temporary warehousing in APMC yards for bulk lots.",
      benefits: ["Fleet management", "Safe storage", "Inventory tracking"],
      iconName: "Globe"
    }
  ];

  return (
    <div className="overflow-hidden">
      {/* STEP 1: NEW HERO VIDEO CAROUSEL - NO FADING */}
      <HeroCarousel />

      {/* SLEEK COMPACT STATISTICS */}
      <section className="relative z-20 py-12 bg-brand-cream overflow-hidden">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { label: 'Years of Trust', value: 47, suffix: '+', icon: <Award size={20}/> },
              { label: 'Active Clients', value: 400, suffix: '+', icon: <Users2 size={20}/> },
              { label: 'Commodities', value: 25, suffix: '+', icon: <Sprout size={20}/> },
              { label: 'Market Network', value: 15, suffix: '+', icon: <Globe size={20}/> }
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                whileHover={{ y: -5 }}
                className="group relative bg-white rounded-[2rem] p-8 border border-brand-dark/5 shadow-sm hover:shadow-xl transition-all duration-500"
              >
                <div className="flex flex-col items-center text-center">
                  <div className="w-12 h-12 rounded-xl bg-brand-green/5 flex items-center justify-center text-brand-green mb-4 group-hover:bg-brand-green group-hover:text-white transition-all duration-500">
                    {stat.icon}
                  </div>
                  
                  <div className="text-3xl md:text-4xl font-serif font-medium text-brand-dark mb-2 tracking-tight group-hover:text-brand-green transition-colors duration-500">
                    <Counter value={stat.value} suffix={stat.suffix} />
                  </div>
                  
                  <div className="flex flex-col items-center gap-2">
                    <div className="h-0.5 w-8 bg-brand-yellow rounded-full transition-all duration-500 group-hover:w-12"></div>
                    <span className="text-brand-dark text-[0.6rem] font-bold uppercase tracking-[0.2em]">{stat.label}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* PREMIUM STRUCTURAL SERVICE CARDS */}
      <section className="py-28 bg-white relative overflow-hidden" id="services">
        <div className="container mx-auto px-6 max-w-7xl relative z-10">
          <div className="flex flex-col lg:flex-row justify-between items-end gap-12 mb-24">
            <FadeIn direction="right">
              <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-brand-green/5 border border-brand-green/10 mb-6">
                <span className="text-brand-green font-bold text-[0.7rem] uppercase tracking-[0.4em]">Professional Services</span>
              </div>
              <h2 className="text-5xl md:text-7xl font-serif font-semibold text-brand-dark tracking-tight leading-[1.1]">Expert Commission <br/><span className="text-brand-yellow italic font-light">Trading Solutions</span></h2>
            </FadeIn>
            <FadeIn direction="left">
              <p className="text-brand-gray text-lg max-w-md font-medium leading-relaxed">
                Empowering the agricultural ecosystem through absolute transparency and four decades of market expertise.
              </p>
            </FadeIn>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {displayServices.map((service, i) => (
              <FadeIn key={i} delay={i * 0.05} direction="up">
                <div className="group relative h-[450px] rounded-[1rem] bg-brand-cream border-b-4 border-brand-cream-dark hover:border-brand-green transition-all duration-500 overflow-hidden shadow-sm hover:shadow-2xl p-12">
                  {/* Background Number */}
                  <div className="absolute top-10 right-10 text-9xl font-serif font-bold text-brand-dark/[0.03] select-none group-hover:text-brand-green/[0.05] transition-colors duration-500">
                    {String(i + 1).padStart(2, '0')}
                  </div>

                  <div className="relative z-10 h-full flex flex-col">
                    <div className="w-16 h-16 rounded-2xl bg-white shadow-sm flex items-center justify-center text-brand-green mb-10 group-hover:bg-brand-green group-hover:text-white transition-all duration-500">
                      <DynamicIcon name={service.iconName} size={32} />
                    </div>
                    
                    <h3 className="text-3xl font-serif font-semibold text-brand-dark mb-6 group-hover:text-brand-green transition-colors duration-500">
                      {service.title}
                    </h3>
                    
                    <p className="text-brand-gray text-base leading-relaxed font-medium mb-8">
                      {service.description}
                    </p>

                    <div className="mt-auto flex flex-wrap gap-x-6 gap-y-3">
                      {(service.benefits || service.features || []).slice(0, 3).map((f: string, j: number) => (
                        <div key={j} className="flex items-center gap-2 text-xs font-bold text-brand-dark/40 group-hover:text-brand-dark transition-colors">
                          <div className="w-1 h-1 rounded-full bg-brand-yellow"></div>
                          {f}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* STRATEGIC EDGE - HIGH DENSITY SECTION */}
      <section className="py-28 bg-brand-cream relative overflow-hidden">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <FadeIn direction="right">
              <div className="relative">
                <h2 className="text-5xl md:text-6xl font-serif font-semibold text-brand-dark mb-10 leading-tight">
                  The J J & Co. <br/>
                  <span className="text-brand-green italic">Strategic Edge</span>
                </h2>
                <div className="grid grid-cols-2 gap-10">
                  {[
                    { label: "Fair Trade", val: "100%", desc: "Transparency in every single transaction." },
                    { label: "Market Reach", val: "Gujarat", desc: "Deep roots in local APMC networks." },
                    { label: "Payment Speed", val: "24hrs", desc: "Swift settlements for our farmers." },
                    { label: "Experience", val: "45yr+", desc: "Knowledge passed through generations." }
                  ].map((item, i) => (
                    <div key={i} className="flex flex-col gap-3">
                      <span className="text-5xl font-serif font-semibold text-brand-green">{item.val}</span>
                      <span className="text-sm font-bold uppercase tracking-widest text-brand-dark">{item.label}</span>
                      <p className="text-base text-brand-gray font-medium leading-relaxed">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>

            <FadeIn direction="left">
              <div className="bg-white p-8 rounded-[3rem] border border-brand-cream-dark shadow-xl relative">
                <div className="absolute top-0 right-0 p-8">
                  <ShieldCheck className="text-brand-yellow opacity-20" size={60} />
                </div>
                <h3 className="text-3xl font-serif font-semibold text-brand-dark mb-6">Commission Agent Commitment</h3>
                <div className="space-y-3">
                  {[
                    "Direct liaison between farm produce and industrial demand.",
                    "Zero hidden charges or unauthorized brokerage fees.",
                    "Advanced quality assessment and moisture management.",
                    "Priority logistic support for large-scale procurement."
                  ].map((text, i) => (
                    <div key={i} className="flex items-start gap-4 p-3 rounded-2xl hover:bg-brand-green/5 transition-colors group">
                      <div className="mt-1 w-6 h-6 rounded-full bg-brand-green/10 flex items-center justify-center text-brand-green group-hover:bg-brand-green group-hover:text-white transition-all">
                        <CheckCircle2 size={14} />
                      </div>
                      <p className="text-sm text-brand-gray leading-relaxed font-medium">{text}</p>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* MARKET REACH MARQUEE */}
      <section className="py-12 bg-white border-y border-brand-cream-dark overflow-hidden whitespace-nowrap relative">
        <div className="flex animate-marquee gap-12 items-center w-max">
          {[
            "PREMIUM PEANUTS", "SOYABEAN", "WHEAT EXPORT", "CASTOR SEEDS", "CHICKPEAS", 
            "GREEN GRAM", "BLACK GRAM", "BIO-COAL", "GROUNDNUT SHELL", 
            "PREMIUM PEANUTS", "SOYABEAN", "WHEAT EXPORT", "CASTOR SEEDS", "CHICKPEAS", 
            "GREEN GRAM", "BLACK GRAM", "BIO-COAL", "GROUNDNUT SHELL"
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-6">
              <span className="text-4xl md:text-6xl font-serif font-semibold text-brand-dark opacity-10 tracking-tighter italic">{item}</span>
              <div className="w-4 h-4 rounded-full bg-brand-yellow/30"></div>
            </div>
          ))}
        </div>
      </section>

      {/* CINEMATIC COMMODITIES SHOWCASE */}
      <section className="py-28 bg-brand-dark relative overflow-hidden" id="commodities">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 right-0 w-[50%] h-full bg-brand-green/10 -skew-x-12 translate-x-1/2"></div>
        </div>
        
        <div className="container mx-auto px-6 max-w-7xl relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-end gap-12 mb-24">
            <FadeIn direction="right">
              <span className="text-brand-yellow font-bold text-[0.7rem] uppercase tracking-[0.5em] mb-6 block">Market Portfolio</span>
              <h2 className="text-5xl md:text-8xl font-serif font-semibold text-white leading-[1.1] tracking-tighter">Premium Agri <br/><span className="text-brand-yellow italic">Commodities</span></h2>
            </FadeIn>
            <FadeIn direction="left">
              <Magnetic>
                <Link href="/products" className="group flex items-center gap-8 bg-brand-yellow text-brand-dark px-12 py-6 rounded-full font-bold text-lg hover:bg-white transition-all shadow-2xl">
                  Explore Catalogue
                  <ArrowUpRight size={24} className="group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform" />
                </Link>
              </Magnetic>
            </FadeIn>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            {(displayProducts as any[]).map((cat, i) => (
              <FadeIn key={i} delay={i * 0.1} direction="up">
                <div className="group relative h-[550px] rounded-[1.5rem] overflow-hidden bg-brand-green/20 border border-white/5 hover:border-brand-yellow/30 transition-all duration-700 shadow-2xl">
                  {/* Background Image Layer */}
                  <div className="absolute inset-0 z-0">
                    <img src={cat.img} alt={cat.category} className="w-full h-full object-cover grayscale brightness-50 group-hover:scale-110 transition-transform duration-1000" />
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/60 to-transparent"></div>
                  </div>

                  {/* Content Layer */}
                  <div className="relative z-10 p-10 h-full flex flex-col">
                    <div className="mb-10 transform group-hover:-translate-y-2 transition-transform duration-500">
                      <DynamicIcon name={cat.icon as string} className="text-brand-yellow" size={40} />
                    </div>
                    
                    <h3 className="text-4xl font-serif font-semibold text-white mb-8 leading-tight tracking-tight">{cat.category}</h3>
                    
                    <ul className="space-y-4 mb-10">
                      {(cat.items as string[]).slice(0, 3).map((item, j) => (
                        <li key={j} className="flex items-center gap-4 text-white/60 text-lg font-medium group-hover:text-white transition-colors">
                          <div className="w-2 h-2 rounded-full bg-brand-yellow/50 group-hover:bg-brand-yellow transition-colors"></div>
                          {item}
                        </li>
                      ))}
                    </ul>
                    
                    <div className="mt-auto pt-10 border-t border-white/10 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
                      <Link href={`/products#${cat.category.toLowerCase()}`} className="flex items-center gap-4 text-brand-yellow font-bold uppercase tracking-widest text-xs">
                        View Details <ArrowRight size={16} />
                      </Link>
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* CTA SECTION - REMOVED FADING */}
      <section className="py-24 relative overflow-hidden bg-brand-green">
        <div className="absolute inset-0 z-0 opacity-40">
          <img src="/images/products-bg.jpg" alt="Agri Commodities" className="w-full h-full object-cover" />
        </div>
        
        {/* Overlay - Ensuring high contrast for content readability */}
        <div className="absolute inset-0 bg-black/40 z-10"></div>

        {/* Content Layer - Higher Z-index */}
        <div className="relative z-20 flex h-full items-center justify-center text-center px-6 pt-20">
          <FadeIn scale={0.95}>
            <div className="bg-brand-yellow/20 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-10 border border-brand-yellow/30 animate-bounce">
              <Award size={48} className="text-brand-yellow" />
            </div>
            <h2 className="text-4xl md:text-6xl font-serif font-bold text-white mb-8">Ready to Trade with Confidence?</h2>
            <p className="text-lg md:text-xl text-white/70 mb-14 leading-relaxed">
              Join a network of over 400 satisfied commercial partners and 5,000+ farmers who trust J J & Co.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-6">
              <Link href="/contact" className="group bg-brand-yellow hover:bg-white text-brand-dark px-12 py-5 rounded-full font-bold text-xl transition-all shadow-2xl shadow-brand-yellow/20 flex items-center gap-3">
                Get in Touch
                <ArrowRight size={24} className="group-hover:translate-x-2 transition-transform duration-500" />
              </Link>
              <a href="tel:+919427740313" className="group bg-white/10 hover:bg-white/20 text-white border border-white/20 px-12 py-5 rounded-full font-bold text-xl transition-all flex items-center gap-3">
                Call Our Office
              </a>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
