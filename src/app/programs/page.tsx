'use client';
import useSWR from 'swr';
import { Upload, LayoutGrid, List, Search, MapPin, TrendingUp, BarChart2 } from 'lucide-react';
import { useState } from 'react';
import ProgramDetailModal from '@/components/ProgramDetailModal';

const fetcher = (url: string) => fetch(url).then(res => res.json());

export default function ProgramsPage() {
  const { data: projects, isLoading } = useSWR('/api/projects', fetcher);
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchTerm, setSearchTerm] = useState('');

  const openProject = (p: any) => {
    setSelectedProject(p);
    setIsModalOpen(true);
  };
  
  const displayProjects = [
    {
       id: '1', title: 'NEOM', location: 'Tabuk Province', tag: 'Giga-Project',
       image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1000&auto=format&fit=crop',
       budget: 'SAR 1.9T', spent: 'SAR 350B', active: '145', progress: 18
    },
    {
       id: '2', title: 'Red Sea Global', location: 'Red Sea Coast', tag: 'Giga-Project',
       image: 'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?q=80&w=1000&auto=format&fit=crop',
       budget: 'SAR 120B', spent: 'SAR 45B', active: '54', progress: 38
    },
    {
       id: '3', title: 'Qiddiya', location: 'Riyadh Province', tag: 'Giga-Project',
       image: 'https://images.unsplash.com/photo-1513889961551-628c1e5e2ee9?q=80&w=1000&auto=format&fit=crop',
       budget: 'SAR 150B', spent: 'SAR 30B', active: '32', progress: 20
    },
    {
       id: '4', title: 'Diriyah Gate', location: 'Riyadh Province', tag: 'Giga-Project',
       image: 'https://images.unsplash.com/photo-1548013146-72479768bada?q=80&w=1000&auto=format&fit=crop',
       budget: 'SAR 240B', spent: 'SAR 85B', active: '89', progress: 35
    }
  ];

  const filteredProjects = displayProjects.filter(p => 
    p.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-8 space-y-8 animate-in fade-in duration-500 max-w-full bg-transparent min-h-full">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center w-full mb-6">
        <div>
          <h1 className="text-[40px] font-black tracking-tight text-slate-800 leading-none mb-1">Vision 2030 Programs</h1>
          <p className="text-[16px] text-slate-500 font-medium tracking-wide">Track spending and opportunities across national giga-projects.</p>
        </div>
        
        <div className="flex items-center space-x-4 mt-6 md:mt-0">
           <div className="relative">
             <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
             <input 
               type="text"
               value={searchTerm}
               onChange={(e) => setSearchTerm(e.target.value)}
               placeholder="Search programs..."
               className="bg-white border border-slate-100 rounded-full py-2.5 pl-11 pr-4 text-[14px] font-medium focus:ring-2 focus:ring-indigo-100 outline-none w-64 shadow-sm"
             />
           </div>
           <div className="bg-white p-1 rounded-xl border border-slate-100 shadow-sm flex space-x-1">
              <button 
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg transition-all ${viewMode === 'grid' ? 'bg-[#5d4aae] text-white shadow-md' : 'text-slate-400 hover:text-slate-600'}`}>
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button 
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg transition-all ${viewMode === 'list' ? 'bg-[#5d4aae] text-white shadow-md' : 'text-slate-400 hover:text-slate-600'}`}>
                <List className="w-4 h-4" />
              </button>
           </div>
           <button className="bg-[#5d4aae] hover:bg-indigo-700 text-white px-6 py-2.5 rounded-full text-[16px] font-bold flex items-center space-x-2 transition-colors shadow-sm">
             <Upload className="w-4 h-4" />
             <span>Upload Report</span>
           </button>
        </div>
      </div>

      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <div 
              key={project.id} 
              onClick={() => openProject(project)}
              className="bg-white rounded-[28px] overflow-hidden shadow-sm border border-slate-100 flex flex-col hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group cursor-pointer"
            >
               <div className="h-44 w-full relative overflow-hidden bg-slate-100">
                  <img src={project.image} alt={project.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute top-4 left-4">
                     <span className="bg-white/90 backdrop-blur-md text-[#5d4aae] text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full shadow-sm">
                        {project.tag}
                     </span>
                  </div>
               </div>

               <div className="p-6 flex flex-col flex-1">
                  <div className="flex justify-between items-start mb-6">
                     <div>
                       <h2 className="text-[20px] font-black text-slate-800 leading-tight">{project.title}</h2>
                       <div className="flex items-center text-slate-400 mt-1">
                          <MapPin className="w-3 h-3 mr-1" />
                          <span className="text-[13px] font-bold">{project.location}</span>
                       </div>
                     </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-6">
                     <div className="bg-slate-50 p-3 rounded-2xl">
                        <span className="text-[10px] font-black text-slate-400 uppercase block mb-1">Budget</span>
                        <span className="text-[14px] font-black text-slate-700">{project.budget}</span>
                     </div>
                     <div className="bg-slate-50 p-3 rounded-2xl">
                        <span className="text-[10px] font-black text-slate-400 uppercase block mb-1">Spent</span>
                        <span className="text-[14px] font-black text-emerald-600">{project.spent}</span>
                     </div>
                  </div>

                  <div className="mt-auto pt-4 border-t border-slate-50">
                     <div className="flex justify-between items-center mb-2">
                        <span className="text-[11px] font-black text-slate-400 uppercase tracking-widest">Progress</span>
                        <span className="text-[13px] font-black text-[#5d4aae]">{project.progress}%</span>
                     </div>
                     <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                        <div className="bg-[#5d4aae] h-full rounded-full" style={{ width: `${project.progress}%` }} />
                     </div>
                  </div>
               </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-[32px] border border-slate-100 shadow-sm overflow-hidden">
           <table className="w-full text-left">
              <thead>
                 <tr className="bg-slate-50/50 border-b border-slate-100">
                    <th className="px-8 py-5 text-[12px] font-black text-slate-400 uppercase tracking-widest">Program</th>
                    <th className="px-6 py-5 text-[12px] font-black text-slate-400 uppercase tracking-widest">Location</th>
                    <th className="px-6 py-5 text-[12px] font-black text-slate-400 uppercase tracking-widest">Budget</th>
                    <th className="px-6 py-5 text-[12px] font-black text-slate-400 uppercase tracking-widest">Spent</th>
                    <th className="px-6 py-5 text-[12px] font-black text-slate-400 uppercase tracking-widest">Progress</th>
                    <th className="px-8 py-5"></th>
                 </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                 {filteredProjects.map((project) => (
                    <tr 
                      key={project.id} 
                      onClick={() => openProject(project)}
                      className="hover:bg-slate-50/50 transition-colors group cursor-pointer"
                    >
                       <td className="px-8 py-5">
                          <div className="flex items-center space-x-4">
                             <div className="w-12 h-12 rounded-xl overflow-hidden shadow-sm border border-slate-100">
                                <img src={project.image} className="w-full h-full object-cover" />
                             </div>
                             <div>
                                <span className="block text-[16px] font-black text-slate-800">{project.title}</span>
                                <span className="block text-[12px] font-bold text-indigo-500 uppercase tracking-wider">{project.tag}</span>
                             </div>
                          </div>
                       </td>
                       <td className="px-6 py-5">
                          <span className="text-[14px] font-bold text-slate-500">{project.location}</span>
                       </td>
                       <td className="px-6 py-5">
                          <span className="text-[15px] font-black text-slate-700">{project.budget}</span>
                       </td>
                       <td className="px-6 py-5">
                          <span className="text-[15px] font-black text-emerald-600">{project.spent}</span>
                       </td>
                       <td className="px-6 py-5">
                          <div className="flex items-center space-x-3">
                             <div className="w-32 bg-slate-100 h-2 rounded-full overflow-hidden">
                                <div className="bg-[#5d4aae] h-full rounded-full" style={{ width: `${project.progress}%` }} />
                             </div>
                             <span className="text-[14px] font-black text-slate-600">{project.progress}%</span>
                          </div>
                       </td>
                       <td className="px-8 py-5 text-right">
                          <button className="text-slate-300 group-hover:text-[#5d4aae] transition-colors">
                             <BarChart2 className="w-5 h-5" />
                          </button>
                       </td>
                    </tr>
                 ))}
              </tbody>
           </table>
        </div>
      )}

      <ProgramDetailModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        program={selectedProject} 
      />
    </div>
  );
}
