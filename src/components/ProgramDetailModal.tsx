'use client';
import React from 'react';
import { X, LayoutDashboard, Calendar, Users2, BarChart3, TrendingUp } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

interface ProgramDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  program: {
    id: string;
    title: string;
    budget: string;
    spent: string;
    active: string;
  } | null;
}

const mockChartData = [
  { name: 'Total Budget', value: 1.9, color: '#f59e0b' }, // Yellow
  { name: 'Spent', value: 0.35, color: '#6366f1' },       // Indigo
  { name: 'Committed', value: 0.85, color: '#ec4899' },   // Pink
  { name: 'Remaining', value: 0.7, color: '#5d4aae' },    // Deep Purple
];

const timelinePhases = [
  { name: 'Phase 1: Planning', progress: 100, color: 'bg-indigo-400' },
  { name: 'Phase 2: Infrastructure', progress: 60, color: 'bg-[#5d4aae]' },
  { name: 'Phase 3: Development', progress: 10, color: 'bg-indigo-300' },
  { name: 'Phase 4: Testing', progress: 0, color: 'bg-slate-100' },
  { name: 'Phase 5: Launch', progress: 0, color: 'bg-slate-100' },
];

const topVendors = [
  { id: 1, name: 'Bechtel', tier: 'Tier 1' },
  { id: 2, name: 'Nesma', tier: 'Tier 1' },
  { id: 3, name: 'Webuild', tier: 'Tier 1' },
];

export default function ProgramDetailModal({ isOpen, onClose, program }: ProgramDetailModalProps) {
  if (!isOpen || !program) return null;

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-6">
      <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm animate-in fade-in duration-300" onClick={onClose} />
      
      <div className="relative bg-white w-full max-w-6xl rounded-[32px] shadow-2xl overflow-hidden flex flex-col h-[90vh] animate-in zoom-in-95 duration-300">
        
        {/* Header */}
        <div className="p-6 border-b border-slate-50 flex justify-between items-center bg-white px-8">
           <span className="text-[24px] font-black text-slate-800 uppercase tracking-tight">{program.title}</span>
           <button onClick={onClose} className="p-2 hover:bg-slate-50 rounded-full transition-colors group">
             <X className="w-6 h-6 text-slate-300 group-hover:text-slate-500" />
           </button>
        </div>

        <div className="flex-1 overflow-y-auto p-10 bg-slate-50/30">
          
          {/* Top KPI Cards */}
          <div className="grid grid-cols-4 gap-6 mb-8">
            <div className="bg-[#5d4aae] p-8 rounded-[24px] text-white shadow-xl shadow-indigo-100">
               <p className="text-[14px] font-bold text-indigo-100 mb-1">Total Budget</p>
               <h3 className="text-[32px] font-black">{program.budget}</h3>
            </div>
            <div className="bg-white border border-slate-100 p-8 rounded-[24px] shadow-sm">
               <p className="text-[14px] font-bold text-slate-400 mb-1">Spent to Date</p>
               <h3 className="text-[32px] font-black text-emerald-500">{program.spent}</h3>
            </div>
            <div className="bg-white border border-slate-100 p-8 rounded-[24px] shadow-sm">
               <p className="text-[14px] font-bold text-slate-400 mb-1">Sub-Projects</p>
               <h3 className="text-[32px] font-black text-slate-800">145</h3>
            </div>
            <div className="bg-white border border-slate-100 p-8 rounded-[24px] shadow-sm">
               <p className="text-[14px] font-bold text-slate-400 mb-1">Active Tenders</p>
               <h3 className="text-[32px] font-black text-[#5d4aae] opacity-80">42</h3>
            </div>
          </div>

          <div className="grid grid-cols-12 gap-8 mb-8">
            
            {/* Budget Waterfall Chart */}
            <div className="col-span-7 bg-white rounded-[24px] border border-slate-100 p-8 shadow-sm">
               <div className="flex items-center space-x-3 mb-10">
                 <BarChart3 className="w-5 h-5 text-[#5d4aae]" />
                 <h4 className="text-[18px] font-black text-slate-800 uppercase tracking-wide">Budget Allocation (Waterfall)</h4>
               </div>
               <div className="h-[350px] w-full">
                 <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={mockChartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                      <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12, fontWeight: 700}} dy={15} />
                      <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12, fontWeight: 700}} tickFormatter={(v) => `${v}T`} />
                      <Tooltip 
                        cursor={{fill: 'transparent'}}
                        contentStyle={{ backgroundColor: '#fff', borderRadius: '16px', border: '1px solid #f1f5f9', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                      />
                      <Bar dataKey="value" radius={[10, 10, 0, 0]} barSize={60}>
                        {mockChartData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Bar>
                    </BarChart>
                 </ResponsiveContainer>
               </div>
            </div>

            {/* Project Timeline */}
            <div className="col-span-5 bg-white rounded-[24px] border border-slate-100 p-8 shadow-sm">
               <div className="flex items-center space-x-3 mb-10">
                 <Calendar className="w-5 h-5 text-[#5d4aae]" />
                 <h4 className="text-[18px] font-black text-slate-800 uppercase tracking-wide">Project Timeline</h4>
               </div>
               <div className="space-y-8">
                 {timelinePhases.map((phase, i) => (
                   <div key={i}>
                     <div className="flex justify-between items-center mb-3">
                        <span className="text-[15px] font-black text-slate-600">{phase.name}</span>
                        <span className="text-[14px] font-black text-indigo-500">{phase.progress}%</span>
                     </div>
                     <div className="w-full bg-slate-50 h-[10px] rounded-full overflow-hidden border border-slate-100">
                        <div 
                          className={`h-full rounded-full transition-all duration-1000 ${phase.color}`} 
                          style={{ width: `${phase.progress}%` }}
                        />
                     </div>
                   </div>
                 ))}
               </div>
               {/* Quarter Timeline Labels */}
               <div className="flex justify-between mt-10 text-[11px] font-black text-slate-300 uppercase tracking-widest">
                  <span>Q1 2024</span>
                  <span>Q2 2024</span>
                  <span>Q3 2024</span>
                  <span>Q4 2024</span>
               </div>
            </div>

          </div>

          {/* Top Vendors Section */}
          <div className="bg-white rounded-[24px] border border-slate-100 p-8 shadow-sm">
             <div className="flex items-center space-x-3 mb-8">
               <Users2 className="w-5 h-5 text-[#5d4aae]" />
               <h4 className="text-[18px] font-black text-slate-800 uppercase tracking-wide">Top Vendors</h4>
             </div>
             <div className="space-y-4">
                {topVendors.map((vendor) => (
                  <div key={vendor.id} className="flex justify-between items-center bg-slate-50/50 hover:bg-slate-50 p-6 rounded-[24px] border border-slate-50 transition-colors">
                     <div className="flex items-center space-x-6">
                        <span className="text-[16px] font-black text-indigo-500 w-8">{vendor.id}</span>
                        <span className="text-[18px] font-black text-slate-700">{vendor.name}</span>
                     </div>
                     <span className="bg-emerald-50 text-emerald-500 text-[12px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full border border-emerald-100">
                        {vendor.tier}
                     </span>
                  </div>
                ))}
             </div>
          </div>

        </div>

      </div>
    </div>
  );
}
