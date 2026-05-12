'use client';

import { useEffect, useState } from 'react';
import FadeIn from '@/components/animations/FadeIn';
import { 
  MessageSquare, 
  Plus, 
  Edit2, 
  Trash2, 
  X, 
  Star,
  Quote
} from 'lucide-react';
import { cn } from '@/lib/utils';

export default function TestimonialsAdmin() {
  const [testimonials, setTestimonials] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentTestimonial, setCurrentTestimonial] = useState<any>(null);
  
  // Form State
  const [formData, setFormData] = useState({
    quote: '',
    author: '',
    company: '',
    initial: '',
    rating: 5,
    date: '1 month ago',
    partnerSince: '',
    volume: '',
    location: ''
  });

  const fetchTestimonials = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/admin/testimonials');
      const data = await res.json();
      setTestimonials(data);
    } catch (err) {
      console.error('Failed to fetch testimonials');
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const openModal = (testimonial: any = null) => {
    if (testimonial) {
      setCurrentTestimonial(testimonial);
      setFormData({
        quote: testimonial.quote,
        author: testimonial.author,
        company: testimonial.company,
        initial: testimonial.initial,
        rating: testimonial.rating,
        date: testimonial.date,
        partnerSince: testimonial.partnerSince || '',
        volume: testimonial.volume || '',
        location: testimonial.location || ''
      });
    } else {
      setCurrentTestimonial(null);
      setFormData({
        quote: '',
        author: '',
        company: '',
        initial: '',
        rating: 5,
        date: 'Recent',
        partnerSince: '',
        volume: '',
        location: ''
      });
    }
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const method = currentTestimonial ? 'PUT' : 'POST';
    const body = currentTestimonial ? { id: currentTestimonial._id, ...formData } : formData;

    try {
      const res = await fetch('/api/admin/testimonials', {
        method,
        body: JSON.stringify(body),
        headers: { 'Content-Type': 'application/json' }
      });
      if (res.ok) {
        setIsModalOpen(false);
        fetchTestimonials();
      }
    } catch (err) {
      console.error('Save failed');
    }
  };

  const deleteTestimonial = async (id: string) => {
    if (!confirm('Delete this testimonial?')) return;
    try {
      await fetch(`/api/admin/testimonials?id=${id}`, { method: 'DELETE' });
      fetchTestimonials();
    } catch (err) {
      console.error('Delete failed');
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-serif font-bold text-slate-800">Verified Testimonials</h2>
        <button 
          onClick={() => openModal()}
          className="bg-brand-green text-white px-6 py-3 rounded-2xl font-bold flex items-center gap-2 hover:bg-brand-dark transition-all shadow-lg"
        >
          <Plus size={20} /> Add Testimonial
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {isLoading ? (
          <p className="col-span-full text-center py-20 text-slate-400">Loading testimonials...</p>
        ) : testimonials.map((testimonial: any) => (
          <FadeIn key={testimonial._id}>
            <div className="bg-white p-10 rounded-[2.5rem] border border-slate-200 flex flex-col justify-between h-full group hover:border-brand-green/30 transition-all">
              <div>
                <div className="flex justify-between items-start mb-6">
                  <div className="flex gap-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} size={14} className="text-brand-yellow" fill="currentColor" />
                    ))}
                  </div>
                  <Quote size={32} className="text-slate-100 group-hover:text-brand-green/10 transition-colors" />
                </div>
                <p className="text-slate-600 italic mb-8 leading-relaxed">"{testimonial.quote}"</p>
              </div>
              
              <div className="flex items-center justify-between pt-8 border-t border-slate-50">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-brand-dark text-brand-yellow flex items-center justify-center font-bold">
                    {testimonial.initial}
                  </div>
                  <div>
                    <p className="font-bold text-slate-800">{testimonial.author}</p>
                    <p className="text-[0.65rem] text-brand-green font-bold uppercase tracking-widest">{testimonial.company}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => openModal(testimonial)} className="p-3 rounded-xl bg-slate-50 text-slate-600 hover:bg-brand-green hover:text-white transition-all">
                    <Edit2 size={18} />
                  </button>
                  <button onClick={() => deleteTestimonial(testimonial._id)} className="p-3 rounded-xl bg-slate-50 text-slate-600 hover:bg-red-500 hover:text-white transition-all">
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            </div>
          </FadeIn>
        ))}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
          <div className="absolute inset-0 bg-brand-dark/60 backdrop-blur-md" onClick={() => setIsModalOpen(false)}></div>
          <div className="bg-white w-full max-w-4xl max-h-[90vh] rounded-[3rem] shadow-2xl relative z-10 overflow-hidden flex flex-col">
            <div className="p-8 border-b border-slate-100 flex justify-between items-center">
              <h2 className="text-2xl font-serif font-bold text-slate-800">Testimonial Editor</h2>
              <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-slate-50 rounded-full transition-colors">
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleSave} className="p-10 overflow-y-auto space-y-8">
               <div className="space-y-2">
                 <label className="text-xs font-bold uppercase tracking-widest text-slate-400">The Quote</label>
                 <textarea required rows={4} className="w-full p-4 rounded-2xl border border-slate-200" value={formData.quote} onChange={e => setFormData({...formData, quote: e.target.value})} />
               </div>

               <div className="grid md:grid-cols-3 gap-8">
                 <div className="space-y-2">
                   <label className="text-xs font-bold uppercase tracking-widest text-slate-400">Author Name</label>
                   <input required className="w-full p-4 rounded-2xl border border-slate-200" value={formData.author} onChange={e => setFormData({...formData, author: e.target.value})} />
                 </div>
                 <div className="space-y-2">
                   <label className="text-xs font-bold uppercase tracking-widest text-slate-400">Company</label>
                   <input required className="w-full p-4 rounded-2xl border border-slate-200" value={formData.company} onChange={e => setFormData({...formData, company: e.target.value})} />
                 </div>
                 <div className="space-y-2">
                   <label className="text-xs font-bold uppercase tracking-widest text-slate-400">Initial</label>
                   <input required maxLength={1} className="w-full p-4 rounded-2xl border border-slate-200" value={formData.initial} onChange={e => setFormData({...formData, initial: e.target.value})} />
                 </div>
               </div>

               <div className="grid md:grid-cols-3 gap-8">
                 <div className="space-y-2">
                   <label className="text-xs font-bold uppercase tracking-widest text-slate-400">Partner Since (Year)</label>
                   <input className="w-full p-4 rounded-2xl border border-slate-200" value={formData.partnerSince} onChange={e => setFormData({...formData, partnerSince: e.target.value})} />
                 </div>
                 <div className="space-y-2">
                   <label className="text-xs font-bold uppercase tracking-widest text-slate-400">Volume Capacity</label>
                   <input className="w-full p-4 rounded-2xl border border-slate-200" value={formData.volume} onChange={e => setFormData({...formData, volume: e.target.value})} />
                 </div>
                 <div className="space-y-2">
                   <label className="text-xs font-bold uppercase tracking-widest text-slate-400">Location</label>
                   <input className="w-full p-4 rounded-2xl border border-slate-200" value={formData.location} onChange={e => setFormData({...formData, location: e.target.value})} />
                 </div>
               </div>

               <div className="flex justify-end pt-8 gap-4 border-t border-slate-100">
                 <button type="button" onClick={() => setIsModalOpen(false)} className="px-8 py-4 rounded-2xl font-bold text-slate-500">Cancel</button>
                 <button type="submit" className="px-10 py-4 rounded-2xl font-bold bg-brand-green text-white hover:bg-brand-dark transition-all shadow-xl">
                    Save Testimonial
                 </button>
               </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
