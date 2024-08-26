import { useState, useRef, useEffect, useContext } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import LocationModal from '../components/BlogEditor/LocationModal';
import './Tinymce.css';
import x from '.././assets/X.png';
import marker from '.././assets/Icon_Map1.png';

import PostContext from './PostContext';
import { useNavigate } from 'react-router-dom';

export default function Tinymce() {
  const { addPost } = useContext(PostContext);
  const editorRef = useRef(null);
  const [title, setTitle] = useState('');
  const [locations, setLocations] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [memberId, setMemberId] = useState('');
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
      const data = await fetchMemberSession();
      if (data) {
        setMemberId(data.memberId);
      }
    };

    getMemberInfo();
  }, []);

  const handleSave = () => {
    if (locations.length === 0) {
      alert('최소 한 개의 위치를 추가해주세요.');
      return;
    }

    const content = editorRef.current.getContent();
    const newPost = {
      id: Date.now(),
      title,
      content,
      locations,
      images: [],
      memberId,
    };
    addPost(newPost);
    console.log(newPost);
    navigate('/blog'); // 저장 후 블로그 페이지로 이동
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
          <img src={marker} />
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
                  <img className="tab-delete-button" src={x} />
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
              'undo redo | formatselect | bold italic underline forecolor backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | more',
            toolbar_mode: 'sliding',
            toolbar_sticky: true,
            content_style: `
      body { font-family: Arial, sans-serif; font-size: 14px; }
    `,
            setup: (editor) => {
              // 에디터 컨테이너에 포커스 스타일 적용
              editor.on('focus', () => {
                editor.getContainer().style.outline = '2px solid #ffab00'; // 포커스 시 스타일 적용
              });
              editor.on('blur', () => {
                editor.getContainer().style.outline = ''; // 포커스 해제 시 스타일 제거
              });

              editor.ui.registry.addButton('more', {
                icon: 'more-drawer',
                tooltip: 'More options',
                onAction: () => {
                  const toolbarMore =
                    editor.ui.registry.getAll().icons.moreDrawer;
                  toolbarMore.show();
                },
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
