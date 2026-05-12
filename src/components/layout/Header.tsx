import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Wheat, Phone } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: (string | undefined | null | false)[]) {
  return twMerge(clsx(inputs));
}

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Services', path: '/services' },
  { name: 'Products', path: '/products' },
  { name: 'Market Network', path: '/network' },
  { name: 'Clients', path: '/clients' },
  { name: 'Gallery', path: '/gallery' },
  { name: 'Contact', path: '/contact' },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled ? 'bg-brand-cream/90 backdrop-blur-md shadow-sm py-4' : 'bg-transparent py-6'
      )}
    >
      <div className="container mx-auto px-6 max-w-7xl flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 z-50 group">
          <div className="bg-brand-green text-brand-yellow p-2 rounded-full group-hover:bg-brand-green-light transition-colors">
            <Wheat size={28} />
          </div>
          <div>
            <h1 className={cn(
              "font-serif text-2xl font-bold leading-tight transition-colors",
              isScrolled ? "text-brand-green" : (location.pathname === '/' ? "text-brand-green drop-shadow-sm md:text-white" : "text-brand-green")
            )}>
              J J & Co.
            </h1>
            <p className={cn(
              "text-[0.65rem] tracking-wider uppercase font-medium transition-colors",
              isScrolled ? "text-brand-gray" : (location.pathname === '/' ? "text-brand-gray drop-shadow-sm md:text-white/80" : "text-brand-gray")
            )}>Since 1977</p>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-8">
          <ul className="flex items-center gap-6">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              const isHomeTransparent = location.pathname === '/' && !isScrolled;
              return (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className={cn(
                      "text-sm font-medium transition-colors hover:text-brand-yellow",
                      isActive 
                        ? (isHomeTransparent ? "text-brand-yellow font-semibold" : "text-brand-green font-semibold")
                        : (isHomeTransparent ? "text-white/90" : "text-brand-gray")
                    )}
                  >
                    {link.name}
                  </Link>
                </li>
              );
            })}
          </ul>
          <Link
            to="/contact"
            className={cn(
              "flex items-center gap-2 px-5 py-2.5 rounded-full font-medium text-sm transition-all shadow-sm hover:shadow-md",
              (location.pathname === '/' && !isScrolled)
                ? "bg-white text-brand-green hover:bg-brand-cream"
                : "bg-brand-green text-white hover:bg-brand-green-light"
            )}
          >
            <Phone size={16} />
            <span>Get in Touch</span>
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className={cn(
            "lg:hidden z-50 p-2",
            (location.pathname === '/' && !isScrolled && !mobileMenuOpen) ? "text-white" : "text-brand-green"
          )}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-brand-cream z-40 lg:hidden pt-28 pb-6 px-6 overflow-y-auto"
          >
            <div className="flex flex-col gap-6">
              <nav className="flex flex-col gap-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    to={link.path}
                    className={cn(
                      "text-2xl font-serif py-2 border-b border-brand-cream-dark",
                      location.pathname === link.path ? "text-brand-green font-semibold" : "text-brand-dark"
                    )}
                  >
                    {link.name}
                  </Link>
                ))}
              </nav>
              <div className="mt-8">
                <Link
                  to="/contact"
                  className="flex items-center justify-center gap-2 w-full py-4 bg-brand-green text-white rounded-lg font-medium"
                >
                  <Phone size={18} />
                  <span>Call Us Now</span>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
