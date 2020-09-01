import React from "react";
import "./RegisterForm.scss";

const RegisterForm = ({ onChange, onSubmit, message }) => {
  return (
    <>
      {message && (
        <div className="flash__message">비밀번호를 다시 확인해 주세요!</div>
      )}
      <form className="register__form" onChange={onChange} onSubmit={onSubmit}>
        <h2 className="register__title">회원 가입</h2>
        <input
          type="text"
          name="username"
          placeholder="아이디 또는 이름"
          required
        />
        <input
          type="password"
          name="password"
          required
          placeholder="6자리 이상의 비밀번호"
        />
        <input
          type="password"
          name="password2"
          required
          placeholder="비밀번호 확인"
        />
        <input
          type="email"
          name="email"
          placeholder="ex) xxxxxxx@xxxx.com"
          required
        />
        <input className="form__submit" type="submit" value="가입완료" />
      </form>
    </>
  );
};

export default RegisterForm;
