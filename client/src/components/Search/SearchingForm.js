import React from "react";
import { PostFormBlock } from "../Posting/PostFormBlock";
import "./SearchingForm.scss";

export const SearchingForm = ({ searchTags, search, loading }) => {
  const uri = search.split("=")[2];
  return (
    <div>
      <div className='searching__title'>
        <h4>
          검색어:
          {!uri
            ? `#${decodeURI(search.split("=")[1])}`
            : decodeURI(search.split("=")[2])}
        </h4>
        <p>검색 결과 {searchTags.length}개의 게시물이 발견 되었습니다.</p>
      </div>

      <PostFormBlock post={searchTags} loading={loading} />
    </div>
  );
};
