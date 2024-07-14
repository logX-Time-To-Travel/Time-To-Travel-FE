import PropTypes from "prop-types";

const ProfileCard = ({ email, nickname }) => {
  return (
    <div>
      <div>ProfileCard 컴포넌트 : 프로필 사진 및 닉네임 등 간단한 정보</div>
      <h2>프로필 정보</h2>
      <p>이메일: {email}</p>
      <p>닉네임: {nickname}</p>
    </div>
  );
};

ProfileCard.propTypes = {
  email: PropTypes.string.isRequired,
  nickname: PropTypes.string.isRequired,
};

export default ProfileCard;
