import "./Button.css";
import { useNavigate } from "react-router-dom";

const Button = ({ text, path }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(path);
  };
  return (
    <div>
      <button className="button" onClick={handleClick}>
        <div>{text}</div>
      </button>
    </div>
  );
};

export default Button;
