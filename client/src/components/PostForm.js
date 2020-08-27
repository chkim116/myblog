import React from "react";
import "../assets/scss/pages/post.scss";
import { Link } from "react-router-dom";
import routes from "../routes";

const PostForm = ({ postObj }) => {
  const { post } = postObj;
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
          {post.map((p) => (
            <div className="post_form-type" key={p._id}>
              <Link to={`/postdetail/${p._id}`}>
                <h2 className="post__form-title">{p.title}</h2>
                <p className="post__form-desc">{p.description}</p>
                <p className="post__form-date">{p.createDate}</p>
              </Link>
            </div>
          ))}
          ;
        </div>
        <div className="post__form-page">페이지 넘기기</div>
      </div>
    </>
  );
};

export default PostForm;
