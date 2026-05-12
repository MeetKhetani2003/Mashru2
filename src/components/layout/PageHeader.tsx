import { motion } from 'framer-motion';

interface PageHeaderProps {
  title: string;
  subtitle: string;
  imagePath: string;
}

export default function PageHeader({ title, subtitle, imagePath }: PageHeaderProps) {
  return (
    <div className="relative h-[40vh] min-h-[400px] flex items-center justify-center pt-20 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img 
          src={imagePath} 
          alt={title} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-brand-dark/80 backdrop-blur-[2px]"></div>
      </div>
      
      <div className="container relative z-10 mx-auto px-6 max-w-7xl text-center">
        <motion.h1 
          className="text-4xl md:text-6xl font-serif font-bold text-white mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {title}
        </motion.h1>
        <motion.p 
          className="text-brand-yellow text-lg md:text-xl font-medium max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          {subtitle}
        </motion.p>
        
        {/* Decorative line */}
        <motion.div 
          className="w-24 h-1 bg-brand-green mt-8 mx-auto rounded-full"
          initial={{ opacity: 0, width: 0 }}
          animate={{ opacity: 1, width: 96 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        />
      </div>
    </div>
  );
}
