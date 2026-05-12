import { Link } from 'react-router-dom';
import { Wheat, MapPin, Phone, Mail, Clock } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-brand-green text-white/80 pt-20 pb-10">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
          
          {/* Brand Info */}
          <div className="flex flex-col gap-6">
            <Link to="/" className="flex items-center gap-3">
              <div className="bg-brand-yellow text-brand-green p-2 rounded-full">
                <Wheat size={24} />
              </div>
              <div>
                <h2 className="font-serif text-2xl font-bold leading-tight text-white">
                  J J & Co.
                </h2>
                <p className="text-[0.65rem] tracking-wider uppercase font-medium text-brand-yellow">Since 1977</p>
              </div>
            </Link>
            <p className="text-sm leading-relaxed">
              Trusted agricultural commission agents connecting farmers and buyers for over four decades. Specializing in groundnuts, grains, and commodities with absolute transparency.
            </p>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="font-serif text-lg text-white mb-6 font-semibold">Quick Links</h3>
            <ul className="flex flex-col gap-3">
              <li><Link to="/about" className="hover:text-brand-yellow transition-colors">About Our Journey</Link></li>
              <li><Link to="/services" className="hover:text-brand-yellow transition-colors">Commission Services</Link></li>
              <li><Link to="/products" className="hover:text-brand-yellow transition-colors">Agricultural Products</Link></li>
              <li><Link to="/network" className="hover:text-brand-yellow transition-colors">Market Network</Link></li>
              <li><Link to="/gallery" className="hover:text-brand-yellow transition-colors">Trading Gallery</Link></li>
            </ul>
          </div>
          
          {/* Contact Details */}
          <div>
            <h3 className="font-serif text-lg text-white mb-6 font-semibold">Contact Us</h3>
            <ul className="flex flex-col gap-4">
              <li className="flex gap-3">
                <MapPin size={20} className="text-brand-yellow shrink-0 mt-0.5" />
                <span className="text-sm">Main Market Yard, Agricultural Produce Market Committee (APMC), Gujarat, India</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={20} className="text-brand-yellow shrink-0" />
                <a href="tel:+919427740313" className="text-sm hover:text-white transition-colors">+91 94277 40313 (Rakesh)</a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={20} className="text-brand-yellow shrink-0" />
                <a href="mailto:info@jjco-agri.com" className="text-sm hover:text-white transition-colors">info@jjco-agri.com</a>
              </li>
              <li className="flex items-center gap-3">
                <Clock size={20} className="text-brand-yellow shrink-0" />
                <span className="text-sm">Mon - Sat: 8:00 AM - 6:00 PM</span>
              </li>
            </ul>
          </div>
          
          {/* Services */}
          <div>
            <h3 className="font-serif text-lg text-white mb-6 font-semibold">Key Specialties</h3>
            <ul className="flex flex-col gap-3">
              <li className="flex items-center gap-2 text-sm">
                <div className="w-1.5 h-1.5 rounded-full bg-brand-yellow" /> Groundnuts Commission
              </li>
              <li className="flex items-center gap-2 text-sm">
                <div className="w-1.5 h-1.5 rounded-full bg-brand-yellow" /> Grains Trading
              </li>
              <li className="flex items-center gap-2 text-sm">
                <div className="w-1.5 h-1.5 rounded-full bg-brand-yellow" /> Pulses & Seeds
              </li>
              <li className="flex items-center gap-2 text-sm">
                <div className="w-1.5 h-1.5 rounded-full bg-brand-yellow" /> Bulk Procurement
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-white/20 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-center md:text-left">
            &copy; {currentYear} J J & Co. Agricultural Commission Agents. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm">
            <Link to="#" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="#" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
