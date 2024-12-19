import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    min-height: 100vh;
`;

export const Main = styled.div`
    width:60%;
`;

export const Bar = styled.div`
    display: flex;
    flex-direction: row;
    margin-top: 100px;
    justify-content: space-around;
    width:53%;
`;

export const EmptyMessage = styled.div`
    width:60%;
`;

export const Button = styled.div`
    display: flex;
    width: 263px;
    height: 72px;
    padding: 0;
    align-items: center;
    justify-content: center; /* 텍스트를 수평 가운데 정렬 */
    cursor: pointer;
    background-color: #FFFFFF;
    border-radius: 15px;
    font-size: 35px;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25); 
    margin-bottom: 116px;
`;

//postwrite
export const Title = styled.div`
    margin-top: 52px;
`;

export const TextInput = styled.div`
`;

export const Contents = styled.div`
    margin-top: 30px;
`;

export const BarWrite = styled.div`
    display: flex;
    flex-direction: row;
    margin-top: 100px;
    justify-content: right;
    width:60%;
`;
