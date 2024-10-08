import "./Button.css";
import { useNavigate } from "react-router-dom";

const Button = ({ text, path, onClick, customFunc }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(path);
    customFunc();
  };
  return (
    <div>
      <button className="button" onClick={(handleClick)}>
        <div className="button-text">{text}</div>
      </button>
    </div>
  );
};

export default Button;
