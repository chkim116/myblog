import React from "react";
import "./PostDetailForm.scss";
import { Link, useHistory } from "react-router-dom";
import { PostComment } from "./PostComment";
import { PostRecentForm } from "./PostRecentForm";

const PostDetailForm = ({
    post,
    username,
    onClick,
    onChangeComment,
    onComment,
    onDelComment,
    location,
    onViewMore,
    onViewClose,
    count,
    fakeComment,
    commentValue,
    admin,
    allPost,
}) => {
    const { title, description, _id, createDate, tags, comment } = post;
    const history = useHistory();
    return (
        <>
            <div className="post__detail" key={_id}>
                <div
                    className="back"
                    onClick={() => {
                        history.push("/post");
                    }}>
                    목록으로
                </div>
                <div className="post__btn">
                    {admin && (
                        <>
                            <span className="btn">
                                <Link to={`/edit/${_id}`}>Edit</Link>
                            </span>
                            <span className="btn" onClick={onClick}>
                                Delete
                            </span>
                        </>
                    )}
                </div>
                <div className="post__detail-title">{title}</div>
                <div className="post__detail-desc ql-snow">
                    <div
                        className="ql-editor"
                        dangerouslySetInnerHTML={{ __html: description }}></div>
                </div>

                <div className="post__detail-tags">
                    {tags.map((tg, index) => (
                        <span key={index} data-tag={tg}>
                            <Link to={`/search?tag=${tg}`}>#{tg}</Link>
                        </span>
                    ))}
                </div>
                <span className="post__detail-tags"></span>
                <div className="post__detail-date">Uploaded: {createDate}</div>
                <PostComment
                    comment={comment}
                    username={username}
                    onChangeComment={onChangeComment}
                    onComment={onComment}
                    onDelComment={onDelComment}
                    commentValue={commentValue}
                    fakeComment={fakeComment}
                />
                <PostRecentForm
                    onViewMore={onViewMore}
                    onViewClose={onViewClose}
                    allPost={allPost}
                    location={location}
                    count={count}
                />
            </div>
        </>
    );
};

export default PostDetailForm;
