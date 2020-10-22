import React from "react";
import { BiDownArrow } from "react-icons/bi";

export const PostCategoryTitle = ({
  admin,
  create,
  onCreateCategory,
  onCreate,
  onCreateSubmit,
  onCategory,
}) => {
  return (
    <>
      {admin && (
        <button
          className='category-plus'
          onClick={onCreateCategory}
          type='button'>
          {create ? "x" : "+"}
        </button>
      )}
      {create && (
        <div>
          <form
            className='category__create'
            onChange={onCreate}
            onSubmit={onCreateSubmit}>
            <input
              className='category__create-list'
              type='text'
              name='createCategory'
            />
            <button className='category__create-btn' type='submit'>
              생성
            </button>
          </form>
        </div>
      )}
      <div className='category-btn' onClick={onCategory}>
        카테고리 <BiDownArrow />
      </div>
    </>
  );
};
