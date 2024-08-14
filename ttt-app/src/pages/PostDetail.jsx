import { useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar/Navbar';
import './PostDetail.css';
import axios from 'axios';
import { useEffect, useState } from 'react';

import heartBefore from '../assets/heart-before.png';
import heartAfter from '../assets/heart-after.png';
import commentsIcon from '../assets/Comments.png';
import starBefore from '../assets/star-before.png';
import starAfter from '../assets/star-after.png';

const PostDetail = () => {
  const { id } = useLocation();
  const [post, setPost] = useState({
    id: null,
    username: '',
    title: '',
    data: '',
    locations: [],
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

  const fetchData = async () => {
    const userResponse = await axios.get('/member/session');
    const postResponse = await axios.get(`/post/${id}`);
    setMember(userResponse.data);
    setPost(postResponse.data);
  };

  const setInfo = () => {
    if (post.username === member.username) {
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

  useEffect(() => {
    // fetchData();     // API 호출 함수 주석 처리

    setPost(dummyPost); // 더미데이터 사용
    setMember({ username: '천재123' }); // 더미 유저 추가
    setInfo(); // 유지 예정
  }, [id]);

  const dummyPost = {
    id: 1,
    username: '천재123',
    title: '오늘은 석계문고에 다녀왔습니다.',
    data: `<p>요즘 여러 신축 건물에 위치한 예쁜 서점들을 자주 들르는 편인데, <br><br><br><br><br>테라코타 벽돌을 테마로 그에 맞춰 아름다운 조형물을 내세우거나 아예 고풍스러운 카페를 콘셉트로 잡은 후 샹들리에를 달고 은촛대를 놓은 모습을 보면 저도 모르게 만족감이 느껴집니다. 하지만 그러면서도, 어릴 적 많이 볼 수 있었던 지하 잡화점이나 문구점, 서점이 그리워질 때가 있습니다...</p>
    <p>지하는 사실 그렇게 선호되는 건물 양식은 아닙니다. 습해서 곰팡이가 잘 피기 쉽상이고, 여름엔 더 덥고 겨울엔 더 추우니까요. <br><br><br><br><br><br><br><br><br><br><br><br>그래서 그런지 지하에 위치한 상점을 보기가 요 근래에는 더 힘들어진 듯합니다.</p>`,
    locations: [
      { id: 1, name: '석계문고' },
      { id: 2, name: '또 다른 장소' },
    ],
    likeCount: 53,
    commentCount: 12,
    viewCount: 123,
    createdAt: '2024년 3월 21일',
  };

  return (
    <div className="post-detail-container">
      <div className="post-detail-scrollable">
        <div className="post-detail-header">
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
      </div>
      <div className="post-detail-footer">
        <div className="post-detail-more">
          <div className="post-detail-more-gap">
            <div className="post-detail-likes" onClick={handleLikeClick}>
              <img src={isLiked ? heartAfter : heartBefore} alt="Like" />
              {post.likeCount}
            </div>
            <div className="post-detail-comments">
              <img src={commentsIcon} alt="Comments" />
              {post.commentCount}
            </div>
          </div>

          <div className="post-detail-scrap" onClick={handleScrapClick}>
            <img src={isScrapped ? starAfter : starBefore} alt="Scrap" />
          </div>
        </div>
        <Navbar />
      </div>
    </div>
  );
};

export default PostDetail;
