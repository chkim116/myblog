import React from "react";
import "./RegisterForm.scss";

const RegisterForm = ({ onChange, onSubmit }) => {
  return (
    <>
      <form className='register__form' onChange={onChange} onSubmit={onSubmit}>
        <h2 className='register__title'>회원 가입</h2>
        <input
          type='text'
          name='username'
          placeholder='아이디 또는 이름'
          min='3'
          required
        />
        <input
          type='password'
          name='password'
          required
          min='6'
          placeholder='6자리 이상의 비밀번호'
        />
        <input
          type='password'
          name='password2'
          required
          placeholder='비밀번호 확인'
        />
        <input
          type='email'
          name='email'
          placeholder='ex) xxxxxxx@xxxx.com'
          required
        />
        <button className='form__submit' type='submit'>
          가입완료
        </button>
      </form>
    </>
  );
};

export default RegisterForm;
