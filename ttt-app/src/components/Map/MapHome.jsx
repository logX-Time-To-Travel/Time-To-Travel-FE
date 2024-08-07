import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./MapHome.css";

const MapHome = () => {
  const [map, setMap] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [currentPosition, setCurrentPosition] = useState({ lat: 0, lng: 0 });
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [isMobileView, setIsMobileView] = useState(window.innerWidth <= 1024);
  const navigate = useNavigate();

  useEffect(() => {
    // 구글 맵 API 스크립트 로드
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${(import.meta.env.VITE_GOOGLEMAP_API_KEY =
      "AIzaSyCBDYsrNEO1_IjXApM0As-mKCFrhlALUhM")}&libraries=places`;
    script.async = true;
    document.body.appendChild(script);

    const handleResize = () => {
      setIsMobileView(window.innerWidth <= 1024);
    };

    window.addEventListener("resize", handleResize);

    // 지도 초기화
    const initMap = () => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCurrentPosition({ lat: latitude, lng: longitude });

          const map = new window.google.maps.Map(
            document.getElementById("map"),
            {
              center: { lat: latitude, lng: longitude },
              zoom: 13,
              zoomControl: false,
              mapTypeControl: false,
              scaleControl: false,
              streetViewControl: false,
              fullscreenControl: false,
            }
          );
          setMap(map);

          const marker = new window.google.maps.Marker({
            position: { lat: latitude, lng: longitude },
            map,
            title: "내 위치",
          });
          setMarkers((prevMarkers) => [...prevMarkers, marker]);
        },
        (error) => {
          console.error("Error getting current position:", error);
          const map = new window.google.maps.Map(
            document.getElementById("map"),
            {
              center: { lat: 37.5665, lng: 126.978 },
              zoom: 13,
              zoomControl: false,
              mapTypeControl: false,
              scaleControl: false,
              streetViewControl: false,
              fullscreenControl: false,
            }
          );
          setMap(map);
        }
      );
    };

    script.onload = initMap;

    return () => {
      document.body.removeChild(script);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleSearch = () => {
    if (searchQuery) {
      const geocoder = new window.google.maps.Geocoder();
      geocoder.geocode({ address: searchQuery }, (results, status) => {
        if (status === "OK") {
          const { location } = results[0].geometry;
          map.setCenter(location);
          map.setZoom(13);

          const infowindow = new window.google.maps.InfoWindow({
            content: results[0].formatted_address,
            position: location,
          });
          infowindow.open(map);
        } else {
          console.error("검색 실패", status);
        }
      });
    }
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);

    // 검색어에 따라 연관 검색어 가져오기
    if (value) {
      const service = new window.google.maps.places.AutocompleteService();
      service.getPlacePredictions({ input: value }, (predictions, status) => {
        if (status === window.google.maps.places.PlacesServiceStatus.OK) {
          setSuggestions(predictions);
        } else {
          setSuggestions([]);
        }
      });
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchQuery(suggestion.description);
    setSuggestions([]);
    handleSearch();
  };

  const handleCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const currentPosition = { lat: latitude, lng: longitude };
        map.setCenter(currentPosition);
        map.setZoom(13);

        const marker = new window.google.maps.Marker({
          position: currentPosition,
          map,
          title: "내 위치",
        });
        setMarkers((prevMarkers) => [...prevMarkers, marker]);
      },
      (error) => {
        console.error("Error getting current position:", error);
      }
    );
  };

  const handleSearchBarClick = () => {
    navigate("/search");
  };

  return (
    <div className="map-container">
      <div id="map"></div>
      <div className="map-controls">
        {!isMobileView && (
          <div className="search-container">
            <input
              type="text"
              placeholder="주제나 장소를 검색하세요"
              value={searchQuery}
              onChange={handleSearchChange}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  handleSearch();
                }
              }}
            />
            {suggestions.length > 0 && (
              <ul className="suggestions-list">
                {suggestions.map((suggestion) => (
                  <li
                    key={suggestion.place_id}
                    onClick={() => handleSuggestionClick(suggestion)}
                  >
                    {suggestion.description}
                  </li>
                ))}
              </ul>
            )}
            <button
              className="map-controls-btn"
              onClick={handleSearch}
            ></button>
          </div>
        )}
        {isMobileView && (
          <div className="btn-container">
            <button className="mobile-btn" onClick={handleSearchBarClick}>
              주제나 장소를 검색하세요
            </button>
          </div>
        )}
        <button
          className="current-location"
          onClick={handleCurrentLocation}
        ></button>
      </div>
    </div>
  );
};

export default MapHome;
