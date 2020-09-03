import React from "react";
import { BsHammer } from "react-icons/bs";
import { Link } from "react-router-dom";
import "./PostDetailForm.scss";

export const PostDetailForm = ({ port, onClick }) => {
  const { title, description, imgUrl, createDate, category, _id } = port;
  return (
    <>
      <div className="port__detail" key={_id}>
        <div className="port__btn">
          <span className="btn">
            <Link to={`/portedit/${_id}`}>Edit</Link>
          </span>
          <span className="btn" onClick={onClick}>
            Delete
          </span>
        </div>
        <h2 className="port__detail-title">{title}</h2>
        <p className="port__detail-desc">
          <img src={imgUrl} alt="이미지"></img>
          {description.split("\n").map((text, key) => {
            return (
              <span key={key}>
                {text}
                <br />
              </span>
            );
          })}
        </p>
        <p>
          <BsHammer />
          {createDate}
        </p>
        <small>categories: {category}</small>
        <p className="port__detail-date">
          <small>Upload By: Kim</small>
        </p>
      </div>
    </>
  );
};
