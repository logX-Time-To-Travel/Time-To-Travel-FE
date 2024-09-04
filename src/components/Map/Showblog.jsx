import React from 'react';
import './Showblog.css';

const Showblog = ({ locationName }) => {
  const locationData = data.find((location) => location.name === locationName);

  if (!locationData) {
    return <div>해당 장소에 대한 정보가 없습니다.</div>;
  }

  const { posts } = locationData;

  return (
    <div className="showblog-container">
      <h1>{locationData.name}</h1>
      <p>총 {posts.length}개의 게시글을 찾았습니다.</p>
      <div className="posts-list">
        {posts.map((post) => (
          <div key={post.id} className="post-item">
            <img src={post.thumbnail} alt={post.title} />
            <h2>{post.title}</h2>
            <p>
              좋아요: {post.likeCount} | 조회수: {post.viewCount}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Showblog;
