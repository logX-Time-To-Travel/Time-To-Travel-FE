import { useNavigate, useParams } from 'react-router-dom';
import Navbar from '../components/Navbar/Navbar';
import './PostDetail.css';
import axios from 'axios';
import { useEffect, useState } from 'react';

import heartBefore from '../assets/heart-before.png';
import heartAfter from '../assets/heart-after.png';
import commentsIcon from '../assets/Comments.png';
import starBefore from '../assets/star-before.png';
import starAfter from '../assets/star-after.png';
import PostProfile from '../components/Post/PostProfile';
import PostMore from '../components/Post/PostMore';

const PostDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState({
    id: null,
    title: '',
    username: '',
    profileImageUrl: '',
    introduction: '',
    data: '',
    locations: [],
    postCount: 0,
    likeCount: 0,
    viewCount: 0,
    commentCount: 0,
    createdAt: '',
  });
  const [member, setMember] = useState({});
  const [isAuthor, setAuthor] = useState(false);
  const [locationText, setLocationText] = useState('');
  const [isLiked, setIsLiked] = useState(false);
  const [isScrapped, setIsScrapped] = useState(false);
  const [headerColor, setHeaderColor] = useState('#FAA500');

  const fetchData = async () => {
    const userResponse = await axios.get(
      'http://localhost:8080/member/session',
      {
        withCredentials: true,
      }
    );

    const postResponse = await axios.get(`http://localhost:8080/posts/${id}`, {
      withCredentials: true,
    });
    setMember(userResponse.data);
    setPost(postResponse.data);
    setIsLiked(postResponse.data.liked);
    setIsScrapped(postResponse.data.scrapped);
  };

  const setInfo = () => {
    if (post.username == member.username) {
      setAuthor(true);
    }

    if (post.locations.length === 1) {
      setLocationText('단일 여행');
    } else {
      setLocationText(`${post.locations.length}개의 여행`);
    }
  };

  const handleLikeClick = () => {
    if (!isLiked) {
      axios.post(
        `http://localhost:8080/likes/${post.id}/${member.memberId}`,
        null,
        {
          withCredentials: true,
        }
      );
    } else {
      axios.delete(
        `http://localhost:8080/likes/${post.id}/${member.memberId}`,
        {
          withCredentials: true,
        }
      );
    }

    setIsLiked(!isLiked);
    setPost((prev) => ({
      ...prev,
      likeCount: isLiked ? prev.likeCount - 1 : prev.likeCount + 1,
    }));
  };

  const handleCommentClick = () => {
    navigate(`/comment/${id}`);
  };

  const handleScrapClick = () => {
    if (!isScrapped) {
      axios.post(
        `http://localhost:8080/scraps/${post.id}/${member.memberId}`,
        null,
        {
          withCredentials: true,
        }
      );
    } else {
      axios.delete(
        `http://localhost:8080/scraps/${post.id}/${member.memberId}`,
        {
          withCredentials: true,
        }
      );
    }

    setIsScrapped(!isScrapped);
    setPost((prev) => ({
      ...prev,
    }));
  };

  const handleEditClick = () => {
    navigate(`/edit/${id}`);
  };

  const handleDeleteClick = () => {
    if (confirm('게시물을 삭제하겠습니까?')) {
      axios
        .delete(`/post/${id}`)
        .then(() => {
          alert('삭제되었습니다.');
          navigate(`/member/${post.username}`);
        })
        .catch(
          alert('오류로 게시글을 삭제할 수 없습니다. 다시 시도해 주세요.')
        );
    }
  };

  useEffect(() => {
    const colors = [
      '#FAA500', // 주황색
      '#88C137', // 초록색
      '#EE2448', // 빨간색
      '#23BEC3', // 하늘색
      '#27BFB3', // 청록색
      '#C91AA9', // 핑크색
      '#7360DC', // 보라색
      '#97ACB6', // 회색
    ];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    setHeaderColor(randomColor);
  }, []);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    setInfo();
  }, [post, member]);

  return (
    <div className="post-detail-container">
      <div className="post-detail-scrollable">
        <div
          className="post-detail-header"
          style={{ backgroundColor: headerColor }}
        >
          <div className="post-detail-title">{post.title}</div>
          <div className="post-detail-info-container">
            <div className="post-detail-info">
              <span className="post-detail-username">{post.username}</span>
              <strong> | </strong>
              <span className="post-detail-date">
                {(() => {
                  const date = new Date(post.createdAt);
                  return `${date.getFullYear()}년 ${
                    date.getMonth() + 1
                  }월 ${date.getDate()}일`;
                })()}
              </span>
            </div>
            <div className="post-detail-type">{locationText}</div>
          </div>
        </div>
        <div
          className="post-detail-content"
          dangerouslySetInnerHTML={{ __html: post.data }}
        />

        <PostProfile
          profileImageUrl={post.profileImageUrl}
          username={post.username}
          postCount={post.postCount}
          introduction={post.introduction}
        />
      </div>

      <div className="post-detail-footer">
        <PostMore
          postId={id}
          handleLikeClick={handleLikeClick}
          handleScrapClick={handleScrapClick}
          handleCommentClick={handleCommentClick}
          handleEditClick={handleEditClick}
          handleDeleteClick={handleDeleteClick}
          isLiked={isLiked}
          isScrapped={isScrapped}
          isAuthor={isAuthor}
          likeCount={post.likeCount}
          commentCount={post.commentCount}
          heartAfter={heartAfter}
          heartBefore={heartBefore}
          starAfter={starAfter}
          starBefore={starBefore}
          commentsIcon={commentsIcon}
        />

        <Navbar />
      </div>
    </div>
  );
};

export default PostDetail;
