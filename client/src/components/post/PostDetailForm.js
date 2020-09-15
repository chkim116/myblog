import React from "react";
import "./PostDetailForm.scss";
import { Link } from "react-router-dom";

const PostDetailForm = ({ postObj, loading, onClick, userId }) => {
  const { title, description, _id, createDate, creator } = postObj;
  if (!loading) {
    return <div className="loading__title">글 화면으로 가는 중</div>;
  }

  return (
    <>
      <div className="post__detail" key={_id}>
        <div
          className="previous"
          onClick={() => {
            window.history.back();
          }}
        >
          뒤로가기
        </div>

        <div className="post__btn">
          {userId === creator && (
            <>
              <span className="btn">
                <Link to={`/edit/${_id}`}>Edit</Link>
              </span>
              <span className="btn" onClick={onClick}>
                Delete
              </span>
            </>
          )}
        </div>
        <h2 className="post__detail-title">{title}</h2>
        <div className="post__detail-desc">
          <div
            className="ql-editor"
            dangerouslySetInnerHTML={{ __html: description }}
          ></div>
          {/* {description.split("\n").map((text, key) => {
            return (
              <span key={key}>
                {text}
                <br />
              </span>
            );
          })} */}
        </div>
        <p className="post__detail-date">
          <small>Uploaded: {createDate}</small>
        </p>
      </div>
    </>
  );
};

// axios get ('/postdetail/(id))
export default PostDetailForm;
