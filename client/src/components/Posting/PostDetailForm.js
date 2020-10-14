import React from "react";
import "./PostDetailForm.scss";
import { Link } from "react-router-dom";
import { Loading } from "../../Pages/Etc/Loading";

const PostDetailForm = ({ postObj, loading, onClick, admin }) => {
  const { title, description, _id, createDate, tags } = postObj;
  if (!loading) {
    return <Loading />;
  }
  const tag = tags[0].tags;
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
          {admin && (
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

        <span className='post__detail-tags'>
          {tag.map((tg, index) => (
            <span key={index}> #{tg}</span>
          ))}
        </span>
        <span className='post__detail-tags'></span>
        <p className='post__detail-date'>
          <small>Uploaded: {createDate}</small>
        </p>
      </div>
    </>
  );
};

export default PostDetailForm;
