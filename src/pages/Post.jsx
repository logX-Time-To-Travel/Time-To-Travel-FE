import './Post.css';
import useTimeAgo from '../utils/getTimeAgo';
import viewIcon from '.././assets/Icon_ View 1.png';
import heartIcon from '.././assets/heart-after.png';
import checkIcon from '.././assets/Icon_ Accept 2.png';

const Post = ({ post, isSelectMode, isSelected, onPostSelect }) => {
  console.log('Post object:', post); // post 객체 로그 출력
  const timeAgo = useTimeAgo(post.createdAt);

  return (
    <div
      className={`post ${isSelected ? 'selected' : ''}`} // 선택된 상태에 따라 CSS 클래스 적용
      onClick={() => {
        console.log('Clicked postId:', post.postId); // 클릭된 postId 로그 확인
        if (isSelectMode) onPostSelect(post.postId); // postId를 전달
      }}
    >
      <div className="post-images">
        {isSelected && ( // 선택된 상태일 때 체크 아이콘 표시
          <div className="overlay">
            <img src={checkIcon} alt="check" className="check-icon" />
          </div>
        )}
      </div>

      <div className="post-container">
        <div className="post-title">
          <h3>{post.title}</h3>
        </div>
        <div className="interest-menu">
          <div className="views">
            <img src={viewIcon} alt="views" />
            <span>{post.viewCount}</span> {/* 뷰 카운트 표시 */}
          </div>
          <div className="hearts">
            <img src={heartIcon} alt="likes" />
            <span>{post.likeCount}</span> {/* 좋아요 수 표시 */}
          </div>
          <div className="time-ago">
            <span>{timeAgo}</span> {/* 게시물 작성 시간 표시 */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
