import { useNavigate } from "react-router-dom";
import "./Header.css";
import backicon from "../../assets/Icon_ Back 1.png";

const Header = ({ text, rightText}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/");
  };

  return (
    <header className="Header">
      <div className="homebutton_section">
        <button onClick={handleClick} className="home-button">
          <img src={backicon} /> 
        </button>
      </div>
      <div className="title">
        <b>{text}</b>
      </div>
      <div className = "rightbutton_section">
        <b>{rightText}</b>
      </div>
    </header>
  );
};

export default Header;
