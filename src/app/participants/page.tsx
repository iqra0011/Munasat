'use client';
import useSWR from 'swr';
import { Search, Filter, MoreVertical, Building, Shield, ChevronDown, Percent } from 'lucide-react';
import { useState } from 'react';
import VendorProfileModal from '@/components/VendorProfileModal';

const fetcher = (url: string) => fetch(url).then(res => res.json());

export default function ParticipantsPage() {
  const { data: vendors, isLoading } = useSWR('/api/vendors', fetcher);
  const validVendors = Array.isArray(vendors) ? vendors : [];

  const [searchTerm, setSearchTerm] = useState('');
  const [sectorFilter, setSectorFilter] = useState('All');
  const [winRateFilter, setWinRateFilter] = useState('Any');
  const [lcFilter, setLcFilter] = useState(false);
  const [sortOption, setSortOption] = useState('Total Won');
  const [selectedVendor, setSelectedVendor] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const baseVendors = validVendors.length > 0 ? validVendors : [
    { id: '1', name: 'Elm Company', category: 'Digital Services', totalWon: 4800000000, winRate: 78, totalAwards: 16, localContent: 85, topMinistries: 'Health,Interior,Education', trend: '+12%', icon: 'Building' },
    { id: '2', name: 'STC Solutions', category: 'Telecommunications & IT', totalWon: 3900000000, winRate: 71, totalAwards: 13, localContent: 92, topMinistries: 'Defense,Communications,+2 more', trend: '+8%', icon: 'Shield' },
    { id: '3', name: 'Saudi Information Tech', category: 'Cybersecurity & IT', totalWon: 3200000000, winRate: 68, totalAwards: 11, localContent: 88, topMinistries: 'Education,Finance,Energy', trend: '+15%', icon: 'Shield' },
    { id: '4', name: 'Nesma Infrastructure', category: 'Construction', totalWon: 2600000000, winRate: 64, totalAwards: 9, localContent: 45, topMinistries: 'Transport,Municipalities', trend: '+4%', icon: 'Building' },
    { id: '5', name: 'Modern Building Co.', category: 'Construction', totalWon: 890000000, winRate: 55, totalAwards: 6, localContent: 72, topMinistries: 'Health,KAFD', trend: '+2%', icon: 'Building' },
    { id: '6', name: 'Global Logistics SA', category: 'Logistics', totalWon: 215000000, winRate: 42, totalAwards: 4, localContent: 60, topMinistries: 'Supply Chain,Customs', trend: '+18%', icon: 'Shield' },
  ];

  let displayVendors = [...baseVendors];

  if (searchTerm) {
    displayVendors = displayVendors.filter(v => v.name.toLowerCase().includes(searchTerm.toLowerCase()));
  }
  if (sectorFilter !== 'All') {
    displayVendors = displayVendors.filter(v => v.category.includes(sectorFilter));
  }
  if (winRateFilter !== 'Any') {
    const minWin = parseInt(winRateFilter);
    displayVendors = displayVendors.filter(v => v.winRate >= minWin);
  }
  if (lcFilter) {
    displayVendors = displayVendors.filter(v => v.localContent > 50);
  }

  if (sortOption === 'Total Won') {
    displayVendors.sort((a, b) => b.totalWon - a.totalWon);
  } else if (sortOption === 'Win Rate') {
    displayVendors.sort((a, b) => b.winRate - a.winRate);
  }

  return (
    <div className="p-8 space-y-6 animate-in fade-in duration-500 max-w-full bg-transparent min-h-full">
      
      {/* Header */}
      <div>
        <h1 className="text-[40px] font-black tracking-tight text-slate-800 leading-none mb-1">Participant Intelligence</h1>
        <p className="text-[16px] text-slate-500 font-medium tracking-wide">Analyze vendors, compare competitors, and monitor win rates across government entities.</p>
      </div>

      {/* Control Bar (Deep Purple) */}
      <div className="bg-[#5d4aae] rounded-[20px] p-4 flex flex-col md:flex-row gap-4 items-center justify-between shadow-sm">
        
        {/* Search */}
        <div className="relative w-full md:flex-1">
           <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
           <input 
             type="text" 
             value={searchTerm}
             onChange={(e) => setSearchTerm(e.target.value)}
             placeholder="Search 2,500+ active vendors..." 
             className="w-full bg-white text-[16px] border-none rounded-xl py-3 pl-11 pr-4 focus:outline-none focus:ring-2 focus:ring-indigo-200 text-slate-600 font-medium"
           />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          <div className="relative">
            <select 
              value={sectorFilter}
              onChange={(e) => setSectorFilter(e.target.value)}
              className="appearance-none bg-white hover:bg-slate-50 text-slate-800 px-4 py-3 rounded-xl text-[16px] font-bold flex items-center pr-10 transition-colors border-none cursor-pointer">
              <option value="All">Sector: All</option>
              <option value="Digital">Digital Services</option>
              <option value="IT">IT & Telecom</option>
              <option value="Construction">Construction</option>
            </select>
            <ChevronDown className="w-4 h-4 absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
          </div>

          <div className="relative">
            <select 
              value={winRateFilter}
              onChange={(e) => setWinRateFilter(e.target.value)}
              className="appearance-none bg-white hover:bg-slate-50 text-slate-800 px-4 py-3 rounded-xl text-[16px] font-bold flex items-center pr-10 transition-colors border-none cursor-pointer">
              <option value="Any">Win Rate: Any</option>
              <option value="70">70% +</option>
              <option value="60">60% +</option>
              <option value="50">50% +</option>
            </select>
            <ChevronDown className="w-4 h-4 absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
          </div>

          <button 
            onClick={() => setLcFilter(!lcFilter)}
            className={`${lcFilter ? 'bg-emerald-500 text-white' : 'bg-white text-slate-800'} hover:opacity-90 px-4 py-3 rounded-xl text-[16px] font-bold flex items-center space-x-2 transition-colors`}>
            <span>Local Content &gt; 50%</span>
          </button>

          <div className="relative">
            <select 
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className="appearance-none bg-white hover:bg-slate-50 text-slate-800 px-4 py-3 rounded-xl text-[16px] font-bold flex items-center pr-10 transition-colors border-none cursor-pointer">
              <option value="Total Won">Sort: Total Won</option>
              <option value="Win Rate">Sort: Win Rate</option>
            </select>
            <ChevronDown className="w-4 h-4 absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
          </div>
        </div>

      </div>

      {/* Grid of Vendor Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-2">
        
        {displayVendors.map((vendor: any, idx: number) => {
          
          return (
            <div key={idx} className="bg-white rounded-[24px] border border-slate-100 shadow-sm p-6 flex flex-col hover:border-indigo-100 transition-colors duration-300">
              
              {/* Card Header */}
              <div className="flex justify-between items-start mb-6">
                <div className="flex space-x-3">
                  <div className="w-12 h-12 rounded-xl bg-indigo-50 border border-indigo-100/50 flex items-center justify-center text-[#5d4aae] shrink-0">
                     {vendor.icon === 'Shield' ? <Shield className="w-5 h-5" /> : <Building className="w-5 h-5" />}
                  </div>
                  <div>
                    <h3 className="text-[22px] font-bold text-slate-800 leading-tight">{vendor.name}</h3>
                    <p className="text-[14px] text-slate-400 font-medium tracking-wide mt-1">{vendor.category || 'Technology Solutions'}</p>
                  </div>
                </div>
                <button className="text-slate-300 hover:text-slate-500 transition-colors">
                  <MoreVertical className="w-4 h-4" />
                </button>
              </div>

              {/* Stats Block */}
              <div className="bg-slate-100/70 rounded-[16px] p-5 grid grid-cols-2 gap-y-4 mb-6">
                
                <div>
                  <p className="text-[14px] font-bold text-slate-400 mb-1">Total Won</p>
                  <div className="flex items-end space-x-1">
                    <span className="text-[16px] font-black text-[#5d4aae]">SAR {(vendor.totalWon / 1000000000).toFixed(1)}B</span>
                    <span className="text-[14px] font-bold text-emerald-500 mb-0.5">{vendor.trend || '+5%'}</span>
                  </div>
                </div>

                <div>
                  <p className="text-[14px] font-bold text-slate-400 mb-1">Win Rate</p>
                  <p className="text-[16px] font-black text-slate-800">{vendor.winRate}%</p>
                </div>

                <div>
                  <p className="text-[14px] font-bold text-slate-400 mb-1">Total Awards</p>
                  <p className="text-[16px] font-black text-slate-800">{vendor.totalAwards}</p>
                </div>

                <div>
                  <p className="text-[14px] font-bold text-slate-400 mb-1">Local Content</p>
                  <p className="text-[16px] font-black text-slate-800">{vendor.localContent}%</p>
                </div>

              </div>

              {/* Top Ministries */}
              <div className="mb-8">
                <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-3">Top Ministries</p>
                <div className="flex flex-wrap gap-2">
                  {(vendor.topMinistries || 'Health,Defense,Education').split(',').map((min: string, i: number) => (
                    <span key={i} className="bg-slate-100 text-slate-500 text-[14px] font-bold px-3 py-1.5 rounded-full whitespace-nowrap">
                      {min.trim()}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-1 gap-3 mt-auto">
                <button 
                  onClick={() => {
                    setSelectedVendor(vendor);
                    setIsModalOpen(true);
                  }}
                  className="bg-[#5d4aae] hover:bg-indigo-700 text-white text-[16px] font-bold py-3 rounded-xl transition-colors shadow-sm"
                >
                  View Full Vendor Profile
                </button>
              </div>

            </div>
          );
        })}
        
      </div>

      <VendorProfileModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        vendor={selectedVendor} 
      />
    </div>
  );
}
