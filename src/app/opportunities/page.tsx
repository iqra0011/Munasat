'use client';
import useSWR from 'swr';
import { Calendar, Search, Filter, Shield, Activity, Clock, ChevronDown, ChevronLeft, ChevronRight, Building2, X, Sparkles, MapPin, DollarSign, FileText, Download } from 'lucide-react';
import { useState, useEffect } from 'react';

const fetcher = (url: string) => fetch(url).then(res => res.json());

export default function OpportunitiesPage() {
  const { data: tenders, isLoading } = useSWR('/api/tenders', fetcher);
  const validTenders = Array.isArray(tenders) ? tenders : [];

  // Generate mock tenders if DB is empty
  const baseTenders = validTenders.length > 0 ? validTenders : [
     { id: 'KSA-2025-MOH-001', title: 'National Digital Health Infrastructure Upgrade', ministry: 'Ministry of Health', budget: 150000000, deadline: '2025-04-16', status: 'Closing Soon', region: 'Riyadh', description: 'Comprehensive upgrade of the digital health infrastructure across 50 major hospitals in the Kingdom, including cloud migration, cybersecurity enhancements, and interoperability layer implementation.' },
     { id: 'KSA-2025-MOD-042', title: 'Maintenance and Operations of Base Facilities', ministry: 'Ministry of Defense', budget: 120500000, deadline: '2025-05-20', status: 'Open', region: 'Jeddah', description: 'Annual contract for the complete maintenance and facilities management of primary regional command centers.' },
     { id: 'KSA-2025-MOE-112', title: 'IT Infrastructure Upgrade for Public Schools', ministry: 'Ministry of Education', budget: 18200000, deadline: '2025-06-15', status: 'Open', region: 'Eastern Province', description: 'Supply and implementation of secure edge computing and fiber connectivity for 120 public schools in the Eastern region.' },
     { id: 'KSA-2025-MOM-088', title: 'Smart City Traffic Management System', ministry: 'Ministry of Municipalities', budget: 85000000, deadline: '2025-04-22', status: 'Closing Soon', region: 'Dammam', description: 'Deployment of AI-driven traffic monitoring and optimization systems for the central metropolitan area of Dammam.' },
     { id: 'KSA-2025-MCIT-009', title: 'Strategic Consulting Services for Digital Trans.', ministry: 'Min. of Comm. and IT', budget: 12450000, deadline: '2025-07-01', status: 'Open', region: 'Riyadh', description: 'Consultancy services to develop the 5-year roadmap for 6G adoption and cross-border data sovereignty frameworks.' },
  ];

  const [searchTerm, setSearchTerm] = useState('');
  const [ministryFilter, setMinistryFilter] = useState('All Ministry');
  const [budgetFilter, setBudgetFilter] = useState('All Range');
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  
  const [selectedTender, setSelectedTender] = useState<any>(null);
  const [isPursuitModalOpen, setIsPursuitModalOpen] = useState(false);
  const [aiSummary, setAiSummary] = useState<string | null>(null);
  const [isAiLoading, setIsAiLoading] = useState(false);

  const uniqueMinistries = ['All Ministry', ...Array.from(new Set(baseTenders.map((t: any) => t.ministry))) as string[]];

  let displayTenders = [...baseTenders];

  if (searchTerm) {
    const q = searchTerm.toLowerCase();
    displayTenders = displayTenders.filter((t: any) => 
      t.title.toLowerCase().includes(q) || 
      t.id.toLowerCase().includes(q) || 
      t.ministry.toLowerCase().includes(q)
    );
  }
  if (ministryFilter !== 'All Ministry') {
    displayTenders = displayTenders.filter((t: any) => t.ministry === ministryFilter);
  }
  if (budgetFilter !== 'All Range') {
    if (budgetFilter === '< 50M') displayTenders = displayTenders.filter((t: any) => t.budget < 50000000);
    if (budgetFilter === '50M - 100M') displayTenders = displayTenders.filter((t: any) => t.budget >= 50000000 && t.budget <= 100000000);
    if (budgetFilter === '> 100M') displayTenders = displayTenders.filter((t: any) => t.budget > 100000000);
  }
  if (statusFilter) {
    displayTenders = displayTenders.filter((t: any) => t.status.toLowerCase() === statusFilter.toLowerCase());
  }

  const generateAiSummary = () => {
    setIsAiLoading(true);
    setAiSummary(null);
    setTimeout(() => {
      setAiSummary(`The "${selectedTender?.title}" is a high-priority procurement by the ${selectedTender?.ministry} with a budget of SAR ${(selectedTender?.budget / 1000000).toFixed(1)}M. It focuses on large-scale infrastructure and modern technical implementation. Key success factors include proven capability in ${selectedTender?.region} and deep expertise in digital transformation.`);
      setIsAiLoading(false);
    }, 1500);
  };

  return (
    <div className="p-8 space-y-8 animate-in fade-in duration-500 max-w-full bg-transparent min-h-full">
      
      {/* Header */}
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-[40px] font-black tracking-tight text-slate-800 leading-none mb-1">Live Opportunities</h1>
          <p className="text-[16px] text-slate-400 font-medium">Discover and track active government opportunities.</p>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="rounded-[12px] p-6 text-white shadow-sm flex flex-col justify-center relative overflow-hidden min-h-[117px] border border-white" style={{ background: 'linear-gradient(182.95deg, #6C5EB5 1.99%, #554899 102.81%)' }}>
           <div className="flex items-center space-x-3 mb-2 relative z-10">
             <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center border border-white/10">
               <Calendar className="w-4 h-4 text-indigo-100" />
             </div>
             <span className="text-[16px] font-bold text-indigo-200">Closing This Week</span>
           </div>
           <p className="text-[32px] font-black tracking-tight relative z-10">12 Tenders</p>
        </div>

        <div className="rounded-[12px] p-6 text-white shadow-sm flex flex-col justify-center relative overflow-hidden min-h-[117px] border border-white" style={{ background: 'linear-gradient(358.15deg, #EC608D -3.96%, #FC87AB 123.53%)' }}>
           <div className="flex items-center space-x-3 mb-2 relative z-10">
             <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center border border-white/10">
               <Activity className="w-4 h-4 text-pink-100" />
             </div>
             <span className="text-[16px] font-bold text-pink-100">Avg. Budget</span>
           </div>
           <p className="text-[32px] font-black tracking-tight relative z-10">SAR 220M</p>
        </div>

        <div className="rounded-[12px] p-6 text-white shadow-sm flex flex-col justify-center relative overflow-hidden min-h-[117px] border border-white" style={{ background: 'linear-gradient(182.95deg, #6C5EB5 1.99%, #554899 102.81%)' }}>
           <div className="flex items-center space-x-3 mb-2 relative z-10">
             <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center border border-white/10">
               <Clock className="w-4 h-4 text-indigo-100" />
             </div>
             <span className="text-[16px] font-bold text-indigo-200">High Competition</span>
           </div>
           <p className="text-[32px] font-black tracking-tight relative z-10">8 Tenders</p>
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-[24px] border border-slate-100 shadow-sm overflow-hidden flex flex-col">
        <div className="p-6 pb-0 flex flex-col md:flex-row justify-between w-full space-y-4 md:space-y-0">
          <div className="relative w-full md:w-[400px]">
             <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
             <input 
               type="text" 
               value={searchTerm}
               onChange={(e) => setSearchTerm(e.target.value)}
               placeholder="Search by title, ID or ministry..." 
               className="w-full bg-slate-50 text-[16px] border-none rounded-full py-2.5 pl-11 pr-4 focus:outline-none focus:ring-2 focus:ring-indigo-100 text-slate-600 font-medium"
             />
          </div>
          <button onClick={() => setIsFilterOpen(!isFilterOpen)} className="bg-[#5d4aae] text-white px-5 py-2 rounded-full text-[16px] font-bold flex items-center space-x-2 shrink-0 transition-transform hover:bg-[#7163BA]">
             <Filter className="w-4 h-4" />
             <span>Filter</span>
             <ChevronDown className={`w-4 h-4 transition-transform ${isFilterOpen ? 'rotate-180' : ''}`} />
          </button>
        </div>

        {isFilterOpen && (
          <div className="p-6 flex flex-wrap items-end gap-6 border-b border-slate-100 w-full justify-between bg-slate-50/50">
             <div className="flex gap-6 flex-wrap">
               <div>
                 <label className="block text-[14px] font-bold text-slate-400 mb-2 uppercase tracking-wider">Ministry</label>
                  <div className="relative w-48">
                   <select 
                     value={ministryFilter}
                     onChange={(e) => setMinistryFilter(e.target.value)}
                     className="w-full appearance-none bg-white border border-slate-200 text-sm py-2 pl-3 pr-8 rounded-lg text-slate-600 focus:outline-none focus:border-indigo-400 shadow-sm">
                     {uniqueMinistries.map(m => <option key={m} value={m}>{m}</option>)}
                   </select>
                   <ChevronDown className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                 </div>
               </div>
               <div>
                 <label className="block text-[14px] font-bold text-slate-400 mb-2 uppercase tracking-wider">Budget Range</label>
                 <div className="relative w-48">
                   <select 
                     value={budgetFilter}
                     onChange={(e) => setBudgetFilter(e.target.value)}
                     className="w-full appearance-none bg-white border border-slate-200 text-sm py-2 pl-3 pr-8 rounded-lg text-slate-600 focus:outline-none focus:border-indigo-400 shadow-sm">
                     <option value="All Range">All Range</option>
                     <option value="< 50M">&lt; 50M</option>
                     <option value="50M - 100M">50M - 100M</option>
                     <option value="> 100M">&gt; 100M</option>
                   </select>
                   <ChevronDown className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                 </div>
               </div>
               <div>
                 <label className="block text-[14px] font-bold text-slate-400 mb-2 uppercase tracking-wider">Status</label>
                 <div className="flex space-x-2">
                   {['Closing Soon', 'Open', 'Close'].map(s => (
                     <button key={s} onClick={() => setStatusFilter(statusFilter === s ? null : s)} className={`px-4 py-1.5 rounded-full text-[14px] font-black tracking-wider uppercase border transition-colors shadow-sm ${statusFilter === s ? 'bg-[#5d4aae] text-white border-[#5d4aae]' : 'bg-white text-slate-400 border-slate-200'}`}>
                       {s}
                     </button>
                   ))}
                 </div>
               </div>
             </div>
             <button onClick={() => setIsFilterOpen(false)} className="bg-slate-800 text-white px-8 py-2.5 rounded-full text-[16px] font-bold hover:bg-slate-700 transition-colors">Apply Filter</button>
          </div>
        )}

        <div className="overflow-x-auto w-full">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-slate-100 uppercase tracking-widest text-slate-400 font-bold text-[14px]">
                <th className="px-8 py-5 whitespace-nowrap">Tender Details</th>
                <th className="px-6 py-5 whitespace-nowrap">Ministry / Entity</th>
                <th className="px-6 py-5 whitespace-nowrap">Budget (SAR)</th>
                <th className="px-6 py-5 whitespace-nowrap">Deadline</th>
                <th className="px-8 py-5 whitespace-nowrap">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {displayTenders.map((tender: any) => (
                <tr key={tender.id} onClick={() => { setSelectedTender(tender); setAiSummary(null); }} className="hover:bg-slate-50/50 transition-colors group cursor-pointer">
                  <td className="px-8 py-5">
                    <div className="flex flex-col">
                      <span className="text-[16px] font-bold text-slate-800 group-hover:text-[#5d4aae] transition-colors">{tender.title}</span>
                      <span className="text-[14px] text-slate-400 tracking-wide mt-1">Ref: {tender.id} | GOV</span>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex items-center space-x-3">
                       <div className="w-8 h-8 rounded-full border border-slate-100 flex items-center justify-center bg-slate-50 shrink-0">
                         <Building2 className="w-4 h-4 text-indigo-500" />
                       </div>
                       <span className="text-[16px] font-bold text-slate-800">{tender.ministry}</span>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <span className="text-[16px] font-black text-[#5d4aae]">SAR {(tender.budget / 1000000).toFixed(1)}M</span>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex flex-col">
                      <div className="flex items-center space-x-1.5 font-bold text-slate-800">
                        <Clock className={`w-3.5 h-3.5 ${tender.status === 'Closing Soon' ? 'text-orange-500' : 'text-emerald-500'}`} />
                        <span>{tender.deadline}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-5">
                     <span className={`px-3 py-1.5 rounded-full text-[14px] font-black uppercase tracking-wider border ${tender.status === 'Closing Soon' ? 'bg-orange-50 text-orange-600 border-orange-100' : 'bg-emerald-50 text-emerald-600 border-emerald-100'}`}>
                       {tender.status}
                     </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Tender Modal */}
      {selectedTender && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-white rounded-[32px] shadow-2xl w-full max-w-4xl overflow-hidden animate-in zoom-in-95 duration-300">
            {/* Modal Header */}
            <div className="p-8 pb-4 flex justify-between items-start">
               <div>
                  <p className="text-slate-400 text-[14px] font-bold tracking-widest mb-2 uppercase">{selectedTender.id}</p>
                  <h2 className="text-[32px] font-black text-slate-800 leading-tight mb-2">{selectedTender.title}</h2>
                  <p className="text-slate-400 font-medium text-[16px] rtl:text-right">تحديث البنية التحتية الوطنية للصحة الرقمية</p>
               </div>
               <button onClick={() => setSelectedTender(null)} className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-slate-100 hover:text-slate-800 transition-all">
                  <X className="w-6 h-6" />
               </button>
            </div>

            {/* Modal Grid Section */}
            <div className="px-8 py-6 grid grid-cols-2 md:grid-cols-4 gap-4">
               <div className="bg-[#6C5EB5] rounded-[16px] p-4 text-white">
                  <div className="flex items-center space-x-2 opacity-80 mb-1">
                     <Building2 className="w-4 h-4" />
                     <span className="text-[12px] font-bold uppercase tracking-wider">Ministry</span>
                  </div>
                  <p className="text-[16px] font-bold">{selectedTender.ministry}</p>
               </div>
               <div className="bg-slate-50 rounded-[16px] p-4 border border-slate-100">
                  <div className="flex items-center space-x-2 text-slate-400 mb-1">
                     <MapPin className="w-4 h-4" />
                     <span className="text-[12px] font-bold uppercase tracking-wider">Region</span>
                  </div>
                  <p className="text-[16px] font-bold text-slate-800">{selectedTender.region}</p>
               </div>
               <div className="bg-slate-50 rounded-[16px] p-4 border border-slate-100">
                  <div className="flex items-center space-x-2 text-slate-400 mb-1">
                     <DollarSign className="w-4 h-4" />
                     <span className="text-[12px] font-bold uppercase tracking-wider">Budget</span>
                  </div>
                  <p className="text-[16px] font-bold text-[#5d4aae]">SAR {(selectedTender.budget / 1000000).toFixed(0)}M</p>
               </div>
               <div className="bg-slate-50 rounded-[16px] p-4 border border-slate-100">
                  <div className="flex items-center space-x-2 text-slate-400 mb-1">
                     <Calendar className="w-4 h-4" />
                     <span className="text-[12px] font-bold uppercase tracking-wider">Deadline</span>
                  </div>
                  <p className="text-[16px] font-bold text-slate-800">{selectedTender.deadline}</p>
               </div>
            </div>

            {/* Actions Section */}
            <div className="px-8 py-4 flex flex-col md:flex-row space-y-3 md:space-y-0 md:space-x-4 border-b border-slate-100">
               <button 
                onClick={() => setIsPursuitModalOpen(true)}
                className="flex-1 bg-[#6C5EB5] hover:bg-[#554899] text-white py-4 rounded-[16px] font-bold text-[18px] flex items-center justify-center space-x-2 transition-all shadow-lg shadow-indigo-100">
                  <span>+ Add to Pipeline</span>
               </button>
               <button 
                onClick={generateAiSummary}
                disabled={isAiLoading}
                className="flex-1 bg-white border border-slate-200 hover:border-[#6C5EB5] hover:text-[#6C5EB5] text-slate-600 py-4 rounded-[16px] font-bold text-[18px] flex items-center justify-center space-x-2 transition-all">
                  <Sparkles className={`w-5 h-5 ${isAiLoading ? 'animate-spin' : ''}`} />
                  <span>{isAiLoading ? 'Analyzing...' : 'AI Summary'}</span>
               </button>
            </div>

            {/* Content Section */}
            <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8 max-h-[400px] overflow-y-auto">
               <div>
                  <h3 className="text-[20px] font-bold text-slate-800 mb-4">Description</h3>
                  <p className="text-slate-500 text-[16px] leading-relaxed mb-6">
                    {selectedTender.description}
                  </p>
                  
                  {aiSummary && (
                    <div className="bg-indigo-50/50 rounded-[24px] p-6 border border-indigo-100 animate-in slide-in-from-bottom-4 duration-500">
                       <div className="flex items-center space-x-2 text-[#6C5EB5] mb-3">
                          <Bot className="w-5 h-5" />
                          <span className="font-black text-[14px] uppercase tracking-widest">AI Intelligence</span>
                       </div>
                       <p className="text-slate-700 text-[16px] leading-relaxed italic font-medium">"{aiSummary}"</p>
                    </div>
                  )}

                  <h4 className="text-[18px] font-bold text-slate-800 mt-8 mb-4">Scope of Work</h4>
                  <ul className="space-y-3">
                    {['Cloud Migration of core HIS', 'Implementation of Zero Trust Architecture', 'Integration with Sehaty platform', '24/7 SOC establishment'].map((item, i) => (
                      <li key={i} className="flex items-start space-x-3 text-slate-500 font-medium">
                        <span className="text-[#6C5EB5] font-black">{i+1}.</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
               </div>

               <div className="space-y-6">
                  <div>
                    <h3 className="text-[20px] font-bold text-slate-800 mb-4">Requirements</h3>
                    <div className="space-y-4">
                       <div className="flex justify-between items-center pb-2 border-b border-slate-50">
                          <span className="text-slate-400 font-bold text-[14px]">Eligibility</span>
                          <span className="text-slate-800 font-bold">Class A IT Contractors</span>
                       </div>
                       <div className="flex justify-between items-center pb-2 border-b border-slate-50">
                          <span className="text-slate-400 font-bold text-[14px]">Set-Aside</span>
                          <span className="text-slate-800 font-bold">Local Content Required (40%)</span>
                       </div>
                       <div className="flex justify-between items-center pb-2 border-b border-slate-50">
                          <span className="text-slate-400 font-bold text-[14px]">Category</span>
                          <span className="text-slate-800 font-bold">IT Services (J62)</span>
                       </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-[20px] font-bold text-slate-800 mb-4">Attachments</h3>
                    <div className="space-y-3">
                       {[
                         { name: 'RFP_Main_Doc.pdf', type: 'pdf' },
                         { name: 'Technical_Specs_v2.pdf', type: 'pdf' },
                         { name: 'Pricing_Matrix.xlsx', type: 'excel' }
                       ].map((doc, i) => (
                         <div key={i} className="flex items-center justify-between p-3 bg-slate-50 rounded-[12px] border border-slate-100 hover:border-indigo-200 transition-all cursor-pointer group">
                            <div className="flex items-center space-x-3">
                               <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center text-slate-400 group-hover:text-[#6C5EB5] transition-colors shadow-sm">
                                  {doc.type === 'pdf' ? <FileText className="w-4 h-4" /> : <Shield className="w-4 h-4" />}
                               </div>
                               <span className="text-slate-700 font-bold text-[14px]">{doc.name}</span>
                            </div>
                            <Download className="w-4 h-4 text-slate-300 group-hover:text-slate-600" />
                         </div>
                       ))}
                    </div>
                  </div>
               </div>
            </div>

          </div>
        </div>
      )}
      {/* pursuit Modal */}
      {isPursuitModalOpen && selectedTender && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-white rounded-[32px] shadow-2xl w-full max-w-2xl overflow-hidden animate-in zoom-in-95 duration-300">
             {/* Header */}
             <div className="p-8 pb-4 flex justify-between items-start border-b border-slate-100">
                <div>
                   <h2 className="text-[28px] font-black text-slate-800 leading-tight">Create New Pursuit</h2>
                   <p className="text-slate-400 font-medium text-[16px]">Add this opportunity to your capture pipeline</p>
                </div>
                <button onClick={() => setIsPursuitModalOpen(false)} className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-slate-100 transition-all">
                   <X className="w-6 h-6" />
                </button>
             </div>

             {/* Form Body */}
             <div className="p-8 space-y-6">
                <div className="space-y-2">
                   <label className="text-[14px] font-bold text-slate-600 flex items-center">
                     Project Title <span className="text-red-500 ml-1 mt-1">*</span>
                   </label>
                   <input 
                    type="text" 
                    readOnly 
                    value={selectedTender.title}
                    className="w-full bg-slate-50 border border-slate-100 p-4 rounded-[12px] text-slate-400 font-medium focus:outline-none" 
                   />
                </div>

                <div className="space-y-2">
                   <label className="text-[14px] font-bold text-slate-600 flex items-center">
                     Ministry/Agency <span className="text-red-500 ml-1 mt-1">*</span>
                   </label>
                   <input 
                    type="text" 
                    readOnly 
                    value={selectedTender.ministry}
                    className="w-full bg-slate-50 border border-slate-100 p-4 rounded-[12px] text-slate-400 font-medium focus:outline-none" 
                   />
                </div>

                <div className="grid grid-cols-2 gap-4">
                   <div className="space-y-2">
                      <label className="text-[14px] font-bold text-slate-600">Estimated Value (SAR)</label>
                      <input 
                        type="text" 
                        readOnly 
                        value={selectedTender.budget.toLocaleString()}
                        className="w-full bg-slate-50 border border-slate-100 p-4 rounded-[12px] text-slate-400 font-medium focus:outline-none" 
                      />
                   </div>
                   <div className="space-y-2">
                      <label className="text-[14px] font-bold text-slate-600">Probability (%)</label>
                      <div className="relative">
                        <select className="w-full bg-white border border-slate-200 p-4 rounded-[12px] text-slate-600 font-medium appearance-none focus:outline-none focus:ring-2 focus:ring-indigo-100">
                          <option>50%</option>
                          <option>70%</option>
                          <option>90%</option>
                        </select>
                        <ChevronDown className="w-5 h-5 absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                      </div>
                   </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                   <div className="space-y-2">
                      <label className="text-[14px] font-bold text-slate-600">Due Date</label>
                      <div className="relative">
                        <input 
                          type="text" 
                          readOnly 
                          value={selectedTender.deadline}
                          className="w-full bg-slate-50 border border-slate-100 p-4 rounded-[12px] text-slate-400 font-medium focus:outline-none" 
                        />
                        <Calendar className="w-5 h-5 absolute right-4 top-1/2 -translate-y-1/2 text-slate-200" />
                      </div>
                   </div>
                   <div className="space-y-2">
                      <label className="text-[14px] font-bold text-slate-600">Initial Status</label>
                      <div className="relative">
                        <select className="w-full bg-white border border-slate-200 p-4 rounded-[12px] text-slate-600 font-medium appearance-none focus:outline-none focus:ring-2 focus:ring-indigo-100">
                          <option>Identified</option>
                          <option>Qualified</option>
                          <option>Proposal</option>
                        </select>
                        <ChevronDown className="w-5 h-5 absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                      </div>
                   </div>
                </div>
             </div>

             {/* Footer Actions */}
             <div className="p-8 pt-0 flex space-x-4">
                <button onClick={() => setIsPursuitModalOpen(false)} className="flex-1 bg-white border border-slate-200 hover:bg-slate-50 text-slate-600 py-4 rounded-[16px] font-bold text-[18px] transition-all">
                   Cancel
                </button>
                <button 
                  onClick={() => {
                    const newPursuit = {
                      id: Date.now(),
                      badge: 'IDENTIFIED',
                      badgeColor: 'bg-[#6C5EB5]',
                      company: 'Munasat User',
                      title: selectedTender.title,
                      time: 'JUST NOW',
                      amount: `SAR ${(selectedTender.budget / 1000000).toFixed(0)}M`,
                      ministry: selectedTender.ministry
                    };
                    const existing = JSON.parse(localStorage.getItem('munasat_pipeline') || '[]');
                    localStorage.setItem('munasat_pipeline', JSON.stringify([newPursuit, ...existing]));
                    setIsPursuitModalOpen(false);
                    setSelectedTender(null);
                    alert('Pursuit Created Successfully! Check the Capture page.');
                  }}
                  className="flex-1 bg-[#6C5EB5] hover:bg-[#554899] text-white py-4 rounded-[16px] font-bold text-[18px] transition-all shadow-lg shadow-indigo-100">
                   Create Pursuit
                </button>
             </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Simple internal Bot icon placeholder since lucide-react 'Bot' was missing from initial check
function Bot({ className }: { className?: string }) {
  return (
    <svg 
      className={className} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2.5" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      <path d="M12 8V4H8" />
      <rect width="16" height="12" x="4" y="8" rx="2" />
      <path d="M2 14h2" />
      <path d="M20 14h2" />
      <path d="M15 13v2" />
      <path d="M9 13v2" />
    </svg>
  );
}
