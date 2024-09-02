import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
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
    const params = new URLSearchParams(location.search);
    const query = params.get('query');
    if (query) {
      setSearchQuery(query);
    }

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

          if (query) {
            handleSearch(query, map);
          }

          // 데이터 요청
          axios
            .get('/location/posts', {
              params: {
                northEastLat: latitude + 0.1, // 예시로 좌표 범위 설정
                northEastLng: longitude + 0.1,
                southWestLat: latitude - 0.1,
                southWestLng: longitude - 0.1,
              },
            })
            .then((response) => {
              const contentType = response.headers['content-type'];

              if (contentType && contentType.includes('application/json')) {
                const data = response.data;

                if (Array.isArray(data)) {
                  data.forEach((coord) => {
                    const marker = new window.google.maps.Marker({
                      position: {
                        lat: coord.latitude,
                        lng: coord.longitude,
                      },
                      map,
                      title: coord.name,
                    });
                    setMarkers((prevMarkers) => [...prevMarkers, marker]);

                    marker.addListener('click', () => {
                      navigate('/showblogs');
                    });
                  });
                } else {
                  console.error('데이터가 배열이 아닙니다:', data);
                }
              } else {
                console.error('응답이 JSON이 아닙니다:', response.data);
                console.error('상태 코드:', response.status);
                console.error('요청한 URL:', response.config.url);
              }
            })

            .catch((error) => {
              if (error.response) {
                // 요청이 이루어졌고, 서버가 상태 코드로 응답했지만 요청이 실패한 경우
                console.error('응답 데이터:', error.response.data);
                console.error('응답 상태:', error.response.status);
                console.error('요청 URL:', error.response.config.url);
              } else if (error.request) {
                // 요청이 이루어졌으나 응답이 오지 않은 경우
                console.error(
                  '요청이 이루어졌으나 응답이 없습니다:',
                  error.request
                );
              } else {
                // 오류를 발생시킨 요청 설정
                console.error('오류 발생:', error.message);
              }
            });
        },
        (error) => {
          console.error('Error getting current position:', error);
          const defaultLatLng = { lat: 37.5665, lng: 126.978 };
          const map = new window.google.maps.Map(
            document.getElementById('map'),
            {
              center: defaultLatLng,
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
