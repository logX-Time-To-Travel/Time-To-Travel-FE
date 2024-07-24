import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import "../../App.css";
import "./SignUp.css";

const validateEmail = (email) => {
  const re = /\S+@\S+\.\S+/;
  return re.test(email);
};

const SignUp = ({ onSignUp }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [nickname, setNickname] = useState("");
  const [profilePic, setProfilePic] = useState(null);

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [nicknameError, setNicknameError] = useState("");

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

  const handleProfilePicChange = (e) => {
    setProfilePic(URL.createObjectURL(e.target.files[0]));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let valid = true;

    if (!validateEmail(email)) {
      setEmailError("유효한 이메일 주소를 입력하세요.");
      valid = false;
    } else {
      setEmailError("");
    }

    if (password.length < 8 || !/[!@#$%^&*]/.test(password)) {
      setPasswordError("8자 이상, 특수문자 포함");
      valid = false;
    } else {
      setPasswordError("");
    }

    if (password !== confirmPassword) {
      setConfirmPasswordError("비밀번호와 일치하지 않습니다.");
      valid = false;
    } else {
      setConfirmPasswordError("");
    }

    if (nickname.length === 0) {
      setNicknameError("닉네임을 입력하세요.");
      valid = false;
    } else {
      setNicknameError("");
    }

    if (!allRequiredTerms) {
      alert("약관동의를 하셔야 가입됩니다.");
      valid = false;
    }

    if (valid) {
      const newUser = { email, password, nickname, profilePic };
      onSignUp(newUser);

      alert("회원가입이 완료되었습니다.");
      navigate("/signin");
    }
  };

  const handleAllRequiredTerms = () => {
    const newState = !allRequiredTerms;
    setAllRequiredTerms(newState);
    setTerms1(newState);
    setTerms2(newState);
    setTerms3(newState);
  };

  const handleAllOptionalTerms = () => {
    const newState = !allOptionalTerms;
    setAllOptionalTerms(newState);
    setTerms4(newState);
    setTerms5(newState);
  };

  const handleIndividualRequiredTerm = (term, setTerm) => {
    const newState = !term;
    setTerm(newState);
    if (terms1 && terms2 && terms3 && !newState) {
      setAllRequiredTerms(false);
    } else if (terms1 && terms2 && terms3 && newState) {
      setAllRequiredTerms(true);
    }
  };

  const handleIndividualOptionalTerm = (term, setTerm) => {
    const newState = !term;
    setTerm(newState);
    if (terms4 && terms5 && !newState) {
      setAllOptionalTerms(false);
    } else if (terms4 && terms5 && newState) {
      setAllOptionalTerms(true);
    }
  };

  return (
    <div className="SignUp-container">
      <span className="SignUp-back-btn" onClick={() => navigate(-1)}>
        &lt;
      </span>
      <div className="SignUp-description">
        계속하시려면 약관을 잘 읽고 동의해주세요.
      </div>

      {step === 1 && (
        <div>
          <div
            className={`SignUp-agreement ${allRequiredTerms ? "active" : ""}`}
            onClick={handleAllRequiredTerms}
          >
            <span className="text">필수 약관 전체 동의하기</span>
            <span className="icon">V</span>
          </div>

          <div
            className={`SignUp-agreement ${terms1 ? "active" : ""}`}
            onClick={() => handleIndividualRequiredTerm(terms1, setTerms1)}
          >
            <span className="text">
              v 이용약관 <span className="highlight">*</span>
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
          <div
            className={`SignUp-agreement ${terms2 ? "active" : ""}`}
            onClick={() => handleIndividualRequiredTerm(terms2, setTerms2)}
          >
            <span className="text">
              v 개인정보 처리방침 <span className="highlight">*</span>
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
          <div
            className={`SignUp-agreement ${terms3 ? "active" : ""}`}
            onClick={() => handleIndividualRequiredTerm(terms3, setTerms3)}
          >
            <span className="text">
              v 게시물 및 댓글 작성 윤리 지침{" "}
              <span className="highlight">*</span>
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

          <div
            className={`SignUp-agreement ${allOptionalTerms ? "active" : ""}`}
            onClick={handleAllOptionalTerms}
          >
            <span className="text">선택 약관 전체 동의하기</span>
            <span className="icon">V</span>
          </div>

          <div
            className={`SignUp-agreement ${terms4 ? "active" : ""}`}
            onClick={() => handleIndividualOptionalTerm(terms4, setTerms4)}
          >
            <span className="text">v 마케팅 정보 수신 동의 [선택]</span>
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
          <div
            className={`SignUp-agreement ${terms5 ? "active" : ""}`}
            onClick={() => handleIndividualOptionalTerm(terms5, setTerms5)}
          >
            <span className="text">v 버그 자동 전송 [선택]</span>
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
              <input type="file" onChange={handleProfilePicChange} />
            </label>
          </div>

          <div className="SignUp-form-group">
            <label>
              닉네임 <span className="SignUp-required">*</span>
            </label>
            <input
              type="text"
              placeholder="한글, 영문, 숫자가 포함될 수 있습니다"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
            />
            {nicknameError && (
              <p className="SignUp-error-message">{nicknameError}</p>
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
              onChange={(e) => setEmail(e.target.value)}
            />
            {emailError && <p className="SignUp-error-message">{emailError}</p>}
          </div>

          <div className="SignUp-form-group" style={{ position: "relative" }}>
            <label>
              비밀번호 <span className="SignUp-required">*</span>
            </label>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="8자 이상, 특수문자 포함"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ paddingRight: "40px" }} // 오른쪽 여백 추가
            />
            <button
              type="button"
              className="SignUp-eye-btn"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "🙈" : "👁"}
            </button>
            {passwordError && (
              <p className="SignUp-error-message">{passwordError}</p>
            )}
          </div>

          <div className="SignUp-form-group" style={{ position: "relative" }}>
            <label>
              비밀번호 다시 입력 <span className="SignUp-required">*</span>
            </label>
            <input
              type={showConfirmPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              style={{ paddingRight: "40px" }} // 오른쪽 여백 추가
            />
            <button
              type="button"
              className="SignUp-eye-btn"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? "🙈" : "👁"}
            </button>
            {confirmPasswordError && (
              <p className="SignUp-error-message">{confirmPasswordError}</p>
            )}
          </div>

          <button type="submit" className="SignUp-continue-btn enabled">
            계속하기
          </button>

          <button
            type="button"
            className="SignUp-back-btn"
            onClick={() => setStep(1)}
          >
            뒤로가기
          </button>
        </form>
      )}
    </div>
  );
};

SignUp.propTypes = {
  onSignUp: PropTypes.func.isRequired,
};

export default SignUp;
