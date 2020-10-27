import React from "react";
import "./GuestBookForm.scss";
import { Link } from "react-router-dom";
import routes from "../../routes";
import { useSelector } from "react-redux";
const GuestBookForm = ({ guest, onClick }) => {
  const { id, admin } = useSelector((state) => state.auth);
  return (
    <>
      <div className='contents'>
        <Link to={routes.guestbooking} className='guest'>
          글 작성
        </Link>
        {guest.map((p, key) => (
          <div className='article__guest' key={key}>
            {id === p.creator || admin ? (
              <>
                <Link to={`/guestbookedit/${p._id}`}>
                  <span className='guest__edit'>EDIT</span>
                </Link>
                <span data-id={p._id} className='guest__del' onClick={onClick}>
                  DEL
                </span>
              </>
            ) : (
              <> </>
            )}
            <Link to={`/guestbookdetail/${p._id}`}>
              <span className='guest__view'>-view more</span>

              <div className='guest__title'>
                {!p.updata ? p.title : `${p.title}(수정됨)`}
              </div>
              <div className='guest__desc'>
                {p.description.split("\n").map((text, key) => {
                  return <p key={key}>{text}</p>;
                })}
              </div>
              <div className='guest__info'>
                <div>{p.createDate}</div>
                <div>{p.username || "익명"}</div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </>
  );
};

export default GuestBookForm;
