import React from "react";
import { PostFormBlock } from "../Posting/PostFormBlock";
import "./SearchingForm.scss";

export const SearchingForm = ({ searchTags, search }) => {
  const uri = search.split("=")[2];
  return (
    <div>
      <h4 className='searching__title'>
        {!uri
          ? `#${decodeURI(search.split("=")[1])}`
          : decodeURI(search.split("=")[2])}
      </h4>
      <PostFormBlock post={searchTags} />
    </div>
  );
};
