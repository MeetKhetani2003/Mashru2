'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface FadeInProps {
  children: ReactNode;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  className?: string;
  duration?: number;
  scale?: number;
  blur?: number;
  staggerChildren?: number;
}

export default function FadeIn({
  children,
  delay = 0,
  direction = 'up',
  className = '',
  duration = 0.8,
  scale = 1,
  blur = 0,
  staggerChildren = 0
}: FadeInProps) {
  const directions = {
    up: { y: 40, x: 0 },
    down: { y: -40, x: 0 },
    left: { x: 40, y: 0 },
    right: { x: -40, y: 0 },
    none: { x: 0, y: 0 }
  };

  return (
    <motion.div
      initial={{
        opacity: 0,
        ...directions[direction],
        scale: scale === 1 ? 1 : scale,
        filter: blur > 0 ? `blur(${blur}px)` : 'none'
      }}
      whileInView={{
        opacity: 1,
        x: 0,
        y: 0,
        scale: 1,
        filter: 'blur(0px)'
      }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{
        duration,
        delay,
        ease: [0.16, 1, 0.3, 1], // Custom cubic-bezier for more premium feel
        staggerChildren: staggerChildren
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
