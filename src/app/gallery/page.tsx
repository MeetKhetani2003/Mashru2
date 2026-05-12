'use client';

import PageHeader from '@/components/layout/PageHeader';
import FadeIn from '@/components/animations/FadeIn';

const galleryImages = [
  { src: "/images/hero-bg.jpg", alt: "Mandi Environment", size: "large" },
  { src: "/images/products-bg.jpg", alt: "Premium Groundnuts", size: "small" },
  { src: "/images/pulses-bg.jpg", alt: "Quality Pulses and Grains", size: "small" },
  { src: "/images/trust-bg.jpg", alt: "Agricultural Trust", size: "wide" },
  { src: "/images/products-bg.jpg", alt: "Raw Materials", size: "small" },
  { src: "/images/hero-bg.jpg", alt: "Warehouse Storage", size: "small" },
];

export default function Gallery() {
  return (
    <div className="bg-brand-cream pb-24">
      <PageHeader 
        title="Gallery" 
        subtitle="A glimpse into our trading environment and premium commodities."
        imagePath="/images/pulses-bg.jpg"
      />

      <section className="pt-24">
        <div className="container mx-auto px-6 max-w-7xl">
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {galleryImages.map((img, i) => {
              // Custom spanning logic for a masonry-like feel
              let spanClass = "";
              if (img.size === "large") spanClass = "md:col-span-2 md:row-span-2";
              if (img.size === "wide") spanClass = "md:col-span-2";

              return (
                <FadeIn 
                  key={i} 
                  delay={i * 0.1} 
                  className={`relative rounded-2xl overflow-hidden group aspect-square md:aspect-auto ${spanClass} min-h-[300px]`}
                >
                  <img 
                    src={img.src} 
                    alt={img.alt} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/90 via-brand-dark/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                    <div className="p-8 w-full translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                      <p className="text-white font-serif text-xl font-bold">{img.alt}</p>
                      <div className="w-12 h-1 bg-brand-yellow mt-3 rounded-full"></div>
                    </div>
                  </div>
                </FadeIn>
              );
            })}
          </div>

        </div>
      </section>
    </div>
  );
}
