'use client';
import useSWR from 'swr';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip as RechartsTooltip } from 'recharts';
import * as LucideIcons from 'lucide-react';

const fetcher = (url: string) => fetch(url).then(res => res.json());

const spendData = [
  { name: 'JAN', spend: 300 },
  { name: 'FEB', spend: 350 },
  { name: 'MAR', spend: 320 },
  { name: 'APR', spend: 400 },
  { name: 'MAY', spend: 574 }, // point from screenshot
  { name: 'JUN', spend: 450 },
  { name: 'JUL', spend: 800 }, // huge peak
  { name: 'AUG', spend: 650 },
  { name: 'SEP', spend: 500 },
  { name: 'OCT', spend: 400 },
  { name: 'NOV', spend: 550 },
  { name: 'DEC', spend: 420 },
];

export default function ReportsPage() {
  const { data: stats } = useSWR('/api/dashboard-stats', fetcher);
  const totalAwardValue = stats?.totalAwardValue ? (stats.totalAwardValue / 1000000000).toFixed(1) : '41.0';

  return (
    <div className="p-8 space-y-6 animate-in fade-in duration-500 max-w-full bg-transparent min-h-full">
      
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-[40px] font-black tracking-tight text-slate-800 leading-none mb-1">Market Intelligence Analytics</h1>
        <p className="text-[16px] text-slate-500 font-medium tracking-wide">Macro-level insights into Saudi government procurement trends.</p>
      </div>

      {/* Top 3 KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* KPI 1 */}
        <div className="bg-[#5d4aae] rounded-[24px] p-6 text-white shadow-sm flex flex-col justify-between relative overflow-hidden min-h-[140px]">
           <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 flex items-center justify-center border border-white/20">
             <LucideIcons.DollarSign className="w-4 h-4 text-white" />
           </div>
           <div>
             <p className="text-[16px] font-bold text-indigo-200 tracking-wide mb-1">Total Awarded Value</p>
             <p className="text-[34px] font-black tracking-tight leading-none mb-1">SAR {totalAwardValue}B</p>
             <p className="text-[14px] text-indigo-100 font-medium">Across 1,288 archived awards</p>
           </div>
           <div className="mt-4 flex items-center space-x-1.5 text-[14px] font-bold text-white">
             <LucideIcons.TrendingUp className="w-3.5 h-3.5" />
             <span>+12% year over year</span>
           </div>
        </div>

        {/* KPI 2 */}
        <div className="bg-white rounded-[24px] p-6 border border-slate-100 shadow-sm flex flex-col justify-between relative overflow-hidden min-h-[140px]">
           <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center border border-slate-200">
             <LucideIcons.Building2 className="w-4 h-4 text-slate-400" />
           </div>
           <div>
             <p className="text-[16px] font-bold text-slate-400 tracking-wide mb-1">Active Contracts</p>
             <p className="text-[34px] font-black text-slate-800 tracking-tight leading-none mb-1">4,205</p>
             <p className="text-[14px] text-slate-500 font-medium">Currently in execution</p>
           </div>
           <div className="mt-4 flex items-center space-x-1.5 text-[14px] font-bold text-emerald-500">
             <LucideIcons.TrendingUp className="w-3.5 h-3.5" />
             <span>+8.4% vs prior year</span>
           </div>
        </div>

        {/* KPI 3 */}
        <div className="bg-white rounded-[24px] p-6 border border-slate-100 shadow-sm flex flex-col justify-between relative overflow-hidden min-h-[140px]">
           <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center border border-slate-200">
             <LucideIcons.Building className="w-4 h-4 text-slate-400" />
           </div>
           <div>
             <p className="text-[16px] font-bold text-slate-400 tracking-wide mb-1">Leading Ministry</p>
             <p className="text-[34px] font-black text-slate-800 tracking-tight leading-none mb-1">Health</p>
             <p className="text-[14px] text-slate-500 font-medium">SAR 18.4B total value</p>
           </div>
           <div className="mt-4 flex items-center space-x-1.5 text-[14px] font-bold text-rose-500">
             <LucideIcons.TrendingDown className="w-3.5 h-3.5" />
             <span>Maintained top spot</span>
           </div>
        </div>

      </div>

      {/* Full Width Area Chart */}
      <div className="bg-white rounded-[24px] p-8 border border-slate-100 shadow-sm">
        <div className="mb-10">
           <h3 className="text-[22px] font-bold text-slate-800">Year-over-Year Spend Trend</h3>
           <p className="text-[16px] text-slate-400 font-medium mt-0.5">Total awarded contract value (SAR) compared to the previous calendar year</p>
        </div>
        
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={spendData} margin={{ top: 20, right: 0, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorCurve" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#5d4aae" stopOpacity={0.15}/>
                  <stop offset="95%" stopColor="#5d4aae" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={true} horizontal={false} stroke="#f1f5f9" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 10, fontWeight: 700}} dy={15} />
              <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 10, fontWeight: 700}} tickFormatter={(v) => `${v}m`} />
              <RechartsTooltip 
                cursor={{ stroke: '#94a3b8', strokeWidth: 1, strokeDasharray: '4 4' }}
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="bg-[#fb668f] text-white text-[16px] font-bold px-5 py-2.5 rounded-xl shadow-lg relative -top-12">
                        {payload[0].value}
                        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-[#fb668f] rotate-45 rounded-sm -z-10"></div>
                        <div className="absolute -bottom-[50px] left-1/2 -translate-x-1/2 w-3 h-3 bg-[#fb668f] rounded-full border-[3px] border-white shadow-sm z-10"></div>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Area type="monotone" dataKey="spend" stroke="#5d4aae" strokeWidth={3} fill="url(#colorCurve)" activeDot={{r: 0}} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Bottom 2 Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pb-10">
        
        {/* Top Ministries */}
        <div className="bg-white rounded-[24px] p-8 border border-slate-100 shadow-sm flex flex-col">
          <div className="mb-8">
            <h3 className="text-[22px] font-bold text-slate-800 tracking-tight">Top Ministries</h3>
            <p className="text-[16px] text-slate-400 font-medium mt-0.5">Highest overall spending concentration</p>
          </div>

          <div className="flex-1 space-y-7">
            <div>
              <div className="flex justify-between items-end mb-2">
                <span className="text-[16px] font-semibold text-slate-800">Ministry of Health</span>
                <span className="text-[14px] font-bold text-slate-800">SAR 12B</span>
              </div>
              <div className="w-full bg-indigo-50 rounded-full h-2.5">
                <div className="bg-[#5d4aae] h-2.5 rounded-full" style={{ width: '100%' }}></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between items-end mb-2">
                <span className="text-[16px] font-semibold text-slate-800">Ministry of Defense</span>
                <span className="text-[14px] font-bold text-slate-800">SAR 10.2B</span>
              </div>
              <div className="w-full bg-indigo-50 rounded-full h-2.5">
                <div className="bg-[#5d4aae] h-2.5 rounded-full" style={{ width: '85%' }}></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between items-end mb-2">
                <span className="text-[16px] font-semibold text-slate-800">Ministry of Education</span>
                <span className="text-[14px] font-bold text-slate-800">SAR 8.4B</span>
              </div>
              <div className="w-full bg-indigo-50 rounded-full h-2.5">
                <div className="bg-[#5d4aae] h-2.5 rounded-full" style={{ width: '70%' }}></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between items-end mb-2">
                <span className="text-[16px] font-semibold text-slate-800">Municipal & Rural Affairs</span>
                <span className="text-[14px] font-bold text-slate-800">SAR 6.7B</span>
              </div>
              <div className="w-full bg-indigo-50 rounded-full h-2.5">
                <div className="bg-[#5d4aae] h-2.5 rounded-full" style={{ width: '55%' }}></div>
              </div>
            </div>
          </div>
        </div>

        {/* Spend by Category / Donut */}
        <div className="bg-white rounded-[24px] p-8 border border-slate-100 shadow-sm flex flex-col">
           <div className="mb-4">
             <h3 className="text-[22px] font-bold text-slate-800 tracking-tight">Spend by Category</h3>
             <p className="text-[16px] text-slate-400 font-medium mt-0.5">Highest overall spending concentration</p>
           </div>
           
           <div className="flex-1 flex flex-col items-center justify-center pt-4">
             
             {/* Simple SVG Donut Chart exactly matching the reference */}
             <div className="relative w-48 h-48 mb-8">
               <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                 {/* Teal Segment (Backing base if needed, but we'll draw paths directly) */}
                 <circle cx="50" cy="50" r="36" fill="transparent" stroke="#10b981" strokeWidth="16" />
                 {/* Yellow Segment */}
                 <circle cx="50" cy="50" r="36" fill="transparent" stroke="#f59e0b" strokeWidth="16" strokeDasharray="226" strokeDashoffset="113" className="origin-center" style={{ transform: 'rotate(180deg)' }} />
                 {/* Blue/Purple Segment */}
                 <circle cx="50" cy="50" r="36" fill="transparent" stroke="#3b82f6" strokeWidth="16" strokeDasharray="226" strokeDashoffset="85" />
               </svg>
               <div className="absolute inset-0 flex flex-col items-center justify-center rounded-full">
                  <span className="text-[16px] font-black text-slate-800">SAR 112B</span>
               </div>
             </div>

             {/* Dynamic Legends Layout */}
             <div className="flex w-full justify-between items-center px-4 mt-auto">
               
               <div className="flex flex-col items-center">
                 <div className="flex items-center space-x-1.5 mb-1">
                   <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                   <span className="text-[14px] font-bold text-slate-800">Construction</span>
                 </div>
                 <span className="text-[8px] text-slate-400 font-bold tracking-widest uppercase">58% • SAR 39.2B</span>
               </div>

               <div className="flex flex-col items-center">
                 <div className="flex items-center space-x-1.5 mb-1">
                   <div className="w-2 h-2 rounded-full bg-amber-500"></div>
                   <span className="text-[14px] font-bold text-slate-800">Healthcare</span>
                 </div>
                 <span className="text-[8px] text-slate-400 font-bold tracking-widest uppercase">30% • SAR 38.0B</span>
               </div>

               <div className="flex flex-col items-center">
                 <div className="flex items-center space-x-1.5 mb-1">
                   <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                   <span className="text-[14px] font-bold text-slate-800">IT & Telecom</span>
                 </div>
                 <span className="text-[8px] text-slate-400 font-bold tracking-widest uppercase">12% • SAR 31.4B</span>
               </div>

             </div>

           </div>
        </div>

      </div>

    </div>
  );
}
