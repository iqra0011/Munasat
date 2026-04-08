'use client';
import React from 'react';
import { X, ShieldCheck, TrendingUp, Landmark, Award, Percent, Building2, UserPlus, FileSearch } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

interface VendorProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  vendor: {
    id: string;
    name: string;
    category: string;
    totalWon: number;
    winRate: number;
    totalAwards: number;
    localContent: number;
    topMinistries: string;
    icon?: string;
  } | null;
}

const mockRevenueData = [
  { year: '2020', revenue: 154 },
  { year: '2021', revenue: 312 },
  { year: '2022', revenue: 278 },
  { year: '2023', revenue: 421 },
  { year: '2024', revenue: 589 },
];

const mockMinistryShares = [
  { name: 'Ministry of Interior', share: '34% of revenue' },
  { name: 'Ministry of Health', share: '33% of revenue' },
  { name: 'SDAIA', share: '44% of revenue' },
];

export default function VendorProfileModal({ isOpen, onClose, vendor }: VendorProfileModalProps) {
  const addToPipeline = () => {
    if (!vendor) return;

    const newItem = {
      id: Date.now(),
      badge: 'IDENTIFIED',
      badgeColor: 'bg-indigo-400',
      company: vendor.name,
      title: 'Added from Market Intelligence Pursuit',
      time: 'JUST NOW',
      amount: `SAR ${(vendor.totalWon / 1000000000).toFixed(1)}B`,
      ministry: vendor.topMinistries.split(',')[0] || 'Unassigned'
    };

    const existing = JSON.parse(localStorage.getItem('munasat_pipeline') || '[]');
    localStorage.setItem('munasat_pipeline', JSON.stringify([newItem, ...existing]));
    
    alert(`${vendor.name} has been added to the Capture Pipeline!`);
    onClose();
  };

  if (!isOpen || !vendor) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-300"
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <div className="relative bg-white w-full max-w-5xl rounded-[32px] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300 flex flex-col max-h-[90vh]">
        
        {/* Top Header Bar */}
        <div className="p-6 border-b border-slate-50 flex justify-between items-center px-8">
           <span className="text-[14px] font-bold text-slate-300 uppercase tracking-widest">{vendor.name}</span>
           <button onClick={onClose} className="p-2 hover:bg-slate-50 rounded-full transition-colors group">
             <X className="w-6 h-6 text-slate-300 group-hover:text-slate-500" />
           </button>
        </div>

        <div className="overflow-y-auto p-10 pt-6">
          
          {/* Main Header */}
          <div className="flex justify-between items-center mb-10">
            <div className="flex items-center space-x-6">
              <div className="w-20 h-20 rounded-[24px] bg-indigo-50 border border-indigo-100 flex items-center justify-center text-[#554899]">
                {vendor.icon === 'Shield' ? <ShieldCheck className="w-10 h-10" /> : <Building2 className="w-10 h-10" />}
              </div>
              <div>
                <h2 className="text-[44px] font-black text-slate-800 leading-tight">{vendor.name}</h2>
                <p className="text-[20px] text-slate-400 font-medium tracking-wide">شركة علم</p>
              </div>
            </div>
            <div className="flex items-center space-x-2 bg-emerald-50 text-emerald-500 px-4 py-2 rounded-full border border-emerald-100">
              <ShieldCheck className="w-5 h-5 fill-emerald-500 text-white" />
              <span className="text-[16px] font-black uppercase tracking-wide">Verified Vendor</span>
            </div>
          </div>

          <hr className="border-slate-50 mb-10" />

          {/* Stats Grid */}
          <div className="grid grid-cols-4 gap-6 mb-10">
            {/* Total Won */}
            <div className="bg-[#554899] p-8 rounded-[24px] text-white shadow-lg shadow-indigo-200/50">
              <p className="text-[16px] font-bold text-indigo-100/70 mb-2">Total Won</p>
              <h3 className="text-[32px] font-black">SAR {(vendor.totalWon / 1000000000).toFixed(1)}B</h3>
            </div>

            {/* Win Rate */}
            <div className="bg-slate-100/80 p-8 rounded-[24px]">
              <p className="text-[16px] font-bold text-slate-400 mb-2">Win Rate</p>
              <h3 className="text-[32px] font-black text-emerald-500">{vendor.winRate}%</h3>
            </div>

            {/* Total Awards */}
            <div className="bg-slate-100/80 p-8 rounded-[24px]">
              <p className="text-[16px] font-bold text-slate-400 mb-2">Total Awards</p>
              <h3 className="text-[32px] font-black text-slate-800">{vendor.totalAwards}</h3>
            </div>

            {/* Local Content */}
            <div className="bg-slate-100/80 p-8 rounded-[24px]">
              <p className="text-[16px] font-bold text-slate-400 mb-2">Local Content</p>
              <h3 className="text-[32px] font-black text-emerald-500">{vendor.localContent}%</h3>
            </div>
          </div>

          {/* Analysis Section */}
          <div className="grid grid-cols-12 gap-8">
            
            {/* Revenue Trend */}
            <div className="col-span-7 bg-white rounded-[32px] border border-slate-100 p-8 shadow-sm">
              <div className="flex items-center space-x-3 mb-8">
                <TrendingUp className="w-6 h-6 text-[#554899]" />
                <h4 className="text-[20px] font-black text-slate-800">Revenue Trend</h4>
              </div>
              <div className="h-[300px] w-full mt-4">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={mockRevenueData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis 
                      dataKey="year" 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{fill: '#94a3b8', fontSize: 14, fontWeight: 700}} 
                      dy={20}
                    />
                    <YAxis 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{fill: '#94a3b8', fontSize: 14, fontWeight: 700}} 
                      tickFormatter={(v) => `${v}M`} 
                    />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#554899', borderRadius: '12px', border: 'none', color: '#fff' }}
                      itemStyle={{ color: '#fff' }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="revenue" 
                      stroke="#554899" 
                      strokeWidth={5} 
                      dot={{ r: 6, fill: '#10b981', stroke: '#fff', strokeWidth: 3 }}
                      activeDot={{ r: 8, fill: '#10b981', stroke: '#fff', strokeWidth: 3 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Top Ministries */}
            <div className="col-span-5 bg-white rounded-[32px] border border-slate-100 p-8 shadow-sm flex flex-col">
              <div className="flex items-center space-x-3 mb-8">
                <Landmark className="w-6 h-6 text-[#554899]" />
                <h4 className="text-[20px] font-black text-slate-800">Top Ministries</h4>
              </div>
              <div className="space-y-4">
                {mockMinistryShares.map((m, i) => (
                  <div key={i} className="flex justify-between items-center p-5 border border-slate-50 rounded-2xl hover:bg-slate-50/50 transition-colors">
                    <span className="text-[16px] font-black text-slate-700">{m.name}</span>
                    <span className="text-[14px] font-bold text-slate-400">{m.share}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>

        {/* Footer */}
        <div className="p-8 border-t border-slate-50 flex justify-between items-center bg-white mt-auto">
          <p className="text-[16px] font-medium text-slate-400 italic">Profile view opened from Participants → {vendor.name}</p>
          <div className="flex space-x-4">
            <button className="flex items-center space-x-3 bg-slate-100/80 hover:bg-slate-200 text-slate-700 px-6 py-3.5 rounded-2xl text-[16px] font-black transition-all">
              <FileSearch className="w-5 h-5" />
              <span>Compare Vendor</span>
            </button>
            <button 
              onClick={addToPipeline}
              className="flex items-center space-x-3 bg-[#554899] hover:bg-indigo-700 text-white px-6 py-3.5 rounded-2xl text-[16px] font-black transition-all shadow-lg shadow-indigo-100"
            >
              <UserPlus className="w-5 h-5" />
              <span>Add to Pipeline</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
