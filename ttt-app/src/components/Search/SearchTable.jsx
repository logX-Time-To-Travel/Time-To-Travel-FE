import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./SearchTable.css";
import backImage from "../../assets/Icon_ Back 1.png";
import markerImage from "../../assets/Icon_ Marker 1.png";

const LOCAL_GOOGLE_MAP_URL = "http://localhost:5173/home";

const SearchTable = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchHistory, setSearchHistory] = useState([]);
  const navigate = useNavigate();

  // 임시 검색 기록 추가
  useEffect(() => {
    const initialHistory = ["서울", "부산", "제주도", "인천", "경주"]; // 임시 검색 기록
    setSearchHistory(initialHistory);
  }, []);

  const handleSearch = () => {
    if (searchTerm && searchTerm.length > 1) {
      // 최소 2글자 이상일 때만 검색
      setSearchHistory((prev) => [
        searchTerm,
        ...prev.filter((item) => item !== searchTerm),
      ]);
      console.log(searchTerm);
      const localMapUrl = `${LOCAL_GOOGLE_MAP_URL}?query=${searchTerm}`;
      window.location.href = localMapUrl;
      setSearchTerm("");
    } else {
      alert("검색어는 2글자 이상 입력해야 합니다."); // 경고 메시지 추가
    }
  };

  const handleHistoryClick = (item) => {
    setSearchTerm(item);
    // 클릭한 검색어로 바로 검색
    const localMapUrl = `${LOCAL_GOOGLE_MAP_URL}?query=${item}`;
    window.location.href = localMapUrl;
  };

  const handleDeleteHistory = (item) => {
    // 검색 기록에서 해당 항목 삭제
    setSearchHistory((prev) => prev.filter((i) => i !== item));
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
          onKeyPress={(e) => e.key === "Enter" && handleSearch()} // 엔터 키 검색
        />
        <button className="searchMap-button" onClick={handleSearch} />
      </div>
      <div className="history-container">
        <h3>검색 기록</h3>
        <ul>
          {searchHistory.map((item, index) => (
            <li key={index} onClick={() => handleHistoryClick(item)}>
              <img src={markerImage} alt="검색기록" className="marker-image" />
              {item}
              <button
                className="delete-button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleDeleteHistory(item);
                }}
              >
                x
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SearchTable;
