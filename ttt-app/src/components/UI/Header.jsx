import { useNavigate } from "react-router-dom";
import "./Header.css";
import backicon from "../../assets/Icon_Back.png";

const Header = ({ text, homebtn }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/");
  };

  return (
    <header className="Header">
      <div className="homebutton_section">
        <button onClick={handleClick} className="home-button">
          <img src={backicon} /> 홈
        </button>
      </div>
      <div className="title">
        <b>{text}</b>
      </div>
    </header>
  );
};

export default Header;
