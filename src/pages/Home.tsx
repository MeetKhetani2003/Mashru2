import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, ShieldCheck, TrendingUp, Sprout, Handshake, Award } from 'lucide-react';
import FadeIn from '../components/animations/FadeIn';

export default function Home() {
  return (
    <div className="overflow-hidden">
      {/* HERO SECTION */}
      <section className="relative h-screen min-h-[600px] flex items-center justify-center pt-20">
        <div className="absolute inset-0 z-0">
          <img 
            src="/images/hero-bg.jpg" 
            alt="Agricultural Market Environment" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-dark/90 via-brand-dark/70 to-transparent"></div>
          <div className="absolute inset-0 bg-brand-green/20 mix-blend-multiply"></div>
        </div>

        <div className="container relative z-10 mx-auto px-6 max-w-7xl">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-yellow/20 border border-brand-yellow/30 backdrop-blur-sm mb-6">
                <ShieldCheck size={16} className="text-brand-yellow" />
                <span className="text-sm font-medium tracking-wide text-brand-yellow uppercase">Trusted Since 1977</span>
              </div>
            </motion.div>
            
            <motion.h1 
              className="text-5xl md:text-7xl font-serif font-bold text-white leading-[1.1] mb-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Premium Agricultural <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-yellow to-brand-yellow-light">
                Commission Agents
              </span>
            </motion.h1>
            
            <motion.p 
              className="text-lg md:text-xl text-white/80 mb-10 max-w-2xl leading-relaxed"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              Building long-term relationships through transparent agricultural commodity trading. Specializing in groundnuts, grains, and pulses with over four decades of unparalleled market expertise.
            </motion.p>
            
            <motion.div 
              className="flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <Link to="/services" className="bg-brand-yellow hover:bg-brand-yellow-light text-brand-dark px-8 py-4 rounded-full font-semibold transition-all flex items-center gap-2 group">
                Explore Services
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link to="/contact" className="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/30 px-8 py-4 rounded-full font-semibold transition-all">
                Contact Us
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* STATS STRIP */}
      <section className="bg-brand-green py-12 relative z-20 -mt-10 mx-4 md:mx-auto max-w-6xl rounded-2xl shadow-2xl">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-white/10">
            {[
              { label: 'Years of Trust', value: '47+' },
              { label: 'Active Clients', value: '400+' },
              { label: 'Commodities', value: '25+' },
              { label: 'Market Network', value: 'Pan-India' }
            ].map((stat, i) => (
              <FadeIn key={i} delay={i * 0.1} className="text-center px-4">
                <div className="text-3xl md:text-4xl font-serif font-bold text-brand-yellow mb-2">{stat.value}</div>
                <div className="text-white/80 text-sm md:text-base font-medium uppercase tracking-wider">{stat.label}</div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* INTRO SECTION */}
      <section className="py-24 bg-brand-cream">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <FadeIn direction="right">
                <h2 className="text-sm font-bold tracking-widest text-brand-green uppercase mb-3 flex items-center gap-2">
                  <div className="w-8 h-1 bg-brand-yellow rounded-full"></div>
                  Who We Are
                </h2>
                <h3 className="text-4xl md:text-5xl font-serif font-bold text-brand-dark mb-6 leading-tight">
                  Modern Operations with <br/><span className="text-brand-green">Old-School Trust</span>
                </h3>
                <p className="text-brand-gray text-lg mb-6 leading-relaxed">
                  Established in 1977, J J & Co. has grown from a humble trading post into one of the most respected agricultural commission agencies in the region. 
                </p>
                <p className="text-brand-gray mb-8 leading-relaxed">
                  We bridge the gap between hard-working farmers and bulk purchasers. Our transparent commission system ensures fair pricing, while our deep market roots guarantee quality procurement of groundnuts, grains, and pulses.
                </p>
                
                <ul className="space-y-4 mb-10">
                  {[
                    "Transparent pricing and commission structure",
                    "Deep network across regional mandis",
                    "Expert quality assessment of commodities"
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <div className="bg-brand-green/10 p-1.5 rounded-full text-brand-green">
                        <ShieldCheck size={16} />
                      </div>
                      <span className="font-medium text-brand-dark">{item}</span>
                    </li>
                  ))}
                </ul>

                <Link to="/about" className="inline-flex items-center gap-2 text-brand-green font-semibold hover:text-brand-yellow transition-colors group border-b-2 border-brand-green hover:border-brand-yellow pb-1">
                  Read Our Full Story
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </FadeIn>
            </div>
            <div className="relative">
              <FadeIn direction="left">
                <div className="relative rounded-2xl overflow-hidden shadow-2xl aspect-[4/5]">
                  <img src="/images/trust-bg.jpg" alt="Agricultural Trust" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/80 via-transparent to-transparent"></div>
                  <div className="absolute bottom-8 left-8 right-8 text-white">
                    <p className="font-serif text-2xl font-medium mb-2">"Our word is our bond in this market."</p>
                    <p className="text-brand-yellow text-sm font-semibold uppercase tracking-wider">— Founded 1977</p>
                  </div>
                </div>
                {/* Decorative element */}
                <div className="absolute -top-6 -right-6 w-32 h-32 bg-brand-yellow rounded-full -z-10 blur-2xl opacity-50"></div>
                <div className="absolute -bottom-6 -left-6 w-40 h-40 bg-brand-green rounded-full -z-10 blur-2xl opacity-30"></div>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES PREVIEW */}
      <section className="py-24 bg-white relative">
        <div className="container mx-auto px-6 max-w-7xl">
          <FadeIn className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-sm font-bold tracking-widest text-brand-green uppercase mb-3 flex items-center justify-center gap-2">
              <div className="w-8 h-1 bg-brand-yellow rounded-full"></div>
              Our Expertise
              <div className="w-8 h-1 bg-brand-yellow rounded-full"></div>
            </h2>
            <h3 className="text-4xl md:text-5xl font-serif font-bold text-brand-dark mb-6">Comprehensive Trading Services</h3>
            <p className="text-brand-gray text-lg">We handle the complexities of agricultural commodity trading so you can focus on your core business.</p>
          </FadeIn>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Handshake size={32} />,
                title: "Commission Agency",
                desc: "Facilitating transparent trades between farmers and buyers with fair commission structures."
              },
              {
                icon: <Sprout size={32} />,
                title: "Quality Procurement",
                desc: "Expert assessment and sourcing of premium groundnuts, grains, and seeds directly from farms."
              },
              {
                icon: <TrendingUp size={32} />,
                title: "Market Guidance",
                desc: "Real-time pricing intelligence and strategic advice for optimal buying and selling windows."
              }
            ].map((service, i) => (
              <FadeIn key={i} delay={i * 0.2} direction="up">
                <div className="bg-brand-cream border border-brand-cream-dark p-8 rounded-2xl hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group">
                  <div className="bg-brand-green/10 w-16 h-16 rounded-xl flex items-center justify-center text-brand-green mb-6 group-hover:bg-brand-green group-hover:text-white transition-colors">
                    {service.icon}
                  </div>
                  <h4 className="text-2xl font-serif font-bold text-brand-dark mb-4">{service.title}</h4>
                  <p className="text-brand-gray leading-relaxed mb-6">{service.desc}</p>
                  <Link to="/services" className="text-brand-green font-semibold flex items-center gap-2 group-hover:text-brand-yellow transition-colors">
                    Learn more <ArrowRight size={16} />
                  </Link>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-24 bg-brand-green relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <img src="/images/products-bg.jpg" alt="Background" className="w-full h-full object-cover" />
        </div>
        <div className="container mx-auto px-6 max-w-5xl relative z-10 text-center">
          <FadeIn>
            <Award size={48} className="text-brand-yellow mx-auto mb-6" />
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-6">Ready to Trade with Confidence?</h2>
            <p className="text-xl text-white/80 mb-10 max-w-2xl mx-auto">
              Join over 400 satisfied clients who trust J J & Co. for their agricultural commodity procurement and trading needs.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/contact" className="bg-brand-yellow hover:bg-brand-yellow-light text-brand-dark px-8 py-4 rounded-full font-bold text-lg transition-all shadow-lg hover:shadow-xl">
                Partner With Us Today
              </Link>
              <a href="tel:+919427740313" className="bg-transparent hover:bg-white/10 text-white border-2 border-white/30 px-8 py-4 rounded-full font-bold text-lg transition-all flex items-center justify-center gap-2">
                Call: +91 94277 40313
              </a>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
