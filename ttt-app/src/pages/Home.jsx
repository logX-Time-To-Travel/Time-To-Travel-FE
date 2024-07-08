import { Link } from "react-router-dom";
import Button from "../components/Button";
import MapHome from "../components/Map/MapHome";
import "./Home.css";

const Home = () => {
  return (
    <div>
      <MapHome />
      {/* <Link to={"/Blog"}>
        <Button text={"블로그 쓰기"} />
      </Link>
      <Link to={"/Profile"}>
        <Button text={"프로필"} />
      </Link>
      <Link to={"/Auth"}>
        <Button text={"회원가입 / 로그인"} />
      </Link> */}
    </div>
  );
};

export default Home;
