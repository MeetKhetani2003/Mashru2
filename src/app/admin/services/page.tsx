'use client';

import { useEffect, useState } from 'react';
import FadeIn from '@/components/animations/FadeIn';
import { 
  Handshake, 
  Plus, 
  Edit2, 
  Trash2, 
  X, 
  CheckCircle2,
  ChevronRight,
  ListChecks,
  Activity
} from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export default function ServicesAdmin() {
  const [services, setServices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentService, setCurrentService] = useState<any>(null);
  
  // Form State
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    description: '',
    longDescription: '',
    iconName: 'Handshake',
    benefits: [''],
    process: [{ step: '', desc: '' }]
  });

  const fetchServices = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/admin/services');
      const data = await res.json();
      setServices(data);
    } catch (err) {
      console.error('Failed to fetch services');
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const openModal = (service: any = null) => {
    if (service) {
      setCurrentService(service);
      setFormData({
        title: service.title,
        slug: service.slug,
        description: service.description,
        longDescription: service.longDescription,
        iconName: service.iconName || 'Handshake',
        benefits: service.benefits || [''],
        process: service.process || [{ step: '', desc: '' }]
      });
    } else {
      setCurrentService(null);
      setFormData({
        title: '',
        slug: '',
        description: '',
        longDescription: '',
        iconName: 'Handshake',
        benefits: [''],
        process: [{ step: '', desc: '' }]
      });
    }
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const method = currentService ? 'PUT' : 'POST';
    const body = currentService ? { id: currentService._id, ...formData } : formData;

    try {
      const res = await fetch('/api/admin/services', {
        method,
        body: JSON.stringify(body),
        headers: { 'Content-Type': 'application/json' }
      });
      if (res.ok) {
        setIsModalOpen(false);
        fetchServices();
      }
    } catch (err) {
      console.error('Save failed');
    }
  };

  const deleteService = async (id: string) => {
    if (!confirm('Delete this service?')) return;
    try {
      await fetch(`/api/admin/services?id=${id}`, { method: 'DELETE' });
      fetchServices();
    } catch (err) {
      console.error('Delete failed');
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-serif font-bold text-slate-800">Mandi Services Management</h2>
        <button 
          onClick={() => openModal()}
          className="bg-brand-green text-white px-6 py-3 rounded-2xl font-bold flex items-center gap-2 hover:bg-brand-dark transition-all shadow-lg"
        >
          <Plus size={20} /> Add Service
        </button>
      </div>

      <div className="grid gap-6">
        {isLoading ? (
          <p className="text-center py-20 text-slate-400">Loading services...</p>
        ) : services.map((service: any) => (
          <FadeIn key={service._id}>
            <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 group hover:border-brand-green/30 transition-all">
              <div className="flex items-center gap-6">
                <div className="w-16 h-16 rounded-2xl bg-brand-cream text-brand-green flex items-center justify-center font-bold">
                  {service.iconName?.substring(0, 2) || 'SJ'}
                </div>
                <div>
                  <h3 className="text-xl font-serif font-bold text-slate-800">{service.title}</h3>
                  <p className="text-slate-500 text-sm">{service.description}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 self-end md:self-auto">
                 <button onClick={() => openModal(service)} className="p-4 rounded-2xl bg-slate-50 text-slate-600 hover:bg-brand-green hover:text-white transition-all">
                   <Edit2 size={20} />
                 </button>
                 <button onClick={() => deleteService(service._id)} className="p-4 rounded-2xl bg-slate-50 text-slate-600 hover:bg-red-500 hover:text-white transition-all">
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
          <div className="bg-white w-full max-w-4xl max-h-[90vh] rounded-[3rem] shadow-2xl relative z-10 overflow-hidden flex flex-col">
            <div className="p-8 border-b border-slate-100 flex justify-between items-center">
              <h2 className="text-2xl font-serif font-bold text-slate-800">
                {currentService ? 'Edit Service' : 'Add New Service'}
              </h2>
              <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-slate-50 rounded-full transition-colors">
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleSave} className="p-10 overflow-y-auto space-y-8">
               <div className="grid md:grid-cols-2 gap-8">
                 <div className="space-y-2">
                   <label className="text-xs font-bold uppercase tracking-widest text-slate-400">Service Title</label>
                   <input required className="w-full p-4 rounded-2xl border border-slate-200" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} />
                 </div>
                 <div className="space-y-2">
                   <label className="text-xs font-bold uppercase tracking-widest text-slate-400">URL Slug</label>
                   <input required className="w-full p-4 rounded-2xl border border-slate-200" value={formData.slug} onChange={e => setFormData({...formData, slug: e.target.value})} />
                 </div>
               </div>

               <div className="space-y-2">
                 <label className="text-xs font-bold uppercase tracking-widest text-slate-400">Short Description</label>
                 <textarea required className="w-full p-4 rounded-2xl border border-slate-200" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} />
               </div>

               {/* Benefits */}
               <div className="space-y-4">
                 <label className="text-xs font-bold uppercase tracking-widest text-slate-400 flex items-center gap-2">
                   <ListChecks size={14} /> Service Benefits
                 </label>
                 {formData.benefits.map((benefit, i) => (
                   <div key={i} className="flex gap-4">
                     <input className="flex-grow p-4 rounded-2xl border border-slate-200" value={benefit} onChange={e => {
                        const newBenefits = [...formData.benefits];
                        newBenefits[i] = e.target.value;
                        setFormData({...formData, benefits: newBenefits});
                     }} />
                     <button type="button" onClick={() => setFormData({...formData, benefits: formData.benefits.filter((_, idx) => idx !== i)})} className="p-4 text-red-400 hover:bg-red-50 rounded-2xl">
                       <Trash2 size={20} />
                     </button>
                   </div>
                 ))}
                 <button type="button" onClick={() => setFormData({...formData, benefits: [...formData.benefits, '']})} className="text-brand-green font-bold text-xs uppercase tracking-widest">+ Add Benefit</button>
               </div>

               {/* Process */}
               <div className="space-y-4">
                 <label className="text-xs font-bold uppercase tracking-widest text-slate-400 flex items-center gap-2">
                   <Activity size={14} /> Execution Process
                 </label>
                 {formData.process.map((step, i) => (
                   <div key={i} className="flex gap-4">
                     <input placeholder="Step Title" className="w-1/3 p-4 rounded-2xl border border-slate-200" value={step.step} onChange={e => {
                        const newProc = [...formData.process];
                        newProc[i].step = e.target.value;
                        setFormData({...formData, process: newProc});
                     }} />
                     <input placeholder="Step Description" className="flex-grow p-4 rounded-2xl border border-slate-200" value={step.desc} onChange={e => {
                        const newProc = [...formData.process];
                        newProc[i].desc = e.target.value;
                        setFormData({...formData, process: newProc});
                     }} />
                     <button type="button" onClick={() => setFormData({...formData, process: formData.process.filter((_, idx) => idx !== i)})} className="p-4 text-red-400 hover:bg-red-50 rounded-2xl">
                       <Trash2 size={20} />
                     </button>
                   </div>
                 ))}
                 <button type="button" onClick={() => setFormData({...formData, process: [...formData.process, {step: '', desc: ''}]})} className="text-brand-green font-bold text-xs uppercase tracking-widest">+ Add Process Step</button>
               </div>

               <div className="flex justify-end pt-8 gap-4 border-t border-slate-100">
                 <button type="button" onClick={() => setIsModalOpen(false)} className="px-8 py-4 rounded-2xl font-bold text-slate-500">Cancel</button>
                 <button type="submit" className="px-10 py-4 rounded-2xl font-bold bg-brand-green text-white hover:bg-brand-dark transition-all shadow-xl">
                    {currentService ? 'Update Service' : 'Create Service'}
                 </button>
               </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
