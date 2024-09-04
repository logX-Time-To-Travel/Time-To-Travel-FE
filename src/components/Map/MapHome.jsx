import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import PostList from '../../pages/PostList';
import './MapHome.css';

const MapHome = () => {
  const [map, setMap] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [currentPosition, setCurrentPosition] = useState({ lat: 0, lng: 0 });
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [isMobileView, setIsMobileView] = useState(window.innerWidth <= 1024);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  const myStyles = [
    {
      featureType: 'poi', // Point of Interest
      elementType: 'labels', // Hide labels (text) for POIs
      stylers: [{ visibility: 'off' }],
    },
    {
      featureType: 'poi.business', // Hide business points of interest
      elementType: 'all', // Apply to all elements
      stylers: [{ visibility: 'off' }],
    },
    {
      featureType: 'poi.park', // Hide park POIs
      elementType: 'all', // Apply to all elements
      stylers: [{ visibility: 'off' }],
    },
    {
      featureType: 'transit', // Hide transit stations (bus, rail, etc.)
      elementType: 'labels.icon', // Hide transit icons
      stylers: [{ visibility: 'off' }],
    },
  ];

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const query = params.get('query');
    if (query) {
      setSearchQuery(query);
    }

    const existingScript = document.getElementById('googleMapsScript');

    if (!existingScript) {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${
        import.meta.env.VITE_GOOGLEMAP_API_KEY
      }&libraries=places`;
      script.async = true;
      script.id = 'googleMapsScript';
      document.body.appendChild(script);

      script.onload = () => {
        initMap(query);
      };
    } else {
      initMap(query);
    }

    const handleResize = () => {
      setIsMobileView(window.innerWidth <= 1024);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [location.search]);

  const initMap = async (query) => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setCurrentPosition({ lat: latitude, lng: longitude });

        const mapInstance = new window.google.maps.Map(
          document.getElementById('map'),
          {
            center: { lat: latitude, lng: longitude },
            zoom: 13,
            styles: myStyles,
            zoomControl: false,
            mapTypeControl: false,
            scaleControl: false,
            streetViewControl: false,
            fullscreenControl: false,
          }
        );

        window.google.maps.event.addListenerOnce(mapInstance, 'idle', () => {
          setMap(mapInstance);

          if (query) {
            handleSearch(query, mapInstance);
          }

          // 초기 마커 로드
          handleBoundsChanged(mapInstance);
        });
      },
      (error) => {
        console.error('Error getting current position:', error);
        const mapInstance = new window.google.maps.Map(
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

        window.google.maps.event.addListenerOnce(mapInstance, 'idle', () => {
          setMap(mapInstance);

          if (query) {
            handleSearch(query, mapInstance);
          }

          // 초기 마커 로드
          handleBoundsChanged(mapInstance);
        });
      }
    );
  };

  const fetchMarkers = useCallback(
    async (locationRangeDTO) => {
      try {
        const response = await axios.post(
          'http://localhost:8080/locations/posts',
          locationRangeDTO
        );
        const locations = response.data;

        console.log('Received locations:', locations);

        // 기존 마커 제거
        markers.forEach((marker) => marker.setMap(null));

        // 새로운 마커 생성 및 지도에 추가
        const newMarkers = locations.map((location) => {
          const marker = new window.google.maps.Marker({
            position: {
              lat: location.latitude,
              lng: location.longitude,
            },
            map: map,
            title: location.name || '마커 위치',
          });

          marker.addListener('click', () => {
            setSelectedLocation(location);
          });

          return marker;
        });

        setMarkers(newMarkers);
      } catch (error) {
        console.error('Error fetching markers:', error);
      }
    },
    [map, markers]
  );

  const handleBoundsChanged = useCallback(
    (mapInstance) => {
      if (mapInstance) {
        const bounds = mapInstance.getBounds();
        if (bounds) {
          const northEast = bounds.getNorthEast();
          const southWest = bounds.getSouthWest();

          const locationRangeDTO = {
            northEastLat: northEast.lat(),
            northEastLng: northEast.lng(),
            southWestLat: southWest.lat(),
            southWestLng: southWest.lng(),
          };

          fetchMarkers(locationRangeDTO);
        }
      }
    },
    [fetchMarkers]
  );

  useEffect(() => {
    if (map) {
      const idleListener = map.addListener('idle', () =>
        handleBoundsChanged(map)
      );

      return () => {
        window.google.maps.event.removeListener(idleListener);
      };
    }
  }, [map, handleBoundsChanged]);

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
          map,
          position: currentPosition,
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

  const handleClosePosts = () => {
    setSelectedLocation(null);
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

      {selectedLocation && (
        <div className="home-post-list-container">
          <div className="home-post-list-header">
            <h3>{selectedLocation.name}</h3>
            <button onClick={handleClosePosts}>X</button>
          </div>
          <PostList
            posts={selectedLocation.posts}
            isSelectMode={false}
            selectedPosts={[]}
            onPostSelect={() => {}}
          />
        </div>
      )}
    </div>
  );
};

export default MapHome;
