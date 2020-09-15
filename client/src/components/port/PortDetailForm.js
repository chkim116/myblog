import React from "react";
import { BsHammer } from "react-icons/bs";
import { Link } from "react-router-dom";
import "./PortDetailForm.scss";
import img from "../../image/home.jpg";
import Slider from "react-slick";

export const PortDetailForm = ({ port, onClick, admin }) => {
  const { title, description, imgUrl, createDate, category, _id } = port;

  const settings = {
    customPaging: function (i) {
      return (
        <a>
          <img src={img} alt="이미지"></img>
        </a>
      );
    },
    dots: true,
    infinite: true,
    dotsClass: "slick-dots slick-thumb",
    speed: 1500,
    autoplay: true,
    autoplaySpeed: 3500,
    slidesToShow: 1,
    slidesToScroll: 1,
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
        <p className="port__detail-desc">
          <Slider {...settings}>
            <div>
              <img src={img} alt="이미지"></img>
            </div>
            <div>
              <img src={img} alt="이미지"></img>
            </div>
            <div>
              <img src={img} alt="이미지"></img>
            </div>
          </Slider>
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
        <small>Categories: {category}</small>
        <p className="port__detail-date">
          <small>Upload By: Kim</small>
        </p>
      </div>
    </>
  );
};
