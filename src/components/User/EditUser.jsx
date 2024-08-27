import './EditUser.css';
import BackIcon from '../../assets/Icon_ Back 1.png';
import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';

const EditUser = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { profileImageUrl, username, introduction } = location.state || {
    profileImageUrl: '',
    username: '',
    introduction: '',
  };

  const [newUsername, setNewUsername] = useState(username);
  const [newIntroduction, setNewIntroduction] = useState(introduction);

  const handleSave = () => {
    // 여기에 저장 로직을 추가하면 됩니다.
    console.log('새로운 닉네임:', newUsername);
    console.log('새로운 자기소개:', newIntroduction);
    // 저장 후 프로필 페이지로 이동
    navigate('/mypage');
  };

  return (
    <div className="edituser-container">
      <div className="edituser-header">
        <div className="edituser-backward" onClick={() => navigate(-1)}>
          <img src={BackIcon} alt="뒤로가기" />
        </div>
        <div className="edituser-save" onClick={handleSave}>
          변경 사항 저장
        </div>
      </div>
      <div className="edituser-body">
        <div className="edituser-profile">
          <img
            src={profileImageUrl}
            alt="프로필 이미지"
            className="profile-image"
          />
          <div className="profile-change">탭하여 변경</div>
        </div>
        <div className="edituser-username-container">
          <div className="edituser-title">닉네임</div>
          <input
            type="text"
            value={newUsername}
            onChange={(e) => setNewUsername(e.target.value)}
            className="edituser-content"
          />
        </div>
        <div className="edituser-username-container">
          <div className="edituser-title">자기소개</div>
          <textarea
            value={newIntroduction}
            onChange={(e) => setNewIntroduction(e.target.value)}
            className="edituser-content"
          />
        </div>
      </div>
    </div>
  );
};

export default EditUser;
