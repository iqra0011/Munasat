import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import AuthWrapper from '@/components/AuthWrapper';
import { LanguageProvider } from '@/context/LanguageContext';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Munasat - B2B Government Procurement',
  description: 'Munasat B2B government procurement platform built for Vision 2030.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} bg-[#F8F9FA] text-slate-800`} suppressHydrationWarning>
        <LanguageProvider>
          <AuthWrapper>
            {children}
          </AuthWrapper>
        </LanguageProvider>
      </body>
    </html>
  );
}
