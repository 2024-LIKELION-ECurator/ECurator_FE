import { useNavigate } from "react-router-dom";
import * as S from "./Poststyled";
import PostListComponent from "../../components/lists/PostListComponent";

const PostList = () => {
    const navigate = useNavigate();

    const handleGoBack = () => {
        navigate(-1);  // 뒤로 가기
    };

    const handleGoToCalendar = () => {
        navigate("/calendar");  // 캘린더 페이지로 이동
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
        </S.Container>
    );
};

export default PostList;
