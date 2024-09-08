import { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import BackIcon from '../../assets/Icon_ Back 1.png';
import BackIconRight from '../../assets/Icon_ Back reverse.png';
import AgreeIcon from '../../assets/agree.png';
import AgreeIconActive from '../../assets/Icon_ Accept 2.png';
import eye from '../../assets/eyeopen.png';
import eyestick from '../../assets/eyeclosed.png';
import camera from '../../assets/camera.png';
import { AuthContext } from './AuthContext';
import axios from 'axios';

import './SignUp.css';

const validateEmail = (email) => {
  const re = /\S+@\S+\.\S+/;
  return re.test(email);
};

const SignUp = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [nickname, setNickname] = useState('');
  const [profilePic, setProfilePic] = useState(null);
  const [profileImageUrl, setProfileImageUrl] = useState('');

  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [nicknameError, setNicknameError] = useState('');
  const [nicknameAvailableMessage, setNicknameAvailableMessage] = useState('');
  const [isNicknameChecked, setIsNicknameChecked] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [allRequiredTerms, setAllRequiredTerms] = useState(false);
  const [terms1, setTerms1] = useState(false);
  const [terms2, setTerms2] = useState(false);
  const [terms3, setTerms3] = useState(false);

  const [allOptionalTerms, setAllOptionalTerms] = useState(false);
  const [terms4, setTerms4] = useState(false);
  const [terms5, setTerms5] = useState(false);

  const [step, setStep] = useState(1);
  const [isSignUpComplete, setIsSignUpComplete] = useState(false);
  const { setMemberId, setUsername } = useContext(AuthContext);

  useEffect(() => {
    const fetchDefaultProfilePic = async () => {
      try {
        const response = await axios.get(
          'http://localhost:8080/images/default.png',
          {
            responseType: 'blob',
          }
        );
        setProfilePic(URL.createObjectURL(response.data));
        setProfileImageUrl('images/default.png');
      } catch (error) {
        console.error('Error loading default profile picture:', error);
      }
    };

    fetchDefaultProfilePic();
  }, []);

  const handleProfilePicChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append('file', file);

      try {
        const response = await axios.post(
          'http://localhost:8080/image/upload',
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          }
        );

        if (response.data.imageURL) {
          setProfilePic(URL.createObjectURL(file));
          setProfileImageUrl(response.data.imageURL);
          console.log('프로필 이미지가 성공적으로 업로드되었습니다.');
        } else {
          console.error('이미지 업로드 실패:', response.data.error);
        }
      } catch (error) {
        console.error('프로필 이미지 업로드 중 오류가 발생했습니다:', error);
      }
    }
  };

  const handleNicknameChange = (e) => {
    setNickname(e.target.value);
    setNicknameError('');
    setIsNicknameChecked(false);
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    } else {
      navigate(-1);
    }
  };

  const checkUsernameDuplicate = async (username) => {
    try {
      await axios.post(
        'http://localhost:8080/member/check-username',
        { username },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      setNicknameError('');
      setNicknameAvailableMessage('이 닉네임을 사용할 수 있습니다.');
      setIsNicknameChecked(true);
    } catch (error) {
      setNicknameError('이미 사용 중인 닉네임입니다.');
      setNicknameAvailableMessage('');
      setIsNicknameChecked(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isNicknameChecked) {
      alert('닉네임 중복 체크를 완료해 주세요.');
      return;
    }

    let valid = true;

    if (!validateEmail(email)) {
      setEmailError('유효한 이메일 주소를 입력하세요.');
      valid = false;
    } else {
      setEmailError('');
    }

    if (password.length < 8 || !/[!@#$%^&*]/.test(password)) {
      setPasswordError('8자 이상, 특수문자 포함');
      valid = false;
    } else {
      setPasswordError('');
    }

    if (password !== confirmPassword) {
      setConfirmPasswordError('비밀번호와 일치하지 않습니다.');
      valid = false;
    } else {
      setConfirmPasswordError('');
    }

    if (nickname.length === 0) {
      setNicknameError('닉네임을 입력하세요.');
      valid = false;
    } else {
      setNicknameError('');
    }

    if (!allRequiredTerms) {
      alert('약관동의를 하셔야 가입됩니다.');
      valid = false;
    }

    if (valid) {
      const newUser = {
        username: nickname,
        email,
        password,
        profileImageUrl,
      };

      try {
        const response = await axios.post(
          'http://localhost:8080/member/signup',
          newUser,
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );

        if (response.status === 200) {
          setMemberId(response.data.memberId);
          setUsername(response.data.username);

          setIsSignUpComplete(true);
        }
      } catch (error) {
        console.error('Error during signup:', error);
        if (error.response && error.response.status === 400) {
          alert(error.response.data);
        } else {
          alert('회원가입 요청 중 오류가 발생했습니다.');
        }
      }
    }
  };

  const handleComplete = () => {
    navigate('/signin'); // 로그인 화면으로 이동
  };

  // 모든 필수 약관 동의 핸들러
  const handleAllRequiredTerms = () => {
    const newState = !allRequiredTerms; // 현재 상태의 반대값으로 설정
    setAllRequiredTerms(newState); // 모든 필수 약관 동의 상태 업데이트
    setTerms1(newState); // 이용약관 동의 상태 업데이트
    setTerms2(newState); // 개인정보 처리방침 동의 상태 업데이트
    setTerms3(newState); // 윤리 지침 동의 상태 업데이트
  };

  // 모든 선택 약관 동의 핸들러
  const handleAllOptionalTerms = () => {
    const newState = !allOptionalTerms; // 현재 상태의 반대값으로 설정
    setAllOptionalTerms(newState); // 모든 선택 약관 동의 상태 업데이트
    setTerms4(newState); // 마케팅 정보 동의 상태 업데이트
    setTerms5(newState); // 버그 전송 동의 상태 업데이트
  };

  // 개별 필수 약관 동의 핸들러
  const handleIndividualRequiredTerm = (term, setTerm) => {
    const newState = !term; // 현재 상태의 반대값으로 설정
    setTerm(newState); // 개별 필수 약관 동의 상태 업데이트
    // 모든 필수 약관이 선택되었는지 확인
    const allChecked =
      (setTerm === setTerms1 ? newState : terms1) &&
      (setTerm === setTerms2 ? newState : terms2) &&
      (setTerm === setTerms3 ? newState : terms3);

    setAllRequiredTerms(allChecked); // 모든 필수 약관이 선택된 경우 전체 동의 상태로 설정
  };

  // 개별 선택 약관 동의 핸들러
  const handleIndividualOptionalTerm = (term, setTerm) => {
    const newState = !term; // 현재 상태의 반대값으로 설정
    setTerm(newState); // 개별 선택 약관 동의 상태 업데이트
    // 현재 상태 업데이트 후 전체 선택 동의 여부 확인
    const allChecked =
      (terms4 && terms5) || (newState && terms4) || (newState && terms5);

    setAllOptionalTerms(allChecked);
  };

  return (
    <div className="SignUp-container">
      {step === 1 && (
        <>
          <div className="SignUp-back-btn" onClick={handleBack}>
            <img src={BackIcon} alt="뒤로가기" />
          </div>
          <div className="SignUp-title">약관 동의</div>
          <div className="SignUp-description">
            계속하시려면 약관을 잘 읽고 동의해 주세요.
          </div>
        </>
      )}

      {step === 1 && (
        <div className="SignUp-terms-container">
          {/* 필수 약관 전체 동의 */}
          <div
            className={`SignUp-agreement ${allRequiredTerms ? 'active' : ''}`}
            onClick={handleAllRequiredTerms}
          >
            <span className="text">필수 약관 전체 동의하기</span>
            <img
              className="Big-Agree"
              src={`${allRequiredTerms ? AgreeIconActive : AgreeIcon}`}
            />
          </div>

          {/* 이용약관 동의 */}
          <div
            className={`SignUp-term-item ${terms1 ? 'active' : ''}`}
            onClick={() => handleIndividualRequiredTerm(terms1, setTerms1)}
          >
            <span className="text">
              <img
                className="Small-Agree"
                src={`${terms1 ? AgreeIconActive : AgreeIcon}`}
              />{' '}
              이용약관 <span className="required">*</span>
            </span>
            <span
              className="icon"
              onClick={(e) => {
                e.stopPropagation();
                navigate('/terms/terms1');
              }}
            >
              <img src={BackIconRight} />
            </span>
          </div>

          {/* 개인정보 처리방침 동의 */}
          <div
            className={`SignUp-term-item ${terms2 ? 'active' : ''}`}
            onClick={() => handleIndividualRequiredTerm(terms2, setTerms2)}
          >
            <span className="text">
              <img
                className="Small-Agree"
                src={`${terms2 ? AgreeIconActive : AgreeIcon}`}
              />{' '}
              개인정보 처리방침 <span className="required">*</span>
            </span>
            <span
              className="icon"
              onClick={(e) => {
                e.stopPropagation();
                navigate('/terms/terms2');
              }}
            >
              <img src={BackIconRight} />
            </span>
          </div>

          {/* 게시물 및 댓글 작성 윤리 지침 동의 */}
          <div
            className={`SignUp-term-item ${terms3 ? 'active' : ''}`}
            onClick={() => handleIndividualRequiredTerm(terms3, setTerms3)}
          >
            <span className="text">
              <img
                className="Small-Agree"
                src={`${terms3 ? AgreeIconActive : AgreeIcon}`}
              />
              게시물 및 댓글 작성 윤리 지침 <span className="required">*</span>
            </span>
            <span
              className="icon"
              onClick={(e) => {
                e.stopPropagation();
                navigate('/terms/terms3');
              }}
            >
              <img src={BackIconRight} />
            </span>
          </div>

          {/* 선택 약관 전체 동의 */}
          <div
            className={`SignUp-agreement ${allOptionalTerms ? 'active' : ''}`}
            onClick={handleAllOptionalTerms}
          >
            <span className="text">선택 약관 전체 동의하기</span>
            <img
              className="Big-Agree"
              src={`${allOptionalTerms ? AgreeIconActive : AgreeIcon}`}
            />
          </div>

          {/* 마케팅 정보 수신 동의 */}
          <div
            className={`SignUp-term-item ${terms4 ? 'active' : ''}`}
            onClick={() => handleIndividualOptionalTerm(terms4, setTerms4)}
          >
            <span className="text">
              <img
                className="Small-Agree"
                src={`${terms4 ? AgreeIconActive : AgreeIcon}`}
              />{' '}
              마케팅 정보 수신 동의 [선택]
            </span>
            <span
              className="icon"
              onClick={(e) => {
                e.stopPropagation();
                navigate('/terms/terms4');
              }}
            >
              <img src={BackIconRight} />
            </span>
          </div>

          {/* 버그 자동 전송 동의 */}
          <div
            className={`SignUp-term-item ${terms5 ? 'active' : ''}`}
            onClick={() => handleIndividualOptionalTerm(terms5, setTerms5)}
          >
            <span className="text">
              <img
                className="Small-Agree"
                src={`${terms5 ? AgreeIconActive : AgreeIcon}`}
              />{' '}
              버그 자동 전송 [선택]
            </span>
            <span
              className="icon"
              onClick={(e) => {
                e.stopPropagation();
                navigate('/terms/terms5');
              }}
            >
              <img src={BackIconRight} />
            </span>
          </div>

          {/* 계속하기 버튼 */}
          <button
            type="button"
            className={`SignUp-continue-btn ${
              allRequiredTerms ? 'enabled' : 'disabled'
            }`}
            onClick={() => allRequiredTerms && setStep(2)}
            disabled={!allRequiredTerms}
          >
            계속하기
          </button>
          <button
            className="SignUp-footer-back-btn"
            onClick={handleBack} // handleBack 함수 연결
          >
            뒤로가기
          </button>
        </div>
      )}

      {step === 2 &&
        (!isSignUpComplete ? (
          <>
            <form onSubmit={handleSubmit}>
              <div className="SignUp-back-btn" onClick={handleBack}>
                <img src={BackIcon} alt="뒤로가기" />
              </div>
              {/* 두 번째 단계에서 사용되는 뒤로가기 버튼 */}
              <div className="SignUp-profile-pic-container">
                <label className="SignUp-profile-pic">
                  {profilePic ? (
                    <img
                      src={profilePic}
                      alt="Profile"
                      style={{ borderRadius: '50%' }}
                    />
                  ) : (
                    ''
                  )}
                  <div className="SignUp-profile-pic-overlay">
                    {/* 카메라 아이콘으로 이미지 대체 */}
                    <img
                      src={camera}
                      alt="Camera Icon"
                      className="camera-icon"
                    />
                  </div>
                  <input type="file" onChange={handleProfilePicChange} />
                </label>
              </div>

              <div className="SignUp-form-group">
                <label>
                  닉네임 <span className="required">*</span>
                </label>
                <div className="nickname-input-container">
                  <input
                    type="text"
                    placeholder="한글, 영문, 숫자가 포함될 수 있습니다"
                    value={nickname}
                    onChange={handleNicknameChange}
                  />
                  <button
                    type="button"
                    className="nickname-check-button"
                    onClick={() => checkUsernameDuplicate(nickname)}
                  >
                    중복 확인
                  </button>
                </div>
                {nicknameError && (
                  <p className="SignUp-error-message">{nicknameError}</p>
                )}
                {nicknameAvailableMessage && (
                  <p className="SignUp-success-message">
                    {nicknameAvailableMessage}
                  </p>
                )}
              </div>

              <div className="SignUp-form-group">
                <label>
                  이메일 <span className="required">*</span>
                </label>
                <input
                  type="email"
                  placeholder="you@syu.ac.kr"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                {emailError && (
                  <p className="SignUp-error-message">{emailError}</p>
                )}
              </div>

              <div
                className="SignUp-form-group"
                style={{ position: 'relative' }}
              >
                <label>
                  비밀번호 <span className="required">*</span>
                </label>
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="8자 이상, 특수문자 포함"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={{ paddingRight: '40px' }}
                />
                <button
                  type="button"
                  className="SignUp-eye-btn"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  <img
                    src={showPassword ? eyestick : eye}
                    alt="toggle visibility"
                    className="eye-icon"
                  />
                </button>
                {passwordError && (
                  <p className="SignUp-error-message">{passwordError}</p>
                )}
              </div>

              <div
                className="SignUp-form-group"
                style={{ position: 'relative' }}
              >
                <label>
                  비밀번호 다시 입력 <span className="required">*</span>
                </label>
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  style={{ paddingRight: '40px' }}
                />
                <button
                  type="button"
                  className="SignUp-eye-btn"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {/* 이미지가 showConfirmPassword 상태에 따라 변경됨 */}
                  <img
                    src={showConfirmPassword ? eyestick : eye}
                    alt="toggle visibility"
                    style={{ width: '24px', height: '24px' }} // 이미지 크기 조정
                  />
                </button>
                {confirmPasswordError && (
                  <p className="SignUp-error-message">{confirmPasswordError}</p>
                )}
              </div>

              <button type="submit" className="SignUp-continue-btn enabled">
                완료
              </button>
            </form>
          </>
        ) : (
          <div className="SignUp-complete-container">
            <h2 className="SignUp-welcome-title">환영합니다!</h2>
            <p className="SignUp-welcome-message">
              Time To Travel 사용을 환영합니다. 이제 로그인 후 사용 가능한 모든
              기능이 열렸습니다.
            </p>
            <button onClick={handleComplete} className="SignUp-complete-btn">
              완료
            </button>
          </div>
        ))}
    </div>
  );
};

export default SignUp;
