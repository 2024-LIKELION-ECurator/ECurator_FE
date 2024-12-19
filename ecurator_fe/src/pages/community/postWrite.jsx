import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as S from "./Poststyled";
import TextInput from "../../components/inputs/TextInput";
import RegisterModal from "../../components/modals/registerModal";

const PostWrite = () => {
    const navigate = useNavigate();

    const [title, setTitle] = useState(""); // 제목 상태
    const [content, setContent] = useState(""); // 내용 상태
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openRegisterModal = () => setIsModalOpen(true);

    // 게시글 등록 핸들러
    const handleRegisterModal = async () => {
        const payload = { title, content }; // 서버로 보낼 데이터
        const accessToken = localStorage.getItem("access_token");

        if (!accessToken) {
            alert("로그인이 필요합니다.");
            navigate("/"); // 로그인 페이지로 리디렉션
            return;
        }

        try {
            const response = await fetch("/diary/create/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${accessToken}`, // 토큰 추가
                },
                body: JSON.stringify(payload), // 데이터를 JSON 문자열로 변환
            });

            if (response.ok) {
                alert("일기가 등록되었습니다.");
                navigate("/community"); // 등록 성공 시 페이지 이동
            } else {
                const errorData = await response.json();
                console.error("등록 실패 응답:", errorData);
                alert("일기 등록에 실패했습니다.");
            }
        } catch (error) {
            console.error("일기 등록 중 오류 발생:", error);
            alert("일기 등록 중 문제가 발생했습니다.");
        }
    };

    return (
        <S.Container>
            <S.Main>
                <S.Title>
                    <TextInput
                        height={107}
                        placeholder="제목을 입력하세요"
                        onChange={(event) => setTitle(event.target.value)} // 제목 상태 업데이트
                    />
                </S.Title>
                <S.Contents>
                    <TextInput
                        height={1165}
                        placeholder="내용을 입력하세요"
                        onChange={(event) => setContent(event.target.value)} // 내용 상태 업데이트
                    />
                </S.Contents>
            </S.Main>
            <S.BarWrite>
                <S.Button onClick={openRegisterModal}>등록</S.Button>
            </S.BarWrite>
            {isModalOpen && (
                <RegisterModal onConfirm={handleRegisterModal} />
            )}
        </S.Container>
    );
};

export default PostWrite;
