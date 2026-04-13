import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Mail, Lock, ArrowRight, Gauge, ChevronLeft } from 'lucide-react';
import { useGoogleLogin } from '@react-oauth/google';

export default function Login() {
  const [role, setRole] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (!role) {
      alert("Please choose a role (Buyer or Seller)");
      return;
    }
    if (role === 'buyer') {
      localStorage.setItem('user', JSON.stringify({ name: 'Active Buyer', role: 'user', id: 2 }));
      navigate('/');
    } else {
      localStorage.setItem('user', JSON.stringify({ name: 'Elite Seller', role: 'seller', id: 1 }));
      navigate('/profile/1');
    }
  };

  const loginWithGoogle = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      console.log("Google Auth Success:", tokenResponse);
      const mockUser = role === 'buyer' 
        ? { name: 'Verified Buyer', role: 'user', id: 2 }
        : { name: 'Verified Seller', role: 'seller', id: 1 };
      
      localStorage.setItem('user', JSON.stringify(mockUser));
      
      if (role === 'buyer') navigate('/');
      else navigate(`/profile/${mockUser.id}`);
    },
    onError: (error) => {
      console.error("Google Login Failed:", error);
      alert("Google Login Failed. Please try again.");
    }
  });

  const handleGoogleLogin = () => {
    if (!role) {
      alert("Please choose a role (Buyer or Seller) before continuing with Google.");
      return;
    }
    loginWithGoogle();
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-300 font-sans tracking-wide selection:bg-cyan-500/30 selection:text-cyan-200 flex flex-col relative overflow-hidden">
      
      {/* Background Decorators */}
      <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-cyan-900/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-zinc-800/30 rounded-full blur-[100px] pointer-events-none" />

      {/* Very Simple Header */}
      <header className="absolute top-0 w-full p-6 z-20">
        <button 
          onClick={() => navigate('/')} 
          className="flex items-center gap-2 text-sm font-semibold text-zinc-500 hover:text-white transition-colors"
        >
          <ChevronLeft className="w-4 h-4" /> Back to Home
        </button>
      </header>

      <div className="flex-1 flex flex-col items-center justify-center p-4 z-10">
        
        {/* Logo block */}
        <div className="mb-10 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-zinc-900 border border-zinc-800 shadow-xl mb-6 shadow-cyan-900/10 transform transition hover:scale-105">
            <Gauge className="w-8 h-8 text-cyan-400" />
          </div>
          <h1 className="text-3xl font-bold text-white tracking-widest uppercase">
            SAFER<span className="text-zinc-600 font-light ml-1">EL3RBIAT</span>
          </h1>
          <p className="text-zinc-500 mt-3 text-sm font-medium tracking-widest uppercase">
            Sign In to Your Account
          </p>
        </div>

        {/* Card Block */}
        <div className="w-full max-w-md bg-zinc-900/40 border border-zinc-800/80 rounded-3xl p-8 backdrop-blur-xl shadow-2xl">
          
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-4">
              
              <div className="relative group/input">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-zinc-600 group-focus-within/input:text-cyan-400 transition-colors" />
                </div>
                <input
                  type="text"
                  required
                  className="w-full pl-11 pr-4 py-3 bg-zinc-900 border border-zinc-800 rounded-xl text-sm text-zinc-200 placeholder-zinc-500 focus:outline-none focus:ring-1 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all shadow-inner"
                  placeholder="Full Name"
                />
              </div>

              <div className="relative group/input">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-zinc-600 group-focus-within/input:text-cyan-400 transition-colors" />
                </div>
                <input
                  type="email"
                  required
                  className="w-full pl-11 pr-4 py-3 bg-zinc-900 border border-zinc-800 rounded-xl text-sm text-zinc-200 placeholder-zinc-500 focus:outline-none focus:ring-1 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all shadow-inner"
                  placeholder="Email Address"
                />
              </div>

              <div className="relative group/input">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-zinc-600 group-focus-within/input:text-cyan-400 transition-colors" />
                </div>
                <input
                  type="password"
                  required
                  className="w-full pl-11 pr-4 py-3 bg-zinc-900 border border-zinc-800 rounded-xl text-sm text-zinc-200 placeholder-zinc-500 focus:outline-none focus:ring-1 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all shadow-inner"
                  placeholder="Password"
                />
              </div>
            </div>

            <div className="pt-4 border-t border-zinc-800">
              <label className="block text-xs font-semibold text-zinc-500 mb-4 tracking-widest text-center uppercase">
                Select Your Role
              </label>
              
              <div className="grid grid-cols-2 gap-4">
                <label className={`
                  flex items-center justify-center px-4 py-3.5 rounded-xl border cursor-pointer transition-all duration-300 text-sm font-bold tracking-wide
                  ${role === 'buyer' 
                    ? 'border-cyan-500/50 bg-cyan-900/20 text-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.05)]' 
                    : 'border-zinc-800 bg-zinc-900 text-zinc-500 hover:text-zinc-300 hover:border-zinc-700'}
                `}>
                  <input
                    type="radio"
                    name="role"
                    value="buyer"
                    className="sr-only"
                    onChange={(e) => setRole(e.target.value)}
                  />
                  <span>Login to Buy</span>
                </label>

                <label className={`
                  flex items-center justify-center px-4 py-3.5 rounded-xl border cursor-pointer transition-all duration-300 text-sm font-bold tracking-wide
                  ${role === 'seller' 
                    ? 'border-zinc-500/50 bg-zinc-800 text-white shadow-[0_0_15px_rgba(255,255,255,0.05)]' 
                    : 'border-zinc-800 bg-zinc-900 text-zinc-500 hover:text-zinc-300 hover:border-zinc-700'}
                `}>
                  <input
                    type="radio"
                    name="role"
                    value="seller"
                    className="sr-only"
                    onChange={(e) => setRole(e.target.value)}
                  />
                  <span>Login to Sell</span>
                </label>
              </div>
            </div>

            <div className="flex flex-col gap-4 pt-4">
              <button
                type="submit"
                className="w-full py-3.5 px-4 bg-zinc-100 hover:bg-white text-zinc-900 font-bold tracking-widest uppercase text-sm rounded-xl transition-all duration-300 flex items-center justify-center gap-2 group/btn"
              >
                Sign In
                <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
              </button>

              <div className="relative py-4">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-zinc-800"></div>
                </div>
                <div className="relative flex justify-center text-[10px] uppercase tracking-[0.2em] font-bold">
                  <span className="bg-[#121214] px-4 text-zinc-600">Or Continue With</span>
                </div>
              </div>

              <button
                type="button"
                onClick={handleGoogleLogin}
                className="w-full py-3.5 px-4 bg-zinc-900/50 border border-zinc-800 hover:border-zinc-700 text-zinc-300 hover:text-white font-bold tracking-widest uppercase text-xs rounded-xl transition-all duration-300 flex items-center justify-center gap-3 group/google"
              >
                <svg className="w-4 h-4 transition-transform group-hover/google:scale-110" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="currentColor"
                    d="M5.84 14.1c-.22-.66-.35-1.36-.35-2.1s.13-1.44.35-2.1V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l3.66-2.84z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                Google
              </button>
            </div>
            
          </form>
        </div>
        
      </div>
    </div>
  );
}
