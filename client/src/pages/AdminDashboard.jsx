import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Users, Car, Banknote, Users2, ArrowUpRight, Gauge,
  LayoutDashboard, LogOut, ChevronLeft, Loader2, RefreshCcw, ShieldCheck
} from 'lucide-react';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getStats = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/stats');
      const data = await res.json();
      if (data.status === 'OK') {
        setStats(data.data);
        setError(null);
      } else {
        throw new Error(data.message || 'Unauthorized');
      }
    } catch (err) {
      setError('Platform metrics synchronization offline.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { getStats(); }, []);

  const kpiCards = [
    { id: 'users', title: 'Global Scale', label: 'Total Registered Users', value: stats?.totalUsers || 0, icon: <Users className="w-6 h-6 text-cyan-400" />, description: 'Total accounts across the platform' },
    { id: 'inventory', title: 'Current Inventory', label: 'Cars For Sale', value: stats?.carsForSale || 0, icon: <Car className="w-6 h-6 text-zinc-400" />, description: 'Active listings in the marketplace' },
    { id: 'sales', title: 'Closed Deals', label: 'Cars Sold', value: stats?.soldCars || 0, icon: <Banknote className="w-6 h-6 text-zinc-400" />, description: 'Successfully completed transactions' },
    { id: 'sellers', title: 'Seller Network', label: 'Total Sellers', value: stats?.totalSellers || 0, icon: <Users2 className="w-6 h-6 text-cyan-400" />, description: 'Unique verified vehicle owners' }
  ];

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-300 font-sans tracking-wide selection:bg-cyan-500/30 selection:text-cyan-200">
      <header className="border-b border-zinc-800/60 bg-zinc-950/80 backdrop-blur-xl sticky top-0 z-30">
        <div className="max-w-screen-2xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-zinc-900 border border-zinc-800 shadow-lg cursor-pointer" onClick={() => navigate('/')}>
              <Gauge className="w-5 h-5 text-cyan-400" />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl font-bold text-white tracking-wider">
                SAFER<span className="text-zinc-600 font-light ml-1">EL3RBIAT</span>
              </h1>
              <p className="text-[10px] uppercase tracking-[0.2em] text-zinc-500 font-bold -mt-1">Administrator Control Panel</p>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <button onClick={getStats} className="p-2.5 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-zinc-700 transition-all text-zinc-400 hover:text-white" title="Refresh Analytics">
              <RefreshCcw className={`w-4 h-4 ${loading ? 'animate-spin text-cyan-400' : ''}`} />
            </button>
            <div className="h-8 w-[1px] bg-zinc-800 hidden md:block" />
            <button onClick={() => navigate('/')} className="flex items-center gap-2 text-sm font-semibold text-zinc-500 hover:text-white transition-colors group">
              Sign Out <LogOut className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-screen-2xl mx-auto px-6 py-12">
        <div className="mb-12">
          <button onClick={() => navigate('/')} className="flex items-center gap-2 text-xs font-semibold tracking-widest text-zinc-600 hover:text-zinc-400 uppercase transition-colors mb-4">
            <ChevronLeft className="w-4 h-4" /> System Core
          </button>
          <div className="flex items-center gap-3 mb-2">
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-950/30 border border-cyan-800 text-[10px] font-bold text-cyan-500 uppercase tracking-widest">
              <ShieldCheck className="w-3 h-3" /> Secure Access
            </div>
          </div>
          <h2 className="text-4xl font-extrabold text-white tracking-tight">Executive Dashboard</h2>
          <p className="text-zinc-500 mt-2 font-medium max-w-xl">Real-time analytics and performance metrics for the Safer El3rbiat network.</p>
        </div>

        {error && (
          <div className="mb-8 p-4 bg-zinc-900 border border-zinc-800 rounded-2xl flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-yellow-500 animate-pulse" />
              <span className="text-zinc-400 text-sm font-medium">{error}</span>
            </div>
            <button onClick={getStats} className="text-xs font-bold text-cyan-400 hover:underline">Retry Connection</button>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {kpiCards.map(card => (
            <div key={card.id} className="bg-zinc-900/40 border border-zinc-800 p-6 rounded-3xl backdrop-blur-sm group hover:border-zinc-600 transition-all shadow-xl hover:shadow-cyan-900/5">
              <div className="flex items-start justify-between mb-8">
                <div className="p-3 bg-zinc-950 rounded-2xl border border-zinc-800 shadow-inner group-hover:bg-zinc-900 transition-colors">
                  {card.icon}
                </div>
                <div className="flex items-center gap-1 text-cyan-400 bg-cyan-500/5 px-2 py-1 rounded-lg border border-cyan-500/10">
                  <ArrowUpRight className="w-3 h-3" />
                  <span className="text-[10px] font-bold uppercase tracking-tighter">Live</span>
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-xs font-bold text-zinc-500 uppercase tracking-widest leading-none mb-2">{card.title}</p>
                {loading ? (
                  <div className="h-10 w-24 bg-zinc-800/50 rounded-lg animate-pulse mb-3" />
                ) : (
                  <h3 className="text-5xl font-black text-white tracking-tighter mb-4 tabular-nums">{card.value}</h3>
                )}
                <div className="pt-4 border-t border-zinc-800/50 mt-4">
                  <p className="text-zinc-400 font-bold text-sm leading-tight">{card.label}</p>
                  <p className="text-xs text-zinc-600 mt-1">{card.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-zinc-900/40 border border-zinc-800 p-8 rounded-3xl backdrop-blur-sm flex flex-col items-center justify-center text-center py-20 border-dashed">
            <div className="w-16 h-16 rounded-full bg-zinc-950 flex items-center justify-center mb-6">
              <LayoutDashboard className="w-8 h-8 text-zinc-800" />
            </div>
            <h4 className="text-white font-bold text-lg mb-2">Performance Visualizations Coming Soon</h4>
            <p className="text-zinc-500 text-sm max-w-sm mx-auto">We are currently aggregating historical data to generate trend charts and predictive analytics.</p>
            <div className="mt-8 flex gap-3">
              <div className="w-2 h-2 rounded-full bg-zinc-800" />
              <div className="w-2 h-2 rounded-full bg-zinc-800" />
              <div className="w-2 h-2 rounded-full bg-zinc-800" />
            </div>
          </div>

          <div className="bg-zinc-900/40 border border-zinc-800 p-8 rounded-3xl backdrop-blur-sm flex flex-col justify-between">
            <div>
              <h4 className="text-white font-bold tracking-widest uppercase text-xs mb-6 opacity-30">System Integrity</h4>
              <div className="space-y-6">
                {[
                  { label: 'Database Node', status: 'Healthy', val: '0.4ms' },
                  { label: 'Image Engine', status: 'Active', val: '99.9%' },
                  { label: 'Auth Gateway', status: 'Stable', val: 'Low Latency' }
                ].map(s => (
                  <div key={s.label} className="flex items-center justify-between group">
                    <div>
                      <p className="text-sm font-bold text-zinc-300 group-hover:text-white transition-colors">{s.label}</p>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-600">{s.status}</p>
                    </div>
                    <span className="text-xs font-mono text-cyan-400/70">{s.val}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-12 pt-6 border-t border-zinc-800">
              <button className="w-full py-4 bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-bold tracking-widest uppercase rounded-2xl transition-all">
                Generate Report
              </button>
            </div>
          </div>
        </div>
      </main>

      {loading && stats === null && (
        <div className="fixed inset-0 bg-zinc-950/80 backdrop-blur-sm z-50 flex flex-col items-center justify-center">
          <Loader2 className="w-12 h-12 text-cyan-400 animate-spin mb-4" />
          <p className="text-zinc-500 font-bold text-xs uppercase tracking-[0.3em] animate-pulse">Syncing Control Panel</p>
        </div>
      )}
    </div>
  );
}
