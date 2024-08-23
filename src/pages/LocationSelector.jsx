import React, { useState, useRef, useEffect } from 'react';
import { Autocomplete } from '@react-google-maps/api';
import './LocationSelector.css';

const LocationSelector = ({ onSelectLocation }) => {
  const [map, setMap] = useState(null);
  const [markerPosition, setMarkerPosition] = useState(null);
  const [center, setCenter] = useState({ lat: 0, lng: 0 });
  const [address, setAddress] = useState('');
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
        console.error('위치 접근에 오류가 있습니다.');
      }
    );
  }, []);

  const fetchAddress = (lat, lng) => {
    return new Promise((resolve, reject) => {
      const geocoder = new window.google.maps.Geocoder();
      geocoder.geocode({ location: { lat, lng } }, (results, status) => {
        if (status === 'OK' && results[0]) {
          setAddress(results[0].formatted_address);
          resolve(results[0].formatted_address);
        } else {
          console.error('Error fetching address');
          reject('Error fetching address');
        }
      });
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

  const handleConfirmLocation = async () => {
    if (markerPosition) {
      const fetchedAddress = await fetchAddress(
        markerPosition.lat,
        markerPosition.lng
      );
      console.log('Lat:', markerPosition.lat);
      console.log('Lng:', markerPosition.lng);
      console.log('Address:', fetchedAddress); // fetchAddress 함수가 반환하는 주소를 출력
      onSelectLocation(markerPosition.lat, markerPosition.lng, fetchedAddress); // address 대신 fetchedAddress 사용
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
      fetchAddress(location.lat(), location.lng());
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
