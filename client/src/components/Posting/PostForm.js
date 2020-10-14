import React from "react";
import "./PostForm.scss";
import { Link } from "react-router-dom";
import routes from "../../routes";
import { PostPagination } from "./PostPagination";
import { Loading } from "../../Pages/Etc/Loading";

const PostForm = ({
  select,
  post,
  loading,
  onClick,
  handleChange,
  postLength,
  admin,
}) => {
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
                      {p.tags[0].tags.map((tag, index) => (
                        <span key={index}> #{tag}</span>
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
