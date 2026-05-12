import PageHeader from '../components/layout/PageHeader';
import FadeIn from '../components/animations/FadeIn';
import { Quote, Building, Factory, Store } from 'lucide-react';

const testimonials = [
  {
    quote: "J J & Co. has been our primary procurement partner for groundnuts for over a decade. Their commitment to quality and transparent pricing is unmatched in the mandi.",
    author: "Rajesh Patel",
    company: "Premium Oil Mills",
    type: "Bulk Buyer"
  },
  {
    quote: "As a farmer, finding a commission agent who genuinely looks out for your best interest is rare. They ensure my harvest gets the right price every single season.",
    author: "Vikramsinh Jadeja",
    company: "Agricultural Producer",
    type: "Farmer"
  },
  {
    quote: "The efficiency with which they handle bulk grain orders makes our logistics seamless. True professionals with deep roots in the agricultural market.",
    author: "Amit Shah",
    company: "National Grain Traders",
    type: "Wholesaler"
  }
];

export default function Clients() {
  return (
    <div className="bg-brand-cream pb-24">
      <PageHeader 
        title="Our Clients" 
        subtitle="Trusted by generations of farmers and buyers."
        imagePath="/images/trust-bg.jpg"
      />

      {/* Client Categories */}
      <section className="pt-24 pb-12">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="text-center mb-16">
            <FadeIn>
              <h2 className="text-3xl md:text-5xl font-serif font-bold text-brand-dark mb-6">400+ Active Relationships</h2>
              <p className="text-brand-gray text-lg max-w-2xl mx-auto">
                Our client base spans the entire agricultural supply chain. We treat every client, big or small, with the same level of integrity and dedication.
              </p>
            </FadeIn>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-24">
            {[
              { icon: <Factory size={40}/>, title: "Processing Mills", desc: "Oil mills and dal mills relying on us for consistent, high-quality bulk raw materials." },
              { icon: <Building size={40}/>, title: "Corporate Traders", desc: "Large scale agricultural trading companies sourcing commodities for national distribution." },
              { icon: <Store size={40}/>, title: "Wholesale Buyers", desc: "Regional market wholesalers looking for competitive pricing and guaranteed quality." }
            ].map((cat, i) => (
              <FadeIn key={i} delay={i * 0.1} direction="up">
                <div className="bg-white p-10 rounded-2xl text-center shadow-sm border border-brand-cream-dark hover:border-brand-green transition-colors">
                  <div className="text-brand-green mb-6 flex justify-center">{cat.icon}</div>
                  <h3 className="text-xl font-serif font-bold text-brand-dark mb-4">{cat.title}</h3>
                  <p className="text-brand-gray">{cat.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>

          {/* Testimonials */}
          <div className="bg-brand-green rounded-3xl p-8 md:p-16 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-brand-yellow/10 rounded-full blur-3xl"></div>
            <FadeIn>
              <h2 className="text-3xl font-serif font-bold text-white text-center mb-12 relative z-10">Client Testimonials</h2>
            </FadeIn>
            <div className="grid md:grid-cols-3 gap-8 relative z-10">
              {testimonials.map((test, i) => (
                <FadeIn key={i} delay={i * 0.2}>
                  <div className="bg-white/10 backdrop-blur-md p-8 rounded-2xl border border-white/20 h-full flex flex-col">
                    <Quote size={32} className="text-brand-yellow mb-6 opacity-50" />
                    <p className="text-white/90 italic mb-8 flex-grow leading-relaxed">"{test.quote}"</p>
                    <div className="border-t border-white/20 pt-6">
                      <p className="text-white font-bold text-lg">{test.author}</p>
                      <p className="text-brand-yellow text-sm font-medium">{test.company}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <div className="w-2 h-2 rounded-full bg-brand-green-light"></div>
                        <p className="text-white/60 text-xs uppercase tracking-wider">{test.type}</p>
                      </div>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
