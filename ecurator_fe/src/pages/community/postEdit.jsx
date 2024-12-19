import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as S from "./Poststyled";
import TextInput from "../../components/inputs/TextInput";
import RegisterModal from "../../components/modals/registerModal";

const PostEdit = () => {
    const navigate = useNavigate();
    const { id } = useParams(); // URL에서 게시글 ID 추출

    const [title, setTitle] = useState(""); // 제목 상태
    const [content, setContent] = useState(""); // 내용 상태
    const [isModalOpen, setIsModalOpen] = useState(false);

    // 게시글 데이터 로드
    useEffect(() => {
        const accessToken = localStorage.getItem("access_token");

        if (!accessToken) {
            alert("로그인이 필요합니다.");
            navigate("/"); // 로그인 페이지로 이동
            return;
        }

        // API 요청: 기존 게시글 데이터 가져오기
        fetch(`/diary/detail/${id}/`, { // 수정된 부분
            headers: {
                "Authorization": `Bearer ${accessToken}`,
            },
        })
            .then((response) => {
                if (response.ok) return response.json();
                throw new Error("게시글 데이터를 불러오는 데 실패했습니다.");
            })
            .then((data) => {
                setTitle(data.title);
                setContent(data.content);
            })
            .catch((error) => {
                console.error(error);
                alert("게시글을 불러오는 중 문제가 발생했습니다.");
            });
    }, [id, navigate]);
    

    // 수정 요청
    const handleUpdatePost = async () => {
        const payload = { title, content }; // 수정할 데이터
        const accessToken = localStorage.getItem("access_token");

        if (!accessToken) {
            alert("로그인이 필요합니다.");
            navigate("/login");
            return;
        }

        try {
            const response = await fetch(`/diary/update/${id}/`, { // 수정된 부분
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${accessToken}`,
                },
                body: JSON.stringify(payload),
            });

            if (response.ok) {
                alert("게시글이 수정되었습니다.");
                navigate("/community"); // 수정 성공 시 페이지 이동
            } else {
                const errorData = await response.json();
                console.error("수정 실패 응답:", errorData);
                alert("게시글 수정에 실패했습니다.");
            }
        } catch (error) {
            console.error("게시글 수정 중 오류 발생:", error);
            alert("게시글 수정 중 문제가 발생했습니다.");
        }
    };

    return (
        <S.Container>
            <S.Main>
                <S.Title>
                    <TextInput
                        height={107}
                        placeholder="제목을 입력하세요"
                        value={title} // 불러온 제목 상태
                        onChange={(event) => setTitle(event.target.value)} // 제목 상태 업데이트
                    />
                </S.Title>
                <S.Contents>
                    <TextInput
                        height={1165}
                        placeholder="내용을 입력하세요"
                        value={content} // 불러온 내용 상태
                        onChange={(event) => setContent(event.target.value)} // 내용 상태 업데이트
                    />
                </S.Contents>
            </S.Main>
            <S.BarWrite>
                <S.Button onClick={() => setIsModalOpen(true)}>수정</S.Button>
            </S.BarWrite>
            {isModalOpen && (
                <RegisterModal onConfirm={handleUpdatePost} />
            )}
        </S.Container>
    );
};

export default PostEdit;
