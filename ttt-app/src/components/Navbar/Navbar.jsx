import React from "react";
import { Link } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.css";
import "./Navbar.css";

const Navbar = () => {
  return (
    <div className="navigation-bar">
      <Link to="/" className="nav-item active">
        <i className="fas fa-map-marker-alt"></i>
        <span>지도</span>
      </Link>
      <Link to="/AddPost" className="nav-item">
        <i className="fas fa-edit"></i>
        <span>글쓰기</span>
      </Link>
      <Link to="/Blog" className="nav-item">
        <i className="fas fa-user"></i>
        <span>나</span>
      </Link>
      <div className="nav-item">
        <i className="fas fa-star"></i>
        <span>관심사</span>
      </div>
    </div>
  );
};

export default Navbar;
