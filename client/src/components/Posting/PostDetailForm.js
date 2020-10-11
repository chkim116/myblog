import React from "react";
import "./PostDetailForm.scss";
import { Link } from "react-router-dom";
import { Loading } from "../../Pages/Etc/Loading";

const PostDetailForm = ({ postObj, loading, onClick, userId }) => {
  const { title, description, _id, createDate, creator } = postObj;
  if (!loading) {
    return <Loading />;
  }

  return (
    <>
      <div className='post__detail' key={_id}>
        <div
          className='previous'
          onClick={() => {
            window.history.back();
          }}>
          뒤로가기
        </div>

        <div className='post__btn'>
          {userId === creator && (
            <>
              <span className='btn'>
                <Link to={`/edit/${_id}`}>Edit</Link>
              </span>
              <span className='btn' onClick={onClick}>
                Delete
              </span>
            </>
          )}
        </div>
        <h2 className='post__detail-title'>{title}</h2>
        <div className='post__detail-desc'>
          <div
            className='ql-editor'
            dangerouslySetInnerHTML={{ __html: description }}></div>
        </div>
        <p className='post__detail-date'>
          <small>Uploaded: {createDate}</small>
        </p>
      </div>
    </>
  );
};

export default PostDetailForm;
