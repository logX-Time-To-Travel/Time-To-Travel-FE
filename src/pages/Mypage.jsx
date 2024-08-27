import ProfileCard from '../components/User/ProfileCard';
import './Mypage.css';
import btnimg from '../assets/Button-Edit.png';
import Navbar from '../components/Navbar/Navbar';

import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';

const Mypage = () => {
  const [username, setUsername] = useState('');
  const [user, setUser] = useState({
    email: '',
    username: '',
    introduction: '',
    profileImageUrl: '',
    created_at: '',
    totalLikeCount: 0,
    totalViewCount: 0,
  });
  const navigate = useNavigate();

  const handleLogout = () => {
    axios.post('http://localhost:8080/member/logout', null, {
      withCredentials: true,
    });
    console.log('로그아웃');
    navigate('/signin');
  };

  const fetchUsername = async () => {
    try {
      const usernameResponse = await axios.get(
        'http://localhost:8080/member/session',
        {
          withCredentials: true,
        }
      );
      setUsername(usernameResponse.data.username);
    } catch (error) {
      console.error('Error fetching username:', error);
    }
  };

  const fetchData = async (username) => {
    try {
      const userResponse = await axios.get(
        `http://localhost:8080/member/${username}`,
        {
          withCredentials: true,
        }
      );
      setUser(userResponse.data);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  useEffect(() => {
    const loadData = async () => {
      await fetchUsername();
      if (username) {
        fetchData(username);
      }
    };

    loadData();
    console.log(user);
  }, [username]);

  return (
    <div>
      <div className="profile-container">
        <ProfileCard
          profileImageUrl={user.profileImageUrl}
          username={user.username}
          introduction={user.introduction}
        />
        <div className="edit-button-container">
          <button
            className="edit-button"
            onClick={() => {
              console.log('클릭');
            }}
          >
            <img src={btnimg} alt="Edit" />
          </button>
        </div>
      </div>

      <div className="info-container">
        <div className="info-box">
          <div className="data-set">
            <p className="data-option">작성 게시글</p>
            <p className="data-value">{user.totalViewCount}</p>
          </div>
          <button
            className="detail-btn"
            onClick={() => {
              navigate('/blog');
            }}
          >
            보기
          </button>
        </div>

        <div className="info-box">
          <div className="data-set">
            <p className="data-option">작성 댓글</p>
            <p className="data-value">{user.totalLikeCount}</p>
          </div>

          <button
            className="detail-btn"
            onClick={() => {
              navigate('/blog');
            }}
          >
            보기
          </button>
        </div>

        <div className="info-box">
          <p className="data-option">조회수 합계</p>
          <p className="data-value">{user.totalViewCount}</p>
        </div>

        <div className="info-box">
          <p className="data-option">받은 좋아요 수 합계</p>
          <p className="data-value">{user.totalLikeCount}</p>
        </div>
      </div>

      <div className="user-state-container">
        <div className="info-box">
          <p className="data-option">가입일</p>
          <p className="data-value">
            {new Date(user.created_at).toLocaleDateString('ko-KR')}
          </p>
        </div>
      </div>

      <div className="logout-box">
        <button className="logout-btn" onClick={handleLogout}>
          로그아웃
        </button>
      </div>

      <div>
        <Navbar />
      </div>
    </div>
  );
};

export default Mypage;
