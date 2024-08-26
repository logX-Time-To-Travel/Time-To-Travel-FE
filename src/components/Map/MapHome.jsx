import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './MapHome.css';

const MapHome = () => {
  const [map, setMap] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [currentPosition, setCurrentPosition] = useState({ lat: 0, lng: 0 });
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [isMobileView, setIsMobileView] = useState(window.innerWidth <= 1024);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // URL에서 검색어 추출
    const params = new URLSearchParams(location.search);
    const query = params.get('query');
    if (query) {
      setSearchQuery(query);
    }

    // 구글 맵 API 스크립트 로드
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${
      import.meta.env.VITE_GOOGLEMAP_API_KEY
    }&libraries=places`;
    script.async = true;
    document.body.appendChild(script);

    const handleResize = () => {
      setIsMobileView(window.innerWidth <= 1024);
    };

    window.addEventListener('resize', handleResize);

    // 지도 초기화
    const initMap = () => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCurrentPosition({ lat: latitude, lng: longitude });

          const map = new window.google.maps.Map(
            document.getElementById('map'),
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
            title: '내 위치',
          });
          setMarkers((prevMarkers) => [...prevMarkers, marker]);

          // URL에 query 파라미터가 있을 때 검색 실행
          if (query) {
            handleSearch(query, map);
          }

          // JSON 파일에서 좌표 불러오기
          fetch('/src/components/Map/addtemp.json') // 절대 경로로 수정
            .then((response) => {
              if (!response.ok) {
                throw new Error('Network response was not ok');
              }
              return response.json();
            })
            .then((data) => {
              data.forEach((coord) => {
                console.log(
                  'Adding marker at:',
                  coord.northEastLat,
                  coord.northEastLng
                ); // 좌표 출력
                const marker = new window.google.maps.Marker({
                  position: {
                    lat: coord.northEastLat,
                    lng: coord.northEastLng,
                  },
                  map,
                  title: '마커 위치',
                });
                setMarkers((prevMarkers) => [...prevMarkers, marker]);
              });
            })
            .catch((error) => console.error('Error loading JSON:', error));
        },
        (error) => {
          console.error('Error getting current position:', error);
          const map = new window.google.maps.Map(
            document.getElementById('map'),
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

          if (query) {
            handleSearch(query, map);
          }
        }
      );
    };

    script.onload = initMap;

    return () => {
      document.body.removeChild(script);
      window.removeEventListener('resize', handleResize);
    };
  }, [location.search]);

  const handleSearch = (searchQuery, mapInstance) => {
    if (searchQuery) {
      const geocoder = new window.google.maps.Geocoder();
      geocoder.geocode({ address: searchQuery }, (results, status) => {
        if (status === 'OK') {
          const { location } = results[0].geometry;
          mapInstance.setCenter(location);
          mapInstance.setZoom(13);

          const infowindow = new window.google.maps.InfoWindow({
            content: results[0].formatted_address,
            position: location,
          });
          infowindow.open(mapInstance);
        } else {
          console.error('검색 실패', status);
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
    handleSearch(suggestion.description, map);
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
          title: '내 위치',
        });
        setMarkers((prevMarkers) => [...prevMarkers, marker]);
      },
      (error) => {
        console.error('Error getting current position:', error);
      }
    );
  };

  const handleSearchBarClick = () => {
    navigate('/search');
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
                if (e.key === 'Enter') {
                  handleSearch(searchQuery, map);
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
              onClick={() => handleSearch(searchQuery, map)}
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
