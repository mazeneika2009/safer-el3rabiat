import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Mail, Lock, ArrowRight, Gauge, ChevronLeft } from 'lucide-react';
import { postData } from '../services/api';

export default function Login() {
  const [role, setRole] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegister, setIsRegister] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!role) { setError('Please choose a role (Buyer or Seller)'); return; }
    setLoading(true);
    try {
      const endpoint = isRegister ? '/users/register' : '/users/login';
      const body = isRegister
        ? { name, email, password, role: role === 'buyer' ? 'user' : 'seller' }
        : { email, password };
      const data = await postData(endpoint, body);
      localStorage.setItem('user', JSON.stringify(data.user));
      localStorage.setItem('token', data.token);
      if (data.user.role === 'admin' || data.user.role === 'seller') {
        navigate(`/profile/${data.user.id}`);
      } else {
        navigate('/');
      }
    } catch (err) {
      setError(err.message || 'Authentication failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-300 font-sans tracking-wide selection:bg-cyan-500/30 selection:text-cyan-200 flex flex-col relative overflow-hidden">
      <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-cyan-900/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-zinc-800/30 rounded-full blur-[100px] pointer-events-none" />

      <header className="absolute top-0 w-full p-6 z-20">
        <button onClick={() => navigate('/')} className="flex items-center gap-2 text-sm font-semibold text-zinc-500 hover:text-white transition-colors">
          <ChevronLeft className="w-4 h-4" /> Back to Home
        </button>
      </header>

      <div className="flex-1 flex flex-col items-center justify-center p-4 z-10">
        <div className="mb-10 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-zinc-900 border border-zinc-800 shadow-xl mb-6 shadow-cyan-900/10">
            <Gauge className="w-8 h-8 text-cyan-400" />
          </div>
          <h1 className="text-3xl font-bold text-white tracking-widest uppercase">
            SAFER<span className="text-zinc-600 font-light ml-1">EL3RBIAT</span>
          </h1>
          <p className="text-zinc-500 mt-3 text-sm font-medium tracking-widest uppercase">
            {isRegister ? 'Create Your Account' : 'Sign In to Your Account'}
          </p>
        </div>

        <div className="w-full max-w-md bg-zinc-900/40 border border-zinc-800/80 rounded-3xl p-8 backdrop-blur-xl shadow-2xl">
          {error && (
            <div className="mb-4 p-3 bg-red-950/30 border border-red-800/50 rounded-xl text-red-400 text-sm font-medium">
              {error}
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              {isRegister && (
                <div className="relative group/input">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-zinc-600 group-focus-within/input:text-cyan-400 transition-colors" />
                  </div>
                  <input type="text" required value={name} onChange={e => setName(e.target.value)} className="w-full pl-11 pr-4 py-3 bg-zinc-900 border border-zinc-800 rounded-xl text-sm text-zinc-200 placeholder-zinc-500 focus:outline-none focus:ring-1 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all shadow-inner" placeholder="Full Name" />
                </div>
              )}
              <div className="relative group/input">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-zinc-600 group-focus-within/input:text-cyan-400 transition-colors" />
                </div>
                <input type="email" required value={email} onChange={e => setEmail(e.target.value)} className="w-full pl-11 pr-4 py-3 bg-zinc-900 border border-zinc-800 rounded-xl text-sm text-zinc-200 placeholder-zinc-500 focus:outline-none focus:ring-1 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all shadow-inner" placeholder="Email Address" />
              </div>
              <div className="relative group/input">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-zinc-600 group-focus-within/input:text-cyan-400 transition-colors" />
                </div>
                <input type="password" required value={password} onChange={e => setPassword(e.target.value)} className="w-full pl-11 pr-4 py-3 bg-zinc-900 border border-zinc-800 rounded-xl text-sm text-zinc-200 placeholder-zinc-500 focus:outline-none focus:ring-1 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all shadow-inner" placeholder="Password" />
              </div>
            </div>

            <div className="pt-4 border-t border-zinc-800">
              <label className="block text-xs font-semibold text-zinc-500 mb-4 tracking-widest text-center uppercase">Select Your Role</label>
              <div className="grid grid-cols-2 gap-4">
                {[{ val: 'buyer', label: 'Login to Buy' }, { val: 'seller', label: 'Login to Sell' }].map(({ val, label }) => (
                  <label key={val} className={`flex items-center justify-center px-4 py-3.5 rounded-xl border cursor-pointer transition-all duration-300 text-sm font-bold tracking-wide ${role === val ? val === 'buyer' ? 'border-cyan-500/50 bg-cyan-900/20 text-cyan-400' : 'border-zinc-500/50 bg-zinc-800 text-white' : 'border-zinc-800 bg-zinc-900 text-zinc-500 hover:text-zinc-300 hover:border-zinc-700'}`}>
                    <input type="radio" name="role" value={val} className="sr-only" onChange={() => setRole(val)} />
                    {label}
                  </label>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-4 pt-4">
              <button type="submit" disabled={loading} className="w-full py-3.5 px-4 bg-zinc-100 hover:bg-white text-zinc-900 font-bold tracking-widest uppercase text-sm rounded-xl transition-all duration-300 flex items-center justify-center gap-2 group/btn disabled:opacity-70">
                {loading ? 'Processing...' : isRegister ? 'Create Account' : 'Sign In'}
                {!loading && <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />}
              </button>

              <div className="text-center">
                <button type="button" onClick={() => setIsRegister(!isRegister)} className="text-xs text-zinc-500 hover:text-zinc-300 font-medium transition-colors">
                  {isRegister ? 'Already have an account? Sign In' : "Don't have an account? Register"}
                </button>
              </div>

              <div className="text-center text-[10px] text-zinc-600 uppercase tracking-widest">
                Demo: ahmed@example.com / pass123
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}