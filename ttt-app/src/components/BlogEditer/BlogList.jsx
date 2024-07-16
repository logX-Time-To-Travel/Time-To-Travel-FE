import Button from "../UI/Button";
import "./BlogList.css";

const BlogList = () => {
  return (
    <div>
      <div className="blog-option">
        <div className="item-filter">
          <select>
            <option value="latest">최신순</option>
            <option value="oldest">오래된 순</option>
          </select>
        </div>
        <div className="form-filter">
          <select>
            <option value="list">리스트</option>
            <option value="grid">그리드</option>
          </select>
        </div>
        <div className="create-button">
          <Button text="+ 새 게시물 작성" path="/addPost" />
        </div>
      </div>
    </div>
  );
};

export default BlogList;
