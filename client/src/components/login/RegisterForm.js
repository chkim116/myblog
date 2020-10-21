import React from "react";
import "./RegisterForm.scss";

const RegisterForm = ({ onChange, onSubmit }) => {
  return (
    <>
      <form className='register__form' onChange={onChange} onSubmit={onSubmit}>
        <h2 className='register__title'>Sign Up</h2>
        <input
          type='text'
          name='username'
          placeholder='5자리 이상'
          min='5'
          required
        />
        <input
          type='password'
          name='password'
          required
          min='6'
          placeholder='영어와 숫자를 포함한 6자리 이상 비밀번호'
        />
        <input
          type='password'
          name='password2'
          required
          placeholder='비밀번호 확인'
        />
        <input type='email' name='email' placeholder='ex) email' required />
        <button className='form__submit' type='submit'>
          Submit
        </button>
      </form>
    </>
  );
};

export default RegisterForm;
