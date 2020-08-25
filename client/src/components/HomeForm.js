import React, { useEffect, useState } from "react";
import "../assets/scss/home.scss";
import img from "../assets/image/3.jpg";
import Axios from "axios";

const server = "/api";

const HomeForm = () => {
  const [state, setstate] = useState("");
  const [loading, setLoading] = useState(false);
  const onClick = (e) => {
    setLoading(true);
    console.log(loading);
  };

  useEffect(() => {
    const servervalue = Axios.get(server);
    servervalue.then((res) => setstate(res.data));
  }, [state]);
  return (
    <>
      <div className="main">
        <img src={img} alt="hoem"></img>
        <h2 className="home__title">Create New EveryDay!</h2>
        <h4 className="home__desc">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          sincook a galley of type and scrambled it to make a type specimen
          book. It has survived not only five centuries, but also the leap into
          electroni
        </h4>
        <button>
          <a href="https://github.com/chkim116" target="blank">
            View More My GitHub
          </a>
        </button>
        <button onClick={onClick}>Send Me Together for Projects</button>
      </div>
    </>
  );
};

export default HomeForm;
