'use client';
import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Mail, Lock, ShieldCheck, ArrowRight, Loader2, Smartphone, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

export default function LoginPage() {
  const [email, setEmail] = useState('admin@munasat.sa');
  const [password, setPassword] = useState('admin123');
  const [loading, setLoading] = useState(false);
  const [showForgot, setShowForgot] = useState(false);
  const [showOTP, setShowOTP] = useState(false);
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const inputRefs = useRef<HTMLInputElement[]>([]);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    setTimeout(() => {
      if (email === 'admin@munasat.sa' && password === 'admin123') {
        localStorage.setItem('munasat_user', JSON.stringify({
          name: 'Iqra Zaki',
          email: 'admin@munasat.sa',
          role: 'Executive Director'
        }));
        router.push('/');
      } else {
        setError('Invalid credentials. Access Denied.');
        setLoading(false);
      }
    }, 1200);
  };

  const handleForgot = (e: React.FormEvent) => {
    e.preventDefault();
    setTimeout(() => {
      setShowOTP(true);
    }, 1000);
  };

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) value = value[value.length - 1]; // Only take last char
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto move forward
    if (value && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    // Move back on backspace if current is empty
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  if (showOTP) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center p-6 relative">
         <div className="w-full max-w-[400px] bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[40px] p-10 text-center animate-in zoom-in-95 duration-300">
            <div className="w-16 h-16 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Smartphone className="w-8 h-8 text-emerald-500" />
            </div>
            <h2 className="text-white text-[24px] font-black mb-2">Check your phone</h2>
            <p className="text-slate-400 text-[14px] mb-8 font-medium">We sent a 6-digit PIN to your registered mobile number ending in ****88</p>
            
            <div className="flex justify-between gap-3 mb-8">
               {otp.map((digit, i) => (
                 <input 
                   key={i} 
                   ref={(el) => { if(el) inputRefs.current[i] = el; }}
                   type="text" 
                   maxLength={1} 
                   value={digit}
                   onChange={(e) => handleOtpChange(i, e.target.value)}
                   onKeyDown={(e) => handleKeyDown(i, e)}
                   className="w-12 h-14 bg-white/10 border border-white/10 rounded-xl text-white text-center text-[20px] font-black focus:outline-none focus:ring-2 focus:ring-[#5d4aae] transition-all" 
                 />
               ))}
            </div>

            <button 
              onClick={() => router.push('/')}
              className="w-full bg-[#5d4aae] hover:bg-indigo-600 text-white py-4 rounded-2xl font-black text-[16px] mb-4 transition-all active:scale-95 shadow-lg shadow-indigo-500/20"
            >
              Verify PIN
            </button>
            <button onClick={() => setShowOTP(false)} className="text-slate-500 hover:text-slate-300 text-[13px] font-bold uppercase tracking-widest transition-colors">Resend Code</button>
         </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-6 relative overflow-hidden">
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#5d4aae]/20 blur-[120px] rounded-full" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-500/10 blur-[120px] rounded-full" />

      <div className="w-full max-w-[450px] relative z-10">
        <div className="flex flex-col items-center mb-10">
           <div className="w-20 h-20 bg-gradient-to-tr from-[#5d4aae] to-indigo-400 rounded-3xl flex items-center justify-center shadow-2xl mb-6 shadow-indigo-500/20">
             <ShieldCheck className="w-10 h-10 text-white" />
           </div>
           <h1 className="text-[36px] font-black text-white tracking-tight leading-none uppercase">MUNASAT</h1>
           <p className="text-slate-400 font-bold tracking-[0.2em] uppercase text-[12px] mt-2 italic">Vision 2030 Procurement</p>
        </div>

        <form onSubmit={showForgot ? handleForgot : handleLogin} className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[40px] p-10 shadow-3xl">
           <div className="mb-8">
             <h2 className="text-white text-[24px] font-black mb-2">{showForgot ? 'Reset Password' : 'Welcome Back'}</h2>
             <p className="text-slate-400 text-[14px] font-medium">
               {showForgot ? 'Enter your email to receive a mobile verification PIN.' : 'Please sign in to your dashboard to manage portfolios.'}
             </p>
           </div>

           {error && (
             <div className="bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-2xl text-[13px] font-bold mb-6 animate-in slide-in-from-top-2">
               {error}
             </div>
           )}

           <div className="space-y-4">
              <div className="relative">
                 <Mail className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
                 <input 
                   type="email" 
                   value={email}
                   onChange={(e) => setEmail(e.target.value)}
                   className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-[#5d4aae]/50 transition-all font-bold"
                   placeholder="Email Address"
                   required
                 />
              </div>

              {!showForgot && (
                <div className="relative">
                   <Lock className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
                   <input 
                     type="password" 
                     value={password}
                     onChange={(e) => setPassword(e.target.value)}
                     className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-[#5d4aae]/50 transition-all font-bold"
                     placeholder="Password"
                     required={!showForgot}
                   />
                </div>
              )}
           </div>

           <div className="flex justify-end mt-4">
             <button 
               type="button" 
               onClick={() => setShowForgot(!showForgot)}
               className="text-slate-500 hover:text-[#5d4aae] text-[13px] font-bold transition-colors uppercase tracking-widest"
             >
               {showForgot ? 'Back to Login' : 'Forgot Password?'}
             </button>
           </div>

           <button 
             type="submit" 
             disabled={loading && !showForgot}
             className="w-full bg-[#5d4aae] hover:bg-indigo-600 text-white rounded-2xl py-5 mt-8 font-black text-[16px] flex items-center justify-center space-x-3 transition-all shadow-xl shadow-indigo-500/20"
           >
             {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : <span>{showForgot ? 'Send PIN' : 'Enter Dashboard'}</span>}
           </button>

           <div className="mt-8 text-center">
             <p className="text-slate-400 text-[14px] font-medium">Don't have an account? <Link href="/signup" className="text-indigo-400 font-black hover:underline">Sign Up</Link></p>
           </div>
        </form>
      </div>
    </div>
  );
}
