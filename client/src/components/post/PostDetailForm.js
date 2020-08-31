import React from "react";
import "./PostDetailForm.scss";

const PostDetailForm = ({ postObj, loading }) => {
  const { title, description, _id, createDate } = postObj;
  return (
    <>
      {loading ? (
        <div className="post__detail" key={_id}>
          <h2 className="post__detail-title">{title}</h2>
          <p className="post__detail-desc">
            {description.split("\n").map((text, key) => {
              return (
                <span key={key}>
                  {text}
                  <br />
                </span>
              );
            })}
          </p>
          <p className="post__detail-date">
            <small>Upload By: {createDate}</small>
          </p>
        </div>
      ) : (
        <div className="loading">Loading!</div>
      )}
    </>
  );
};

// axios get ('/postdetail/(id))
export default PostDetailForm;
