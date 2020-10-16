import React from "react";
import "./PostForm.scss";
import { Link } from "react-router-dom";
import routes from "../../routes";
import { PostPagination } from "./PostPagination";
import { PostFormBlock } from "./PostFormBlock";

const PostForm = ({
  select,
  post,
  onClick,
  handleChange,
  postLength,
  admin,
}) => {
  return (
    <>
      <div className='post__wrap'>
        <div className='post'>
          <span className='btn post-btn'>
            {admin && <Link to={routes.postwriting}>Post</Link>}
          </span>
        </div>
        <PostFormBlock admin={admin} post={post} onClick={onClick} />
        <div className='post__form-page'>
          <PostPagination
            handleChange={handleChange}
            postLength={postLength}
            select={select}></PostPagination>
        </div>
      </div>
    </>
  );
};

export default PostForm;
