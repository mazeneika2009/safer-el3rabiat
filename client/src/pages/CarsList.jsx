import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Filter, Phone, Search, UserCircle, Gauge, Calendar as CalIcon, MapPin, SlidersHorizontal, ChevronRight, ArrowRight, LogOut } from 'lucide-react';
import { fetchData } from '../services/api';

const CAR_DATA = {
  "Acura": ["ILX", "Integra", "MDX", "NSX", "RDX", "RLX", "TLX"],
  "Alfa Romeo": ["Giulia", "Stelvio", "Tonale", "4C"],
  "Aston Martin": ["DB11", "DBX", "Vantage", "DBS", "Valhalla"],
  "Audi": ["A3", "A4", "A5", "A6", "A7", "A8", "Q3", "Q5", "Q7", "Q8", "e-tron", "R8", "TT"],
  "Bentley": ["Bentayga", "Continental GT", "Flying Spur", "Mulsanne"],
  "BMW": ["1 Series", "2 Series", "3 Series", "4 Series", "5 Series", "7 Series", "8 Series", "X1", "X3", "X5", "X7", "M2", "M3", "M4", "M5", "i4", "iX"],
  "Bugatti": ["Chiron", "Divo", "Veyron", "Bolide"],
  "Buick": ["Enclave", "Encore", "Envision", "Regal"],
  "BYD": ["Atto 3", "Dolphin", "Han", "Seal", "Tang"],
  "Cadillac": ["CT4", "CT5", "Escalade", "Lyriq", "XT4", "XT5", "XT6"],
  "Chevrolet": ["Blazer", "Camaro", "Colorado", "Corvette", "Equinox", "Malibu", "Silverado", "Suburban", "Tahoe", "Bolt EV"],
  "Chrysler": ["300", "Pacifica", "Voyager"],
  "Dodge": ["Challenger", "Charger", "Durango", "Hornet"],
  "Ferrari": ["296 GTB", "812 Superfast", "F8 Tributo", "Purosangue", "Roma", "SF90 Stradale"],
  "Fiat": ["500", "500X", "Panda", "Tipo"],
  "Ford": ["Bronco", "Edge", "Escape", "Expedition", "Explorer", "F-150", "Mustang", "Mustang Mach-E", "Ranger"],
  "Genesis": ["G70", "G80", "G90", "GV60", "GV70", "GV80"],
  "GMC": ["Acadia", "Canyon", "Hummer EV", "Sierra", "Terrain", "Yukon"],
  "Honda": ["Accord", "Amaze", "City", "Civic", "CR-V", "HR-V", "Odyssey", "Pilot", "Ridgeline"],
  "Hyundai": ["Elantra", "Ioniq 5", "Ioniq 6", "Kona", "Palisade", "Santa Fe", "Sonata", "Tucson"],
  "Infiniti": ["Q50", "Q60", "QX50", "QX55", "QX60", "QX80"],
  "Jaguar": ["E-PACE", "F-PACE", "F-TYPE", "I-PACE", "XE", "XF"],
  "Jeep": ["Cherokee", "Compass", "Gladiator", "Grand Cherokee", "Renegade", "Wrangler"],
  "Kia": ["Carnival", "EV6", "EV9", "Forte", "K5", "Niro", "Picanto", "Rio", "Seltos", "Sorento", "Sportage", "Stinger", "Telluride"],
  "Lamborghini": ["Aventador", "Huracán", "Revuelto", "Urus"],
  "Land Rover": ["Defender", "Discovery", "Range Rover", "Range Rover Evoque", "Range Rover Sport", "Range Rover Velar"],
  "Lexus": ["ES", "GX", "IS", "LC", "LS", "LX", "NX", "RC", "RX", "UX"],
  "Lincoln": ["Aviator", "Corsair", "Nautilus", "Navigator"],
  "Maserati": ["Ghibli", "Grecale", "Levante", "MC20", "Quattroporte"],
  "Mazda": ["CX-30", "CX-5", "CX-50", "CX-9", "CX-90", "Mazda3", "Mazda6", "MX-5 Miata"],
  "McLaren": ["570S", "720S", "750S", "Artura", "GT", "P1"],
  "Mercedes-Benz": ["A-Class", "C-Class", "E-Class", "S-Class", "G-Class", "GLA", "GLC", "GLE", "GLS", "EQE", "EQS", "AMG GT"],
  "MG": ["MG3", "MG4", "MG5", "HS", "ZS"],
  "Mini": ["Clubman", "Countryman", "Cooper"],
  "Mitsubishi": ["Eclipse Cross", "Mirage", "Outlander", "Pajero"],
  "Nissan": ["Altima", "Ariya", "Frontier", "GT-R", "Kicks", "Leaf", "Maxima", "Murano", "Pathfinder", "Rogue", "Sentra", "Titan", "Z"],
  "Peugeot": ["208", "2008", "308", "3008", "508", "5008"],
  "Porsche": ["718 Boxster", "718 Cayman", "911", "Cayenne", "Macan", "Panamera", "Taycan"],
  "Ram": ["1500", "2500", "3500", "ProMaster"],
  "Renault": ["Captur", "Clio", "Koleos", "Megane", "Zoe"],
  "Rolls-Royce": ["Cullinan", "Dawn", "Ghost", "Phantom", "Spectre", "Wraith"],
  "Subaru": ["Ascent", "BRZ", "Crosstrek", "Forester", "Impreza", "Legacy", "Outback", "WRX"],
  "Suzuki": ["Baleno", "Ignis", "Jimny", "Swift", "Vitara"],
  "Tesla": ["Model 3", "Model S", "Model X", "Model Y", "Cybertruck", "Roadster"],
  "Toyota": ["4Runner", "Camry", "Corolla", "Crown", "Highlander", "Land Cruiser", "Prius", "RAV4", "Sequoia", "Sienna", "Supra", "Tacoma", "Tundra", "Yaris"],
  "Volkswagen": ["Arteon", "Atlas", "Golf", "ID.4", "Jetta", "Passat", "Taos", "Tiguan", "Touareg"],
  "Volvo": ["C40", "S60", "S90", "V60", "V90", "XC40", "XC60", "XC90"]
};

const COLORS = [
  "All", "White", "Black", "Silver", "Gray", "Red", "Blue", "Brown", "Green", "Yellow", "Orange", "Gold", "Purple", "Bronze", "Burgundy"
];

const CarsList = () => {
  const navigate = useNavigate();
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Filter States
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMake, setSelectedMake] = useState("");
  const [selectedModel, setSelectedModel] = useState("");
  const [activeColor, setActiveColor] = useState("All");
  const [condition, setCondition] = useState("All");

  useEffect(() => {
    const getCars = async () => {
      try {
        const data = await fetchData('/cars');
        setCars(data);
      } catch (err) {
        console.error('Failed to fetch cars:', err);
        setCars([]);
        setError('Inventory Synchronization offline.');
      } finally {
        setLoading(false);
      }
    };
    getCars();
  }, []);

  const handleMakeChange = (e) => {
    setSelectedMake(e.target.value);
    setSelectedModel('');
  };

  const filteredCars = cars.filter(car => {
    const matchesMake = selectedMake ? car.make?.toLowerCase() === selectedMake.toLowerCase() || car.brand?.toLowerCase() === selectedMake.toLowerCase() : true;
    const matchesModel = selectedModel ? car.model?.toLowerCase() === selectedModel.toLowerCase() : true;
    const matchesColor = activeColor === "All" ? true : car.color?.toLowerCase() === activeColor.toLowerCase();
    const matchesSearch = car.model?.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          car.make?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          car.brand?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCondition = condition === "All" ? true : condition === "New" ? car.mileage === 0 : car.mileage > 0;
    return matchesMake && matchesModel && matchesColor && matchesSearch && matchesCondition;
  });

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-300 font-sans tracking-wide selection:bg-cyan-500/30 selection:text-cyan-200">
      
      {/* Sleek Header */}
      <header className="border-b border-zinc-800/60 bg-zinc-950/80 backdrop-blur-xl sticky top-0 z-30">
        <div className="max-w-screen-2xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-zinc-900 border border-zinc-800 shadow-lg cursor-pointer" onClick={() => navigate('/')}>
               <Gauge className="w-5 h-5 text-cyan-400" />
            </div>
            <h1 className="text-xl md:text-2xl font-bold text-white tracking-wider cursor-pointer" onClick={() => navigate('/')}>
              SAFER<span className="text-zinc-600 font-light ml-1">EL3RBIAT</span>
            </h1>
          </div>

          <div className="flex items-center gap-6">
            <div className="hidden md:flex relative group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-zinc-500 group-focus-within:text-cyan-400 transition-colors" />
              </div>
              <input
                type="text"
                placeholder="Search inventory..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-72 pl-10 pr-4 py-2 bg-zinc-900/50 border border-zinc-800 rounded-full text-sm text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-cyan-500/50 focus:bg-zinc-900 transition-all shadow-inner"
              />
            </div>
            
            <button 
              onClick={() => navigate('/admin')} 
              className="hidden sm:flex items-center gap-2 text-xs font-bold text-zinc-500 hover:text-cyan-400 transition-colors uppercase tracking-[0.2em]"
            >
              Control
            </button>

            <button 
              onClick={() => navigate('/login')} 
              className="flex items-center gap-2 text-sm font-medium text-zinc-400 hover:text-white transition-colors group"
            >
              Sign In
              <UserCircle className="w-8 h-8 md:w-6 md:h-6 text-zinc-500 group-hover:text-cyan-400 transition-colors" />
            </button>

            <button 
              onClick={() => navigate('/profile/1')} 
              className="flex items-center justify-center w-10 h-10 rounded-full bg-zinc-900 border border-zinc-800 hover:border-cyan-500/50 transition-all group"
              title="My Profile"
            >
              <UserCircle className="w-6 h-6 text-zinc-600 group-hover:text-cyan-400 transition-colors" />
            </button>
            
            {localStorage.getItem('user') && (
              <button 
                onClick={() => { localStorage.removeItem('user'); navigate('/login'); }} 
                className="hidden md:flex items-center gap-2 text-[10px] font-bold text-zinc-600 hover:text-white transition-colors uppercase tracking-widest"
              >
                <LogOut className="w-3.5 h-3.5" /> Sign Out
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Main Layout */}
      <main className="max-w-screen-2xl mx-auto px-4 sm:px-6 flex flex-col lg:flex-row py-8 gap-8">
        
        {/* Premium Dark Sidebar */}
        <aside className="w-full lg:w-72 flex-shrink-0">
          <div className="bg-zinc-900/40 border border-zinc-800/80 p-6 rounded-2xl sticky top-24 shadow-2xl backdrop-blur-sm">
            
            <div className="flex items-center gap-2 mb-8">
              <SlidersHorizontal className="w-5 h-5 text-cyan-500" />
              <h2 className="text-lg font-bold text-white uppercase tracking-wider text-sm">Refine Search</h2>
            </div>
            
            {/* Make Filter */}
            <div className="mb-6">
              <label className="block text-xs font-semibold text-zinc-500 mb-3 uppercase tracking-widest">Make</label>
              <select
                value={selectedMake}
                onChange={handleMakeChange}
                className="w-full bg-zinc-900 border border-zinc-800 text-zinc-300 py-3 px-4 rounded-xl focus:ring-1 focus:ring-cyan-500 focus:border-cyan-500 appearance-none text-sm font-medium transition-all"
              >
                <option value="">All Makes</option>
                {Object.keys(CAR_DATA).map(make => (
                  <option key={make} value={make}>{make}</option>
                ))}
              </select>
            </div>

            {/* Model Filter (conditional) */}
            <div className={`mb-8 transition-all duration-500 ${selectedMake ? 'opacity-100 max-h-40' : 'opacity-20 pointer-events-none max-h-40'}`}>
              <label className="block text-xs font-semibold text-zinc-500 mb-3 uppercase tracking-widest">Model</label>
              <select
                value={selectedModel}
                onChange={(e) => setSelectedModel(e.target.value)}
                className="w-full bg-zinc-900 border border-zinc-800 text-zinc-300 py-3 px-4 rounded-xl focus:ring-1 focus:ring-cyan-500 focus:border-cyan-500 appearance-none text-sm font-medium transition-all"
                disabled={!selectedMake}
              >
                <option value="">Any Model</option>
                {selectedMake && CAR_DATA[selectedMake].map(model => (
                  <option key={model} value={model}>{model}</option>
                ))}
              </select>
            </div>

            {/* Condition Filter */}
            <div className="mb-6">
              <label className="block text-xs font-semibold text-zinc-500 mb-3 uppercase tracking-widest">Condition</label>
              <div className="grid grid-cols-3 gap-2">
                {["All", "New", "Used"].map(c => (
                  <button
                    key={c}
                    onClick={() => setCondition(c)}
                    className={`py-2.5 rounded-xl border text-sm font-bold tracking-wide transition-all ${
                      condition === c
                        ? c === "New"
                          ? "bg-cyan-900/30 border-cyan-500/50 text-cyan-400"
                          : c === "Used"
                          ? "bg-zinc-800 border-zinc-600 text-white"
                          : "bg-zinc-800 border-zinc-700 text-white"
                        : "bg-transparent border-zinc-800 text-zinc-500 hover:border-zinc-700 hover:text-zinc-300"
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>

            {/* Color Filter */}
            <div className="mb-6">
              <label className="block text-xs font-semibold text-zinc-500 mb-3 uppercase tracking-widest">Exterior Color</label>
              <div
                className="space-y-1 overflow-y-auto pr-1"
                style={{ maxHeight: '220px', scrollbarWidth: 'thin', scrollbarColor: '#3f3f46 transparent' }}
              >
                {COLORS.map(color => (
                   <button
                   key={color}
                   onClick={() => setActiveColor(color)}
                   className={`w-full flex items-center justify-between px-4 py-2.5 rounded-xl transition-all border ${
                     activeColor === color
                       ? 'bg-zinc-800 border-zinc-700 text-white'
                       : 'bg-transparent border-transparent text-zinc-400 hover:bg-zinc-900/50 hover:text-zinc-300'
                   }`}
                 >
                   <span className="text-sm font-medium">{color}</span>
                   {color !== "All" && (
                     <span className="w-3 h-3 rounded-full border border-zinc-700 shadow-inner flex-shrink-0" style={{ backgroundColor: color.toLowerCase() }} />
                   )}
                 </button>
                ))}
              </div>
            </div>

            {/* Reset */}
            <div className="pt-4 border-t border-zinc-800">
               <button 
                onClick={() => { setSelectedMake(''); setSelectedModel(''); setActiveColor('All'); setSearchQuery(''); setCondition('All'); }}
                className="w-full py-3 text-xs uppercase tracking-widest font-semibold text-zinc-500 hover:text-zinc-300 transition-colors"
              >
                Reset All Filters
              </button>
            </div>

          </div>
        </aside>

        {/* Cars Grid */}
        <div className="flex-1">
          
          <div className="mb-6 flex items-end justify-between">
            <div>
              <p className="text-sm text-zinc-500 font-medium">Showing Results ({filteredCars.length})</p>
            </div>
            <div className="md:hidden relative w-1/2 ml-4">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-zinc-500" />
              </div>
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-3 py-2 bg-zinc-900 border border-zinc-800 rounded-lg text-sm text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-cyan-500/50"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredCars.length > 0 ? (
              filteredCars.map(car => (
                <div key={car.id} onClick={() => navigate(`/car/${car.id}`)} className="bg-zinc-900/40 rounded-2xl overflow-hidden border border-zinc-800 hover:border-zinc-600 transition-all duration-300 group flex flex-col hover:shadow-[0_0_30px_rgba(34,211,238,0.07)] hover:-translate-y-1 cursor-pointer"
                >
                  
                  {/* Image Container */}
                  <div className="relative h-52 overflow-hidden bg-zinc-900 border-b border-zinc-800">
                    <img 
                      src={car.image || car.image_url} 
                      alt={`${car.make || car.brand} ${car.model}`} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90 group-hover:opacity-100"
                    />
                    <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-black/50 to-transparent pointer-events-none" />
                  </div>
                  
                  {/* Content Container */}
                  <div className="p-5 flex-1 flex flex-col relative">
                    
                    {/* Floating Price Tag */}
                    <div className="absolute -top-6 right-4 bg-zinc-900/90 backdrop-blur-md px-4 py-1.5 rounded-lg border border-zinc-700 text-white font-bold shadow-xl border-b-cyan-500/50 border-b-2">
                       ${Number(car.price || 0).toLocaleString()}
                    </div>

                    <div className="mb-4 pt-2">
                      <p className="text-xs text-cyan-500 font-semibold uppercase tracking-widest mb-1">{car.make || car.brand}</p>
                      <h3 className="text-xl font-bold text-white tracking-wide">
                        {car.model}
                      </h3>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-6 text-xs text-zinc-400 font-medium">
                      <div className="flex items-center gap-1.5 bg-zinc-900 rounded-md p-2 border border-zinc-800/50">
                        <CalIcon className="w-3.5 h-3.5 text-zinc-500" />
                        {car.year}
                      </div>
                      <div className="flex items-center gap-1.5 bg-zinc-900 rounded-md p-2 border border-zinc-800/50">
                        <MapPin className="w-3.5 h-3.5 text-zinc-500" />
                        {(car.mileage || 0).toLocaleString()} mi
                      </div>
                      <div className="flex items-center gap-2 bg-zinc-900 rounded-md p-2 border border-zinc-800/50 col-span-2">
                        <div className="w-2.5 h-2.5 rounded-full border border-zinc-700 ml-1" style={{ backgroundColor: (car.color || 'white').toLowerCase() }}></div>
                        <span className="capitalize">{car.color || 'N/A'}</span>
                      </div>
                    </div>

                    {/* Action Button */}
                    <div className="mt-auto">
                      <a 
                        href="tel:01094332602" 
                        className="w-full py-3 px-4 bg-zinc-100 hover:bg-white text-zinc-900 font-bold tracking-wide rounded-xl text-center transition-colors flex items-center justify-between text-sm group/btn"
                        onClick={(e) => e.stopPropagation()}
                      >
                         <span className="flex items-center gap-2"><Phone className="w-4 h-4" /> Seller Contact</span>
                         <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                      </a>
                    </div>

                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full py-32 text-center flex flex-col items-center justify-center border border-zinc-800/50 rounded-2xl bg-zinc-900/20 border-dashed">
                <div className="w-16 h-16 rounded-2xl bg-zinc-800 flex items-center justify-center mb-6">
                   <Filter className="w-8 h-8 text-zinc-600" />
                </div>
                <h3 className="text-lg font-bold text-white tracking-widest uppercase">No Matches Found</h3>
                <p className="text-zinc-500 mt-2 text-sm max-w-sm">
                  We currently do not have any inventory that matches your exact criteria. Please try broadening your search.
                </p>
                <button 
                  onClick={() => { setSelectedMake(''); setSelectedModel(''); setActiveColor("All"); setSearchQuery(""); setCondition("All"); }}
                  className="mt-8 px-6 py-2 border border-zinc-700 bg-zinc-900 text-zinc-300 hover:text-white rounded-lg hover:border-zinc-500 transition-colors text-sm font-medium tracking-wide"
                >
                  Clear All Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default CarsList;
