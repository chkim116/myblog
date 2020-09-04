import React from "react";
import "./PostingForm.scss";

const PostEditForm = ({ post, loading, onChange, onSubmit }) => {
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
          <textarea
            type="text"
            name="description"
            defaultValue={description}
            placeholder="description"
          ></textarea>
          <input className="form__submit" type="submit" value="update"></input>
        </form>
      ) : (
        <div className="loading__title">디테일 수정화면으로 가는 중</div>
      )}
    </>
  );
};

export default PostEditForm;
