import { useState, useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";
import imageIcon from "../assets/picture.png";
import "./Tinymce.css";

export default function App() {
  const editorRef = useRef(null);
  const [title, setTitle] = useState("");

  const log = () => {
    if (editorRef.current) {
      console.log("Title: ", title);
      console.log("Content: ", editorRef.current.getContent());
    }
  };

  const handleImageUpload = (blobInfo, success, failure) => {
    const reader = new FileReader();
    reader.readAsDataURL(blobInfo.blob());
    reader.onload = () => {
      success(reader.result);
    };
    reader.onerror = () => {
      failure("Image upload failed");
    };
  };

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
        <Editor
          apiKey={import.meta.env.VITE_TINYMCE_API_KEY}
          onInit={(_evt, editor) => (editorRef.current = editor)}
          // initialValue="<p></p>"
          init={{
            // images_upload_url: '/upload/image',
            // automatic_uploads: true,
            selector: "textarea",
            height: 500,
            width: 500,
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

    

          }}      
        />
      </div>
      <button onClick={log}>show up to console!</button>
    </div>
  );
}
