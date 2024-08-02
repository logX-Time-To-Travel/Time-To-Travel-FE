import { useState, useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";

import PostList from "../pages/PostList";
import LocationSelector from "../pages/LocationSelector";
import "./Tinymce.css";

export default function App() {
  const editorRef = useRef(null);
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState({ lat: "", lng: "", address: "" });
  const [showMap, setShowMap] = useState(false);
  const date = new Date().toLocaleString();
  const [posts, setPosts] = useState([]);

  const handleSave = () => {

    const content = editorRef.current.getContent();
    const newPost = {
      id: posts.length + 1,
      title,
      content,
      location,
      date,
      images: [],
    };

    setPosts((prevPosts) => [...prevPosts, newPost]);
    console.log(newPost);
    console.log(location);
  };

  const handleLocationSelect = (lat, lng, address) => {
    setLocation({lat, lng, address});
    setShowMap(false);
    console.log("위치가 선택됨: ", { lat }, { lng }, { address });
  };

  const handleImageUpload = async (blobInfo, success, failure) => {
    try {
      const formData = new FormData();
      formData.append("file", blobInfo.blob(), blobInfo.filename());

      const response = await fetch("/image/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Image upload failed");
      }

      const result = await response.json();
      success(result.url); // 서버에서 반환된 이미지 URL 사용
    } catch (error) {
      failure("Failed to upload image: " + error.message);
    }
  };

  const dummyHandleImageUpload = (blobInfo, progress) =>
    new Promise((resolve, reject) => {
      // Progress 이벤트 핸들러 (필요 시 사용)
      const simulateProgress = (loaded, total) => {
        if (progress) {
          progress((loaded / total) * 100);
        }
      };

      // 이미지 업로드 시뮬레이션 (1초 후에 성공 콜백 호출)
      setTimeout(() => {
        try {
          const dummyUrl = "https://picsum.photos/200/300?grayscale"; // 임의의 이미지 URL
          console.log("Dummy URL:", dummyUrl);
          resolve(dummyUrl);
        } catch (error) {
          reject("Image upload failed: " + error.message);
        }
      }, 1000); // 1초 후에 완료

      // 프로그레스 시뮬레이션
      simulateProgress(100, 100);
    });

  return (
    <div className="Editor-page">
      <div className="Editor-container">
        <div className="title-container">
          {/* 제목 필드 추가 */}
          <input
            type="text"
            placeholder="제목을 입력하세요"
            className="title-box"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="location-container">
          <button onClick={() => setShowMap(true)}>위치 선택</button>
          {showMap && (
            <LocationSelector onSelectLocation={handleLocationSelect} />
          )}
        </div>
        <Editor
          apiKey={import.meta.env.VITE_TINYMCE_API_KEY}
          onInit={(_evt, editor) => (editorRef.current = editor)}
          // initialValue="<p></p>"
          init={{
            // images_upload_url: '/upload/image',
            // automatic_uploads: true,
            selector: "textarea",
            height: 500,
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
              "  image | blocks | bold forecolor | undo redo |",
              " alignleft aligncenter alignright alignjustify | bullist numlist outdent indent ",
            ],

            content_style:
              "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
            images_upload_handler: dummyHandleImageUpload, // 추후 서버와 연동 시 handleImageUpload로 변경 예정
          }}
        />
      </div>
      <button onClick={handleSave}>저장</button>

      <PostList posts={posts} />
    </div>
  );
}
