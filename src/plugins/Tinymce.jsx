import { useState, useRef, useEffect, useContext } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import LocationSelector from '../pages/LocationSelector';
import img from '../assets/Icon_Map1.png';
import './Tinymce.css';
import Button from '../components/UI/Button';
import PostContext from './PostContext';

export default function Tinymce() {
  const { addPost } = useContext(PostContext);
  const editorRef = useRef(null); 
  const [title, setTitle] = useState('');
  const [location, setLocation] = useState({ lat: '', lng: '', address: '' }); // 위치 상태 설정
  const [showMap, setShowMap] = useState(false); 
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
    setShowMap(false);
    console.log('위치가 선택됨: ', { lat }, { lng }, { address });
  };

  // 더미 이미지 업로드 핸들러
  const dummyHandleImageUpload = (blobInfo, progress) =>
    new Promise((resolve, reject) => {
      setTimeout(() => {
        try {
          const dummyUrl = 'https://picsum.photos/200/300?grayscale';
          console.log('Dummy URL:', dummyUrl);
          resolve(dummyUrl);
        } catch (error) {
          reject('Image upload failed: ' + error.message);
        }
      }, 1000);

      if (progress) {
        progress(100);
      }
    });

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
        <div className="location-container">
          <img src={img} />
          <button onClick={() => setShowMap(true)}>위치선택</button>
        </div>

        {location.address && (
          <div className="selected-location">
            <p>선택된 위치: {location.address}</p>
          </div>
        )}

        {showMap && (
          <LocationSelector onSelectLocation={handleLocationSelect} />
        )}

        <Editor
          apiKey={
            (import.meta.env.VITE_TINYMCE_API_KEY =
              'b3vov53scsx1m1bf3z67h2tz3nhdk62165pgj7iqwl51clkq')
          }
          onInit={(_evt, editor) => (editorRef.current = editor)}
          init={{
            height: 330,
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
            images_upload_handler: dummyHandleImageUpload,
          }}
        />
      </div>
      <div className="save-button-container">
        <Button path="/blog" customFunc={handleSave} text="게시물 저장" />
      </div>
    </div>
  );
}
