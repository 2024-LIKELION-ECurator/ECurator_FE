import styled from "styled-components";

export const Background = styled.div`
  top: 0;
  left: 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
export const Wrap = styled.div`
  position: relative;
  bottom: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const CalendarWrap = styled.div`
  display: flex;
  align-items: center;
  margin-top: 50px;
`;

export const Btn = styled.img`
  cursor: pointer;
  width: 40px;
  height: 40px;
  margin: 40px;
`;

export const Calendar = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 15px;
  background-color: #ffffff;
  padding: 8px;
  box-shadow: 0 4px 4px rgb(0, 0, 0, 0.25);
`;

export const Title = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 90%;
  height: 40px;
  margin: 10px 15px;
`;

export const Left = styled.div`
  display: flex;
  width: 220px;
`;

export const Year = styled.h1`
  font-size: 25px;
  font-style: bold;
  color: #dddddd;
  margin-right: 50px;
`;

export const Month = styled.h1`
  font-size: 25px;
  font-style: bold;
  color: #000000;
`;

export const Right = styled.div`
  font-size: 25px;
  color: #000000;
  margin-right: 50px;
`;

export const DaysWrap = styled.div`
  display: flex;
  justify-content: center;
`;

export const Days = styled.ul`
  display: flex;
  padding: 0;
  margin-bottom: 7px;
  justify-content: space-evenly;
  list-style: none;
  width: 700px;
  bottom: 7px;
  li {
    width: 95px;
    margin: 0 2px;
    font-family: "Pecita";
    font-size: 15px;
    color: #c2c2c2;
    text-align: center;
  }

  li:first-child,
  li:last-child {
    color: #646464;
  }
`;

export const WeekWrap = styled.div``;

export const Week = styled.div`
  display: flex;
  margin: 4px;
`;

export const DayWrap = styled.div`
  /* width: 13%; */
  width: 95px;
  aspect-ratio: 1;
  margin: 3px;
  background-color: white;
  border: 0.5px solid #c2c2c2;
  border-radius: 10px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  /* align-items: flex-start; */
  font-size: 16px;
  font-weight: 700;
  padding: 7.5px 10px;

  &.weekend {
    background-color: #f6f6f6;
  }

  &:hover {
    background-color: #fbe7d4;
    cursor: pointer;
  }

  &.selected {
    background-color: #fbe7d4; /* 선택된 날짜 배경 */
  }
`;

export const Day = styled.div`
  width: 73px;
  height: 16px;
  text-align: left;
`;

export const Icon = styled.img`
  width: 55px;
  height: 55px;
`;
