import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

import "./SignIn.css"; // App -> SignIn css 위치 변경

//로그인 컴포넌트
const SignIn = ({ onSignIn }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    // 로그인 로직 구현
    // 실제로는 서버와 통신하여 사용자 인증을 처리해야 합니다.
    // 여기서는 단순히 이메일과 비밀번호를 출력합니다.
    console.log("로그인 시도", { email, password });

    // Mock 로그인 성공 후 사용자 설정
    const user = { email, nickname: "사용자 닉네임" }; // 예시 사용자 데이터
    onSignIn(user);

    // 로그인 성공 후 지도 페이지로 리다이렉트
    navigate("/profile");
  };

  return (
    <div>
      <h2>로그인</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>이메일</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label>비밀번호</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">로그인</button>
      </form>
      <button onClick={() => navigate("/signup")}>회원가입</button>
    </div>
  );
};

SignIn.propTypes = {
  onSignIn: PropTypes.func.isRequired,
};

export default SignIn;
