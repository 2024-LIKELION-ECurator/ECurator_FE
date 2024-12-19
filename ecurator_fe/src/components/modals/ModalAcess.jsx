import React from "react";
import { Link } from "react-router-dom";
import "./ModalAcess.css";

function ModalAcess({ onClose }) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <div className="modal-content">
          <h2>로그인 후 이용가능합니다.</h2>
          <div className="button-group">
            <Link to="/login"><button className="login-button" onClick={onClose}>로그인</button></Link>
            <button className="cancel-button" onClick={onClose}>취소</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ModalAcess;
