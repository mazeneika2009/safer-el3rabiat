import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  UploadCloud, CheckCircle, CarFront, Gauge, Calendar, Milestone,
  Image as ImageIcon, ChevronLeft, LogOut, DollarSign, PaintBucket, Tag, Phone
} from 'lucide-react'; // Assuming UploadCloud is for a generic upload icon, but ImageIcon is more specific for image file input.
import { postData, uploadFile } from '../services/api'; // Assuming a new uploadFile function in api.js

export default function SellerDashboard() {
  const navigate = useNavigate();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState({
    make: '',
    model: '',
    year: '',
    color: '',
    mileage: '',
    price: '',
    description: '',
    phone: ''
  });
  const [selectedFile, setSelectedFile] = useState(null); // State to hold the selected file object

  const user = JSON.parse(localStorage.getItem('user') || 'null');

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsSubmitted(true);

    let finalImageUrl = '';

    try {
      if (!selectedFile) {
        setError('Please upload an image for the car.');
        setIsSubmitted(false);
        return;
      }

      const formData = new FormData();
      formData.append('image', selectedFile); // 'image' is the field name the backend expects

      // Upload the image first
      const uploadResponse = await uploadFile('/upload/image', formData); // This endpoint needs to be created on the backend
      finalImageUrl = uploadResponse.imageUrl; // Assuming the backend returns { imageUrl: '...' }

      // Then submit the car data with the received image URL
      await postData('/cars', { ...form, image_url: finalImageUrl, user_id: user?.id });
      alert('Car listed successfully!');
      navigate(`/profile/${user?.id}`); // Navigate to user profile to see new listing
    } catch (err) {
      setError(err.message || 'Failed to list car');
      setIsSubmitted(false);
    }
  };

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
          <button onClick={() => { localStorage.removeItem('user'); navigate('/'); }} className="flex items-center gap-2 text-sm font-medium text-zinc-400 hover:text-white transition-colors">
            <LogOut className="w-4 h-4 text-zinc-500" /> Sign Out
          </button>
        </div>
      </header>

      <main className="max-w-screen-md mx-auto px-4 py-12">
        <div className="mb-10">
          <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-xs font-semibold tracking-widest text-zinc-500 hover:text-white uppercase transition-colors mb-6">
            <ChevronLeft className="w-4 h-4" /> Return to Listings
          </button>
          <h1 className="text-3xl md:text-4xl font-bold text-white tracking-widest uppercase">List Your Vehicle</h1>
          <p className="text-zinc-500 mt-2 text-sm font-medium">Add high quality details for premium buyers.</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-950/30 border border-red-800/50 rounded-xl text-red-400 text-sm font-medium">{error}</div>
        )}

        <form onSubmit={handleSubmit} className="bg-zinc-900/40 border border-zinc-800/80 rounded-3xl p-6 md:p-10 backdrop-blur-sm shadow-2xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">

            {[
              { name: 'make', icon: <CarFront className="w-3.5 h-3.5 text-zinc-600" />, label: 'Make', placeholder: 'e.g., BMW', type: 'text' },
              { name: 'model', icon: <Tag className="w-3.5 h-3.5 text-zinc-600" />, label: 'Model', placeholder: 'e.g., M3 Competition', type: 'text' },
              { name: 'year', icon: <Calendar className="w-3.5 h-3.5 text-zinc-600" />, label: 'Production Year', placeholder: 'e.g., 2024', type: 'number' },
              { name: 'color', icon: <PaintBucket className="w-3.5 h-3.5 text-zinc-600" />, label: 'Exterior Color', placeholder: 'e.g., Black Sapphire', type: 'text' },
              { name: 'mileage', icon: <Milestone className="w-3.5 h-3.5 text-zinc-600" />, label: 'Current Mileage', placeholder: 'e.g., 10000', type: 'number' },
              { name: 'price', icon: <DollarSign className="w-3.5 h-3.5 text-zinc-600" />, label: 'Asking Price', placeholder: 'e.g., 50000', type: 'number' },
              { name: 'phone', icon: <Phone className="w-3.5 h-3.5 text-zinc-600" />, label: 'Contact Phone', placeholder: 'e.g., 01094332602', type: 'text' },
              { name: 'image_file', icon: <ImageIcon className="w-3.5 h-3.5 text-zinc-600" />, label: 'Upload Image', type: 'file' } // Changed to file input
            ].map(({ name, icon, label, placeholder, type }) => (
              <div key={name} className="space-y-2">
                <label className="text-xs font-semibold text-zinc-500 tracking-widest uppercase flex items-center gap-2">
                  {icon} {label}
                </label>
                <input
                  required name={name} type={type} placeholder={placeholder}
                  // Conditional value/onChange for file input
                  {...(type === 'file' ? { onChange: (e) => setSelectedFile(e.target.files[0]) } : { value: form[name], onChange: handleChange })}
                  className="w-full p-3.5 bg-zinc-900 border border-zinc-800 rounded-xl focus:ring-1 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all text-sm text-white placeholder-zinc-600"
                />
              </div>
            ))}

            <div className="space-y-2 md:col-span-2 mt-2">
              <label className="text-xs font-semibold text-zinc-500 tracking-widest uppercase flex items-center gap-2">
                Description / Condition
              </label>
              <textarea required rows="4" name="description" placeholder="Briefly detail features, condition, or maintenance history..." value={form.description} onChange={handleChange} className="w-full p-3.5 bg-zinc-900 border border-zinc-800 rounded-xl focus:ring-1 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all text-sm text-white placeholder-zinc-600 resize-none" />
            </div>

          </div>

          <div className="pt-8 mt-6 border-t border-zinc-800/80 flex flex-col sm:flex-row gap-4">
            <button type="reset" onClick={() => { setForm({ make: '', model: '', year: '', color: '', mileage: '', price: '', description: '', phone: '' }); setSelectedFile(null); }} className="px-6 py-4 border border-zinc-800 bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white font-bold text-sm tracking-widest uppercase rounded-xl transition-all">
              Reset Details
            </button>
            <button type="submit" disabled={isSubmitted} className="flex-1 px-6 py-4 bg-zinc-100 hover:bg-white text-zinc-900 font-bold text-sm tracking-widest uppercase rounded-xl transition-all disabled:opacity-70 flex items-center justify-center gap-3">
              {isSubmitted ? 'Processing Request...' : <><CheckCircle className="w-5 h-5" /> Submit Listing for Review</>}
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}
