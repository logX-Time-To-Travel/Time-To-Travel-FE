import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar/Navbar';
import Header from '../components/UI/Header';
import './Interest.css';
import InterestCarousel from '../components/Interest/InterestCarousel';
import { useNavigate } from 'react-router-dom';

const Interest = () => {
  const [recommendPosts, setRecommendPosts] = useState([]);
  const navigate = useNavigate();
  const handleClickScrap = () => {
    navigate('/interest/scrap');
  };
  const handleClickLike = () => {
    navigate('/interest/like');
  };

  useEffect(() => {
    const dummyPosts = [
      {
        postId: 1111,
        title: '투썸플레이스에서 본 풍경',
        profileImageUrl: '/images/default.png',
        username: 'user1',
        thumbnail: '/images/20240828001158_IMG_4577.jpeg',
        createdAt: new Date(),
      },
      {
        postId: 2222,
        title: '서래마을 카페에서의 하루',
        profileImageUrl: '/images/profile2.jpg',
        username: 'user2',
        thumbnail: '/images/post2.jpg',
        createdAt: new Date(),
      },
      {
        postId: 3333,
        title: '커피 한 잔의 여유',
        profileImageUrl: '/images/profile3.jpg',
        username: 'user3',
        thumbnail: '/images/post3.jpg',
        createdAt: new Date(),
      },
      {
        postId: 4444,
        title: '코인노래방 탐방기',
        profileImageUrl: '/images/profile4.jpg',
        username: 'user4',
        thumbnail: '/images/post4.jpg',
        createdAt: new Date(),
      },
      {
        postId: 5555,
        title: '아차산 등산 후기',
        profileImageUrl: '/images/profile5.jpg',
        username: 'user5',
        thumbnail: '/images/post5.jpg',
        createdAt: new Date(),
      },
    ];
    setRecommendPosts(dummyPosts);
  }, []);

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
            <div className="scrap-count">2개</div>
          </div>
          <div className="interest-heart-container" onClick={handleClickLike}>
            <div className="heart-title">내가 좋아요한 게시글</div>
            <div className="heart-count">0개</div>
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
