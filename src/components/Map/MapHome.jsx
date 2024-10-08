import { useState, useEffect, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import X from '../../assets/X.png';
import yellowMarker from '../../assets/pin.png';
import pinkMarker from '../../assets/pin2.png';
import PostList from '../../pages/PostList';
import locationImage from '../../assets/Initialization_navigate.png';
import './MapHome.css';

const MapHome = () => {
  const [map, setMap] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [currentPosition, setCurrentPosition] = useState({ lat: 0, lng: 0 });
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [isMobileView, setIsMobileView] = useState(window.innerWidth <= 1024);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [selectedMarker, setSelectedMarker] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  const myStyles = [
    {
      featureType: 'poi',
      elementType: 'labels',
      stylers: [{ visibility: 'off' }],
    },
    {
      featureType: 'poi.business',
      elementType: 'all',
      stylers: [{ visibility: 'off' }],
    },
    {
      featureType: 'poi.park',
      elementType: 'all',
      stylers: [{ visibility: 'off' }],
    },
    {
      featureType: 'transit',
      elementType: 'labels.icon',
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

        // 기존 마커들을 지도에서 제거
        markers.forEach((marker) => marker.setMap(null));

        const newMarkers = locations.map((location) => {
          const marker = new window.google.maps.Marker({
            position: {
              lat: location.latitude,
              lng: location.longitude,
            },
            map: map,
            title: location.name || '마커 위치',
            icon: yellowMarker,
          });

          marker.addListener('click', async () => {
            // 모든 마커를 노란색으로 초기화

            newMarkers.forEach((m) => m.setIcon(yellowMarker));

            // 현재 클릭된 마커 처리
            if (selectedMarker !== marker) {
              marker.setIcon(pinkMarker);
              setSelectedMarker(marker);
              await setSelectedLocation(location);

              // 포스트 리스트 컨테이너 표시
              const postListContainer = document.querySelector(
                '.home-post-list-container'
              );
              if (postListContainer) {
                postListContainer.classList.add('show');
              }
            } else {
              setSelectedMarker(null);
              setSelectedLocation(null);

              // 포스트 리스트 컨테이너 숨기기
              const postListContainer = document.querySelector(
                '.home-post-list-container'
              );
              if (postListContainer) {
                postListContainer.classList.remove('show');
              }
            }
          });

          return marker;
        });

        setMarkers(newMarkers);
      } catch (error) {
        console.error('Error fetching markers:', error);
      }
    },
    [map, markers, selectedMarker]
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
          mapInstance.setZoom(15);
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
        map.setZoom(15);
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
    const postListContainer = document.querySelector(
      '.home-post-list-container'
    );
    if (postListContainer) {
      postListContainer.classList.remove('show');
    }

    if (selectedMarker) {
      selectedMarker.setIcon(yellowMarker);
    }

    setTimeout(() => {
      setSelectedLocation(null);
      setSelectedMarker(null);
    }, 300);
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
        <button className="current-location" onClick={handleCurrentLocation}>
          <img
            src={locationImage}
            alt="내 위치"
            className="locationImage"
          ></img>
        </button>
      </div>

      {selectedLocation && (
        <div className="home-post-list-container">
          <div className="home-post-list-header">
            <div className="home-post-list-header-head">
              {selectedLocation.name}
            </div>
            <img
              src={X}
              className="home-post-list-header-image"
              onClick={handleClosePosts}
            />
          </div>
          <div className="home-post-list-header-text">
            총 {selectedLocation.posts.length}개의 게시글을 찾았습니다.
          </div>
          <div className="home-post-list-scrollable">
            <PostList
              posts={selectedLocation.posts}
              isSelectMode={false}
              selectedPosts={[]}
              onPostSelect={() => {}}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default MapHome;
