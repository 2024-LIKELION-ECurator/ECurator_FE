import React, { useState, useEffect } from "react";
import "./Signup.css";
import logo1 from "../../images/logo.png";
import { useNavigate } from "react-router-dom";

function Signup() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    nickname: "",
    birthYear: "",
    birthMonth: "",
    birthDay: "",
  });

  const [isButtonActive, setIsButtonActive] = useState(false);
  const [passwordError, setPasswordError] = useState(""); // 비밀번호 오류 상태 추가
  const navigate = useNavigate();

  // 비밀번호 유효성 검사 함수
  const validatePassword = (password) => {
    const regex = /^(?=.*[a-zA-Z])(?=.*\d).{8,}$/; // 영문자 + 숫자 조합, 최소 8자
    if (!regex.test(password)) {
      setPasswordError("8~20자의 영어와 숫자 조합의 비밀번호를 설정해주세요");
      return false;
    } else {
      setPasswordError("");
      return true;
    }
  };

  // 입력값 변경 처리
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    if (name === "password") {
      validatePassword(value); // 비밀번호 변경 시 유효성 검사
    }
  };

  // 생년월일 드롭다운 옵션 생성 함수
  const generateYears = () => {
    const years = [];
    const currentYear = new Date().getFullYear();
    for (let year = currentYear; year >= 1900; year--) {
      years.push(year);
    }
    return years;
  };

  const generateMonths = () => {
    return Array.from({ length: 12 }, (_, index) => index + 1);
  };

  const generateDays = (month, year) => {
    const daysInMonth = new Date(year, month, 0).getDate();
    return Array.from({ length: daysInMonth }, (_, index) => index + 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 비밀번호 유효성 체크
    if (passwordError) {
      alert("비밀번호 유효성 검사를 통과하지 않았습니다.");
      return;
    }

    try {
      const response = await fetch("http://13.125.7.131/users/register/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: formData.username,
          password: formData.password,
          nickname: formData.nickname,
          birthdate: `${formData.birthYear}-${formData.birthMonth}-${formData.birthDay}`,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("회원가입 성공:", data);
        alert("회원가입이 완료되었습니다!");
        navigate("/login"); // 회원가입 후 로그인 페이지로 이동
      } else {
        const errorData = await response.json();
        console.error("회원가입 실패 응답:", errorData);
        alert("회원가입에 실패했습니다. 다시 시도해주세요.");
      }
    } catch (error) {
      console.error("회원가입 중 오류 발생:", error);
      alert("회원가입 요청 중 문제가 발생했습니다.");
    }
  };

  // 버튼 활성화 상태 확인
  const checkButtonActive = () => {
    const { username, password, nickname, birthYear, birthMonth, birthDay } = formData;
    setIsButtonActive(username && password && nickname && birthYear && birthMonth && birthDay && !passwordError);
  };

  useEffect(() => {
    checkButtonActive();
  }, [formData, passwordError]);

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
          {passwordError && <p className="password-error">{passwordError}</p>}

          <input
            id="nickname_input"
            name="nickname"
            type="text"
            maxLength="20"
            placeholder="닉네임"
            className="nickname_input"
            value={formData.nickname}
            onChange={handleChange}
          />
          <div className="birth-input">
            <select
              name="birthYear"
              value={formData.birthYear}
              onChange={handleChange}
              className="birth-select"
            >
              <option value="">년도</option>
              {generateYears().map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
            <select
              name="birthMonth"
              value={formData.birthMonth}
              onChange={handleChange}
              className="birth-select"
            >
              <option value="">월</option>
              {generateMonths().map((month) => (
                <option key={month} value={month}>
                  {month}
                </option>
              ))}
            </select>
            <select
              name="birthDay"
              value={formData.birthDay}
              onChange={handleChange}
              className="birth-select"
            >
              <option value="">일</option>
              {formData.birthMonth && formData.birthYear
                ? generateDays(formData.birthMonth, formData.birthYear).map((day) => (
                    <option key={day} value={day}>
                      {day}
                    </option>
                  ))
                : null}
            </select>
          </div>
        </div>
        <input
          id="signup_btn"
          type="submit"
          className={`signup_btn ${isButtonActive ? "on" : ""}`}
          value="회원가입"
          disabled={!isButtonActive}
        />
      </form>
    </div>
  );
}

export default Signup;
