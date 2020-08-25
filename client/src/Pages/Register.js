import React from "react";
import "../assets/scss/register.scss";

const Register = () => {
  return (
    <>
      <form className="register__form">
        <h2 className="register__title">회원가입</h2>
        <input type="text" placeholder="아이디" />
        <input type="password" min="6" placeholder="6자리 이상의 비밀번호" />
        <input type="password" min="6" placeholder="비밀번호 확인" />
        <input type="email" placeholder="ex) xxxxxxx@xxxx.com" />
        <input className="form__submit" type="submit" value="가입완료" />
      </form>
    </>
  );
};

export default Register;
