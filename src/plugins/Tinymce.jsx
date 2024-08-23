import { useState, useRef, useEffect, useContext } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import LocationModal from '../components/BlogEditor/LocationModal'; // 모달 컴포넌트 임포트
import './Tinymce.css';
import PostContext from './PostContext';

export default function Tinymce() {
  const { addPost } = useContext(PostContext);
  const editorRef = useRef(null);
  const [title, setTitle] = useState('');
  const [location, setLocation] = useState({ lat: '', lng: '', address: '' });
  const [showModal, setShowModal] = useState(false); // 모달 상태 추가
  const [memberId, setMemberId] = useState('');

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
    const content = editorRef.current.getContent();
    const newPost = {
      id: Date.now(),
      title,
      content,
      location,
      images: [],
      memberId,
    };
    addPost(newPost);
    console.log(newPost);
  };

  const handleLocationSelect = (lat, lng, address) => {
    setLocation({ lat, lng, address });
    setShowModal(false); // 모달 닫기
    console.log('위치가 선택됨: ', { lat }, { lng }, { address });
  };

  return (
    <div className="Editor-page">
      <div className="Editor-container">
        <div className="title-container">
          <input
            type="text"
            placeholder="제목을 입력하세요"
            className="title-box"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        {!location.address && (
          <div className="location-container">
            <button onClick={() => setShowModal(true)}>
              위치선택 창으로 이동하기
            </button>
          </div>
        )}

        <LocationModal
          show={showModal}
          onClose={() => setShowModal(false)}
          onSelectLocation={handleLocationSelect}
        />

        {location.address && (
          <div className="selected-location">
            <p>다녀온 곳: {location.address}</p>
          </div>
        )}

        <Editor
          apiKey={import.meta.env.VITE_TINYMCE_API_KEY}
          onInit={(_evt, editor) => (editorRef.current = editor)}
          init={{
            height: 350,
            width: '100%',
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
              'code',
              'help',
              'wordcount',
            ],
            toolbar: [
              '  image blocks bold forecolor undo redo |',
              ' alignleft aligncenter alignright alignjustify | bullist numlist outdent indent ',
            ],
            content_style:
              'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
          }}
        />
      </div>
    </div>
  );
}
