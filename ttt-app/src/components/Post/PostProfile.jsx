import './PostProfile.css';

const PostProfile = ({
  profileImageUrl,
  username,
  postCount,
  introduction,
}) => {
  return (
    <div className="post-profile-container">
      <div className="post-profile-user">
        <img
          src={profileImageUrl}
          alt="Profile"
          className="post-profile-image"
        />
        <div>
          <div className="post-profile-username">{username}</div>
          <div className="post-profile-posts">작성 게시글 {postCount}개</div>
        </div>
      </div>
      <div className="post-profile-introduction">{introduction}</div>
    </div>
  );
};

export default PostProfile;
