import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './SearchTable.css';
import backImage from '../../assets/Icon_ Back 1.png';
import markerImage from '../../assets/Icon_ Marker 1.png';
import { useNavigate } from 'react-router-dom';

const LOCAL_GOOGLE_MAP_URL = 'http://localhost:5173/home';
const API_URL = 'http://localhost:8080/search';

const SearchTable = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [searchHistory, setSearchHistory] = useState([]);
  const [username, setUsername] = useState('');
  const [member, setMember] = useState(null);
  const [suggestions, setSuggestions] = useState([]); // 추천 검색어 상태 추가

  useEffect(() => {
    const fetchMember = async () => {
      try {
        const userResponse = await axios.get(
          'http://localhost:8080/member/session',
          {
            withCredentials: true,
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );
        setMember(userResponse.data);
        setUsername(userResponse.data.username);
      } catch (error) {
        console.error('Error fetching member info:', error);
      }
    };

    fetchMember();
  }, []);

  useEffect(() => {
    const fetchSearchHistory = async () => {
      if (username) {
        try {
          const response = await axios.get(`${API_URL}/${username}`);
          if (Array.isArray(response.data)) {
            setSearchHistory(
              response.data.map((item) => ({
                id: item.searchHistoryId, // id 추가
                query: item.query,
              }))
            );
          } else {
            console.error('Fetched data is not an array:', response.data);
            setSearchHistory([]);
          }
        } catch (error) {
          console.error('Error fetching search history:', error);
          setSearchHistory([]);
        }
      }
    };

    fetchSearchHistory();
  }, [username]);

  const handleSearch = async () => {
    if (searchTerm && searchTerm.trim().length > 1) {
      const updatedHistory = [
        searchTerm,
        ...searchHistory.filter((item) => item !== searchTerm),
      ];
      setSearchHistory(updatedHistory);

      try {
        await axios.post(`${API_URL}/${username}`, { keyword: searchTerm });
      } catch (error) {
        console.error('Error saving search term:', error);
        alert('검색어 저장 중 오류가 발생했습니다.');
      }

      const localMapUrl = `${LOCAL_GOOGLE_MAP_URL}?query=${searchTerm}`;
      window.location.href = localMapUrl;
      setSearchTerm('');
    } else {
      alert('올바른 주소를 입력하세요.');
    }
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value); // 검색어 상태 업데이트

    // 추천 검색어 가져오기
    if (value) {
      const service = new window.google.maps.places.AutocompleteService();
      service.getPlacePredictions({ input: value }, (predictions, status) => {
        if (status === window.google.maps.places.PlacesServiceStatus.OK) {
          setSuggestions(predictions); // 추천 검색어 업데이트
        } else {
          setSuggestions([]);
        }
      });
    } else {
      setSuggestions([]); // 검색어가 없으면 추천 리스트 초기화
    }
  };

  const handleHistoryClick = async (item) => {
    setSearchTerm(item);
    const localMapUrl = `${LOCAL_GOOGLE_MAP_URL}?query=${item}`;
    window.location.href = localMapUrl;

    // 검색 기록에 추가
    const updatedHistory = [item, ...searchHistory.filter((i) => i !== item)];
    setSearchHistory(updatedHistory);

    // 검색어 저장 API 호출
    try {
      await axios.post(`${API_URL}/${username}`, { keyword: item });
    } catch (error) {
      console.error('Error saving search term:', error);
      alert('검색어 저장 중 오류가 발생했습니다.');
    }
  };

  const handleDeleteHistory = async (id) => {
    setSearchHistory((prev) => prev.filter((item) => item.id !== id));

    try {
      await axios.delete(`${API_URL}/${username}/${id}`); // id를 사용하여 삭제 요청
    } catch (error) {
      console.error('Error deleting search term:', error);
      alert('검색어 삭제 중 오류가 발생했습니다.');
    }
  };
  return (
    <div className="searchMap-container">
      <div className="header">
        <div className="serach-back-button" onClick={() => navigate('/home')}>
          <img src={backImage} alt="뒤로가기" className="search-back-image" />
        </div>
        <input
          type="text"
          className="searchMap-input"
          placeholder="주제나 장소 검색. #를 입력하시면 해시태그로 검색"
          value={searchTerm}
          onChange={handleSearchChange} // 검색어 변화 처리
          onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
        />
        <div className="searchMap-button" onClick={handleSearch} />
      </div>
      {suggestions.length > 0 && (
        <ul className="Search-reco">
          {suggestions.map((suggestion, index) => (
            <li
              key={index}
              onClick={() => handleHistoryClick(suggestion.description)}
            >
              {suggestion.description}
            </li>
          ))}
        </ul>
      )}
      <div className="history-container">
        <h3>검색 기록</h3>
        <ul>
          {Array.isArray(searchHistory) && searchHistory.length > 0 ? (
            searchHistory.map((item) => (
              <li key={item.id} onClick={() => handleHistoryClick(item.query)}>
                <img
                  src={markerImage}
                  alt="검색기록"
                  className="search-marker-image"
                />
                {item.query} {/* item.query로 수정 */}
                <button
                  className="Sdelete-button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteHistory(item.id); // id를 사용하여 삭제
                  }}
                >
                  x
                </button>
              </li>
            ))
          ) : (
            <li>검색 기록이 없습니다.</li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default SearchTable;
