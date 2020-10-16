import React from "react";

import "./SearchingBar.scss";

export const SearchingBar = ({ onSearch }) => {
  return (
    <div className='searchingbar'>
      <form className='searchingbar__form' onChange={onSearch}>
        <select className='searchingbar-select' name='select'>
          <option value='all'>전체</option>
          <option value='title'>제목</option>
          <option value='desc'>본문</option>
          <option value='tag'>태그</option>
        </select>
        <input
          name='text'
          className='searchingbar-input'
          type='text'
          placeholder='검색어를 입력하세요'
        />
        <button className='searchingbar-btn' type='submit'>
          검색
        </button>
      </form>
    </div>
  );
};
