import React from "react";
import "./TagBox.scss";

export const TagBox = ({ onTags, onTagsSubmit, showTags, tags, onTagDel }) => {
  return (
    <div>
      <form className='tag__form' onSubmit={onTagsSubmit}>
        <input
          className='tag__input'
          type='text'
          placeholder='태그입력'
          name='tag'
          onChange={onTags}
          value={tags}
        />

        <button className='tag__input-btn' type='submit'>
          태그입력
        </button>
      </form>
      <div className='tags__text'>
        TAG :
        {showTags.map((tag, index) => (
          <span key={index}>
            <span>#{tag}</span>
            <button data-tag={tag} type='button' onClick={onTagDel}>
              X
            </button>
          </span>
        ))}
      </div>
    </div>
  );
};
