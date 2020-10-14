import React from "react";
import "./PostingForm.scss";
import ReactQuill from "react-quill";
import { modules, formats } from "../../middleware";
import { TagBox } from "../lib/TagBox";

const PostEditForm = ({
  post,
  onChange,
  onSubmit,
  onValue,
  onTags,
  onTagsSubmit,
  tags,
  showTags,
}) => {
  const { title, description, tags: prevTag } = post;
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
        onTags={onTags}
        onTagsSubmit={onTagsSubmit}
        tags={tags}
        prevTag={prevTag}
        showTags={showTags}
      />
    </>
  );
};

export default PostEditForm;
