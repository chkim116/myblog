import React from "react";
import "./GuestBookForm.scss";
import { Link } from "react-router-dom";
import routes from "../../routes";

const GuestBookForm = ({ port }) => {
  return (
    <>
      <Link to={routes.guestbooking} className='post'>
        글 작성
      </Link>
      <div className='contents'>
        {port.map((p, key) => (
          <div className='article__post' key={key}>
            <Link to={`/guestbookdetail/${p._id}`}>
              <div className='post__title'>{p.title}</div>
              <p className='post__desc'>{p.description}</p>
              <div className='post__info'>
                <div>{p.createDate}</div>
                <small>{p.username}</small>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </>
  );
};

export default GuestBookForm;
