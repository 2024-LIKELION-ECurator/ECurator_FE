import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import happy from "../../images/stc_happy.png";
import joyful from "../../images/stc_joyful.png";
import loving from "../../images/stc_loving.png";
import nervous from "../../images/stc_nervous.png";
import pensive from "../../images/stc_pensive.png";
import relieved from "../../images/stc_relieved.png";
import sad from "../../images/stc_sad.png";
import surprised from "../../images/stc_surprised.png";
import sleepy from "../../images/stc_sleepy.png";

const StcWrap = styled.div`
  display: grid;
  width: 730px;
  height: 600px;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  margin: 100px;
`;

const Stc = styled.div`
  text-align: center;

  img {
    width: 150px;
    height: 150px;
    cursor: pointer;
  }
`;

const emotions = [
  { name: "happy", img: happy },
  { name: "joyful", img: joyful },
  { name: "loving", img: loving },
  { name: "nervous", img: nervous },
  { name: "pensive", img: pensive },
  { name: "relieved", img: relieved },
  { name: "sad", img: sad },
  { name: "surprised", img: surprised },
  { name: "sleepy", img: sleepy },
];

function Emotion({ selectedDate, onEmotionSubmit, emotionId }) {
  const [emotionState, setEmotionState] = useState("unregistered");
  const accessToken = localStorage.getItem("access_token");

  const [emotionData, setEmotionData] = useState(() => {
    const savedData = localStorage.getItem("emotionData");
    return savedData ? JSON.parse(savedData) : [];
  });

  const handleEmotionClick = async (emotionName) => {
    try {
      const formattedDate = new Date(selectedDate).toLocaleDateString("en-CA");
      console.log("전송되는 감정 이름: ", emotionName);

      const response = await axios.post(
        "/emo_calendar/emotion-history/",
        {
          emotion: emotionName,
          date: formattedDate,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("서버 응답:", response.data);
      console.log("응답의 data 필드:", response.data?.data);

      // 응답 데이터가 올바르지 않을 경우 데이터 수정 로직 추가
      if (!response.data || !response.data.data) {
        console.error("응답 데이터가 올바르지 않습니다:", response.data);

        // 기존 데이터에서 수정할 데이터를 찾음
        const existingEmotion = emotionData.find((item) => new Date(item.date).toLocaleDateString("en-CA") === formattedDate);

        if (existingEmotion) {
          const EmotionId = existingEmotion.id; // 수정할 ID 가져오기
          console.log("수정할 EmotionId: ", EmotionId);

          try {
            const updateResponse = await axios.put(
              `/emo_calendar/emotion-history/${EmotionId}/`,
              {
                emotion: emotionName,
              },
              {
                headers: {
                  Authorization: `Bearer ${accessToken}`,
                  "Content-Type": "application/json",
                },
              }
            );
            console.log("감정 수정 성공: ", updateResponse.data);
            if (updateResponse.data?.error === "오늘 작성한 감정만 수정할 수 있습니다.") {
              alert("오늘 날짜의 감정만 수정 가능합니다");
              return;
            }

            // 감정 수정 후 로컬 데이터도 업데이트
            setEmotionData((prev) => prev.map((item) => (item.id === EmotionId ? { ...item, emotion_name: emotionName } : item)));
          } catch (error) {
            console.error("감정 수정 실패: ", error);
          }
        } else {
          console.warn("해당 날짜에 대한 기존 데이터가 없습니다.");
        }

        return; // PUT 작업 후 함수 종료
      }

      const newEmotion = {
        id: response.data.id,
        emotion_name: response.data.data.emotion_name,
        date: response.data.data.date,
      };

      setEmotionData((prev) => {
        const updatedEmotionData = [...prev, newEmotion];
        localStorage.setItem("emotionData", JSON.stringify(updatedEmotionData));
        return updatedEmotionData;
      });

      if (onEmotionSubmit) onEmotionSubmit();
    } catch (error) {
      console.error("감정 처리 실패", error);
    }
  };

  useEffect(() => {
    console.log("emotionData가 업데이트되었습니다:", emotionData);
  }, [emotionData]);

  return (
    <StcWrap>
      {emotions.map((emotion) => (
        <Stc key={emotion.name}>
          <img src={emotion.img} alt={emotion.name} onClick={() => handleEmotionClick(emotion.name)} />
        </Stc>
      ))}
    </StcWrap>
  );
}

export default Emotion;
