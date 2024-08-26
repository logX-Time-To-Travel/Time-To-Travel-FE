import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './SearchTable.css';
import backImage from '../../assets/Icon_ Back 1.png';
import markerImage from '../../assets/Icon_ Marker 1.png';

const LOCAL_GOOGLE_MAP_URL = 'http://localhost:5173/home';
const API_URL = 'http://localhost:8080/search'; // API 서버 URL

const SearchTable = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchHistory, setSearchHistory] = useState([]);
  const username = 'your_username'; // 사용자 이름을 적절히 설정하세요
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSearchHistory = async () => {
      try {
        const response = await axios.get(`${API_URL}/${username}`);
        if (Array.isArray(response.data)) {
          setSearchHistory(response.data); // 배열일 경우에만 설정
        } else {
          console.error('Fetched data is not an array:', response.data);
          setSearchHistory([]); // 배열이 아닐 경우 빈 배열로 초기화
        }
      } catch (error) {
        console.error('Error fetching search history:', error);
        setSearchHistory([]); // 오류 발생 시 빈 배열로 초기화
      }
    };

    fetchSearchHistory();
  }, [username]);

  const handleSearch = async () => {
    if (searchTerm && searchTerm.length > 1) {
      // 최소 2글자 이상일 때만 검색
      const updatedHistory = [
        searchTerm,
        ...searchHistory.filter((item) => item !== searchTerm),
      ];
      setSearchHistory(updatedHistory);

      // 검색 기록을 서버에 저장
      try {
        await axios.post(`${API_URL}/${username}`, { term: searchTerm });
      } catch (error) {
        console.error('Error saving search term:', error);
      }

      const localMapUrl = `${LOCAL_GOOGLE_MAP_URL}?query=${searchTerm}`;
      window.location.href = localMapUrl;
      setSearchTerm('');
    } else {
      alert('검색어는 2글자 이상 입력해야 합니다.'); // 경고 메시지 추가
    }
  };

  const handleHistoryClick = (item) => {
    setSearchTerm(item);
    // 클릭한 검색어로 바로 검색
    const localMapUrl = `${LOCAL_GOOGLE_MAP_URL}?query=${item}`;
    window.location.href = localMapUrl;
  };

  const handleDeleteHistory = async (item) => {
    // 검색 기록에서 해당 항목 삭제
    setSearchHistory((prev) => prev.filter((i) => i !== item));

    // 서버에서 해당 검색어 삭제
    try {
      await axios.delete(`${API_URL}/${username}`, { data: { term: item } });
    } catch (error) {
      console.error('Error deleting search term:', error);
    }
  };

  return (
    <div className="searchMap-container">
      <div className="header">
        <button className="back-button" onClick={() => window.history.back()}>
          <img src={backImage} alt="뒤로가기" className="back-image" />
        </button>
        <input
          type="text"
          className="searchMap-input"
          placeholder="주제나 장소 검색. #를 입력하시면 해시태그로 검색"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSearch()} // 엔터 키 검색
        />
        <button className="searchMap-button" onClick={handleSearch} />
      </div>
      <div className="history-container">
        <h3>검색 기록</h3>
        <ul>
          {Array.isArray(searchHistory) && searchHistory.length > 0 ? (
            searchHistory.map((item, index) => (
              <li key={index} onClick={() => handleHistoryClick(item)}>
                <img
                  src={markerImage}
                  alt="검색기록"
                  className="marker-image"
                />
                {item}
                <button
                  className="Sdelete-button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteHistory(item);
                  }}
                >
                  x
                </button>
              </li>
            ))
          ) : (
            <li>검색 기록이 없습니다.</li> // 검색 기록이 없을 때 표시할 메시지
          )}
        </ul>
      </div>
    </div>
  );
};

export default SearchTable;
