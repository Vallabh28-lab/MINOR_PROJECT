import { GoogleMap, LoadScript, Marker, InfoWindow } from "@react-google-maps/api";
import { useState } from "react";

const containerStyle = {
  width: "100%",
  height: "500px"
};

function LegalMap() {
  const [center, setCenter] = useState({ lat: 18.5204, lng: 73.8567 });
  const [lawyers, setLawyers] = useState([]);
  const [selected, setSelected] = useState(null);
  const [radius, setRadius] = useState(3000);

  // 📍 Get User Location
  const getLocation = () => {
    navigator.geolocation.getCurrentPosition((pos) => {
      const lat = pos.coords.latitude;
      const lng = pos.coords.longitude;

      setCenter({ lat, lng });
      fetchLawyers(lat, lng, radius);
    });
  };

  // 🌐 Fetch from Backend
  const fetchLawyers = (lat, lng, radius) => {
    fetch(`http://localhost:5000/api/lawyers?lat=${lat}&lng=${lng}&radius=${radius}`)
      .then(res => res.json())
      .then(data => setLawyers(data))
      .catch(err => console.error(err));
  };

  return (
    <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
      
      {/* 🔍 Controls */}
      <div style={{ marginBottom: "10px" }}>
        <button onClick={getLocation}>📍 Find Nearby Lawyers</button>

        <select onChange={(e) => setRadius(e.target.value)}>
          <option value="1000">1 KM</option>
          <option value="3000">3 KM</option>
          <option value="5000">5 KM</option>
        </select>
      </div>

      {/* 🗺️ Map */}
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={14}>
        
        {/* User */}
        <Marker position={center} />

        {/* Lawyers */}
        {lawyers.map((lawyer, index) => (
          <Marker
            key={index}
            position={{ lat: lawyer.lat, lng: lawyer.lng }}
            onClick={() => setSelected(lawyer)}
          />
        ))}

        {/* Info Window */}
        {selected && (
          <InfoWindow
            position={{ lat: selected.lat, lng: selected.lng }}
            onCloseClick={() => setSelected(null)}
          >
            <div>
              <h4>{selected.name}</h4>
              <p>📞 {selected.phone}</p>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </LoadScript>
  );
}

export default LegalMap;