import React from "react";
import "./PostingForm.scss";
import ReactQuill from "react-quill";
import { modules, formats } from "../../middleware";
import { Loading } from "../../Pages/Etc/Loading";

const PostEditForm = ({ post, loading, onChange, onSubmit, onValue }) => {
  const { title, description } = post;

  return (
    <>
      {loading ? (
        <form className='posting__form' onSubmit={onSubmit} onChange={onChange}>
          <input
            type='text'
            name='title'
            defaultValue={title}
            placeholder='title'></input>
          <ReactQuill
            theme='snow'
            modules={modules}
            formats={formats}
            name='description'
            defaultValue={description}
            placeholder='description'
            onChange={onValue}></ReactQuill>
          <button className='form__submit' type='submit'>
            UPDATE
          </button>
        </form>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default PostEditForm;
