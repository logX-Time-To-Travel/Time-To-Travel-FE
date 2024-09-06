import { Link } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.css';
import './Navbar.css';

const Navbar = () => {
  return (
    <div className="navigation-bar">
      <Link
        to="/"
        className={`nav-item ${location.pathname === '/home' ? ' active' : ''}`}
      >
        <i className="fas fa-map-marker-alt"></i>
        <span>지도</span>
      </Link>
      <Link
        to="/addpost"
        className={`nav-item ${
          location.pathname === '/addpost' ? ' active' : ''
        }`}
      >
        <i className="fas fa-edit"></i>
        <span>글쓰기</span>
      </Link>
      <Link
        to="/mypage"
        className={`nav-item ${
          location.pathname === '/mypage' ? ' active' : ''
        }`}
      >
        <i className="fas fa-user"></i>
        <span>나</span>
      </Link>
      <Link
        to="/interest"
        className={`nav-item ${
          location.pathname === '/interest' ? ' active' : ''
        }`}
      >
        <i className="fas fa-star"></i>
        <span>관심사</span>
      </Link>
    </div>
  );
};

export default Navbar;
