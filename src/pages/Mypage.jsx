import ProfileCard from '../components/User/ProfileCard';
import './Mypage.css';
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
    <div className="mypage-container">
      <div className="mypage-editor-wrapper">
        <div className="mypage-profile-container">
          <ProfileCard
            profileImageUrl={user.profileImageUrl}
            username={user.username}
            introduction={user.introduction}
          />
        </div>

        <div className="mypage-info-container">
          <div className="mypage-info-box">
            <div className="mypage-data-set">
              <p className="mypage-data-option">작성 게시글</p>
              <p className="mypage-data-value">{user.totalPostCount}</p>
            </div>
            <button
              className="mypage-detail-btn"
              onClick={() => {
                navigate('/blog');
              }}
            >
              보기
            </button>
          </div>

          <div className="mypage-info-box">
            <div className="mypage-data-set">
              <p className="mypage-data-option">작성 댓글</p>
              <p className="mypage-data-value">{user.totalCommentCount}</p>
            </div>
          </div>

          <div className="mypage-info-box">
            <p className="mypage-data-option">조회수 합계</p>
            <p className="mypage-data-value">{user.totalViewCount}</p>
          </div>

          <div className="mypage-info-box">
            <p className="mypage-data-option">받은 좋아요 수 합계</p>
            <p className="mypage-data-value">{user.totalLikeCount}</p>
          </div>
        </div>

        <div className="mypage-user-state-container">
          <div className="mypage-info-box">
            <p className="mypage-data-option">가입일</p>
            <p className="mypage-data-value">
              {() => {
                const date = new Date(user.createdAt);
                return `${date.getFullYear()}년 ${
                  date.getMonth() + 1
                }월 ${date.getDate()}일`;
              }}
            </p>
          </div>
        </div>

        <div className="mypage-logout-box">
          <button className="mypage-logout-btn" onClick={handleLogout}>
            로그아웃
          </button>
        </div>
      </div>

      <div className="mypage-footer">
        <Navbar />
      </div>
    </div>
  );
};

export default Mypage;
