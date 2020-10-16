import React from "react";
import { Link } from "react-router-dom";

export const HomeHashtag = ({ hash, length }) => {
  const color = `#${Math.round(Math.random() * 0xffffff).toString(16)}`;
  return (
    <Link to={`/search?tag=${hash}`}>
      <div className='main__hash-tag' data-tag={hash} style={{ color }}>
        #{hash}({length})
      </div>
    </Link>
  );
};
