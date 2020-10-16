import Axios from "axios";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import HomeForm from "../../components/Home/HomeForm";
import { Loading } from "../Etc/Loading";

const Home = () => {
  const [loadingHome, setLoadingHome] = useState(false);
  const [tagList, setTagList] = useState([]);

  useEffect(() => {
    const getTags = async () => {
      setLoadingHome(false);
      try {
        const tags = await Axios.get("/tag").then((res) => res.data);
        setTagList(tags);
        setLoadingHome(true);
      } catch (err) {
        console.log(err);
      }
    };
    getTags();
  }, []);

  let tag = [];
  tagList.forEach((list) => {
    tag.push(list.tags);
  });

  return <>{loadingHome ? <HomeForm tagList={tag}></HomeForm> : <Loading />}</>;
};

export default Home;
