'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import Magnetic from '../animations/Magnetic';

const slides = [
  {
    video: "https://assets.mixkit.io/videos/preview/mixkit-farmer-walking-through-a-field-of-wheat-4422-large.mp4",
    image: "/images/hero-bg.jpg",
    title: "The Gold Standard in Agri-Trade.",
    subtitle: "Bridging the gap between farmers and industry with absolute transparency since 1977."
  },
  {
    video: "https://assets.mixkit.io/videos/preview/mixkit-close-up-of-grains-of-wheat-falling-4416-large.mp4",
    image: "/images/products-bg.jpg",
    title: "Premium Quality Procurement.",
    subtitle: "Specializing in Groundnuts, Grains, and Pulses with expert grading and moisture control."
  },
  {
    video: "https://assets.mixkit.io/videos/preview/mixkit-hands-holding-freshly-harvested-groundnuts-4424-large.mp4",
    image: "/images/pulses-bg.jpg",
    title: "Generational Trust & Legacy.",
    subtitle: "Built on four decades of market wisdom and the prosperity of our agricultural community."
  }
];

export default function HeroCarousel() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 8000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrent((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrent((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <section className="relative h-screen min-h-[750px] w-full overflow-hidden bg-brand-dark">
      <AnimatePresence initial={false}>
        <motion.div
          key={current}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0"
        >
          {/* Background Layer */}
          <div className="absolute inset-0 z-0">
             <video
              key={slides[current].video}
              autoPlay
              muted
              loop
              playsInline
              poster={slides[current].image}
              className="h-full w-full object-cover opacity-50"
            >
              <source src={slides[current].video} type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-brand-dark/40 backdrop-blur-[1px]"></div>
          </div>

          {/* Content Layer */}
          <div className="relative z-20 flex h-full items-center justify-center text-center px-6">
            <div className="max-w-5xl">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 1 }}
              >
                <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-brand-yellow/10 border border-brand-yellow/20 backdrop-blur-md mb-8">
                  <div className="w-2 h-2 rounded-full bg-brand-yellow animate-pulse"></div>
                  <span className="text-[0.65rem] font-bold tracking-[0.3em] text-brand-yellow uppercase">Trading Excellence Since 1977</span>
                </div>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 1 }}
                className="text-5xl md:text-8xl font-serif font-semibold text-white leading-[1.1] mb-10 tracking-tight"
              >
                {slides[current].title}
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 1 }}
                className="text-lg md:text-2xl text-white/80 mb-14 max-w-3xl mx-auto leading-relaxed font-light font-sans"
              >
                {slides[current].subtitle}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 1 }}
                className="flex flex-col sm:flex-row items-center justify-center gap-8"
              >
                <Magnetic>
                  <Link href="/services" className="group bg-brand-green text-white px-12 py-6 rounded-full font-bold text-lg transition-all shadow-2xl shadow-brand-green/20 hover:shadow-brand-green/40 flex items-center gap-3">
                    Our Services
                    <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform duration-500" />
                  </Link>
                </Magnetic>
                <Magnetic>
                  <Link href="/contact" className="bg-white/10 backdrop-blur-md text-white border border-white/20 px-12 py-6 rounded-full font-bold text-lg transition-all hover:bg-white/20">
                    Partner With Us
                  </Link>
                </Magnetic>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Arrows - Higher Z-index */}
      <div className="absolute inset-x-8 top-1/2 z-40 flex -translate-y-1/2 justify-between pointer-events-none">
        <button 
          onClick={prevSlide}
          className="pointer-events-auto h-16 w-16 flex items-center justify-center rounded-full border border-white/10 bg-white/5 text-white backdrop-blur-md hover:bg-white/20 transition-all"
        >
          <ChevronLeft size={32} />
        </button>
        <button 
          onClick={nextSlide}
          className="pointer-events-auto h-16 w-16 flex items-center justify-center rounded-full border border-white/10 bg-white/5 text-white backdrop-blur-md hover:bg-white/20 transition-all"
        >
          <ChevronRight size={32} />
        </button>
      </div>

      {/* Progress Indicators */}
      <div className="absolute bottom-12 left-1/2 z-40 flex -translate-x-1/2 gap-4">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`h-1.5 rounded-full transition-all duration-500 ${current === i ? 'w-16 bg-brand-yellow' : 'w-4 bg-white/20'}`}
          />
        ))}
      </div>
    </section>
  );
}
