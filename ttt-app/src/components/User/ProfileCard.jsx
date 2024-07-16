import "../User/ProfileCard.css";

const ProfileCard = () => {
  return (
    <div className="profile-container">
      <div className="profile-image">
        <img src="경로" alt="이미지" />
      </div>
      <div className="profile-info">
        <div className="profile-id">김정호</div>
        <div className="profile-intro">전국 일주에 도전하고 있습니다.</div>
      </div>
    </div>
  );
};

export default ProfileCard;
