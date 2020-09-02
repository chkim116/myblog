import React from "react";

const PostEditForm = ({ post, loading, onChange, onSubmit }) => {
  const { title, description } = post;
  return (
    <>
      {loading ? (
        <form className="posting__form" onSubmit={onSubmit} onChange={onChange}>
          <input
            type="text"
            name="title"
            placeholder="title"
            defaultValue={title}
          ></input>
          <textarea
            type="text"
            name="description"
            placeholder="description"
            defaultValue={description}
          ></textarea>
          <input type="file" name="image" placeholder="image "></input>
          <input className="form__submit" type="submit" value="update"></input>
        </form>
      ) : (
        <div className="loading__title">디테일 수정화면으로 가는 중</div>
      )}
    </>
  );
};

export default PostEditForm;
