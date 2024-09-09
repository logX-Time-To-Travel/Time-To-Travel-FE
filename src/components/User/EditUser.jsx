import './EditUser.css';
import BackIcon from '../../assets/Icon_ Back 1.png';
import { useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

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
  const [newProfileImageUrl, setNewProfileImageUrl] = useState(profileImageUrl);
  const [isUsernameChecked, setIsUsernameChecked] = useState(false);
  const [usernameCheckMessage, setUsernameCheckMessage] = useState('');
  const [isUsernameDirty, setIsUsernameDirty] = useState(false);

  const handleSave = async () => {
    const updatedUserData = {
      username: newUsername,
      profileImageUrl: newProfileImageUrl,
      introduction: newIntroduction,
    };

    try {
      await axios.put(
        `http://localhost:8080/member/${username}`,
        updatedUserData,
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      console.log('프로필이 성공적으로 업데이트되었습니다.');
      navigate('/mypage');
    } catch (error) {
      console.error('프로필 업데이트 중 오류가 발생했습니다:', error);
    }
  };

  const handleProfileImageChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append('file', file);

      try {
        const response = await axios.post(
          'http://localhost:8080/image/upload',
          formData,
          {
            withCredentials: true,
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          }
        );

        if (response.data.imageURL) {
          setNewProfileImageUrl(response.data.imageURL);
          console.log('프로필 이미지가 성공적으로 업로드되었습니다.');
        } else {
          console.error('이미지 업로드 실패:', response.data.error);
        }
      } catch (error) {
        console.error('프로필 이미지 업로드 중 오류가 발생했습니다:', error);
      }
    }
  };

  const handleCheckUsername = async () => {
    try {
      await axios.post('http://localhost:8080/member/check-username', {
        username: newUsername,
      });
      setIsUsernameChecked(true);
      setUsernameCheckMessage('사용가능한 닉네임입니다.');
    } catch (error) {
      console.error('닉네임 중복 확인 중 오류 발생:', error);
      setIsUsernameChecked(false);
      setUsernameCheckMessage('이미 해당 닉네임이 사용중입니다.');
    }
  };

  const handleUsernameChange = (e) => {
    setNewUsername(e.target.value);
    setIsUsernameDirty(true);
    setIsUsernameChecked(false);
    setUsernameCheckMessage('');
  };

  useEffect(() => {
    const profileImageElement = document.querySelector(
      '.edituser-profile-image'
    );
    if (profileImageElement) {
      profileImageElement.src = `http://localhost:8080${newProfileImageUrl}`;
    }
  }, [newProfileImageUrl]);

  const showSaveButton =
    !isUsernameDirty ||
    (isUsernameDirty && isUsernameChecked) ||
    newUsername == username;

  return (
    <div className="edituser-container">
      <div className="edituser-header">
        <div className="edituser-backward" onClick={() => navigate(-1)}>
          <img src={BackIcon} alt="뒤로가기" />
        </div>
        {showSaveButton && (
          <div className="edituser-save" onClick={handleSave}>
            변경 사항 저장
          </div>
        )}
      </div>
      <div className="edituser-body">
        <div className="edituser-profile">
          <img
            src={`http://localhost:8080${newProfileImageUrl}`}
            alt="프로필 이미지"
            className="edituser-profile-image"
          />
          <div className="edituser-profile-change">
            <label htmlFor="profileImageUpload" style={{ cursor: 'pointer' }}>
              탭하여 변경
            </label>
            <input
              id="profileImageUpload"
              type="file"
              style={{ display: 'none' }}
              onChange={handleProfileImageChange}
            />
          </div>
        </div>
        <div className="edituser-username-container">
          <div className="edituser-title">닉네임</div>
          <div className="edituser-username-input-wrapper">
            <input
              type="text"
              value={newUsername}
              onChange={handleUsernameChange}
              className="edituser-content edituser-username-input"
            />
            <button
              className="edituser-check-button"
              onClick={handleCheckUsername}
            >
              중복 확인
            </button>
          </div>
          {usernameCheckMessage && (
            <div className="edituser-username-check-message">
              {usernameCheckMessage}
            </div>
          )}
        </div>
        <div className="edituser-username-container">
          <div className="edituser-title">자기소개</div>
          <textarea
            value={newIntroduction}
            onChange={(e) => setNewIntroduction(e.target.value)}
            className="edituser-content"
            rows="5"
          />
        </div>
      </div>
    </div>
  );
};

export default EditUser;
