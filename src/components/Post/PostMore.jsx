import './PostMore.css';

const PostMore = ({
  handleLikeClick,
  handleCommentClick,
  handleScrapClick,
  handleEditClick,
  handleDeleteClick,
  isLiked,
  isScrapped,
  isAuthor,
  likeCount,
  heartAfter,
  heartBefore,
  starAfter,
  starBefore,
  commentsIcon,
  commentCount,
}) => {
  return (
    <div className="post-more">
      <div className="post-more-leftside">
        <div className="post-likes" onClick={handleLikeClick}>
          <img src={isLiked ? heartAfter : heartBefore} alt="Like" />
          {likeCount}
        </div>
        <div className="post-comments" onClick={handleCommentClick}>
          <img src={commentsIcon} alt="Comments" />
          {commentCount}
        </div>
      </div>
      <div className="post-more-rightside">
        <div className="post-scrap" onClick={handleScrapClick}>
          <img src={isScrapped ? starAfter : starBefore} alt="Scrap" />
        </div>
        {isAuthor && (
          <div className="post-more-buttons">
            <button className="post-more-edit" onClick={handleEditClick}>
              수정
            </button>
            <button className="post-more-delete" onClick={handleDeleteClick}>
              삭제
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PostMore;
