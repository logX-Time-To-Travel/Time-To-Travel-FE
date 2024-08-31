import { createContext, useState } from 'react';
import axios from 'axios';

const PostContext = createContext();

export const PostProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);
  const [imageUrl, setImageUrl] = useState('');

  // 새로운 포스트를 추가하는 함수
  const addPost = async (newPost) => {
    console.log(newPost); // 서버에 전달되는 데이터 확인
    try {
      await axios.post('http://localhost:8080/posts/add', newPost, {
        withCredentials: true,
      });
    } catch (error) {
      console.error('Failed to add post:', error);
      throw error;
    }
  };

  // 유저의 포스트를 불러오는 함수
  const fetchPostsByUser = async (username) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/post/user/${username}`
      );
      setPosts(response.data);
    } catch (error) {
      console.error('Failed to fetch posts:', error);
      throw error;
    }
  };

  // 이미지 업로드 함수
  const uploadImage = async (imageFile) => {
    const formData = new FormData();
    formData.append('file', imageFile);

    try {
      const response = await axios.post(
        'http://localhost:8080/image/upload',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      console.log('Image URL:', response.data.imageURL);
      return response.data.imageURL;
    } catch (error) {
      console.error('Image upload failed:', error);
      throw error;
    }
  };

  // 삭제 함수 (추가 필요 시)
  const deletePosts = async (postIds) => {
    try {
      await axios.delete(`http://localhost:8080/post/delete`, {
        data: { postIds },
      });
      setPosts((prevPosts) =>
        prevPosts.filter((post) => !postIds.includes(post.id))
      );
    } catch (error) {
      console.error('Failed to delete posts:', error);
      throw error;
    }
  };

  return (
    <PostContext.Provider
      value={{ posts, addPost, uploadImage, fetchPostsByUser, deletePosts }}
    >
      {children}
    </PostContext.Provider>
  );
};

export default PostContext;
