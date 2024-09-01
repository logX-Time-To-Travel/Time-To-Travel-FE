import './Blog.css';
import axios from 'axios';
import { useEffect, useState, useContext } from 'react';
import Header from '../components/UI/Header';
import PostList from './PostList';
import PostContext from '../plugins/PostContext';

const Blog = () => {
  const { posts, setPosts, deletePostsInContext } = useContext(PostContext);
  const [username, setUsername] = useState('');
  const [isSelectMode, setIsSelectMode] = useState(false);
  const [selectedPosts, setSelectedPosts] = useState([]);

  // 유저 이름 가져오기
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

  // 유저 이름에 해당하는 포스트 가져오기
  const fetchData = async (username) => {
    try {
      const postResponse = await axios.get(
        `http://localhost:8080/posts/user/${username}`,
        {
          withCredentials: true,
        }
      );
      console.log('Fetched posts:', postResponse.data); // 포스트가 잘 불러와지는지 확인
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

  // 게시글 선택 핸들러 수정된 부분
  const handlePostSelect = (postId) => {
    if (!postId) {
      console.warn('Invalid postId:', postId); // postId가 undefined일 경우 경고
      return;
    }

    console.log('Selected postId:', postId); // 선택된 postId 로그 확인

    if (selectedPosts.includes(postId)) {
      setSelectedPosts(selectedPosts.filter((id) => id !== postId));
    } else {
      setSelectedPosts([...selectedPosts, postId]);
    }

    console.log('Updated selectedPosts:', selectedPosts); // 선택된 ID 목록 로그 확인
  };

  // 전체 선택/해제 핸들러
  const handleSelectAll = () => {
    if (selectedPosts.length === posts.length) {
      setSelectedPosts([]); // 모든 선택 해제
    } else {
      const allPostIds = posts.map((post) => post.postId); // postId로 변경
      setSelectedPosts(allPostIds); // 모든 게시글 ID를 선택
      console.log('All Post IDs selected:', allPostIds); // 디버깅용 로그 추가
    }
  };

  const handleDelete = async () => {
    const validPostIds = selectedPosts.filter(
      (id) => id !== undefined && id !== null
    );

    if (validPostIds.length === 0) {
      console.log('No valid post IDs to delete.');
      return;
    }

    try {
      let response;
      if (validPostIds.length === 1) {
        // 단일 삭제 요청
        response = await axios.delete(
          `http://localhost:8080/posts/${validPostIds[0]}`,
          {
            withCredentials: true,
          }
        );
      } else {
        // 다중 삭제 요청 - 배열을 명확하게 전달
        response = await axios({
          method: 'delete',
          url: `http://localhost:8080/posts/delete`,
          data: validPostIds, // 배열로 직접 전달, { postId: validPostIds }가 아님
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        });
      }

      // 상태 업데이트
      setPosts((prevPosts) =>
        prevPosts.filter((post) => !validPostIds.includes(post.postId))
      );
    } catch (error) {
      console.error('Error deleting posts:', error);
      if (error.response) {
        console.error('Response data:', error.response.data);
        console.error('Response status:', error.response.status);
      }
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
            customFunc={() => {
              setIsSelectMode(!isSelectMode);
              setSelectedPosts([]); // 선택 모드 전환 시 선택된 게시글 초기화
            }}
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
              {selectedPosts.length === posts.length
                ? '선택 해제'
                : '전체 선택'}
            </button>
            <button className="delete-btn" onClick={handleDelete}>
              삭제
            </button>
          </div>
          <div className="info-section">
            <span className="selected-count">선택된 게시글</span>
            <span className="selected-count">
              {selectedPosts.length}개 (
              {posts.length > 0
                ? ((selectedPosts.length / posts.length) * 100).toFixed(2)
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
