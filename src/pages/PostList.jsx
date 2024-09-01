import './PostList.css';
import Post from './Post';

const PostList = ({ posts, isSelectMode, selectedPosts, onPostSelect }) => {
  return (
    <div className="post-list">
      {posts.map((post) => (
        <Post
          key={post.postId} // postId로 변경
          post={post}
          isSelectMode={isSelectMode}
          isSelected={selectedPosts.includes(post.postId)} // postId로 변경
          onPostSelect={onPostSelect}
        />
      ))}
    </div>
  );
};

export default PostList;
