'use client';

import { useEffect, useState } from 'react';
import FadeIn from '@/components/animations/FadeIn';
import { 
  Handshake, 
  Package, 
  MessageSquare, 
  Inbox, 
  ArrowUpRight,
  Clock,
  CheckCircle2,
  AlertCircle,
  Play
} from 'lucide-react';
import Link from 'next/link';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    services: 0,
    products: 0,
    testimonials: 0,
    inquiries: 0,
    newInquiries: 0,
    heroSlides: 0
  });

  useEffect(() => {
    async function fetchStats() {
      // For now, we'll fetch them individually. In a real app, a single stats endpoint is better.
      try {
        const [s, p, t, i, h] = await Promise.all([
          fetch('/api/admin/services').then(r => r.json()),
          fetch('/api/admin/products').then(r => r.json()),
          fetch('/api/admin/testimonials').then(r => r.json()),
          fetch('/api/admin/inquiries').then(r => r.json()),
          fetch('/api/admin/hero').then(r => r.json())
        ]);

        setStats({
          services: s.length || 0,
          products: p.length || 0,
          testimonials: t.length || 0,
          inquiries: i.length || 0,
          newInquiries: i.filter((x: any) => x.status === 'New').length || 0,
          heroSlides: h.length || 0
        });
      } catch (err) {
        console.error('Failed to fetch stats');
      }
    }
    fetchStats();
  }, []);

  const statCards = [
    { label: 'Total Services', value: stats.services, icon: <Handshake className="text-brand-green" />, color: 'bg-brand-green/10', href: '/admin/services' },
    { label: 'Total Products', value: stats.products, icon: <Package className="text-blue-500" />, color: 'bg-blue-500/10', href: '/admin/products' },
    { label: 'Testimonials', value: stats.testimonials, icon: <MessageSquare className="text-purple-500" />, color: 'bg-purple-500/10', href: '/admin/testimonials' },
    { label: 'Hero Slides', value: stats.heroSlides, icon: <Play className="text-orange-500" />, color: 'bg-orange-500/10', href: '/admin/hero' },
    { label: 'New Inquiries', value: stats.newInquiries, icon: <Inbox className="text-brand-yellow" />, color: 'bg-brand-yellow/10', href: '/admin/inquiries' },
  ];

  return (
    <div className="space-y-10">
      <FadeIn>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <h2 className="text-3xl font-serif font-bold text-slate-800">Operational Overview</h2>
            <p className="text-slate-500 mt-1">Manage your market presence and track incoming trade inquiries.</p>
          </div>
          <div className="flex items-center gap-3 bg-white p-2 rounded-2xl border border-slate-200 shadow-sm">
             <div className="px-4 py-2 bg-brand-green/10 text-brand-green text-xs font-bold rounded-xl uppercase tracking-widest">System Online</div>
             <div className="w-2 h-2 rounded-full bg-brand-green animate-pulse mr-2"></div>
          </div>
        </div>
      </FadeIn>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((card, i) => (
          <FadeIn key={i} delay={i * 0.1}>
            <Link href={card.href} className="block group">
              <div className="bg-white p-8 rounded-[2rem] border border-slate-200 shadow-sm group-hover:shadow-xl group-hover:border-brand-green/30 transition-all duration-500 h-full">
                <div className="flex justify-between items-start mb-6">
                  <div className={`p-4 rounded-2xl ${card.color}`}>
                    {card.icon}
                  </div>
                  <ArrowUpRight size={20} className="text-slate-300 group-hover:text-brand-green transition-colors" />
                </div>
                <div className="text-4xl font-serif font-bold text-slate-800 mb-1">{card.value}</div>
                <p className="text-slate-500 text-sm font-medium">{card.label}</p>
              </div>
            </Link>
          </FadeIn>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-10">
        <FadeIn delay={0.4}>
          <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-sm p-10 h-full">
             <div className="flex justify-between items-center mb-8">
               <h3 className="text-xl font-serif font-bold text-slate-800 flex items-center gap-3">
                 <Clock className="text-brand-green" /> Quick Actions
               </h3>
             </div>
             <div className="grid gap-4">
               <Link href="/admin/products" className="flex items-center justify-between p-6 rounded-2xl border border-slate-100 hover:border-brand-green/30 hover:bg-brand-green/5 transition-all group">
                 <div className="flex items-center gap-4">
                   <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-600 group-hover:bg-white transition-colors">
                     <Package size={20} />
                   </div>
                   <span className="font-bold text-slate-700">Add New Product</span>
                 </div>
                 <ChevronRight size={18} className="text-slate-300 group-hover:translate-x-1 transition-transform" />
               </Link>
               <Link href="/admin/hero" className="flex items-center justify-between p-6 rounded-2xl border border-slate-100 hover:border-brand-green/30 hover:bg-brand-green/5 transition-all group">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-600 group-hover:bg-white transition-colors">
                      <Play size={20} />
                    </div>
                    <span className="font-bold text-slate-700">Manage Hero Carousel</span>
                  </div>
                  <ChevronRight size={18} className="text-slate-300 group-hover:translate-x-1 transition-transform" />
                </Link>
               <Link href="/admin/services" className="flex items-center justify-between p-6 rounded-2xl border border-slate-100 hover:border-brand-green/30 hover:bg-brand-green/5 transition-all group">
                 <div className="flex items-center gap-4">
                   <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-600 group-hover:bg-white transition-colors">
                     <Handshake size={20} />
                   </div>
                   <span className="font-bold text-slate-700">Edit Service Details</span>
                 </div>
                 <ChevronRight size={18} className="text-slate-300 group-hover:translate-x-1 transition-transform" />
               </Link>
             </div>
          </div>
        </FadeIn>

        <FadeIn delay={0.5}>
          <div className="bg-brand-dark rounded-[2.5rem] p-10 h-full text-white relative overflow-hidden">
             <div className="absolute top-0 right-0 w-64 h-64 bg-brand-green/20 rounded-full blur-[100px] -mr-32 -mt-32"></div>
             <h3 className="text-xl font-serif font-bold mb-8 relative z-10">Inquiry Summary</h3>
             <div className="space-y-6 relative z-10">
               <div className="flex items-center justify-between p-5 rounded-2xl bg-white/5 border border-white/10">
                 <div className="flex items-center gap-4">
                   <AlertCircle className="text-brand-yellow" size={24} />
                   <div>
                     <p className="font-bold">{stats.newInquiries} Pending</p>
                     <p className="text-xs text-white/40">Action required</p>
                   </div>
                 </div>
                 <Link href="/admin/inquiries" className="text-xs font-bold uppercase tracking-widest text-brand-yellow hover:text-white transition-colors">View All</Link>
               </div>
               <div className="flex items-center justify-between p-5 rounded-2xl bg-white/5 border border-white/10">
                 <div className="flex items-center gap-4">
                   <CheckCircle2 className="text-brand-green" size={24} />
                   <div>
                     <p className="font-bold">{stats.inquiries - stats.newInquiries} Resolved</p>
                     <p className="text-xs text-white/40">Market trades closed</p>
                   </div>
                 </div>
               </div>
             </div>
          </div>
        </FadeIn>
      </div>
    </div>
  );
}

function ChevronRight({ size, className }: { size: number, className?: string }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <path d="m9 18 6-6-6-6"/>
    </svg>
  );
}
