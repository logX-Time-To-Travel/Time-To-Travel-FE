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
        <div className="post-preview">
          <Button text="게시글 모아보기"/>
        </div>

      </div>
    </div>
  );
};

export default BlogList;
