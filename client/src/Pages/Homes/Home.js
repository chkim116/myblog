import Axios from "axios";
import React, { useEffect, useState } from "react";
import HomeForm from "../../components/Home/HomeForm";
import { SeoMeta } from "../../SeoMeta";
import { Loading } from "../Etc/Loading";

const Home = () => {
  const [loadingHome, setLoadingHome] = useState(false);
  const [tagList, setTagList] = useState([]);

  useEffect(() => {
    const getTags = async () => {
      setLoadingHome(false);
      try {
        await Axios.get("/tag").then((res) => setTagList(res.data));
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

  const data = {
    title: "Think_Thank",
    description: "내가 생각하는 창고, Think Tank",
    canonical: ``,
    keywords: tagList.map((tag) => tag.tags.slice(0, 10).join()),
  };

  return (
    <>
      <SeoMeta data={data} />
      <div>
        {loadingHome ? (
          <HomeForm post={tagList} tagList={tag}></HomeForm>
        ) : (
          <Loading />
        )}
      </div>
    </>
  );
};

export default Home;
