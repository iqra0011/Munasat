'use client';
import useSWR from 'swr';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip as RechartsTooltip } from 'recharts';
import { Search, Map, ShieldCheck, Activity, Users, FileText, CheckCircle, Rocket, Sparkles, User, Bookmark, History } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

const fetcher = (url: string) => fetch(url).then(res => res.json());

const spendDataFull = [
  { name: 'JAN', spend: 300 },
  { name: 'FEB', spend: 350 },
  { name: 'MAR', spend: 574 },
  { name: 'APR', spend: 400 },
  { name: 'MAY', spend: 450 },
  { name: 'JUN', spend: 380 },
  { name: 'JUL', spend: 490 },
  { name: 'AUG', spend: 510 },
  { name: 'SEP', spend: 620 },
  { name: 'OCT', spend: 580 },
  { name: 'NOV', spend: 650 },
  { name: 'DEC', spend: 710 },
];

export default function ExplorePage() {
  const { data: stats, isLoading } = useSWR('/api/dashboard-stats', fetcher);
  const awardVal = stats?.totalAwardValue ? (stats.totalAwardValue / 1000000000).toFixed(1) : '41.0';
  const [chartFilter, setChartFilter] = useState('year');
  const displayData = chartFilter === '6months' ? spendDataFull.slice(-6) : spendDataFull;

  return (
    <div className="p-8 space-y-6 max-w-full animate-in fade-in duration-500 bg-transparent min-h-full">
      
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-[40px] font-black text-slate-800 leading-none mb-1">Global Intelligence Hub</h1>
        <p className="text-[16px] text-slate-400 font-medium">Real-time procurement landscape for the Kingdom of Saudi Arabia</p>
      </div>

      {/* Hero Cards Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Hero Card */}
        <div className="lg:col-span-2 rounded-[12px] p-8 text-white relative overflow-hidden flex flex-col justify-between min-h-[260px] shadow-sm border border-white" style={{ background: 'linear-gradient(182.95deg, #6C5EB5 1.99%, #554899 102.81%)' }}>
          {/* Faint Chart Background SVG */}
          <div className="absolute right-0 top-1/2 -translate-y-1/2 opacity-20 w-1/2 h-full pointer-events-none">
             <svg width="152" height="91" viewBox="0 0 152 91" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
               <path d="M10.64 91L0 80.3833L56.24 23.8875L86.64 54.2208L126.16 15.1667H106.4V0H152V45.5H136.8V25.7833L86.64 75.8333L56.24 45.5L10.64 91Z" fill="#3B2F43" fillOpacity="0.15"/>
             </svg>
          </div>
          
          <div className="relative z-10">
             <div className="inline-flex items-center space-x-2 border border-white/20 bg-white/5 rounded-full px-3 py-1 mb-6">
                <FileText className="w-3.5 h-3.5 text-indigo-200" />
                <span className="text-xs font-bold uppercasest text-indigo-100">Market Leader</span>
             </div>
             <h2 className="text-[40px] font-black leading-tight mb-2">Vision 2030 <br/>Procurement Intelligence</h2>
             <p className="text-white text-[16px] font-medium max-w-sm mb-8 leading-relaxed">
               Real-time analysis of Saudi government tenders, awards, and vendor performance across all major sectors.
             </p>
          </div>
          
          <div className="flex space-x-3 relative z-10">
            <Link href="/opportunities" className="bg-white text-[#5d4aae] px-5 py-2.5 rounded-full text-[16px] font-bold hover:bg-slate-50 transition-colors shadow-sm">
              Explore Tenders
            </Link>
            <Link href="/reports" className="bg-transparent border-[1.5px] border-white/40 text-white px-5 py-2.5 rounded-full text-[16px] font-bold hover:bg-white/10 transition-colors">
              Market Reports
            </Link>
          </div>
        </div>

        {/* Right Hero Card */}
        <div className="rounded-[12px] p-8 text-white relative overflow-hidden flex flex-col justify-between shadow-sm border border-white" style={{ background: 'linear-gradient(358.15deg, #EC608D -3.96%, #FC87AB 123.53%)' }}>
           <div>
             <div className="flex flex-col items-start p-2 w-10 h-10 bg-white/20 rounded-lg mb-4">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20 13.0004C20 18.0004 16.5 20.5005 12.34 21.9505C12.1222 22.0243 11.8855 22.0207 11.67 21.9405C7.5 20.5005 4 18.0004 4 13.0004V6.00045C4 5.73523 4.10536 5.48088 4.29289 5.29334C4.48043 5.10581 4.73478 5.00045 5 5.00045C7 5.00045 9.5 3.80045 11.24 2.28045C11.4519 2.09945 11.7214 2 12 2C12.2786 2 12.5481 2.09945 12.76 2.28045C14.51 3.81045 17 5.00045 19 5.00045C19.2652 5.00045 19.5196 5.10581 19.7071 5.29334C19.8946 5.48088 20 5.73523 20 6.00045V13.0004Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M9 12L11 14L15 10" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
             </div>
             <h2 className="text-[40px] font-black leading-none mb-3">Market Sentiment</h2>
             <p className="text-white text-[16px] font-medium leading-relaxed mb-8">
               Investor confidence is up <strong>+14.2%</strong> this month following the Riyadh Expo 2030 announcement.
             </p>
           </div>
           
           <div>
             <div className="flex justify-between text-[16px] font-boldr uppercase mb-2 text-white">
               <span>Confidence Index</span>
               <span>342 Tenders</span>
             </div>
             <div className="w-full h-2 bg-black/10 rounded-full overflow-hidden">
               <div className="w-[75%] h-full bg-white rounded-full"></div>
             </div>
           </div>
        </div>

      </div>

      {/* 4 KPI Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* KPI 1: Active Tenders */}
        <div className="bg-white rounded-[12px] p-6 border border-white shadow-sm flex flex-col justify-between min-h-[218px]">
          <div className="flex justify-between items-start mb-2">
             <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center">
               <FileText className="w-4 h-4 text-[#5d4aae]" />
             </div>
             <span className="text-[16px] font-black text-emerald-500">+4.2%</span>
          </div>
          <div>
            <p className="text-[16px] font-bold text-slate-400 mb-2">Active Tenders</p>
            <p className="text-[40px] font-black text-slate-800 leading-none mb-4">{isLoading ? '...' : '1.1K'}</p>
            <div className="flex justify-end items-end space-x-1 h-6">
              <div className="w-6 bg-indigo-100 rounded-sm h-[40%]"></div>
              <div className="w-6 bg-indigo-200 rounded-sm h-[50%]"></div>
              <div className="w-6 bg-indigo-300 rounded-sm h-[60%]"></div>
              <div className="w-6 bg-[#5d4aae] rounded-sm h-[100%]"></div>
            </div>
          </div>
        </div>

        {/* KPI 2: Total Award Value */}
        <div className="rounded-[12px] p-6 flex flex-col justify-between min-h-[218px] text-white" style={{ background: 'linear-gradient(180deg, #685AB3 0%, #554899 100%)', boxShadow: '0px 20px 25px -5px rgba(26, 64, 194, 0.2), 0px 8px 10px -6px rgba(26, 64, 194, 0.2)' }}>
          <div className="flex justify-between items-start mb-2">
             <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
               <Map className="w-4 h-4 text-white" />
             </div>
             <span className="text-[16px] font-bold bg-white/20 px-2 py-1 rounded-full text-white">+12.8%</span>
          </div>
          <div>
            <p className="text-[16px] font-bold text-indigo-200 mb-2">Total Award Value</p>
            <p className="text-[40px] font-black leading-none mb-2">SAR {awardVal}B</p>
            <p className="text-[14px] text-white font-medium">Highest volume this fiscal year</p>
          </div>
        </div>

        {/* KPI 3: Active Vendors */}
        <div className="bg-white rounded-[12px] p-6 border border-white shadow-sm flex flex-col justify-between min-h-[218px]">
          <div className="flex justify-between items-start mb-2">
             <div className="w-8 h-8 rounded-lg flex items-center justify-center border border-slate-100">
               <Users className="w-4 h-4 text-slate-400" />
             </div>
             <span className="text-[16px] font-black text-emerald-500">+210 new</span>
          </div>
          <div>
            <p className="text-[16px] font-bold text-slate-400 mb-2">Active Vendors</p>
            <p className="text-[40px] font-black text-slate-800 leading-none mb-4">{isLoading ? '...' : '2.5K'}</p>
            <div className="flex justify-end items-end space-x-1 h-6">
              <div className="w-6 bg-pink-50 rounded-sm h-[20%]"></div>
              <div className="w-6 bg-pink-100 rounded-sm h-[30%]"></div>
              <div className="w-6 bg-pink-200 rounded-sm h-[50%]"></div>
              <div className="w-6 bg-[#fb668f] rounded-sm h-[100%]"></div>
            </div>
          </div>
        </div>

        {/* KPI 4: Priority Projects */}
         <div className="bg-white rounded-[12px] p-6 border border-white shadow-sm flex flex-col justify-between min-h-[218px]">
          <div className="flex justify-between items-start mb-2">
             <div className="w-8 h-8 rounded-lg flex items-center justify-center">
               <Sparkles className="w-4 h-4 text-orange-400" />
             </div>
             <span className="text-[14px] font-black text-orange-500 uppercasest">Vision 2030</span>
          </div>
          <div>
            <p className="text-[16px] font-bold text-slate-400 mb-2">Priority Projects</p>
            <p className="text-[40px] font-black text-slate-800 leading-none mb-3">4</p>
            <div className="flex -space-x-2">
               <div className="w-7 h-7 rounded-full bg-slate-200 border-2 border-white overflow-hidden bg-[url('https://api.dicebear.com/7.x/identicon/svg?seed=NEOM')] bg-cover"></div>
               <div className="w-7 h-7 rounded-full bg-slate-300 border-2 border-white overflow-hidden bg-[url('https://api.dicebear.com/7.x/identicon/svg?seed=RedSea')] bg-cover"></div>
               <div className="w-7 h-7 rounded-full bg-slate-400 border-2 border-white overflow-hidden bg-[url('https://api.dicebear.com/7.x/identicon/svg?seed=Qiddiya')] bg-cover"></div>
               <div className="w-7 h-7 rounded-full bg-slate-100 border-2 border-white text-[9px] font-bold text-slate-500 flex items-center justify-center">+5</div>
            </div>
          </div>
        </div>

      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Line Chart */}
        <div className="lg:col-span-2 bg-white rounded-[24px] p-8 border border-slate-100 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-[22px] font-bold text-slate-800">Spending Trends</h3>
            <select 
              value={chartFilter}
              onChange={(e) => setChartFilter(e.target.value)}
              className="bg-slate-50 border border-slate-200 text-slate-600 text-[14px] rounded-lg px-3 py-1.5 outline-none focus:border-[#5d4aae] transition-colors cursor-pointer font-medium"
            >
              <option value="year">This Year</option>
              <option value="6months">Past 6 Months</option>
            </select>
          </div>
          <div className="h-[220px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={displayData} margin={{ top: 20, right: 10, left: 10, bottom: 15 }}>
                <defs>
                  <linearGradient id="colorCurve" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#5d4aae" stopOpacity={0.15}/>
                    <stop offset="95%" stopColor="#5d4aae" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={true} horizontal={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12, fontWeight: 700}} dy={8} minTickGap={10} />
                <YAxis width={45} axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12, fontWeight: 700}} tickFormatter={(v) => `${v}m`} />
                <RechartsTooltip 
                  cursor={{ stroke: '#94a3b8', strokeWidth: 1, strokeDasharray: '4 4' }}
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="bg-[#fb668f] text-white text-[16px] font-bold px-4 py-2 rounded-xl shadow-lg relative -top-10">
                          {payload[0].value}
                          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-[#fb668f] rotate-45 rounded-sm -z-10"></div>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Area type="monotone" dataKey="spend" stroke="#5d4aae" strokeWidth={3} fill="url(#colorCurve)" activeDot={{r: 6, fill: '#fb668f', stroke: 'white', strokeWidth: 3}} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Donut Chart Simulation */}
        <div className="bg-white rounded-[24px] p-8 border border-slate-100 shadow-sm flex flex-col">
          <h3 className="text-[22px] font-bold text-slate-800 mb-6">Spend by Sector</h3>
          <div className="flex-1 flex flex-col items-center justify-center">
            
            <div className="relative w-40 h-40 mb-8 mt-4">
               {/* Synthetic Donut via border */}
               <div className="absolute inset-0 rounded-full border-[16px] border-slate-100"></div>
               {/* Overlay arc (simulating the 38% slice) */}
               <div className="absolute inset-0 rounded-full border-[16px] border-t-[#5d4aae] border-r-[#5d4aae] border-b-transparent border-l-transparent rotate-45 hover:scale-105 transition-transform cursor-pointer"></div>
               <div className="absolute inset-0 flex flex-col items-center justify-center">
                 <span className="text-3xl font-black text-slate-800">38%</span>
                 <span className="text-[14px] uppercase font-bold text-slate-400">Const.</span>
               </div>
            </div>

            <div className="w-full space-y-3">
              <div className="flex justify-between items-center text-[16px] font-bold">
                <div className="flex items-center space-x-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#5d4aae]"></div>
                  <span className="text-slate-600">Construction</span>
                </div>
                <span className="text-slate-800">SAR 15.6B</span>
              </div>
              <div className="flex justify-between items-center text-[16px] font-bold">
                <div className="flex items-center space-x-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-indigo-300"></div>
                  <span className="text-slate-600">Energy & Power</span>
                </div>
                <span className="text-slate-800">SAR 11.2B</span>
              </div>
              <div className="flex justify-between items-center text-[16px] font-bold">
                <div className="flex items-center space-x-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-slate-200"></div>
                  <span className="text-slate-600">Technology</span>
                </div>
                <span className="text-slate-800">SAR 8.4B</span>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Tenders & AI Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Trending Tenders */}
        <div className="lg:col-span-2 bg-white rounded-[24px] border border-slate-100 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-white flex justify-between items-center pt-8 px-8">
            <h3 className="text-[22px] font-bold text-slate-800">Trending Tenders</h3>
            <Link href="/opportunities" className="text-[16px] font-bold text-slate-500 hover:text-[#5d4aae]">Explore Market &gt;</Link>
          </div>
          <div className="px-8 pb-4">
            
            {[
              { id: 'NEO', iconBg: 'bg-[#EEF2FF]', iconCol: 'text-[#4F46E5]', title: 'Digital Infrastructure Phase II - The Line', org: 'NEOM Authority', date: 'Closing in 14 days', val: 'SAR 2.4B', tag: 'STRATEGIC', tagCol: 'text-emerald-700 bg-[#70FBC4]' },
              { id: 'ENV', iconBg: 'bg-[#ECFDF5]', iconCol: 'text-[#059669]', title: 'Sustainable Water Management - Tabuk Region', org: 'Ministry of Environment', date: 'Closing in 3 days', val: 'SAR 450M', tag: 'HIGH INTEREST', tagCol: 'text-orange-700 bg-[#FFDAD6]' },
              { id: 'TRN', iconBg: 'bg-[#FFFBEB]', iconCol: 'text-[#D97706]', title: 'Expansion of King Khalid Int. Airport - Terminal 4', org: 'GACA', date: 'Closing in 22 days', val: 'SAR 1.8B', tag: 'INFRASTRUCTURE', tagCol: 'text-indigo-700 bg-[#EEF2FF]' },
              { id: 'HLT', iconBg: 'bg-[#EEF2FF]', iconCol: 'text-[#4F46E5]', title: 'Smart Hospital Management System Rollout', org: 'Ministry of Health', date: 'Closing in 8 days', val: 'SAR 320M', tag: 'TECHNOLOGY', tagCol: 'text-indigo-700 bg-[#EEF2FF]' }
            ].map(t => (
              <div key={t.id} className="py-4 flex items-center justify-between group cursor-pointer border-b border-slate-50 last:border-none">
                <div className="flex items-center space-x-4">
                  <div className={`w-10 h-10 rounded-lg ${t.iconBg} flex items-center justify-center`}>
                    <span className={`text-[14px] font-black ${t.iconCol}`}>{t.id}</span>
                  </div>
                  <div>
                    <h4 className="text-[16px] font-bold text-slate-800 group-hover:text-[#5d4aae] transition-colors">{t.title}</h4>
                    <p className="text-[16px] text-slate-400 font-medium mt-0.5">{t.org} • {t.date}</p>
                  </div>
                </div>
                <div className="text-right flex flex-col items-end">
                  <span className="text-[22px] font-bold text-slate-800 mb-1">{t.val}</span>
                  <span className={`text-[14px] font-black uppercaser px-2 py-[2px] rounded-full inline-flex justify-end items-start ${t.tagCol}`}>{t.tag}</span>
                </div>
              </div>
            ))}
            
          </div>
        </div>

        {/* Munasat AI */}
        <div className="bg-[#5d4aae] rounded-[24px] p-8 text-white shadow-sm flex flex-col justify-between relative overflow-hidden">
           <div className="absolute -top-10 -right-10 w-40 h-40 bg-white opacity-5 rounded-full blur-3xl"></div>
           <div>
             <div className="flex items-center space-x-3 mb-6">
               <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
                 <Sparkles className="w-4 h-4 text-white" />
               </div>
               <h3 className="text-[22px] font-black">Munasat AI</h3>
             </div>
             
             <p className="text-[16px] italic font-medium text-indigo-100/90 leading-relaxed mb-6">
               "Based on your recent views, I've identified 2 new infrastructure tenders in Riyadh matching your risk profile."
             </p>

             <div className="space-y-3 mb-8">
               <div className="bg-white/10 border border-white/10 rounded-xl p-3">
                  <p className="text-[9px] font-bold text-indigo-200 uppercasest mb-1">High Match (98%)</p>
                  <p className="text-[16px] font-bold">Riyadh Metro Extension Line 7</p>
               </div>
               <div className="bg-white/10 border border-white/10 rounded-xl p-3">
                  <p className="text-[9px] font-bold text-indigo-200 uppercasest mb-1">Emerging Opp (64%)</p>
                  <p className="text-[16px] font-bold">Solar Farm Maintenance - Red Sea</p>
               </div>
             </div>
           </div>

           <Link href="/ai-assistant" className="w-full bg-white text-[#5d4aae] font-bold text-[16px] py-3 rounded-xl flex justify-center hover:bg-slate-50 transition-colors shadow-sm">
             Open AI Assistant
           </Link>
        </div>

      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Recent Awards */}
        <div className="lg:col-span-2">
           <h3 className="text-[22px] font-bold text-slate-800 mb-6">Recent Awards</h3>
           <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
             
             <div className="bg-white rounded-[20px] p-6 shadow-sm flex flex-col justify-between">
               <div className="flex items-center space-x-3 mb-6">
                 <div className="relative">
                   <div className="w-12 h-12 rounded-full bg-[#185e8a] flex items-center justify-center text-white font-bold text-xl">MB</div>
                   <div className="absolute -top-1 -right-2 w-6 h-6 rounded-full text-yellow-400 bg-white flex items-center justify-center">
                     <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 fill-yellow-400 text-yellow-400"><polygon points="12 2 15.09 3.09 18.18 2 19.27 5.09 22.36 6.18 21.27 9.27 22.36 12.36 19.27 15.45 18.18 18.55 15.09 17.45 12 18.55 8.91 17.45 5.82 18.55 4.73 15.45 1.64 12.36 2.73 9.27 1.64 6.18 4.73 5.09 5.82 2 8.91 3.09"></polygon><polyline points="9 12 11 14 15 10" stroke="#fff" strokeWidth="3"></polyline></svg>
                   </div>
                 </div>
               </div>
               <div>
                 <h4 className="text-[18px] font-bold text-[#1e293b] leading-tight mb-2">Modern Building Co.</h4>
                 <p className="text-[14px] text-slate-400 font-medium mb-6">Awarded: Residential Complex KAFD</p>
               </div>
               <hr className="border-slate-100 mb-4" />
               <div className="flex justify-between items-center text-[12px] font-black uppercase text-slate-400">
                 <span className="text-[#5d4aae] text-[14px]">SAR 890M</span>
                 <span>2 HOURS AGO</span>
               </div>
             </div>

             <div className="bg-white rounded-[20px] p-6 shadow-sm flex flex-col justify-between">
               <div className="flex items-center space-x-3 mb-6">
                 <div className="relative">
                   <div className="w-12 h-12 rounded-full bg-[#111827] flex flex-col items-center justify-center text-white"><span className="text-[16px] font-light">V</span></div>
                   <div className="absolute -top-1 -right-2 w-6 h-6 rounded-full text-yellow-400 bg-white flex items-center justify-center">
                     <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 fill-yellow-400 text-yellow-400"><polygon points="12 2 15.09 3.09 18.18 2 19.27 5.09 22.36 6.18 21.27 9.27 22.36 12.36 19.27 15.45 18.18 18.55 15.09 17.45 12 18.55 8.91 17.45 5.82 18.55 4.73 15.45 1.64 12.36 2.73 9.27 1.64 6.18 4.73 5.09 5.82 2 8.91 3.09"></polygon><polyline points="9 12 11 14 15 10" stroke="#fff" strokeWidth="3"></polyline></svg>
                   </div>
                 </div>
               </div>
               <div>
                 <h4 className="text-[18px] font-bold text-[#1e293b] leading-tight mb-2">Global Logistics SA</h4>
                 <p className="text-[14px] text-slate-400 font-medium mb-6">Awarded: Supply Chain Automation</p>
               </div>
               <hr className="border-slate-100 mb-4" />
               <div className="flex justify-between items-center text-[12px] font-black uppercase text-slate-400">
                 <span className="text-[#5d4aae] text-[14px]">SAR 215M</span>
                 <span>5 HOURS AGO</span>
               </div>
             </div>

           </div>
        </div>

        {/* Saved Searches */}
        <div>
           <div className="bg-white rounded-[20px] p-8 shadow-sm">
             <h3 className="text-[22px] font-bold text-slate-800 mb-8">Saved Searches</h3>
             <div className="space-y-4">
               
               <div className="flex items-center justify-between cursor-pointer group border border-slate-100 rounded-xl px-5 py-3.5 hover:border-[#5d4aae] transition-colors">
                  <div className="flex items-center space-x-3">
                    <History className="w-5 h-5 text-slate-400 group-hover:text-[#5d4aae] transition-colors" />
                    <span className="text-[15px] font-bold text-[#475569]">Health Sector Riyadh</span>
                  </div>
                  <span className="text-[14px] font-bold text-[#5d4aae] bg-indigo-50 px-3 py-1 rounded-full">12 new</span>
               </div>

               <div className="flex items-center justify-between cursor-pointer group border border-slate-100 rounded-xl px-5 py-3.5 hover:border-slate-300 transition-colors">
                  <div className="flex items-center space-x-3">
                    <History className="w-5 h-5 text-slate-400 group-hover:text-slate-600 transition-colors" />
                    <span className="text-[15px] font-bold text-[#475569]">Tech Consultancy</span>
                  </div>
                  <span className="text-[14px] font-bold text-slate-400 bg-slate-50 px-3 py-1 rounded-full border border-slate-100/50">0 new</span>
               </div>
               
             </div>
           </div>
        </div>

      </div>

    </div>
  );
}
