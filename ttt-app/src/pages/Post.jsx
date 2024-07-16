import "./Post.css";
import Modal from "../components/UI/Modal";

import { useState } from "react";

const Post = ({ post }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModal = () => {
    setIsModalOpen((prev) => !prev);
  };

  const handleEdit = () => {
    console.log("수정");
    handleModal();
  };

  const handleDelete = () => {
    console.log("삭제");
    handleModal();
  };

  return (
    <div className="post">
      <div className="post-images">
        <img src={post.images[0]} alt={post.id} />
      </div>

      <div className="post-content">
        <h3>{post.title}</h3>
        <div className="date-location">
          <span className="date">{post.date}</span>
          <span className="location">{post.location}</span>
        </div>
        <p>{post.content}</p>
      </div>

      <div>
        <button className="more-button" onClick={handleModal}>
          <img src = "src\assets\more_btn.png"/>
        </button>
      </div>
      <div>
        {isModalOpen && (
          <Modal
            isOpen={isModalOpen}
            onClick={handleModal}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        )}
      </div>
    </div>
  );
};

export default Post;
