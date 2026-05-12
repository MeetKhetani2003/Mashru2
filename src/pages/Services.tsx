import PageHeader from '../components/layout/PageHeader';
import FadeIn from '../components/animations/FadeIn';
import { Handshake, TrendingUp, Scale, Truck, Users, BookOpen, Coins, Globe, Wheat } from 'lucide-react';

const services = [
  {
    icon: <Handshake size={28} />,
    title: "Commission Agency",
    description: "Our core service. We act as the trusted middleman, facilitating secure, transparent trades between farmers and bulk buyers with fair commission structures."
  },
  {
    icon: <Users size={28} />,
    title: "Buyer-Seller Connection",
    description: "Leveraging our 400+ client network to match exactly what a buyer needs with what a farmer has produced, ensuring perfect market synergy."
  },
  {
    icon: <Scale size={28} />,
    title: "Quality Assessment",
    description: "Expert, unbiased evaluation of groundnuts, grains, and pulses. We verify moisture content, size, and overall quality to ensure fair pricing."
  },
  {
    icon: <TrendingUp size={28} />,
    title: "Market Guidance",
    description: "Providing real-time mandi updates, price trends, and strategic advice on the best times to buy or sell agricultural commodities."
  },
  {
    icon: <Coins size={28} />,
    title: "Pricing Assistance",
    description: "Negotiating on behalf of our clients to ensure the most competitive and fair market rates, driven by deep industry knowledge."
  },
  {
    icon: <Wheat size={28} />,
    title: "Bulk Procurement",
    description: "Coordinating large-scale sourcing for commercial buyers, mills, and exporters, handling everything from sourcing to finalizing the trade."
  },
  {
    icon: <Truck size={28} />,
    title: "Logistics Coordination",
    description: "Assisting with the arrangement of weighing, packaging, and transport logistics from the APMC market yard to the buyer's destination."
  },
  {
    icon: <Globe size={28} />,
    title: "Market Network Support",
    description: "Connecting local agricultural produce with regional and national markets, expanding the reach for sellers and options for buyers."
  },
  {
    icon: <BookOpen size={28} />,
    title: "Documentation & Compliance",
    description: "Ensuring all mandi taxes, trade documentation, and payment processing are handled smoothly, legally, and transparently."
  }
];

export default function Services() {
  return (
    <div className="bg-brand-cream pb-24">
      <PageHeader 
        title="Our Services" 
        subtitle="Comprehensive trading and commission solutions for the modern agricultural market."
        imagePath="/images/products-bg.jpg"
      />

      <section className="pt-24 pb-12">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <FadeIn>
              <h2 className="text-3xl md:text-5xl font-serif font-bold text-brand-dark mb-6">Expertise You Can Count On</h2>
              <p className="text-brand-gray text-lg">
                Since 1977, we have perfected the art of agricultural commodity trading. We handle the complexities of the mandi so our clients can trade with absolute peace of mind.
              </p>
            </FadeIn>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, i) => (
              <FadeIn key={i} delay={i * 0.1} direction="up">
                <div className="bg-white p-8 rounded-2xl shadow-sm border border-brand-cream-dark hover:shadow-xl hover:border-brand-green/30 transition-all duration-300 h-full group">
                  <div className="bg-brand-cream w-14 h-14 rounded-xl flex items-center justify-center text-brand-green mb-6 group-hover:bg-brand-green group-hover:text-brand-yellow transition-colors">
                    {service.icon}
                  </div>
                  <h3 className="text-xl font-serif font-bold text-brand-dark mb-3 group-hover:text-brand-green transition-colors">{service.title}</h3>
                  <p className="text-brand-gray leading-relaxed text-sm">
                    {service.description}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>
      
      {/* Service CTA */}
      <section className="container mx-auto px-6 max-w-5xl mt-12">
        <FadeIn>
          <div className="bg-brand-green rounded-3xl p-10 md:p-16 text-center relative overflow-hidden">
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-brand-yellow rounded-full blur-3xl opacity-20"></div>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-6 relative z-10">Looking for a Specific Commodity?</h2>
            <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto relative z-10">
              Get in touch with our expert agents today to discuss your procurement or selling needs. We provide custom solutions for bulk orders.
            </p>
            <a href="tel:+919427740313" className="inline-block bg-brand-yellow hover:bg-brand-yellow-light text-brand-dark px-8 py-4 rounded-full font-bold text-lg transition-all shadow-lg hover:shadow-xl relative z-10">
              Speak to an Agent
            </a>
          </div>
        </FadeIn>
      </section>
    </div>
  );
}
