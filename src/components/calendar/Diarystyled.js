import styled from "styled-components";

export const DiaryWrap = styled.div`
  width: 730px;
  display: flex;
  flex-direction: column;
  margin-top: 30px;
`;

export const List = styled.div`
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: content-box;
  height: 80px;
  background-color: #ffffff;
  border-radius: 11px;
  padding: 35px;
  margin-bottom: 20px;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-content: space-around;

  p {
    font-size: 18px;
  }

  h3 {
    margin: 0;
  }
`;

export const Add = styled.div`
  width: 100px;
  height: 100px;
  display: flex;
  border-radius: 11px;
  background-color: #fbe7d4;
  align-items: center;
  justify-content: center;

  p {
    color: #bcad9f;
    font-size: 40px;
  }
`;

export const Btn = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 300px;
  bottom: 30px;

  button {
    font-size: 25px;
    width: 230px;
    height: 60px;
    border-radius: 15px;
    background-color: #ffffff;
    box-shadow: 0 4px 4px rgb(0, 0, 0, 0.25);
    border-style: none;
    cursor: pointer;
  }
`;
