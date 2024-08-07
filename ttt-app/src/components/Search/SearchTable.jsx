import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SearchTable.css';
import backImage from '../../assets/Icon_ Back 1.png';

const LOCAL_GOOGLE_MAP_URL = 'http://localhost:5173/home';

const SearchTable = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchHistory, setSearchHistory] = useState([]);
  const navigate = useNavigate();

  const handleSearch = () => {
    if (searchTerm) {
      setSearchHistory((prev) => [searchTerm, ...prev]);
      console.log(searchTerm);
      const localMapUrl = `${LOCAL_GOOGLE_MAP_URL}?query=${searchTerm}`;
      window.location.href = localMapUrl;
      setSearchTerm('');
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
          onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
        />
        <button className="searchMap-button" onClick={handleSearch}></button>
      </div>
      <div className="history-container">
        <h3>검색 기록</h3>
        <ul>
          {searchHistory.map((item, index) => (
            <li
              key={index}
              onClick={() => handleHistoryClick(item)}
              style={{ cursor: 'pointer', color: 'blue' }}
            >
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SearchTable;
