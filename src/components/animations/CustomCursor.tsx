'use client';

import { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';
import { usePathname } from 'next/navigation';

export default function CustomCursor() {
  const pathname = usePathname();
  const isAdminPage = pathname.startsWith('/admin');
  
  if (isAdminPage) return null;

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  const springConfig = { damping: 25, stiffness: 700 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    window.addEventListener('mousemove', moveCursor);
    return () => {
      window.removeEventListener('mousemove', moveCursor);
    };
  }, [cursorX, cursorY]);

  return (
    <motion.div
      className="custom-cursor"
      style={{
        translateX: cursorXSpring,
        translateY: cursorYSpring,
        left: -10,
        top: -10,
      }}
    />
  );
}
