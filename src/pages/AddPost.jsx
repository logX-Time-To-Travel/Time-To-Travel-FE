import Header from "../components/UI/Header.jsx";
import Tinymce from "../plugins/Tinymce.jsx";
import Navbar from "../components/Navbar/Navbar.jsx";
import { useState } from "react";

const AddPost = () => {
  const [posts, setPosts] = useState([]);

  const addPost = (newPost) => {
    setPosts((prevPosts) => [newPost, ...prevPosts]);
  };

  return (
    <div>
      <Header homebtn={"<"} text={"글쓰기"} />
      <Tinymce addPost={addPost} />
      <Navbar />
    </div>
  );
};

export default AddPost;
