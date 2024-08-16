const PostProfile = ({
  profileImageUrl,
  username,
  postCount,
  introduction,
}) => {
  return (
    <div className="post-detail-info-container">
      <div className="post-detail-info-profile">
        <img
          src={profileImageUrl}
          alt="Profile"
          className="post-detail-info-image"
        />
        <div>
          <div className="post-detail-info-username">{username}</div>
          <div className="post-detail-info-posts">
            작성 게시글 {postCount}개
          </div>
        </div>
      </div>
      <div className="post-detail-info-introduction">{introduction}</div>
    </div>
  );
};

export default PostProfile;
