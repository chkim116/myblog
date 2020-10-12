import React from "react";
import "./GuestBookForm.scss";
import { Link } from "react-router-dom";
import routes from "../../routes";

const GuestBookForm = ({ port, id, onClick }) => {
  console.log(id);
  return (
    <>
      <div className='contents'>
        <Link to={routes.guestbooking} className='guest'>
          글 작성
        </Link>
        {port.map((p, key) => (
          <>
            <div className='article__post' key={key}>
              {id === p.creator && (
                <>
                  <Link to={`/guestbookedit/${p._id}`}>
                    <span className='post__edit'>EDIT</span>
                  </Link>
                  <span
                    key={id.length}
                    data-id={p._id}
                    className='post__del'
                    onClick={onClick}>
                    DEL
                  </span>
                </>
              )}
              <Link to={`/guestbookdetail/${p._id}`}>
                <span className='post__view'>-view more</span>

                <div className='post__title'>
                  {!p.updata ? p.title : `${p.title}(수정됨)`}
                </div>
                <div className='post__desc'>
                  {p.description.split("\n").map((text, key) => {
                    return <p key={key}>{text}</p>;
                  })}
                </div>
                <div className='post__info'>
                  <div>{p.createDate}</div>
                  <div>{p.username}</div>
                </div>
              </Link>
            </div>
          </>
        ))}
      </div>
    </>
  );
};

export default GuestBookForm;
