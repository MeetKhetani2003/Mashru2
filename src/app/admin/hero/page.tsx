'use client';

import { useEffect, useState } from 'react';
import FadeIn from '@/components/animations/FadeIn';
import { 
  Plus, 
  Edit2, 
  Trash2, 
  X, 
  Play,
  Image as ImageIcon,
  Type,
  ListOrdered
} from 'lucide-react';

export default function HeroAdmin() {
  const [slides, setSlides] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState<any>(null);
  
  // Form State
  const [formData, setFormData] = useState({
    video: '',
    image: '',
    title: '',
    subtitle: '',
    order: 0,
    isActive: true
  });

  const fetchSlides = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/admin/hero');
      const data = await res.json();
      setSlides(data);
    } catch (err) {
      console.error('Failed to fetch hero slides');
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchSlides();
  }, []);

  const openModal = (slide: any = null) => {
    if (slide) {
      setCurrentSlide(slide);
      setFormData({
        video: slide.video,
        image: slide.image,
        title: slide.title,
        subtitle: slide.subtitle,
        order: slide.order || 0,
        isActive: slide.isActive !== undefined ? slide.isActive : true
      });
    } else {
      setCurrentSlide(null);
      setFormData({
        video: '',
        image: '',
        title: '',
        subtitle: '',
        order: slides.length,
        isActive: true
      });
    }
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const method = currentSlide ? 'PUT' : 'POST';
    const body = currentSlide ? { id: currentSlide._id, ...formData } : formData;

    try {
      const res = await fetch('/api/admin/hero', {
        method,
        body: JSON.stringify(body),
        headers: { 'Content-Type': 'application/json' }
      });
      if (res.ok) {
        setIsModalOpen(false);
        fetchSlides();
      }
    } catch (err) {
      console.error('Save failed');
    }
  };

  const deleteSlide = async (id: string) => {
    if (!confirm('Delete this hero slide?')) return;
    try {
      await fetch(`/api/admin/hero?id=${id}`, { method: 'DELETE' });
      fetchSlides();
    } catch (err) {
      console.error('Delete failed');
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-serif font-bold text-slate-800">Hero Carousel Management</h2>
          <p className="text-slate-500 text-sm mt-1">Manage the cinematic video slides on your homepage.</p>
        </div>
        <button 
          onClick={() => openModal()}
          className="bg-brand-green text-white px-6 py-3 rounded-2xl font-bold flex items-center gap-2 hover:bg-brand-dark transition-all shadow-lg"
        >
          <Plus size={20} /> Add Slide
        </button>
      </div>

      <div className="grid gap-6">
        {isLoading ? (
          <p className="text-center py-20 text-slate-400">Loading slides...</p>
        ) : slides.length === 0 ? (
          <div className="bg-white p-20 rounded-[3rem] border border-dashed border-slate-200 text-center">
            <Play className="mx-auto text-slate-200 mb-4" size={48} />
            <p className="text-slate-400 font-medium">No hero slides found. Add your first cinematic slide.</p>
          </div>
        ) : slides.map((slide: any) => (
          <FadeIn key={slide._id}>
            <div className="bg-white p-6 rounded-[2.5rem] border border-slate-200 flex flex-col lg:flex-row items-center gap-8 group hover:border-brand-green/30 transition-all">
              <div className="w-full lg:w-64 h-40 rounded-2xl overflow-hidden bg-slate-100 relative shrink-0">
                <video src={slide.video} className="w-full h-full object-cover opacity-80" muted playsInline />
                <div className="absolute top-3 left-3 px-3 py-1 bg-brand-dark/60 backdrop-blur-md rounded-full text-[10px] font-bold text-white uppercase tracking-widest">
                  Order: {slide.order}
                </div>
                {!slide.isActive && (
                  <div className="absolute inset-0 bg-white/60 backdrop-blur-[2px] flex items-center justify-center">
                    <span className="bg-red-500 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase">Inactive</span>
                  </div>
                )}
              </div>
              
              <div className="flex-grow min-w-0 space-y-2">
                <h3 className="text-xl font-serif font-bold text-slate-800 truncate">{slide.title}</h3>
                <p className="text-slate-500 text-sm line-clamp-2">{slide.subtitle}</p>
                <div className="flex gap-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  <span className="flex items-center gap-1.5"><Play size={12} /> Video URL Present</span>
                  <span className="flex items-center gap-1.5"><ImageIcon size={12} /> Poster Present</span>
                </div>
              </div>
              
              <div className="flex items-center gap-3 shrink-0">
                 <button onClick={() => openModal(slide)} className="p-4 rounded-2xl bg-slate-50 text-slate-600 hover:bg-brand-green hover:text-white transition-all">
                   <Edit2 size={20} />
                 </button>
                 <button onClick={() => deleteSlide(slide._id)} className="p-4 rounded-2xl bg-slate-50 text-slate-600 hover:bg-red-500 hover:text-white transition-all">
                   <Trash2 size={20} />
                 </button>
              </div>
            </div>
          </FadeIn>
        ))}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
          <div className="absolute inset-0 bg-brand-dark/60 backdrop-blur-md" onClick={() => setIsModalOpen(false)}></div>
          <div className="bg-white w-full max-w-3xl max-h-[90vh] rounded-[3rem] shadow-2xl relative z-10 overflow-hidden flex flex-col">
            <div className="p-8 border-b border-slate-100 flex justify-between items-center">
              <h2 className="text-2xl font-serif font-bold text-slate-800">
                {currentSlide ? 'Edit Hero Slide' : 'Add New Hero Slide'}
              </h2>
              <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-slate-50 rounded-full transition-colors">
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleSave} className="p-10 overflow-y-auto space-y-8">
               <div className="space-y-4">
                 <div className="space-y-2">
                   <label className="text-xs font-bold uppercase tracking-widest text-slate-400 flex items-center gap-2">
                     <Type size={14} /> Slide Title
                   </label>
                   <input required className="w-full p-4 rounded-2xl border border-slate-200 focus:border-brand-green outline-none" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} placeholder="e.g. The Gold Standard in Agri-Trade." />
                 </div>
                 
                 <div className="space-y-2">
                   <label className="text-xs font-bold uppercase tracking-widest text-slate-400 flex items-center gap-2">
                     <Type size={14} /> Subtitle / Description
                   </label>
                   <textarea required className="w-full p-4 rounded-2xl border border-slate-200 focus:border-brand-green outline-none min-h-[100px]" value={formData.subtitle} onChange={e => setFormData({...formData, subtitle: e.target.value})} placeholder="e.g. Bridging the gap between farmers and industry..." />
                 </div>
               </div>

               <div className="grid md:grid-cols-2 gap-8">
                 <div className="space-y-2">
                   <label className="text-xs font-bold uppercase tracking-widest text-slate-400 flex items-center gap-2">
                     <Play size={14} /> Video URL (MP4)
                   </label>
                   <input required className="w-full p-4 rounded-2xl border border-slate-200 focus:border-brand-green outline-none" value={formData.video} onChange={e => setFormData({...formData, video: e.target.value})} placeholder="https://assets.mixkit.io/..." />
                 </div>
                 <div className="space-y-2">
                   <label className="text-xs font-bold uppercase tracking-widest text-slate-400 flex items-center gap-2">
                     <ImageIcon size={14} /> Poster Image URL
                   </label>
                   <input required className="w-full p-4 rounded-2xl border border-slate-200 focus:border-brand-green outline-none" value={formData.image} onChange={e => setFormData({...formData, image: e.target.value})} placeholder="/images/hero-bg.jpg" />
                 </div>
               </div>

               <div className="grid grid-cols-2 gap-8">
                 <div className="space-y-2">
                   <label className="text-xs font-bold uppercase tracking-widest text-slate-400 flex items-center gap-2">
                     <ListOrdered size={14} /> Display Order
                   </label>
                   <input type="number" className="w-full p-4 rounded-2xl border border-slate-200 focus:border-brand-green outline-none" value={formData.order} onChange={e => setFormData({...formData, order: parseInt(e.target.value)})} />
                 </div>
                 <div className="flex items-end pb-4">
                   <label className="flex items-center gap-3 cursor-pointer">
                     <input type="checkbox" className="w-6 h-6 rounded-lg border-slate-200 text-brand-green focus:ring-brand-green" checked={formData.isActive} onChange={e => setFormData({...formData, isActive: e.target.checked})} />
                     <span className="text-xs font-bold uppercase tracking-widest text-slate-600">Slide is Active</span>
                   </label>
                 </div>
               </div>

               <div className="flex justify-end pt-8 gap-4 border-t border-slate-100">
                 <button type="button" onClick={() => setIsModalOpen(false)} className="px-8 py-4 rounded-2xl font-bold text-slate-500 hover:bg-slate-50 transition-all">Cancel</button>
                 <button type="submit" className="px-10 py-4 rounded-2xl font-bold bg-brand-green text-white hover:bg-brand-dark transition-all shadow-xl">
                    {currentSlide ? 'Update Slide' : 'Create Slide'}
                 </button>
               </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
