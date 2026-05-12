'use client';

import { useState } from 'react';
import PageHeader from '@/components/layout/PageHeader';
import FadeIn from '@/components/animations/FadeIn';
import { Phone, MapPin, Clock, Send, MessageCircle, CheckCircle2 } from 'lucide-react';

const contacts = [
  { name: "Rakesh Mashru", phone: "9427740313" },
  { name: "Bipin Bhimjiyani", phone: "9427740311" },
  { name: "Tushar Mashru", phone: "9429772799" },
  { name: "Ritesh Mashru", phone: "9429772711" },
  { name: "Jay Mashru", phone: "9723489100" },
  { name: "Sujal Mashru", phone: "9879863087" },
];

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'Bulk Procurement',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: { 'Content-Type': 'application/json' }
      });
      if (res.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', phone: '', subject: 'Bulk Procurement', message: '' });
      } else {
        setStatus('error');
      }
    } catch (err) {
      setStatus('error');
    }
  };

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
                  
                  {status === 'success' ? (
                    <div className="relative z-10 py-12 text-center space-y-6">
                      <div className="w-20 h-20 bg-brand-yellow text-brand-dark rounded-full flex items-center justify-center mx-auto shadow-2xl">
                        <CheckCircle2 size={40} />
                      </div>
                      <h3 className="text-3xl font-serif font-bold">Inquiry Sent</h3>
                      <p className="text-white/80 max-w-xs mx-auto">Your trade inquiry has been logged. Our agents will contact you shortly with market quotes.</p>
                      <button 
                        onClick={() => setStatus('idle')}
                        className="text-brand-yellow font-bold uppercase tracking-widest text-xs border-b border-brand-yellow pb-1"
                      >
                        Send Another Inquiry
                      </button>
                    </div>
                  ) : (
                    <>
                      <h3 className="text-3xl font-serif font-bold mb-2 relative z-10">Send an Inquiry</h3>
                      <p className="text-white/80 mb-8 relative z-10">Fill out the form below and our agents will get back to you with current market rates.</p>
                      
                      <form className="space-y-6 relative z-10" onSubmit={handleSubmit}>
                        <div className="grid sm:grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <label className="text-sm font-medium text-white/90">Full Name</label>
                            <input 
                              required
                              type="text" 
                              className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:border-brand-yellow transition-colors" 
                              placeholder="Rajesh Bhai"
                              value={formData.name}
                              onChange={e => setFormData({...formData, name: e.target.value})}
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="text-sm font-medium text-white/90">Phone Number</label>
                            <input 
                              required
                              type="tel" 
                              className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:border-brand-yellow transition-colors" 
                              placeholder="+91 98765 43210"
                              value={formData.phone}
                              onChange={e => setFormData({...formData, phone: e.target.value})}
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <label className="text-sm font-medium text-white/90">Email Address</label>
                          <input 
                            required
                            type="email" 
                            className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:border-brand-yellow transition-colors" 
                            placeholder="rajesh@company.com"
                            value={formData.email}
                            onChange={e => setFormData({...formData, email: e.target.value})}
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-white/90">Inquiry Type</label>
                          <select 
                            className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-yellow transition-colors appearance-none"
                            value={formData.subject}
                            onChange={e => setFormData({...formData, subject: e.target.value})}
                          >
                            <option value="Bulk Procurement" className="text-brand-dark">I want to Buy (Bulk Procurement)</option>
                            <option value="Commodity Selling" className="text-brand-dark">I want to Sell (Farmer/Trader)</option>
                            <option value="Market Consultation" className="text-brand-dark">General Market Consultation</option>
                          </select>
                        </div>

                        <div className="space-y-2">
                          <label className="text-sm font-medium text-white/90">Commodity & Details</label>
                          <textarea 
                            required
                            rows={4} 
                            className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:border-brand-yellow transition-colors resize-none" 
                            placeholder="E.g., Looking for 50 tonnes of Bold Groundnuts..."
                            value={formData.message}
                            onChange={e => setFormData({...formData, message: e.target.value})}
                          ></textarea>
                        </div>

                        <button 
                          disabled={status === 'submitting'}
                          className="w-full bg-brand-yellow hover:bg-brand-yellow-light text-brand-dark font-bold text-lg py-4 rounded-xl transition-all flex items-center justify-center gap-2 mt-4 shadow-lg hover:shadow-xl disabled:opacity-50"
                        >
                          {status === 'submitting' ? 'Processing...' : 'Submit Inquiry'} <Send size={18} />
                        </button>
                        
                        <a href="https://wa.me/919427740313" target="_blank" rel="noreferrer" className="w-full bg-transparent hover:bg-white/10 border-2 border-white/30 text-white font-bold py-4 rounded-xl transition-all flex items-center justify-center gap-2 mt-4">
                          <MessageCircle size={18} /> Chat on WhatsApp
                        </a>

                        {status === 'error' && (
                          <p className="text-red-400 text-xs font-bold text-center">Failed to send. Please try again or use WhatsApp.</p>
                        )}
                      </form>
                    </>
                  )}
                </div>
              </FadeIn>
            </div>
            
          </div>
        </div>
      </section>
    </div>
  );
}
