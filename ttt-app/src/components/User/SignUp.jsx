import { useState } from "react";
import { useNavigate } from "react-router-dom"; // 리다이렉트를 위해 사용
import PropTypes from "prop-types";
import "../../App.css"; // App.css 파일을 import 합니다.

const validateEmail = (email) => {
  const re = /\S+@\S+\.\S+/;
  return re.test(email);
};

const SignUp = ({ onSignUp }) => {
  const navigate = useNavigate(); // useNavigate 훅을 사용하여 리다이렉트 처리
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [nickname, setNickname] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [nicknameError, setNicknameError] = useState("");

  // Mock 데이터베이스
  const existingUsers = [
    { email: "existing@example.com", nickname: "existingUser" },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();

    let valid = true;

    // 중복 이메일 및 닉네임 검증
    if (existingUsers.some((user) => user.email === email)) {
      setEmailError("이미 사용 중인 이메일입니다.");
      valid = false;
    } else {
      setEmailError("");
    }

    if (existingUsers.some((user) => user.nickname === nickname)) {
      setNicknameError("이미 사용 중인 닉네임입니다.");
      valid = false;
    } else {
      setNicknameError("");
    }

    // 유효성 검사
    if (!validateEmail(email)) {
      setEmailError("유효한 이메일 주소를 입력하세요.");
      valid = false;
    }

    if (password.length < 8) {
      setPasswordError("비밀번호는 8자 이상이어야 합니다.");
      valid = false;
    }

    if (password !== confirmPassword) {
      setConfirmPasswordError("비밀번호가 일치하지 않습니다.");
      valid = false;
    }

    if (nickname.length === 0) {
      setNicknameError("닉네임을 입력하세요.");
      valid = false;
    }

    if (!termsAccepted) {
      alert("약관에 동의해야 합니다.");
      valid = false;
    }

    if (valid) {
      // 서버로 폼 데이터 전송 (여기서는 Mock 데이터에 추가)
      const newUser = { email, nickname };
      existingUsers.push(newUser);
      alert("정상적으로 회원가입이 완료되었습니다!");
      onSignUp(newUser); // 회원가입 완료 후 사용자 데이터를 전달
      setTimeout(() => {
        navigate("/signin"); // 2초 후 로그인 페이지로 리다이렉트
      }, 2000);
    }
  };

  const handleEmailChange = (e) => {
    const emailValue = e.target.value;
    setEmail(emailValue);

    if (!validateEmail(emailValue)) {
      setEmailError("유효한 이메일 주소를 입력하세요.");
    } else {
      setEmailError("");
    }
  };

  const handlePasswordChange = (e) => {
    const passwordValue = e.target.value;
    setPassword(passwordValue);

    if (passwordValue.length < 8) {
      setPasswordError("비밀번호는 8자 이상이어야 합니다.");
    } else {
      setPasswordError("");
    }
  };

  const handleConfirmPasswordChange = (e) => {
    const confirmPasswordValue = e.target.value;
    setConfirmPassword(confirmPasswordValue);

    if (confirmPasswordValue !== password) {
      setConfirmPasswordError("비밀번호가 일치하지 않습니다.");
    } else {
      setConfirmPasswordError("");
    }
  };

  const handleNicknameChange = (e) => {
    const nicknameValue = e.target.value;
    setNickname(nicknameValue);

    if (nicknameValue.length === 0) {
      setNicknameError("닉네임을 입력하세요.");
    } else {
      setNicknameError("");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>이메일</label>
        <input type="email" value={email} onChange={handleEmailChange} />
        {emailError && <p>{emailError}</p>}
      </div>

      <div>
        <label>비밀번호</label>
        <input
          type="password"
          value={password}
          onChange={handlePasswordChange}
        />
        {passwordError && <p>{passwordError}</p>}
      </div>

      <div>
        <label>비밀번호 확인</label>
        <input
          type="password"
          value={confirmPassword}
          onChange={handleConfirmPasswordChange}
        />
        {confirmPasswordError && <p>{confirmPasswordError}</p>}
      </div>

      <div>
        <label>닉네임</label>
        <input type="text" value={nickname} onChange={handleNicknameChange} />
        {nicknameError && <p>{nicknameError}</p>}
      </div>

      <div>
        <input
          type="checkbox"
          checked={termsAccepted}
          onChange={(e) => setTermsAccepted(e.target.checked)}
        />
        <label>약관에 동의합니다</label>
      </div>

      <button type="submit">회원가입</button>
    </form>
  );
};

SignUp.propTypes = {
  onSignUp: PropTypes.func.isRequired,
};

export default SignUp;
