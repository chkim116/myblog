import React from "react";
import "./PostingForm.scss";

const PostingForm = ({ onSubmit, onChange, title, description }) => {
  return (
    <>
      <form className="posting__form" onSubmit={onSubmit} onChange={onChange}>
        <input
          type="text"
          name="title"
          placeholder="title"
          value={title}
        ></input>
        <textarea
          type="text"
          name="description"
          placeholder="description"
          value={description}
        ></textarea>
        <input type="file" name="image" placeholder="image "></input>
        <input className="form__submit" type="submit" value="submit"></input>
      </form>
    </>
  );
};

export default PostingForm;
