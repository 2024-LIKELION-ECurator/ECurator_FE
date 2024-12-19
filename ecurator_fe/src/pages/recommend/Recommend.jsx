import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import happy from '../../images/stc_happy.png';
import sad from '../../images/stc_sad.png';
import surprised from '../../images/stc_surprised.png';
import loving from '../../images/stc_loving.png';
import sleepy from '../../images/stc_sleepy.png';
import nervous from '../../images/stc_nervous.png';
import pensive from '../../images/stc_pensive.png';
import relieved from '../../images/stc_relieved.png';
import joyful from '../../images/stc_joyful.png';
import ModalAcess from "../../components/modals/ModalAcess"; 
import "./Recommend.css";

function Recommend() {
  const { emotion } = useParams();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 로그인 상태 체크
  const isLoggedIn = localStorage.getItem("access_token");

  // 로그인되지 않은 경우, 모달을 열기
  useEffect(() => {
    if (!isLoggedIn) {
      setIsModalOpen(true); // 로그인되지 않으면 모달 열기
    }
  }, [isLoggedIn]); // isLoggedIn이 변경될 때마다 모달 상태를 업데이트

  const emotionImages = {
    HAPPY: happy,
    SAD: sad,
    SURPRISED: surprised,
    LOVING: loving,
    SLEEPY: sleepy,
    NERVOUS: nervous,
    PENSIVE: pensive,
    RELIEVED: relieved,
    JOYFUL: joyful,
  };

  const emotionIcon = emotionImages[emotion] || happy;

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleOpenModal = () => {
    setIsModalOpen(true); // 모달 열기
  };

  const handleCloseModal = () => {
    setIsModalOpen(false); // 모달 닫기
  };

  const handleGoToCalendar = () => {
    navigate("/calendar");  // 캘린더 페이지로 이동
  };

  return (
    <div className="recommend-container">
      <div className="emotion-section">
        <img src={emotionIcon} alt={`${emotion} Emotion`} className="emotion-icon" />
        <p className="emotion-text">{emotion}</p>
      </div>
      <div className="content-section">
        <div className="category">
          <p className="category-title"><a className="musicpink">MUSIC</a> FOR YOU</p>
          <ol>
            <li>노래 제목 - 가수 이름</li>
            <li>노래 제목 - 가수 이름</li>
            <li>노래 제목 - 가수 이름</li>
            <li>노래 제목 - 가수 이름</li>
          </ol>
        </div>
        <div className="category">
          <p className="category-title"><a className="moviegreen">MOVIES</a> FOR YOU</p>
          <ol>
            <li>영화 제목 - 감독 이름</li>
            <li>영화 제목 - 감독 이름</li>
            <li>영화 제목 - 감독 이름</li>
            <li>영화 제목 - 감독 이름</li>
          </ol>
        </div>
        <div className="category">
          <p className="category-title"><a className="bookblue">BOOKS</a> FOR YOU</p>
          <ol>
            <li>책 제목 - 작가 이름</li>
            <li>책 제목 - 작가 이름</li>
            <li>책 제목 - 작가 이름</li>
            <li>책 제목 - 작가 이름</li>
          </ol>
        </div>
      </div>
      <div className="button-section">
        <button className="back-button" onClick={handleGoBack}>뒤로 가기</button>
        <button className="calendar-button" onClick={handleGoToCalendar}>캘린더 가기</button>
      </div>
      
      {/* 모달이 열려있으면 모달 컴포넌트를 렌더링 */}
      {isModalOpen && <ModalAcess onClose={handleCloseModal} />}
    </div>
  );
}

export default Recommend;
