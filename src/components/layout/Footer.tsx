import Link from 'next/link';
import { Wheat, Mail, Phone, MapPin, ArrowUpRight, Globe, Share2, ArrowRight } from 'lucide-react';
import Magnetic from '../animations/Magnetic';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-brand-dark text-white pt-24 pb-12 overflow-hidden relative">
      {/* Cinematic Background Decoration */}
      <div className="absolute top-0 right-0 w-[40%] h-full bg-brand-green/10 -skew-x-12 translate-x-1/2 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[40%] h-[20%] bg-brand-yellow/5 blur-[120px] pointer-events-none"></div>
      
      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        {/* Large Heritage Header */}
        <div className="mb-24 border-b border-white/5 pb-16">
          <div className="grid lg:grid-cols-2 gap-12 items-end">
            <div>
              <span className="text-brand-yellow font-bold text-xs uppercase tracking-[0.5em] mb-6 block">Established 1977</span>
              <h2 className="text-5xl md:text-7xl font-serif font-semibold leading-[1.1] tracking-tighter">
                A Legacy of <br/>
                <span className="text-brand-yellow italic">Trust & Excellence</span>
              </h2>
            </div>
            <div className="flex flex-col gap-8 items-start lg:items-end">
              <p className="text-white/40 text-lg font-medium leading-relaxed max-w-sm lg:text-right">
                Pioneering the agricultural commission trade in Gujarat for over four decades with absolute integrity.
              </p>
              <Magnetic>
                <Link href="/contact" className="flex items-center gap-4 bg-white text-brand-dark px-10 py-5 rounded-full font-bold hover:bg-brand-yellow transition-all">
                  Join Our Network <ArrowRight size={20} />
                </Link>
              </Magnetic>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-24">
          
          {/* Brand Identity */}
          <div className="flex flex-col gap-8">
            <Link href="/" className="flex items-center gap-4">
               <img src="/images/logo.png" alt="J J & Co." className="h-16 w-auto brightness-0 invert" />
            </Link>
            <p className="text-white/60 text-base leading-relaxed font-medium">
              Preferred partner for national industrial buyers and local farming communities across the Saurashtra region.
            </p>
            <div className="flex gap-4">
              {[
                { icon: <Globe size={20}/>, label: 'Website' },
                { icon: <Share2 size={20}/>, label: 'Share' },
                { icon: <Mail size={20}/>, label: 'Contact' }
              ].map((social, i) => (
                <Magnetic key={i}>
                  <a href="#" className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-brand-yellow hover:text-brand-dark transition-all duration-500">
                    {social.icon}
                  </a>
                </Magnetic>
              ))}
            </div>
          </div>
          
          {/* Market Expertise */}
          <div className="flex flex-col gap-10">
            <h4 className="text-brand-yellow text-xs font-bold uppercase tracking-[0.4em]">Expertise</h4>
            <ul className="flex flex-col gap-5">
              {['Market Intelligence', 'Quality Grading', 'Direct Brokerage', 'APMC Auctioning'].map((link) => (
                <li key={link}>
                  <Link href="/services" className="text-white/50 hover:text-white transition-colors text-base font-medium flex items-center gap-2 group">
                    {link}
                    <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Contact Details */}
          <div className="flex flex-col gap-10">
            <h4 className="text-brand-yellow text-xs font-bold uppercase tracking-[0.4em]">Contact</h4>
            <ul className="flex flex-col gap-8">
              <li className="group">
                <p className="text-white/30 text-[0.65rem] font-bold uppercase tracking-widest mb-2">Direct Line</p>
                <a href="tel:+919427740313" className="text-xl font-serif font-semibold hover:text-brand-yellow transition-colors tracking-tight">+91 94277 40313</a>
              </li>
              <li className="group">
                <p className="text-white/30 text-[0.65rem] font-bold uppercase tracking-widest mb-2">Correspondence</p>
                <a href="mailto:info@jjco-agri.com" className="text-lg font-medium hover:text-brand-yellow transition-colors">info@jjco-agri.com</a>
              </li>
            </ul>
          </div>
          
          {/* Office Location */}
          <div className="flex flex-col gap-10">
            <h4 className="text-brand-yellow text-xs font-bold uppercase tracking-[0.4em]">Location</h4>
            <div className="group">
              <p className="text-white/30 text-[0.65rem] font-bold uppercase tracking-widest mb-2">Junagadh Office</p>
              <p className="text-lg font-serif font-semibold leading-snug tracking-tight">
                J J and Co., Mahalaxmi Street, <br/>
                Opp. Adarsh masala ghar, <br/>
                Danapith, Junagadh 362001
              </p>
            </div>
          </div>
          
        </div>
        
        {/* Bottom Bar */}
        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8 text-[0.65rem] font-bold uppercase tracking-[0.4em] text-white/20">
          <p>&copy; {currentYear} J J & Co. Agricultural Commission Agents. All Rights Reserved.</p>
          <div className="flex gap-12">
            <Link href="#" className="hover:text-brand-yellow transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-white transition-colors">Terms of Trade</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
