import React from "react";
import "./AdminLoginForm.scss";

const AdminLoginForm = () => {
  return (
    <>
      <form className="admin__form">
        <h2>관리자 로그인</h2>
        <input type="text" placeholder="아이디" />
        <input type="password" min="6" placeholder="6자리 이상의 비밀번호" />
        <input className="form__submit" type="submit" value="로그인" />
      </form>
    </>
  );
};

export default AdminLoginForm;
