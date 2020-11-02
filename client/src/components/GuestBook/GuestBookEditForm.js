import React from "react";
import "./GuestBookWritingForm.scss";

<<<<<<< HEAD
export const GuestBookEditForm = ({ guest, onChange, onSubmit, user }) => {
  const { title, description, creator } = guest;
  const { id, admin } = user;

  return (
    <>
      {id === creator || admin ? (
=======
export const GuestBookEditForm = ({ user, guest, onChange, onSubmit }) => {
  const { title, description, creator } = guest;

  return (
    <>
      {user.id === creator ? (
>>>>>>> 61bc4913be17f9f89f8af44729596b36bd99ffea
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
<<<<<<< HEAD
        <div className='error__title'>작성자만 수정가능합니다.</div>
=======
        <div className='error__title'>작성자만 수정이 가능합니다.</div>
>>>>>>> 61bc4913be17f9f89f8af44729596b36bd99ffea
      )}
    </>
  );
};
