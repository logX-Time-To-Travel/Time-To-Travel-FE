import { useState, useRef, useEffect, useContext } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import LocationModal from '../components/BlogEditor/LocationModal';
import './Tinymce.css';
import x from '.././assets/X.png';
import marker from '.././assets/Icon_Map1.png';
import PostContext from './PostContext';
import { useNavigate } from 'react-router-dom';
import imageCompression from 'browser-image-compression';
import axios from 'axios';

export default function Tinymce({ initialPost }) {
  const { addPost, updatePost, uploadImage } = useContext(PostContext);
  const editorRef = useRef(null);
  const [title, setTitle] = useState('');
  const [locations, setLocations] = useState([]);
  const [images, setImages] = useState([]);
  const [thumbnail, setThumbnail] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [memberId, setMemberId] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchMemberId();

    if (initialPost) {
      setTitle(initialPost.title);
      setLocations(initialPost.locations || []);
      setThumbnail(initialPost.thumbnail);
      if (editorRef.current) {
        editorRef.current.setContent(initialPost.content);
      }
    }
  }, [initialPost]);

  const fetchMemberId = async () => {
    try {
      const userResponse = await axios.get(
        'http://localhost:8080/member/session',
        {
          withCredentials: true,
        }
      );
      setMemberId(userResponse.data.memberId);
    } catch (error) {
      console.error('Error fetching member id:', error);
    }
  };

  const handleSave = async () => {
    if (locations.length === 0) {
      alert('최소 한 개의 위치를 추가해주세요.');
      return;
    }

    try {
      const content = editorRef.current.getContent();
      const validLocations = locations.filter(
        (location) => location.latitude && location.longitude && location.name
      );

      const postData = {
        title,
        content,
        locations: validLocations,
        memberId,
        thumbnail: thumbnail || images[0] || '/images/no_image.png',
      };

      if (initialPost) {
        await updatePost(initialPost.id, postData);
        navigate(`/post/${initialPost.id}`);
      } else {
        await addPost(postData);
        navigate('/blog');
      }
    } catch (error) {
      console.error('Error saving post:', error);
      alert('포스트를 저장하는데 문제가 발생했습니다.');
    }
  };

  const handleLocationSelect = (latitude, longitude, name) => {
    setLocations([...locations, { latitude, longitude, name }]);
    setShowModal(false);
  };

  const handleRemoveLocation = (index) => {
    setLocations(locations.filter((_, i) => i !== index));
  };

  const handleImageUpload = async (file) => {
    try {
      const options = {
        maxSizeMB: 0.5,
        maxWidthOrHeight: 1024,
        useWebWorker: true,
      };

      const compressedFile = await imageCompression(file, options);
      const imageUrl = await uploadImage(compressedFile);

      if (!thumbnail) {
        setThumbnail(imageUrl);
      }

      return imageUrl;
    } catch (error) {
      console.error('Failed to upload image:', error);
      throw error;
    }
  };

  return (
    <div className="editor-page">
      <div className="editor-container">
        <input
          type="text"
          placeholder="제목을 입력하세요"
          className="title-input"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <span className="location-count">
          <img className="marker-icon" src={marker} alt="marker" />
          <span className="location-count-number">
            {locations.length + ' '}
          </span>
          개의 장소가 선택됨
        </span>
        <div className="location-selection">
          <div className="locations-list">
            {locations.map((location, index) => (
              <div key={index} className="location-item">
                <span>{location.name}</span>
                <button onClick={() => handleRemoveLocation(index)}>
                  <img className="tab-delete-button" src={x} alt="delete" />
                </button>
              </div>
            ))}
          </div>
          <button
            className="add-location-button"
            onClick={() => setShowModal(true)}
          >
            + 위치 추가
          </button>
        </div>

        <Editor
          apiKey={import.meta.env.VITE_TINYMCE_API_KEY}
          onInit={(evt, editor) => {
            editorRef.current = editor;
            if (initialPost) {
              editor.setContent(initialPost.content);
            }
          }}
          initialValue={initialPost ? initialPost.content : ''}
          init={{
            height: 400,
            menubar: false,
            plugins: [
              'advlist',
              'autolink',
              'lists',
              'link',
              'image',
              'charmap',
              'preview',
              'anchor',
              'searchreplace',
              'visualblocks',
              'code',
              'fullscreen',
              'insertdatetime',
              'media',
              'table',
              'help',
              'wordcount',
            ],
            toolbar:
              'undo redo | image | formatselect | bold italic underline forecolor backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | more',
            toolbar_mode: 'sliding',
            images_upload_handler: (blobInfo) => {
              return new Promise((resolve, reject) => {
                const file = blobInfo.blob();
                handleImageUpload(file)
                  .then((imageUrl) => {
                    resolve(`http://localhost:8080${imageUrl}`);
                  })
                  .catch((error) => {
                    console.error('Image upload failed:', error);
                    reject('Image upload failed');
                  });
              });
            },
            content_style: `
              body { font-family: Arial, sans-serif; font-size: 14px; }
            `,
            setup: (editor) => {
              editor.on('focus', () => {
                editor.getContainer().style.outline = '2px solid #ffab00';
              });
              editor.on('blur', () => {
                editor.getContainer().style.outline = '';
              });
            },
          }}
        />

        <button className="submit-button" onClick={handleSave}>
          {initialPost ? '게시물 수정' : '게시물 저장'}
        </button>
      </div>

      {showModal && (
        <LocationModal
          show={showModal}
          onClose={() => setShowModal(false)}
          onSelectLocation={handleLocationSelect}
        />
      )}
    </div>
  );
}
