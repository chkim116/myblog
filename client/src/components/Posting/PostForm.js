import React from "react";
import "./PostForm.scss";
import { Link } from "react-router-dom";
import routes from "../../routes";
import { PostPagination } from "./PostPagination";
import { PostFormBlock } from "./PostFormBlock";
import { PostCategory } from "./PostCategory";

const PostForm = ({
  select,
  onClick,
  handleChange,
  history,
  filterPost,
  filter,
  filteringPost,
  location,
  admin,
  post,
}) => {
  return (
    <>
      <div className='post__wrap'>
        <PostCategory history={history} location={location} />
        <div className='post'>
          <span className='btn post-btn'>
            {admin && <Link to={routes.postwriting}>Post</Link>}
          </span>
        </div>
        <PostFormBlock
          filterPost={filterPost}
          onClick={onClick}
          admin={admin}
        />
        <div className='post__form-page'>
          <PostPagination
            filter={filter}
            post={post}
            filteringPost={filteringPost}
            handleChange={handleChange}
            select={select}></PostPagination>
        </div>
      </div>
    </>
  );
};

export default PostForm;
