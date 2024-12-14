import { useNavigate } from "react-router-dom";
import * as S from "./Calendarstyled";
import { useState } from "react";
import prev from "../../images/prev_month.png";
import next from "../../images/next_month.png";

import Emotion from "../../components/calendar/Emotion";
import Diary from "../../components/calendar/Diary";

const Calendar = () => {
  const navigate = useNavigate();

  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null); // 선택된 날짜 상태 추가
  const [dateStates, setDateStates] = useState({}); // 날짜별 상태 관리

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

  // const handleDayClick = (day) => {
  //   setSelectedDate(day.toDateString()); // 선택된 날짜를 상태에 저장
  // };

  const handleDayClick = (day) => {
    const dateKey = day.toDateString(); // 날짜를 문자열로 변환하여 키로 사용
    const currentState = dateStates[dateKey] || "none"; // 현재 상태 가져오기

    let nextState = "none";
    if (currentState === "none") {
      nextState = "emotion";
    } else if (currentState === "emotion") {
      nextState = "diary";
    }

    setDateStates((prevStates) => ({
      ...prevStates,
      [dateKey]: nextState, // 클릭한 날짜의 상태 업데이트
    }));

    setSelectedDate(dateKey); // 선택된 날짜를 상태에 저장
  };

  return (
    <S.Background>
      <S.CalendarWrap>
        <img src={prev} alt="이전달" onClick={handlePrevMonth} />
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
                {week.map((day, dayIndex) => (
                  <S.Day
                    key={dayIndex}
                    className={`day ${day.getDay() === 0 || day.getDay() === 6 ? "weekend" : ""} ${
                      selectedDate === day.toDateString() ? "selected" : ""
                    }`}
                    onClick={() => handleDayClick(day)} //원래 onClick 안에 - setSelectedDate(day.toDateString())
                  >
                    {day.getDate()}
                  </S.Day>
                ))}
              </S.Week>
            ))}
          </S.WeekWrap>
        </S.Calendar>
        <img src={next} alt="다음달" onClick={handleNextMonth} />
      </S.CalendarWrap>
      <Emotion />
      {/* <Diary /> */}
    </S.Background>
  );
};

export default Calendar;
