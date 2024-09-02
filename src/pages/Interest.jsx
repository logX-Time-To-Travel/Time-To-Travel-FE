import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar/Navbar';
import Header from '../components/UI/Header';
import './Interest.css';
import InterestCarousel from '../components/Interest/InterestCarousel';
import { useNavigate } from 'react-router-dom';
import InterestStar from '../assets/interestStar.png';
import InterestHeart from '../assets/interestHeart.png';
import axios from 'axios';

const Interest = () => {
  const [recommendPosts, setRecommendPosts] = useState([]);
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  const handleClickScrap = () => {
    navigate('/interest/scrap');
  };

  const handleClickLike = () => {
    navigate('/interest/like');
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

  const fetchData = async () => {
    const postResponse = await axios.get(
      `http://localhost:8080/interest/${username}`,
      { withCredentials: true }
    );
    setRecommendPosts(postResponse.data);
  };

  useEffect(() => {
    const loadData = async () => {
      await fetchUsername();
      if (username) {
        fetchData(username);
      }
    };

    loadData();
  }, [username]);

  return (
    <div className="interest-container">
      <div className="interest-scrollable">
        <Header page={'home'} titleText={'관심사'} />
        <div className="interest-recommend">
          <div className="interest-post-title">내 최근 활동 맞춤 게시글</div>
          <InterestCarousel posts={recommendPosts} />
        </div>
        <div className="interest-component">
          <div className="interest-scrap-container" onClick={handleClickScrap}>
            <div className="scrap-title">내가 별표한 게시글</div>
            <div className="icon-container">
              <img src={InterestStar} className="interest-icon" />
            </div>
          </div>
          <div className="interest-heart-container" onClick={handleClickLike}>
            <div className="heart-title">내가 좋아요한 게시글</div>
            <div className="icon-container">
              <img src={InterestHeart} className="interest-icon" />
            </div>
          </div>
        </div>
      </div>
      <div className="interest-footer">
        <Navbar />
      </div>
    </div>
  );
};

export default Interest;
