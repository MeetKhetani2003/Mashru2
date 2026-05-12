import PageHeader from '../components/layout/PageHeader';
import FadeIn from '../components/animations/FadeIn';
import { Target, Eye, Shield, Leaf, Users } from 'lucide-react';

export default function About() {
  return (
    <div className="bg-brand-cream">
      <PageHeader 
        title="Our Story" 
        subtitle="Four decades of trust, transparency, and agricultural excellence."
        imagePath="/images/trust-bg.jpg"
      />

      {/* Main Story Section */}
      <section className="py-24">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="text-center mb-16">
            <FadeIn>
              <h2 className="text-sm font-bold tracking-widest text-brand-green uppercase mb-3">Established 1977</h2>
              <h3 className="text-3xl md:text-5xl font-serif font-bold text-brand-dark mb-8">A Legacy Rooted in Agriculture</h3>
              <div className="text-lg text-brand-gray leading-relaxed space-y-6 text-left md:text-center max-w-4xl mx-auto">
                <p>
                  J J & Co. was founded in 1977 with a simple yet powerful mission: to create a fair, transparent, and efficient bridge between the hard-working farmers of India and the bulk commodity buyers who depend on their harvest.
                </p>
                <p>
                  What started as a modest commission agency in the local APMC market has grown into a highly respected institution. For over 40 years, we have specialized in the trade of groundnuts, grains, pulses, and seeds, building relationships that span generations.
                </p>
                <p className="font-serif text-xl md:text-2xl text-brand-green mt-8 italic">
                  "In the agricultural business, trust is the true currency. We have never compromised on our word, and that is why our clients stay with us for decades."
                </p>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-24 bg-white relative">
        <div className="container mx-auto px-6 max-w-7xl">
          <FadeIn className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand-dark mb-4">Our Core Values</h2>
            <p className="text-brand-gray">The principles that guide every transaction.</p>
          </FadeIn>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Shield size={32} />,
                title: "Absolute Transparency",
                desc: "Clear commission structures and fair pricing for both farmers and buyers. No hidden costs, ever."
              },
              {
                icon: <Users size={32} />,
                title: "Long-Term Relationships",
                desc: "We don't just facilitate trades; we build generational partnerships based on mutual growth."
              },
              {
                icon: <Leaf size={32} />,
                title: "Quality Integrity",
                desc: "Expert, honest assessment of agricultural commodities to ensure buyers get exactly what they pay for."
              }
            ].map((value, i) => (
              <FadeIn key={i} delay={i * 0.1} direction="up">
                <div className="bg-brand-cream p-10 rounded-2xl border border-brand-cream-dark text-center h-full">
                  <div className="w-16 h-16 bg-brand-green text-brand-yellow rounded-full flex items-center justify-center mx-auto mb-6">
                    {value.icon}
                  </div>
                  <h3 className="text-xl font-serif font-bold text-brand-dark mb-4">{value.title}</h3>
                  <p className="text-brand-gray leading-relaxed">{value.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-24 bg-brand-green text-white">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="grid md:grid-cols-2 gap-16">
            <FadeIn direction="right">
              <div className="flex items-center gap-4 mb-6">
                <Target size={40} className="text-brand-yellow" />
                <h2 className="text-3xl font-serif font-bold">Our Mission</h2>
              </div>
              <p className="text-white/80 text-lg leading-relaxed">
                To empower the agricultural supply chain by providing the most reliable, efficient, and transparent commission agency services. We strive to maximize returns for farmers while ensuring consistent, high-quality procurement for buyers.
              </p>
            </FadeIn>
            <FadeIn direction="left">
              <div className="flex items-center gap-4 mb-6">
                <Eye size={40} className="text-brand-yellow" />
                <h2 className="text-3xl font-serif font-bold">Our Vision</h2>
              </div>
              <p className="text-white/80 text-lg leading-relaxed">
                To be the undisputed benchmark for trust and excellence in the Indian agricultural commodities market, preserving our traditional roots while embracing modern efficiency to serve the next generation of agriculture.
              </p>
            </FadeIn>
          </div>
        </div>
      </section>
    </div>
  );
}
