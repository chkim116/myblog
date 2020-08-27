import React from "react";
import "../assets/scss/pages/postdetail.scss";

const PostDetailForm = ({ postObj }) => {
  const { title, description, _id, createDate } = postObj;
  return (
    <>
      {postObj ? (
        <div className="post__detail" key={_id}>
          <h2 className="post__detail-title">{title}</h2>
          <p className="post__detail-desc">{description}</p>
          <p className="post__detail-date">
            <small>Upload By: {createDate}</small>
          </p>
        </div>
      ) : (
        <div>Not Found</div>
      )}
    </>
  );
};

// axios get ('/postdetail/(id))
export default PostDetailForm;
