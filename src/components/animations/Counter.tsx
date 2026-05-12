'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';

interface CounterProps {
  value: number;
  suffix?: string;
  duration?: number;
}

export default function Counter({ value, suffix = "", duration = 2 }: CounterProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (isInView) {
      setDisplayValue(value);
    }
  }, [isInView, value]);

  const digits = displayValue.toString().split('');

  return (
    <span ref={ref} className="inline-flex items-center overflow-hidden h-[1.2em]">
      <div className="flex">
        {digits.map((digit, i) => (
          <Digit key={`${i}-${digit}`} digit={digit} duration={duration} delay={i * 0.1} />
        ))}
      </div>
      {suffix && <span className="ml-1">{suffix}</span>}
    </span>
  );
}

function Digit({ digit, duration, delay }: { digit: string; duration: number; delay: number }) {
  const isNumber = !isNaN(parseInt(digit));
  
  if (!isNumber) return <span>{digit}</span>;

  const targetDigit = parseInt(digit);
  
  return (
    <div className="relative w-[0.6em] h-[1.2em] overflow-hidden flex flex-col items-center">
      <motion.div
        initial={{ y: 0 }}
        animate={{ y: `-${targetDigit * 10}%` }}
        transition={{ 
          duration: duration, 
          delay: delay, 
          ease: [0.16, 1, 0.3, 1] 
        }}
        className="flex flex-col"
      >
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => (
          <div key={n} className="h-[1.2em] flex items-center justify-center">
            {n}
          </div>
        ))}
      </motion.div>
    </div>
  );
}
