import React, { useState, useRef } from "react";
import { GoogleMap, LoadScript, Autocomplete, Marker } from "@react-google-maps/api";

const containerStyle = {
  width: "400px",
  height: "400px"
};

const center = {
  lat: -3.745,
  lng: -38.523
};

const libraries = ["places"];

const MapSearch = ({ onSelectLocation }) => {
  const [map, setMap] = useState(null);
  const [markerPosition, setMarkerPosition] = useState(center);
  const autocompleteRef = useRef(null);

  const onLoad = map => {
    setMap(map);
  };

  const onUnmount = () => {
    setMap(null);
  };

  const onPlaceChanged = () => {
    const place = autocompleteRef.current.getPlace();
    if (place.geometry) {
      const location = place.geometry.location;
      setMarkerPosition({
        lat: location.lat(),
        lng: location.lng()
      });
      map.panTo(location);
    }
  };

  const handleConfirmLocation = () => {
    onSelectLocation(markerPosition);
  };

  return (
    <LoadScript googleMapsApiKey="YOUR_API_KEY" libraries={libraries}>
      <Autocomplete
        onLoad={autocomplete => (autocompleteRef.current = autocomplete)}
        onPlaceChanged={onPlaceChanged}
      >
        <input
          type="text"
          placeholder="Search location"
          style={{ width: "90%", padding: "10px", margin: "20px" }}
        />
      </Autocomplete>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
        <Marker position={markerPosition} />
      </GoogleMap>
      <button onClick={handleConfirmLocation}>Confirm Location</button>
    </LoadScript>
  );
};

export default MapSearch;
