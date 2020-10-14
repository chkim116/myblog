import React from "react";

export const TagBox = ({ onTags, onTagsSubmit, showTags, tags, prevTag }) => {
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
        <span>
          {prevTag &&
            prevTag[0].tags.map((tag, index) => (
              <span key={index}> #{tag}</span>
            ))}
        </span>
        {showTags.map((tag, index) => (
          <span key={index}> #{tag}</span>
        ))}
      </div>
    </div>
  );
};
