import React from "react";
import "./PostComment.scss";

export const PostComment = ({
  comment,
  onChangeComment,
  onComment,
  onDelComment,
  fakeComment,
  commentValue,
  username,
}) => {
  return (
    <div className='wrap__comments'>
      {comment ? (
        <>
          <div className='comment-length'>
            Comments {comment.length + fakeComment.length}개
          </div>
          {comment.map((cm, index) => (
            <div key={index}>
              <div className='post__box-name'>{cm.creator}</div>
              <div className='post__box'>
                <div className='post__box-comments'>{cm.comment}</div>
                {username === cm.creator && (
                  <span
                    onClick={onDelComment}
                    className='post__box-del'
                    data-id={cm._id}>
                    삭제
                  </span>
                )}
              </div>
              <div className='post__box-date'>{cm.createDate}</div>
            </div>
          ))}
          {fakeComment &&
            fakeComment.map((cm, index) => (
              <div key={index}>
                <div className='post__box-name'>{cm.creator}</div>
                <div className='post__box'>
                  <div className='post__box-comments'>{cm.comment}</div>
                  {username === cm.creator && (
                    <span
                      onClick={onDelComment}
                      className='post__box-del'
                      data-id={cm._id}>
                      삭제
                    </span>
                  )}
                </div>
                <div className='post__box-date'>{cm.createDate}</div>
              </div>
            ))}
        </>
      ) : (
        <> </>
      )}
      <form className='post__comments' autoComplete='off' onSubmit={onComment}>
        <input
          onChange={onChangeComment}
          className='post__comments-input'
          name='comment'
          type='text'
          placeholder='코멘트를 입력하세요 . . .'
          value={commentValue.comment}
        />
        <button className='post__comments-btn' type='submit'>
          확인
        </button>
      </form>
    </div>
  );
};
