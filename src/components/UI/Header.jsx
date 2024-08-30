import { useNavigate } from 'react-router-dom';
import './Header.css';
import backicon from '../../assets/Icon_ Back 1.png';

// titleText : 현재 페이지 명,
// page : 좌측 버튼("<" 기존의 home 버튼)을 눌렀을 때의 목적지 경로 (back을 했을때 /page 로 이동)
// rightText : 우측 버튼의 텍스트
// customFunc : 우측 버튼의 커스텀 함수 (저장 버튼, 선택 버튼 등)

const Header = ({ titleText, page, rightText, customFunc }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/${page}`);
  };

  return (
    <header className="Header">
      <div className="homebutton_section">
        <button onClick={handleClick} className="home-button">
          <img className="home-icon" src={backicon} />
        </button>
      </div>
      <div className="title">
        <b>{titleText}</b>
      </div>
      <div className="rightbutton_section">
        <button onClick={customFunc}>
          <b>{rightText}</b>
        </button>
      </div>
    </header>
  );
};

export default Header;
