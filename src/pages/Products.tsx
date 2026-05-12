import PageHeader from '../components/layout/PageHeader';
import FadeIn from '../components/animations/FadeIn';
import { Check } from 'lucide-react';

const products = [
  {
    title: "Groundnuts (Peanuts)",
    image: "/images/products-bg.jpg",
    description: "Our premier specialty. We source the finest quality groundnuts from top yielding regions, catering to oil mills, exporters, and wholesale markets.",
    features: ["Bold & Java varieties", "Strict moisture control", "High oil content assurance", "Aflatoxin-aware sourcing"]
  },
  {
    title: "Premium Grains",
    image: "/images/pulses-bg.jpg",
    description: "Comprehensive trading of staple grains essential for the food industry. We ensure consistent supply and quality for bulk buyers.",
    features: ["Wheat (Lokwan, Tukdi)", "Millet (Bajra)", "Sorghum (Jowar)", "Maize / Corn"]
  },
  {
    title: "Pulses & Lentils",
    image: "/images/hero-bg.jpg",
    description: "A wide variety of high-protein pulses sourced directly from farmers, rigorously checked for size, color, and polish.",
    features: ["Green Gram (Moong)", "Pigeon Pea (Toor/Arhar)", "Chickpeas (Chana)", "Black Gram (Urad)"]
  },
  {
    title: "Oil Seeds",
    image: "/images/trust-bg.jpg",
    description: "Crucial commodities for the edible oil industry. We facilitate large-scale trades with a focus on yield and purity.",
    features: ["Mustard Seeds", "Sesame Seeds", "Castor Seeds", "Cotton Seeds"]
  },
  {
    title: "Spices & Commodities",
    image: "/images/pulses-bg.jpg",
    description: "Seasonal trading of essential Indian spices and other agricultural commodities, connecting local spice farmers with national buyers.",
    features: ["Cumin (Jeera)", "Coriander (Dhania)", "Fennel (Saunf)", "Fenugreek"]
  },
  {
    title: "Seasonal Cash Crops",
    image: "/images/products-bg.jpg",
    description: "Agile trading capabilities for seasonal agricultural products, capitalizing on harvest timings for optimal pricing.",
    features: ["Raw Cotton", "Onions & Garlic", "Seasonal yields", "Market-timed trading"]
  }
];

export default function Products() {
  return (
    <div className="bg-brand-cream pb-24">
      <PageHeader 
        title="Commodities Traded" 
        subtitle="Premium quality agricultural products sourced with expertise."
        imagePath="/images/products-bg.jpg"
      />

      <section className="pt-24">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid md:grid-cols-2 gap-12">
            {products.map((product, i) => (
              <FadeIn key={i} delay={i * 0.1} direction={i % 2 === 0 ? "right" : "left"}>
                <div className="bg-white rounded-2xl overflow-hidden shadow-lg border border-brand-cream-dark flex flex-col h-full group">
                  <div className="relative h-64 overflow-hidden">
                    <img 
                      src={product.image} 
                      alt={product.title} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-brand-dark/20 group-hover:bg-transparent transition-colors duration-500"></div>
                  </div>
                  <div className="p-8 flex-grow flex flex-col">
                    <h3 className="text-2xl font-serif font-bold text-brand-dark mb-4">{product.title}</h3>
                    <p className="text-brand-gray mb-6 leading-relaxed flex-grow">
                      {product.description}
                    </p>
                    <div className="bg-brand-cream p-5 rounded-xl">
                      <h4 className="text-sm font-bold text-brand-green uppercase mb-3 tracking-wider">Trading Highlights</h4>
                      <ul className="grid grid-cols-2 gap-2">
                        {product.features.map((feature, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-sm text-brand-dark font-medium">
                            <Check size={16} className="text-brand-yellow shrink-0 mt-0.5" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
