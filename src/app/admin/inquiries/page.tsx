'use client';

import { useEffect, useState } from 'react';
import FadeIn from '@/components/animations/FadeIn';
import { 
  Inbox, 
  Search, 
  Trash2, 
  CheckCircle2, 
  Clock, 
  Mail, 
  Phone, 
  ExternalLink,
  ChevronDown,
  Filter
} from 'lucide-react';
import { cn } from '@/lib/utils';

export default function InquiriesAdmin() {
  const [inquiries, setInquiries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('All');

  const fetchInquiries = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/admin/inquiries');
      const data = await res.json();
      setInquiries(data);
    } catch (err) {
      console.error('Failed to fetch inquiries');
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchInquiries();
  }, []);

  const updateStatus = async (id: string, status: string) => {
    try {
      await fetch('/api/admin/inquiries', {
        method: 'PUT',
        body: JSON.stringify({ id, status }),
        headers: { 'Content-Type': 'application/json' }
      });
      fetchInquiries();
    } catch (err) {
      console.error('Update failed');
    }
  };

  const deleteInquiry = async (id: string) => {
    if (!confirm('Are you sure you want to delete this inquiry?')) return;
    try {
      await fetch(`/api/admin/inquiries?id=${id}`, { method: 'DELETE' });
      fetchInquiries();
    } catch (err) {
      console.error('Delete failed');
    }
  };

  const filtered = inquiries.filter((inq: any) => {
    const matchesSearch = inq.name.toLowerCase().includes(search.toLowerCase()) || inq.email.toLowerCase().includes(search.toLowerCase()) || inq.subject.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = selectedStatus === 'All' || inq.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-8">
      <FadeIn>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
          <div className="relative flex-grow max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Search by name, email or subject..." 
              className="w-full pl-12 pr-4 py-3 rounded-2xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-green/20 focus:border-brand-green bg-white shadow-sm transition-all"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-3">
             <div className="relative">
               <select 
                 className="appearance-none pl-6 pr-12 py-3 rounded-2xl border border-slate-200 bg-white shadow-sm font-bold text-xs uppercase tracking-widest text-slate-600 focus:outline-none focus:ring-2 focus:ring-brand-green/20"
                 value={selectedStatus}
                 onChange={(e) => setSelectedStatus(e.target.value)}
               >
                 <option value="All">All Inquiries</option>
                 <option value="New">New</option>
                 <option value="Responded">Responded</option>
                 <option value="Closed">Closed</option>
               </select>
               <Filter className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={14} />
             </div>
          </div>
        </div>
      </FadeIn>

      <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-100">
                <th className="px-8 py-6 text-[0.65rem] font-bold text-slate-400 uppercase tracking-[0.2em]">SENDER</th>
                <th className="px-8 py-6 text-[0.65rem] font-bold text-slate-400 uppercase tracking-[0.2em]">SUBJECT & MESSAGE</th>
                <th className="px-8 py-6 text-[0.65rem] font-bold text-slate-400 uppercase tracking-[0.2em]">STATUS</th>
                <th className="px-8 py-6 text-[0.65rem] font-bold text-slate-400 uppercase tracking-[0.2em]">DATE</th>
                <th className="px-8 py-6 text-[0.65rem] font-bold text-slate-400 uppercase tracking-[0.2em] text-right">ACTIONS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {isLoading ? (
                <tr>
                  <td colSpan={5} className="px-8 py-12 text-center text-slate-400 font-medium">Loading inquiries...</td>
                </tr>
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-8 py-12 text-center text-slate-400 font-medium">No inquiries found.</td>
                </tr>
              ) : filtered.map((inq: any) => (
                <tr key={inq._id} className="hover:bg-slate-50/30 transition-colors group">
                  <td className="px-8 py-6">
                    <p className="font-bold text-slate-800">{inq.name}</p>
                    <div className="flex flex-col gap-1 mt-1">
                       <a href={`mailto:${inq.email}`} className="text-xs text-slate-400 flex items-center gap-1.5 hover:text-brand-green">
                         <Mail size={12} /> {inq.email}
                       </a>
                       <a href={`tel:${inq.phone}`} className="text-xs text-slate-400 flex items-center gap-1.5 hover:text-brand-green">
                         <Phone size={12} /> {inq.phone}
                       </a>
                    </div>
                  </td>
                  <td className="px-8 py-6 max-w-md">
                    <p className="font-bold text-slate-700 text-sm">{inq.subject}</p>
                    <p className="text-slate-500 text-sm mt-1 line-clamp-2">{inq.message}</p>
                  </td>
                  <td className="px-8 py-6">
                    <div className="relative inline-block">
                      <select 
                        className={cn(
                          "appearance-none pl-4 pr-10 py-2 rounded-xl text-[0.65rem] font-bold uppercase tracking-widest border transition-all cursor-pointer focus:outline-none",
                          inq.status === 'New' && "bg-brand-yellow/10 border-brand-yellow/30 text-brand-yellow",
                          inq.status === 'Responded' && "bg-blue-500/10 border-blue-500/30 text-blue-500",
                          inq.status === 'Closed' && "bg-brand-green/10 border-brand-green/30 text-brand-green"
                        )}
                        value={inq.status}
                        onChange={(e) => updateStatus(inq._id, e.target.value)}
                      >
                        <option value="New">New</option>
                        <option value="Responded">Responded</option>
                        <option value="Closed">Closed</option>
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 opacity-50" size={12} />
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <p className="text-sm text-slate-500 font-medium">
                      {new Date(inq.createdAt).toLocaleDateString()}
                    </p>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <div className="flex items-center justify-end gap-2">
                       <button 
                         onClick={() => deleteInquiry(inq._id)}
                         className="p-3 rounded-xl hover:bg-red-50 text-slate-400 hover:text-red-500 transition-all"
                       >
                         <Trash2 size={18} />
                       </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
