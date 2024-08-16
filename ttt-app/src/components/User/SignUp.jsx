import { useState } from "react"; // useState (상태 관리) 사용
import { useNavigate } from "react-router-dom"; // useNavigate (페이지 이동) 사용
import PropTypes from "prop-types"; // PropTypes (타입 검사) 사용
import axios from "axios";

import "./SignUp.css"; // SignUp.css 와 연결.

// 이메일 유효성 검사
const validateEmail = (email) => {
  const re = /\S+@\S+\.\S+/; // 정규 표현식
  return re.test(email); // 유효성 검사
};

// 회원가입 컴포넌트
const SignUp = ({ onSignUp }) => {
  const navigate = useNavigate(); // 페이지 이동 훅
  const [email, setEmail] = useState(""); // 이메일 상태
  const [password, setPassword] = useState(""); // 비밀번호 상태
  const [confirmPassword, setConfirmPassword] = useState(""); // 비밀번호 확인 상태
  const [nickname, setNickname] = useState(""); // 닉네임 상태
  const [profilePic, setProfilePic] = useState(null); // 프로필 사진 상태

  const [emailError, setEmailError] = useState(""); // 이메일 오류 메시지 상태
  const [passwordError, setPasswordError] = useState(""); // 비밀번호 오류 메시지 상태
  const [confirmPasswordError, setConfirmPasswordError] = useState(""); // 비밀번호 확인 오류 메시지 상태
  const [nicknameError, setNicknameError] = useState(""); // 닉네임 오류 메시지 상태
  const [nicknameAvailableMessage, setNicknameAvailableMessage] = useState("");
  const [isNicknameChecked, setIsNicknameChecked] = useState(false); // 닉네임 중복 체크 상태

  const [showPassword, setShowPassword] = useState(false); // 비밀번호 표시 상태
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // 비밀번호 확인 표시 상태

  const [allRequiredTerms, setAllRequiredTerms] = useState(false); // 모든 필수 약관 동의 상태
  const [terms1, setTerms1] = useState(false); // 이용약관 동의 상태
  const [terms2, setTerms2] = useState(false); // 개인정보 처리방침 동의 상태
  const [terms3, setTerms3] = useState(false); // 윤리 지침 동의 상태

  const [allOptionalTerms, setAllOptionalTerms] = useState(false); // 모든 선택 약관 동의 상태
  const [terms4, setTerms4] = useState(false); // 마케팅 정보 동의 상태
  const [terms5, setTerms5] = useState(false); // 버그 전송 동의 상태

  const [step, setStep] = useState(1); // 현재 단계 상태

  // 프로필 사진 변경 핸들러
  const handleProfilePicChange = (e) => {
    const file = e.target.files[0]; //파일 미리보기 설정
    if (file) {
      setProfilePic(URL.createObjectURL(file));
    } else {
      setProfilePic(null); // 이미지가 없을 때 상태를 null로 설정
    }
  };

  // 닉네임 입력값 변경 시 nicknameError 초기화 함수
  const handleNicknameChange = (e) => {
    setNickname(e.target.value);
    setNicknameError("");
  };

  //hancleBack 함수
  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1); // 이전 단계로 이동
    } else {
      navigate(-1); // 이전 페이지로 이동
    }
  };

  // 닉네임 중복 체크 함수
  const checkUsernameDuplicate = async (username) => {
    try {
      await axios.post(
        "http://127.0.0.1:8080/member/check-username",
        { username },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      setNicknameError("");
      setNicknameAvailableMessage("이 닉네임을 사용할 수 있습니다.");
      setIsNicknameChecked(true); // 중복 체크 성공 시 true로 설정
    } catch (error) {
      setNicknameError("이미 사용 중인 닉네임입니다."); // 오류 발생 시 메시지 설정
      setNicknameAvailableMessage(""); // 닉네임 사용 가능 메시지 초기화
      setIsNicknameChecked(false); // 중복 체크 실패 시 false로 설정
    }
  };

  // 폼 제출 핸들러
  const handleSubmit = async (e) => {
    e.preventDefault(); // 폼 제출 시 새로고침 방지

    if (!isNicknameChecked) {
      alert("닉네임 중복 체크를 완료해 주세요.");
      return; // 닉네임 중복 체크가 완료되지 않았으면 폼 제출을 중단
    }

    let valid = true; // 유효성 검사 플래그

    if (!validateEmail(email)) {
      setEmailError("유효한 이메일 주소를 입력하세요."); // 이메일 오류 메시지
      valid = false;
    } else {
      setEmailError("");
    }

    if (password.length < 8 || !/[!@#$%^&*]/.test(password)) {
      setPasswordError("8자 이상, 특수문자 포함"); // 비밀번호 오류 메시지
      valid = false;
    } else {
      setPasswordError("");
    }

    if (password !== confirmPassword) {
      setConfirmPasswordError("비밀번호와 일치하지 않습니다."); // 비밀번호 확인 오류 메시지
      valid = false;
    } else {
      setConfirmPasswordError("");
    }

    if (nickname.length === 0) {
      setNicknameError("닉네임을 입력하세요."); // 닉네임 오류 메시지
      valid = false;
    } else {
      setNicknameError("");
    }

    if (!allRequiredTerms) {
      alert("약관동의를 하셔야 가입됩니다."); // 약관 동의 경고
      valid = false;
    }

    if (valid) {
      const newUser = {
        username: nickname,
        email,
        password,
        profileImageUrl: "images/default.jpg", // 파일 업로드가 아닌 URL로 처리
      };

      try {
        const response = await axios.post(
          "http://127.0.0.1:8080/member/signup",
          newUser,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (response.status === 200) {
          onSignUp(response.data);
          alert("회원가입이 완료되었습니다.");
          navigate("/signin");
        }
      } catch (error) {
        console.error("Error during signup:", error);
        if (error.response && error.response.status === 400) {
          alert(error.response.data); // 서버에서 보낸 오류 메시지 표시
        } else {
          alert("회원가입 요청 중 오류가 발생했습니다.");
        }
      }
    }
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
    if (terms1 && terms2 && terms3 && !newState) {
      setAllRequiredTerms(false); // 하나라도 동의하지 않으면 전체 동의 해제
    } else if (terms1 && terms2 && terms3 && newState) {
      setAllRequiredTerms(true); // 모두 동의하면 전체 동의 설정
    }
  };

  // 개별 선택 약관 동의 핸들러
  const handleIndividualOptionalTerm = (term, setTerm) => {
    const newState = !term; // 현재 상태의 반대값으로 설정
    setTerm(newState); // 개별 선택 약관 동의 상태 업데이트
    if (terms4 && terms5 && !newState) {
      setAllOptionalTerms(false); // 하나라도 동의하지 않으면 전체 동의 해제
    } else if (terms4 && terms5 && newState) {
      setAllOptionalTerms(true); // 모두 동의하면 전체 동의 설정
    }
  };

  return (
    <div className="SignUp-container">
      {step === 1 && (
        <>
          <span className="SignUp-back-btn" onClick={() => navigate(-1)}>
            {/* 이전 페이지로 이동 버튼 (뒤로가기 버튼)*/}
            뒤로가기
          </span>
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
            className={`SignUp-agreement ${allRequiredTerms ? "active" : ""}`}
            onClick={handleAllRequiredTerms}
          >
            <span className="text">필수 약관 전체 동의하기</span>
            <span className="icon">✔</span>
          </div>

          {/* 이용약관 동의 */}
          <div
            className={`SignUp-term-item ${terms1 ? "active" : ""}`}
            onClick={() => handleIndividualRequiredTerm(terms1, setTerms1)}
          >
            <span className="text">
              ✔ 이용약관 <span className="required">*</span>
            </span>
            <span
              className="icon"
              onClick={(e) => {
                e.stopPropagation();
                navigate("/terms/terms1");
              }}
            >
              &gt;
            </span>
          </div>

          {/* 개인정보 처리방침 동의 */}
          <div
            className={`SignUp-term-item ${terms2 ? "active" : ""}`}
            onClick={() => handleIndividualRequiredTerm(terms2, setTerms2)}
          >
            <span className="text">
              ✔ 개인정보 처리방침 <span className="required">*</span>
            </span>
            <span
              className="icon"
              onClick={(e) => {
                e.stopPropagation();
                navigate("/terms/terms2");
              }}
            >
              &gt;
            </span>
          </div>

          {/* 게시물 및 댓글 작성 윤리 지침 동의 */}
          <div
            className={`SignUp-term-item ${terms3 ? "active" : ""}`}
            onClick={() => handleIndividualRequiredTerm(terms3, setTerms3)}
          >
            <span className="text">
              ✔ 게시물 및 댓글 작성 윤리 지침{" "}
              <span className="required">*</span>
            </span>
            <span
              className="icon"
              onClick={(e) => {
                e.stopPropagation();
                navigate("/terms/terms3");
              }}
            >
              &gt;
            </span>
          </div>

          {/* 선택 약관 전체 동의 */}
          <div
            className={`SignUp-agreement ${allOptionalTerms ? "active" : ""}`}
            onClick={handleAllOptionalTerms}
          >
            <span className="text">선택 약관 전체 동의하기</span>
            <span className="icon">✔</span>
          </div>

          {/* 마케팅 정보 수신 동의 */}
          <div
            className={`SignUp-term-item ${terms4 ? "active" : ""}`}
            onClick={() => handleIndividualOptionalTerm(terms4, setTerms4)}
          >
            <span className="text">✔ 마케팅 정보 수신 동의 [선택]</span>
            <span
              className="icon"
              onClick={(e) => {
                e.stopPropagation();
                navigate("/terms/terms4");
              }}
            >
              &gt;
            </span>
          </div>

          {/* 버그 자동 전송 동의 */}
          <div
            className={`SignUp-term-item ${terms5 ? "active" : ""}`}
            onClick={() => handleIndividualOptionalTerm(terms5, setTerms5)}
          >
            <span className="text">✔ 버그 자동 전송 [선택]</span>
            <span
              className="icon"
              onClick={(e) => {
                e.stopPropagation();
                navigate("/terms/terms5");
              }}
            >
              &gt;
            </span>
          </div>

          {/* 계속하기 버튼 */}
          <button
            type="button"
            className={`SignUp-continue-btn ${
              allRequiredTerms ? "enabled" : "disabled"
            }`}
            onClick={() => allRequiredTerms && setStep(2)}
            disabled={!allRequiredTerms}
          >
            계속하기
          </button>
        </div>
      )}

      {step === 2 && (
        <form onSubmit={handleSubmit}>
          <div className="SignUp-back-btn-alt" onClick={handleBack}>
            &lt;
          </div>
          {/* 두 번째 단계에서 사용되는 뒤로가기 버튼 */}
          <div className="SignUp-profile-pic-container">
            <label className="SignUp-profile-pic">
              {profilePic ? (
                <img
                  src={profilePic}
                  alt="Profile"
                  style={{ borderRadius: "50%" }}
                />
              ) : (
                ""
              )}
              <div className="SignUp-profile-pic-overlay">
                <i className="fas fa-camera"></i> {/* 카메라 아이콘 추가 */}
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
                닉네임 확인
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
            {emailError && <p className="SignUp-error-message">{emailError}</p>}
          </div>

          <div className="SignUp-form-group" style={{ position: "relative" }}>
            <label>
              비밀번호 <span className="required">*</span>
            </label>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="8자 이상, 특수문자 포함"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ paddingRight: "40px" }}
            />
            <button
              type="button"
              className="SignUp-eye-btn"
              onClick={() => setShowPassword(!showPassword)}
            >
              <i
                className={showPassword ? "fas fa-eye-slash" : "fas fa-eye"}
              ></i>
            </button>
            {passwordError && (
              <p className="SignUp-error-message">{passwordError}</p>
            )}
          </div>

          <div className="SignUp-form-group" style={{ position: "relative" }}>
            <label>
              비밀번호 다시 입력 <span className="required">*</span>
            </label>
            <input
              type={showConfirmPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              style={{ paddingRight: "40px" }}
            />
            <button
              type="button"
              className="SignUp-eye-btn"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              <i
                className={
                  showConfirmPassword ? "fas fa-eye-slash" : "fas fa-eye"
                }
              ></i>
            </button>
            {confirmPasswordError && (
              <p className="SignUp-error-message">{confirmPasswordError}</p>
            )}
          </div>

          <button type="submit" className="SignUp-continue-btn enabled">
            완료
          </button>
        </form>
      )}
    </div>
  );
};

SignUp.propTypes = {
  onSignUp: PropTypes.func.isRequired, // onSignUp prop 타입 검사
};

export default SignUp;
