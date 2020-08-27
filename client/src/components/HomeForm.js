import React from "react";
import "./HomeForm.scss";
import img from "../image/3.jpg";

const HomeForm = () => {
  return (
    <>
      <div className="main">
        <img src={img} alt="hoem"></img>
        <h2 className="home__title">Create New EveryDay!</h2>
        <h4 className="home__desc">
          There have to be reasons that you get up in the morning and you want
          to live.
        </h4>
        <button>
          <a href="https://github.com/chkim116" target="blank">
            View More My GitHub
          </a>
        </button>
        <button>Send Me Together for Projects</button>
      </div>
    </>
  );
};

export default HomeForm;
