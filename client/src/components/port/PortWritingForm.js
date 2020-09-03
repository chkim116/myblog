import React from "react";
import "./PortWritingForm.scss";
export const PortWritingForm = ({ onSubmit, onChange }) => {
  return (
    <>
      <form className="port__form" onChange={onChange} onSubmit={onSubmit}>
        <input type="date" name="createDate"></input>
        <input type="text" name="title" placeholder="title"></input>
        <textarea
          type="text"
          name="description"
          placeholder="description"
        ></textarea>
        <input type="file" name="imgUrl" placeholder="image "></input>
        <input
          className="tags"
          type="text"
          name="category"
          placeholder="태그"
        ></input>
        <input className="form__submit" type="submit" value="submit"></input>
      </form>
    </>
  );
};
