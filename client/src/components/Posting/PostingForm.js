import React, { useRef } from "react";
import "./PostingForm.scss";
import ReactQuill from "react-quill";
import { formats, modules } from "../../middleware";

const PostingForm = ({
  onSubmit,
  onChange,
  onValue,
  onTags,
  onTagsSubmit,
  tags,
  showTags,
}) => {
  const quill = useRef();
  return (
    <>
      <form className='posting__form' onSubmit={onSubmit}>
        <input
          type='text'
          name='title'
          maxLength='12'
          placeholder='title'
          onChange={onChange}></input>
        <ReactQuill
          ref={quill}
          theme='snow'
          modules={modules}
          formats={formats}
          name='description'
          placeholder='description'
          onChange={onValue}></ReactQuill>
        <button className='form__submit' type='submit'>
          UPLOAD
        </button>
      </form>
      <form className='tag__form' onChange={onTags} onSubmit={onTagsSubmit}>
        <input
          className='tag__input'
          type='text'
          placeholder='태그입력'
          name='tag'
          value={tags}
        />
        <button className='tag__input-btn' type='submit'>
          태그입력
        </button>
      </form>
      <div className='tags__text'>
        TAG :
        {showTags.map((tag, index) => (
          <span key={index}> #{tag}</span>
        ))}
      </div>
    </>
  );
};

export default PostingForm;
