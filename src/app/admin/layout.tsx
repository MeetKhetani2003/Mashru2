'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  Handshake, 
  Package, 
  MessageSquare, 
  Inbox, 
  Settings, 
  LogOut,
  ChevronRight,
  Menu,
  X
} from 'lucide-react';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

const sidebarLinks = [
  { href: '/admin', label: 'Dashboard', icon: <LayoutDashboard size={20} /> },
  { href: '/admin/services', label: 'Services', icon: <Handshake size={20} /> },
  { href: '/admin/products', label: 'Products', icon: <Package size={20} /> },
  { href: '/admin/testimonials', label: 'Testimonials', icon: <MessageSquare size={20} /> },
  { href: '/admin/inquiries', label: 'Inquiries', icon: <Inbox size={20} /> },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex">
      {/* Sidebar Desktop */}
      <aside className="hidden lg:flex w-72 bg-brand-dark flex-col text-white sticky top-0 h-screen">
        <div className="p-8 border-b border-white/10">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-brand-yellow rounded-xl flex items-center justify-center text-brand-dark font-bold text-xl">J</div>
            <span className="font-serif font-bold text-xl">Admin Panel</span>
          </Link>
        </div>

        <nav className="flex-grow p-6 space-y-2">
          {sidebarLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link 
                key={link.href}
                href={link.href}
                className={cn(
                  "flex items-center justify-between p-4 rounded-2xl transition-all group",
                  isActive 
                    ? "bg-brand-green text-white shadow-lg shadow-brand-green/20" 
                    : "text-white/60 hover:text-white hover:bg-white/5"
                )}
              >
                <div className="flex items-center gap-3">
                  {link.icon}
                  <span className="font-medium">{link.label}</span>
                </div>
                {isActive && <ChevronRight size={16} />}
              </Link>
            );
          })}
        </nav>

        <div className="p-6 border-t border-white/10 space-y-2">
          <button className="flex items-center gap-3 p-4 w-full text-white/60 hover:text-white transition-colors">
            <Settings size={20} />
            <span className="font-medium">Settings</span>
          </button>
          <button className="flex items-center gap-3 p-4 w-full text-red-400 hover:text-red-300 transition-colors">
            <LogOut size={20} />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-grow flex flex-col min-w-0">
        {/* Top Header */}
        <header className="h-20 bg-white border-b border-slate-200 flex items-center justify-between px-8 sticky top-0 z-40">
          <div className="flex items-center gap-4">
            <button 
              className="lg:hidden p-2 text-slate-600"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu size={24} />
            </button>
            <h1 className="text-xl font-bold text-slate-800">
              {sidebarLinks.find(l => l.href === pathname)?.label || 'Dashboard'}
            </h1>
          </div>

          <div className="flex items-center gap-6">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-bold text-slate-800 leading-none">Admin User</p>
              <p className="text-[0.65rem] font-bold text-brand-green uppercase tracking-widest mt-1">Super Admin</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-600">
              <Settings size={20} />
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="p-8">
          {children}
        </div>
      </main>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-brand-dark/50 backdrop-blur-sm z-50 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <motion.div 
            initial={{ x: -280 }}
            animate={{ x: 0 }}
            className="w-72 bg-brand-dark h-full flex flex-col"
            onClick={e => e.stopPropagation()}
          >
            <div className="p-8 border-b border-white/10 flex items-center justify-between">
              <span className="font-serif font-bold text-xl text-white">Admin Panel</span>
              <button onClick={() => setIsMobileMenuOpen(false)} className="text-white">
                <X size={24} />
              </button>
            </div>
            <nav className="p-6 space-y-2 flex-grow">
               {sidebarLinks.map((link) => (
                 <Link 
                   key={link.href}
                   href={link.href}
                   onClick={() => setIsMobileMenuOpen(false)}
                   className={cn(
                     "flex items-center gap-3 p-4 rounded-2xl text-white/60 hover:text-white hover:bg-white/5",
                     pathname === link.href && "bg-brand-green text-white"
                   )}
                 >
                   {link.icon}
                   <span>{link.label}</span>
                 </Link>
               ))}
            </nav>
          </motion.div>
        </div>
      )}
    </div>
  );
}
