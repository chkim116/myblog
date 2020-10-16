import React, { useEffect } from "react";
import { PostFormBlock } from "../Posting/PostFormBlock";
import "./SearchingForm.scss";

export const SearchingForm = ({ searchTags, search }) => {
  return (
    <div>
      <h2 className='searching__title'>검색 태그는 {search.split("=")[1]}</h2>
      <PostFormBlock post={searchTags} />
    </div>
  );
};
