import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchData } from '../services/api';
import { Phone, ChevronLeft, Gauge, Calendar, Milestone, PaintBucket, UserCircle, Tag, CheckCircle } from 'lucide-react';

export default function CarDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchData(`/cars/${id}`)
      .then(data => setCar(data))
      .catch(() => setError('Global Asset Registry offline.'))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center text-zinc-300">
        <div className="w-12 h-12 border-4 border-cyan-500/30 border-t-cyan-500 rounded-full animate-spin" />
        <p className="mt-4 text-sm font-medium tracking-widest uppercase text-zinc-500">Loading Specifications...</p>
      </div>
    );
  }

  if (!car) {
    return (
      <div className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center text-zinc-300 px-6 text-center">
        <div className="w-20 h-20 bg-zinc-900 rounded-3xl flex items-center justify-center mb-8 border border-zinc-800 shadow-2xl">
          <Tag className="w-10 h-10 text-zinc-700" />
        </div>
        <h2 className="text-3xl font-extrabold text-white mb-3 tracking-tight">Vehicle Not Found</h2>
        <p className="text-zinc-500 text-sm max-w-xs mb-8">The vehicle you are looking for might have been sold or removed from our inventory.</p>
        <button onClick={() => navigate('/')} className="px-8 py-3 bg-zinc-100 text-zinc-900 font-bold rounded-2xl hover:bg-white transition-all shadow-xl">
          Return to Inventory
        </button>
      </div>
    );
  }

  const specs = [
    { icon: <Calendar className="w-4 h-4" />, label: 'Year', value: car.year },
    { icon: <Milestone className="w-4 h-4" />, label: 'Mileage', value: `${(car.mileage || 0).toLocaleString()} mi` },
    { icon: <PaintBucket className="w-4 h-4" />, label: 'Color', value: car.color || 'N/A' },
    { icon: <Tag className="w-4 h-4" />, label: 'Model', value: car.model }
  ];

  const phone = car.phone || '01094332602';
  const waPhone = phone.replace(/\s+/g, '').replace('+', '');

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-300 font-sans tracking-wide selection:bg-cyan-500/30 selection:text-cyan-200">
      <header className="border-b border-zinc-800/60 bg-zinc-950/80 backdrop-blur-xl sticky top-0 z-30">
        <div className="max-w-screen-xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-zinc-900 border border-zinc-800 shadow-lg cursor-pointer" onClick={() => navigate('/')}>
              <Gauge className="w-5 h-5 text-cyan-400" />
            </div>
            <h1 className="text-xl md:text-2xl font-bold text-white tracking-wider cursor-pointer" onClick={() => navigate('/')}>
              SAFER<span className="text-zinc-600 font-light ml-1">EL3RBIAT</span>
            </h1>
          </div>
          <button onClick={() => navigate('/login')} className="flex items-center gap-2 text-sm font-medium text-zinc-400 hover:text-white transition-colors group">
            Sign In <UserCircle className="w-6 h-6 text-zinc-500 group-hover:text-cyan-400 transition-colors" />
          </button>
        </div>
      </header>

      <main className="max-w-screen-xl mx-auto px-4 md:px-6 py-10">
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-xs font-semibold tracking-widest text-zinc-500 hover:text-white uppercase transition-colors mb-8 group">
          <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to Inventory
        </button>

        {error && (
          <div className="mb-6 p-3 bg-zinc-900 border border-zinc-800 text-zinc-500 text-xs font-medium rounded-xl flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-yellow-500/50 animate-pulse" /> {error}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
          <div className="space-y-4">
            <div className="relative w-full h-80 md:h-[480px] rounded-3xl overflow-hidden border border-zinc-800 bg-zinc-900 shadow-2xl group/img">
              <img src={car.image_url} alt={`${car.make} ${car.model}`} className="w-full h-full object-cover transition-transform duration-700 group-hover/img:scale-[1.02]" />
              <div className="absolute top-4 right-4 bg-zinc-900/90 backdrop-blur-md px-4 py-2 rounded-xl border border-zinc-700 text-white font-extrabold text-xl shadow-xl border-b-2 border-b-cyan-500">
                ${Number(car.price || 0).toLocaleString()}
              </div>
              {car.mileage === 0 && (
                <div className="absolute top-4 left-4 bg-cyan-500 px-3 py-1 rounded-lg text-xs font-bold text-white uppercase tracking-widest shadow-lg">
                  Brand New
                </div>
              )}
            </div>
            <div className="flex items-center gap-3 px-2">
              <div className="w-7 h-7 rounded-full border-2 border-zinc-700 shadow-inner" style={{ backgroundColor: (car.color || 'white').toLowerCase() }} />
              <span className="capitalize text-sm font-medium text-zinc-400">{car.color || 'N/A'} Exterior</span>
            </div>
          </div>

          <div className="flex flex-col justify-between gap-8">
            <div>
              <p className="text-xs text-cyan-500 font-bold uppercase tracking-[4px] mb-2">{car.make}</p>
              <h2 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-1">{car.model}</h2>
              <p className="text-zinc-500 font-medium">{car.year} Model Year</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {specs.map(spec => (
                <div key={spec.label} className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-5 flex flex-col gap-2 hover:border-zinc-700 transition-colors">
                  <div className="flex items-center gap-2 text-zinc-500 text-xs font-semibold uppercase tracking-widest">
                    {spec.icon} {spec.label}
                  </div>
                  <span className="text-white font-bold text-lg capitalize">{spec.value}</span>
                </div>
              ))}
            </div>

            <div className="bg-zinc-900/30 border border-zinc-800/60 rounded-2xl p-6">
              <h3 className="text-xs font-semibold text-zinc-500 uppercase tracking-widest mb-3">About This Vehicle</h3>
              <p className="text-zinc-300 text-sm leading-relaxed">{car.description || 'No description available for this vehicle.'}</p>
            </div>

            <div className="space-y-2">
              {['Verified Listing', 'Direct Seller Contact', 'No Hidden Fees'].map(item => (
                <div key={item} className="flex items-center gap-3 text-sm text-zinc-400">
                  <CheckCircle className="w-4 h-4 text-cyan-500 flex-shrink-0" /> {item}
                </div>
              ))}
            </div>

            <div className="space-y-4 pt-4 border-t border-zinc-800">
              <a href={`tel:${phone}`} className="flex items-center justify-between w-full py-5 px-6 bg-zinc-100 hover:bg-white text-zinc-900 font-extrabold text-sm tracking-widest uppercase rounded-2xl transition-all shadow-xl hover:shadow-white/10 group/btn">
                <span className="flex items-center gap-3"><Phone className="w-5 h-5" /> Contact Seller</span>
                <span className="text-base font-bold tracking-normal normal-case">{phone}</span>
              </a>
              <a href={`https://wa.me/${waPhone}`} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-full py-5 px-6 bg-[#25D366] hover:bg-[#20bd5a] text-white font-extrabold text-sm tracking-widest uppercase rounded-2xl transition-all shadow-xl hover:shadow-green-500/20 gap-3">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                WhatsApp Us
              </a>
              <button onClick={() => navigate('/')} className="w-full py-4 px-6 border border-zinc-800 hover:border-zinc-700 text-zinc-500 hover:text-zinc-300 font-semibold text-xs tracking-widest uppercase rounded-2xl transition-all">
                Browse Alternative Inventory
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
