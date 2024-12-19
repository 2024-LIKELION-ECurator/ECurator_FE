import React, { useState, useEffect } from "react";
import "./Login.css";
import logo1 from "../../images/logo.png";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [loading, setLoading] = useState(false); // 로딩 상태
  const [userInfo, setUserInfo] = useState(null); // 사용자 정보 상태
  const navigate = useNavigate();

  // 입력값 변경 처리
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // 로그인 요청 처리
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("/users/login/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: formData.username,
          password: formData.password,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("로그인 성공:", data);

        // access_token을 로컬 스토리지에 저장
        const accessToken = data.access;
        localStorage.setItem("access_token", accessToken);

        // 사용자 정보 가져오기
        const userResponse = await fetch("/users/profile/", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${accessToken}`,
          },
        });

        if (userResponse.ok) {
          const userData = await userResponse.json();
          console.log("사용자 정보:", userData);
          setUserInfo(userData); // 사용자 정보 상태 업데이트
        } else {
          console.error("사용자 정보 가져오기 실패");
        }

        // 마이페이지로 리디렉션
        navigate("/mypage");
      } else {
        console.error("로그인 실패:", response);
        alert("아이디 또는 비밀번호가 잘못되었습니다.");
      }
    } catch (error) {
      console.error("로그인 중 오류 발생:", error);
      alert("로그인 요청 중 문제가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  // 버튼 색상 조건: 둘 다 입력되었으면 #FECCC9, 아니면 회색
  const isButtonActive = formData.username && formData.password;

  return (
    <div className="container">
      <a href="/home">
        <img src={logo1} alt="Logo" className="logoimg" />
      </a>
      <form onSubmit={handleSubmit}>
        <div className="input">
          <input
            id="id_input"
            name="username"
            type="text"
            maxLength="20"
            placeholder="아이디"
            className="id_input"
            value={formData.username}
            onChange={handleChange}
          />
          <input
            id="pw_input"
            name="password"
            type="password"
            maxLength="20"
            placeholder="비밀번호"
            className="pw_input"
            value={formData.password}
            onChange={handleChange}
          />
        </div>
        <input
          id="login_btn"
          type="submit"
          className="login_btn"
          value={loading ? "로딩 중..." : "로그인"}
          style={{
            backgroundColor: isButtonActive ? "#FECCC9" : "#D3D3D3",
          }}
          disabled={loading || !isButtonActive}
        />
        <div className="options">
          <label className="keep">
            <input type="checkbox" />
            로그인 유지
          </label>
        </div>
      </form>
      <p className="register">
        <Link to="/signup">회원가입</Link>
      </p>

      {/* 사용자 정보 표시 */}
      {userInfo && (
        <div className="user-info">
          <p>이름: {userInfo.name}</p>
          <p>생일: {userInfo.birthday}</p>
        </div>
      )}
    </div>
  );
}

export default Login;
