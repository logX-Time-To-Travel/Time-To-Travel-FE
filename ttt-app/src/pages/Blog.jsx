import ProfileCard from "../components/User/ProfileCard";
import AddPost from "../components/BlogEditer/AddPost";
import EditPost from "../components/BlogEditer/EditPost";
import DeletePost from "../components/BlogEditer/DeletePost";
import BlogList from "../components/BlogEditer/BlogList";

const Blog = () => {
  return (
    <div>
      <h1>Blog page</h1>

      <ProfileCard />
      <BlogList />
      <AddPost />
      <EditPost />
      <DeletePost />
    </div>
  );
};

export default Blog;
