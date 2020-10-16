import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./GuestBookDetailForm.scss";

export const GuestBookDetailForm = ({ port, onClick }) => {
  const { title, description, createDate, creator, _id, username } = port;
  const userId = useSelector((state) => state.auth.id);
  return (
    <>
      <div className='port__detail' key={_id}>
        <div
          className='previous'
          onClick={() => {
            window.history.back();
          }}>
          뒤로가기
        </div>
        {userId === creator && (
          <div className='port__btn'>
            <span className='btn'>
              <Link to={`/guestbookedit/${_id}`}>Edit</Link>
            </span>
            <span className='btn' onClick={onClick}>
              Delete
            </span>
          </div>
        )}
        <div className='port__detail-title'>{title}</div>
        <div className='port__detail-desc'>
          {description.split("\n").map((text, key) => {
            return <p key={key}>{text}</p>;
          })}
        </div>
        <p className='port__detail-user'>{createDate}</p>
        <p className='port__detail-user'>Upload By: {username}</p>
      </div>
    </>
  );
};
