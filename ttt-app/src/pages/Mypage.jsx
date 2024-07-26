import ProfileCard from "./../components/User/ProfileCard";
import "./Mypage.css";
import btnimg from "../assets/Button-Edit.png";

const Mypage = () => {
  return (
    <div>
      <div className="profile-container">
        <ProfileCard />
        <div className="edit-button-container">
          <button className="edit-button">
            <img src={btnimg} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Mypage;
