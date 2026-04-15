import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  User, Mail, Calendar, Shield, Car, CheckCircle, Edit3,
  ChevronLeft, Loader2, LogOut, MapPin, ExternalLink, Phone, LayoutGrid, Gauge
} from 'lucide-react';
import { fetchData, putData } from '../services/api';

export default function UserProfile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [userCars, setUserCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({ name: '', email: '' });

  useEffect(() => {
    setLoading(true);
    Promise.all([fetchData(`/users/${id}`), fetchData(`/users/${id}/cars`)])
      .then(([userData, carsData]) => {
        setUser(userData);
        setUserCars(carsData);
        setEditForm({ name: userData.name, email: userData.email });
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [id]);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    try {
      const updated = await putData(`/users/${id}`, editForm);
      setUser(updated);
      const stored = JSON.parse(localStorage.getItem('user') || '{}');
      localStorage.setItem('user', JSON.stringify({ ...stored, ...updated }));
      setIsEditing(false);
    } catch (err) {
      alert('Failed to update profile.');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center">
        <Loader2 className="w-12 h-12 text-cyan-400 animate-spin mb-4" />
        <p className="text-zinc-500 font-bold text-xs uppercase tracking-[0.3em]">Loading Showroom</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-300 font-sans tracking-wide selection:bg-cyan-500/30 selection:text-cyan-200">
      <header className="border-b border-zinc-800/60 bg-zinc-950/80 backdrop-blur-xl sticky top-0 z-30">
        <div className="max-w-screen-xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-zinc-900 border border-zinc-800 shadow-lg cursor-pointer" onClick={() => navigate('/')}>
              <Gauge className="w-5 h-5 text-cyan-400" />
            </div>
            <h1 className="text-xl font-bold text-white tracking-wider hidden sm:block">
              SAFER<span className="text-zinc-600 font-light ml-1">EL3RBIAT</span>
            </h1>
          </div>
          <button onClick={() => { localStorage.removeItem('user'); navigate('/'); }} className="flex items-center gap-2 text-sm font-medium text-zinc-400 hover:text-white transition-colors">
            <LogOut className="w-4 h-4 text-zinc-500" /> Exit
          </button>
        </div>
      </header>

      <main className="max-w-screen-xl mx-auto px-6 py-12">
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-xs font-semibold tracking-widest text-zinc-500 hover:text-white uppercase transition-colors mb-10">
          <ChevronLeft className="w-4 h-4" /> Return to Discovery
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <aside className="lg:col-span-1 space-y-8">
            <div className="bg-zinc-900/40 border border-zinc-800 p-8 rounded-3xl backdrop-blur-sm relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 blur-3xl rounded-full -mr-16 -mt-16 group-hover:bg-cyan-500/10 transition-colors" />
              <div className="relative">
                <div className="w-20 h-20 rounded-2xl bg-zinc-800 border border-zinc-700 flex items-center justify-center mb-6 shadow-2xl">
                  <User className="w-10 h-10 text-cyan-400" />
                </div>
                {isEditing ? (
                  <form onSubmit={handleUpdateProfile} className="space-y-4">
                    <input type="text" value={editForm.name} onChange={(e) => setEditForm({ ...editForm, name: e.target.value })} className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-sm text-white focus:ring-1 focus:ring-cyan-500" placeholder="Display Name" />
                    <input type="email" value={editForm.email} onChange={(e) => setEditForm({ ...editForm, email: e.target.value })} className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-sm text-white focus:ring-1 focus:ring-cyan-500" placeholder="Email Address" />
                    <div className="flex gap-2 pt-2">
                      <button type="submit" className="flex-1 bg-white text-black text-xs font-bold py-3 rounded-xl uppercase tracking-widest">Save</button>
                      <button type="button" onClick={() => setIsEditing(false)} className="flex-1 border border-zinc-700 text-zinc-400 text-xs font-bold py-3 rounded-xl uppercase tracking-widest">Cancel</button>
                    </div>
                  </form>
                ) : (
                  <>
                    <h2 className="text-3xl font-bold text-white tracking-tight leading-none mb-2">{user?.name}</h2>
                    <div className="flex items-center gap-2 mb-6">
                      <span className="px-2.5 py-0.5 rounded-full bg-cyan-950/40 border border-cyan-800 text-[10px] font-bold text-cyan-500 uppercase tracking-widest">
                        {user?.role === 'admin' ? 'Elite Admin' : 'Verified Member'}
                      </span>
                    </div>
                    <div className="space-y-4 pt-6 border-t border-zinc-800/60">
                      <div className="flex items-center gap-3 text-sm text-zinc-400">
                        <Mail className="w-4 h-4 text-zinc-600" /> {user?.email}
                      </div>
                      <div className="flex items-center gap-3 text-sm text-zinc-400">
                        <Calendar className="w-4 h-4 text-zinc-600" />
                        Joined {user?.created_at ? new Date(user.created_at).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }) : 'N/A'}
                      </div>
                      <div className="flex items-center gap-3 text-sm text-zinc-400">
                        <Shield className="w-4 h-4 text-zinc-600" /> Multi-factor Auth Active
                      </div>
                    </div>
                    <button onClick={() => setIsEditing(true)} className="w-full mt-8 flex items-center justify-center gap-2 py-4 bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-bold tracking-widest uppercase rounded-2xl transition-all shadow-lg">
                      <Edit3 className="w-4 h-4" /> Customize Identity
                    </button>
                  </>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-zinc-900/40 border border-zinc-800 p-5 rounded-3xl text-center">
                <p className="text-2xl font-bold text-white mb-1">{userCars.length}</p>
                <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-[0.2em]">Active Listings</p>
              </div>
              <div className="bg-zinc-900/40 border border-zinc-800 p-5 rounded-3xl text-center">
                <p className="text-2xl font-bold text-white mb-1">{userCars.filter(c => c.sold).length}</p>
                <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-[0.2em]">Sold Deals</p>
              </div>
            </div>
          </aside>

          <section className="lg:col-span-2 space-y-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-1.5 h-8 bg-cyan-500 rounded-full" />
                <h3 className="text-2xl font-extrabold text-white tracking-widest uppercase">My Showroom</h3>
              </div>
              <button onClick={() => navigate('/seller')} className="flex items-center gap-2 text-xs font-bold text-cyan-400 hover:text-white transition-colors uppercase tracking-widest">
                <LayoutGrid className="w-4 h-4" /> Post New Listing
              </button>
            </div>

            {userCars.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {userCars.map(car => (
                  <div key={car.id} className="bg-zinc-900/40 rounded-3xl border border-zinc-800 overflow-hidden hover:border-zinc-700 transition-all group cursor-pointer" onClick={() => navigate(`/car/${car.id}`)}>
                    <div className="h-44 relative bg-zinc-800 overflow-hidden">
                      <img src={car.image_url} alt={car.model} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                      <div className="absolute top-4 right-4 px-3 py-1 bg-zinc-950/80 backdrop-blur-md rounded-lg border border-zinc-800 text-[10px] font-bold text-white uppercase tracking-widest">
                        ${Number(car.price || 0).toLocaleString()}
                      </div>
                    </div>
                    <div className="p-5">
                      <p className="text-[10px] font-bold text-cyan-500 uppercase tracking-widest mb-1">{car.make}</p>
                      <h4 className="text-lg font-bold text-white mb-4">{car.model}</h4>
                      <div className="flex items-center justify-between text-[10px] font-bold text-zinc-500 uppercase tracking-widest">
                        <div className="flex items-center gap-1.5">
                          <MapPin className="w-3.5 h-3.5 text-zinc-700" /> {car.year}
                        </div>
                        <span className="flex items-center gap-1 text-zinc-400">View Listing <ExternalLink className="w-3 h-3" /></span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-24 text-center border-2 border-dashed border-zinc-800 rounded-3xl bg-zinc-900/20">
                <div className="w-16 h-16 rounded-2xl bg-zinc-900 flex items-center justify-center mx-auto mb-6">
                  <Car className="w-8 h-8 text-zinc-700" />
                </div>
                <h4 className="text-white font-bold tracking-widest uppercase mb-2">Showroom is Empty</h4>
                <p className="text-zinc-500 text-sm max-w-xs mx-auto mb-8 font-medium">You haven't listed any vehicles yet. Start selling to build your portfolio.</p>
                <button onClick={() => navigate('/seller')} className="px-8 py-4 bg-white text-black text-xs font-bold tracking-widest uppercase rounded-2xl hover:scale-105 transition-transform">
                  Post First Vehicle
                </button>
              </div>
            )}
          </section>
        </div>
      </main>
    </div>
  );
}
