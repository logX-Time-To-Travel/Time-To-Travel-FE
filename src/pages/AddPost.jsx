import Header from '../components/UI/Header.jsx';
import Tinymce from '../plugins/Tinymce.jsx';
import Navbar from '../components/Navbar/Navbar.jsx';
import { useState } from 'react';
import "./AddPost.css";

const AddPost = () => {
  const [posts, setPosts] = useState([]);

  const addPost = (newPost) => {
    setPosts((prevPosts) => [newPost, ...prevPosts]);
  };

  return (
    <div className="add-post-page">
      <Header homebtn={'<'} text={'글쓰기'} />
      <div className="editor-wrapper">
        <Tinymce addPost={addPost} />
      </div>
      <Navbar />
    </div>
  );
};

export default AddPost;
