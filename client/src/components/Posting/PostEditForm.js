import React from "react";
import "./PostingForm.scss";
import { TagBox } from "./TagBox";
import { useSelector } from "react-redux";
import { ReactQuillForm } from "./ReactQuillForm";

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
  selectCategory,
  onSelect,
}) => {
  const { title, description } = post;

  const selectList = useSelector((state) => state.category.data);
  return (
    <>
      <form className='posting__form' onSubmit={onSubmit} onChange={onChange}>
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
            defaultValue={title}
            name='title'
            placeholder='title'
            onChange={onChange}></input>
        </div>
        <ReactQuillForm
          description={description}
          onValue={onValue}></ReactQuillForm>
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
