import React from "react";

export const PostCategoryList = ({
  createList,
  post,
  onClick,
  onDel,
  onEdit,
  admin,
  editShow,
  onEditSubmit,
  onEditChange,
}) => {
  return (
    <>
      {createList &&
        createList.map((li, index) => (
          <ul className='category__form' key={index}>
            <>
              <div
                data-category={li.category}
                onClick={onClick}
                className={"category__form-list"}>
                {li.category}(
                {post.filter((p) => p.category === li.category).length || 0})
                {editShow && (
                  <form className='category__edit-form' onSubmit={onEditSubmit}>
                    <input
                      data-id={li._id}
                      className='category__edit-input'
                      type='text'
                      defaultValue={li.category}
                      onChange={onEditChange}
                    />
                    <div className='category__edit-btn' onClick={onEdit}>
                      X
                    </div>
                    <button className='category__edit-btn' type='submit'>
                      O
                    </button>
                  </form>
                )}
                {admin && (
                  <span>
                    <span
                      data-id={li._id}
                      className='category__del'
                      key={index + 1}
                      onClick={onDel}>
                      X
                    </span>
                  </span>
                )}
              </div>
            </>
          </ul>
        ))}
      {admin && (
        <span className='category__edit' onClick={onEdit}>
          <span role='img' aria-label='✍'></span>
        </span>
      )}
    </>
  );
};
