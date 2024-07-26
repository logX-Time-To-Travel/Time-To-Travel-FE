import ProfileCard from "./../components/User/ProfileCard";
import "./Mypage.css";
import btnimg from "../assets/Button-Edit.png";
import Navbar from "./../components/Navbar/Navbar";

import { useNavigate } from "react-router-dom";

const Mypage = () => {
  const navigate = useNavigate();
  return (
    <div>
      <div className="profile-container">
        <ProfileCard />
        <div className="edit-button-container">
          <button className="edit-button">
            <img src={btnimg} />
          </button>
        </div>
      </div>

      <div className="info-container">
        <div className="info-box">
          <div className="data-set">
            <p className="data-option">작성 게시글</p>
            <p className="data-value">1,0000000</p>
          </div>
          <button
            className="detail-btn"
            onClick={() => {
              navigate("/blog");
            }}
          >
            보기
          </button>
        </div>

        <div className="info-box">
          <div className="data-set">
            <p className="data-option">작성 댓글</p>
            <p className="data-value">202486</p>
          </div>

          <button
            className="detail-btn"
            onClick={() => {
              navigate("/blog");
            }}
          >
            보기
          </button>
        </div>

        <div className="info-box">
          <p className="data-option">조회수 합계</p>
          <p className="data-value">10000</p>
        </div>

        <div className="info-box">
          <p className="data-option">받은 좋아요 수 합계</p>
          <p className="data-value">100</p>
        </div>
      </div>
      <div className = "logout-box">
        <button className="logout-btn">로그아웃</button>
      </div>

      <div>
        <Navbar />
      </div>
    </div>
  );
};

export default Mypage;
