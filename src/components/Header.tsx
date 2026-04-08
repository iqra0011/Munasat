'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Search, Bell, LogOut, User, Settings, ShieldCheck } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export default function Header() {
  const { language, setLanguage } = useLanguage();
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [userName, setUserName] = useState('Iqra Zaki');
  const router = useRouter();
  
  useEffect(() => {
    const user = localStorage.getItem('munasat_user');
    if (user) {
      const parsed = JSON.parse(user);
      setUserName(parsed.name);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('munasat_user');
    router.push('/login');
  };

  const translations = {
    en: {
      search: 'Search procurement data, tenders, or ministries...',
      role: 'Executive Director',
      logout: 'Logout'
    },
    ar: {
      search: 'ابحث عن بيانات المشتريات أو المناقصات أو الوزارات...',
      role: 'المدير التنفيذي',
      logout: 'تسجيل الخروج'
    }
  };

  const t = translations[language];

  return (
    <header className="h-20 bg-white border-b border-slate-100 flex items-center justify-between px-10 z-[100] shrink-0">
      
      <div className="flex-1 max-w-2xl relative">
        <Search className={`w-4 h-4 absolute ${language === 'en' ? 'left-5' : 'right-5'} top-1/2 -translate-y-1/2 text-slate-400`} />
        <input 
          type="text" 
          placeholder={t.search} 
          className={`w-full bg-slate-50 text-[14px] border-none rounded-full py-3 ${language === 'en' ? 'pl-12 pr-4' : 'pr-12 pl-4'} focus:outline-none focus:ring-2 focus:ring-indigo-100 text-slate-700 font-medium`}
        />
      </div>

      <div className={`flex items-center space-x-6 ${language === 'en' ? 'ml-6' : 'mr-6'} rtl:space-x-reverse`}>
        <div className="flex items-center bg-slate-50 p-1.5 rounded-full text-[10px] font-black text-slate-400 space-x-1 rtl:space-x-reverse shadow-inner">
          <span 
            onClick={() => setLanguage('en')}
            className={`cursor-pointer px-3 py-1 rounded-full transition-all ${language === 'en' ? 'bg-white text-[#5d4aae] shadow-sm' : 'hover:text-slate-600'}`}>EN</span>
          <span 
            onClick={() => setLanguage('ar')}
            className={`cursor-pointer px-3 py-1 rounded-full transition-all ${language === 'ar' ? 'bg-white text-[#5d4aae] shadow-sm' : 'hover:text-slate-600'}`}>AR</span>
        </div>
        
        <button className="relative w-10 h-10 flex items-center justify-center bg-slate-50 rounded-full text-slate-400 hover:text-[#5d4aae] transition-colors border border-slate-100">
          <Bell className="w-5 h-5" />
          <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-pink-500 border-2 border-white rounded-full"></span>
        </button>

        {/* Profile Section with Dropdown */}
        <div className="relative">
          <div 
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            className={`flex items-center space-x-4 border-slate-100 ${language === 'en' ? 'border-l pl-8' : 'border-r pr-8'} cursor-pointer rtl:space-x-reverse group`}
          >
            <div className="flex flex-col text-right rtl:text-left transition-transform group-hover:-translate-x-1">
              <span className="text-[15px] font-black text-slate-800 leading-tight">{userName}</span>
              <span className="text-[10px] uppercase font-black text-slate-400 tracking-widest">{t.role}</span>
            </div>
            <div className={`w-11 h-11 rounded-2xl bg-gradient-to-tr from-[#5d4aae] to-indigo-400 p-0.5 shadow-lg shadow-indigo-100 transition-transform group-hover:scale-105 active:scale-95`}>
              <div className="w-full h-full rounded-[14px] bg-white overflow-hidden flex items-center justify-center">
                <ShieldCheck className="w-6 h-6 text-[#5d4aae]" />
              </div>
            </div>
          </div>

          {/* Profile Dropdown */}
          {showProfileMenu && (
            <>
              <div className="fixed inset-0 z-[-1]" onClick={() => setShowProfileMenu(false)} />
              <div className="absolute top-full right-0 mt-4 w-56 bg-white border border-slate-100 rounded-[24px] shadow-2xl p-2 animate-in zoom-in-95 slide-in-from-top-4 duration-200">
                 <div className="p-4 border-b border-slate-50 mb-2">
                    <p className="text-[14px] font-black text-slate-800">{userName}</p>
                    <p className="text-[11px] font-bold text-slate-400">Manage Account</p>
                 </div>
                 <button className="w-full text-left px-4 py-3 text-[14px] font-bold text-slate-600 hover:bg-slate-50 rounded-xl flex items-center space-x-3 transition-colors">
                    <User className="w-4 h-4 text-slate-400" />
                    <span>My Profile</span>
                 </button>
                 <button className="w-full text-left px-4 py-3 text-[14px] font-bold text-slate-600 hover:bg-slate-50 rounded-xl flex items-center space-x-3 transition-colors">
                    <Settings className="w-4 h-4 text-slate-400" />
                    <span>Settings</span>
                 </button>
                 <div className="h-px bg-slate-50 my-2 mx-2" />
                 <button 
                   onClick={handleLogout}
                   className="w-full text-left px-4 py-3 text-[14px] font-black text-red-500 hover:bg-red-50 rounded-xl flex items-center space-x-3 transition-colors"
                 >
                    <LogOut className="w-4 h-4" />
                    <span>{t.logout}</span>
                 </button>
              </div>
            </>
          )}
        </div>
      </div>
      
    </header>
  );
}
