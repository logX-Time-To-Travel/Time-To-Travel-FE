import './Post.css';
import Modal from '../components/UI/Modal';
import { useState } from 'react';
import viewIcon from '.././assets/Icon_ View 1.png';
import heartIcon from '.././assets/heart-after.png';
const Post = ({ post }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModal = () => {
    setIsModalOpen((prev) => !prev);
  };

  const handleEdit = () => {
    console.log('수정');
    handleModal();
  };

  const handleDelete = () => {
    console.log('삭제');
    handleModal();
  };

  return (
    <div className="post">
      <div className="post-images">
        <div className="post-location">
          {post.locations && post.locations.length > 0
            ? post.locations.length > 1
              ? post.locations[0].address +
                ' 외 ' +
                (post.locations.length - 1) +
                ' 곳'
              : post.locations[0].address
            : '위치 정보 없음'}
        </div>
      </div>

      <div className="post-container">
        <div className="post-title">
          <h3>{post.title}</h3>
        </div>
        <div className="interest-menu">
          <div className="interest">
            <img src={viewIcon} />
            <span>1.1만</span>
          </div>
          <div className="interest">
            <img src={heartIcon} />
            <span>312</span>
          </div>
        </div>

        {/* <div className="post-content">
          {post.content.replace(/<\/?[^>]+(>|$)/g, "")}
        </div> */}
      </div>
      <div>
        {/* <button className="more-button" onClick={handleModal}>
          <img src="src\assets\more_btn.png"></img>
        </button> */}
      </div>
      {/* <div>
        {isModalOpen && (
          <Modal
            isOpen={isModalOpen}
            onClick={handleModal}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        )}
      </div> */}
    </div>
  );
};

export default Post;
