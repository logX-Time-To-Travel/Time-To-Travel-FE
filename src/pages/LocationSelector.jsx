import React, { useState, useRef, useEffect } from 'react';
import { Autocomplete } from '@react-google-maps/api';
import './LocationSelector.css';

const LocationSelector = ({ onSelectLocation }) => {
  const [map, setMap] = useState(null);
  const [markerPosition, setMarkerPosition] = useState(null);
  const [center, setCenter] = useState({ lat: 0, lng: 0 });
  const autocompleteRef = useRef(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setCenter({ lat: latitude, lng: longitude });
        setMarkerPosition({ lat: latitude, lng: longitude });
      },
      () => {
        console.error('위치 접근에 오류가 있습니다.');
      }
    );
  }, []);

  const fetchPlaceDetails = (placeId) => {
    return new Promise((resolve, reject) => {
      const service = new window.google.maps.places.PlacesService(
        document.createElement('div')
      );

      service.getDetails({ placeId }, (place, status) => {
        if (status === window.google.maps.places.PlacesServiceStatus.OK) {
          resolve(place.name); // 장소의 정확한 이름 반환
        } else {
          reject('Error fetching place details');
        }
      });
    });
  };

  const handleConfirmLocation = async () => {
    if (markerPosition) {
      try {
        const place = autocompleteRef.current.getPlace();
        if (place && place.place_id) {
          const fetchedPlaceName = await fetchPlaceDetails(place.place_id);
          console.log('Lat:', markerPosition.lat);
          console.log('Lng:', markerPosition.lng);
          console.log('Place Name:', fetchedPlaceName);
          onSelectLocation(
            markerPosition.lat,
            markerPosition.lng,
            fetchedPlaceName
          );
        } else {
          console.error('No place ID found.');
        }
      } catch (error) {
        console.error('Error fetching place name:', error);
      }
    } else {
      console.error('Marker position is not set.');
    }
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
    }
  };

  return (
    <div>
      <Autocomplete
        onLoad={(autocomplete) => (autocompleteRef.current = autocomplete)}
        onPlaceChanged={onPlaceChanged}
      >
        <div className="SearchBar-container">
          <input className="searchBar" type="text" placeholder="장소 검색" />
        </div>
      </Autocomplete>
      <button onClick={handleConfirmLocation}>위치를 선택하시겠습니까?</button>
    </div>
  );
};

export default LocationSelector;
