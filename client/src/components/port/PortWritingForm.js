import React from "react";
import "./PortWritingForm.scss";
import ReactQuill from "react-quill";
import { modules, formats } from "../../middleware";

export const PortWritingForm = ({ onSubmit, onChange, onValue }) => {
  return (
    <>
      <form className="port__form" onChange={onChange} onSubmit={onSubmit}>
        <input type="date" name="createDate"></input>
        <input type="text" name="title" placeholder="title"></input>
        <ReactQuill
          theme="snow"
          modules={modules}
          formats={formats}
          name="description"
          placeholder="description"
          onChange={onValue}
        ></ReactQuill>
        <input type="file" name="imgUrl" placeholder="image "></input>
        <input
          className="tags"
          type="text"
          name="category"
          placeholder="태그"
        ></input>
        <input className="form__submit" type="submit" value="UPLOAD"></input>
      </form>
    </>
  );
};
