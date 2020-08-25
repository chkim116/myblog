import React from "react";
import "../assets/scss/portfolio.scss";
import img from "../assets/image/1.jpg";

const Portfolio = () => {
  return (
    <article className="article">
      <div className="article__post">
        <a href="https://github.com/chkim116">
          <img className="post_thumbnail" src={img} alt="gkgk"></img>
          <h2 className="post__title">타이틀</h2>
          <p className="post__desc">
            y. Lorem Ipsum has been the industry's standard dummy text ever
            since the 1500s, when an unknown printer took
          </p>
        </a>
      </div>
    </article>
  );
};

export default Portfolio;
