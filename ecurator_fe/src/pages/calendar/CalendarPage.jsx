import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import * as S from "./Calendarstyled";
import prev from "../../images/prev_month.png";
import next from "../../images/next_month.png";
import happy from "../../images/stc_happy.png";
import joyful from "../../images/stc_joyful.png";
import loving from "../../images/stc_loving.png";
import nervous from "../../images/stc_nervous.png";
import pensive from "../../images/stc_pensive.png";
import relieved from "../../images/stc_relieved.png";
import sad from "../../images/stc_sad.png";
import surprised from "../../images/stc_surprised.png";
import sleepy from "../../images/stc_sleepy.png";

import Emotion from "../../components/calendar/Emotion";
import Diary from "../../components/calendar/Diary";

const Calendar = () => {
  const navigate = useNavigate();

  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date()); // 선택된 날짜 상태 추가
  const [emotionId, setEmotionId] = useState(null);
  const [visibleComponent, setVisibleComponent] = useState("calendar");
  const [dateStates, setDateStates] = useState({}); // 날짜별 상태 관리
  const [emotionData, setEmotionData] = useState([]);
  const [diaryData, setDiaryData] = useState([]);
  const [error, setError] = useState(null); // API 오류 관리
  const [data, setData] = useState({
    emotion: [],
    diary: [],
  });
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  // 달력의 첫 날
  const firstDayOfMonth = new Date(year, month, 1);
  // 달력 시작 날짜를 현재 달의 첫 날의 주의 일요일로 설정
  const startDay = new Date(firstDayOfMonth);
  startDay.setDate(firstDayOfMonth.getDate() - firstDayOfMonth.getDay());

  // 현재 달의 마지막 날
  const lastDayOfMonth = new Date(year, month + 1, 0);
  // 달력 끝 날짜를 현재 달의 마지막 날의 주의 토요일로 설정
  const endDay = new Date(lastDayOfMonth);
  endDay.setDate(lastDayOfMonth.getDate() + (6 - lastDayOfMonth.getDay()));

  // startDay부터 endDay까지의 날짜를 주 단위로 그룹화하는 함수
  const groupDatesByWeek = (startDay, endDay) => {
    const weeks = [];
    let currentWeek = [];
    let currentDate = new Date(startDay);

    while (currentDate <= endDay) {
      currentWeek.push(new Date(currentDate));
      if (currentWeek.length === 7) {
        weeks.push(currentWeek);
        currentWeek = [];
      }
      currentDate.setDate(currentDate.getDate() + 1);
    }

    // 마지막 주 추가
    if (currentWeek.length > 0) {
      weeks.push(currentWeek);
    }

    return weeks;
  };

  // weeks 배열 생성
  const weeks = groupDatesByWeek(startDay, endDay);

  const handlePrevMonth = () => {
    // 이전 달로 이동
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    // 다음 달로 이동
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const handleDayClick = (day) => {
    const dateKey = day.toDateString(); // 날짜를 문자열로 변환하여 키로 사용
    setSelectedDate(dateKey); // 선택된 날짜를 상태에 저장
    setVisibleComponent("emotion");
  };

  const handleEmotionClick = () => {
    setVisibleComponent("diary");
  };

  const emotionStc = {
    happy: happy,
    joyful: joyful,
    loving: loving,
    nervous: nervous,
    pensive: pensive,
    relieved: relieved,
    sad: sad,
    surprised: surprised,
    sleepy: sleepy,
  };

  const Emotionmatch = (date) => {
    const formattedDate = date.toLocaleDateString("en-CA");
    const matchedEmotion = emotionData.find((item) => item.date === formattedDate);
    return matchedEmotion ? matchedEmotion.emotion_name : null;
  };

  useEffect(() => {
    const fetchData = async () => {
      const accessToken = localStorage.getItem("access_token");
      try {
        const response = await axios.get(`/emo_calendar/emotion-history/${year}/${month + 1}/`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        });
        setEmotionData(response.data.emotion || []);
        setDiaryData(response.data.diary || []);
        setData(response.data);

        console.log("이모션데이터: ", response.data.emotion || []);
        console.log("다이어리", response.data.diary || []);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchData();
  }, [year, month]);

  return (
    <S.Background>
      <S.Wrap>
        <S.CalendarWrap>
          <S.Btn src={prev} alt="이전달" onClick={handlePrevMonth} />
          <S.Calendar>
            <S.Title>
              <S.Left>
                <S.Year>{year}</S.Year>
                <S.Month>{currentDate.toLocaleString("en-us", { month: "long" })}</S.Month>
              </S.Left>
              <S.Right>MY MOOD HISTORY</S.Right>
            </S.Title>
            <S.DaysWrap>
              <S.Days>
                <li>Sunday</li>
                <li>Monday</li>
                <li>Tuesday</li>
                <li>Wednesday</li>
                <li>Thursday</li>
                <li>Friday</li>
                <li>Saturday</li>
              </S.Days>
            </S.DaysWrap>
            <S.WeekWrap>
              {weeks.map((week, weekIndex) => (
                <S.Week key={weekIndex}>
                  {week.map((day, dayIndex) => {
                    const emotion = Emotionmatch(day);
                    return (
                      <S.DayWrap
                        key={dayIndex}
                        className={`day ${day.getDay() === 0 || day.getDay() === 6 ? "weekend" : ""} ${
                          selectedDate === day.toDateString() ? "selected" : ""
                        }`}
                        onClick={() => handleDayClick(day)}
                      >
                        <S.Day>{day.getDate()}</S.Day>
                        {emotion && <S.Icon src={emotionStc[emotion]} alt={emotion} />}
                      </S.DayWrap>
                    );
                  })}
                </S.Week>
              ))}
            </S.WeekWrap>
          </S.Calendar>
          <S.Btn src={next} alt="다음달" onClick={handleNextMonth} />
        </S.CalendarWrap>

        {visibleComponent === "emotion" && <Emotion selectedDate={selectedDate} onEmotionSubmit={() => setVisibleComponent("diary")} />}

        {visibleComponent === "diary" && <Diary selectedDate={selectedDate} setVisibleComponent={setVisibleComponent} />}
      </S.Wrap>
    </S.Background>
  );
};
export default Calendar;
