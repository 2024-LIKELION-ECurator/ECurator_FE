import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navigation.css";
import logo1 from '../../images/logo.png';
import defaultProfileImg from '../../images/default_profile_img.png'; // 기본 프로필 이미지 임포트

function Navigation() {
  const isLoggedIn = localStorage.getItem("access_token");
  const userProfileImage = localStorage.getItem("profile_image");
  const navigate = useNavigate();

  // 로그아웃 처리 함수
  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("profile_image");
    navigate("/login"); // 로그아웃 후 로그인 페이지로 이동
  };

  return (
    <div className="nav">
      <div className="nav-left">
        <Link to="/">
          <img src={logo1} alt="Logo" />
        </Link>
        <Link to="/">홈</Link>
        <Link to="/calendar">캘린더</Link>
        <Link to="/community">다이어리</Link>
      </div>

      <div className="nav-right">
        {isLoggedIn ? (
          <>
            <Link to="/mypage">
              <img
                src={userProfileImage || defaultProfileImg}
                className="nav-profile-icon"
                alt="Profile"
              />
            </Link>
            {/* 로그아웃 버튼 대신 프로필 아이콘만 표시 */}
          </>
        ) : (
          <Link to="/login">로그인</Link>
        )}
      </div>
    </div>
  );
}

export default Navigation;
