'use client';
import { useState, useEffect } from 'react';
import { FileText, Upload, HardDrive, LayoutGrid, List, Search, Eye, Download, MoreVertical, File as FileOutline, FileBox, FileArchive, Filter, FileSpreadsheet, ChevronLeft, ChevronRight, Share2, Link } from 'lucide-react';
import DocumentViewerModal from '@/components/DocumentViewerModal';

export default function FilesPage() {
  const [activeType, setActiveType] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');
  const [selectedFile, setSelectedFile] = useState<any>(null);
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);

  const openViewer = (file: any) => {
    setSelectedFile(file);
    setIsViewerOpen(true);
  };

  const shareFile = (file: any) => {
    const fakeLink = `https://munasat.sa/files/view/${file.ref}`;
    navigator.clipboard.writeText(fakeLink);
    alert(`Share Link Copied: ${fakeLink}`);
    setActiveMenuId(null);
  };

  const downloadMockFile = (file: any) => {
    const mockContent = `DOCUMENT: ${file.name}\nMINISTRY: ${file.ministry}\nREF: ${file.ref}\n\nThis is a mock procurement document for analysis by Munasat AI.`;
    const blob = new Blob([mockContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = file.name.replace(/\.[^/.]+$/, "") + "_Munasat.txt";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const baseFiles = [
    {
       id: '1', name: 'Q3_Security_Framework_v2.pdf', sub: 'Uploaded by Sarah Ahmed • 2h ago',
       ministry: 'Ministry of Interior', ref: 'TR-9942-X', type: 'RFP', typeCol: 'bg-indigo-50 text-indigo-500', size: '4.2 MB', icon: 'pdf'
    },
    {
       id: '2', name: 'Contract_Visi2030_SmartCity.docx', sub: 'Modified by System • Oct 22',
       ministry: 'Ministry of Investment', ref: 'TR-0041-A', type: 'CONTRACT', typeCol: 'bg-emerald-50 text-emerald-500', size: '1.8 MB', icon: 'word'
    },
    {
       id: '3', name: 'Cost_Allocation_Grid_Final.xlsx', sub: 'Uploaded by Khalid M. • Oct 20',
       ministry: 'Ministry of Finance', ref: 'PR-6621-C', type: 'PRICING', typeCol: 'bg-slate-100 text-slate-500', size: '1.5 MB', icon: 'excel'
    },
    {
       id: '4', name: 'HealthTech_Proposal_v4.pdf', sub: 'Uploaded by Healthcare Unit • Oct 16',
       ministry: 'Ministry of Health', ref: 'TR-4451-Z', type: 'PROPOSAL', typeCol: 'bg-slate-100 text-slate-500', size: '8.9 MB', icon: 'pdf'
    },
    {
       id: '5', name: 'Education_Platform_Specs.pdf', sub: 'Uploaded by MOE Admin • Oct 15',
       ministry: 'Ministry of Education', ref: 'TR-2291-B', type: 'RFP', typeCol: 'bg-indigo-50 text-indigo-500', size: '3.1 MB', icon: 'pdf'
    }
  ];

  let displayFiles = [...baseFiles];

  if (activeType !== 'All') {
    displayFiles = displayFiles.filter(f => f.type.toLowerCase() === activeType.toLowerCase() || (activeType === 'Proposals' && f.type === 'PROPOSAL'));
  }

  if (searchTerm) {
    const q = searchTerm.toLowerCase();
    displayFiles = displayFiles.filter(f => f.name.toLowerCase().includes(q) || f.ref.toLowerCase().includes(q));
  }

  return (
    <div className="p-8 space-y-6 animate-in fade-in duration-500 max-w-full bg-transparent min-h-full flex flex-col">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center w-full mb-2">
        <div>
          <h1 className="text-[40px] font-black tracking-tight text-slate-800 leading-none mb-1">Files Repository</h1>
          <p className="text-[16px] text-slate-500 font-medium tracking-wide">Search and analyze government procurement documents.</p>
        </div>
        
        <div className="mt-4 md:mt-0">
          <button className="bg-[#5d4aae] hover:bg-indigo-700 text-white px-6 py-3 rounded-full text-[16px] font-bold flex items-center space-x-2 transition-colors shadow-sm">
            <Upload className="w-4 h-4 text-indigo-200" />
            <span>Upload File</span>
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-[#5d4aae] rounded-[20px] p-6 text-white shadow-sm flex flex-col relative overflow-hidden min-h-[140px]">
           <div className="flex justify-between items-start w-full">
             <span className="bg-white text-[#5d4aae] px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-widest">Active</span>
             <FileText className="w-5 h-5 text-white" />
           </div>
           <div className="mt-auto">
             <p className="text-[16px] font-bold text-indigo-100 tracking-wide mb-1">Total Procurement Files</p>
             <p className="text-[36px] font-black tracking-tight leading-none">4508</p>
           </div>
        </div>

        <div className="bg-white rounded-[20px] p-6 shadow-sm border border-slate-100 flex flex-col relative overflow-hidden min-h-[140px]">
           <div className="flex justify-between items-start w-full">
             <span className="bg-[#5d4aae] text-white px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-widest">Shared</span>
             <FileBox className="w-5 h-5 text-[#5d4aae]" />
           </div>
           <div className="mt-auto">
             <p className="text-[16px] font-bold text-slate-400 tracking-wide mb-1">Active Ministry Channels</p>
             <p className="text-[36px] font-black text-slate-800 tracking-tight leading-none">4,205</p>
           </div>
        </div>

        <div className="bg-white rounded-[20px] p-6 shadow-sm border border-slate-100 flex flex-col relative overflow-hidden min-h-[140px]">
           <div className="flex justify-between items-start w-full">
             <span className="bg-[#5d4aae] text-white px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-widest">+12% MO</span>
             <HardDrive className="w-5 h-5 text-[#5d4aae]" />
           </div>
           <div className="mt-auto">
             <p className="text-[16px] font-bold text-slate-400 tracking-wide mb-1">Storage Utilized</p>
             <p className="text-[36px] font-black text-slate-800 tracking-tight leading-none">42 GB</p>
           </div>
        </div>
      </div>

      {/* Main Container */}
      <div className="bg-white rounded-[24px] border border-slate-100 shadow-sm flex flex-col overflow-hidden">
        
        <div className="p-6 flex flex-col md:flex-row justify-between items-start md:items-center w-full gap-4 border-b border-slate-100">
          <div className="flex flex-wrap items-center gap-2">
             {['All', 'RFP', 'Pricing', 'Proposals', 'Contracts'].map(type => (
               <button 
                 key={type}
                 onClick={() => setActiveType(type)}
                 className={`${activeType === type ? 'bg-[#5d4aae] text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'} px-4 py-2 rounded-full text-[16px] font-bold transition-colors`}>
                 {type === 'All' ? 'All documents' : type}
               </button>
             ))}
          </div>

          <div className="flex items-center space-x-3 w-full md:w-auto">
             <div className="relative w-full md:w-64">
                <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                <input 
                  type="text" 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search files..." 
                  className="w-full bg-slate-50 text-[16px] border-none rounded-full py-2.5 pl-11 pr-4 focus:outline-none focus:ring-2 focus:ring-indigo-100 text-slate-600 font-medium"
                />
             </div>
             
             <div className="flex items-center bg-slate-50 p-1 rounded-lg border border-slate-100 shrink-0">
                <button onClick={() => setViewMode('list')} className={`p-1.5 rounded ${viewMode === 'list' ? 'bg-white shadow-sm border border-slate-200 text-slate-600' : 'text-slate-400'}`}><List className="w-4 h-4" /></button>
                <button onClick={() => setViewMode('grid')} className={`p-1.5 rounded ${viewMode === 'grid' ? 'bg-white shadow-sm border border-slate-200 text-slate-600' : 'text-slate-400'}`}><LayoutGrid className="w-4 h-4" /></button>
             </div>
          </div>
        </div>

        <div className="overflow-x-auto w-full min-h-[400px]">
          {viewMode === 'list' ? (
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-slate-100 text-[14px] font-bold text-slate-400 uppercase tracking-widest whitespace-nowrap">
                  <th className="px-8 py-5">File Name</th>
                  <th className="px-6 py-5">Ministry</th>
                  <th className="px-6 py-5">Ref</th>
                  <th className="px-6 py-5">Type</th>
                  <th className="px-6 py-5">Size</th>
                  <th className="px-8 py-5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {displayFiles.map((file: any) => (
                  <tr key={file.id} className="hover:bg-slate-50/50 transition-colors group">
                    <td className="px-8 py-5">
                      <div className="flex items-center space-x-4">
                        <div onClick={() => openViewer(file)} className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0 border bg-indigo-50 text-indigo-500 cursor-pointer hover:bg-indigo-100 transition-colors">
                           <FileOutline className="w-5 h-5" />
                        </div>
                        <div className="flex flex-col">
                          <span className="text-[16px] font-bold text-slate-800 leading-tight mb-1">{file.name}</span>
                          <span className="text-[14px] text-slate-400 font-medium tracking-wide">{file.sub}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-5"><span className="text-[16px] font-medium text-slate-600">{file.ministry}</span></td>
                    <td className="px-6 py-5"><span className="bg-slate-100 border border-slate-200 text-slate-500 text-[14px] font-bold uppercase px-2 py-1 rounded-md">{file.ref}</span></td>
                    <td className="px-6 py-5"><span className={`${file.typeCol} text-[9px] font-black uppercase px-3 py-1.5 rounded-full border border-white whitespace-nowrap`}>{file.type}</span></td>
                    <td className="px-6 py-5"><span className="text-[16px] font-medium text-slate-500">{file.size}</span></td>
                    <td className="px-8 py-5 text-right">
                       <div className="flex items-center justify-end space-x-3">
                         <button onClick={() => openViewer(file)} title="View File" className="text-slate-400 hover:text-[#5d4aae] transition-colors"><Eye className="w-4 h-4" /></button>
                         <button onClick={() => downloadMockFile(file)} title="Download File" className="text-slate-400 hover:text-[#5d4aae] transition-colors"><Download className="w-4 h-4" /></button>
                         <div className="relative">
                            <button onClick={() => setActiveMenuId(activeMenuId === file.id ? null : file.id)} className="text-slate-400 hover:text-slate-600"><MoreVertical className="w-4 h-4" /></button>
                            {activeMenuId === file.id && (
                              <div className="absolute right-0 mt-2 w-48 bg-white border border-slate-100 rounded-xl shadow-xl z-[100] p-1">
                                <button onClick={() => shareFile(file)} className="w-full text-left px-4 py-2.5 text-[14px] font-bold text-slate-600 hover:bg-slate-50 flex items-center space-x-3 rounded-lg"><Share2 className="w-4 h-4 text-[#5d4aae]" /><span>Share</span></button>
                                <button className="w-full text-left px-4 py-2.5 text-[14px] font-bold text-slate-600 hover:bg-slate-50 flex items-center space-x-3 rounded-lg"><Link className="w-4 h-4 text-slate-400" /><span>Reference</span></button>
                              </div>
                            )}
                         </div>
                       </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
               {displayFiles.map((file: any) => (
                 <div key={file.id} className="bg-slate-50/50 rounded-[20px] p-6 border border-slate-100 hover:border-indigo-200 transition-all group shadow-sm hover:shadow-md">
                    <div className="flex justify-between items-start mb-6">
                       <div onClick={() => openViewer(file)} className="w-12 h-12 rounded-xl bg-white flex items-center justify-center shrink-0 border border-slate-100 shadow-sm cursor-pointer hover:border-indigo-200"><FileOutline className="w-6 h-6 text-[#5d4aae]" /></div>
                       <div className="relative">
                          <button onClick={() => setActiveMenuId(activeMenuId === file.id ? null : file.id)} className="text-slate-300 hover:text-slate-500"><MoreVertical className="w-5 h-5" /></button>
                          {activeMenuId === file.id && (
                             <div className="absolute right-0 mt-2 w-40 bg-white border border-slate-100 rounded-xl shadow-xl z-[100] p-1">
                                <button onClick={() => shareFile(file)} className="w-full text-left px-3 py-2 text-[12px] font-bold text-slate-600 hover:bg-slate-50 flex items-center space-x-2 rounded-lg"><Share2 className="w-3 h-3 text-[#5d4aae]" /><span>Share</span></button>
                             </div>
                          )}
                       </div>
                    </div>
                    <div className="mb-4">
                       <h4 className="text-[18px] font-bold text-slate-800 truncate mb-1">{file.name}</h4>
                       <p className="text-[14px] text-slate-400 font-medium truncate">{file.ministry}</p>
                    </div>
                    <div className="flex items-center justify-between mt-6 pt-4 border-t border-slate-100">
                       <span className="text-[12px] font-bold text-slate-400">{file.size}</span>
                       <div className="flex space-x-2">
                          <button onClick={() => openViewer(file)} className="p-2 bg-white rounded-lg border border-slate-100 text-slate-400 hover:text-[#5d4aae] transition-colors"><Eye className="w-4 h-4" /></button>
                          <button onClick={() => downloadMockFile(file)} className="p-2 bg-white rounded-lg border border-slate-100 text-slate-400 hover:text-[#5d4aae] transition-colors"><Download className="w-4 h-4" /></button>
                       </div>
                    </div>
                 </div>
               ))}
            </div>
          )}
        </div>
      </div>

      <DocumentViewerModal isOpen={isViewerOpen} onClose={() => setIsViewerOpen(false)} file={selectedFile} />
    </div>
  );
}
