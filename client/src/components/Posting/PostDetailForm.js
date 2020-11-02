import React from "react";
import "./PostDetailForm.scss";
import { Link } from "react-router-dom";
import { PostComment } from "./PostComment";
import { PostRecentForm } from "./PostRecentForm";

const PostDetailForm = ({
  post,
  username,
  onClick,
  onChangeComment,
  onComment,
  onDelComment,
  location,
  onViewMore,
  onViewClose,
  count,
  fakeComment,
  commentValue,
  admin,
  allPost,
}) => {
  const { title, description, _id, createDate, tags, comment } = post;

  return (
    <>
      <PostRecentForm
        onViewMore={onViewMore}
        onViewClose={onViewClose}
        allPost={allPost}
        location={location}
        count={count}
      />
      <div className='post__detail' key={_id}>
        <div
          className='back'
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
        <div className='post__detail-title'>{title}</div>
        <div className='post__detail-desc ql-snow'>
          <div
            className='ql-editor'
            dangerouslySetInnerHTML={{ __html: description }}></div>
        </div>

        <div className='post__detail-tags'>
          {tags.map((tg, index) => (
            <span key={index} data-tag={tg}>
              #{tg}
            </span>
          ))}
        </div>
        <span className='post__detail-tags'></span>
        <div className='post__detail-date'>Uploaded: {createDate}</div>
        <PostComment
          comment={comment}
          username={username}
          onChangeComment={onChangeComment}
          onComment={onComment}
          onDelComment={onDelComment}
          commentValue={commentValue}
          fakeComment={fakeComment}
        />
      </div>
    </>
  );
};

export default PostDetailForm;
