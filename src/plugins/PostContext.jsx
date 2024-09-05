import { createContext, useState } from 'react';
import axios from 'axios';

const PostContext = createContext();

export const PostProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);

  const addPost = async (newPost) => {
    console.log(newPost);
    try {
      await axios.post('http://localhost:8080/posts/add', newPost, {
        withCredentials: true,
      });
    } catch (error) {
      console.error('Failed to add post:', error);
      throw error;
    }
  };

  const updatePost = async (id, updatedPost) => {
    try {
      await axios.put(`http://localhost:8080/posts/${id}`, updatedPost, {
        withCredentials: true,
      });
    } catch (error) {
      console.error('Failed to update post: ', error);
      throw error;
    }
  };

  const fetchPostsByUser = async (username) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/posts/user/${username}`,
        {
          withCredentials: true,
        }
      );
      console.log('Fetched posts:', response.data);
      setPosts(response.data);
    } catch (error) {
      console.error('Failed to fetch posts:', error);
      throw error;
    }
  };

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

  // 삭제 함수 (단일 및 다중 삭제 지원)
  const deletePostsInContext = async (postIds) => {
    try {
      // 유효한 postIds만 남겨둠
      const validPostIds = postIds.filter(
        (id) => id !== undefined && id !== null
      );
      console.log('Valid Post IDs:', validPostIds); // 확인용 콘솔 출력

      if (validPostIds.length === 0) {
        console.log('No valid post IDs to delete.');
        return;
      }

      let response;
      if (validPostIds.length === 1) {
        response = await axios.delete(
          `http://localhost:8080/posts/${validPostIds[0]}`, // 단일 삭제 엔드포인트
          {
            withCredentials: true,
          }
        );
      } else {
        // 이미 존재하지 않는 postId를 걸러내기 위한 추가 검증 로직
        const existingPostIds = validPostIds.filter((id) => {
          return posts.some((post) => post.postId === id);
        });

        if (existingPostIds.length === 0) {
          console.log('No valid existing post IDs to delete.');
          return;
        }

        response = await axios({
          method: 'delete',
          url: `http://localhost:8080/posts/delete`, // 다중 삭제 엔드포인트
          data: { postId: existingPostIds }, // JSON 형식으로 postId 전달
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        });
      }

      setPosts(
        (prevPosts) =>
          prevPosts.filter((post) => !validPostIds.includes(post.postId)) // postId로 비교하여 삭제된 게시물 필터링
      );
    } catch (error) {
      console.error('Error deleting posts:', error);
    }
  };

  return (
    <PostContext.Provider
      value={{
        posts,
        setPosts,
        addPost,
        updatePost,
        uploadImage,
        fetchPostsByUser,
        deletePostsInContext,
      }}
    >
      {children}
    </PostContext.Provider>
  );
};

export default PostContext;
