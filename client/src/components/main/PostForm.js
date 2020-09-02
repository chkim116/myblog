import React from "react";
import "./PostForm.scss";
import { Link } from "react-router-dom";
import routes from "../../routes";

const PostForm = ({ postObj, loading, onClick }) => {
  const { post } = postObj;
  if (loading) {
    return <h1 className="just__loading">로디잉</h1>;
  }

  return (
    <>
      <div className="post__wrap">
        <div className="post">
          <span className="btn post-btn" onClick={onClick}>
            <Link to={routes.postwriting}>Post</Link>
          </span>
          <span className="btn edit-btn">
            <Link to={routes.postwriting}>Edit</Link>
          </span>
          <span className="btn del-btn">
            <Link to={routes.postwriting}>Del</Link>
          </span>
        </div>
        <div className="post__form">
          {post.map((p) => (
            <div className="post_form-type" key={p._id}>
              <Link to={`/postdetail/${p._id}`}>
                <h2 className="post__form-title">{p.title}</h2>
                <p className="post__form-desc">
                  {p.description.length > 300
                    ? p.description.slice(0, 150).concat("  ...더보기")
                    : p.description}
                </p>
                <p className="post__form-date">
                  <small>{p.createDate}</small>
                </p>
              </Link>
            </div>
          ))}
        </div>
        <div className="post__form-page">페이지 넘기기</div>
      </div>
    </>
  );
};

export default PostForm;
