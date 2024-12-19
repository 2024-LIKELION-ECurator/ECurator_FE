import React from "react";
import * as S from "./styled";

export const registerModal = ({ onConfirm }) => {
    return (
        <S.ModalOverlay>
        <S.ModalContent2>
            <S.TextType2>일기가 등록되었습니다.</S.TextType2>
            <S.Row2>
            <S.Button onClick={onConfirm}>확인</S.Button>
            </S.Row2>
        </S.ModalContent2>
        </S.ModalOverlay>
    )
}

export default registerModal;