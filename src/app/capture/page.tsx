'use client';
import { Building2, ChevronDown } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function CapturePage() {
  const [statusFilter, setStatusFilter] = useState('All');
  const [ministryFilter, setMinistryFilter] = useState('All Ministries');
  const [pursuits, setPursuits] = useState<any[]>([]);

  const basePipelineItems = [
    { id: 1, badge: 'IDENTIFIED', badgeColor: 'bg-indigo-400', company: 'Elm Company', title: 'Digital Smart City Infrastructure Feasibility Study', time: '5 HOURS AGO', amount: 'SAR 215M', ministry: 'Ministry of Interior' },
    { id: 2, badge: 'QUALIFIED', badgeColor: 'bg-rose-400', company: 'STC Solutions', title: 'National Fiber Grid Expansion Phase 2', time: '8 HOURS AGO', amount: 'SAR 412M', ministry: 'Ministry of Communications' },
    { id: 3, badge: 'BID', badgeColor: 'bg-fuchsia-400', company: 'Saudi TechSystems', title: 'AI-Powered Traffic Monitoring Pilot', time: '1 DAY AGO', amount: 'SAR 85M', ministry: 'Ministry of Transport' },
    { id: 4, badge: 'SUBMITTED', badgeColor: 'bg-indigo-500', company: 'Global IT Corp', title: 'Cloud Infrastructure Migration for Health Records', time: '2 DAYS AGO', amount: 'SAR 1.2B', ministry: 'Ministry of Health' },
    { id: 5, badge: 'AWARDED', badgeColor: 'bg-amber-500', company: 'Elm Company', title: 'Smart Border Control System Implementation', time: '3 DAYS AGO', amount: 'SAR 890M', ministry: 'Ministry of Interior' },
    { id: 6, badge: 'LOST', badgeColor: 'bg-red-500', company: 'DataCore Solutions', title: 'National Data Warehouse Platform', time: '1 WEEK AGO', amount: 'SAR 2.5B', ministry: 'Ministry of Finance' },
  ];

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('munasat_pipeline') || '[]');
    setPursuits(saved);
  }, []);

  let displayItems = [...pursuits, ...basePipelineItems];

  if (statusFilter !== 'All') {
    displayItems = displayItems.filter(item => item.badge === statusFilter);
  }
  if (ministryFilter !== 'All Ministries') {
    displayItems = displayItems.filter(item => item.ministry === ministryFilter);
  }

  return (
    <div className="p-8 space-y-6 animate-in fade-in duration-500 max-w-full bg-transparent min-h-full">

      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center w-full mb-8">
        <div>
          <h1 className="text-[40px] font-black tracking-tight text-slate-800 leading-none mb-1">Capture Pipeline</h1>
          <p className="text-[16px] text-slate-500 font-medium tracking-wide">Macro-level insights into Saudi government procurement trends.</p>
        </div>

        {/* Right Nav Filters */}
        <div className="flex items-center space-x-3 mt-4 md:mt-0">
          <div className="relative">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="appearance-none bg-[#5d4aae] text-white px-5 py-2.5 rounded-full text-[16px] font-bold pr-10 shadow-sm cursor-pointer border-none focus:ring-0">
              <option value="All">All Stages</option>
              <option value="IDENTIFIED">Identified</option>
              <option value="QUALIFIED">Qualified</option>
              <option value="BID">Bid</option>
              <option value="SUBMITTED">Submitted</option>
              <option value="AWARDED">Awarded</option>
              <option value="LOST">Lost</option>
            </select>
            <ChevronDown className="w-4 h-4 text-indigo-200 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          <div className="relative">
            <select
              value={ministryFilter}
              onChange={(e) => setMinistryFilter(e.target.value)}
              className="appearance-none bg-[#5d4aae] text-white px-5 py-2.5 rounded-full text-[16px] font-bold pl-11 pr-10 shadow-sm cursor-pointer border-none focus:ring-0">
              <option value="All Ministries">All Ministries</option>
              <option value="Ministry of Interior">Ministry of Interior</option>
              <option value="Ministry of Communications">Ministry of Communications</option>
              <option value="Ministry of Transport">Ministry of Transport</option>
              <option value="Ministry of Health">Ministry of Health</option>
            </select>
            <Building2 className="w-4 h-4 text-indigo-200 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
            <ChevronDown className="w-4 h-4 text-indigo-200 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Grid List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">

        {displayItems.map((item: any) => (
          <div key={item.id} className="bg-white rounded-[24px] p-6 shadow-sm border border-slate-100 flex flex-col hover:shadow-md transition-shadow cursor-pointer">

            {/* Badge Row */}
            <div className="mb-4">
              <span className={`${item.badgeColor} text-white text-[9px] font-black tracking-widest uppercase px-3 py-1.5 rounded-full`}>
                {item.badge}
              </span>
            </div>

            {/* Main Content */}
            <div className="flex items-start space-x-4 mb-6">
              <div className="w-12 h-12 rounded-xl bg-indigo-50 border border-indigo-100/50 flex items-center justify-center shrink-0">
                <Building2 className="w-5 h-5 text-[#5d4aae] opacity-80" />
              </div>
              <div>
                <h3 className="text-[22px] font-bold text-slate-800 leading-tight mb-1">{item.company}</h3>
                <p className="text-[16px] text-slate-400 font-medium leading-relaxed">{item.title}</p>
              </div>
            </div>

            {/* Footer Info */}
            <div className="flex justify-between items-center mt-auto">
              <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">{item.time}</span>
              <span className="text-[14px] font-black text-[#5d4aae] uppercase tracking-wider">{item.amount}</span>
            </div>

          </div>
        ))}

      </div>
    </div>
  );
}
