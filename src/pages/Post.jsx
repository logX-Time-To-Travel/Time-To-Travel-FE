import './Post.css';
import Modal from '../components/UI/Modal';
import { useState } from 'react';

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
        {/* 위치 정보가 있는 경우 첫 번째 위치의 주소를 표시 */}
        <div className="post-images">
          {/* 위치 정보가 있는 경우 첫 번째 위치의 주소를 표시 */}
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
      </div>

      <div className="post-container">
        <div className="post-title">
          <h3>{post.title}</h3>
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
