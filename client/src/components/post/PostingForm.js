import React, { useEffect, useState } from "react";
import "./PostingForm.scss";
import ReactQuill from "react-quill";

import { modules, formats } from "../../middleware";

const PostingForm = ({ onSubmit, onChange, onValue }) => {
  const [loading, setLoading] = useState("");
  useEffect(() => {
    setLoading(true);
  }, []);

  if (!loading) {
    return <div className="loading__title"> 로딩중</div>;
  }

  return (
    <>
      <form className="posting__form" onSubmit={onSubmit}>
        <input
          type="text"
          name="title"
          placeholder="title"
          onChange={onChange}
        ></input>
        <ReactQuill
          theme="snow"
          modules={modules}
          formats={formats}
          name="description"
          placeholder="description"
          onChange={onValue}
        ></ReactQuill>
        <input className="form__submit" type="submit" value="UPLOAD"></input>
      </form>
    </>
  );
};

export default PostingForm;
