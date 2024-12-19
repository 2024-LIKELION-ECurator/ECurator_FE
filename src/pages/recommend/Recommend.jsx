import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import happy from "../../images/stc_happy.png";
import sad from "../../images/stc_sad.png";
import surprised from "../../images/stc_surprised.png";
import loving from "../../images/stc_loving.png";
import sleepy from "../../images/stc_sleepy.png";
import nervous from "../../images/stc_nervous.png";
import pensive from "../../images/stc_pensive.png";
import relieved from "../../images/stc_relieved.png";
import joyful from "../../images/stc_joyful.png";
import ModalAcess from "../../components/modals/ModalAcess"; 
import "./Recommend.css";

function Recommend() {
  const { emotion } = useParams();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [musics, setMusics] = useState([]);
  const [movies, setMovies] = useState([]);
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  
  // 로그인 상태 체크
  const accessToken = localStorage.getItem("access_token");

  useEffect(() => {
    if (!accessToken) {
      setIsModalOpen(true); // 로그인되지 않으면 모달 열기
    }
  }, [accessToken]);

  // 감정별 데이터 가져오기
  useEffect(() => {
    const fetchEmotionData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`/emo_calendar/main/${emotion}/`, {
          headers: accessToken
            ? { Authorization: `Bearer ${accessToken}` }
            : {},
        });

        setMusics(response.data.musics || []);
        setMovies(response.data.movies || []);
        setBooks(response.data.books || []);
      } catch (error) {
        console.error("Error fetching emotion data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEmotionData();
  }, [emotion, accessToken]);

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

  const handleCloseModal = () => {
    setIsModalOpen(false); // 모달 닫기
  };

  const handleGoToCalendar = () => {
    navigate("/calendar"); // 캘린더 페이지로 이동
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
          {loading ? (
            <p>Loading...</p>
          ) : (
            <ol>
              {musics.map((music, index) => (
                <li key={index}>
                  {music.title} - {music.author}
                </li>
              ))}
            </ol>
          )}
        </div>
        <div className="category">
          <p className="category-title"><a className="moviegreen">MOVIES</a> FOR YOU</p>
          {loading ? (
            <p>Loading...</p>
          ) : (
            <ol>
              {movies.map((movie, index) => (
                <li key={index}>
                  {movie.title} - {movie.author}
                </li>
              ))}
            </ol>
          )}
        </div>
        <div className="category">
          <p className="category-title"><a className="bookblue">BOOKS</a> FOR YOU</p>
          {loading ? (
            <p>Loading...</p>
          ) : (
            <ol>
              {books.map((book, index) => (
                <li key={index}>
                  {book.title} - {book.author}
                </li>
              ))}
            </ol>
          )}
        </div>
      </div>

      <div className="button-section">
        <button className="back-button" onClick={handleGoBack}>뒤로 가기</button>
        <button className="calendar-button" onClick={handleGoToCalendar}>캘린더 가기</button>
      </div>

      {/* 모달이 열려있으면 모달을 렌더링 */}
      {isModalOpen && <ModalAcess onClose={handleCloseModal} />}
    </div>
  );
}

export default Recommend;
