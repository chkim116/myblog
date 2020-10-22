import React from "react";
import "./PostingForm.scss";
import ReactQuill from "react-quill";
import { formats, modules } from "../../middleware";
import { TagBox } from "./TagBox";
import { useSelector } from "react-redux";

const PostingForm = ({
  onTagDel,
  onSubmit,
  onChange,
  onValue,
  onTags,
  onTagsSubmit,
  tags,
  showTags,
  selectCategory,
  onSelect,
}) => {
  const selectList = useSelector((state) => state.category.data);
  return (
    <>
      <form className='posting__form' onSubmit={onSubmit}>
        <div className='posting__form-title'>
          <select value={selectCategory} onChange={onSelect}>
            <option value='none'>선택</option>
            {selectList &&
              selectList.map((list, index) => (
                <option key={index} value={list.category}>
                  {list.category}
                </option>
              ))}
          </select>
          <input
            type='text'
            name='title'
            placeholder='title'
            onChange={onChange}></input>
        </div>
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
