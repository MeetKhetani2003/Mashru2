'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface PageHeaderProps {
  title: string;
  subtitle: string;
  imagePath: string;
}

export default function PageHeader({ title, subtitle, imagePath }: PageHeaderProps) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.3]);

  return (
    <div ref={ref} className="relative h-[60vh] min-h-[500px] flex items-center justify-center pt-24 overflow-hidden bg-brand-dark">
      {/* Background Layer with Parallax */}
      <motion.div 
        className="absolute inset-0 z-0"
        style={{ y, scale }}
      >
        <img 
          src={imagePath} 
          alt={title} 
          className="w-full h-full object-cover opacity-30 grayscale contrast-125"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-brand-dark/60 via-transparent to-brand-dark"></div>
        {/* Grain Overlay for Filmic Texture */}
        <div className="absolute inset-0 opacity-40 mix-blend-overlay pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
      </motion.div>
      
      {/* Structural Framing Elements */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        <div className="absolute left-8 md:left-16 top-0 bottom-0 w-px bg-white/10"></div>
        <div className="absolute right-8 md:right-16 top-0 bottom-0 w-px bg-white/10"></div>
        <div className="absolute top-1/2 left-0 right-0 h-px bg-white/5 -translate-y-1/2"></div>
      </div>

      <motion.div 
        className="container relative z-20 mx-auto px-6 max-w-7xl text-center"
        style={{ opacity }}
      >
        <div className="mb-8">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: 80 }}
            transition={{ duration: 1, ease: "circOut" }}
            className="h-1 bg-brand-yellow mx-auto mb-10"
          ></motion.div>
          <motion.h1 
            className="text-6xl md:text-8xl lg:text-9xl font-serif font-semibold text-white mb-8 tracking-tighter leading-tight"
            initial={{ opacity: 0, y: 50, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            {title.split(' ').map((word, i) => (
              <span key={i} className={i % 2 !== 0 ? "text-brand-green italic font-light" : ""}>
                {word}{' '}
              </span>
            ))}
          </motion.h1>
          <motion.p 
            className="text-white/60 text-lg md:text-2xl font-medium max-w-2xl mx-auto leading-relaxed tracking-wide"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            {subtitle}
          </motion.p>
        </div>
      </motion.div>
      
      {/* Scroll Indicator */}
      <motion.div 
        className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <div className="flex flex-col items-center gap-4">
          <span className="text-white/20 text-[0.6rem] uppercase tracking-[0.5em] font-bold">Discover</span>
          <div className="w-px h-16 bg-gradient-to-b from-brand-yellow to-transparent"></div>
        </div>
      </motion.div>
    </div>
  );
}
