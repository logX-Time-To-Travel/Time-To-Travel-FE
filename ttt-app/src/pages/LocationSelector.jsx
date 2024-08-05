import React, { useState, useRef, useEffect } from "react";
import "./LocationSelector.css";
import { LoadScript, Autocomplete } from "@react-google-maps/api";
import "../assets/Search_icon.png";
const libraries = ["places"];

const LocationSelector = ({ onSelectLocation }) => {
  const [map, setMap] = useState(null);
  const [markerPosition, setMarkerPosition] = useState(null);
  const [center, setCenter] = useState({ lat: 0, lng: 0 });
  const [address, setAddress] = useState("");
  const autocompleteRef = useRef(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setCenter({ lat: latitude, lng: longitude });
        setMarkerPosition({ lat: latitude, lng: longitude });
        fetchAddress(latitude, longitude);
      },
      () => {
        console.error("위치 접근에 오류가 있습니다.");
      }
    );
  }, []);

  const fetchAddress = (lat, lng) => {
    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ location: { lat, lng } }, (results, status) => {
      if (status === "OK" && results[0]) {
        setAddress(results[0].formatted_address);
      } else {
        console.error("Error fetching address");
      }
    });
  };

  const onLoad = (map) => {
    setMap(map);
    if (center) {
      map.panTo(center);
    }
  };

  const onUnmount = () => {
    setMap(null);
  };

  const handleConfirmLocation = () => {
    onSelectLocation(markerPosition.lat, markerPosition.lng, address);
  };

  const onPlaceChanged = () => {
    const place = autocompleteRef.current.getPlace();
    if (place.geometry) {
      const location = place.geometry.location;
      setMarkerPosition({
        lat: location.lat(),
        lng: location.lng(),
      });
      map.panTo(location);
      fetchAddress(location.lat(), location.lng());
    }
  };

  return (
    <LoadScript
      googleMapsApiKey={import.meta.env.VITE_GOOGLEMAP_API_KEY}
      libraries={libraries}
    >
      <Autocomplete
        onLoad={(autocomplete) => (autocompleteRef.current = autocomplete)}
        onPlaceChanged={onPlaceChanged}
      >
        {/* <img src="../assets/Search_icon.png" /> */}
        <div className="SearchBar-container">
          <input className="searchBar" type="text" placeholder="장소 검색"
           />
        </div>
      </Autocomplete>
      {/* <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={50}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
        <Marker position={markerPosition} />
      </GoogleMap> */}
      <button onClick={handleConfirmLocation}>위치를 선택하시겠습니까?</button>
    </LoadScript>
  );
};

export default LocationSelector;
