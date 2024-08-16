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
        {/* <img src={post.images[0]} alt={key} /> */}
        <div className="post-location">{post.location.address}</div>
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
