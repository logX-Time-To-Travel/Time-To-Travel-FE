import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './SearchTable.css';
import backImage from '../../assets/Icon_ Back 1.png';
import markerImage from '../../assets/Icon_ Marker 1.png';
import { useNavigate } from 'react-router-dom';
const LOCAL_GOOGLE_MAP_URL = 'http://localhost:5173/home';
const API_URL = 'http://localhost:8080/search';

const SearchTable = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchHistory, setSearchHistory] = useState([]);
  const [username, setUsername] = useState(''); // username 상태 추가
  const [member, setMember] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchMember = async () => {
      try {
        const userResponse = await axios.get(
          'http://localhost:8080/member/session',
          {
            withCredentials: true,
            headers: {
              'Content-Type': 'application/json', // 요청 헤더에 Content-Type 설정
            },
          }
        );
        setMember(userResponse.data);
        setUsername(userResponse.data.username); // username 설정
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
            setSearchHistory(response.data.map((item) => item.query)); // query만 추출하여 배열로 설정
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
      alert('검색어는 2글자 이상 입력해야 합니다.');
    }
  };

  const handleHistoryClick = (item) => {
    setSearchTerm(item);
    const localMapUrl = `${LOCAL_GOOGLE_MAP_URL}?query=${item}`;
    window.location.href = localMapUrl;
  };

  const handleDeleteHistory = async (item) => {
    setSearchHistory((prev) => prev.filter((i) => i !== item));

    try {
      await axios.delete(`${API_URL}/${username}`, { data: { term: item } });
    } catch (error) {
      console.error('Error deleting search term:', error);
      alert('검색어 삭제 중 오류가 발생했습니다.');
    }
  };

  return (
    <div className="searchMap-container">
      <div className="header">
        <button className="back-button" onClick={() => navigate('/home')}>
          <img src={backImage} alt="뒤로가기" className="back-image" />
        </button>
        <input
          type="text"
          className="searchMap-input"
          placeholder="주제나 장소 검색. #를 입력하시면 해시태그로 검색"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
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
            <li>검색 기록이 없습니다.</li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default SearchTable;
