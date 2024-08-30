import React, { createContext, useState } from 'react';

const PostContext = createContext();

export const PostProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);

  // 새로운 포스트를 추가하는 함수
  const addPost = (newPost) => {
    setPosts((prevPosts) => [newPost, ...prevPosts]);
  };

  // 선택된 포스트들을 삭제하는 함수
  const deletePosts = (postIds) => {
    setPosts((prevPosts) =>
      prevPosts.filter((post) => !postIds.includes(post.id))
    );
  };

  return (
    <PostContext.Provider value={{ posts, addPost, deletePosts }}>
      {children}
    </PostContext.Provider>
  );
};

export default PostContext;
