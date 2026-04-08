'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Mail, Lock, User, ShieldCheck, ArrowRight, Loader2, Phone } from 'lucide-react';
import Link from 'next/link';

export default function SignupPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate registration
    setTimeout(() => {
      localStorage.setItem('munasat_user', JSON.stringify({
        name: formData.name,
        email: formData.email,
        role: 'Vendor'
      }));
      router.push('/');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-6 relative overflow-hidden">
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#5d4aae]/20 blur-[120px] rounded-full" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-500/10 blur-[120px] rounded-full" />

      <div className="w-full max-w-[500px] relative z-10">
        <div className="flex flex-col items-center mb-8">
           <div className="w-16 h-16 bg-gradient-to-tr from-[#5d4aae] to-indigo-400 rounded-2xl flex items-center justify-center shadow-2xl mb-4">
             <ShieldCheck className="w-8 h-8 text-white" />
           </div>
           <h1 className="text-[28px] font-black text-white tracking-tight">Create Account</h1>
           <p className="text-slate-400 font-bold uppercase text-[11px] tracking-widest mt-1">Join Munasat B2B Platform</p>
        </div>

        <form onSubmit={handleSignup} className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[32px] p-8 shadow-3xl">
           <div className="grid grid-cols-1 gap-4">
              <div className="relative">
                 <User className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
                 <input 
                   type="text" 
                   required
                   className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-[#5d4aae]/50 transition-all font-bold"
                   placeholder="Full Name"
                   onChange={(e) => setFormData({...formData, name: e.target.value})}
                 />
              </div>

              <div className="relative">
                 <Mail className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
                 <input 
                   type="email" 
                   required
                   className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-[#5d4aae]/50 transition-all font-bold"
                   placeholder="Email Address"
                   onChange={(e) => setFormData({...formData, email: e.target.value})}
                 />
              </div>

              <div className="relative">
                 <Phone className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
                 <input 
                   type="tel" 
                   required
                   className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-[#5d4aae]/50 transition-all font-bold"
                   placeholder="Phone Number (for OTP)"
                   onChange={(e) => setFormData({...formData, phone: e.target.value})}
                 />
              </div>

              <div className="relative">
                 <Lock className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
                 <input 
                   type="password" 
                   required
                   className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-[#5d4aae]/50 transition-all font-bold"
                   placeholder="Create Password"
                   onChange={(e) => setFormData({...formData, password: e.target.value})}
                 />
              </div>
           </div>

           <button 
             type="submit" 
             disabled={loading}
             className="w-full bg-[#5d4aae] hover:bg-indigo-600 text-white rounded-2xl py-5 mt-8 font-black text-[16px] flex items-center justify-center space-x-3 transition-all shadow-xl shadow-indigo-500/20"
           >
             {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : <span>Complete Registration</span>}
           </button>

           <div className="mt-8 text-center">
             <p className="text-slate-400 text-[14px] font-medium">Already have an account? <Link href="/login" className="text-[#5d4aae] font-black hover:underline">Log In</Link></p>
           </div>
        </form>
      </div>
    </div>
  );
}
