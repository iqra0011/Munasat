'use client';
import { ChevronDown, Compass, Monitor, BriefcaseMedical, Zap, TrendingUp } from 'lucide-react';
import { useState } from 'react';

export default function CategoriesPage() {
  const [expandedId, setExpandedId] = useState<number | null>(1);

  const categories = [
    {
      id: 1, title: 'Construction', sub: 'INFRASTRUCTURE & URBAN DEV', icon: 'Compass', tenders: '1,248', value: '42.8B',
      stats: { growth: '+12.4%', sme: '34%', cycle: '45 Days' }
    },
    {
      id: 2, title: 'IT & Technology', sub: 'DIGITAL TRANSFORMATION', icon: 'Monitor', tenders: '856', value: '18.2B',
      stats: { growth: '+18.1%', sme: '45%', cycle: '32 Days' }
    },
    {
      id: 3, title: 'Healthcare', sub: 'PUBLIC HEALTH & PHARMA', icon: 'BriefcaseMedical', tenders: '412', value: '12.5B',
      stats: { growth: '+5.2%', sme: '22%', cycle: '65 Days' }
    },
    {
      id: 4, title: 'Energy', sub: 'RENEWABLES & UTILITIES', icon: 'Zap', tenders: '194', value: '29.1B',
      stats: { growth: '+8.9%', sme: '15%', cycle: '55 Days' }
    }
  ];

  return (
    <div className="p-8 space-y-6 animate-in fade-in duration-500 max-w-full bg-transparent min-h-full flex flex-col">
      
      {/* Header */}
      <div className="mb-4">
        <h1 className="text-[40px] font-black tracking-tight text-slate-800 leading-none mb-1">Industry Classification</h1>
        <p className="text-[16px] text-slate-500 font-medium tracking-wide">Browse procurement data by ISIC categories.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column (Main List) */}
        <div className="lg:col-span-2 space-y-4">
          
          <div className="flex justify-between items-end mb-4">
             <h2 className="text-[16px] font-bold text-slate-800">Active Categories</h2>
             <span className="text-[16px] font-medium text-slate-400">Showing 14 Industries</span>
          </div>
          
          <div className="space-y-4">
            {categories.map((cat) => {
              const isExpanded = expandedId === cat.id;

              return (
                <div 
                  key={cat.id} 
                  className={`bg-white rounded-[20px] shadow-sm border border-slate-100 transition-all cursor-pointer ${isExpanded ? 'p-6' : 'p-5 hover:border-indigo-100'}`}
                  onClick={() => setExpandedId(isExpanded ? null : cat.id)}
                >
                  
                  {/* Top Visible Row */}
                  <div className="flex items-center justify-between w-full">
                     <div className="flex items-center space-x-4">
                       <div className="w-12 h-12 rounded-xl bg-indigo-50/80 border border-indigo-100/50 flex items-center justify-center shrink-0">
                         {cat.icon === 'Compass' && <Compass className="w-5 h-5 text-[#5d4aae] opacity-80" />}
                         {cat.icon === 'Monitor' && <Monitor className="w-5 h-5 text-[#5d4aae] opacity-80" />}
                         {cat.icon === 'BriefcaseMedical' && <BriefcaseMedical className="w-5 h-5 text-[#5d4aae] opacity-80" />}
                         {cat.icon === 'Zap' && <Zap className="w-5 h-5 text-[#5d4aae] opacity-80" />}
                       </div>
                       <div className="flex flex-col">
                         <span className="text-[15px] font-bold text-slate-800 leading-tight mb-0.5">{cat.title}</span>
                         <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">{cat.sub}</span>
                       </div>
                     </div>
                     
                     <div className="flex items-center space-x-8 md:space-x-12 pr-2">
                        <div className="flex flex-col text-right">
                          <span className="text-[14px] font-bold text-slate-400 mb-0.5">Active Tenders</span>
                          <span className="text-[16px] font-black text-slate-800 leading-none">{cat.tenders}</span>
                        </div>
                        <div className="flex flex-col text-right">
                          <span className="text-[14px] font-bold text-slate-400 mb-0.5">Total Value</span>
                          <span className="text-[16px] font-black text-[#5d4aae] leading-none">SAR {cat.value}</span>
                        </div>
                        <div className="pl-2">
                          <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                        </div>
                     </div>
                  </div>

                  {/* Expanded Block */}
                  {isExpanded && (
                    <div className="mt-6 pt-5 border-t border-slate-50 grid grid-cols-1 md:grid-cols-3 gap-4 animate-in slide-in-from-top-2 duration-200 fade-in">
                       <div className="bg-slate-100/70 rounded-xl p-4">
                         <span className="block text-[14px] font-bold text-slate-400 mb-1">QoQ Growth</span>
                         <span className="block text-[15px] font-black text-slate-800">{cat.stats.growth}</span>
                       </div>
                       <div className="bg-slate-100/70 rounded-xl p-4">
                         <span className="block text-[14px] font-bold text-slate-400 mb-1">SME Participation</span>
                         <span className="block text-[15px] font-black text-slate-800">{cat.stats.sme}</span>
                       </div>
                       <div className="bg-slate-100/70 rounded-xl p-4">
                         <span className="block text-[14px] font-bold text-slate-400 mb-1">Avg. Tender Cycle</span>
                         <span className="block text-[15px] font-black text-slate-800">{cat.stats.cycle}</span>
                       </div>
                    </div>
                  )}

                </div>
              );
            })}
          </div>

        </div>

        {/* Right Column (Sidebar Analytics) */}
        <div className="lg:col-span-1 pt-10">
           
           <div className="bg-white rounded-[24px] shadow-sm border border-slate-100 p-8">
             
             <h3 className="text-[22px] font-bold text-slate-800 mb-8">Top Categories by Volume</h3>
             
             <div className="space-y-6">
                <div>
                  <div className="flex justify-between items-end mb-2">
                    <span className="text-[16px] font-medium text-slate-800">Construction</span>
                    <span className="text-[14px] font-bold text-slate-500">42%</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-1.5">
                    <div className="bg-[#5d4aae] h-1.5 rounded-full" style={{ width: '42%' }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-end mb-2">
                    <span className="text-[16px] font-medium text-slate-800">Energy</span>
                    <span className="text-[14px] font-bold text-slate-500">28%</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-1.5">
                    <div className="bg-[#5d4aae] h-1.5 rounded-full" style={{ width: '28%' }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-end mb-2">
                    <span className="text-[16px] font-medium text-slate-800">IT & Tech</span>
                    <span className="text-[14px] font-bold text-slate-500">15%</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-1.5">
                    <div className="bg-[#5d4aae] h-1.5 rounded-full" style={{ width: '15%' }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-end mb-2">
                    <span className="text-[16px] font-medium text-slate-800">Healthcare</span>
                    <span className="text-[14px] font-bold text-slate-500">12%</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-1.5">
                    <div className="bg-[#5d4aae] h-1.5 rounded-full" style={{ width: '12%' }}></div>
                  </div>
                </div>
             </div>

             <div className="mt-10 pt-6 border-t border-slate-100 flex items-start space-x-3">
               <TrendingUp className="w-4 h-4 text-slate-400 mt-0.5 shrink-0" />
               <p className="text-[14px] font-medium text-slate-500 leading-relaxed">
                 Aggregate spending is up <strong className="font-bold text-slate-800">14.2%</strong> compared to previous fiscal year.
               </p>
             </div>

           </div>

        </div>

      </div>

    </div>
  );
}
