import React from "react";
import "./PostingForm.scss";
import ReactQuill from "react-quill";
import { formats, modules } from "../../middleware";
import { TagBox } from "../Common/TagBox";

const PostingForm = ({
  onTagDel,
  onSubmit,
  onChange,
  onValue,
  onTags,
  onTagsSubmit,
  tags,
  showTags,
}) => {
  return (
    <>
      <form className='posting__form' onSubmit={onSubmit}>
        <input
          type='text'
          name='title'
          placeholder='title'
          onChange={onChange}></input>
        <ReactQuill
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
      <TagBox
        onTags={onTags}
        onTagDel={onTagDel}
        onTagsSubmit={onTagsSubmit}
        tags={tags}
        showTags={showTags}
      />
    </>
  );
};

export default PostingForm;
