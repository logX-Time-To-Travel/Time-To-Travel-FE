import { useState } from "react"; // useState (상태 관리) 사용, useEffect (사이드 이펙트 관리 - 특정 조건이 변경될 때마다 특정 작업을 수행하도록 설정) 사용
import { useNavigate } from "react-router-dom"; // useNavigate (페이지 이동) 사용
import PropTypes from "prop-types"; // PropTypes (타입 검사) 사용

import "./SignUp.css"; //SignUp.css 와 연결.
import axios from "axios";

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
  const [isNicknameChecked, setIsNicknameChecked] = useState(false); //닉네임 중복 체크 상태

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
    setProfilePic(URL.createObjectURL(e.target.files[0])); // 프로필 사진 미리보기 설정
  };

  //닉네임 입력값 변경시 nicknameError 초기화 함수
  const handleNicknameChange = (e) => {
    setNickname(e.target.value);
    setNicknameError("");
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
      <span className="SignUp-back-btn" onClick={() => navigate(-1)}>
        {/* ㄴ>이전 페이지로 이동 버튼 */}
        &lt;
      </span>
      <div className="SignUp-description">
        계속하시려면 약관을 잘 읽고 동의해주세요.
      </div>

      {step === 1 && ( // 첫 번째 단계: 약관 동의
        <div>
          <div
            className={`SignUp-agreement ${allRequiredTerms ? "active" : ""}`} // 필수 약관 전체 동의
            onClick={handleAllRequiredTerms}
          >
            <span className="text">필수 약관 전체 동의하기</span>
            <span className="icon">V</span>
          </div>

          <div
            className={`SignUp-agreement ${terms1 ? "active" : ""}`} // 개별 필수 약관 동의
            onClick={() => handleIndividualRequiredTerm(terms1, setTerms1)}
          >
            <span className="text">
              v 이용약관 <span className="highlight">*</span>
            </span>
            <span
              className="icon" // 이용약관 링크로 이동
              onClick={(e) => {
                e.stopPropagation();
                navigate("/terms/terms1");
              }}
            >
              &gt;
            </span>
          </div>
          <div
            className={`SignUp-agreement ${terms2 ? "active" : ""}`} // 개별 필수 약관 동의
            onClick={() => handleIndividualRequiredTerm(terms2, setTerms2)}
          >
            <span className="text">
              v 개인정보 처리방침 <span className="highlight">*</span>
            </span>
            <span
              className="icon" // 개인정보 처리방침 링크로 이동
              onClick={(e) => {
                e.stopPropagation();
                navigate("/terms/terms2");
              }}
            >
              &gt;
            </span>
          </div>
          <div
            className={`SignUp-agreement ${terms3 ? "active" : ""}`} // 개별 필수 약관 동의
            onClick={() => handleIndividualRequiredTerm(terms3, setTerms3)}
          >
            <span className="text">
              v 게시물 및 댓글 작성 윤리 지침{" "}
              <span className="highlight">*</span>
            </span>
            <span
              className="icon" // 윤리 지침 링크로 이동
              onClick={(e) => {
                e.stopPropagation();
                navigate("/terms/terms3");
              }}
            >
              &gt;
            </span>
          </div>

          <div
            className={`SignUp-agreement ${allOptionalTerms ? "active" : ""}`} // 선택 약관 전체 동의
            onClick={handleAllOptionalTerms}
          >
            <span className="text">선택 약관 전체 동의하기</span>
            <span className="icon">V</span>
          </div>

          <div
            className={`SignUp-agreement ${terms4 ? "active" : ""}`} // 개별 선택 약관 동의
            onClick={() => handleIndividualOptionalTerm(terms4, setTerms4)}
          >
            <span className="text">v 마케팅 정보 수신 동의 [선택]</span>
            <span
              className="icon" // 마케팅 정보 수신 동의 링크로 이동
              onClick={(e) => {
                e.stopPropagation();
                navigate("/terms/terms4");
              }}
            >
              &gt;
            </span>
          </div>
          <div
            className={`SignUp-agreement ${terms5 ? "active" : ""}`} // 개별 선택 약관 동의
            onClick={() => handleIndividualOptionalTerm(terms5, setTerms5)}
          >
            <span className="text">v 버그 자동 전송 [선택]</span>
            <span
              className="icon" // 버그 자동 전송 링크로 이동
              onClick={(e) => {
                e.stopPropagation();
                navigate("/terms/terms5");
              }}
            >
              &gt;
            </span>
          </div>

          <button
            type="button"
            className={`SignUp-continue-btn ${
              allRequiredTerms ? "enabled" : "disabled"
            }`} // 필수 약관 동의 여부에 따라 버튼 활성화
            onClick={() => allRequiredTerms && setStep(2)} // 필수 약관 동의 시 다음 단계로 이동
            disabled={!allRequiredTerms} // 필수 약관 동의하지 않으면 버튼 비활성화
          >
            계속하기
          </button>
        </div>
      )}

      {step === 2 && ( // 두 번째 단계: 회원가입 폼
        <form onSubmit={handleSubmit}>
          <div className="SignUp-profile-pic-container">
            <label className="SignUp-profile-pic">
              {profilePic ? (
                <img
                  src={profilePic}
                  alt="Profile"
                  style={{ borderRadius: "50%" }} // 프로필 사진 미리보기
                />
              ) : (
                ""
              )}
              <input type="file" onChange={handleProfilePicChange} />{" "}
              {/* ㄴ> 프로필 사진 변경 */}
            </label>
          </div>

          <div className="SignUp-form-group">
            <label>
              닉네임 <span className="SignUp-required">*</span>
            </label>
            <div className="nickname-input-container">
              <input
                type="text"
                placeholder="한글, 영문, 숫자가 포함될 수 있습니다"
                value={nickname}
                onChange={handleNicknameChange} // 닉네임 입력값 업데이트
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
              <p className="SignUp-error-message">{nicknameError}</p> // 닉네임 오류 메시지 표시
            )}
            {nicknameAvailableMessage && (
              <p className="SignUp-success-message">
                {nicknameAvailableMessage}
              </p> // 닉네임 사용 가능 메시지 표시
            )}
          </div>

          <div className="SignUp-form-group">
            <label>
              이메일 <span className="SignUp-required">*</span>
            </label>
            <input
              type="email"
              placeholder="you@syu.ac.kr"
              value={email}
              onChange={(e) => setEmail(e.target.value)} // 이메일 입력값 업데이트
            />
            {emailError && (
              <p className="SignUp-error-message">{emailError}</p> // 이메일 오류 메시지 표시
            )}
          </div>

          <div className="SignUp-form-group" style={{ position: "relative" }}>
            <label>
              비밀번호 <span className="SignUp-required">*</span>
            </label>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="8자 이상, 특수문자 포함"
              value={password}
              onChange={(e) => setPassword(e.target.value)} // 비밀번호 입력값 업데이트
              style={{ paddingRight: "40px" }} // 오른쪽 여백 추가
            />
            <button
              type="button"
              className="SignUp-eye-btn"
              onClick={() => setShowPassword(!showPassword)} // 비밀번호 표시 토글
            >
              {showPassword ? "🙈" : "👁"}
            </button>
            {passwordError && (
              <p className="SignUp-error-message">{passwordError}</p> // 비밀번호 오류 메시지 표시
            )}
          </div>

          <div className="SignUp-form-group" style={{ position: "relative" }}>
            <label>
              비밀번호 다시 입력 <span className="SignUp-required">*</span>
            </label>
            <input
              type={showConfirmPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)} // 비밀번호 확인 입력값 업데이트
              style={{ paddingRight: "40px" }} // 오른쪽 여백 추가
            />
            <button
              type="button"
              className="SignUp-eye-btn"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)} // 비밀번호 확인 표시 토글
            >
              {showConfirmPassword ? "🙈" : "👁"}
            </button>
            {confirmPasswordError && (
              <p className="SignUp-error-message">{confirmPasswordError}</p> // 비밀번호 확인 오류 메시지 표시
            )}
          </div>

          <button type="submit" className="SignUp-continue-btn enabled">
            계속하기
          </button>

          <button
            type="button"
            className="SignUp-back-btn"
            onClick={() => setStep(1)} // 이전 단계로 돌아가기
          >
            뒤로가기
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
