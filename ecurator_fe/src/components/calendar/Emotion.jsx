import React, { useState } from "react";
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
  const [emotionData, setEmotionData] = useState(null);
  const accessToken = localStorage.getItem("access_token");

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

      console.log("서버로 전송되는 데이터:", {
        date: formattedDate,
        emotion_name: emotionName,
      });

      console.log("감정등록성공: ", response.data);

      if (response.status === 202) {
        console.log(response.data);

        const EmotionId = response.data.id;
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
      } else {
        console.log("감정 등록 성공", response.data);
      }
      if (onEmotionSubmit) onEmotionSubmit();
    } catch (error) {
      console.error("감정 처리 실패", error);
    }
  };

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
