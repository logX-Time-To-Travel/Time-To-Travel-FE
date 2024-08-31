import { useState, useRef, useEffect, useContext } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import LocationModal from '../components/BlogEditor/LocationModal';
import './Tinymce.css';
import x from '.././assets/X.png';
import marker from '.././assets/Icon_Map1.png';
import PostContext from './PostContext';
import { useNavigate } from 'react-router-dom';

export default function Tinymce() {
  const { addPost, uploadImage } = useContext(PostContext);
  const editorRef = useRef(null);
  const [title, setTitle] = useState('');
  const [locations, setLocations] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [memberId, setMemberId] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const navigate = useNavigate();

  const fetchMemberSession = async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ memberId: '1' });
      }, 1000);
    });
  };

  useEffect(() => {
    const getMemberInfo = async () => {
      try {
        const data = await fetchMemberSession();
        if (data) {
          setMemberId(data.memberId);
        }
      } catch (error) {
        console.error('Error fetching member session:', error);
      }
    };

    getMemberInfo();
  }, []);

  const handleSave = async () => {
    if (locations.length === 0) {
      alert('최소 한 개의 위치를 추가해주세요.');
      return;
    }

    try {
      const content = editorRef.current.getContent();
      const newPost = {
        id: Date.now(),
        title,
        createdAt: new Date().toISOString(),
        content,
        locations,
        images: [],
        memberId,
      };

      const result = await addPost(newPost);
      navigate('/blog');
    } catch (error) {
      console.error('Error saving post:', error);
      alert('포스트를 저장하는데 문제가 발생했습니다.');
    }
  };

  const handleLocationSelect = (lat, lng, address) => {
    const newLocation = { lat, lng, address };
    setLocations([...locations, newLocation]);
    setShowModal(false);
  };

  const handleRemoveLocation = (index) => {
    const newLocations = locations.filter((_, i) => i !== index);
    setLocations(newLocations);
  };

  const handleImageUpload = async (file) => {
    // file을 인자로 받음
    try {
      const url = await uploadImage(file); // 이미지를 서버에 업로드
      setImageUrl(url); // 반환된 이미지 URL 저장
      return url; // URL 반환
    } catch (error) {
      console.error('Failed to upload image:', error);
      throw error; // 에러를 다시 던짐
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
            {locations.length + '  '}
          </span>
          개의 장소가 선택됨
        </span>
        <div className="location-selection">
          <div className="locations-list">
            {locations.map((location, index) => (
              <div key={index} className="location-item">
                <span>{location.address}</span>
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
          onInit={(evt, editor) => (editorRef.current = editor)}
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
                    // 단순 URL로 이미지 태그 생성
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
          게시물 저장
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
