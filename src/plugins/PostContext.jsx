import React, { createContext, useState } from 'react';
import axios from 'axios';

const PostContext = createContext();

export const PostProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);

  // 새로운 포스트를 추가하는 함수
  const addPost = async (newPost) => {
    try {
      const response = await axios.post('/api/posts', newPost);
      setPosts((prevPosts) => [response.data, ...prevPosts]);
    } catch (error) {
      console.error('Failed to add post:', error);
    }
  };

  // 이미지 업로드 함수 추가
  const uploadImage = async (imageFile) => {
    const formData = new FormData();
    formData.append('file', imageFile);

    try {
      // 이미지 파일을 서버에 업로드하고, 서버에서 반환한 이미지 URL을 반환
      const response = await axios.post(
        'http://localhost:8080/image/upload',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      console.log('Image URL:', response.data.imageURL); // 콘솔에 이미지 URL 출력
      
      return response.data.imageURL; // 서버가 반환한 이미지 URL
    } catch (error) {
      console.error('Image upload failed:', error);
      throw error;
    }
  };

  return (
    <PostContext.Provider value={{ posts, addPost, uploadImage }}>
      {children}
    </PostContext.Provider>
  );
};

export default PostContext;
