import React, { useState, useEffect } from "react";
import "./Mypage.css";
import { Link, useNavigate } from "react-router-dom";

function Mypage() {
  const [profile, setProfile] = useState({
    nickname: "",
    birthdate: "",
    profileImage: "/media/profile_images/default.png", // 기본 이미지
  });
  const navigate = useNavigate();

  useEffect(() => {
    // 액세스 토큰을 로컬스토리지에서 가져오기
    const accessToken = localStorage.getItem("access_token");

    if (!accessToken) {
      alert("로그인이 필요합니다.");
      navigate("/login"); // 로그인 페이지로 리디렉션
      return;
    }

    // 프로필 정보 요청
    fetch("/users/mypage/", {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${accessToken}`,
      },
    })
      .then((response) => {
        if (response.status === 401) {
          alert("인증이 만료되었습니다. 다시 로그인해주세요.");
          navigate("/login");
          return;
        }
        return response.json();
      })
      .then((data) => {
        if (data) {
          setProfile({
            nickname: data.nickname,
            birthdate: data.birthdate,
            profileImage: data.profile_image || "/media/profile_images/default.png",
          });
        }
      })
      .catch((error) => {
        console.error("프로필 정보 가져오기 오류:", error);
        alert("프로필 정보를 가져오는 데 문제가 발생했습니다.");
      });
  }, [navigate]);

  // 로그아웃 처리 함수
  const handleLogout = () => {
    // 로컬스토리지에서 토큰 삭제
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");

    // 로그아웃 후 로그인 페이지로 리디렉션
    navigate("/login");
  };

  return (
    <div className="mypage-container">
      {/* 프로필 섹션 */}
      <div className="profile-section">
        <div className="profile-left">
          <img
            src={profile.profileImage}
            alt="프로필 이미지"
            className="profile-icon"
          />
          <button className="logout-button" onClick={handleLogout}>로그아웃</button>
        </div>
        <div className="profile-right">
          <p className="nickname">{profile.nickname}</p>
          <p className="birthdate">{profile.birthdate}</p>
        </div>
      </div>

      {/* 버튼 섹션 */}
      <div className="buttons-section">
        <Link to="/community" className="mypage-button">내가 작성한 일기</Link>
        <Link to="/calendar" className="mypage-button">나의 캘린더</Link>
      </div>
    </div>
  );
}

export default Mypage;
