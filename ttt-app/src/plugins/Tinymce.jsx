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
          apiKey="b3vov53scsx1m1bf3z67h2tz3nhdk62165pgj7iqwl51clkq"
          onInit={(_evt, editor) => (editorRef.current = editor)}
          initialValue="<p>This is the initial content of the editor.</p>"
          init={{
            selector: 'textarea',
            height: 500,
            width: 1000,
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
            toolbar:
              "myimage | undo redo | blocks | " +
              "bold italic forecolor | alignleft aligncenter " +
              "alignright alignjustify | bullist numlist outdent indent | " +
              "removeformat | help",
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
