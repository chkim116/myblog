import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export const PostFormBlock = ({ post, onClick }) => {
  const admin = useSelector((state) => state.auth.admin);
  const filter = useSelector((state) => state.category.filter);

  return (
    <>
      {post
        .filter((f) => (filter ? f.category === filter : f))
        .map((p, index) => (
          <div className='post__form' key={index} data-type={p.category}>
            <div className='post__form-type' key={p._id}>
              <span className='post__category'>{p.category}</span>
              {admin && (
                <>
                  <Link to={`/edit/${p._id}`}>
                    <span className='post__edit'>Edit</span>
                  </Link>
                  <span
                    className='post__form-del'
                    onClick={onClick}
                    data-id={p._id}>
                    X
                  </span>
                </>
              )}
              <Link to={`/postdetail/${p._id}`}>
                <h3 className='post__form-title'>
                  {p.title}
                  <small className='updated'>{p.updated}</small>
                  <span className='post__tags'>
                    {p.tags.map((tag, index) => (
                      <span key={index}>#{tag}</span>
                    ))}
                  </span>
                </h3>
                <div className='post__form-desc'>
                  <div
                    className='ql-editor'
                    dangerouslySetInnerHTML={{ __html: p.description }}></div>
                </div>

                <p className='post__form-date'>
                  <small>{p.createDate}</small>
                </p>
              </Link>
            </div>
          </div>
        ))}
    </>
  );
};
