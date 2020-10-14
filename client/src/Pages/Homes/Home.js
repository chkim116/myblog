import Axios from "axios";
import React, { useEffect, useState } from "react";
import HomeForm from "../../components/Home/HomeForm";
import { Loading } from "../Etc/Loading";

const Home = () => {
  const [loading, setLoading] = useState(false);
  const [tagList, setTagList] = useState([]);
  let tag = [];

  const getTags = async () => {
    setLoading(true);
    try {
      const tags = await Axios.get("/tag").then((res) => res.data);
      setTagList(tags.map((list) => list.tags));
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };

  useEffect(() => {
    getTags();
  }, []);

  tagList.forEach((list) => {
    list.map((list) => tag.push(list));
  });

  if (loading) {
    return <Loading />;
  }

  return <HomeForm tag={tag}></HomeForm>;
};

export default Home;
