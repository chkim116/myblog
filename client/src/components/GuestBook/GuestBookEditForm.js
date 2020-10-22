import React from "react";
import "./GuestBookWritingForm.scss";

export const GuestBookEditForm = ({ guest, onChange, onSubmit }) => {
  const { title, description } = guest;

  return (
    <>
      <form className='guest__form' onChange={onChange} onSubmit={onSubmit}>
        <input
          maxLength='15'
          type='text'
          name='title'
          placeholder='title'
          defaultValue={title}
        />
        <textarea
          type='text'
          name='description'
          placeholder='description'
          defaultValue={description}
        />
        <button className='form__submit' type='submit'>
          UPDATE
        </button>
      </form>
    </>
  );
};
