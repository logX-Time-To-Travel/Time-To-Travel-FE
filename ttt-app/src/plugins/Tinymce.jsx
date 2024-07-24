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
  return (
    <div>
        <div className="Editor-container">
        <Editor
            apiKey="b3vov53scsx1m1bf3z67h2tz3nhdk62165pgj7iqwl51clkq"
            onInit={(_evt, editor) => (editorRef.current = editor)}
            initialValue="<p>This is the initial content of the editor.</p>"
            init={{
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
                "undo redo | blocks | " +
                "bold italic forecolor | alignleft aligncenter " +
                "alignright alignjustify | bullist numlist outdent indent | " +
                "removeformat | help",
            content_style:
                "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
            }}
        />
      </div>
      <div className="Post-button">
        <Button onClick={log} text={"글 올리기"} />
      </div>
      </div>
  );
}
