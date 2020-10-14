import Axios from "axios";
import React, { useEffect, useState } from "react";
import HomeForm from "../../components/Home/HomeForm";
import { Loading } from "../Etc/Loading";

const Home = () => {
  const [loadingHome, setLoadingHome] = useState(false);
  const [tagList, setTagList] = useState([]);
  let tag = [];

  const getTags = async () => {
    setLoadingHome(true);
    try {
      const tags = await Axios.get("/tag").then((res) => res.data);
      setTagList(tags.map((list) => list.tags));
    } catch (err) {
      console.log(err);
    }
    setLoadingHome(false);
  };

  useEffect(() => {
    getTags();
  }, []);

  tagList.forEach((list) => {
    list.map((list) => tag.push(list));
  });

  if (loadingHome) {
    return <Loading />;
  }

  return <HomeForm tag={tag}></HomeForm>;
};

export default Home;
