import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import * as S from "./Poststyled";
import PostListComponent from "../../components/lists/PostListComponent";
import ModalAcess from "../../components/modals/ModalAcess"; 

const PostList = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);  // 모달 상태 추가

  // 로그인 상태 확인
  const accessToken = localStorage.getItem("access_token");

  // 로그인 상태가 없으면 모달 열기
  useEffect(() => {
    if (!accessToken) {
      setIsModalOpen(true);  // 로그인되지 않으면 모달을 열음
    }
  }, [accessToken]);

  const handleGoBack = () => {
    navigate(-1);  // 뒤로 가기
  };

  const handleGoToCalendar = () => {
    navigate("/calendar");  // 캘린더 페이지로 이동
  };

  // 모달 닫기 함수
  const handleCloseModal = () => {
    setIsModalOpen(false);  // 모달 닫기
  };

  return (
    <S.Container>
      <S.Main>
        <PostListComponent />
      </S.Main>
      <S.Bar>
        <div className="button-section">
          <button className="back-button" onClick={handleGoBack}>뒤로 가기</button>
          <button className="calendar-button" onClick={handleGoToCalendar}>메인홈 가기</button>
        </div>
      </S.Bar>

      {/* 로그인되지 않으면 모달을 렌더링 */}
      {isModalOpen && <ModalAcess onClose={handleCloseModal} />}
    </S.Container>
  );
};

export default PostList;
