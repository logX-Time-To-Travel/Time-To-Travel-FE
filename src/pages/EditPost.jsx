import Header from '../components/UI/Header.jsx';
import Tinymce from '../plugins/Tinymce.jsx';
import Navbar from '../components/Navbar/Navbar.jsx';
import './AddPost.css';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

const EditPost = () => {
  const { id } = useParams();
  const [initPost, setInitPost] = useState(null);

  useEffect(() => {
    const fetchPostData = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/posts/${id}`, {
          withCredentials: true,
        });
        const postData = response.data;

        // Tinymce에 필요한 데이터만 추출
        setInitPost({
          id: postData.id,
          title: postData.title,
          content: postData.data,
          locations: postData.locations,
        });
      } catch (error) {
        console.error('Error fetching post:', error);
      }
    };

    fetchPostData();
  }, [id]);

  return (
    <div className="add-post-page">
      <Header page={'home'} titleText={'수정'} />
      <div className="editor-wrapper">
        {initPost && <Tinymce initialPost={initPost} />}
      </div>
      <Navbar />
    </div>
  );
};

export default EditPost;
