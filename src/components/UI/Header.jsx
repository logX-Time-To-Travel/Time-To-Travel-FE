import { useNavigate } from 'react-router-dom';
import './Header.css';
import backicon from '../../assets/Icon_ Back 1.png';

const Header = ({ text, rightText, customFunc }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/');
  };

  return (
    <header className="Header">
      <div className="homebutton_section">
        <button onClick={handleClick} className="home-button">
          <img className = "home-icon" src={backicon} />
        </button>
      </div>
      <div className="title">
        <b>{text}</b>
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
