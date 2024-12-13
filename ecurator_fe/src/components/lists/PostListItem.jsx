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
        setIsModalOpen(true);
    };

    const handleConfirmDelete = () => {
        setIsModalOpen(false);
        console.log(`Post with id ${post.id} deleted.`); // 실제 삭제 로직을 여기에 추가
    };

    const handleCancelDelete = () => {
        setIsModalOpen(false);
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
                            navigate("/");
                        }}
                    >
                        EDIT
                    </EditButton>
                    <DeleteButton
                        onClick={(e) => {
                            e.stopPropagation();
                            handleDelete();
                        }}
                    >
                        DELETE
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
