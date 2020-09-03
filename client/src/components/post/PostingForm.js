import React from "react";
import "./PostingForm.scss";

const PostingForm = ({ onSubmit, onChange }) => {
  return (
    <>
      <form className="posting__form" onSubmit={onSubmit} onChange={onChange}>
        <input type="text" name="title" placeholder="title"></input>
        <textarea
          type="text"
          name="description"
          placeholder="description"
        ></textarea>
        <input className="form__submit" type="submit" value="submit"></input>
      </form>
    </>
  );
};

export default PostingForm;
