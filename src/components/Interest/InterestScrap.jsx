import { useEffect, useState } from 'react';
import PostList from '../../pages/PostList';
import Header from '../UI/Header';
import './InterestScrap.css';
import axios from 'axios';

const InterestScrap = () => {
  const [memberId, setMemberId] = useState('');
  const [posts, setPosts] = useState([]);

  const fetchMemberId = async () => {
    try {
      const usernameResponse = await axios.get(
        'http://localhost:8080/member/session',
        {
          withCredentials: true,
        }
      );
      setMemberId(usernameResponse.data.memberId);
    } catch (error) {
      console.error('Error fetching member id:', error);
    }
  };

  const fetchData = async (memberId) => {
    try {
      const postResponse = await axios.get(
        `http://localhost:8080/scraps/${memberId}`,
        {
          withCredentials: true,
        }
      );
      setPosts(postResponse.data);
    } catch (error) {
      console.error('Error fetching post data:', error);
    }
  };

  useEffect(() => {
    const loadData = async () => {
      await fetchMemberId();
      if (memberId) {
        fetchData(memberId);
      }
    };

    loadData();
  }, [memberId]);

  return (
    <div className="scrap-container">
      <Header titleText={'내가 별표한 게시글'} page={'interest'} />
      <div className="scrap-posts">
        <PostList
          posts={posts}
          isSelectMode={false}
          selectedPosts={[]} // 빈 배열로 변경
          onPostSelect={() => {}} // 선택 모드가 아니므로 빈 함수 전달
        />
      </div>
    </div>
  );
};

export default InterestScrap;
