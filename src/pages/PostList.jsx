import './PostList.css';
import Post from './Post';

const PostList = ({ posts, isSelectMode, selectedPosts, onPostSelect }) => {
  return (
    <div className="post-list">
      {posts.map((post) => (
        <Post
          key={post.id}
          post={post}
          isSelectMode={isSelectMode}
          isSelected={selectedPosts.includes(post.id)}
          onPostSelect={onPostSelect}
        />
      ))}
    </div>
  );
};

export default PostList;
