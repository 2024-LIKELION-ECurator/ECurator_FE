import "./Diary.css";
import { useNavigate } from "react-router-dom";

function Diary() {
  const navigate = useNavigate();

  return (
    <div className="diaryWrap">
      <div
        onClick={() => {
          navigate("/postwrite");
        }}
        className="diary"
      >
        <div className="content">
          <p>2024년 12월 12일</p>
          <h3>제목</h3>
          <p>내용</p>
        </div>
        <div className="add">
          <p>+</p>
        </div>
      </div>

      <div className="btn">
        <button
          onClick={() => {
            navigate("/");
          }}
        >
          뒤로 가기
        </button>
        <button
          onClick={() => {
            navigate("/community");
          }}
        >
          다이어리 가기
        </button>
      </div>
    </div>
  );
}

export default Diary;
