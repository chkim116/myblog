import Axios from "axios";
import React, { useEffect } from "react";
import HomeForm from "../../components/Home/HomeForm";

const Home = () => {
  useEffect(() => {
    console.log(Axios.get("/api/tags").then((res) => res.data));
  }, []);

  return <HomeForm></HomeForm>;
};

export default Home;
