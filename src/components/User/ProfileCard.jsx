import './ProfileCard.css';
import btnimg from '../../assets/Button-Edit.png';
import { useNavigate } from 'react-router-dom';

const ProfileCard = ({ profileImageUrl, username, introduction }) => {
  const navigate = useNavigate();
  const handleClickEditButton = () => {
    navigate('/edituser', {
      state: {
        profileImageUrl: profileImageUrl,
        username: username,
        introduction: introduction,
      },
    });
  };
  return (
    <div className="profile-container">
      <div className="profile-image">
        <img src={`http://localhost:8080${profileImageUrl}`} alt="이미지" />
      </div>
      <div
        className="editpage-edit-button-container"
        onClick={handleClickEditButton}
      >
        <div className="editpage-edit-button">
          <img src={btnimg} alt="Edit" />
        </div>
      </div>
      <div className="profile-info">
        <div className="profile-id">{username}</div>
        <div className="profilecard-profile-intro">{introduction}</div>
      </div>
    </div>
  );

  // import PropTypes from "prop-types";

  // const ProfileCard = ({ email, nickname }) => {
  //   return (
  //     <div>
  //       <div>ProfileCard 컴포넌트 : 프로필 사진 및 닉네임 등 간단한 정보</div>
  //       <h2>프로필 정보</h2>
  //       <p>이메일: {email}</p>
  //       <p>닉네임: {nickname}</p>
  //     </div>
  //   );
  // };

  // ProfileCard.propTypes = {
  //   email: PropTypes.string.isRequired,
  //   nickname: PropTypes.string.isRequired,ㅈ
};

export default ProfileCard;
