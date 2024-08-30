import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar/Navbar';
import Header from '../components/UI/Header';
import './Interest.css';
import InterestCarousel from '../components/Interest/InterestCarousel';
import InterestScrap from '../components/Interest/InterestScrap';
import InterestLike from '../components/Interest/InterestLike';

const Interest = () => {
  const [recommendPosts, setRecommendPosts] = useState([]);

  useEffect(() => {
    const dummyPosts = [
      {
        postId: 1,
        title: '2층까지 이용 가능한 투썸플레이스의 전망은 어땠냐고요?',
        likeCount: 120,
        viewCount: 234,
        imageUrl: '/images/post1.jpg',
        createdAt: new Date(),
      },
      {
        postId: 2,
        title: '서래마을 카페 투어',
        likeCount: 95,
        viewCount: 157,
        imageUrl: '/images/post2.jpg',
        createdAt: new Date(),
      },
      {
        postId: 3,
        title: '삼육대학교 근처 최고매출 하이오 커피!',
        likeCount: 12,
        viewCount: 4,
        imageUrl: '/images/post3.jpg',
        createdAt: new Date(),
      },
      {
        postId: 4,
        title: '석계역 1번출구 앞 코인노래방 완전 좋던데요',
        likeCount: 200,
        viewCount: 100,
        imageUrl: '/images/post4.jpg',
        createdAt: new Date(),
      },
      {
        postId: 5,
        title: '아차산이 너무 좋아요 저는',
        likeCount: 1230,
        viewCount: 2344,
        imageUrl: '/images/post5.jpg',
        createdAt: new Date(),
      },
    ];
    setRecommendPosts(dummyPosts);
  }, []);

  return (
    <div className="interest-container">
      <div className="interest-scrollable">
        <Header text={'관심사'} />
        <div className="interest-recommend">
          <div className="interest-post-title">내 최근 활동 맞춤 게시글</div>
          <InterestCarousel posts={recommendPosts} />
        </div>
        <div className="interest-component">
          <InterestScrap />
          <InterestLike />
        </div>
      </div>
      <div className="interest-footer">
        <Navbar />
      </div>
    </div>
  );
};

export default Interest;
