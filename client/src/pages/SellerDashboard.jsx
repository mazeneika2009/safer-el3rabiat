import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UploadCloud, CheckCircle, CarFront, Gauge, Calendar, Milestone, Image as ImageIcon, ChevronLeft, LogOut, DollarSign, PaintBucket, Tag } from 'lucide-react';

export default function SellerDashboard() {
  const navigate = useNavigate();
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    // Simulate API call delay
    setTimeout(() => {
      alert("Car listed successfully!");
      setIsSubmitted(false);
      navigate('/'); 
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-300 font-sans tracking-wide selection:bg-cyan-500/30 selection:text-cyan-200">
      
      {/* Sleek Header */}
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

          <div className="flex items-center gap-6">
            <button 
              onClick={() => navigate('/')} 
              className="flex items-center gap-2 text-sm font-medium text-zinc-400 hover:text-white transition-colors"
            >
              <LogOut className="w-4 h-4 text-zinc-500" /> Sign Out
            </button>
          </div>
        </div>
      </header>

      {/* Main Form Area */}
      <main className="max-w-screen-md mx-auto px-4 py-12">
        <div className="mb-10">
          <button 
            onClick={() => navigate(-1)} 
            className="flex items-center gap-2 text-xs font-semibold tracking-widest text-zinc-500 hover:text-white uppercase transition-colors mb-6"
          >
            <ChevronLeft className="w-4 h-4" /> Return to Listings
          </button>
          
          <h1 className="text-3xl md:text-4xl font-bold text-white tracking-widest uppercase">
            List Your Vehicle
          </h1>
          <p className="text-zinc-500 mt-2 text-sm font-medium">Add high quality details for premium buyers.</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-zinc-900/40 border border-zinc-800/80 rounded-3xl p-6 md:p-10 backdrop-blur-sm shadow-2xl">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
            
            <div className="space-y-2">
              <label className="text-xs font-semibold text-zinc-500 tracking-widest uppercase flex items-center gap-2">
                <CarFront className="w-3.5 h-3.5 text-zinc-600" /> Make
              </label>
              <input required type="text" placeholder="e.g. BMW" className="w-full p-3.5 bg-zinc-900 border border-zinc-800 rounded-xl focus:ring-1 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all text-sm text-white placeholder-zinc-600" />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold text-zinc-500 tracking-widest uppercase flex items-center gap-2">
                <Tag className="w-3.5 h-3.5 text-zinc-600" /> Model
              </label>
              <input required type="text" placeholder="e.g. M3 Competition" className="w-full p-3.5 bg-zinc-900 border border-zinc-800 rounded-xl focus:ring-1 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all text-sm text-white placeholder-zinc-600" />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold text-zinc-500 tracking-widest uppercase flex items-center gap-2">
                <Calendar className="w-3.5 h-3.5 text-zinc-600" /> Production Year
              </label>
              <input required type="number" min="1990" max="2025" placeholder="e.g. 2024" className="w-full p-3.5 bg-zinc-900 border border-zinc-800 rounded-xl focus:ring-1 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all text-sm text-white placeholder-zinc-600" />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold text-zinc-500 tracking-widest uppercase flex items-center gap-2">
                <PaintBucket className="w-3.5 h-3.5 text-zinc-600" /> Exterior Color
              </label>
              <input required type="text" placeholder="e.g. Black Sapphire" className="w-full p-3.5 bg-zinc-900 border border-zinc-800 rounded-xl focus:ring-1 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all text-sm text-white placeholder-zinc-600" />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold text-zinc-500 tracking-widest uppercase flex items-center gap-2">
                <Milestone className="w-3.5 h-3.5 text-zinc-600" /> Current Mileage
              </label>
              <input required type="number" placeholder="e.g. 10000" className="w-full p-3.5 bg-zinc-900 border border-zinc-800 rounded-xl focus:ring-1 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all text-sm text-white placeholder-zinc-600" />
            </div>

            <div className="space-y-2 relative">
              <label className="text-xs font-semibold text-zinc-500 tracking-widest uppercase flex items-center gap-2">
                <DollarSign className="w-3.5 h-3.5 text-zinc-600" /> Asking Price
              </label>
              <input required type="number" placeholder="e.g. 50000" className="w-full p-3.5 pl-4 bg-zinc-900 border border-zinc-800 rounded-xl focus:ring-1 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all text-sm text-white placeholder-zinc-600" />
            </div>
            
            <div className="space-y-2 md:col-span-2 mt-2">
              <label className="text-xs font-semibold text-zinc-500 tracking-widest uppercase flex items-center gap-2">
                Description / Condition
              </label>
              <textarea required rows="4" placeholder="Briefly detail features, condition, or maintenance history..." className="w-full p-3.5 bg-zinc-900 border border-zinc-800 rounded-xl focus:ring-1 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all text-sm text-white placeholder-zinc-600 resize-none" />
            </div>

            <div className="space-y-2 md:col-span-2">
              <label className="text-xs font-semibold text-zinc-500 tracking-widest uppercase flex items-center gap-2">
                <ImageIcon className="w-3.5 h-3.5 text-zinc-600" /> Studio Image Upload
              </label>
              <div className="border border-dashed border-zinc-700 bg-zinc-900/50 hover:bg-zinc-900 rounded-2xl p-8 flex flex-col items-center justify-center transition-colors cursor-pointer group">
                <input type="file" className="hidden" id="photo-upload" accept="image/*" />
                <label htmlFor="photo-upload" className="cursor-pointer flex flex-col items-center w-full h-full">
                  <div className="w-12 h-12 rounded-full bg-zinc-800 flex items-center justify-center mb-4 group-hover:bg-zinc-700 transition-colors">
                    <UploadCloud className="w-5 h-5 text-zinc-400 group-hover:text-white" />
                  </div>
                  <span className="text-sm font-semibold text-zinc-300">Click to attach photography</span>
                  <span className="text-xs text-zinc-600 mt-2 uppercase tracking-widest">Supports JPG, PNG (Max 10MB)</span>
                </label>
              </div>
            </div>

          </div>

          <div className="pt-8 mt-6 border-t border-zinc-800/80 flex flex-col sm:flex-row gap-4">
            <button
              type="reset"
              className="px-6 py-4 border border-zinc-800 bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white font-bold text-sm tracking-widest uppercase rounded-xl transition-all"
            >
              Reset Details
            </button>
            <button
              type="submit"
              disabled={isSubmitted}
              className="flex-1 px-6 py-4 bg-zinc-100 hover:bg-white text-zinc-900 font-bold text-sm tracking-widest uppercase rounded-xl transition-all disabled:opacity-70 flex items-center justify-center gap-3"
            >
              {isSubmitted ? (
                <>Processing Request...</>
              ) : (
                <><CheckCircle className="w-5 h-5" /> Submit Listing for Review</>
              )}
            </button>
          </div>
          
        </form>
      </main>
    </div>
  );
}
