import Header from "../UI/Header";
import Tinymce from "../../plugins/Tinymce";

const AddPost = () => {
  return (
    <div>
      <Header homebtn={"< 홈으로"} text={"글쓰기"} />
      <Tinymce />
    </div>
  );
};

export default AddPost;
