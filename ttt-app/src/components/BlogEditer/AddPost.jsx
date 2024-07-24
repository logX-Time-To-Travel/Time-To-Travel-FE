import Header from "../UI/Header";
import Tinymce from "../../plugins/Tinymce";
import Navbar from "../Navbar/Navbar.jsx";

const AddPost = () => {
  return (
    <div>
      <Header homebtn={"< 홈으로"} text={"글쓰기"} />
      <Tinymce />
      <Navbar/>
    </div>
  );
};

export default AddPost;
