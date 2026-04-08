'use client';
import React, { useState } from 'react';
import { X, Sparkles, Download, Save, Undo, Wand2, FileText, Check } from 'lucide-react';

interface DocumentViewerModalProps {
  isOpen: boolean;
  onClose: () => void;
  file: {
    id: string;
    name: string;
    ministry: string;
    type: string;
  } | null;
}

export default function DocumentViewerModal({ isOpen, onClose, file }: DocumentViewerModalProps) {
  const [content, setContent] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [isAIProcessing, setIsAIProcessing] = useState(false);
  const [showStatus, setShowStatus] = useState(false);

  // Generate ministry specific content
  React.useEffect(() => {
    if (file) {
      const mockContent = `
DOCUMENT TITLE: ${file.name}
MINISTRY: ${file.ministry}
DOCUMENT TYPE: ${file.type}
REFERENCE: REF-2030-SA

EXECUTIVE SUMMARY:
This document outlines the strategic implementation of ${file.type === 'RFP' ? 'the Request for Proposal' : 'the procurement contract'} 
specifically tailored for the ${file.ministry}.

KEY REQUIREMENTS:
1. Compliance with Vision 2030 local content targets.
2. Integration with existing government systems.
3. Security protocols according to National Cybersecurity Authority (NCA) standards.

PROPOSED TIMELINE:
- Phase 1: Planning and Risk Analysis (Month 1-3)
- Phase 2: Implementation and Deployment (Month 4-12)
- Phase 3: Monitoring and Evaluation (Continuous)

SIGNATORIES:
Authorized representative of the ${file.ministry}.
      `;
      setContent(mockContent.trim());
    }
  }, [file]);

  if (!isOpen || !file) return null;

  const handleAIDocEdit = () => {
    setIsAIProcessing(true);
    setTimeout(() => {
      const advancedTerms = content.replace(/Plan/g, "Strategic Roadmap")
                                    .replace(/Implementation/g, "Dynamic Execution")
                                    .replace(/targets/g, "benchmark milestones");
      setContent(advancedTerms + "\n\n[AI SUGGESTION]: Added strategic roadmap and dynamic execution parameters for enhanced Vision 2030 alignment.");
      setIsAIProcessing(false);
      setShowStatus(true);
      setTimeout(() => setShowStatus(false), 3000);
    }, 1500);
  };

  const downloadFile = () => {
    // We add .txt to ensure the file is easily readable in any text editor
    const readableFileName = file.name.replace(/\.[^/.]+$/, "") + "_Munasat_AI.txt";
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = readableFileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-6">
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-md animate-in fade-in duration-300" onClick={onClose} />
      
      <div className="relative bg-white w-full max-w-4xl rounded-[40px] shadow-2xl overflow-hidden flex flex-col h-[85vh] animate-in zoom-in-95 duration-300">
        
        {/* Header */}
        <div className="p-8 border-b border-slate-50 flex justify-between items-center bg-slate-50/50">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-[#5d4aae] rounded-2xl flex items-center justify-center text-white">
              <FileText className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-[24px] font-black text-slate-800 leading-tight">{file.name}</h3>
              <p className="text-[14px] text-slate-400 font-bold tracking-widest uppercase">{file.ministry}</p>
            </div>
          </div>
          <button onClick={onClose} className="p-3 hover:bg-slate-200 rounded-full transition-colors text-slate-400 hover:text-slate-600">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Editor Area */}
        <div className="flex-1 overflow-y-auto p-12 bg-white relative">
          <textarea
             value={content}
             onChange={(e) => setContent(e.target.value)}
             readOnly={!isEditing}
             className={`w-full h-full text-[18px] font-medium leading-relaxed text-slate-600 focus:outline-none bg-transparent resize-none border-none ${isEditing ? 'border-l-2 border-indigo-100 pl-6' : ''}`}
             placeholder="Analyzing document content..."
          />
        </div>

        {/* AI Action Tooltip */}
        {showStatus && (
           <div className="absolute bottom-32 left-1/2 -translate-x-1/2 bg-emerald-500 text-white px-6 py-3 rounded-full flex items-center space-x-2 shadow-lg animate-in slide-in-from-bottom-4">
             <Check className="w-4 h-4" />
             <span className="text-[14px] font-bold">Document Optimized by Munasat AI</span>
           </div>
        )}

        {/* Actions Footer */}
        <div className="p-8 border-t border-slate-100 bg-slate-50/30 flex justify-between items-center">
          <div className="flex space-x-3">
            <button 
               onClick={handleAIDocEdit}
               disabled={isAIProcessing}
               className="flex items-center space-x-3 bg-indigo-50 hover:bg-indigo-100 text-[#5d4aae] px-6 py-3.5 rounded-2xl text-[16px] font-black transition-all">
              {isAIProcessing ? (
                <div className="w-5 h-5 border-2 border-[#5d4aae] border-t-transparent animate-spin rounded-full" />
              ) : (
                <Wand2 className="w-5 h-5" />
              )}
              <span>AI Smart Optimize</span>
            </button>
            <button 
              onClick={() => setIsEditing(!isEditing)}
              className="flex items-center space-x-3 bg-slate-100 hover:bg-slate-200 text-slate-600 px-6 py-3.5 rounded-2xl text-[16px] font-black transition-all">
              {isEditing ? <Save className="w-5 h-5" /> : <Sparkles className="w-5 h-5" />}
              <span>{isEditing ? 'Save Changes' : 'Quick Manual Edit'}</span>
            </button>
          </div>

          <button 
            onClick={downloadFile}
            className="flex items-center space-x-3 bg-[#5d4aae] hover:bg-indigo-700 text-white px-8 py-3.5 rounded-2xl text-[16px] font-black transition-all shadow-lg shadow-indigo-100">
            <Download className="w-5 h-5" />
            <span>Download Revised Doc</span>
          </button>
        </div>

      </div>
    </div>
  );
}
