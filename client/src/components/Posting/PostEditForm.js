import React from "react";
import "./PostingForm.scss";
import ReactQuill from "react-quill";
import { modules, formats } from "../../middleware";

const PostEditForm = ({ post, loading, onChange, onSubmit, onValue }) => {
  const { title, description } = post;

  return (
    <>
      {loading ? (
        <form className="posting__form" onSubmit={onSubmit} onChange={onChange}>
          <input
            type="text"
            name="title"
            defaultValue={title}
            placeholder="title"
          ></input>
          <ReactQuill
            theme="snow"
            modules={modules}
            formats={formats}
            name="description"
            defaultValue={description}
            placeholder="description"
            onChange={onValue}
          ></ReactQuill>
          <input className="form__submit" type="submit" value="UPDATE"></input>
        </form>
      ) : (
        <div className="loading__title">디테일 수정화면으로 가는 중</div>
      )}
    </>
  );
};

export default PostEditForm;
