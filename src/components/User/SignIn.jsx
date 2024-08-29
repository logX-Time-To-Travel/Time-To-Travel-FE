import { useState } from 'react'; // useState (상태 관리) 사용
import { useNavigate } from 'react-router-dom'; // useNavigate(페이지 이동) 사용
import PropTypes from 'prop-types'; // PropTypes (타입 검사) 사용
import axios from 'axios'; // axios (HTTP 요청 라이브러리) 사용
import BackIcon from '../../assets/Icon_ Back 1.png';

import './SignIn.css'; // SignIn.css 와 연결

// 로그인 컴포넌트
const SignIn = () => {
  const navigate = useNavigate(); // 페이지 이동 훅
  const [email, setEmail] = useState(''); // 이메일 상태
  const [password, setPassword] = useState(''); // 비밀번호 상태
  const [error, setError] = useState(''); // 비밀번호 오류 메시지 상태
  const [emailError, setEmailError] = useState(''); // 이메일 오류 메시지 상태 추가

  // 폼 제출 핸들러 - 로그인 로직을 구현
  const handleLogin = async (e) => {
    e.preventDefault(); // 폼 제출 시 페이지 새로고침 방지

    try {
      const data = { email, password }; // 로그인 데이터 객체 생성
      const response = await axios.post(
        'http://localhost:8080/member/login',
        data,
        {
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        alert('로그인 성공!');
        navigate('/home');
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 404) {
          // 서버에서 이메일이 없는 경우 404 상태 코드를 반환한다고 가정
          setEmailError('해당 이메일로 등록된 계정이 없습니다.');
          setError(''); // 비밀번호 오류 메시지 초기화
        } else if (error.response.status === 400) {
          // 비밀번호가 틀린 경우
          setEmailError(''); // 이메일 오류 메시지 초기화
          setError('비밀번호가 알맞지 않습니다');
        } else {
          alert('로그인 요청이 실패했습니다.');
          console.error('Error during login:', error);
        }
      } else {
        alert('로그인 요청이 실패했습니다.');
        console.error('Error during login:', error);
      }
    }
  };

  return (
    <div className="SignIn-container">
      <div className="SignIn-header">
        <div className="SignIn-back-button">
          <img src={BackIcon} alt="뒤로가기" />
        </div>
        <div className="SignIn-title-bar"></div>
        <h2>로그인</h2>
      </div>
      <form onSubmit={handleLogin}>
        <div className="SignIn-form-group">
          <label className="SignIn-label">이메일</label>
          <input
            type="email"
            className={`SignIn-input-email ${
              emailError ? 'SignIn-input-error' : ''
            }`}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {emailError && (
            <p className="SignIn-email-error-message">{emailError}</p>
          )}
        </div>
        <div className="SignIn-form-group">
          <label className="SignIn-label">비밀번호</label>
          <input
            type="password"
            className={`SignIn-input-password ${
              error ? 'SignIn-input-error' : ''
            }`}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && <div className="SignIn-error-message">{error}</div>}
        </div>
        <button type="submit" className="SignIn-button">
          로그인
        </button>
      </form>

      <button onClick={() => navigate('/signup')} className="SignUp-button">
        계정 만들기
      </button>
    </div>
  );
};

SignIn.propTypes = {
  onSignIn: PropTypes.func.isRequired,
};

export default SignIn;
