'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Wheat, Phone, ArrowRight } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import ScrollProgress from '../animations/ScrollProgress';

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
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [pathname]);

  return (
    <>
      <ScrollProgress />
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out px-4 md:px-8',
          isScrolled ? 'pt-2' : 'pt-0'
        )}
      >
        <nav
          className={cn(
            'container mx-auto max-w-7xl transition-all duration-500 ease-in-out rounded-full flex items-center justify-between px-8 h-20',
            isScrolled
              ? 'bg-white/90 backdrop-blur-xl border border-white/40 shadow-[0_10px_30px_rgba(10,66,45,0.05)]'
              : 'bg-transparent border border-transparent'
          )}
        >
          {/* Logo */}
          <Link href="/" className="flex items-center gap-4 z-50 group">
            <div className="relative h-16 w-auto min-w-[180px] flex items-center">
              <img
                src="/images/logo.png"
                alt="J J & Co. Logo"
                className={cn(
                  "h-full w-auto object-contain transition-all duration-500",
                  isScrolled ? "brightness-100" : "brightness-0 invert"
                )}
              />
              <img
                src="/images/logoside.png"
                alt="J J & Co. Logo"
                className={cn(
                  "h-[70%] w-auto object-contain transition-all duration-500 ml-2",
                  isScrolled ? "brightness-100" : "brightness-0 invert"
                )}
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            <ul className="flex items-center gap-2">
              {navLinks.map((link) => {
                const isActive = pathname === link.path;
                const isTransparent = !isScrolled;
                return (
                  <li key={link.name}>
                    <Link
                      href={link.path}
                      className={cn(
                        "relative px-4 py-2 text-sm font-bold uppercase tracking-wider transition-all duration-300 rounded-full hover:bg-brand-green/5",
                        isActive
                          ? (isTransparent ? "text-brand-yellow" : "text-brand-green")
                          : (isTransparent ? "text-white/80 hover:text-white" : "text-brand-gray hover:text-brand-green")
                      )}
                    >
                      {link.name}
                      {isActive && (
                        <motion.div
                          layoutId="nav-underline"
                          className={cn(
                            "absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full",
                            isTransparent ? "bg-brand-yellow" : "bg-brand-green"
                          )}
                          transition={{ type: "spring", stiffness: 380, damping: 30 }}
                        />
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
            <div className="h-4 w-px bg-brand-gray/20 mx-1" />
            <Link
              href="/contact"
              className={cn(
                "group flex items-center gap-2 px-4 py-2 rounded-full font-bold text-[0.65rem] uppercase tracking-widest transition-all duration-300 shadow-sm",
                !isScrolled
                  ? "bg-white text-brand-green hover:bg-brand-yellow hover:text-brand-dark"
                  : "bg-brand-green text-white hover:bg-brand-green-light hover:shadow-lg hover:-translate-y-0.5"
              )}
            >
              <span>Contact</span>
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-all" />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className={cn(
              "lg:hidden z-50 p-2 rounded-xl transition-colors",
              (!isScrolled && !mobileMenuOpen) ? "text-white hover:bg-white/10" : "text-brand-green hover:bg-brand-green/5"
            )}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-brand-dark/20 backdrop-blur-md z-[60] lg:hidden"
            onClick={() => setMobileMenuOpen(false)}
          >
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="absolute right-0 top-0 bottom-0 w-[80%] max-w-sm bg-brand-cream shadow-2xl p-8 flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-12">
                <span className="font-serif text-2xl font-bold text-brand-green">J J & Co.</span>
                <button onClick={() => setMobileMenuOpen(false)}>
                  <X size={24} className="text-brand-dark" />
                </button>
              </div>

              <nav className="flex flex-col gap-2">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.path}
                    className={cn(
                      "text-xl font-serif py-3 px-4 rounded-xl transition-colors",
                      pathname === link.path ? "bg-brand-green text-white" : "text-brand-dark hover:bg-brand-green/5"
                    )}
                  >
                    {link.name}
                  </Link>
                ))}
              </nav>

              <div className="mt-auto">
                <a
                  href="tel:+919427740313"
                  className="flex items-center gap-3 p-4 bg-brand-yellow text-brand-dark rounded-2xl font-bold shadow-lg"
                >
                  <Phone size={20} />
                  <span>+91 94277 40313</span>
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
