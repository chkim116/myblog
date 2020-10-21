import React from "react";
import "./PostForm.scss";
import { Link } from "react-router-dom";
import routes from "../../routes";
import { PostPagination } from "./PostPagination";
import { PostFormBlock } from "./PostFormBlock";
import { useSelector } from "react-redux";
import { PostCategory } from "./PostCategory";

const PostForm = ({ select, onClick, handleChange, history }) => {
  const admin = useSelector((state) => state.auth.admin);

  return (
    <>
      <div className='post__wrap'>
        <PostCategory history={history} />
        <div className='post'>
          <span className='btn post-btn'>
            {admin && <Link to={routes.postwriting}>Post</Link>}
          </span>
        </div>
        <PostFormBlock onClick={onClick} />
        <div className='post__form-page'>
          <PostPagination
            handleChange={handleChange}
            select={select}></PostPagination>
        </div>
      </div>
    </>
  );
};

export default PostForm;
