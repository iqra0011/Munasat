'use client';
import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Sidebar from './Sidebar';
import Header from './Header';

export default function AuthWrapper({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const user = localStorage.getItem('munasat_user');
    const isPublicRoute = pathname === '/login' || pathname === '/signup';

    if (!user && !isPublicRoute) {
      setIsAuthenticated(false);
      router.push('/login');
    } else if (user && isPublicRoute) {
      setIsAuthenticated(true);
      router.push('/');
    } else {
      setIsAuthenticated(!!user || isPublicRoute);
    }
  }, [pathname, router]);

  // Loading state while checking auth
  if (isAuthenticated === null) {
    return <div className="h-screen w-screen bg-slate-900 flex items-center justify-center">
      <div className="w-10 h-10 border-4 border-[#5d4aae] border-t-transparent animate-spin rounded-full" />
    </div>;
  }

  // If public route, don't show sidebar/header
  if (pathname === '/login' || pathname === '/signup') {
    return <>{children}</>;
  }

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <Header />
        <main className="flex-1 overflow-y-auto w-full" style={{ backgroundColor: 'lab(83 0.43 -4.51 / 0.3)' }}>
          {children}
        </main>
      </div>
    </div>
  );
}
