import React from "react";
import "../assets/scss/pages/post.scss";
import { Link } from "react-router-dom";
import routes from "../routes";

const PostForm = () => {
  return (
    <>
      <div className="post__wrap">
        <div className="post">
          <span>
            <small>
              <Link to={routes.postwriting}>Post</Link>
            </small>
          </span>
          <span>
            <small>
              <Link to={routes.postwriting}>Edit</Link>
            </small>
          </span>
          <span>
            <small>
              <Link to={routes.postwriting}>Del</Link>
            </small>
          </span>
        </div>
        <div className="post__form">
          <div className="post_form-type">
            <h2 className="post__form-title">제목</h2>
            <p className="post__form-desc">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever sincook a galley of type and scrambled it to make a type spec
            </p>
            <p className="post__form-date">시간</p>
          </div>
        </div>
        <div className="post__form-page">페이지 넘기기</div>
      </div>
    </>
  );
};

export default PostForm;
