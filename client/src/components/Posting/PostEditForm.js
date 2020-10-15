import React from "react";
import "./PostingForm.scss";
import ReactQuill from "react-quill";
import { modules, formats } from "../../middleware";
import { TagBox } from "../Common/TagBox";

const PostEditForm = ({
  post,
  onChange,
  onSubmit,
  onValue,
  onTags,
  onTagsSubmit,
  tags,
  showTags,
  onTagDel,
}) => {
  const { title, description } = post;
  return (
    <>
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
      <TagBox
        onTagDel={onTagDel}
        onTags={onTags}
        onTagsSubmit={onTagsSubmit}
        tags={tags}
        showTags={showTags}
      />
    </>
  );
};

export default PostEditForm;
