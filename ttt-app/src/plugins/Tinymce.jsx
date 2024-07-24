import { useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";
import Button from "./../components/UI/Button";
import "./Tinymce.css";

export default function App() {
  const editorRef = useRef(null);
  const log = () => {
    if (editorRef.current) {
      console.log(editorRef.current.getContent());
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
    <div>
      <div className="Editor-container">
        <Editor
          apiKey= {import.meta.env.VITE_TINYMCE_API_KEY}
          onInit={(_evt, editor) => (editorRef.current = editor)}
          // initialValue="<p></p>"
          init={{
            selector: 'textarea',
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
              "myimage | undo | blocks | bold forecolor " ,
              " alignleft aligncenter | alignright alignjustify | bullist numlist outdent indent ",],

            content_style:
              "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",

            setup: function (editor) {
              editor.ui.registry.addButton('myimage', {
                text: '이미지',
                onAction: function () {
                  const input = document.createElement('input');
                  input.setAttribute('type', 'file');
                  input.setAttribute('accept', 'image/*');
                  input.click();
                  input.onchange = function () {
                    const file = input.files[0];
                    const reader = new FileReader();
                    reader.onload = function (e) {
                      editor.insertContent(`<img src="${e.target.result}" />`);
                    };
                    reader.readAsDataURL(file);
                  };
                }
              });
            },
            images_upload_handler: handleImageUpload
          }}
        />
      </div>
      <button onClick={log}>
        show up to console!
      </button>
    </div>
  );
}
