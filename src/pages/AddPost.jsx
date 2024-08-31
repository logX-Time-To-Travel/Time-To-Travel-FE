import Header from '../components/UI/Header.jsx';
import Tinymce from '../plugins/Tinymce.jsx';
import Navbar from '../components/Navbar/Navbar.jsx';
import './AddPost.css';

const AddPost = () => {
  return (
    <div className="add-post-page">
      <Header page={'home'} titleText={'글쓰기'} />
      <div className="editor-wrapper">
        <Tinymce /> {/* addPost prop을 삭제 */}
      </div>
      <Navbar />
    </div>
  );
};

export default AddPost;
