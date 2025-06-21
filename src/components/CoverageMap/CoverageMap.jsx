// Import core components from react-leaflet
import { MapContainer, TileLayer, Marker, Popup, Tooltip, useMap } from "react-leaflet";

// Import Leaflet for map and marker configuration
import L from "leaflet";

// Import leaflet CSS to display map correctly
import "leaflet/dist/leaflet.css";
import { useLoaderData } from "react-router";
import { useState } from "react";

// 🔧 Fix for Leaflet marker icon issue in React apps
// By default, Leaflet won't load marker icons properly in some setups
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});
// ------------------ NEW COMPONENT ------------------
// This component receives a position and moves/flys the map to it
function MapMover({ position }) {
    const map = useMap();
  
    if (position) {
      map.flyTo(position, 12, { duration: 1.5 }); // flyTo with zoom level 12 and animation
    }
  
    return null;
  }
  // ---------------------------------------------------
const CoverageMap = () => {
  const coverageData = useLoaderData();
  

  // -------------- NEW STATE ------------------------
  // Store user input and the target position to move the map
  const [searchTerm, setSearchTerm] = useState("");
  const [targetPosition, setTargetPosition] = useState(null);
  // -------------------------------------------------

  // -------------- NEW FUNCTION ---------------------
  // Handle search submit, find matching district/city and update targetPosition
  const handleSearch = (e) => {
    e.preventDefault();

    const search = searchTerm.trim().toLowerCase();
    if (!search) return;

    // Find first matching district or city (case-insensitive, partial)
    const found = coverageData.find(
      (loc) =>
        loc.district.toLowerCase().includes(search) ||
        loc.city.toLowerCase().includes(search)
    );

    if (found) {
      setTargetPosition([found.latitude, found.longitude]);
    } else {
      alert("District not found!");
    }
  };
  // -------------------------------------------------

  return (
    <div className="rounded-4xl bg-white p-10 shadow-2xs">
      {/* // Container that holds the full-height map */}
      <div className="h-[600px] w-5/6 mx-auto mb-20">
        {/* ----------- NEW SEARCH FORM ----------- */}
        <form onSubmit={handleSearch} className="mb-3">
          <input
            type="text"
            placeholder="Search district or city"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border p-2 rounded w-full"
          />
        </form>
        {/* --------------------------------------- */}

        {/* MapContainer is the main map wrapper */}
        <MapContainer
          center={[23.685, 90.3563]} // Center on Bangladesh
          zoom={7.3} // Initial zoom level
          scrollWheelZoom={true} // Allow scroll to zoom
          style={{ height: "100%", width: "100%" }} // Full size
        >
          {/* TileLayer is the base map (background image) */}
          <TileLayer
            attribution="&copy; OpenStreetMap"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {/* ------------- NEW MAP MOVER USAGE -------------- */}
          {targetPosition && <MapMover position={targetPosition} />}
          {/* ------------------------------------------------ */}

          {/* Loop through your coverageData and place a Marker for each city */}
          {coverageData.map((location, index) => (
            <Marker
              key={index} // Required key for list rendering
              position={[location.latitude, location.longitude]} // Set pin position
            >
              {/* Show Tooltip on Hover */}
              <Tooltip direction="top" offset={[0, -10]} opacity={1}>
                <div>
                  <strong>{location.city}</strong>
                  <br />
                  <span>District: {location.district}</span>
                  <br />
                  <span>Areas: {location.covered_area.join(", ")}</span>
                </div>
              </Tooltip>

              {/* Popup shows info when a marker is clicked */}
              <Popup>
                <div>
                  {/* City name */}
                  <h3>
                    <strong>{location.city}</strong>
                  </h3>

                  {/* District name */}
                  <p>District: {location.district}</p>

                  {/* Covered Areas */}
                  <p>Covered Areas:</p>
                  <ul>
                    {location.covered_area.map((area, i) => (
                      <li key={i}>{area}</li>
                    ))}
                  </ul>

                  {/* Optional Flowchart Image */}
                  {location.flowchart && (
                    <img
                      src={location.flowchart}
                      alt="Flowchart"
                      style={{ width: "100%", marginTop: "5px" }}
                    />
                  )}
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
};

export default CoverageMap;
