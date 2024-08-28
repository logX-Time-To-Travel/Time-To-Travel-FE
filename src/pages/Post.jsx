import './Post.css';
import Modal from '../components/UI/Modal';
import { useState } from 'react';
import viewIcon from '.././assets/Icon_ View 1.png';
import heartIcon from '.././assets/heart-after.png';
import markerIcon from '.././assets/Icon_ Map 1.png';

const Post = ({ post }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const truncateText = (text, maxLength) => {
    if (post.locations.length < 2 && text.length <= maxLength) {
      return text;
    }
    return text.slice(0, maxLength) + '...';
  };

  const maxLength = 9; // 최대 8글자
  const addressText =
    post.locations.length > 0 ? post.locations[0].address : '위치 정보 없음';

  return (
    <div className="post">
      <div className="post-images">
        <div className="post-location">
          {post.locations.length > 0 ? (
            post.locations.length > 1 ? (
              <>
                <img src={markerIcon} alt="marker" />
                {post.locations[0].address} 외 {post.locations.length - 1} 곳
              </>
            ) : (
              <>
                <img src={markerIcon} alt="marker" />
                {truncateText(addressText, maxLength)}
              </>
            )
          ) : (
            truncateText(addressText, maxLength)
          )}
        </div>
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
            <span>5초전</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
