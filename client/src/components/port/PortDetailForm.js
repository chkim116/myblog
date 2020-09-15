import React from "react";
import { BsHammer } from "react-icons/bs";
import { Link } from "react-router-dom";
import "./PortDetailForm.scss";
import Slider from "react-slick";

export const PortDetailForm = ({ port, onClick, admin }) => {
  const { title, description, imgUrl, createDate, category, _id } = port;
  const settings = {
    dots: true,
    infinite: true,
    dotsClass: "slick-dots slick-thumb",
    speed: 1500,
    autoplay: true,
    autoplaySpeed: 3500,
    slidesToShow: 1,
    slidesToScroll: 1,
    customPaging: function (i) {
      return (
        <a>
          <img src={imgUrl[i]} alt="slide-btn" />
        </a>
      );
    },
  };

  return (
    <>
      <div className="port__detail" key={_id}>
        <div className="port__btn">
          {admin ? (
            <>
              <span className="btn">
                <Link to={`/portedit/${_id}`}>Edit</Link>
              </span>
              <span className="btn" onClick={onClick}>
                Delete
              </span>
            </>
          ) : (
            <> </>
          )}
        </div>
        <h2 className="port__detail-title">{title}</h2>
        <div className="port__detail-desc">
          <Slider {...settings}>
            {imgUrl.map((img, index) => (
              <div key={index}>
                <img src={img} alt="이미지"></img>
              </div>
            ))}
          </Slider>
          {description.split("\n").map((text, key) => {
            return (
              <span key={key}>
                {text}
                <br />
              </span>
            );
          })}
        </div>
        <p>
          <BsHammer />
          {createDate}
        </p>
        <small>Categories: {category}</small>
        <p className="port__detail-date">
          <small>Upload By: Kim</small>
        </p>
      </div>
    </>
  );
};
