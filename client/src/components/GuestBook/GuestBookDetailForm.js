import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./GuestBookDetailForm.scss";

export const GuestBookDetailForm = ({ guest, onClick }) => {
  const { title, description, createDate, creator, _id, username } = guest;
  const userId = useSelector((state) => state.auth.id);
  return (
    <>
      <div className='guest__detail' key={_id}>
        <div
          className='previous'
          onClick={() => {
            window.history.back();
          }}>
          뒤로가기
        </div>
        {userId === creator && (
          <div className='guest__btn'>
            <span className='btn'>
              <Link to={`/guestbookedit/${_id}`}>Edit</Link>
            </span>
            <span className='btn' onClick={onClick}>
              Delete
            </span>
          </div>
        )}
        <div className='guest__detail-title'>{title}</div>
        <div className='guest__detail-desc'>
          {description.split("\n").map((text, key) => {
            return <p key={key}>{text}</p>;
          })}
        </div>
        <p className='guest__detail-user'>{createDate}</p>
        <p className='guest__detail-user'>Upload By: {username || "익명"}</p>
      </div>
    </>
  );
};
