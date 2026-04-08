'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Compass, 
  Briefcase, 
  Trophy, 
  Users, 
  BarChart2, 
  Layout, 
  Bot, 
  Folder, 
  Tags, 
  Box,
  LogOut 
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { useRouter } from 'next/navigation';

export default function Sidebar() {
  const pathname = usePathname();
  const { language } = useLanguage();
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem('munasat_user');
    router.push('/login');
  };

  const translations = {
    en: {
      groups: {
        core: 'CORE HUB',
        analytics: 'ANALYTICS & EXECUTION',
        resources: 'RESOURCES'
      },
      items: {
        explore: 'Explore',
        opportunities: 'Opportunities',
        awards: 'Awards',
        participants: 'Participants',
        reports: 'Reports',
        capture: 'Capture',
        ai: 'AI Assistant',
        files: 'Files',
        categories: 'Categories',
        programs: 'Programs'
      },
      subtitle: 'Procurement Intelligence'
    },
    ar: {
      groups: {
        core: 'المركز الرئيسي',
        analytics: 'التحليلات والتنفيذ',
        resources: 'الموارد'
      },
      items: {
        explore: 'استكشاف',
        opportunities: 'فرص',
        awards: 'جوائز',
        participants: 'المشاركون',
        reports: 'تقارير',
        capture: 'الفرص الملتقطة',
        ai: 'مساعد ذكاء اصطناعي',
        files: 'ملفات',
        categories: 'تصنيفات',
        programs: 'برامج'
      },
      subtitle: 'ذكاء المشتريات'
    }
  };

  const t = translations[language];

  const menuGroups = [
    {
      title: t.groups.core,
      items: [
        { name: t.items.explore, href: '/', icon: Compass },
        { name: t.items.opportunities, href: '/opportunities', icon: Briefcase },
        { name: t.items.awards, href: '/awards', icon: Trophy },
        { name: t.items.participants, href: '/participants', icon: Users },
      ]
    },
    {
      title: t.groups.analytics,
      items: [
        { name: t.items.reports, href: '/reports', icon: BarChart2 },
        { name: t.items.capture, href: '/capture', icon: Layout },
        { name: t.items.ai, href: '/ai-assistant', icon: Bot },
      ]
    },
    {
      title: t.groups.resources,
      items: [
        { name: t.items.files, href: '/files', icon: Folder },
        { name: t.items.categories, href: '/categories', icon: Tags },
        { name: t.items.programs, href: '/programs', icon: Box },
      ]
    }
  ];

  return (
    <aside className={`w-64 bg-white ${language === 'en' ? 'border-r' : 'border-l'} border-slate-200 h-full flex flex-col shadow-sm z-20`}>
      <Link href="/" className="h-16 flex items-center px-6 border-b border-white hover:bg-slate-50 transition-colors">
        <div className={`flex items-center ${language === 'en' ? 'space-x-3' : 'space-x-3 rtl:space-x-reverse'}`}>
          <div className="w-8 h-8 bg-[#7163BA] rounded-lg flex items-center justify-center text-white font-bold tracking-tighter shrink-0">
            M
          </div>
          <div className="flex flex-col">
            <span className="text-[15px] font-bold text-slate-800 leading-tight">Munasat</span>
            <span className="text-[9px] text-slate-500 font-medium tracking-wide uppercase leading-tight">{t.subtitle}</span>
          </div>
        </div>
      </Link>
      
      <nav className="flex-1 overflow-y-auto py-6 hide-scrollbar space-y-8">
        {menuGroups.map((group) => (
          <div key={group.title}>
            <div className={`px-6 mb-3 ${language === 'ar' ? 'text-right' : ''}`}>
              <p className="text-[10px] font-bold tracking-wider text-slate-400 uppercase">{group.title}</p>
            </div>
            <ul className="space-y-1">
              {group.items.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <li key={`${group.title}-${item.name}`}>
                    <Link
                      href={item.href}
                      className={`group flex items-center ${language === 'en' ? 'space-x-3 border-l-[3px]' : 'space-x-3 rtl:space-x-reverse border-r-[3px]'} py-2.5 px-6 transition-all duration-200 ${
                        isActive 
                          ? 'border-[#7163BA] bg-[#7163BA] text-white shadow-md shadow-[#7163BA]/30' 
                          : 'border-transparent text-[#575A61] hover:bg-[#7163BA]/10 hover:text-[#7163BA]'
                      }`}
                    >
                      <item.icon className={`w-4 h-4 transition-colors ${isActive ? 'text-white' : 'text-[#575A61] group-hover:text-[#7163BA]'}`} strokeWidth={isActive ? 2.5 : 2} />
                      <span className={`text-[16px] ${isActive ? 'font-semibold' : 'font-medium'}`}>{item.name}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>
    </aside>
  );
}
