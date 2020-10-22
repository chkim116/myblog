import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export const PostFormBlock = ({ onClick, post, loading }) => {
  const admin = useSelector((state) => state.auth.admin);
  const filterPost = useSelector((state) => state.category.post);

  // loading은 검색했을 때 생기는 loading
  return (
    <>
      {!loading ? (
        filterPost.length > 0 ? (
          filterPost.map((p, index) => (
            <div className='post__form' key={index} data-type={p.category}>
              <div className='post__form-type' key={p._id}>
                <div className='post__category'>{p.category}</div>
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
                  <div className='post__form-title'>
                    {p.title}
                    <small className='updated'>{p.updated}</small>
                    <span className='post__tags'>
                      {p.tags.map((tag, index) => (
                        <span key={index}>#{tag}</span>
                      ))}
                    </span>
                  </div>
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
          ))
        ) : (
          <div className='post__form-empty'>아직 게시글이 없습니다</div>
        )
      ) : (
        post.map((p, index) => (
          <div className='post__form' key={index} data-type={p.category}>
            <div className='post__form-type' key={p._id}>
              <div className='post__category'>{p.category}</div>
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
                <div className='post__form-title'>
                  {p.title}
                  <small className='updated'>{p.updated}</small>
                  <span className='post__tags'>
                    {p.tags.map((tag, index) => (
                      <span key={index}>#{tag}</span>
                    ))}
                  </span>
                </div>
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
        ))
      )}
    </>
  );
};
