import Axios from "axios";
import React, { useEffect, useState } from "react";
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
  let tagId = [];
  tagList.forEach((list) => {
    tag.push(list.tags);
    tagId.push(list._id);
  });

  return (
    <>
      {loadingHome ? (
        <HomeForm tagList={tag} tagId={tagId}></HomeForm>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default Home;
