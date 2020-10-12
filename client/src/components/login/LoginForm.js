import React from "react";
import { Link } from "react-router-dom";
import "./LoginForm.scss";

const LoginForm = ({ onChange, onSubmit }) => {
  return (
    <>
      <form className='admin__form' onSubmit={onSubmit} onChange={onChange}>
        <h2>로그인</h2>
        <input type='text' name='username' placeholder='아이디' />
        <input
          type='password'
          name='password'
          min='6'
          placeholder='6자리 이상의 비밀번호'
        />
        <button className='form__submit' type='submit'>
          로그인
        </button>
        <Link to='/register'>
          <button className='form__submit' type='submit'>
            회원가입
          </button>
        </Link>
      </form>
    </>
  );
};

export default LoginForm;
