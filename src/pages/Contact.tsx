import PageHeader from '../components/layout/PageHeader';
import FadeIn from '../components/animations/FadeIn';
import { Phone, MapPin, Clock, Send, MessageCircle } from 'lucide-react';

const contacts = [
  { name: "Rakesh Mashru", phone: "9427740313" },
  { name: "Bipin Bhimjiyani", phone: "9427740311" },
  { name: "Tushar Mashru", phone: "9429772799" },
  { name: "Ritesh Mashru", phone: "9429772711" },
  { name: "Jay Mashru", phone: "9723489100" },
  { name: "Sujal Mashru", phone: "9879863087" },
];

export default function Contact() {
  return (
    <div className="bg-brand-cream pb-24">
      <PageHeader 
        title="Get in Touch" 
        subtitle="We are ready to assist you with your agricultural trading needs."
        imagePath="/images/trust-bg.jpg"
      />

      <section className="pt-24 pb-12">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-16">
            
            {/* Contact Info Side */}
            <div>
              <FadeIn>
                <h2 className="text-3xl font-serif font-bold text-brand-dark mb-8">Connect With Our Experts</h2>
                
                <div className="bg-white p-8 rounded-2xl border border-brand-cream-dark shadow-sm mb-8">
                  <h3 className="font-bold text-brand-green uppercase tracking-wider text-sm mb-6 flex items-center gap-2">
                    <Phone size={18} /> Direct Trading Lines
                  </h3>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {contacts.map((contact, i) => (
                      <a 
                        key={i} 
                        href={`tel:+91${contact.phone}`}
                        className="flex items-center justify-between p-4 rounded-xl bg-brand-cream hover:bg-brand-green hover:text-white transition-colors group"
                      >
                        <span className="font-medium text-sm">{contact.name}</span>
                        <span className="font-bold font-serif group-hover:text-brand-yellow transition-colors">{contact.phone}</span>
                      </a>
                    ))}
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="flex items-start gap-4 p-6 bg-white rounded-2xl border border-brand-cream-dark">
                    <div className="bg-brand-cream p-3 rounded-xl text-brand-green">
                      <MapPin size={24} />
                    </div>
                    <div>
                      <h4 className="font-bold text-brand-dark mb-1">Office Location</h4>
                      <p className="text-brand-gray text-sm leading-relaxed">Main Market Yard, Agricultural Produce Market Committee (APMC), Gujarat, India</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4 p-6 bg-white rounded-2xl border border-brand-cream-dark">
                    <div className="bg-brand-cream p-3 rounded-xl text-brand-green">
                      <Clock size={24} />
                    </div>
                    <div>
                      <h4 className="font-bold text-brand-dark mb-1">Trading Hours</h4>
                      <p className="text-brand-gray text-sm">Monday - Saturday: 8:00 AM - 6:00 PM</p>
                      <p className="text-brand-gray text-sm">Sunday: Closed (Available for urgent bulk inquiries)</p>
                    </div>
                  </div>
                </div>
              </FadeIn>
            </div>

            {/* Form Side */}
            <div>
              <FadeIn direction="left">
                <div className="bg-brand-green p-10 md:p-12 rounded-3xl text-white relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-brand-yellow/10 rounded-full blur-3xl"></div>
                  
                  <h3 className="text-3xl font-serif font-bold mb-2 relative z-10">Send an Inquiry</h3>
                  <p className="text-white/80 mb-8 relative z-10">Fill out the form below and our agents will get back to you with current market rates.</p>
                  
                  <form className="space-y-6 relative z-10" onSubmit={(e) => e.preventDefault()}>
                    <div className="grid sm:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-white/90">Full Name</label>
                        <input type="text" className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:border-brand-yellow transition-colors" placeholder="Rajesh Bhai" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-white/90">Phone Number</label>
                        <input type="tel" className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:border-brand-yellow transition-colors" placeholder="+91 98765 43210" />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-white/90">Inquiry Type</label>
                      <select className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-yellow transition-colors appearance-none">
                        <option value="buy" className="text-brand-dark">I want to Buy (Bulk Procurement)</option>
                        <option value="sell" className="text-brand-dark">I want to Sell (Farmer/Trader)</option>
                        <option value="general" className="text-brand-dark">General Inquiry</option>
                      </select>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-white/90">Commodity & Details</label>
                      <textarea rows={4} className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:border-brand-yellow transition-colors resize-none" placeholder="E.g., Looking for 50 tonnes of Bold Groundnuts..."></textarea>
                    </div>

                    <button className="w-full bg-brand-yellow hover:bg-brand-yellow-light text-brand-dark font-bold text-lg py-4 rounded-xl transition-all flex items-center justify-center gap-2 mt-4 shadow-lg hover:shadow-xl">
                      Submit Inquiry <Send size={18} />
                    </button>
                    
                    <a href="https://wa.me/919427740313" target="_blank" rel="noreferrer" className="w-full bg-transparent hover:bg-white/10 border-2 border-white/30 text-white font-bold py-4 rounded-xl transition-all flex items-center justify-center gap-2 mt-4">
                      <MessageCircle size={18} /> Chat on WhatsApp
                    </a>
                  </form>
                </div>
              </FadeIn>
            </div>
            
          </div>
        </div>
      </section>
    </div>
  );
}
