import { useState } from "react"; // useState (상태 관리) 사용
import { useNavigate } from "react-router-dom"; // useNavigate(페이지 이동) 사용
import PropTypes from "prop-types"; // PropTypes (타입 검사) 사용
import axios from "axios"; // axios (HTTP 요청 라이브러리) 사용

import "./SignIn.css"; //SignIn.css 와 연결.

//로그인 컴포넌트
const SignIn = ({ onSignIn }) => {
  const navigate = useNavigate(); // 페이지 이동 훅
  const [email, setEmail] = useState(""); // 이메일 상태
  const [password, setPassword] = useState(""); // 비밀번호 상태

  // 폼 제출 핸들러 - 로그인 로직을 구현
  const handleLogin = async (e) => {
    e.preventDefault(); // 폼 제출 시 페이지 새로고침 방지

    try {
      const data = { email, password }; // 로그인 데이터 객체 생성
      // axios를 사용하여 서버에 POST 요청을 보냄
      const response = await axios.post(
        "http://127.0.0.1:8080/member/login", //와 이때까지 /member/Signin 으로 맞춰 있었음;;;;;
        data,
        {
          headers: {
            "Content-Type": "application/json", // 요청 헤더에 Content-Type 설정
          },
        }
      );

      // 응답 상태 코드에 따라 처리
      if (response.status === 200) {
        alert("로그인 성공!"); // 200 성공 처리
        const user = response.data; // 응답 데이터에서 사용자 정보 추출
        onSignIn(user); // 로그인 성공 후 부모 컴포넌트에 사용자 데이터 전달
        navigate("/profile"); // 프로필 페이지로 이동
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        alert(error.response.data); // 400 오류 처리 - 서버에서 반환된 오류 메시지 표시
      } else {
        alert("로그인 요청이 실패했습니다."); // 그 외 요청 실패 시 오류 메시지 표시
        console.error("Error during login:", error); // 콘솔에 오류 로그 출력
      }
    }
  };

  return (
    <div className="SignIn-container">
      <div className="SignIn-header">
        <h2>로그인</h2>
      </div>
      <form onSubmit={handleLogin}>
        <div className="SignIn-form-group">
          <label className="SignIn-label">이메일</label>
          <input
            type="email"
            className="SignIn-input-email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {/*onChange={(e) => setEmail(e.target.value)} ==> 이메일 입력값 업데이트 */}
        </div>
        <div className="SignIn-form-group">
          <label className="SignIn-label">비밀번호</label>
          <input
            type="password"
            className="SignIn-input-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {/*onChange={(e) => setPassword(e.target.value)} ==> 비밀번호 입력값 업데이트 */}
        </div>
        <button type="submit" className="SignIn-button">
          로그인
        </button>
      </form>
      <button onClick={() => navigate("/signup")} className="SignIn-button">
        회원가입
      </button>
    </div>
  );
};

SignIn.propTypes = {
  onSignIn: PropTypes.func.isRequired, // onSignIn prop 타입 검사
};

export default SignIn;
