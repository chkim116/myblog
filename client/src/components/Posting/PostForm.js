import React from "react";
import "./PostForm.scss";
import { Link } from "react-router-dom";
import routes from "../../routes";
import { PostPagination } from "./PostPagination";
import { Loading } from "../../Pages/Etc/Loading";

const PostForm = ({
  select,
  postObj,
  loading,
  onClick,
  handleChange,
  postLength,
  admin,
}) => {
  const { post } = postObj;
  return (
    <>
      {loading ? (
        <div className='post__wrap'>
          <div className='post'>
            <span className='btn post-btn'>
              {admin && <Link to={routes.postwriting}>Post</Link>}
            </span>
          </div>
          <div className='post__form'>
            {post.map((p) => (
              <div className='post__form-type' key={p._id}>
                {admin && (
                  <span
                    className='post__form-del'
                    onClick={onClick}
                    data-id={p._id}>
                    X
                  </span>
                )}
                <Link to={`/postdetail/${p._id}`}>
                  <h3 className='post__form-title'>
                    {p.title}
                    <small className='updated'>{p.updated}</small>
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
            ))}
          </div>
          <div className='post__form-page'>
            <PostPagination
              handleChange={handleChange}
              postLength={postLength}
              select={select}></PostPagination>
          </div>
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default PostForm;
