import React from "react";
import { Link } from "react-router-dom";
import "./PostRecentForm.scss";

export const PostRecentForm = ({
  recentPost,
  location,
  onViewMore,
  onViewClose,
  count,
}) => {
  const path = location.pathname.split("/")[2];

  return (
    <div className='post__nav-wrap'>
      <div className='recent__post'>최근 글</div>
      {recentPost &&
        recentPost.slice(count[0], count[1]).map((p, index) => (
          <div className='post__nav' key={index}>
            <Link className='post__nav-link' to={`/postdetail/${p._id}`}>
              <div
                className={
                  path === p._id ? "post__nav-title active" : "post__nav-title"
                }>
                {p.title}
              </div>
              <div className='post__nav-desc'>{p.category}</div>
            </Link>
          </div>
        ))}
      <div className='recent__click-btn'>
        <span onClick={onViewClose}>이전 </span>
        <span onClick={onViewMore}>다음 </span>
      </div>
    </div>
  );
};
