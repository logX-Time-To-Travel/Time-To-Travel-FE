import "./Blog.css";
import { useContext } from "react";
import PostContext from "../plugins/PostContext";
import Header from "./../components/UI/Header";
import PostList from "./PostList";

// 페이지

const Blog = () => {
  const { posts } = useContext(PostContext);
  return (
    <div>
      <div className="page-container">
        <div className="blog-container">
          <Header homebtn={" "} text={"내 작성 게시글"} />
          <PostList posts={posts} />
        </div>
      </div>
    </div>
  );
};

export default Blog;
