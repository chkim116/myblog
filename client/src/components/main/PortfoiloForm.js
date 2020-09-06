import React from "react";
import "./PortfolioForm.scss";
import img from "../../image/home.jpg";
import { Link } from "react-router-dom";
import routes from "../../routes";
import { BsHammer } from "react-icons/bs";

const PortfolioForm = ({ port, admin }) => {
  return (
    <>
      {admin && (
        <Link to={routes.portwriting} className="post">
          글 작성
        </Link>
      )}
      <div className="contents">
        {port.map((p, key) => (
          <div className="article__post" key={key}>
            <Link to={`/portdetail/${p._id}`}>
              <img className="post_thumbnail" src={img} alt="img"></img>
              <h3 className="post__title">{p.title}</h3>
              <p className="post__desc">{p.description}</p>
              <h4>
                <BsHammer />
                {p.createDate}
              </h4>
              <small>Categories: {p.category}</small>
            </Link>
          </div>
        ))}
      </div>
    </>
  );
};

export default PortfolioForm;
