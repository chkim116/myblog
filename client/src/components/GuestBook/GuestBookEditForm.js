import React from "react";
import "./GuestBookWritingForm.scss";

export const GuestBookEditForm = ({ user, guest, onChange, onSubmit }) => {
  const { title, description, creator } = guest;

  return (
    <>
      {user.id === creator ? (
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
      ) : (
        <div className='error__title'>작성자만 수정이 가능합니다.</div>
      )}
    </>
  );
};
