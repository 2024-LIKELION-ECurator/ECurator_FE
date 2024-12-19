import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import happy from '../../images/stc_happy.png';
import sad from '../../images/stc_sad.png';
import surprised from '../../images/stc_surprised.png';
import loving from '../../images/stc_loving.png';
import sleepy from '../../images/stc_sleepy.png';
import nervous from '../../images/stc_nervous.png';
import pensive from '../../images/stc_pensive.png';
import relieved from '../../images/stc_relieved.png';
import joyful from '../../images/stc_joyful.png';
import "./Home.css";

function Home() {
  const [selectedEmotion, setSelectedEmotion] = useState(""); // 감정 상태
  const navigate = useNavigate();

  // 감정 선택/해제 핸들러
  const handleEmotionClick = (emotion) => {
    if (selectedEmotion === emotion) {
      setSelectedEmotion(""); // 이미 선택된 감정을 다시 클릭하면 해제
    } else {
      setSelectedEmotion(emotion); // 감정 선택
    }
  };

  // 선택 버튼 클릭 시 Recommend 페이지로 이동
  const handleSelectButtonClick = () => {
    if (selectedEmotion) {
      navigate(`/recommend/${selectedEmotion}`); // 선택한 감정으로 이동
    }
  };

  return (
    <section className="container">
      <h3>지금 당신의 기분은 어떤가요?</h3>
      <div className="home-stc">
        {[
          { emotion: "HAPPY", img: happy },
          { emotion: "SAD", img: sad },
          { emotion: "SURPRISED", img: surprised },
          { emotion: "LOVING", img: loving },
          { emotion: "SLEEPY", img: sleepy },
          { emotion: "NERVOUS", img: nervous },
          { emotion: "PENSIVE", img: pensive },
          { emotion: "RELIEVED", img: relieved },
          { emotion: "JOYFUL", img: joyful },
        ].map(({ emotion, img }) => (
          <div
            key={emotion}
            className="emotion"
            onClick={() => handleEmotionClick(emotion)} // 클릭 시 감정 선택/해제
            style={{
              cursor: "pointer",
              filter: selectedEmotion && selectedEmotion !== emotion ? "blur(4px)" : "none", // 선택되지 않은 감정 블러 처리
              position: "relative", // 위치 고정을 위해 추가
              transform: "none", // 아이콘이 이동하는 현상 방지
            }}
          >
            <img src={img} alt={`${emotion} Emotion`} />
            <p className="emo-title">{emotion}</p>
          </div>
        ))}
      </div>
      <button
        id="signup_btn"
        className="select_btn"
        onClick={handleSelectButtonClick} 
        disabled={!selectedEmotion} 
        style={{
          backgroundColor: selectedEmotion ? "#FECCC9" : "#ffffff", // 선택된 경우 버튼 색상 변경
        }}
      >
        선택
      </button>
    </section>
  );
}

export default Home;
