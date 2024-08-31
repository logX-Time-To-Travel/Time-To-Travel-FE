import './Blog.css';
import { useEffect, useState } from 'react';
import Header from '../components/UI/Header';
import PostList from './PostList';
import axios from 'axios';

const Blog = () => {
  // useContext를 한 번만 사용하여 필요한 값을 모두 가져옴
  const [username, setUsername] = useState('');
  const [posts, setPosts] = useState([]);

  const [isSelectMode, setIsSelectMode] = useState(false);
  const [selectedPosts, setSelectedPosts] = useState([]);

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
      console.error('Error fetching member id:', error);
    }
  };

  const fetchData = async (username) => {
    try {
      const postResponse = await axios.get(
        `http://localhost:8080/posts/user/${username}`,
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
      await fetchUsername();
      if (username) {
        fetchData(username);
      }
    };

    loadData();
  }, [username]);

  // 전체 게시글 수
  const totalPosts = posts.length;

  // 삭제된 게시글 수 (선택된 게시글 수로 가정)
  const deletedPosts = selectedPosts.length;

  const toggleSelectMode = () => {
    setIsSelectMode(!isSelectMode);
    setSelectedPosts([]); // 선택 모드 종료 시 선택된 게시글 초기화
  };

  const handlePostSelect = (postId) => {
    if (selectedPosts.includes(postId)) {
      setSelectedPosts(selectedPosts.filter((id) => id !== postId));
    } else {
      setSelectedPosts([...selectedPosts, postId]);
    }
  };

  const handleDelete = () => {
    deletePosts(selectedPosts);
    setSelectedPosts([]); // 선택 목록 초기화
    setIsSelectMode(false); // 선택 모드 종료
  };

  const handleSelectAll = () => {
    if (selectedPosts.length === totalPosts) {
      setSelectedPosts([]); // 모든 선택 해제
    } else {
      setSelectedPosts(posts.map((post) => post.id)); // 모든 게시글 선택
    }
  };

  return (
    <div className="page-container">
      <div className="content-container">
        <div className="blog-container">
          <Header
            homebtn={' '}
            page={'addpost'}
            titleText={'내 작성 게시글'}
            rightText={isSelectMode ? '완료' : '선택모드'}
            customFunc={toggleSelectMode}
          />
          <PostList
            posts={posts}
            isSelectMode={isSelectMode}
            selectedPosts={selectedPosts}
            onPostSelect={handlePostSelect}
          />
        </div>
      </div>
      {isSelectMode && (
        <div className="footer-container">
          <div className="action-buttons">
            <button className="select-all-btn" onClick={handleSelectAll}>
              {selectedPosts.length === totalPosts ? '선택 해제' : '전체 선택'}
            </button>
            <button className="delete-btn" onClick={handleDelete}>
              삭제
            </button>
          </div>
          <div className="info-section">
            <span className="selected-count">선택된 게시글</span>
            <span className="selected-count">
              {selectedPosts.length}개 (
              {totalPosts > 0
                ? ((deletedPosts / totalPosts) * 100).toFixed(2)
                : 0}
              %)
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Blog;
