'use client';

import { useEffect, useState } from 'react';
import FadeIn from '@/components/animations/FadeIn';
import { 
  Package, 
  Plus, 
  Search, 
  Edit2, 
  Trash2, 
  X, 
  Check,
  ChevronRight,
  Image as ImageIcon,
  Layers,
  ArrowRight
} from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export default function ProductsAdmin() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<any>(null);
  const [search, setSearch] = useState('');
  
  // Form State
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    category: '',
    description: '',
    longDescription: '',
    image: '',
    features: [''],
    specifications: [{ label: '', value: '' }],
    varieties: ['']
  });

  const fetchProducts = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/admin/products');
      const data = await res.json();
      setProducts(data);
    } catch (err) {
      console.error('Failed to fetch products');
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const openModal = (product: any = null) => {
    if (product) {
      setCurrentProduct(product);
      setFormData({
        title: product.title,
        slug: product.slug,
        category: product.category,
        description: product.description,
        longDescription: product.longDescription,
        image: product.image,
        features: product.features || [''],
        specifications: product.specifications || [{ label: '', value: '' }],
        varieties: product.varieties || ['']
      });
    } else {
      setCurrentProduct(null);
      setFormData({
        title: '',
        slug: '',
        category: '',
        description: '',
        longDescription: '',
        image: '',
        features: [''],
        specifications: [{ label: '', value: '' }],
        varieties: ['']
      });
    }
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const method = currentProduct ? 'PUT' : 'POST';
    const body = currentProduct ? { id: currentProduct._id, ...formData } : formData;

    try {
      const res = await fetch('/api/admin/products', {
        method,
        body: JSON.stringify(body),
        headers: { 'Content-Type': 'application/json' }
      });
      if (res.ok) {
        setIsModalOpen(false);
        fetchProducts();
      }
    } catch (err) {
      console.error('Save failed');
    }
  };

  const deleteProduct = async (id: string) => {
    if (!confirm('Delete this product?')) return;
    try {
      await fetch(`/api/admin/products?id=${id}`, { method: 'DELETE' });
      fetchProducts();
    } catch (err) {
      console.error('Delete failed');
    }
  };

  const filteredProducts = products.filter((p: any) => 
    p.title.toLowerCase().includes(search.toLowerCase()) || 
    p.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div className="relative max-w-md w-full">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text" 
            placeholder="Search products..." 
            className="w-full pl-12 pr-4 py-3 rounded-2xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-green/20 bg-white"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <button 
          onClick={() => openModal()}
          className="bg-brand-green text-white px-6 py-3 rounded-2xl font-bold flex items-center gap-2 hover:bg-brand-dark transition-all shadow-lg shadow-brand-green/20"
        >
          <Plus size={20} /> Add Product
        </button>
      </div>

      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
        {isLoading ? (
          <p className="col-span-full text-center py-20 text-slate-400">Loading products...</p>
        ) : filteredProducts.length === 0 ? (
          <p className="col-span-full text-center py-20 text-slate-400">No products found.</p>
        ) : filteredProducts.map((product: any) => (
          <FadeIn key={product._id}>
            <div className="bg-white rounded-[2.5rem] border border-slate-200 overflow-hidden group hover:border-brand-green/30 hover:shadow-2xl transition-all duration-500">
              <div className="aspect-video relative overflow-hidden">
                <img src={product.image} alt={product.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute top-4 left-4">
                  <span className="px-4 py-2 bg-white/90 backdrop-blur-md rounded-full text-[0.6rem] font-bold uppercase tracking-widest text-brand-green shadow-sm">
                    {product.category}
                  </span>
                </div>
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-serif font-bold text-slate-800 mb-2">{product.title}</h3>
                <p className="text-slate-500 text-sm line-clamp-2 mb-6">{product.description}</p>
                
                <div className="flex items-center justify-between pt-6 border-t border-slate-50">
                   <div className="flex gap-2">
                     <button onClick={() => openModal(product)} className="p-3 rounded-xl bg-slate-50 text-slate-600 hover:bg-brand-green hover:text-white transition-all">
                       <Edit2 size={18} />
                     </button>
                     <button onClick={() => deleteProduct(product._id)} className="p-3 rounded-xl bg-slate-50 text-slate-600 hover:bg-red-500 hover:text-white transition-all">
                       <Trash2 size={18} />
                     </button>
                   </div>
                   <Link href={`/products/${product.slug}`} className="text-brand-green font-bold text-xs uppercase tracking-widest flex items-center gap-2 hover:gap-3 transition-all">
                     View Page <ArrowRight size={14} />
                   </Link>
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
            <div className="p-8 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
              <h2 className="text-2xl font-serif font-bold text-slate-800">
                {currentProduct ? 'Edit Product' : 'Add New Product'}
              </h2>
              <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-white rounded-full transition-colors">
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleSave} className="p-10 overflow-y-auto space-y-8">
               <div className="grid md:grid-cols-2 gap-8">
                 <div className="space-y-2">
                   <label className="text-xs font-bold uppercase tracking-widest text-slate-400">Product Title</label>
                   <input 
                     required
                     className="w-full p-4 rounded-2xl border border-slate-200 focus:ring-2 focus:ring-brand-green/20"
                     value={formData.title}
                     onChange={e => setFormData({...formData, title: e.target.value})}
                   />
                 </div>
                 <div className="space-y-2">
                   <label className="text-xs font-bold uppercase tracking-widest text-slate-400">URL Slug</label>
                   <input 
                     required
                     className="w-full p-4 rounded-2xl border border-slate-200 focus:ring-2 focus:ring-brand-green/20"
                     value={formData.slug}
                     onChange={e => setFormData({...formData, slug: e.target.value})}
                   />
                 </div>
               </div>

               <div className="grid md:grid-cols-2 gap-8">
                 <div className="space-y-2">
                   <label className="text-xs font-bold uppercase tracking-widest text-slate-400">Category</label>
                   <input 
                     required
                     className="w-full p-4 rounded-2xl border border-slate-200 focus:ring-2 focus:ring-brand-green/20"
                     value={formData.category}
                     onChange={e => setFormData({...formData, category: e.target.value})}
                   />
                 </div>
                 <div className="space-y-2">
                   <label className="text-xs font-bold uppercase tracking-widest text-slate-400">Image URL</label>
                   <input 
                     required
                     className="w-full p-4 rounded-2xl border border-slate-200 focus:ring-2 focus:ring-brand-green/20"
                     value={formData.image}
                     onChange={e => setFormData({...formData, image: e.target.value})}
                   />
                 </div>
               </div>

               <div className="space-y-2">
                 <label className="text-xs font-bold uppercase tracking-widest text-slate-400">Short Description</label>
                 <textarea 
                   required
                   rows={2}
                   className="w-full p-4 rounded-2xl border border-slate-200 focus:ring-2 focus:ring-brand-green/20"
                   value={formData.description}
                   onChange={e => setFormData({...formData, description: e.target.value})}
                 />
               </div>

               <div className="space-y-2">
                 <label className="text-xs font-bold uppercase tracking-widest text-slate-400">Long Description (Content)</label>
                 <textarea 
                   required
                   rows={5}
                   className="w-full p-4 rounded-2xl border border-slate-200 focus:ring-2 focus:ring-brand-green/20"
                   value={formData.longDescription}
                   onChange={e => setFormData({...formData, longDescription: e.target.value})}
                 />
               </div>

               {/* Specifications */}
               <div className="space-y-4">
                 <label className="text-xs font-bold uppercase tracking-widest text-slate-400">Technical Specifications</label>
                 {formData.specifications.map((spec, i) => (
                   <div key={i} className="flex gap-4">
                     <input 
                       placeholder="Label (e.g. Moisture)"
                       className="flex-grow p-4 rounded-2xl border border-slate-200 focus:ring-2 focus:ring-brand-green/20"
                       value={spec.label}
                       onChange={e => {
                         const newSpecs = [...formData.specifications];
                         newSpecs[i].label = e.target.value;
                         setFormData({...formData, specifications: newSpecs});
                       }}
                     />
                     <input 
                       placeholder="Value (e.g. 10% Max)"
                       className="flex-grow p-4 rounded-2xl border border-slate-200 focus:ring-2 focus:ring-brand-green/20"
                       value={spec.value}
                       onChange={e => {
                         const newSpecs = [...formData.specifications];
                         newSpecs[i].value = e.target.value;
                         setFormData({...formData, specifications: newSpecs});
                       }}
                     />
                     <button type="button" onClick={() => {
                        const newSpecs = formData.specifications.filter((_, idx) => idx !== i);
                        setFormData({...formData, specifications: newSpecs});
                     }} className="p-4 text-red-400 hover:bg-red-50 rounded-2xl transition-colors">
                       <Trash2 size={20} />
                     </button>
                   </div>
                 ))}
                 <button type="button" onClick={() => setFormData({...formData, specifications: [...formData.specifications, {label: '', value: ''}]})} className="text-brand-green font-bold text-xs uppercase tracking-widest flex items-center gap-2">
                    <Plus size={14} /> Add Specification
                 </button>
               </div>

               <div className="flex justify-end pt-8 gap-4 border-t border-slate-100">
                 <button type="button" onClick={() => setIsModalOpen(false)} className="px-8 py-4 rounded-2xl font-bold text-slate-500 hover:bg-slate-50 transition-all">Cancel</button>
                 <button type="submit" className="px-10 py-4 rounded-2xl font-bold bg-brand-green text-white hover:bg-brand-dark transition-all shadow-xl shadow-brand-green/20">
                    {currentProduct ? 'Update Product' : 'Create Product'}
                 </button>
               </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
