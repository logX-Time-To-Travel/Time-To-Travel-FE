import "./Blog.css";
import { Link } from "react-router-dom";

// 컴포넌트

import ProfileCard from "../components/User/ProfileCard";
import AddPost from "../components/BlogEditer/AddPost";
import EditPost from "../components/BlogEditer/EditPost";
import DeletePost from "../components/BlogEditer/DeletePost";
import BlogList from "../components/BlogEditer/BlogList";

// 페이지
import Post from "./Post";
const Blog = () => {
  const posts = [
    {
      id: 1,
      title: "N 서울 타워",
      content:
        "지도를 제작할 수 있게 하기 위해 서울의 전경이 보이는 N서울타워의 전망대를...",
      date: "2020.01.03",
      author: "서울 타워",
    },
    {
      id: 2,
      title: "N 서울 타워",
      content:
        "지도를 제작할 수 있게 하기 위해 서울의 전경이 보이는 N서울타워의 전망대를...",
      date: "2020.01.03",
      author: "서울 타워",
    },
    {
      id: 3,
      title: "N 서울 타워",
      content:
        "지도를 제작할 수 있게 하기 위해 서울의 전경이 보이는 N서울타워의 전망대를...",
      date: "2020.01.03",
      author: "서울 타워",
    },
  ];

  return (
    <div className="blog-container">
      <h1>나의 블로그 페이지</h1>

      <div className="profile">
        <img
          src="profile_image_url"
          alt="프로필 이미지"
          className="profile-image"
        />
        <h2>김정호</h2>
        <p>전국 일주에 도전하고 있습니다</p>
      </div>

      <div className="add-post">
        <Link to="/addpost" className="new-post-button">
          새 블로그 작성
        </Link>
      </div>

      <div className="posts">
        {posts.map((post) => (
          <Post key={post.id} post={post} />
        ))}
      </div>

  
      <BlogList />
 
    </div>
  );
};

export default Blog;
