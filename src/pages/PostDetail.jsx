import { useLocation, useNavigate } from 'react-router-dom';
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
  const { id } = useLocation();
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
    const userResponse = await axios.get('/member/session');
    const postResponse = await axios.get(`/post/${id}`);
    setMember(userResponse.data);
    setPost(postResponse.data);
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
    setIsLiked(!isLiked);
    setPost((prev) => ({
      ...prev,
      likeCount: isLiked ? prev.likeCount - 1 : prev.likeCount + 1,
    }));
  };

  const handleScrapClick = () => {
    setIsScrapped(!isScrapped);
    setPost((prev) => ({
      ...prev,
    }));
  };

  const handleEditClick = () => {
    // 수정 작업
  };

  const handleDeleteClick = () => {
    if (confirm('게시물을 삭제하겠습니까?')) {
      axios
        .delete(`/post/${id}`)
        .then(() => {
          alert('삭제되었습니다.');
          navigate(`member/${post.username}`);
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
    // fetchData();     // API 호출 함수 주석 처리

    setPost(dummyPost); // 더미데이터 사용
    setMember({ username: '천재123' }); // 더미 유저 추가
  }, [id]);

  useEffect(() => {
    setInfo();
  }, [post, member]);

  const dummyPost = {
    id: 1,
    title: '오늘은 석계문고에 다녀왔습니다.',
    username: '천재123',
    profileImageUrl: 'https://example.com/path/to/profile-image.jpg',
    introduction: '저는 여행다니기를 좋아하는 사람입니다. 만나서 반갑습니다.',
    data: `<p>요즘 여러 신축 건물에 위치한 예쁜 서점들을 자주 들르는 편인데, <br><br><br><br><br>테라코타 벽돌을 테마로 그에 맞춰 아름다운 조형물을 내세우거나 아예 고풍스러운 카페를 콘셉트로 잡은 후 샹들리에를 달고 은촛대를 놓은 모습을 보면 저도 모르게 만족감이 느껴집니다. 하지만 그러면서도, 어릴 적 많이 볼 수 있었던 지하 잡화점이나 문구점, 서점이 그리워질 때가 있습니다...</p>
  <p>지하는 사실 그렇게 선호되는 건물 양식은 아닙니다. 습해서 곰팡이가 잘 피기 쉽상이고, 여름엔 더 덥고 겨울엔 더 추우니까요. <br><br><br><br><br><br><br><br><br><br><br><br>그래서 그런지 지하에 위치한 상점을 보기가 요 근래에는 더 힘들어진 듯합니다.</p>`,
    locations: [
      { id: 1, name: '석계문고' },
      { id: 2, name: '또 다른 장소' },
    ],
    postCount: 5,
    likeCount: 53,
    commentCount: 12,
    viewCount: 123,
    createdAt: '2024년 3월 21일',
  };

  return (
    <div className="post-detail-container">
      <div className="post-detail-scrollable">
        <div
          className="post-detail-header"
          style={{ backgroundColor: headerColor }}
        >
          <div className="post-detail-title">{post.title}</div>
          <div className="post-detail-info">
            <span className="post-detail-username">{post.username}</span>
            <strong> | </strong>
            <span className="post-detail-date">{post.createdAt}</span>
          </div>
          <div className="post-detail-type">{locationText}</div>
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
          handleLikeClick={handleLikeClick}
          handleScrapClick={handleScrapClick}
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
