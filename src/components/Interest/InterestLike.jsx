import { useEffect, useState } from 'react';
import PostList from '../../pages/PostList';
import Header from '../UI/Header';
import './InterestLike.css';
import axios from 'axios';

const InterestLike = () => {
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
        `http://localhost:8080/likes/${memberId}`,
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
    <div className="interest-like-container">
      <Header text={'내가 좋아요 누른 페이지'} />
      <div className="interest-like-posts">
        <PostList posts={posts} />
      </div>
    </div>
  );
};

export default InterestLike;
