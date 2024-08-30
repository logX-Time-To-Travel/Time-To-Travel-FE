import './Blog.css';
import { useContext, useState } from 'react';
import PostContext from '../plugins/PostContext';
import Header from '../components/UI/Header';
import PostList from './PostList';

const Blog = () => {
  const { posts, deletePosts } = useContext(PostContext);
  const [isSelectMode, setIsSelectMode] = useState(false);
  const [selectedPosts, setSelectedPosts] = useState([]);

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
            text={'내 작성 게시글'}
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
            <span className="selected-count">
              선택된 게시글
            </span>
            <span className="selected-count">
            {selectedPosts.length}개
            (
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
