'use client';
import { Bot, History, Plus, FileText, Database, Send, Paperclip, Sparkles, TrendingUp, HelpCircle, User, Download, Save } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

export default function AIAssistantPage() {
  const [messages, setMessages] = useState([
    { 
      id: 'msg-start',
      role: 'ai', 
      content: 'Hello! I am Munasat AI, your procurement intelligence assistant. How can I help you extract insights from the Saudi government tender market today?' 
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleExport = () => {
    const chatContent = messages.map(m => `${m.role.toUpperCase()}: ${m.content}`).join('\n\n');
    const blob = new Blob([chatContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `munasat-chat-export-${Date.now()}.txt`;
    link.click();
  };

  const handleSend = async (text: string = input) => {
    if (!text.trim()) return;
    
    const userMsg = { id: Date.now().toString(), role: 'user', content: text };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    // Simulate AI thinking and response
    setTimeout(() => {
      let aiResponse = "";
      const lowerText = text.toLowerCase();
      
      if (lowerText.includes('summarize')) {
        aiResponse = "Based on current data, there are 12 high-value tenders closing this week in the Construction and IT sectors. The largest is the Riyadh Smart Grid expansion, valued at SAR 450M. Would you like a detailed breakdown of its requirements?";
      } else if (lowerText.includes('competitor') || lowerText.includes('win rate')) {
        aiResponse = "Analyzing top 5 vendors in the Transport sector... ELM Company currently leads with a 78% win rate on digital systems, followed by Saudi TechSolutions at 64%. Most winning bids included a Local Content score above 62%.";
      } else if (lowerText.includes('proposal') || lowerText.includes('draft')) {
        aiResponse = "I've drafted a structure for your proposal based on typical MCIT requirements: 1. Executive Summary 2. Technical Solution Architecture 3. Saudi Vision 2030 Alignment 4. Local Content Contribution 5. Implementation Roadmap. Should I expand on any of these sections?";
      } else {
        aiResponse = "That's an interesting question about the Saudi procurement market. Based on recent trends, we see increasing focus on ESG compliance and Local Content. Would you like me to look up specific historical awards related to this topic?";
      }

      setMessages(prev => [...prev, { id: (Date.now() + 1).toString(), role: 'ai', content: aiResponse }]);
      setIsTyping(false);
    }, 1200);
  };

  const startNewChat = () => {
    setMessages([
      { 
        id: 'msg-start-' + Date.now(),
        role: 'ai', 
        content: 'Chat cleared. Hello! I am Munasat AI, your procurement intelligence assistant. How can I help you extract insights today?' 
      }
    ]);
  };

  return (
    <div className="p-8 space-y-6 animate-in fade-in duration-500 max-w-full bg-transparent min-h-full flex flex-col h-[calc(100vh-100px)]">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center w-full mb-2">
        <div>
          <h1 className="text-[40px] font-black tracking-tight text-slate-800 leading-none mb-1">Munasat AI Assistant</h1>
          <p className="text-[16px] text-slate-500 font-medium tracking-wide">Analyze tenders, summarize documents, and explore vendor intelligence.</p>
        </div>
        
        {/* Actions */}
        <div className="flex items-center space-x-3 mt-4 md:mt-0">
          <button 
             onClick={handleExport}
             className="bg-white hover:bg-slate-50 text-slate-600 border border-slate-200 px-5 py-2.5 rounded-full text-[16px] font-bold flex items-center space-x-2 transition-colors shadow-sm">
            <Download className="w-4 h-4 text-slate-400" />
            <span>Export Chat</span>
          </button>
          <button 
            onClick={startNewChat}
            className="bg-[#5d4aae] hover:bg-indigo-700 text-white px-5 py-2.5 rounded-full text-[16px] font-bold flex items-center space-x-2 transition-colors shadow-sm">
            <Plus className="w-4 h-4 text-indigo-200" />
            <span>New Chat</span>
          </button>
        </div>
      </div>

      {/* Main Chat Container */}
      <div className="bg-white rounded-[24px] border border-slate-100 shadow-sm flex flex-col flex-1 overflow-hidden min-h-0">
        
        {/* Chat Scroll Area */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8 space-y-8" ref={scrollRef}>
           
           {messages.map((msg) => (
             <div key={msg.id} className={`flex items-start space-x-6 ${msg.role === 'user' ? 'bg-slate-50/70 border-y border-slate-100 -mx-8 px-8 py-8' : ''}`}>
               <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 shadow-sm border ${msg.role === 'ai' ? 'bg-[#5d4aae] border-indigo-200' : 'bg-slate-200 border-slate-300'}`}>
                  {msg.role === 'ai' ? <Bot className="w-5 h-5 text-white" /> : <User className="w-5 h-5 text-slate-500" />}
               </div>
               <div className={`pt-2 text-[16px] font-medium leading-relaxed max-w-4xl ${msg.role === 'ai' ? 'text-slate-500' : 'text-slate-800'}`}>
                 {msg.content}
               </div>
             </div>
           ))}

           {isTyping && (
             <div className="flex items-start space-x-6">
                <div className="w-10 h-10 rounded-xl bg-[#5d4aae] flex items-center justify-center shrink-0 shadow-sm border border-indigo-200">
                   <Bot className="w-5 h-5 text-white" />
                </div>
                <div className="pt-4 flex space-x-1.5">
                   <div className="w-2 h-2 bg-slate-300 rounded-full animate-bounce delay-0"></div>
                   <div className="w-2 h-2 bg-slate-300 rounded-full animate-bounce delay-150"></div>
                   <div className="w-2 h-2 bg-slate-300 rounded-full animate-bounce delay-300"></div>
                </div>
             </div>
           )}
        </div>

        {/* Input Area */}
        <div className="p-6 pt-2 bg-white border-t border-slate-100">
          
          <div className="flex flex-wrap items-center gap-3 mb-4 mx-2">
            <button 
              onClick={() => handleSend("Summarize top tenders closing this week")}
              className="flex items-center space-x-2 bg-indigo-50/50 hover:bg-indigo-50 border border-indigo-100/50 px-4 py-2.5 rounded-full transition-colors group">
              <Sparkles className="w-3.5 h-3.5 text-indigo-400 group-hover:text-[#5d4aae] transition-colors" />
              <span className="text-[14px] font-bold text-[#5d4aae]">Summarize top tenders</span>
            </button>
            <button 
              onClick={() => handleSend("Analyze competitor win rate for Ministry of Transport")}
              className="flex items-center space-x-2 bg-indigo-50/50 hover:bg-indigo-50 border border-indigo-100/50 px-4 py-2.5 rounded-full transition-colors group">
              <TrendingUp className="w-3.5 h-3.5 text-indigo-400 group-hover:text-[#5d4aae] transition-colors" />
              <span className="text-[14px] font-bold text-[#5d4aae]">Analyze competitor win rate</span>
            </button>
            <button 
              onClick={() => handleSend("Draft proposal outline for smart city infrastructure")}
              className="flex items-center space-x-2 bg-indigo-50/50 hover:bg-indigo-50 border border-indigo-100/50 px-4 py-2.5 rounded-full transition-colors group">
              <FileText className="w-3.5 h-3.5 text-indigo-400 group-hover:text-[#5d4aae] transition-colors" />
              <span className="text-[14px] font-bold text-[#5d4aae]">Draft proposal outline</span>
            </button>
          </div>

          <form 
            onSubmit={(e) => { e.preventDefault(); handleSend(); }}
            className="flex items-center space-x-3 bg-white border border-slate-200 rounded-[16px] p-2 shadow-sm focus-within:border-[#5d4aae] focus-within:ring-1 focus-within:ring-[#5d4aae] transition-all">
             <button type="button" className="p-3 text-slate-400 hover:text-slate-600 transition-colors">
               <Paperclip className="w-5 h-5" />
             </button>
             <input 
               type="text"
               value={input}
               onChange={(e) => setInput(e.target.value)}
               placeholder="Ask Munasat AI anything..."
               className="flex-1 bg-transparent border-none focus:outline-none text-[15px] font-medium text-slate-800 placeholder:text-slate-300"
             />
             <button 
               type="submit"
               disabled={!input.trim() || isTyping}
               className="w-12 h-12 bg-[#5d4aae] rounded-[12px] flex items-center justify-center text-white hover:bg-indigo-700 transition-colors shrink-0 shadow-sm shadow-indigo-200 disabled:bg-slate-200 disabled:shadow-none">
               <Send className="w-5 h-5 ml-0.5" />
             </button>
          </form>

        </div>

      </div>

    </div>
  );
}
