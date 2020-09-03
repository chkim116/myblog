import React from "react";
import "./PortfolioForm.scss";
import img from "../../image/home.jpg";
import { Link } from "react-router-dom";
import routes from "../../routes";

const PortfolioForm = ({ port }) => {
  console.log(port);
  return (
    <div className="contents">
      {port.map((p, key) => (
        <div className="article__post" key={key}>
          <Link to={`/portdetail/${p._id}`}>
            <img className="post_thumbnail" src={img} alt="img"></img>
            <h2 className="post__title">{p.title}</h2>
            <p className="post__desc">{p.description}</p>
            <h4>{p.createDate}</h4>
            <small>{p.category}</small>
          </Link>
        </div>
      ))}
      <Link to={routes.portwriting}>글 작성</Link>
    </div>
  );
};

export default PortfolioForm;
