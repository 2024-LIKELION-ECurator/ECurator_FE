import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import DeleteModal from "../../components/modals/deleteModal";

const Wrapper = styled.div`
    width: 100%;
    height: 180px;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    background: #ffffff;
    border-radius: 11px;
    padding: 36px;
    box-sizing: border-box;
`;

const ContentWrapper = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: 10px 12px;
    align-items: flex-start;
    justify-content: center;
`;

const ContentWrapper2 = styled.div`
    flex: 1;
    display: flex;
    flex-direction: row;
    padding: 10px 12px;
    justify-content: right;
    align-items: flex-start;
    gap: 6px;
`;

const TitleText = styled.p`
    font-size: 25px;
    font-weight: 600;
    color: #000000;
    margin-top: 5px;
`;

const ContentText = styled.p`
    font-size: 21px;
    color: #000000;
    margin: 6px 0 3px;
`;

const DateText = styled.div`
    font-size: 21px;
    color: #575757;
    display: flex;
    gap: 5px;
`;

const EditButton = styled.div`
    font-size: 21px;
    color: #000000; /* EDIT 버튼 색상 */
    cursor: pointer;
    display: flex;
    gap: 5px;

    &:hover {
        opacity: 0.8;
    }
`;

const DeleteButton = styled.div`
    font-size: 21px;
    color: #FF0000; /* DELETE 버튼 색상 */
    cursor: pointer;
    display: flex;
    gap: 5px;

    &:hover {
        opacity: 0.8;
    }
`;

function PostListItem({ post, onClick }) {
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleDelete = () => {
        setIsModalOpen(true); // 모달 열기
    };

    const handleConfirmDelete = () => {
        const accessToken = localStorage.getItem("access_token");

        if (!accessToken) {
            alert("로그인이 필요합니다.");
            navigate("/"); // 로그인 페이지로 리디렉션
            return;
        }

        // 삭제 요청 보내기
        fetch(`/diary/delete/${post.id}/`, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${accessToken}`, // 토큰 추가
            },
        })
            .then((response) => {
                if (response.ok) {
                    alert("게시글이 삭제되었습니다.");
                    // 삭제 후 게시글 목록에서 해당 아이템 삭제
                    window.location.reload(); // 페이지 새로 고침 (새로고침 대신 상태 관리로 해결할 수도 있음)
                } else {
                    alert("삭제에 실패했습니다.");
                }
            })
            .catch((error) => {
                console.error("삭제 중 오류 발생:", error);
                alert("삭제 중 문제가 발생했습니다.");
            });
        setIsModalOpen(false); // 모달 닫기
    };

    const handleCancelDelete = () => {
        setIsModalOpen(false); // 모달 닫기
    };

    return (
        <>
            <Wrapper onClick={onClick}>
                <ContentWrapper>
                    <DateText>{post.date}</DateText>
                    <TitleText>{post.title}</TitleText>
                    <ContentText>{post.content}</ContentText>
                </ContentWrapper>
                <ContentWrapper2>
                    <EditButton
                        onClick={(e) => {
                            e.stopPropagation();
                            navigate(`/postedit/${post.id}`);
                        }}
                    >
                        수정
                    </EditButton>
                    <DeleteButton
                        onClick={(e) => {
                            e.stopPropagation();
                            handleDelete();
                        }}
                    >
                        삭제
                    </DeleteButton>
                </ContentWrapper2>
            </Wrapper>

            {isModalOpen && (
                <DeleteModal
                    onConfirm={handleConfirmDelete}
                    onCancel={handleCancelDelete}
                />
            )}
        </>
    );
}

export default PostListItem;
