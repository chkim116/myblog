import React from "react";
import { HomeHashtag } from "./HomeHashtag";
import "./HomeForm.scss";
import { Link } from "react-router-dom";

const HomeForm = ({ tagList, post }) => {
    return (
        <>
            <div className="recent">
                <div className="recent-post">최근 게시글</div>
                <Link to="/post" className="recent-btn">
                    view more
                </Link>
            </div>
            <div className="wrap__post">
                {post.map((p, index) => (
                    <div className="main__post" key={index}>
                        <Link to={`/postdetail/${p._id}`}>
                            <div className="main__post-title">{p.title}</div>
                            <div className="main__post-desc ql-snow">
                                <div
                                    className="ql-editor"
                                    dangerouslySetInnerHTML={{
                                        __html: p.description,
                                    }}></div>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
            <main className="main">
                <div className="main__hash">
                    <div className="main__hash-title">Keyword Tags</div>
                    <div className="main__hash-box">
                        {tagList.map((t, index) => (
                            <HomeHashtag
                                key={index}
                                hash={t[0]}
                                length={t[1]}
                            />
                        ))}
                    </div>
                </div>

                <div className="main__hello">
                    <div className="main__hash-title">Welcome to My Blog!</div>
                    <div className="main__btn">
                        <Link to="/post">
                            <button className="main__btn-post" type="button">
                                POST
                            </button>
                        </Link>
                        <Link to="/guestbook">
                            <button className="main__btn-guest" type="button">
                                GUEST BOOK
                            </button>
                        </Link>
                        <Link to="/about">
                            <button className="main__btn-guest" type="button">
                                ABOUT
                            </button>
                        </Link>
                    </div>
                </div>
            </main>
        </>
    );
};

export default HomeForm;
