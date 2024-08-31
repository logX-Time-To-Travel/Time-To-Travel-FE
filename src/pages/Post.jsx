import './Post.css';
import useTimeAgo from '../utils/getTimeAgo';
import viewIcon from '.././assets/Icon_ View 1.png';
import heartIcon from '.././assets/heart-after.png';
import checkIcon from '.././assets/Icon_ Accept 2.png';

const Post = ({ post, isSelectMode, isSelected, onPostSelect }) => {
  const timeAgo = useTimeAgo(post.createdAt);

  return (
    <div
      className={`post ${isSelected ? 'selected' : ''}`}
      onClick={() => isSelectMode && onPostSelect(post.id)}
    >
      <div className="post-images">
        {isSelected && (
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
            <span>1.1만</span>
          </div>
          <div className="hearts">
            <img src={heartIcon} alt="likes" />
            <span>312</span>
          </div>
          <div className="time-ago">
            <span>{timeAgo}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
