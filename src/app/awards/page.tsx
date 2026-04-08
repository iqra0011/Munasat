'use client';
import useSWR from 'swr';
import { DollarSign, TrendingUp, TrendingDown, Building2, Building, ChevronLeft, ChevronRight, FileText, Filter, ListOrdered } from 'lucide-react';
import Link from 'next/link';
import { useState, useEffect } from 'react';

const fetcher = (url: string) => fetch(url).then(res => res.json());

export default function AwardsPage() {
  const { data: stats } = useSWR('/api/dashboard-stats', fetcher);
  const totalAwardValue = stats?.totalAwardValue ? (stats.totalAwardValue / 1000000000).toFixed(1) : '41.0';

  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  const [sortOrder, setSortOrder] = useState<'desc' | 'asc' | null>(null);
  const [timeRange, setTimeRange] = useState('12m');

  const baseAwards = [
    { id: 'aw1', title: 'National Health Data Platform Modernization', refId: 'Ref: AW-2024-0192', vendor: 'Elm Company', ministry: 'Ministry of Health', amount: 1400000000, date: '3', timestamp: Date.now() - 50 * 24 * 3600 * 1000 },
    { id: 'aw2', title: 'Smart City Traffic Control Expansion', refId: 'Ref: AW-2024-0542', vendor: 'Saudi TechSolutions', ministry: 'Ministry of Transport', amount: 850000000, date: '5', timestamp: Date.now() - 170 * 24 * 3600 * 1000 },
    { id: 'aw3', title: 'Military Base Facilities Maintenance', refId: 'Ref: AW-2024-0821', vendor: 'Defense Systems Co', ministry: 'Ministry of Defense', amount: 2100000000, date: '1', timestamp: Date.now() - 100 * 24 * 3600 * 1000 },
    { id: 'aw4', title: 'Public School IT Infrastructure Phase 3', refId: 'Ref: AW-2024-1029', vendor: 'EduTech Middle East', ministry: 'Ministry of Education', amount: 450000000, date: '8', timestamp: Date.now() - 250 * 24 * 3600 * 1000 },
    { id: 'aw5', title: 'Riyadh Metro Extension Feasibility', refId: 'Ref: AW-2024-1148', vendor: 'Global Logistics SA', ministry: 'Ministry of Transport', amount: 120000000, date: '12', timestamp: Date.now() - 30 * 24 * 3600 * 1000 },
  ];

  let displayAwards = [...baseAwards];

  if (timeRange === '6m') {
    // Filter awards from the last 180 days
    displayAwards = displayAwards.filter(a => a.timestamp > Date.now() - 180 * 24 * 3600 * 1000);
  }

  if (sortOrder === 'desc') {
    displayAwards.sort((a, b) => b.amount - a.amount);
  } else if (sortOrder === 'asc') {
    displayAwards.sort((a, b) => a.amount - b.amount);
  }

  return (
    <div className="p-8 space-y-8 animate-in fade-in duration-500 max-w-full bg-transparent min-h-full">
      
      {/* Header */}
      <div>
        <h1 className="text-[40px] font-black tracking-tight text-slate-800 leading-none mb-1">Historical Awards</h1>
        <p className="text-[16px] text-slate-500 font-medium tracking-wide">Analyze past contract awards and incumbent vendors.</p>
      </div>

      {/* Top 3 KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* KPI 1 */}
        <div className="bg-[#5d4aae] rounded-[20px] p-6 text-white shadow-sm flex flex-col justify-between relative overflow-hidden min-h-[140px]">
           <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 flex items-center justify-center border border-white/20">
             <DollarSign className="w-4 h-4 text-white" />
           </div>
           <div>
             <p className="text-[16px] font-bold text-indigo-200 tracking-wide mb-1">Total Awarded Value</p>
             <p className="text-[34px] font-black tracking-tight leading-none mb-1">SAR {totalAwardValue}B</p>
             <p className="text-[14px] text-indigo-100 font-medium">Across 1,288 archived awards</p>
           </div>
           <div className="mt-4 flex items-center space-x-1.5 text-[14px] font-bold text-white">
             <TrendingUp className="w-3.5 h-3.5" />
             <span>+12% year over year</span>
           </div>
        </div>

        {/* KPI 2 */}
        <div className="bg-white rounded-[20px] p-6 border border-slate-100 shadow-sm flex flex-col justify-between relative overflow-hidden min-h-[140px]">
           <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center border border-slate-200">
             <Building2 className="w-4 h-4 text-slate-400" />
           </div>
           <div>
             <p className="text-[16px] font-bold text-slate-400 tracking-wide mb-1">Top Vendor</p>
             <p className="text-[34px] font-black text-slate-800 tracking-tight leading-none mb-1">Elm</p>
             <p className="text-[14px] text-slate-500 font-medium">SAR 4.8B won in 12 months</p>
           </div>
           <div className="mt-4 flex items-center space-x-1.5 text-[14px] font-bold text-emerald-500">
             <TrendingUp className="w-3.5 h-3.5" />
             <span>+8.4% vs prior year</span>
           </div>
        </div>

        {/* KPI 3 */}
        <div className="bg-white rounded-[20px] p-6 border border-slate-100 shadow-sm flex flex-col justify-between relative overflow-hidden min-h-[140px]">
           <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center border border-slate-200">
             <Building className="w-4 h-4 text-slate-400" />
           </div>
           <div>
             <p className="text-[16px] font-bold text-slate-400 tracking-wide mb-1">Largest Buyer</p>
             <p className="text-[34px] font-black text-slate-800 tracking-tight leading-none mb-1">Health</p>
             <p className="text-[14px] text-slate-500 font-medium">29% of total awards</p>
           </div>
           <div className="mt-4 flex items-center space-x-1.5 text-[14px] font-bold text-rose-500">
             <TrendingDown className="w-3.5 h-3.5" />
             <span>-2.1% share this quarter</span>
           </div>
        </div>

      </div>

      {/* Middle Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Top Awarding Ministries */}
        <div className="bg-white rounded-[20px] p-6 border border-slate-100 shadow-sm flex flex-col">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h3 className="text-[22px] font-bold text-slate-800 tracking-tight">Top awarding ministries</h3>
              <p className="text-[16px] text-slate-400 font-medium mt-0.5">Share of total awarded value</p>
            </div>
            <button className="text-[14px] font-bold text-slate-600 bg-slate-50 hover:bg-slate-100 transition-colors px-3 py-1.5 rounded border border-slate-200">View all</button>
          </div>

          <div className="flex-1 space-y-5">
            <div>
              <div className="flex justify-between items-end mb-1.5">
                <span className="text-[16px] font-semibold text-slate-800">Ministry of Health</span>
                <span className="text-[14px] font-bold text-slate-800">SAR 12B</span>
              </div>
              <div className="w-full bg-indigo-50 rounded-full h-2">
                <div className="bg-[#5d4aae] h-2 rounded-full transition-all duration-1000 ease-out delay-100" style={{ width: mounted ? '100%' : '0%' }}></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between items-end mb-1.5">
                <span className="text-[16px] font-semibold text-slate-800">Ministry of Defense</span>
                <span className="text-[14px] font-bold text-slate-800">SAR 10.2B</span>
              </div>
              <div className="w-full bg-indigo-50 rounded-full h-2">
                <div className="bg-[#5d4aae] h-2 rounded-full transition-all duration-1000 ease-out delay-200" style={{ width: mounted ? '85%' : '0%' }}></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between items-end mb-1.5">
                <span className="text-[16px] font-semibold text-slate-800">Ministry of Education</span>
                <span className="text-[14px] font-bold text-slate-800">SAR 8.4B</span>
              </div>
              <div className="w-full bg-indigo-50 rounded-full h-2">
                <div className="bg-[#5d4aae] h-2 rounded-full transition-all duration-1000 ease-out delay-300" style={{ width: mounted ? '70%' : '0%' }}></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between items-end mb-1.5">
                <span className="text-[16px] font-semibold text-slate-800">Municipal & Rural Affairs</span>
                <span className="text-[14px] font-bold text-slate-800">SAR 6.7B</span>
              </div>
              <div className="w-full bg-indigo-50 rounded-full h-2">
                <div className="bg-[#5d4aae] h-2 rounded-full transition-all duration-1000 ease-out delay-500" style={{ width: mounted ? '55%' : '0%' }}></div>
              </div>
            </div>
          </div>
        </div>

        {/* Top Winning Vendors */}
        <div className="bg-white rounded-[20px] p-6 border border-slate-100 shadow-sm flex flex-col">
          <div className="mb-6">
            <h3 className="text-[22px] font-bold text-slate-800 tracking-tight">Top winning vendors</h3>
            <p className="text-[16px] text-slate-400 font-medium mt-0.5">By awarded value in the selected period</p>
          </div>

          <div className="flex-1 space-y-6">
            {[
              { name: 'Elm Company', stats: '16 awards - 78% success rate', value: 'SAR 4.8B' },
              { name: 'STC Solutions', stats: '13 awards - 71% success rate', value: 'SAR 3.9B' },
              { name: 'Saudi Information Tech', stats: '11 awards - 68% success rate', value: 'SAR 3.2B' },
              { name: 'Nesma Infrastructure', stats: '9 awards - 64% success rate', value: 'SAR 2.6B' },
            ].map((vendor, idx) => (
              <div key={idx} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-lg bg-indigo-50 flex items-center justify-center border border-indigo-100 text-indigo-400 shrink-0">
                    <Building className="w-5 h-5 opacity-80" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[16px] font-bold text-slate-800">{vendor.name}</span>
                    <span className="text-[14px] text-slate-400 font-medium mt-0.5 tracking-wide">{vendor.stats}</span>
                  </div>
                </div>
                <span className="text-[16px] font-black text-[#5d4aae]">{vendor.value}</span>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Bottom Table Section */}
      <div className="bg-white rounded-[24px] border border-slate-100 shadow-sm overflow-hidden flex flex-col mb-10">
        
        {/* Table Header Row */}
        <div className="p-6 flex flex-col md:flex-row justify-between items-start md:items-center w-full border-b border-slate-100 gap-4">
           <div>
             <h3 className="text-[22px] font-bold text-slate-800 tracking-tight">Recent major awards</h3>
             <p className="text-[16px] text-slate-500 font-medium mt-0.5 tracking-wide">A lighter table for quick scanning and vendor drill-down</p>
           </div>
            <div className="flex items-center space-x-3">
              <button 
                onClick={() => setTimeRange(timeRange === '12m' ? '6m' : '12m')}
                className={`px-4 py-2 rounded-lg text-[14px] font-bold flex items-center space-x-2 transition-colors border ${timeRange === '6m' ? 'bg-[#5d4aae] text-white border-[#5d4aae]' : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'}`}>
                 <Filter className="w-3.5 h-3.5" />
                 <span>{timeRange === '12m' ? 'Showing: Last 12M' : 'Showing: Last 6M'}</span>
              </button>
              <button 
                onClick={() => setSortOrder(sortOrder === 'desc' ? 'asc' : sortOrder === 'asc' ? null : 'desc')}
                className={`px-4 py-2 rounded-lg text-[14px] font-bold flex items-center space-x-2 transition-colors border ${sortOrder !== null ? 'bg-[#5d4aae] text-white border-[#5d4aae]' : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'}`}>
                 <ListOrdered className="w-3.5 h-3.5" />
                 <span>{sortOrder === 'desc' ? 'Sort: Highest' : sortOrder === 'asc' ? 'Sort: Lowest' : 'Sort by Amount'}</span>
              </button>
           </div>
        </div>

        {/* Table Area */}
        <div className="overflow-x-auto w-full">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-slate-100 text-[14px] font-bold text-slate-400 uppercase tracking-widest whitespace-nowrap">
                <th className="px-8 py-5">Award Title</th>
                <th className="px-6 py-5">Vendor</th>
                <th className="px-6 py-5">Ministry</th>
                <th className="px-6 py-5">Amount</th>
                <th className="px-8 py-5">Start Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              
              {displayAwards.map((award, idx) => (
                <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-8 py-5">
                    <div className="flex flex-col">
                      <span className="text-[16px] font-bold text-slate-800">{award.title}</span>
                      <span className="text-[14px] text-slate-400 tracking-wide mt-1">{award.refId}</span>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex items-center space-x-3">
                       <div className="w-7 h-7 rounded-md border border-sky-100 flex items-center justify-center bg-sky-50 shrink-0">
                         <span className="text-[14px] font-black text-sky-500">{award.vendor[0]}</span>
                       </div>
                       <span className="text-[16px] font-bold text-slate-800">{award.vendor}</span>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="text-[16px] font-bold text-slate-800 max-w-[120px] leading-tight flex items-center">
                      {award.ministry}
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <span className="text-[16px] font-black text-[#5d4aae]">
                      SAR {(award.amount / 1000000).toFixed(0)}M
                    </span>
                  </td>
                  <td className="px-8 py-5">
                    <span className="text-[14px] font-bold text-slate-500 uppercase tracking-wider">
                      {award.date} APRIL, 2026
                    </span>
                  </td>
                </tr>
              ))}
              
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="p-6 border-t border-slate-100 flex items-center justify-between bg-white rounded-b-[24px]">
           <span className="text-[16px] font-semibold text-slate-400">Showing <strong className="text-slate-800">1</strong> to <strong className="text-slate-800">5</strong> of <strong className="text-slate-800">1,204</strong> entries</span>
           
           <div className="flex items-center space-x-1">
             <button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-slate-50 text-slate-300">
               <ChevronLeft className="w-4 h-4" />
             </button>
             <button className="w-8 h-8 flex items-center justify-center rounded-md bg-[#5d4aae] text-white text-[16px] font-bold shadow-sm">1</button>
             <button className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-slate-50 text-slate-600 border border-slate-100 bg-white text-[16px] font-bold transition-colors">2</button>
             <button className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-slate-50 text-slate-600 border border-slate-100 bg-white text-[16px] font-bold transition-colors">3</button>
             <span className="text-slate-400 px-1 font-bold">...</span>
             <button className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-slate-50 text-slate-600 border border-slate-100 bg-white text-[16px] font-bold transition-colors">241</button>
             <button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-slate-50 text-slate-400 transition-colors">
               <ChevronRight className="w-4 h-4" />
             </button>
           </div>
        </div>

      </div>

    </div>
  );
}
