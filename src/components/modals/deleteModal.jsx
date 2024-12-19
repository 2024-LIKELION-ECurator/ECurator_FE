import React from "react";
import * as S from "./styled";

export const DeleteModal = ({ onConfirm, onCancel }) => {
  return (
    <S.ModalOverlay>
      <S.ModalContent>
        <S.TextType>일기를 삭제할까요?</S.TextType>
        <S.SubText>
          삭제된 일기는 복구할 수 없습니다.
        </S.SubText>
        <S.Row>
          <S.Button onClick={onConfirm}>삭제</S.Button>
          <S.Button2 onClick={onCancel}>취소</S.Button2>
        </S.Row>
      </S.ModalContent>
    </S.ModalOverlay>
  );
};

export default DeleteModal;
