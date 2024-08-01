import Header from "../components/UI/Header.jsx";
import Tinymce from "../plugins/Tinymce.jsx";
import Navbar from "../components/Navbar/Navbar.jsx";


const AddPost = () => {

  return (
    <div>
      <Header homebtn={"<"} text={"글쓰기"} />
      <Tinymce />
      <Navbar/>
    </div>
  );
};

export default AddPost;
