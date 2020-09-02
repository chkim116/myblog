import React from "react";
import "./LoginForm.scss";

const AdminLoginForm = ({ onChange, onSubmit }) => {
  return (
    <>
      <form className="admin__form" onSubmit={onSubmit} onChange={onChange}>
        <h2>로그인</h2>
        <input type="text" name="username" placeholder="아이디" />
        <input
          type="password"
          name="password"
          min="6"
          placeholder="6자리 이상의 비밀번호"
        />
        <input className="form__submit" type="submit" value="로그인" />
      </form>
    </>
  );
};

export default AdminLoginForm;
