import React, { useState, useEffect } from "react";
import "./MapHome.css";

import "../Navbar/Navbar.jsx";

const MapHome = () => {
  const [map, setMap] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [currentPosition, setCurrentPosition] = useState({ lat: 0, lng: 0 });
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    // 구글 맵 API 스크립트 로드
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyCBDYsrNEO1_IjXApM0As-mKCFrhlALUhM`;
    script.async = true;
    document.body.appendChild(script);

    // 지도 초기화
    const initMap = () => {
      // 사용자의 현재 위치 가져오기
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

          // 사용자 위치에 마커 추가
          const marker = new window.google.maps.Marker({
            position: { lat: latitude, lng: longitude },
            map,
            title: "내 위치",
          });
          setMarkers((prevMarkers) => [...prevMarkers, marker]);
        },
        (error) => {
          console.error("Error getting current position:", error);
          // 사용자 위치 가져오기에 실패한 경우 기본 위치로 설정
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
    // API 스크립트 로드 완료 시 지도 초기화
    script.onload = initMap;

    return () => {
      // 컴포넌트 언마운트 시 스크립트 제거
      document.body.removeChild(script);
    };
  }, []);
  //검색 기능
  const handleSearch = () => {
    if (searchQuery) {
      const geocoder = new window.google.maps.Geocoder();
      geocoder.geocode({ address: searchQuery }, (results, status) => {
        if (status === "OK") {
          const { location } = results[0].geometry;
          map.setCenter(location);
          map.setZoom(13);

          // 인포윈도우만 추가
          const infowindow = new window.google.maps.InfoWindow({
            content: results[0].formatted_address,
            position: location,
          });
          infowindow.open(map);
        } else {
          console.error(
            "Geocode was not successful for the following reason:",
            status
          );
        }
      });
    }
  };
  // 현재 위치로 돌아가는 함수
  const handleCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const currentPosition = { lat: latitude, lng: longitude };
        map.setCenter(currentPosition);
        map.setZoom(13);

        // 사용자 위치 마커 추가
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

  return (
    <div className="map-container">
      <div id="map"></div>
      <div className="map-controls">
        <div className="search-container">
          <input
            type="text"
            placeholder="검색어를 입력하세요"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                handleSearch();
              }
            }}
          />
          <button onClick={handleSearch}></button>
        </div>
        <button
          className="current-location"
          onClick={handleCurrentLocation}
        ></button>
      </div>
    </div>
  );
};

export default MapHome;
