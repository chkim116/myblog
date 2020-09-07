import React from "react";
import "./PostForm.scss";
import { Link } from "react-router-dom";
import routes from "../../routes";
import { PostPagination } from "../post/PostPagination";

const PostForm = ({
  select,
  postObj,
  loading,
  onClick,
  handleChange,
  postLength,
}) => {
  const { post } = postObj;
  return (
    <>
      {loading ? (
        <div className="post__wrap">
          <div className="post">
            <span className="btn post-btn" onClick={onClick}>
              <Link to={routes.postwriting}>Post</Link>
            </span>
          </div>
          <div className="post__form">
            {post.map((p) => (
              <div className="post__form-type" key={p._id}>
                <Link to={`/postdetail/${p._id}`}>
                  <h3 className="post__form-title">
                    {p.title}
                    <small className="updated">{p.updated}</small>
                  </h3>
                  <p
                    className="post__form-desc"
                    dangerouslySetInnerHTML={{ __html: p.description }}
                  >
                    {/* {p.description.length > 300
                      ? p.description.slice(0, 150).concat("  ...더보기")
                      : p.description} */}
                  </p>
                  <p className="post__form-date">
                    <small>{p.createDate}</small>
                  </p>
                </Link>
              </div>
            ))}
          </div>
          <div className="post__form-page">
            <PostPagination
              handleChange={handleChange}
              postLength={postLength}
              select={select}
            ></PostPagination>
          </div>
        </div>
      ) : (
        <h1 className="loading__title">글을 불러오는 중입니다.</h1>
      )}
    </>
  );
};

export default PostForm;
