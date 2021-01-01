import React from "react";
import { HomeHashtag } from "./HomeHashtag";
import "./HomeForm.scss";
import { Link } from "react-router-dom";

const HomeForm = ({ tagList }) => {
    return (
        <>
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
