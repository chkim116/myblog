import React from "react";
import "./GuestBookWritingForm.scss";

export const GuestBookWritingForm = ({ onSubmit, onChange }) => {
  return (
    <>
      <form className='port__form' onChange={onChange} onSubmit={onSubmit}>
        <input
          maxLength='15'
          type='text'
          name='title'
          placeholder='title'></input>
        <textarea type='text' name='description' placeholder='description' />
        <button className='form__submit' type='submit'>
          UPLOAD
        </button>
      </form>
    </>
  );
};
