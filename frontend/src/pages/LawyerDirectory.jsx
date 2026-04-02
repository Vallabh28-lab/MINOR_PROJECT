import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default marker icon in Leaflet + React/Vite
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
});

// Component to handle map centering when position changes
function ChangeView({ center }) {
  const map = useMap();
  map.setView(center, 13);
  return null;
}

function LawyerDirectory() {
  const [lawyers, setLawyers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [position, setPosition] = useState([18.5204, 73.8567]); // Default to Pune
  const [hasLocation, setHasLocation] = useState(false);
  const [error, setError] = useState(null);

  // Fetch user location on mount
  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const newPos = [pos.coords.latitude, pos.coords.longitude];
          setPosition(newPos);
          setHasLocation(true);
          fetchNearbyLawyers(pos.coords.latitude, pos.coords.longitude);
        },
        (err) => {
          console.error("Geolocation error:", err);
          setError("Location access denied. Showing lawyers near Pune by default.");
          fetchNearbyLawyers(18.5204, 73.8567);
        }
      );
    } else {
      setError("Geolocation not supported by your browser.");
      fetchNearbyLawyers(18.5204, 73.8567);
    }
  }, []);

  const fetchNearbyLawyers = async (lat, lng) => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:5000/api/lawyers/nearby?lat=${lat}&lng=${lng}`);
      if (!response.ok) throw new Error("Failed to fetch");
      const data = await response.json();
      setLawyers(data);
    } catch (err) {
      console.error("Error fetching lawyers:", err);
      setError("Failed to load nearby lawyers. Please make sure the backend is running.");
    } finally {
      setLoading(false);
    }
  };

  const handleSearchClick = () => {
    fetchNearbyLawyers(position[0], position[1]);
  };

  return (
    <div className="flex-1 bg-[#F8FAFC] overflow-y-auto">
      {/* Professional Header */}
      <div className="relative shadow-lg border-b border-slate-800 px-10 py-10" style={{
        background: 'linear-gradient(135deg, #0F172A 0%, #1E293B 100%)',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.4)'
      }}>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <div className="flex items-center mb-3">
              <div className="p-3 bg-blue-600/20 rounded-xl mr-5 backdrop-blur-sm border border-blue-500/30">
                <span className="text-4xl">⚖️</span>
              </div>
              <h1 className="text-4xl font-extrabold text-white tracking-tight">
                Legal Advisory <span className="text-blue-400">Network</span>
              </h1>
            </div>
            <p className="text-xl text-slate-300 max-w-2xl font-medium leading-relaxed">
              Discover verified legal professionals near you using our location-based intelligent search.
            </p>
          </div>
          <div className="mt-6 md:mt-0 flex space-x-3">
            <div className="px-4 py-2 bg-slate-800/50 backdrop-blur-md rounded-lg border border-slate-700">
              <span className="text-slate-400 text-xs block uppercase tracking-widest font-bold mb-1">Network Status</span>
              <span className="text-green-400 font-semibold flex items-center">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>
                Live Feed Active
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Container */}
      <div className="max-w-[1600px] mx-auto p-8">
        {/* Status Alerts */}
        {error && (
          <div className="mb-8 p-5 bg-red-50/80 backdrop-blur-sm border border-red-200 text-red-800 rounded-xl flex items-center shadow-sm">
            <span className="text-2xl mr-4">⚠️</span>
            <span className="font-medium">{error}</span>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Column: Interactive Map (8/12) */}
          <div className="lg:col-span-8 space-y-10">
            <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden transition-all duration-300 hover:shadow-2xl">
              <div className="p-5 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
                <h3 className="text-lg font-bold text-slate-800 flex items-center uppercase tracking-wider">
                  <span className="mr-3 text-blue-600">📍</span> Geospatial Advisory Map
                </h3>
                <div className="flex space-x-3">
                  <button
                    onClick={handleSearchClick}
                    className="px-6 py-2.5 bg-blue-600 text-white text-sm font-bold rounded-xl hover:bg-blue-700 transition-all shadow-md active:scale-95 disabled:opacity-50 flex items-center"
                    disabled={loading}
                  >
                    {loading ? (
                      <span className="animate-spin mr-2">⏳</span>
                    ) : (
                      <span className="mr-2">🔄</span>
                    )}
                    {loading ? 'Analyzing...' : 'Sync Locations'}
                  </button>
                </div>
              </div>
              <div style={{ height: '600px', width: '100%' }} className="relative group">
                <MapContainer center={position} zoom={13} scrollWheelZoom={true} style={{ height: '100%', width: '100%' }}>
                  <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  <ChangeView center={position} />

                  {hasLocation && (
                    <Marker position={position}>
                      <Popup className="premium-popup">
                        <div className="p-2">
                          <span className="text-xs font-bold text-slate-400 uppercase">Current Node</span>
                          <p className="font-bold text-slate-900">Your Secure Location</p>
                        </div>
                      </Popup>
                    </Marker>
                  )}

                  {lawyers.map((lawyer, idx) => (
                    <Marker key={idx} position={[lawyer.lat, lawyer.lon]}>
                      <Popup className="premium-popup">
                        <div className="p-2 min-w-[200px]">
                          <span className="text-xs font-bold text-blue-500 uppercase">Verified Professional</span>
                          <h4 className="font-bold text-slate-900 mt-1">{lawyer.name}</h4>
                          <p className="text-xs text-slate-600 mb-2">{lawyer.address}</p>
                          <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                            <span className="text-[10px] font-bold text-slate-400">{lawyer.distance}m Proximity</span>
                            <button className="text-[10px] bg-slate-900 text-white px-2 py-1 rounded">Profile Link</button>
                          </div>
                        </div>
                      </Popup>
                    </Marker>
                  ))}
                </MapContainer>

                {/* Professional Legend Overlay */}
                <div className="absolute bottom-6 left-6 z-[1000] bg-white/90 backdrop-blur-md p-4 rounded-xl border border-slate-200 shadow-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <h5 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Map Interface</h5>
                  <div className="space-y-2">
                    <div className="flex items-center text-xs text-slate-700">
                      <span className="w-3 h-3 bg-blue-500 rounded-full mr-2"></span>
                      Verified Legal Entities
                    </div>
                    <div className="flex items-center text-xs text-slate-700">
                      <span className="w-3 h-3 bg-slate-800 rounded-full mr-2"></span>
                      Primary User Node
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Traditional Filtering Section */}
            <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-8">
              <h3 className="text-xl font-bold text-slate-900 mb-8 border-l-4 border-blue-600 pl-4 uppercase tracking-wider">
                Parameterized Search
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Jurisdiction / City</label>
                  <select className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all font-medium text-slate-700">
                    <option value="">Global Jurisdiction</option>
                    <option value="pune">Pune Central</option>
                    <option value="mumbai">Mumbai Metro</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Judiciary Branch</label>
                  <select className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all font-medium text-slate-700">
                    <option value="">All Courts</option>
                    <option value="district">District Administration</option>
                    <option value="high">High Court Registry</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Proximity Index</label>
                  <select className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all font-medium text-slate-700">
                    <option value="">Standard Radius</option>
                    <option value="5">≤ 5.0 KM</option>
                    <option value="10">≤ 10.0 KM</option>
                  </select>
                </div>
              </div>
              <div className="flex justify-end">
                <button className="px-10 py-4 bg-slate-900 text-white rounded-xl hover:bg-black transition-all font-bold shadow-lg shadow-slate-900/20 uppercase tracking-widest text-sm active:scale-95">
                  Execute Filter
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Advisory List (4/12) */}
          <div className="lg:col-span-4 space-y-8">
            <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-6 flex flex-col h-full overflow-hidden transition-all duration-300 hover:shadow-2xl">
              <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-100">
                <h3 className="text-xl font-bold text-slate-900 uppercase tracking-wider">
                  Advisory <span className="text-blue-600">Registry</span>
                </h3>
                <span className="px-3 py-1 bg-slate-100 text-slate-500 text-[10px] font-black rounded-full uppercase">
                  {lawyers.length} Matches Found
                </span>
              </div>

              <div className="space-y-5 overflow-y-auto pr-2 custom-scrollbar" style={{ maxHeight: '800px' }}>
                {loading ? (
                  <div className="flex flex-col items-center justify-center py-20 space-y-6">
                    <div className="relative">
                      <div className="w-16 h-16 border-4 border-blue-600/20 border-t-blue-600 rounded-full animate-spin"></div>
                      <div className="absolute inset-0 flex items-center justify-center text-blue-600 font-bold text-[10px]">AI</div>
                    </div>
                    <div className="text-center">
                      <p className="font-bold text-slate-900 uppercase tracking-widest text-sm">Matching Nodes</p>
                      <p className="text-xs text-slate-400 mt-1">Cross-referencing geospatial data...</p>
                    </div>
                  </div>
                ) : lawyers.length > 0 ? (
                  lawyers.map((lawyer, idx) => (
                    <div key={idx} className="group p-5 bg-slate-50 border border-slate-100 rounded-2xl hover:bg-white hover:border-blue-400 hover:shadow-xl transition-all duration-300 cursor-pointer relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-16 h-16 bg-blue-600/5 rounded-bl-full translate-x-4 -translate-y-4 group-hover:bg-blue-600/10 transition-colors"></div>

                      <div className="flex justify-between items-start mb-3">
                        <h4 className="font-extrabold text-[#1E293B] group-hover:text-blue-700 transition-colors leading-tight text-lg max-w-[80%]">
                          {lawyer.name}
                        </h4>
                        <div className="text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity">
                          <span className="text-xl">➡️</span>
                        </div>
                      </div>

                      <p className="text-sm text-slate-500 mb-4 line-clamp-2 italic leading-relaxed">
                        {lawyer.address}
                      </p>

                      <div className="flex items-center justify-between mt-auto">
                        <div className="flex items-center space-x-2">
                          <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                          <span className="text-[11px] font-black text-slate-400 uppercase tracking-tighter">Verified Office</span>
                        </div>
                        <div className="px-3 py-1.5 bg-white border border-slate-200 rounded-lg shadow-sm">
                          <span className="text-xs font-bold text-slate-900">{lawyer.distance}m</span>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-24 bg-slate-50 border border-dashed border-slate-300 rounded-2xl">
                    <div className="text-5xl mb-6 grayscale opacity-50">🧭</div>
                    <p className="font-bold text-slate-800 uppercase tracking-widest text-sm">Scanning Terminated</p>
                    <p className="text-xs text-slate-400 mt-2">Update proximity parameters to expand search.</p>
                  </div>
                )}
              </div>
            </div>

            {/* Compliance Card */}
            <div className="bg-slate-900 rounded-2xl shadow-xl p-8 text-white relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-bl-full -mr-10 -mt-10 group-hover:bg-white/10 transition-all duration-500"></div>
              <div className="relative z-10">
                <h4 className="text-lg font-bold mb-4 flex items-center tracking-wider">
                  <span className="mr-3 text-blue-400">🛡️</span> LEGAL COMPLIANCE
                </h4>
                <p className="text-sm text-slate-300 leading-7 font-medium">
                  All listed professionals are verified against national bar association standards. Our intelligent discovery system ensures optimal match results based on proximity and legal specializations.
                </p>
                <div className="mt-6 pt-6 border-t border-slate-800 flex items-center justify-between">
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Protocol 4.2 Secured</span>
                  <span className="text-blue-400 text-xs font-black cursor-pointer hover:underline uppercase tracking-widest">Inquiry →</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LawyerDirectory;