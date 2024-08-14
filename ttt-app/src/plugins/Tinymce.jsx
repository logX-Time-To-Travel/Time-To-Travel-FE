import { useState, useRef, useEffect, useContext } from "react";
import { Editor } from "@tinymce/tinymce-react";
import LocationSelector from "../pages/LocationSelector";
import img from "../assets/Icon_Map1.png";
import "./Tinymce.css";
import Button from "../components/UI/Button";
import PostContext from "./PostContext";

export default function Tinymce() {
  const { addPost } = useContext(PostContext);
  const editorRef = useRef(null); // 에디터 참조 설정
  const [title, setTitle] = useState(""); // 제목 상태 설정
  const [location, setLocation] = useState({ lat: "", lng: "", address: "" }); // 위치 상태 설정
  const [showMap, setShowMap] = useState(false); // 지도 표시 상태 설정
  const [memberId, setMemberId] = useState(""); // 멤버 ID 상태 설정

  // 멤버 세션 정보를 가져오는 비동기 함수
  const fetchMemberSession = async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ memberId: "1" });
      }, 1000);
    });
  };

  // 컴포넌트가 마운트될 때 멤버 정보를 가져오는 useEffect 훅
  useEffect(() => {
    const getMemberInfo = async () => {
      const data = await fetchMemberSession();
      if (data) {
        setMemberId(data.memberId);
      }
    };

    getMemberInfo();
  }, []);

  // 새 포스트를 저장하는 함수
  const handleSave = () => {
    const content = editorRef.current.getContent();
    const newPost = {
      id: Date.now(),
      title,
      content,
      location: { ...location },
      images: [],
      memberId,
    };
    addPost(newPost); // addPost 함수 호출
    console.log(newPost);
  };

  // 위치가 선택되었을 때 호출되는 함수
  const handleLocationSelect = (lat, lng, address) => {
    setLocation({ lat, lng, address });
    setShowMap(false);
    console.log("위치가 선택됨: ", { lat }, { lng }, { address });
  };

  // 더미 이미지 업로드 핸들러
  const dummyHandleImageUpload = (blobInfo, progress) =>
    new Promise((resolve, reject) => {
      setTimeout(() => {
        try {
          const dummyUrl = "https://picsum.photos/200/300?grayscale";
          console.log("Dummy URL:", dummyUrl);
          resolve(dummyUrl);
        } catch (error) {
          reject("Image upload failed: " + error.message);
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

        {showMap && (
          <LocationSelector onSelectLocation={handleLocationSelect} />
        )}

        <Editor
          apiKey={import.meta.env.VITE_TINYMCE_API_KEY}
          onInit={(_evt, editor) => (editorRef.current = editor)}
          init={{
            height: 330,
            width: "100%",
            menubar: false,
            plugins: [
              "advlist",
              "autolink",
              "lists",
              "link",
              "image",
              "charmap",
              "preview",
              "anchor",
              "searchreplace",
              "visualblocks",
              "code",
              "fullscreen",
              "insertdatetime",
              "media",
              "table",
              "code",
              "help",
              "wordcount",
            ],
            toolbar: [
              "  image blocks bold forecolor undo redo |",
              " alignleft aligncenter alignright alignjustify | bullist numlist outdent indent ",
            ],
            content_style:
              "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
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
